import { useReducedMotion } from 'framer-motion'

const ELEMENTS = [
  {
    top: '12%',
    left: '5%',
    size: 6,
    duration: '10s',
    delay: '0s',
    type: 'speck',
  },
  {
    top: '38%',
    right: '4%',
    size: 28,
    duration: '12s',
    delay: '2s',
    type: 'cross',
  },
  {
    top: '62%',
    left: '7%',
    size: 24,
    duration: '14s',
    delay: '1s',
    type: 'dove',
  },
  {
    top: '85%',
    right: '8%',
    size: 5,
    duration: '8s',
    delay: '3s',
    type: 'speck',
  },
]

function CrossSVG({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="4" x2="12" y2="20" stroke="#C9A96E" strokeWidth="0.75" strokeLinecap="round" />
      <line x1="7" y1="9" x2="17" y2="9" stroke="#C9A96E" strokeWidth="0.75" strokeLinecap="round" />
    </svg>
  )
}

function DoveSVG({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12C3 12 6 8 12 8C18 8 21 12 21 12"
        stroke="#C9A96E"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M12 8C12 8 10 4 7 5C4 6 5 9 7 10"
        stroke="#C9A96E"
        strokeWidth="0.6"
        fill="none"
      />
      <circle cx="8" cy="7" r="0.5" fill="#C9A96E" />
    </svg>
  )
}

export default function FloatingDecor() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {ELEMENTS.map((el, i) => (
        <span
          key={i}
          className={prefersReduced ? '' : 'animate-float-slow'}
          style={{
            position: 'absolute',
            top: el.top,
            left: el.left,
            right: el.right,
            opacity: 0.05,
            animationDuration: el.duration,
            animationDelay: el.delay,
          }}
        >
          {el.type === 'speck' && (
            <span
              className="block rounded-full bg-gold"
              style={{ width: el.size, height: el.size }}
            />
          )}
          {el.type === 'cross' && <CrossSVG size={el.size} />}
          {el.type === 'dove' && <DoveSVG size={el.size} />}
        </span>
      ))}
    </div>
  )
}
