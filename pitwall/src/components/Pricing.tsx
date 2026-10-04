import { container, primaryButton, sectionHeading, secondaryButton } from '../ui'

const plans = [
  {
    name: 'Single car',
    price: '$349',
    unit: 'per season',
    includes: ['1 lap timer', 'Up to 4 crew phones', 'Live gaps and gap alerts', 'Tire temperature log', 'Session history'],
    featured: false,
  },
  {
    name: 'Team',
    price: '$899',
    unit: 'per season, up to 4 cars',
    includes: [
      'Everything in Single car',
      'Up to 4 lap timers',
      'Up to 12 crew phones',
      'Crew roles and permissions',
      'Spreadsheet export',
    ],
    featured: true,
  },
]

export default function Pricing({ onBookDemo }: { onBookDemo: () => void }) {
  return (
    <section id="pricing" className="border-t border-smoke py-24 md:py-36">
      <div className={container}>
        <h2 className={`${sectionHeading} max-w-[16ch]`}>Priced per car, per season</h2>
        <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.6] text-floodlight/70">
          One payment covers the whole season, practice nights included. Every plan starts with a free race night
          after your demo.
        </p>

        <div className="mt-14 grid border border-smoke md:mt-20 md:grid-cols-2">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`flex flex-col p-7 sm:p-10 ${i > 0 ? 'border-t border-smoke md:border-l md:border-t-0' : ''} ${
                plan.featured ? 'shadow-[inset_0_3px_0_var(--color-flag)]' : ''
              }`}
            >
              <h3 className="font-display text-[2rem] font-bold uppercase leading-none text-floodlight">{plan.name}</h3>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-[4.5rem] font-black leading-none text-floodlight">{plan.price}</span>
                <span className="text-[15px] text-floodlight/60">{plan.unit}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[16px] leading-[1.5] text-floodlight/80">
                    <span aria-hidden className="mt-[0.6em] h-[2px] w-3 shrink-0 bg-flag" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={onBookDemo}
                className={`${plan.featured ? primaryButton : secondaryButton} mt-10 w-full`}
              >
                Book a demo
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
