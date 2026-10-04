import { container, sectionHeading } from '../ui'

const features = [
  {
    title: 'Works with bad signal',
    body: "Laps are stored on the timer and fill in on every phone as soon as one reconnects, so a packed grandstand doesn't cost you data.",
  },
  {
    title: 'Gap alerts',
    body: "Set a gap, and the spotter's phone buzzes when the car ahead comes inside it or the car behind closes in.",
  },
  {
    title: 'Session history',
    body: "Every practice, heat and feature is saved by date and track, so you can compare this week's setup with last month's.",
  },
  {
    title: 'Crew roles',
    body: 'The crew chief, spotter and family in the stands each get their own view. Only the crew chief can change alerts.',
  },
  {
    title: 'Spreadsheet export',
    body: 'Send any session to a spreadsheet for the Monday debrief at the shop.',
  },
]

export default function Features() {
  return (
    <section id="features" className="border-t border-smoke py-24 md:py-36">
      <div className={container}>
        <h2 className={`${sectionHeading} max-w-[14ch]`}>Built for Friday nights</h2>
        <ul className="mt-14 border-b border-smoke md:mt-20">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="grid gap-3 border-t border-smoke py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-10 md:py-10"
            >
              <h3 className="font-display text-[1.9rem] font-bold uppercase leading-none text-floodlight md:text-[2.25rem]">
                {feature.title}
              </h3>
              <p className="max-w-[52ch] text-[16px] leading-[1.6] text-floodlight/70 md:pt-1 md:text-[17px]">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
