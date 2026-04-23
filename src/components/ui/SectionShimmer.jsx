/** Shimmer skeleton shown while a lazy section is loading. */
export default function SectionShimmer({ minHeight = 'min-h-[600px]' }) {
  return (
    <div
      className={`${minHeight} w-full rounded-none animate-shimmer`}
      style={{
        background: 'linear-gradient(90deg, #E9D9B8 25%, #F5EDE1 50%, #E9D9B8 75%)',
        backgroundSize: '400% 100%',
      }}
      aria-hidden="true"
    />
  )
}
