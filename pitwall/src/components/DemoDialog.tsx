import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { primaryButton } from '../ui'

const label = 'block text-[14px] font-medium text-floodlight/80'
const field =
  'mt-2 block w-full rounded-[4px] border border-smoke bg-night px-3.5 py-3 text-[16px] text-floodlight transition-colors focus:border-flag focus:outline-none'

export default function DemoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const titleId = useId()

  // The native <dialog> gives us focus trapping, Escape to close and an inert page behind it.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const close = () => ref.current?.close()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    // Before going live, send `data` to a form backend (Formspree, Resend, your own API route).
    setSentTo(String(data.get('email') ?? ''))
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={() => {
        setSentTo(null)
        onClose()
      }}
      // A click on the dialog element itself (not its content) is a click on the backdrop
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      className="m-auto max-h-[calc(100svh-2rem)] w-[min(100%-2rem,30rem)] overflow-y-auto border border-smoke bg-night p-0 text-floodlight backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="font-display text-[2.25rem] font-extrabold uppercase leading-none">
            {sentTo ? 'Request sent' : 'Book a demo'}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-2 -mt-1 grid h-10 w-10 shrink-0 place-items-center text-floodlight/70 transition-colors hover:text-floodlight"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {sentTo ? (
          <>
            <p className="mt-5 text-[16px] leading-[1.6] text-floodlight/75">
              We'll email <span className="text-floodlight">{sentTo}</span> within one business day to pick a time
              that works around your race schedule.
            </p>
            <button type="button" onClick={close} className={`${primaryButton} mt-8 w-full`}>
              Done
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <p className="text-[16px] leading-[1.6] text-floodlight/70">
              Twenty minutes on a video call. We'll set Pitwall up for your car and your home track.
            </p>
            <label className={label}>
              Your name
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className={label}>
              Email
              <input type="email" name="email" required autoComplete="email" className={field} />
            </label>
            <label className={label}>
              Team and home track
              <input name="team" autoComplete="organization" className={field} />
            </label>
            <label className={label}>
              Cars you run
              <select name="cars" defaultValue="1" className={field}>
                <option value="1">1</option>
                <option value="2-4">2 to 4</option>
                <option value="5+">5 or more</option>
              </select>
            </label>
            <button type="submit" className={`${primaryButton} w-full`}>
              Send request
            </button>
          </form>
        )}
      </div>
    </dialog>
  )
}
