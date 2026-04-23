/**
 * Responsive <picture> element with WebP + JPEG srcset.
 *
 * Works automatically for picsum.photos URLs (both /id/ and /seed/ patterns).
 * For real images: supply an `avifSrcset` prop (string of "url Xw" entries) once
 * AVIF variants are generated at build time (e.g. via vite-imagetools).
 */

const WIDTHS = [480, 768, 1200, 1920]

function buildPicsumSrcset(src, widths, webp = false) {
  try {
    const url = new URL(src)
    if (url.hostname !== 'picsum.photos') return null
    const parts = url.pathname.split('/').filter(Boolean)
    const ext = webp ? '.webp' : ''

    if (parts[0] === 'id' && parts.length >= 4) {
      const id = parts[1]
      const ratio = parseInt(parts[3]) / parseInt(parts[2])
      return widths
        .map((w) => `https://picsum.photos/id/${id}/${w}/${Math.round(w * ratio)}${ext} ${w}w`)
        .join(', ')
    }

    if (parts[0] === 'seed' && parts.length >= 4) {
      const seed = parts[1]
      const ratio = parseInt(parts[3]) / parseInt(parts[2])
      return widths
        .map((w) => `https://picsum.photos/seed/${seed}/${w}/${Math.round(w * ratio)}${ext} ${w}w`)
        .join(', ')
    }
  } catch {}
  return null
}

/**
 * Props:
 *   src          — fallback JPEG URL (also used for srcset base)
 *   alt          — alt text (pass "" + aria-hidden for decorative images)
 *   widths       — responsive widths for srcset (default 480/768/1200/1920)
 *   sizes        — <img sizes> attribute
 *   width/height — intrinsic dimensions for CLS prevention
 *   loading      — "lazy" (default) | "eager"
 *   decoding     — "async" (default) | "sync"
 *   avifSrcset   — optional pre-built AVIF srcset string
 *   pictureClass — className on the <picture> wrapper
 *   className    — className on the <img>
 *   ...rest      — any extra <img> props (aria-hidden, fetchpriority, etc.)
 */
export default function Picture({
  src,
  alt,
  widths = WIDTHS,
  sizes = '100vw',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  avifSrcset,
  pictureClass = '',
  className = '',
  ...rest
}) {
  const webpSrcset = buildPicsumSrcset(src, widths, true)
  const jpgSrcset = buildPicsumSrcset(src, widths, false)

  return (
    <picture className={pictureClass}>
      {/* AVIF — best compression; supply avifSrcset once real images are processed */}
      {avifSrcset && <source type="image/avif" srcSet={avifSrcset} sizes={sizes} />}

      {/* WebP — wide support, ~30% smaller than JPEG */}
      {webpSrcset && <source type="image/webp" srcSet={webpSrcset} sizes={sizes} />}

      {/* JPEG fallback */}
      <img
        src={src}
        srcSet={jpgSrcset || undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={className}
        {...rest}
      />
    </picture>
  )
}
