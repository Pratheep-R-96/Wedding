/** Shimmer skeleton shown while a lazy section is loading. */
export default function SectionShimmer({ minHeight = 'min-h-[600px]' }) {
  return (
    <div
      className={`${minHeight} w-full rounded-none animate-shimmer`}
      style={{
        background: 'linear-gradient(90deg, #E6D3A3 25%, #F1E7D8 50%, #E6D3A3 75%)',
        backgroundSize: '400% 100%',
      }}
      aria-hidden="true"
    />
  )
}
