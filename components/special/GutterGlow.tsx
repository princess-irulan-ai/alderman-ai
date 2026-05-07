/**
 * GutterGlow — soft atmospheric glow emanating from a column or paper-
 * app edge into the adjacent gutter.
 *
 * Render INSIDE a `position: relative` parent whose left/right edges
 * mark where the glow should emanate from. The glow is a single radial-
 * gradient ellipse whose center sits AT the parent's edge (the source),
 * fading smoothly into the gutter beyond. No solid band, no hard
 * outline — just a soft halo.
 *
 * Geometry:
 *   - Envelope: 30px wide × parent-height + 20px tall (10px above the
 *     parent's top, 10px below its bottom).
 *   - Ellipse: x-radius = 30px (matches envelope width); y-radius = 50%
 *     of envelope height. The perimeter aligns with the envelope's
 *     outer edges, so the gradient hits 0 at top, bottom, and the
 *     gutter's outer edge — fades naturally on every side without
 *     needing a separate mask.
 *
 * Color stops: 0.55 → 0.30 → 0.10 → 0 across 0%, 25%, 60%, 100%. The
 * curve is shaped to drop off quickly near the source then trail
 * faintly to nothing — closer to a Gaussian falloff than a linear one,
 * which reads as ambient light rather than a graphic element.
 *
 * Stacking: `z-[-1]` puts the glow BEHIND the column's ::before/::after
 * rule-line pseudos. The column itself sets `z-0` to scope this. Both
 * sides paint behind the rule consistently — no left/right asymmetry.
 *
 * Visible only at `tablet:` (≥768px). Decorative; aria-hidden +
 * pointer-events-none.
 */

type GutterGlowProps = {
  side: 'left' | 'right'
  color: 'purple' | 'orange'
}

const GLOW_COLORS = {
  purple: '174, 129, 255',
  orange: '253, 151, 31',
} as const

export function GutterGlow({ side, color }: GutterGlowProps) {
  const rgb = GLOW_COLORS[color]
  // Ellipse anchored at the side of the envelope that meets the parent
  // edge — `100% 50%` (right-center) for left-side glows so the
  // gradient peak is at the envelope's right edge (= parent-left); `0%
  // 50%` (left-center) mirrors on the right side.
  const gradientCenter = side === 'left' ? '100% 50%' : '0% 50%'
  const gradient =
    `radial-gradient(ellipse 30px 50% at ${gradientCenter}, ` +
    `rgba(${rgb}, 0.55) 0%, ` +
    `rgba(${rgb}, 0.30) 25%, ` +
    `rgba(${rgb}, 0.10) 60%, ` +
    `rgba(${rgb}, 0) 100%)`
  const sideStyle = side === 'left' ? { left: '-30px' } : { right: '-30px' }
  return (
    <div
      aria-hidden
      className="hidden tablet:block absolute pointer-events-none z-[-1]"
      style={{
        width: '30px',
        height: 'calc(100% + 20px)',
        top: '-10px',
        ...sideStyle,
        backgroundImage: gradient,
      }}
    />
  )
}
