import { container } from '../ui'

export default function Story() {
  return (
    <section id="stories" className="py-24 md:py-36">
      <figure className={container}>
        <blockquote className="max-w-[32ch] text-[clamp(1.6rem,3.4vw,2.75rem)] font-medium leading-[1.22] tracking-[-0.01em] text-floodlight">
          “We used to time laps with a stopwatch and a clipboard. Now my spotter and I see the same gap at the same
          moment, and we make the call before the car comes back around.”
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-4 text-[15px]">
          <span aria-hidden className="h-[2px] w-10 bg-flag" />
          <span>
            <span className="font-semibold text-floodlight">Marcus Hale</span>
            <span className="text-floodlight/60">, crew chief, Hale Motorsports #22</span>
          </span>
        </figcaption>
      </figure>
    </section>
  )
}
