import { useEffect, useMemo, useState } from 'react'
import useGame from '../hooks/useGame'
import Card from './Card'
import { playFlip, playMatch, playMismatch } from '../utils/sound'
import { IoMdRefresh } from "react-icons/io";

const EMOJIS = ['🍎', '🚗', '🐶', '⚽️', '🎵', '🌟', '🍩', '🦋'];

const UNIQUE_PAIRS_COUNT = 6;

export default function Game({ onQuit }: { onQuit: () => void }) {
    const [gameKey, setGameKey] = useState(0)
    const pairFaces = useMemo(() => EMOJIS.slice(0, UNIQUE_PAIRS_COUNT), [])
    const { cards, flipCard, score, timeLeft, lastScoreDelta, lastTimeDelta } = useGame(pairFaces, 60, gameKey)

    const allMatched = cards.length > 0 && cards.every(c => c.matched)
    const gameOver = timeLeft <= 0 || allMatched

    useEffect(() => {
        if (lastScoreDelta > 0) playMatch()
        else if (lastScoreDelta < 0) playMismatch()
    }, [lastScoreDelta])

    useEffect(() => {
        if (lastTimeDelta < 0) playMismatch()
    }, [lastTimeDelta])

    return (
        <div className="min-h-screen p-6 app-bg relative flex justify-center items-center">
            <header className="flex justify-between items-center max-w-4xl mx-auto w-full fixed top-0 p-6 lg:px-0 text-slate-100">
                <div className="text-lg relative">Score: <strong>{score}</strong>
                    {lastScoreDelta !== 0 && (
                        <span className={`ml-2 inline-block text-sm ${lastScoreDelta > 0 ? 'text-green-300' : 'text-red-300'} transform transition-all`}>{lastScoreDelta > 0 ? `+${lastScoreDelta}` : `${lastScoreDelta}`}</span>
                    )}
                </div>
                <div className="text-lg relative">Time: <strong>{timeLeft}s</strong>
                    {lastTimeDelta !== 0 && (
                        <span className={`ml-2 inline-block text-sm ${lastTimeDelta < 0 ? 'text-red-300' : 'text-green-300'} transform transition-all`}>{lastTimeDelta}s</span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setGameKey(k => k + 1)} className="px-3 py-1 border border-slate-400 text-white rounded"><IoMdRefresh /></button>
                    <button onClick={onQuit} className="px-3 py-1 bg-red-800 text-white rounded">Quit</button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto w-full pt-24">
                <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    {cards.map(card => (
                        <Card key={card.id} card={card} onClick={() => { playFlip(); flipCard(card) }} />
                    ))}
                </div>

                {gameOver && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-slate-800 text-slate-100 p-6 rounded shadow text-center max-w-sm">
                            <h2 className="text-2xl font-bold mb-2">{allMatched ? 'You win!' : 'Time up'}</h2>
                            <p className="mb-4">Score: <strong>{score}</strong></p>
                            <div className="flex justify-center gap-3">
                                <button onClick={() => setGameKey(k => k + 1)} className="px-4 py-2 bg-indigo-600 text-white rounded">Play Again</button>
                                <button onClick={onQuit} className="px-4 py-2 bg-slate-700 text-slate-100 rounded">Back</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <script>
            </script>
        </div>
    )
}

