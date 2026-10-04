import { container, sectionHeading } from '../ui'

const faqs = [
  {
    q: 'Which tracks does it work at?',
    a: "Any oval or road course. Lap timing uses GPS, so the track doesn't need its own timing system. Gaps to other cars need the track to publish live timing, which most weekly short tracks do.",
  },
  {
    q: 'What happens when the cell signal drops?',
    a: 'The timer keeps recording. Missing laps fill in on every phone as soon as one of them reconnects, usually within a lap or two.',
  },
  {
    q: 'Is it legal in my series?',
    a: 'Pitwall sends data to the pit wall, not to the driver, which most short-track rulebooks allow. Some series restrict in-car electronics, so check with your tech inspector before you mount the timer.',
  },
  {
    q: 'How many people can watch at once?',
    a: 'Up to 4 phones per car on Single car, and up to 12 across the team on Team. Crew members join with a code from the crew chief.',
  },
  {
    q: 'Can I cancel mid-season?',
    a: "Yes. You'll get the unused months back, pro-rated, and keep your session history as a spreadsheet.",
  },
]

export default function Faq() {
  return (
    <section id="faq" className="border-t border-smoke py-24 md:py-36">
      <div className={`${container} grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16`}>
        <h2 className={`${sectionHeading} max-w-[10ch]`}>Questions crews ask</h2>
        <div className="border-b border-smoke">
          {faqs.map((item) => (
            <details key={item.q} className="group border-t border-smoke">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[18px] font-semibold text-floodlight transition-colors hover:text-flag [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45"
                >
                  <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-current" />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-7 text-[16px] leading-[1.65] text-floodlight/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
