import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { COUPLE } from '../../lib/constants'
import { fadeUp, revealMask } from '../../lib/animations'
import CrossOrnament from '../ui/CrossOrnament'

const SHIMMER_DOTS = [
  { top: '12%', left: '18%', size: 6, opacity: 0.4, delay: 0 },
  { top: '22%', right: '14%', size: 8, opacity: 0.3, delay: 1.2 },
  { top: '45%', left: '8%', size: 4, opacity: 0.5, delay: 0.6 },
  { top: '60%', right: '22%', size: 10, opacity: 0.35, delay: 2.1 },
  { top: '78%', left: '28%', size: 5, opacity: 0.6, delay: 0.3 },
  { top: '35%', right: '8%', size: 7, opacity: 0.45, delay: 1.8 },
  { top: '85%', right: '35%', size: 4, opacity: 0.5, delay: 2.5 },
]

const heroStagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const crossVariant = {
  initial: { opacity: 0, scale: 0.8, rotate: -8 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

function scrollToStory() {
  const el = document.getElementById('story')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 40])

  return (
    <header
      id="hero"
      ref={sectionRef}
      aria-label="Wedding announcement"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Ken Burns background with scroll parallax */}
      <motion.div
        className={`absolute inset-0 ${prefersReduced ? '' : 'animate-ken-burns'}`}
        style={{ y: bgY }}
      >
        <img
          src="https://picsum.photos/id/1015/1920/1080"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/50 to-ivory/80" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(251,247,240,0.6) 0%, transparent 70%)',
        }}
      />

      {/* Gold shimmer specks */}
      {SHIMMER_DOTS.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold animate-float-slow"
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        variants={heroStagger}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        {/* Label */}
        <motion.p
          variants={fadeUp}
          className="mb-6 text-xs font-sans font-medium uppercase tracking-[0.3em] text-muted"
        >
          We are getting married
        </motion.p>

        {/* Cross ornament */}
        <motion.div variants={crossVariant} className="mb-6">
          <CrossOrnament />
        </motion.div>

        {/* Couple names */}
        <motion.div variants={revealMask} className="mb-4 w-full px-2">
          <h1
            className="leading-tight"
            style={{ fontSize: 'clamp(2.25rem, 9vw, 6rem)' }}
          >
            <span className="block font-serif font-bold text-ink break-words hyphens-auto">
              {COUPLE.groom}
            </span>
            <span className="block font-script text-gold my-1" style={{ fontSize: '0.6em' }}>
              &amp;
            </span>
            <span className="block font-serif font-bold text-ink break-words hyphens-auto">
              {COUPLE.bride}
            </span>
          </h1>
        </motion.div>

        {/* Ornamental divider */}
        <motion.div
          variants={fadeUp}
          className="my-6 h-5 w-32 bg-ornate-divider bg-center bg-no-repeat"
          aria-hidden="true"
        />

        {/* Date block */}
        <motion.p
          variants={fadeUp}
          className="text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.25em] text-muted"
        >
          Saturday &bull; 09 May 2026 &bull; Tirunelveli
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-md font-serif italic text-sm sm:text-base text-muted/80 leading-relaxed"
        >
          Two souls, one faith, one forever — joined in Christ&rsquo;s love.
        </motion.p>

        {/* Scroll indicator */}
        <motion.button
          variants={fadeUp}
          onClick={scrollToStory}
          aria-label="Scroll to Our Story"
          className="mt-12 flex items-center justify-center p-3 text-gold/60 hover:text-gold transition-colors"
        >
          <ChevronDown className="h-6 w-6 animate-bounce-slow" />
        </motion.button>
      </motion.div>
    </header>
  )
}
