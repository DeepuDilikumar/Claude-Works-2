import { motion, useReducedMotion } from 'framer-motion'
import { container, sectionHeading } from '../ui'

// Last twelve lap times in seconds for a quarter-mile oval
const laps = [15.84, 15.71, 15.66, 15.72, 15.58, 15.61, 15.49, 15.55, 15.52, 15.44, 15.47, 15.41]
const W = 280
const H = 112
const PAD = 10
const FASTEST = 15.35
const SLOWEST = 15.9

// Faster laps sit higher on the chart
const x = (i: number) => PAD + (i / (laps.length - 1)) * (W - PAD * 2)
const y = (t: number) => PAD + ((t - FASTEST) / (SLOWEST - FASTEST)) * (H - PAD * 2)
const path = laps.map((t, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(t).toFixed(1)}`).join(' ')
const bestIndex = laps.indexOf(Math.min(...laps))

const tires = [
  { corner: 'LF', temp: 188 },
  { corner: 'RF', temp: 214 },
  { corner: 'LR', temp: 181 },
  { corner: 'RR', temp: 203 },
]
const hottest = Math.max(...tires.map((t) => t.temp))

const points = [
  {
    title: 'Running order and gaps',
    body: 'Your position and the gap to the cars around you, updated every time the car crosses the line.',
  },
  {
    title: 'A lap chart you can read at a glance',
    body: 'The last twelve laps show whether your driver is finding time or starting to fade.',
  },
  {
    title: 'Tire temperatures by corner',
    body: 'Log pyrometer readings at each stop and see which corner is working hardest.',
  },
]

function LapChart() {
  const reduce = useReducedMotion()
  const view = { once: true, amount: 0.8 } as const

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Lap times for the last twelve laps, getting faster, best lap 15.41 seconds">
      {[15.5, 15.7].map((t) => (
        <line key={t} x1={PAD} x2={W - PAD} y1={y(t)} y2={y(t)} stroke="var(--color-smoke)" strokeDasharray="3 4" />
      ))}
      {/* The signature scroll moment: the lap line draws itself once the phone is in view */}
      <motion.path
        d={path}
        fill="none"
        stroke="var(--color-floodlight)"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={view}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.g
        initial={{ opacity: reduce ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={view}
        transition={{ delay: reduce ? 0 : 1.5, duration: 0.3 }}
      >
        <circle cx={x(bestIndex)} cy={y(laps[bestIndex])} r={4.5} fill="var(--color-flag)" />
        <text
          x={x(bestIndex) + 4}
          y={y(laps[bestIndex]) - 10}
          textAnchor="end"
          fontSize={11}
          fontWeight={600}
          fill="var(--color-flag)"
        >
          {laps[bestIndex].toFixed(2)} best
        </text>
      </motion.g>
    </svg>
  )
}

function Phone() {
  return (
    <div className="mx-auto w-full max-w-[330px] rounded-[46px] bg-smoke p-[10px] shadow-[0_40px_90px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
      <div className="overflow-hidden rounded-[36px] bg-night px-5 pb-6 pt-4">
        <div aria-hidden className="mx-auto h-[26px] w-[92px] rounded-full bg-smoke" />

        <div className="mt-5 flex items-center justify-between text-[12px] font-medium text-floodlight/60">
          <span>Car 15</span>
          <span>Lap 48 of 150</span>
        </div>

        <div className="mt-3 flex items-end justify-between border-b border-smoke pb-5">
          <span className="font-display text-[64px] font-black leading-[0.8] text-flag">P2</span>
          <span className="text-right">
            <span className="block font-display text-[38px] font-extrabold leading-none text-floodlight">+0.4</span>
            <span className="mt-1 block text-[12px] text-floodlight/60">to car 7</span>
          </span>
        </div>

        <div className="mt-5">
          <p className="text-[12px] font-medium text-floodlight/60">Last 12 laps</p>
          <div className="mt-2">
            <LapChart />
          </div>
        </div>

        <div className="mt-5 border-t border-smoke pt-4">
          <p className="text-[12px] font-medium text-floodlight/60">Tire temps, °F</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {tires.map((tire) => (
              <div key={tire.corner} className="flex items-baseline justify-between bg-smoke/60 px-3 py-2">
                <span className="text-[12px] font-medium text-floodlight/60">{tire.corner}</span>
                <span
                  className={`font-display text-[24px] font-bold leading-none ${tire.temp === hottest ? 'text-flag' : 'text-floodlight'}`}
                >
                  {tire.temp}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 border-l-2 border-flag pl-3 text-[13px] leading-[1.45] text-floodlight/85">
          Gap to car 7 has closed three laps in a row.
        </p>
      </div>
    </div>
  )
}

export default function AppPreview() {
  return (
    <section id="app" className="border-t border-smoke py-24 md:py-36">
      <div className={`${container} grid items-center gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-20`}>
        <div>
          <h2 className={sectionHeading}>What your crew sees</h2>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.6] text-floodlight/70">
            One screen, readable from arm's length under floodlights, with the numbers a crew chief actually calls
            from.
          </p>
          <dl className="mt-12 space-y-8">
            {points.map((point) => (
              <div key={point.title} className="max-w-[44ch]">
                <dt className="text-[17px] font-semibold text-floodlight">{point.title}</dt>
                <dd className="mt-1.5 text-[16px] leading-[1.6] text-floodlight/70">{point.body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Phone />
      </div>
    </section>
  )
}
