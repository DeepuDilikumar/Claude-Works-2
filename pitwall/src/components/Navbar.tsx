import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Wordmark from './Wordmark'
import { container, navLinks, primaryButton } from '../ui'

const pastHero = () => window.scrollY > window.innerHeight * 0.85

export default function Navbar({ onBookDemo }: { onBookDemo: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(pastHero)

  // Once the visitor scrolls past the video, the nav gets a solid background and its own demo button.
  useEffect(() => {
    const onScroll = () => setScrolled(pastHero())
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? 'border-smoke bg-night/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <motion.nav
        aria-label="Primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`${container} flex items-center justify-between pb-3.5 pt-[max(14px,env(safe-area-inset-top))]`}
      >
        <a href="#top" aria-label="Pitwall, back to top">
          <Wordmark />
        </a>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[14px] font-medium text-floodlight/70 transition-colors duration-200 hover:text-floodlight"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <AnimatePresence>
            {scrolled && (
              <motion.button
                type="button"
                onClick={onBookDemo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`${primaryButton} px-4! py-2! text-[14px]! max-sm:hidden`}
              >
                Book a demo
              </motion.button>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 grid h-10 w-10 place-items-center text-floodlight md:hidden"
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-full bg-current transition-transform duration-300 ${open ? '-translate-y-[5px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`${container} pb-6 md:hidden`}
          >
            <ul className="border-t border-smoke">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-smoke py-4 font-display text-[28px] font-bold uppercase leading-none text-floodlight transition-colors hover:text-flag"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onBookDemo()
              }}
              className={`${primaryButton} mt-6 w-full`}
            >
              Book a demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
