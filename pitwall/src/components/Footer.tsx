import Wordmark from './Wordmark'
import { container, navLinks } from '../ui'

export default function Footer() {
  return (
    <footer className="border-t border-smoke">
      <div className={`${container} flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between`}>
        <div>
          <Wordmark />
          <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.55] text-floodlight/60">
            Live timing and race strategy for short-track crews.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[14px] font-medium">
            {[...navLinks, { label: 'Contact', href: 'mailto:hello@pitwall.example' }].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-floodlight/70 transition-colors hover:text-floodlight">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`${container} pb-[max(40px,env(safe-area-inset-bottom))] text-[13px] text-floodlight/45`}>
        © {new Date().getFullYear()} Pitwall
      </div>
    </footer>
  )
}
