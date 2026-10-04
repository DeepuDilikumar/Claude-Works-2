import { useEffect, useRef, useState, type SyntheticEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import PitBoard, { TOTAL_LAPS } from './PitBoard'
import { container, primaryButton, secondaryButton } from '../ui'

// The clip is 6 s of 60 fps footage. Slowed to 0.6× it runs ~10 s and reads as
// slow motion instead of a short, jumpy loop.
const PLAYBACK_RATE = 0.6
const CAR_NUMBER = 15

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero({ onBookDemo }: { onBookDemo: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastTime = useRef(0)
  const reduceMotion = useReducedMotion()
  const [lap, setLap] = useState(47)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultPlaybackRate = PLAYBACK_RATE
    video.playbackRate = PLAYBACK_RATE
    if (reduceMotion) {
      video.pause()
      return
    }
    // If autoplay is blocked (e.g. iOS Low Power Mode) the poster frame stays up.
    video.play().catch(() => {})
  }, [reduceMotion])

  // Each time the loop wraps, the car has come round again: advance the pit board one lap.
  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const t = e.currentTarget.currentTime
    if (t < lastTime.current - 0.5) {
      setLap((l) => (l >= TOTAL_LAPS ? 1 : l + 1))
    }
    lastTime.current = t
  }

  return (
    <section id="top" className="relative isolate h-[100svh] min-h-[600px] w-full overflow-hidden bg-night">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_45%]"
        src="/hero.mp4"
        poster="/hero-poster.jpg"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = PLAYBACK_RATE
        }}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Legibility. Top: the sky is already black, this only tames the lit fence and blurred stands.
          Bottom: in the tracking shot the floodlit track is near-white, so this band is heavy.
          The middle 45–60% is left clear because that is where the car passes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 28%, transparent 44%)',
            'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 22%, transparent 42%)',
            'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      <div className="flex h-full flex-col justify-between pb-[max(28px,env(safe-area-inset-bottom))] pt-28 md:pb-12 md:pt-32">
        <div className={container}>
          <h1
            className="font-display font-extrabold uppercase text-floodlight"
            style={{
              fontSize: 'clamp(3.25rem, min(13.5vw, 11svh), 7.75rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.005em',
              textShadow: '0 2px 32px rgba(0,0,0,0.5)',
            }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
            >
              Every lap, live
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              on the pit wall.
            </motion.span>
          </h1>
        </div>

        <div className={`${container} grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 sm:gap-10`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
          >
            <p className="max-w-[36ch] text-[15px] leading-[1.55] text-floodlight/80 sm:text-[17px]">
              Pitwall puts lap times, gaps and tire temperatures on your crew's phones the moment the car crosses
              the line. Built for Friday-night short tracks, not factory budgets.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="button" onClick={onBookDemo} className={primaryButton}>
                Book a demo
              </button>
              <a href="#how-it-works" className={secondaryButton}>
                See how it works
              </a>
            </div>
          </motion.div>

          <PitBoard carNumber={CAR_NUMBER} lap={lap} />
        </div>
      </div>
    </section>
  )
}
