import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { EVENTS } from '../../lib/constants'

export default function VenueMap() {
  const [activeId, setActiveId] = useState(EVENTS[0].id)
  const active = EVENTS.find((e) => e.id === activeId) || EVENTS[0]

  const handleFocusVenue = useCallback((e) => {
    const id = e.detail?.id
    if (id && EVENTS.some((ev) => ev.id === id)) {
      setActiveId(id)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('focus-venue', handleFocusVenue)
    return () => window.removeEventListener('focus-venue', handleFocusVenue)
  }, [handleFocusVenue])

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(active.mapsQuery)}&output=embed`
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(active.mapsQuery)}`

  return (
    <section id="map" className="relative bg-champagne/30 py-24 md:py-32 section-fade section-fade-champagne">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-muted mb-4">
            Find Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">
            Our Venues
          </h2>
          <div className="gold-rule mx-auto max-w-xs" />
        </motion.div>

        {/* Tab pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveId(event.id)}
              className={`rounded-full px-5 py-3 text-xs font-medium uppercase tracking-wider transition-all duration-300 min-h-[44px] ${
                event.id === activeId
                  ? 'bg-gold text-ivory shadow-soft'
                  : 'bg-cream text-ink border border-gold/20 hover:bg-champagne'
              }`}
            >
              {event.title}
            </button>
          ))}
        </div>

        {/* Map iframe */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl border border-gold/20 shadow-soft"
          >
            <div className="aspect-[4/3] md:aspect-video">
              <iframe
                src={mapSrc}
                title={`Map — ${active.venue}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Venue info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-8 text-center"
          >
            <p className="font-serif text-xl text-ink mb-1">{active.venue}</p>
            <p className="text-sm text-muted mb-5">{active.address}</p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-shine inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ivory px-5 py-3 text-xs font-medium uppercase tracking-wider text-goldDark transition-all hover:bg-gold hover:text-ivory min-h-[44px]"
            >
              <ExternalLink className="h-4 w-4" />
              Open in Google Maps
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
