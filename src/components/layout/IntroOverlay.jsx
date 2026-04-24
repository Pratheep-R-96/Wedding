import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function IntroOverlay({ onEnter }) {
  const prefersReduced = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('entered') === 'true') {
        setVisible(false)
      }
    } catch {
      // ignore
    }
  }, [])

  const variants = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
      exit: prefersReduced
        ? { opacity: 0, transition: { duration: 0.2 } }
        : { opacity: 0, scale: 1.05, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
    }),
    [prefersReduced],
  )

  const monogram = useMemo(
    () => ({
      initial: prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 },
      animate: prefersReduced
        ? { opacity: 1, transition: { duration: 0.3 } }
        : { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 } },
    }),
    [prefersReduced],
  )

  const button = useMemo(
    () => ({
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.55 } },
    }),
    [],
  )

  function handleEnter() {
    try {
      sessionStorage.setItem('entered', 'true')
    } catch {
      // ignore
    }

    onEnter?.()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-darkBg/80 to-transparent" />

          <div className="relative mx-auto flex max-w-lg flex-col items-center px-8 text-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <motion.div variants={monogram} initial="initial" animate="animate">
              <div className="font-script text-gold text-6xl md:text-7xl" style={{ textShadow: '0 0 40px rgba(201,169,110,0.35)' }}>
                P <span className="text-white/70">&amp;</span> F
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
              className="mt-4 font-serif italic text-white/80"
            >
              A Celebration of Love &amp; Faith
            </motion.p>

            <motion.button
              variants={button}
              initial="initial"
              animate="animate"
              onClick={handleEnter}
              aria-label="Enter wedding invitation"
              className="mt-10 rounded-full border border-white/20 bg-white/10 px-8 py-3 font-sans text-sm tracking-widest text-white/90 backdrop-blur-md shadow-[0_0_40px_rgba(201,169,110,0.18)] transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold/60"
            >
              Tap to Enter
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
