import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { STORY_MILESTONES } from '../../lib/constants'
import { fadeUp } from '../../lib/animations'

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
        stroke="#E9D9B8"
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
        transition={{ delay: index * 0.1 }}
        className={`col-start-2 md:col-start-auto ${
          isEven ? 'md:order-1 md:text-right' : 'md:order-2'
        }`}
      >
        <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-goldDark mb-2">
          {milestone.date}
        </p>
        <h3 className="font-serif text-xl md:text-2xl text-ink mb-3">
          {milestone.title}
        </h3>
        <p className="text-sm md:text-base text-muted leading-relaxed max-w-md inline-block">
          {milestone.body}
        </p>

        {milestone.image && (
          <motion.img
            src={milestone.image}
            alt={milestone.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 rounded-lg shadow-soft w-full max-w-sm object-cover aspect-[3/2] inline-block"
          />
        )}
      </motion.div>
    </div>
  )
}

export default function OurStory() {
  const timelineRef = useRef(null)

  return (
    <section id="story" className="relative bg-ivory py-24 md:py-32 section-fade">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
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
