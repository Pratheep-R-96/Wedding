import { motion } from 'framer-motion'
import { EVENTS } from '../../lib/constants'
import { fadeUp } from '../../lib/animations'
import EventCard from '../ui/EventCard'

export default function Events() {
  return (
    <section id="events" className="relative py-24 md:py-32 min-h-[110vh] bg-champagne/30 section-fade section-fade-champagne">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[11px] md:text-xs font-sans tracking-[0.18em] text-muted/80 mb-3">
            Join us as we celebrate each moment
          </p>
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
          variants={{
            initial: {},
            animate: {
              transition: { staggerChildren: 0.15, delayChildren: 0.22 },
            },
          }}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="hidden lg:grid lg:grid-cols-3 gap-8 justify-items-center"
        >
          {EVENTS.map((event) => (
            <motion.div key={event.id} variants={fadeUp} className="w-full">
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile stack with flourish connectors */}
        <div className="flex flex-col items-center gap-0 lg:hidden">
          {EVENTS.map((event, i) => (
            <div key={event.id} className="w-full max-w-md">
              {i > 0 && (
                <div className="flex justify-center py-4" aria-hidden="true">
                  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                    <path
                      d="M0 10 Q10 0 20 10 Q30 20 40 10 Q50 0 60 10"
                      stroke="#C9A96E"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                    <circle cx="30" cy="10" r="2" fill="#C9A96E" opacity="0.5" />
                  </svg>
                </div>
              )}
              <motion.div
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 0.22 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <EventCard event={event} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
