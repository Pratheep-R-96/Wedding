import { useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import useCountdown from '../../hooks/useCountdown'
import { WEDDING_DATE } from '../../lib/constants'
import { fadeUp } from '../../lib/animations'

const TILES = ['days', 'hours', 'minutes', 'seconds']
const LABELS = { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' }

function ConfettiBurst() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: -(Math.random() * 160 + 40),
        r: Math.random() * 360,
        size: Math.random() * 6 + 4,
        color: ['#C9A96E', '#E8CFC9', '#B5BFA1', '#E6D3A3', '#9F7A3F'][i % 5],
        delay: Math.random() * 0.3,
      })),
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{
            opacity: [1, 1, 0],
            x: p.x,
            y: p.y,
            rotate: p.r,
            scale: [1, 1.2, 0.6],
          }}
          transition={{ duration: 1.6, delay: p.delay, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  )
}

function FlipDigit({ value, label }) {
  const padded = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 items-center justify-center rounded-2xl bg-cream/80 backdrop-blur-sm border border-gold/20 shadow-soft overflow-hidden"
        style={{
          background:
            'linear-gradient(rgba(255,255,255,0.4), rgba(241,231,216,0.6))',
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-6xl md:text-7xl text-ink"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-xs font-sans font-medium uppercase tracking-[0.2em] text-muted">
        {LABELS[label]}
      </span>
    </div>
  )
}

export default function Countdown() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()
  const { days, hours, minutes, seconds, isOver } = useCountdown(WEDDING_DATE.getTime())

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '30%'])

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 -top-[15%] -bottom-[15%]" style={{ y: bgY }}>
        <img
          src="https://picsum.photos/id/1076/1920/1080"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover blur-[2px]"
        />
      </motion.div>

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-cream/85" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20"
        >
          <p className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-muted mb-4">
            The Big Day Is Near
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">
            Counting Down To Forever
          </h2>
          <div className="gold-rule mx-auto max-w-xs" />
        </motion.div>

        {isOver ? (
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <ConfettiBurst />
            <h3 className="font-serif text-4xl md:text-5xl text-ink">
              We&rsquo;re married! 💍
            </h3>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 min-[480px]:grid-cols-4 gap-5 md:gap-8 justify-items-center"
          >
            {TILES.map((key) => (
              <FlipDigit
                key={key}
                label={key}
                value={{ days, hours, minutes, seconds }[key]}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
