const reduced = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
}

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.4 } },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
}

export const revealMask = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1, ease: [0.65, 0, 0.35, 1] },
  },
  exit: {
    clipPath: 'inset(0 0 0 100%)',
    transition: { duration: 0.6 },
  },
}

export const reducedMotion = {
  fadeUp: reduced,
  fadeIn: reduced,
  staggerContainer: { initial: {}, animate: {} },
  scaleIn: reduced,
  revealMask: reduced,
}

export function useMotionVariant(variant) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const map = { fadeUp, fadeIn, staggerContainer, scaleIn, revealMask }
  return prefersReduced ? (reducedMotion[variant] || reduced) : (map[variant] || fadeIn)
}
