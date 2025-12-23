# Match Card Game

### Description

- **Overview:** A simple browser-based matching card game built with React, TypeScript and Vite. Players flip cards to find matching pairs before the timer runs out. Correct matches award points; incorrect matches deduct time.

---

### Technologies

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **Audio:** Web Audio API (helpers in `src/utils/sound.ts`)
- **Package manager:** pnpm (recommended)
- **Icons:** react-icons (optional)

---

### Features

- **Start screen:** Title, rules, and a Start button (`src/components/StartPage.tsx`).
- **Game board:** Responsive grid of cards (`src/components/Game.tsx`).
- **Card flip animation:** Visual flip for each card (`src/components/Card.tsx`).
- **Scoring & timer:** +10 points per match, -5 seconds for a mismatch.
- **Audio feedback:** sounds on flip, match and mismatch (`src/utils/sound.ts`).
- **Transient UI indicators:** brief +/− indicators beside score and time when they change.
- **End state:** Win screen when all pairs matched or time runs out.

---

### Process (how this was built)

- Scaffolded with Vite using the React + TypeScript template.
- Tailwind CSS was added and configured (class-based dark mode enabled in `tailwind.config.cjs`).
- App structured into components (`StartPage`, `Game`, `Card`) and a custom hook (`useGame`) that contains the game logic.
- Added WebAudio-based helper functions to create simple sound effects without external assets.

---

### How to run (development)

- Install dependencies:

```bash
pnpm install
```

- Start the dev server:

```bash
pnpm run dev
```

- Open the app in the browser at the URL printed by Vite (usually `http://localhost:5173`).

---

### Key files

- `src/hooks/useGame.ts` — game state and logic (deck creation, flip/match rules, scoring, timer, transient deltas).
- `src/components/StartPage.tsx` — start UI.
- `src/components/Game.tsx` — board, UI indicators, and modal.
- `src/components/Card.tsx` — card flip presentation.
- `src/utils/sound.ts` — WebAudio helpers for flip/match/mismatch sounds.

---

### Notes & tips

- First user interaction may be required to enable audio in some browsers.
- Change card faces by editing the emoji list in `src/components/Game.tsx` or replace with image URLs.
- Adjust difficulty by changing the number of pairs or the starting time in `Game.tsx` / `useGame`.
