/**
 * UrlWordmark — the "alderman.ai" URL wordmark.
 *
 * Text-based (JetBrains Mono) rather than SVG, so it can share a single
 * font-size scale with the other nav items and stay optically aligned
 * without aspect-ratio gymnastics. Distinct from the stacked SVG logo
 * mark — this is the URL itself rendered in the brand color chord.
 *
 * Color chord (locked 2026-04-21, text-based version):
 *   alder — purple · man — orange · . — purple · ai — green
 *
 * The `size` prop sets the font-size in px. 16px is the nav default.
 *
 * Note: this chord differs from the previously-documented SVG chord
 * (`ald`/`erman`/`.` white/`ai`). The text-based chord here is the
 * source of truth going forward; update the SVG asset to match when
 * it's next touched.
 *
 * Spec: brand-guide-merged-v1.2.md § 2.1 (wordmark, IDE-mode inline, locked).
 */
type UrlWordmarkProps = {
  size?: number
}

export function UrlWordmark({ size = 16 }: UrlWordmarkProps) {
  return (
    <span
      aria-label="alderman.ai"
      className="font-mono leading-none"
      style={{ fontSize: `${size}px` }}
    >
      <span className="text-purple">alder</span>
      <span className="text-orange">man</span>
      <span className="text-purple">.</span>
      <span className="text-green">ai</span>
    </span>
  )
}
