import { useEffect, useRef, useState } from "react";

/**
 * CardModel
 * - `id` unique per card
 * - `pairId` identifies which two cards form a pair
 * - `face` visual (emoji or image URL)
 * - `flipped` whether currently face-up
 * - `matched` whether pair was found
 */
export type CardModel = {
  id: number;
  pairId: number;
  face: string;
  flipped: boolean;
  matched: boolean;
};

/** Shuffle copy of array (Fisher–Yates) */
function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MATCH_SCORE = 10;
const MISMATCH_PENALTY_SECONDS = 5;
const FLIP_BACK_DELAY_MS = 800;
const DELTA_SHOW_MS = 900;

/**
 * useGame hook
 * - manages deck state, flips, matching, score and timer
 * - exposes `lastScoreDelta` and `lastTimeDelta` so UI can show transient indicators
 */
export default function useGame(
  pairFaces: string[],
  startingTime = 60,
  resetKey?: number
) {
  const [cards, setCards] = useState<CardModel[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(startingTime);

  // Short-lived deltas for UI indicators (+10, -5s, etc.)
  const [lastScoreDelta, setLastScoreDelta] = useState(0);
  const [lastTimeDelta, setLastTimeDelta] = useState(0);

  // refs used to coordinate between async timeouts and event handlers
  const flippedCardsRef = useRef<CardModel[]>([]); // cards currently flipped this turn
  const isLockedRef = useRef(false); // prevent actions while resolving a mismatch

  // helper to create a fresh shuffled deck from pair faces
  function createDeckFromPairs(faces: string[]) {
    return shuffle(
      faces.flatMap((face, i) => [
        { id: i * 2, pairId: i, face, flipped: false, matched: false },
        { id: i * 2 + 1, pairId: i, face, flipped: false, matched: false },
      ])
    );
  }

  // Initialize / reset the game whenever pairFaces, startingTime or resetKey change
  useEffect(() => {
    setCards(createDeckFromPairs(pairFaces));
    setScore(0);
    setTimeLeft(startingTime);
    flippedCardsRef.current = [];
    isLockedRef.current = false;
    setLastScoreDelta(0);
    setLastTimeDelta(0);
  }, [pairFaces, startingTime, resetKey]);

  // Countdown timer
  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  /** Flip a card (user action) */
  function flipCard(card: CardModel) {
    if (isLockedRef.current) return; // ignore clicks while resolving

    // Optimistically show the flipped card
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );

    // Track flipped cards for this attempt
    flippedCardsRef.current.push({ ...card, flipped: true });

    // When two cards are flipped, resolve match/mismatch
    if (flippedCardsRef.current.length === 2) {
      const [first, second] = flippedCardsRef.current;

      // MATCH
      if (first.pairId === second.pairId) {
        setCards((prev) =>
          prev.map((c) =>
            c.pairId === first.pairId ? { ...c, matched: true } : c
          )
        );
        setScore((s) => s + MATCH_SCORE);
        setLastScoreDelta(MATCH_SCORE);
        // clear transient delta after short time
        setTimeout(() => setLastScoreDelta(0), DELTA_SHOW_MS);
        flippedCardsRef.current = [];
        return;
      }

      // MISMATCH: lock input, flip back after short delay, deduct time
      isLockedRef.current = true;
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, flipped: false }
              : c
          )
        );

        setTimeLeft((t) => {
          const newT = Math.max(0, t - MISMATCH_PENALTY_SECONDS);
          const delta = newT - t; // negative value
          setLastTimeDelta(delta);
          setTimeout(() => setLastTimeDelta(0), DELTA_SHOW_MS);
          return newT;
        });

        flippedCardsRef.current = [];
        isLockedRef.current = false;
      }, FLIP_BACK_DELAY_MS);
    }
  }

  return { cards, flipCard, score, timeLeft, lastScoreDelta, lastTimeDelta };
}
