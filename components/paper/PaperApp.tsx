import type { CSSProperties, ReactNode } from 'react'

/**
 * PaperApp — the cream card that floats on the IDE substrate.
 *
 * Chrome strip at top (brand-accent dots + filename-left, page-marker-right,
 * 1px separator rule below). Body content below. Ambient shadow stack
 * behind it (non-negotiable per spec).
 *
 * Width: narrow (1 sub-col) | medium (2 sub-cols) | wide (3 sub-cols).
 * Always right-justified within the content canvas — the right edge is
 * invariant, left edge varies by width.
 *
 * 2026-04-21 shine pass:
 *  - Added brand-accent chord (dots on the left of the chrome strip) with
 *    a matching color signature. Toggle with `showAccentDots={false}` for
 *    instances that don't represent Alderman's own content.
 *  - Softened the chrome→body divider from ink-faint/40 to ink-faint/30.
 *
 * 2026-04-22 canonical promotion — the H1-sandbox treatments graduated
 * to PaperApp defaults after hero-v0.2 was approved. Three changes:
 *  - Opalescent chrome gradient (105°, paper-2 → warm-mauve → ~15%-sat
 *    purple) is now the default chrome background via
 *    `DEFAULT_CHROME_STYLE` below. Callers can still override via the
 *    `chromeStyle` prop (caller wins on conflict).
 *  - Default `accentDotSize` is now 11 (was 7).
 *  - Default `accentDotOrder` is now `['purple', 'orange', 'green']`
 *    (was `['green', 'orange', 'purple']`) — puts purple on the far left
 *    so it sits as visually distant as possible from the gradient's
 *    purple end on the right.
 *  - The 3-layer shadow stack (muted ledge + orange glow + dark
 *    grounding) is applied via the Tailwind `shadow-paper-glow` class on
 *    the inner card div. See `tailwind.config.js` + `lib/tokens.ts`.
 *
 * Escape hatches (`chromeClassName`, `chromeStyle`, `accentDotSize`,
 * `accentDotOrder`, `paperStyle`) remain available for future per-instance
 * overrides but are no longer sandbox-scoped.
 *
 * Copy convention: H2 titles inside a PaperApp render in Title Case
 * (capitalize nouns/verbs/adjectives/adverbs; lowercase short connectives:
 * to, for, and, a, the, in, of). Body prose stays sentence case.
 *
 * Spec: os-model-concept.md "The three primitives (visual specification)",
 *       "Ambient glow", "Chrome (visual spec)".
 */
type AccentDotColor = 'green' | 'orange' | 'purple'

type PaperAppProps = {
  /**
   * Width behavior:
   *   narrow  — col-3 of the 3-col canvas (right 1/3)
   *   medium  — cols 2-3 (right 2/3)
   *   wide    — all 3 canvas cols
   *   fit     — no column grid positioning; inner card is `w-fit` so it
   *             shrinks to its content's natural width. Parent must
   *             handle positioning (use a flex row or inline placement).
   *             Use for "wrap snugly around a single image / small card"
   *             compositions that don't align to the canvas grid.
   */
  width?: 'narrow' | 'medium' | 'wide' | 'fit'
  chromeLeft?: ReactNode
  chromeRight?: ReactNode
  children: ReactNode
  className?: string
  /** Show the brand-accent dot chord on the left of the chrome strip. Default true. */
  showAccentDots?: boolean
  /** Extra Tailwind classes appended to the chrome strip. Escape hatch. */
  chromeClassName?: string
  /**
   * Inline style applied to the chrome strip, merged over
   * `DEFAULT_CHROME_STYLE` (opalescent gradient). Caller keys win on
   * conflict, so passing `{ background: '...' }` replaces the default
   * gradient.
   */
  chromeStyle?: CSSProperties
  /** Pixel size of each brand-accent dot. Default 11. Escape hatch. */
  accentDotSize?: number
  /**
   * Order of the brand-accent dots. Default
   * `['purple', 'orange', 'green']`. Escape hatch for specific
   * compositions that need a different chord.
   */
  accentDotOrder?: readonly AccentDotColor[]
  /**
   * Inline style applied to the inner paper card element (the div
   * carrying `rounded-paper bg-paper shadow-paper-glow`). When a
   * `boxShadow` is set here, it wins over the Tailwind class. Escape
   * hatch — canonical shadow lives in `tailwind.config.js`
   * `shadow-paper-glow` + `lib/tokens.ts` `ambientGlow`.
   */
  paperStyle?: CSSProperties
  /**
   * Replaces the default body padding (`px-8 py-10`). Pass `''` for a
   * full-bleed body — useful when the child is a single image that
   * should extend to the paper edges so the outer `overflow-hidden
   * rounded-paper` clips the image's bottom corners into the paper's
   * radius (e.g. A1 headshot on /about). `text-ink` is preserved
   * regardless.
   */
  bodyClassName?: string
}

/**
 * Canonical chrome background — opalescent 105° gradient from paper-2
 * through a subtle warm-mauve middle to a ~15%-saturated purple on the
 * right (derived from brand purple #AE81FF). Applied by default; callers
 * can replace by passing a different `background` in `chromeStyle`.
 */
const DEFAULT_CHROME_STYLE: CSSProperties = {
  background:
    'linear-gradient(105deg, #EDEAE0 0%, #EDEAE0 28%, #ECE5E3 52%, #E1D9E1 78%, #DBD3DE 100%)',
}

const dotColorClass: Record<AccentDotColor, string> = {
  green: 'bg-green/80',
  orange: 'bg-orange/80',
  purple: 'bg-purple/80',
}

const widthClass: Record<NonNullable<PaperAppProps['width']>, string> = {
  narrow: 'col-start-3 col-span-1',
  medium: 'col-start-2 col-span-2',
  wide: 'col-span-3',
  fit: '',
}

export function PaperApp({
  width = 'narrow',
  chromeLeft,
  chromeRight,
  children,
  className = '',
  showAccentDots = true,
  chromeClassName = '',
  chromeStyle,
  accentDotSize = 11,
  accentDotOrder = ['purple', 'orange', 'green'] as const,
  paperStyle,
  bodyClassName,
}: PaperAppProps) {
  return (
    <div className={`${widthClass[width]} ${className}`}>
      <div
        className={`overflow-hidden rounded-paper bg-paper shadow-paper-glow ${
          width === 'fit' ? 'w-fit' : ''
        }`}
        style={paperStyle}
      >
        {/* Chrome strip — `bg-paper-2` as a solid-color fallback beneath
            the opalescent gradient in DEFAULT_CHROME_STYLE. Inline
            `background` wins over the Tailwind class in all modern
            browsers. */}
        <div
          className={`flex items-center justify-between bg-paper-2 px-5 h-10 border-b border-ink-faint/30 ${chromeClassName}`}
          style={{ ...DEFAULT_CHROME_STYLE, ...chromeStyle }}
        >
          <div className="flex items-center gap-4">
            {showAccentDots && (
              <div className="flex items-center gap-1.5" aria-hidden>
                {accentDotOrder.map((color, i) => (
                  <span
                    key={`${color}-${i}`}
                    className={`rounded-full ${dotColorClass[color]}`}
                    style={{ height: accentDotSize, width: accentDotSize }}
                  />
                ))}
              </div>
            )}
            <span className="font-mono text-[11px] text-ink-soft tracking-tight">
              {chromeLeft}
            </span>
          </div>
          <span className="font-mono text-[11px] text-ink-faint tracking-tight">
            {chromeRight}
          </span>
        </div>
        {/* Body. Default padding `px-8 py-10`; override via `bodyClassName`
            (pass `''` for full-bleed — child extends to paper edges and
            inherits the outer `rounded-paper overflow-hidden` corner
            rounding). `text-ink` is preserved regardless. */}
        <div className={`text-ink ${bodyClassName ?? 'px-8 py-10'}`}>{children}</div>
      </div>
    </div>
  )
}
