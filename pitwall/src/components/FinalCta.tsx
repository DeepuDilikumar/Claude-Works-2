import { container, primaryButton, sectionHeading } from '../ui'

export default function FinalCta({ onBookDemo }: { onBookDemo: () => void }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Reuses the hero's poster frame, so the page ends back at the track */}
      <img
        src="/hero-poster.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_45%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: [
            'linear-gradient(to bottom, #000 0%, transparent 30%, transparent 70%, #000 100%)',
            'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.25) 100%)',
          ].join(', '),
        }}
      />
      <div className={`${container} py-32 md:py-44`}>
        <h2 className={`${sectionHeading} max-w-[12ch]`}>Race night is Friday.</h2>
        <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.6] text-floodlight/80">
          Book a 20-minute demo and have Pitwall running before the green flag.
        </p>
        <button type="button" onClick={onBookDemo} className={`${primaryButton} mt-9`}>
          Book a demo
        </button>
      </div>
    </section>
  )
}
