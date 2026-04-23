import { motion } from 'framer-motion'
import { EVENTS } from '../../lib/constants'
import { fadeUp, staggerContainer } from '../../lib/animations'
import EventCard from '../ui/EventCard'

export default function Events() {
  return (
    <section id="events" className="py-24 md:py-32 bg-champagne/30">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-muted mb-4">
            The Celebrations
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">
            Join Us For
          </h2>
          <div className="gold-rule mx-auto max-w-xs" />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {EVENTS.map((event) => (
            <motion.div key={event.id} variants={fadeUp} className="w-full max-w-md">
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
