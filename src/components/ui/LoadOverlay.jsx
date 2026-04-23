import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const RING_CIRCUMFERENCE = 2 * Math.PI * 48

export default function LoadOverlay() {
  const prefersReduced = useReducedMotion()
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem('intro-shown') !== 'true'
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!visible) return

    const delay = prefersReduced ? 400 : 1600
    const t = setTimeout(() => {
      setVisible(false)
      try { sessionStorage.setItem('intro-shown', 'true') } catch {}
    }, delay)

    return () => clearTimeout(t)
  }, [visible, prefersReduced])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0.2 : 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
        >
          <div className="relative flex items-center justify-center">
            {/* Gold ring SVG */}
            {!prefersReduced && (
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="absolute"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1.5"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={RING_CIRCUMFERENCE}
                  strokeLinecap="round"
                  style={{
                    animation: 'ringDraw 1.2s ease-out forwards',
                  }}
                />
              </svg>
            )}

            {/* Monogram */}
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReduced ? 0.15 : 0.6, delay: prefersReduced ? 0 : 0.3 }}
              className="font-script text-4xl md:text-5xl text-gold select-none"
            >
              P &amp; F
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
