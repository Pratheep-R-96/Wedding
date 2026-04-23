import { useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import useBackgroundMusic from '../../hooks/useBackgroundMusic'

function Equalizer({ animate }) {
  const bars = [
    { height: animate ? '60%' : '30%', delay: '0s' },
    { height: animate ? '100%' : '30%', delay: '0.15s' },
    { height: animate ? '75%' : '30%', delay: '0.3s' },
    { height: animate ? '90%' : '30%', delay: '0.05s' },
  ]

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="text-gold">
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={2 + i * 5}
          width="3"
          rx="1"
          fill="currentColor"
          style={{
            y: animate ? undefined : '10px',
            height: bar.height,
            transformOrigin: 'bottom',
            animation: animate ? `eqPulse 0.8s ease-in-out ${bar.delay} infinite alternate` : 'none',
          }}
        />
      ))}
    </svg>
  )
}

function MutedNote() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

export default function MusicToggle() {
  const { isPlaying, toggle } = useBackgroundMusic('/audio/background.mp3')
  const prefersReduced = useReducedMotion()
  const [showToast, setShowToast] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(() => {
    try {
      return localStorage.getItem('music-first-click') === 'true'
    } catch {
      return false
    }
  })
  const [hovered, setHovered] = useState(false)

  function handleClick() {
    if (!hasInteracted) {
      setHasInteracted(true)
      try { localStorage.setItem('music-first-click', 'true') } catch {}
      if (!isPlaying) {
        setShowToast(true)
      }
    }
    toggle()
  }

  useEffect(() => {
    if (!showToast) return
    const t = setTimeout(() => setShowToast(false), 3000)
    return () => clearTimeout(t)
  }, [showToast])

  const label = isPlaying ? 'Pause music' : 'Play music'

  return (
    <div className="relative">
      {/* Tooltip */}
      {hovered && (
        <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-ink/80 px-3 py-1.5 text-[10px] font-sans text-ivory pointer-events-none">
          {label}
        </span>
      )}

      {/* Toast */}
      {showToast && (
        <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-gold px-3 py-1.5 text-[10px] font-sans text-ivory animate-fade-up pointer-events-none">
          🎵 Soft instrumental playing
        </span>
      )}

      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-ivory/90 shadow-soft backdrop-blur border border-gold/30 transition-all hover:scale-105 ${
          isPlaying && !prefersReduced ? 'animate-pulse-glow' : 'hover:shadow-glow'
        }`}
      >
        {isPlaying ? <Equalizer animate={!prefersReduced} /> : <MutedNote />}
      </button>
    </div>
  )
}
