import { COUPLE } from '../../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-cream text-muted">
      <div className="gold-rule" />

      <div className="mx-auto max-w-2xl px-6 pb-10 pt-2 text-center">
        <p className="font-script text-3xl text-gold mb-4 break-words">
          {COUPLE.groom} &amp; {COUPLE.bride}
        </p>

        <p className="font-serif italic text-sm leading-relaxed text-muted/80 mb-6 break-words">
          &ldquo;Therefore what God has joined together, let no one separate.&rdquo;
          <br />
          <span className="text-xs not-italic tracking-wide">— Mark 10:9</span>
        </p>

        <p className="text-xs tracking-widest uppercase text-muted/60 mb-8 break-words">
          {COUPLE.groom} &amp; {COUPLE.bride} &bull; 9 May 2026 &bull; Tirunelveli
        </p>

        <p className="text-[11px] text-muted/40">
          Made with love
        </p>
      </div>
    </footer>
  )
}
