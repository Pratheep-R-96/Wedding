import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../../lib/constants'
import clsx from 'clsx'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-md bg-ivory/80 border-b border-gold/20'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => scrollTo('hero')}
            className="font-script text-2xl text-gold select-none"
          >
            P &amp; F
          </button>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="group relative text-sm font-medium text-ink/70 transition-colors hover:text-gold"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-ink/70 hover:text-gold transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ivory/95 backdrop-blur-lg"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-ink/70 hover:text-gold transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                hidden: {},
              }}
              className="flex flex-col items-center gap-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <button
                    onClick={() => {
                      setOpen(false)
                      setTimeout(() => scrollTo(link.id), 300)
                    }}
                    className="text-2xl font-serif text-ink/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
