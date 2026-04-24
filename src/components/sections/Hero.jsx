import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { COUPLE } from '../../lib/constants'
import { fadeUp, revealMask } from '../../lib/animations'
import CrossOrnament from '../ui/CrossOrnament'
import Picture from '../ui/Picture'
import heroCouple from '../../assets/hero-couple.jpg'
import useCountdown from '@/hooks/useCountdown'
import { WEDDING_DATE } from '@/lib/constants'

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
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
}

const bgFade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const groomVariant = {
  initial: { opacity: 0, x: -28 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const brideVariant = {
  initial: { opacity: 0, x: 28 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const ampVariant = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1.25,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const crossVariant = {
  initial: { opacity: 0, scale: 0.8, rotate: -10 },
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

export default function Hero({ start = true }) {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()
  const [ready, setReady] = useState(false)

  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE.getTime())

  useEffect(() => {
    if (prefersReduced) {
      setReady(true)
      return
    }
    setReady(Boolean(start))
  }, [start, prefersReduced])

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
        variants={bgFade}
        initial="initial"
        animate={
          prefersReduced
            ? 'animate'
            : {
                opacity: 1,
                scale: [1, 1.1],
                transition: {
                  opacity: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
                  scale: { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'mirror' },
                },
              }
        }
        className="absolute inset-0"
        style={{ y: bgY, willChange: 'transform' }}
      >
        <Picture
          src={heroCouple}
          alt=""
          aria-hidden="true"
          widths={[480, 768, 1200, 1920]}
          sizes="100vw"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchpriority="high"
          pictureClass="h-full w-full"
          className="h-full w-full object-cover object-top sm:object-center"
          style={{ filter: 'brightness(0.92) contrast(1.08) saturate(1.02)' }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-darkBg/40"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-darkBg/60 via-darkBg/30 to-darkBg/70"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,14,13,0.15),rgba(15,14,13,0.6))]"></div>

      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none bg-[url('/textures/noise.png')]" />
      <div className="absolute top-0 left-1/2 w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] -translate-x-1/2 bg-gold/20 blur-3xl opacity-30" />

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
        animate={ready ? 'animate' : false}
        className={`relative z-10 flex flex-col items-center px-6 text-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${
          ready ? '' : 'opacity-0'
        }`}
      >
            {/* Label */}
            <motion.p
              variants={fadeUp}
              className="mb-6 text-xs font-sans font-medium uppercase tracking-[0.3em] text-white/80"
            >
              We are getting married
            </motion.p>

            {/* Cross ornament */}
            <motion.div variants={crossVariant} className="mb-6">
              <CrossOrnament />
            </motion.div>

            {/* Couple names */}
            <motion.div variants={revealMask} className="mb-4 w-full px-2">
              <h1 className="leading-tight">
                <motion.span
                  variants={groomVariant}
                  className="block font-serif tracking-wide text-white text-6xl md:text-7xl lg:text-8xl break-words hyphens-auto drop-shadow-[0_10px_40px_rgba(201,169,110,0.14)]"
                >
                  {COUPLE.groom}
                </motion.span>
                <motion.span
                  variants={ampVariant}
                  className="block font-script text-gold my-2 drop-shadow-[0_0_18px_rgba(201,169,110,0.28)]"
                >
                  &amp;
                </motion.span>
                <motion.span
                  variants={brideVariant}
                  className="block font-serif tracking-wide text-white text-6xl md:text-7xl lg:text-8xl break-words hyphens-auto drop-shadow-[0_10px_40px_rgba(201,169,110,0.14)]"
                >
                  {COUPLE.bride}
                </motion.span>
              </h1>
            </motion.div>

            {/* Ornamental divider */}
            <motion.div
              variants={fadeUp}
              className="my-6 h-5 w-32 bg-ornate-divider bg-center bg-no-repeat"
              aria-hidden="true"
            />

            {/* Date block */}
            <motion.div
              variants={fadeUp}
              className="mt-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 inline-block text-sm md:text-base tracking-widest text-white/90"
            >
              SATURDAY • 09 MAY 2026
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-md font-serif italic text-sm sm:text-base text-white/80 leading-relaxed"
            >
              Two souls, one faith, one forever — joined in Christ’s love.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 1.25 }}
              className="mt-8 flex justify-center gap-4 flex-wrap"
            >
              {[
                { label: 'DAYS', value: days },
                { label: 'HOURS', value: hours },
                { label: 'MINUTES', value: minutes },
                { label: 'SECONDS', value: seconds },
              ].map((item, idx) => {
                const isSeconds = item.label === 'SECONDS'
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.35 + idx * 0.06 }}
                    whileHover={{ scale: 1.05 }}
                    className={`flex flex-col items-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 min-w-[70px] flex-[1_1_calc(50%-1rem)] sm:flex-[0_0_auto] shadow-[0_0_40px_rgba(201,169,110,0.2)] transition-transform ${
                      isSeconds ? 'shadow-[0_0_45px_rgba(201,169,110,0.22)]' : ''
                    }`}
                  >
                    {isSeconds ? (
                      <motion.span
                        key={seconds}
                        initial={prefersReduced ? false : { opacity: 0.85, scale: 0.98, filter: 'drop-shadow(0 0 0 rgba(201,169,110,0))' }}
                        animate={
                          prefersReduced
                            ? undefined
                            : {
                                opacity: [0.85, 1, 1],
                                scale: [0.98, 1.08, 1],
                                filter: [
                                  'drop-shadow(0 0 0 rgba(201,169,110,0))',
                                  'drop-shadow(0 0 14px rgba(201,169,110,0.22))',
                                  'drop-shadow(0 0 0 rgba(201,169,110,0))',
                                ],
                              }
                        }
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="text-2xl md:text-3xl font-serif text-white"
                      >
                        {item.value}
                      </motion.span>
                    ) : (
                      <motion.span
                        key={item.value}
                        initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
                        animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="text-2xl md:text-3xl font-serif text-white"
                      >
                        {item.value}
                      </motion.span>
                    )}
                    <span className="text-xs tracking-widest text-white/80 mt-1">{item.label}</span>
                  </motion.div>
                )
              })}
            </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: ready ? 1.1 : 0 }}
        onClick={scrollToStory}
        aria-label="Scroll to Our Story"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center p-3 text-white/60 hover:text-white/80 transition-colors"
      >
        <ChevronDown className="h-6 w-6 animate-bounce-slow" />
      </motion.button>
    </header>
  )
}
