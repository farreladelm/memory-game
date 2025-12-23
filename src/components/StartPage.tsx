export default function StartPage({ onStart }: { onStart: () => void }) {
    return (
        <div className="min-h-screen flex items-center justify-center app-bg">
            <div className="max-w-lg p-8 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg text-center text-slate-100">
                <h1 className="text-4xl font-extrabold mb-4 text-indigo-300">Match Card Game</h1>
                <p className="text-left text-sm text-slate-200 mb-4">
                    <strong className="block mb-2">How to play</strong>

                </p>
                <ul className="list-disc list-inside space-y-1 text-left text-slate-200">
                    <li>Click a card to flip it.</li>
                    <li>Find the matching pair.</li>
                    <li>Match: +10 points. Mismatch: -5 seconds.</li>
                    <li>Finish before the timer runs out.</li>
                </ul>
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={onStart}
                        className="px-6 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-400 transition-colors cursor-pointer"
                    >
                        Start Game
                    </button>
                </div>

                <p className="mt-6 text-xs text-slate-400">Good luck — try to beat your best score!</p>
            </div>
        </div>
    )
}
