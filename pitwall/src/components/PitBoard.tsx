import { AnimatePresence, motion } from 'framer-motion'

export const TOTAL_LAPS = 150

// Deterministic pseudo-random in [0, 1) so a given lap always shows the same board
function seeded(n: number) {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function boardForLap(lap: number) {
  const position = 2 + Math.floor(seeded(lap * 3) * 3) // P2–P4
  const gap = 0.1 + seeded(lap) * 0.9 // seconds to the car ahead
  const call = gap < 0.35 ? 'Push' : gap > 0.75 ? 'Hold' : 'Tires ok'
  return { position, gap, call }
}

function Line({ value, className = '' }: { value: string; className?: string }) {
  return (
    <div className={`relative h-[1em] overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: '-105%' }}
          animate={{ y: 0 }}
          exit={{ y: '105%' }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function PitBoard({ carNumber, lap }: { carNumber: number; lap: number }) {
  const { position, gap, call } = boardForLap(lap)
  const gapText = `+${gap.toFixed(1)}`

  // Everything inside the board is sized in em, so the whole board scales from the figure's font-size.

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28, rotate: -7 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-[3.05em] origin-bottom bg-night text-[2.4rem] shadow-[0_24px_48px_rgba(0,0,0,0.65)] ring-1 ring-smoke sm:text-[clamp(2.4rem,6svh,3.4rem)]"
    >
      <figcaption className="sr-only">
        Pit board for car {carNumber}: position {position}, {gap.toFixed(1)} seconds behind the car ahead,
        lap {lap} of {TOTAL_LAPS}.
      </figcaption>
      <div aria-hidden className="font-display font-black uppercase leading-none">
        <div className="bg-flag px-[0.6em] py-[0.25em] text-[0.52em] text-night">
          {carNumber}
        </div>
        <div className="space-y-[0.18em] px-[0.3em] pb-[0.3em] pt-[0.28em]">
          <Line value={`P${position}`} className="text-flag" />
          <Line value={gapText} />
          <Line value={`L${lap}`} />
          <Line value={call} className="mt-1 text-[0.42em] text-floodlight/70" />
        </div>
      </div>
    </motion.figure>
  )
}
