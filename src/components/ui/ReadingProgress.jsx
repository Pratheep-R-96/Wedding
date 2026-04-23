import { motion, useScroll, useTransform } from 'framer-motion'

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
      <motion.div
        className="h-full bg-gradient-to-r from-gold to-champagne"
        style={{ width, opacity }}
      />
    </div>
  )
}
