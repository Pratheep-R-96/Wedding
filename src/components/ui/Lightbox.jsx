import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const overlayRef = useRef(null)

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  // Focus trap
  useEffect(() => {
    if (overlayRef.current) overlayRef.current.focus()
  }, [index])

  const image = images[index]
  if (!image) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-ivory/95 backdrop-blur-lg outline-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/80 border border-gold/20 text-muted hover:text-gold transition-colors"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Prev */}
        <button
          onClick={onPrev}
          className="absolute left-4 md:left-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/80 border border-gold/20 text-muted hover:text-gold transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Image */}
        <motion.img
          key={index}
          src={image.src}
          alt={image.alt}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-glow"
        />

        {/* Next */}
        <button
          onClick={onNext}
          className="absolute right-4 md:right-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/80 border border-gold/20 text-muted hover:text-gold transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Counter */}
        <p className="absolute bottom-6 text-xs font-sans text-muted/60 tracking-wider">
          {index + 1} / {images.length}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
