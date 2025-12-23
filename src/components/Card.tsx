export type CardModel = {
    id: number
    pairId: number
    face: string
    flipped: boolean
    matched: boolean
}

export default function Card({ card, onClick }: { card: CardModel; onClick: (c: CardModel) => void }) {
    return (
        <div
            className="relative w-full aspect-square cursor-pointer"
            onClick={() => !card.flipped && !card.matched && onClick(card)}
        >
            <div className={`absolute inset-0 duration-300 transform-3d ${card.flipped || card.matched ? 'rotate-y-180' : ''}`}>
                <div className="absolute inset-0 bg-slate-700 rounded-lg flex items-center justify-center text-3xl text-slate-100 backface-hidden lg:text-7xl">?</div>
                <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center text-3xl transform rotate-y-180 backface-hidden">
                    <span className="lg:text-7xl text-slate-900 dark:text-slate-900">{card.face}</span>
                </div>
            </div>
        </div>
    )
}
