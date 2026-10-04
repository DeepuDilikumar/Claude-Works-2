import { container, sectionHeading } from '../ui'

const steps = [
  {
    title: 'Mount the timer',
    body: 'Stick the Pitwall unit to the dash and plug it into 12 volts. Drop a pin on the start-finish line once, and GPS times every lap from then on.',
  },
  {
    title: 'Open the app on the pit wall',
    body: "Pitwall combines your car's laps with the track's live timing, so every phone on the crew sees the same gaps and running order within a second.",
  },
  {
    title: 'Make the call',
    body: 'Hold up the board or key the radio. Pitwall can also buzz your spotter when the car ahead comes inside a gap you set.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-36">
      <div className={container}>
        <h2 className={sectionHeading}>How a lap reaches your crew</h2>
        <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.6] text-floodlight/70">
          Three pieces: a timer in the car, an app on your crew's phones, and you deciding what to tell the driver.
        </p>

        {/* The connecting line runs down the left on phones and across the markers on wider screens */}
        <ol className="relative mt-16 grid gap-12 before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-smoke md:mt-20 md:grid-cols-3 md:gap-10 md:before:inset-x-0 md:before:bottom-auto md:before:top-[19px] md:before:h-px md:before:w-auto">
          {steps.map((step, i) => (
            <li key={step.title} className="relative pl-16 md:pl-0">
              <span
                aria-hidden
                className="absolute left-0 top-0 grid h-10 w-10 place-items-center bg-flag font-display text-[22px] font-black leading-none text-night md:relative"
              >
                {i + 1}
              </span>
              <h3 className="pt-1.5 font-display text-[1.75rem] font-bold uppercase leading-none text-floodlight md:pt-0 md:mt-8">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[36ch] text-[16px] leading-[1.6] text-floodlight/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
