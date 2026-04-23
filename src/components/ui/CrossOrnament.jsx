export default function CrossOrnament({ className = '' }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <filter id="cross-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#cross-glow)">
        <line x1="24" y1="6" x2="24" y2="42" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="18" x2="36" y2="18" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="18" r="2" fill="none" stroke="#C9A96E" strokeWidth="0.75" opacity="0.6" />
        <path d="M20 6 Q24 10 28 6" fill="none" stroke="#C9A96E" strokeWidth="0.75" opacity="0.5" />
        <path d="M20 42 Q24 38 28 42" fill="none" stroke="#C9A96E" strokeWidth="0.75" opacity="0.5" />
      </g>
    </svg>
  )
}
