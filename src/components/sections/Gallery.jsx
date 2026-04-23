import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY } from '../../lib/constants'
import Lightbox from '../ui/Lightbox'

function useDotButtons(emblaApi) {
  const [selected, setSelected] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  return { selected, scrollSnaps }
}

export default function Gallery() {
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 1 },
      },
    },
    [autoplayRef.current]
  )

  const { selected, scrollSnaps } = useDotButtons(emblaApi)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') scrollPrev()
      if (e.key === 'ArrowRight') scrollNext()
    },
    [scrollPrev, scrollNext]
  )

  return (
    <section id="gallery" className="relative bg-ivory py-24 md:py-32 section-fade">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-muted mb-4">
            Moments
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">
            Captured in Love
          </h2>
          <div className="gold-rule mx-auto max-w-xs" />
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Photo gallery carousel"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {GALLERY.map((img, i) => {
                const isActive = i === selected

                return (
                  <div
                    key={img.src}
                    className="flex-[0_0_80%] md:flex-[0_0_33.333%] min-w-0 pl-4 transition-all duration-300"
                    style={{
                      transform: isActive ? 'scale(1)' : 'scale(0.9)',
                      opacity: isActive ? 1 : 0.7,
                    }}
                  >
                    <button
                      onClick={() => setLightboxIndex(i)}
                      className="block w-full overflow-hidden rounded-2xl shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      aria-label={`View ${img.alt}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="aspect-[3/4] w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Nav buttons — 44×44 minimum tap target */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/80 border border-gold/20 text-gold shadow-soft backdrop-blur-sm transition-all hover:shadow-glow hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/80 border border-gold/20 text-gold shadow-soft backdrop-blur-sm transition-all hover:shadow-glow hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots — each button is 44px tall for accessible tap target */}
        <div className="mt-6 flex justify-center gap-1">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] sm:min-w-0"
            >
              <span
                className={`block transition-all duration-300 rounded-full ${
                  i === selected
                    ? 'w-8 h-2.5 bg-gold'
                    : 'w-2.5 h-2.5 bg-champagne hover:bg-gold/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) => (prev - 1 + GALLERY.length) % GALLERY.length)
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev + 1) % GALLERY.length)
          }
        />
      )}
    </section>
  )
}
