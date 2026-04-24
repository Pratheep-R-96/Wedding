import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { STORY_MILESTONES } from '../../lib/constants'
import { fadeUp } from '../../lib/animations'
import Picture from '../ui/Picture'

function TimelineLine({ containerRef }) {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  if (prefersReduced) {
    return (
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-full w-full bg-champagne"
        />
      </div>
    )
  }

  return (
    <svg
      className="absolute left-4 md:left-1/2 top-0 bottom-0 -translate-x-1/2"
      width="2"
      height="100%"
      preserveAspectRatio="none"
    >
      <motion.line
        x1="1"
        y1="0"
        x2="1"
        y2="100%"
        stroke="#E6D3A3"
        strokeWidth="2"
        style={{ pathLength }}
      />
    </svg>
  )
}

function DiamondNode({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6"
    >
      <span className="block h-3 w-3 rotate-45 border-2 border-gold bg-ivory" />
    </motion.div>
  )
}

function MilestoneCard({ milestone, index }) {
  const isEven = index % 2 === 0
  const prefersReduced = useReducedMotion()
  const imageRef = useRef(null)
  const { scrollYProgress: imageScroll } = useScroll({
    target: imageRef,
    offset: ['start 90%', 'end 70%'],
  })
  const imageY = useTransform(imageScroll, [0, 1], [prefersReduced ? 0 : 10, 0])

  return (
    <div
      className={`relative grid grid-cols-[32px_1fr] md:grid-cols-2 gap-6 md:gap-12 ${
        index !== 0 ? 'mt-16 md:mt-24' : ''
      }`}
    >
      <DiamondNode index={index} />

      {/* Spacer for alternating layout */}
      <div
        className={`hidden md:block ${isEven ? 'order-2' : 'order-1'}`}
        aria-hidden="true"
      />

      {/* Card */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 0.2 + index * 0.12 }}
        className={`col-start-2 md:col-start-auto ${
          isEven ? 'md:order-1 md:text-right' : 'md:order-2'
        }`}
      >
        <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-goldDark mb-2">
          {milestone.date}
        </p>
        <div
          className={`mb-3 inline-flex items-center gap-2 ${
            isEven ? 'md:flex-row-reverse md:justify-end' : ''
          }`}
        >
          <span className="inline-block h-4 w-4 text-gold" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3v18M7 8h10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-ink">
            {milestone.title}
          </h3>
        </div>
        <p className="text-sm md:text-base text-muted leading-relaxed max-w-md inline-block">
          {milestone.body}
        </p>

        {milestone.image && (
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 inline-block w-full max-w-sm"
            style={{ y: imageY }}
          >
            <div className="group relative overflow-hidden rounded-2xl shadow-soft">
              <Picture
                src={milestone.image}
                alt={milestone.title}
                widths={[480, 768, 1200]}
                sizes="(max-width: 767px) 100vw, 384px"
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                pictureClass="block w-full"
                className="w-full object-cover aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.25), transparent)',
                }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default function OurStory() {
  const timelineRef = useRef(null)

  return (
    <section id="story" className="relative bg-ivory py-24 md:py-32 section-fade">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-ink/[0.02]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-[11px] md:text-xs font-sans tracking-[0.18em] text-muted/80 mb-3">
            Our journey began here...
          </p>
          <p className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-muted mb-4">
            Our Journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink mb-0">
            How God Wrote Our Story
          </h2>
          <div className="gold-rule mx-auto max-w-xs" />
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <TimelineLine containerRef={timelineRef} />

          {STORY_MILESTONES.map((milestone, i) => (
            <MilestoneCard key={milestone.date} milestone={milestone} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
