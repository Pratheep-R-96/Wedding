import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getBlessings, addBlessing } from '../../lib/blessings'
import { scaleIn } from '../../lib/animations'

const CARD_BG = ['bg-cream', 'bg-ivory', 'bg-blush/40']

function HeartBurst({ onDone }) {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 80,
    delay: Math.random() * 0.2,
    color: i % 2 === 0 ? '#C9A96E' : '#E8CFC9',
  }))

  return (
    <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2" aria-hidden="true">
      {hearts.map((h) => (
        <svg
          key={h.id}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={h.color}
          className="absolute"
          style={{
            left: h.x,
            animation: `heartFloat 1s ease-out ${h.delay}s forwards`,
          }}
          onAnimationEnd={h.id === 0 ? onDone : undefined}
        >
          <path d="M12 21C12 21 3 13.5 3 8.5C3 5.5 5.5 3 8.5 3C10.3 3 11.7 4 12 5C12.3 4 13.7 3 15.5 3C18.5 3 21 5.5 21 8.5C21 13.5 12 21 12 21Z" />
        </svg>
      ))}
    </span>
  )
}

function QuoteMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mb-2">
      <path
        d="M4 12C4 8 6 4 10 4V7C8 7 7 9 7 12H10V20H4V12ZM14 12C14 8 16 4 20 4V7C18 7 17 9 17 12H20V20H14V12Z"
        fill="#C9A96E"
        opacity="0.3"
      />
    </svg>
  )
}

function BlessingCard({ blessing, index }) {
  const bg = CARD_BG[index % CARD_BG.length]

  return (
    <motion.div
      layout
      variants={scaleIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${bg} rounded-2xl p-6 shadow-soft break-inside-avoid mb-5 transition-transform duration-300 hover:rotate-1`}
    >
      <QuoteMark />
      <p className="font-serif italic text-sm text-ink leading-relaxed mb-4">
        {blessing.message}
      </p>
      <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-muted">
        — {blessing.name}{blessing.relationship ? `, ${blessing.relationship}` : ''}
      </p>
    </motion.div>
  )
}

export default function Blessings() {
  const [blessings, setBlessings] = useState(() => getBlessings())
  const [name, setName] = useState('')
  const [relationship, setRelationship] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const sparkleRef = useRef(null)

  const canSubmit = name.trim() && message.trim() && message.length <= 280

  const triggerSparkle = useCallback(() => {
    const el = sparkleRef.current
    if (!el) return
    el.style.animation = 'none'
    void el.offsetHeight
    el.style.animation = 'sparkSpin 0.6s ease-out'
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)

    const entry = addBlessing({
      name: name.trim(),
      relationship: relationship.trim(),
      message: message.trim(),
    })

    setBlessings((prev) => [entry, ...prev])
    setName('')
    setRelationship('')
    setMessage('')
    setShowHearts(true)
    triggerSparkle()
    setTimeout(() => setSubmitting(false), 300)
  }

  return (
    <section id="blessings" className="relative bg-ivory py-24 md:py-32 section-fade">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-muted mb-4">
            Blessings &amp; Wishes
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">
            Leave a Blessing
          </h2>
          <div className="gold-rule mx-auto max-w-xs" />
          <p className="mt-4 font-serif italic text-sm text-muted/80">
            Your prayers and wishes mean the world to us.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl rounded-2xl bg-cream border border-gold/20 p-6 md:p-8 shadow-soft"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name *"
              required
              className="w-full rounded-xl border border-gold/20 bg-ivory px-4 py-3 text-sm font-sans text-ink placeholder:text-muted/50 transition-all focus-visible:outline-none focus-visible:border-goldDark focus-visible:ring-2 focus-visible:ring-gold/40"
            />
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="Relationship (e.g. College friend)"
              className="w-full rounded-xl border border-gold/20 bg-ivory px-4 py-3 text-sm font-sans text-ink placeholder:text-muted/50 transition-all focus-visible:outline-none focus-visible:border-goldDark focus-visible:ring-2 focus-visible:ring-gold/40"
            />
          </div>

          <div className="relative mb-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 280))}
              placeholder="Your blessing or wish *"
              required
              rows={3}
              className="w-full resize-none rounded-xl border border-gold/20 bg-ivory px-4 py-3 text-sm font-sans text-ink placeholder:text-muted/50 transition-all focus-visible:outline-none focus-visible:border-goldDark focus-visible:ring-2 focus-visible:ring-gold/40"
            />
            <span
              className={`absolute bottom-3 right-3 text-[10px] font-sans ${
                message.length > 260 ? 'text-goldDark' : 'text-muted/40'
              }`}
            >
              {message.length}/280
            </span>
          </div>

          <span className="relative inline-block">
            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="btn-gold-shine inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-medium uppercase tracking-wider text-ivory transition-all hover:bg-goldDark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Blessing <span ref={sparkleRef} className="inline-block">✨</span>
            </button>
            {showHearts && <HeartBurst onDone={() => setShowHearts(false)} />}
          </span>
        </motion.form>

        {/* Masonry wall */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
          <AnimatePresence>
            {blessings.map((b, i) => (
              <BlessingCard key={b.id} blessing={b} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
