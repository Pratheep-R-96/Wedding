import { CalendarPlus, MapPin } from 'lucide-react'
import { generateIcs } from '../../lib/ics'

const ACCENT_COLORS = {
  gold: '#C9A96E',
  blush: '#E8CFC9',
  sage: '#B5BFA1',
}

function EventIcon({ icon, accent = 'gold' }) {
  const color = ACCENT_COLORS[accent] || ACCENT_COLORS.gold

  if (icon === 'cross') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <line x1="24" y1="8" x2="24" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="18" x2="34" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'ring') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="18" cy="24" r="9" stroke={color} strokeWidth="1.5" />
        <circle cx="30" cy="24" r="9" stroke={color} strokeWidth="1.5" />
      </svg>
    )
  }
  if (icon === 'heart') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M24 40 C12 30 6 22 6 16 C6 10 11 6 16 6 C20 6 23 9 24 11 C25 9 28 6 32 6 C37 6 42 10 42 16 C42 22 36 30 24 40Z"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M18 14 Q20 12 24 16 Q28 12 30 14" stroke={color} strokeWidth="0.75" fill="none" opacity="0.5" />
      </svg>
    )
  }
  return null
}

function handleViewMap(eventId) {
  const mapEl = document.getElementById('map')
  if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' })
  window.dispatchEvent(new CustomEvent('focus-venue', { detail: { id: eventId } }))
}

export default function EventCard({ event }) {
  return (
    <div className="group relative rounded-2xl bg-cream border border-gold/20 shadow-soft p-8 md:p-10 text-center card-lift">
      {/* Icon */}
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-ivory transition-all group-hover:animate-pulse-glow">
        <EventIcon icon={event.icon} accent={event.accent} />
      </div>

      {/* Kind label */}
      <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-goldDark mb-2">
        {event.kind}
      </p>

      {/* Title */}
      <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4">
        {event.title}
      </h3>

      {/* Divider */}
      <div className="gold-rule mx-auto max-w-[120px] my-5" />

      {/* Date + Time */}
      <p className="font-serif italic text-sm text-muted mb-1">
        {event.date}
      </p>
      <p className="font-serif italic text-sm text-goldDark mb-5">
        {event.time}
      </p>

      {/* Venue */}
      <p className="font-sans font-semibold text-ink text-sm mb-1">
        {event.venue}
      </p>
      <p className="font-sans text-xs text-muted mb-8">
        {event.address}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => generateIcs(event)}
          className="btn-gold-shine inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ivory px-5 py-3 text-xs font-medium uppercase tracking-wider text-goldDark transition-all hover:bg-gold hover:text-ivory min-h-[44px]"
        >
          <CalendarPlus className="h-4 w-4" />
          Add to Calendar
        </button>
        <button
          onClick={() => handleViewMap(event.id)}
          className="btn-gold-shine inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ivory px-5 py-3 text-xs font-medium uppercase tracking-wider text-goldDark transition-all hover:bg-gold hover:text-ivory min-h-[44px]"
        >
          <MapPin className="h-4 w-4" />
          View on Map
        </button>
      </div>
    </div>
  )
}
