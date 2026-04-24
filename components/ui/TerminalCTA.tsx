import Link from 'next/link'

/**
 * TerminalCTA — bracketed "terminal-style" clickable CTA. The unified CTA
 * primitive across the site: H2.5 inline CTAs, the floating nav CTA, and
 * anywhere else a bracketed click target is needed.
 *
 * Visual:  [ >_ body text with one word highlighted ]
 *   [ ]    — orange brackets, framing the whole button. Can ticker-blink
 *            at 2.12s via `bracketBlink` — half the TerminalLine cursor
 *            cadence, for the "now you can click me" shimmer.
 *   >_     — purple static prompt (decorative, not a real cursor)
 *   body   — mono, lowercase by default, ide-fg by default, with per-
 *            segment color overrides for inline accents
 *
 * CODIFIED DEFAULTS (H2.5 is the reference):
 *   fontSize       20px   (≈150% of the old 13px PrimaryButton)
 *   border         1px solid `ide-fg-mute` (#75715E) — one of the few
 *                  places the muted IDE foreground is deployed
 *   padding        px-3 py-2 (12px horizontal, 8px vertical)
 *   radius         rounded-sm
 *   hover          bg-orange/10 (matches the old PrimaryButton hover)
 *   lowercase      true — set false for CTAs that need mixed case
 *                         (e.g. the nav's `HUMAN` brand caps)
 *   bracketBlink   false — opt-in. Set true in contexts where the CTA
 *                         should pulse on its own (e.g. the nav).
 *                         In H2.5 it flips from false → true when the
 *                         upstream TerminalLine finishes typing.
 *
 * PrimaryButton (`components/ui/PrimaryButton.tsx`) is still around for
 * the section-level "big" CTA treatment (H5 FinalCTA, A6 About CTA), but
 * the floating nav now uses TerminalCTA so everything inline/compact
 * shares one voice.
 *
 * Click target is the whole framed string (brackets + prompt + body), so
 * the entire visual is one tap zone.
 *
 * Segments pattern is shared with TerminalLine — same shape, so inline
 * accents can be styled the same way in both components.
 *
 * ┌───────────────────────────────────────────────────────────────────────┐
 * │ USAGE                                                                 │
 * │                                                                       │
 * │   <TerminalCTA                                                        │
 * │     href="/contact"                                                   │
 * │     segments={[                                                       │
 * │       { text: 'click here for more ' },                               │
 * │       { text: 'help', color: 'text-orange' },                         │
 * │     ]}                                                                │
 * │   />                                                                  │
 * │                                                                       │
 * │   // Nav use — mixed case, always-blinking brackets:                  │
 * │   <TerminalCTA                                                        │
 * │     href="/contact"                                                   │
 * │     lowercase={false}                                                 │
 * │     bracketBlink                                                      │
 * │     segments={[                                                       │
 * │       { text: 'talk to a ' },                                         │
 * │       { text: 'HUMAN', color: 'text-orange' },                        │
 * │     ]}                                                                │
 * │   />                                                                  │
 * └───────────────────────────────────────────────────────────────────────┘
 */

export type TerminalCTASegment = {
  /** The substring this segment represents. */
  text: string
  /** Tailwind text-color class. Defaults to the CTA's `textColor`. */
  color?: string
  /**
   * Extra Tailwind classes applied to this segment's span (e.g.
   * `font-medium` to bump a word's weight). Layered on top of `color`.
   */
  className?: string
}

export type TerminalCTAProps = {
  /** If provided, renders an `<a>` (Next.js Link). Otherwise a button. */
  href?: string
  /** Click handler (optional). */
  onClick?: () => void
  /** Plain text for a single-color body. Ignored if `segments` is provided. */
  text?: string
  /** Styled segments for inline color accents. Takes precedence over `text`. */
  segments?: TerminalCTASegment[]
  /** Font size in px. Default 20 (≈150% of PrimaryButton's 13px). */
  fontSize?: number
  /** Tailwind text-color class for the framing `[` and `]`. Default `"text-orange"`. */
  bracketColor?: string
  /** Tailwind text-color class for the `>_` prompt. Default `"text-purple"`. */
  promptColor?: string
  /** Tailwind text-color class for un-accented body text. Default `"text-ide-fg"`. */
  textColor?: string
  /** Force body text to lowercase. Default `true`. */
  lowercase?: boolean
  /**
   * When `true`, the framing `[` and `]` blink at half the speed of
   * TerminalLine's cursor (2.12s vs 1.06s). Used to signal "now you can
   * click me" once the upstream terminal line has finished deploying.
   * Respects `prefers-reduced-motion` via Tailwind's `motion-reduce:` variant.
   * Default `false`.
   */
  bracketBlink?: boolean
  /** Extra classes applied to the outer clickable wrapper. */
  className?: string
}

export function TerminalCTA({
  href,
  onClick,
  text,
  segments,
  fontSize = 20,
  bracketColor = 'text-orange',
  promptColor = 'text-purple',
  textColor = 'text-ide-fg',
  lowercase = true,
  bracketBlink = false,
  className = '',
}: TerminalCTAProps) {
  const bracketBlinkClass = bracketBlink
    ? 'animate-bracket-blink motion-reduce:animate-none'
    : ''
  const activeSegments: TerminalCTASegment[] =
    segments && segments.length > 0 ? segments : text ? [{ text }] : []

  // Screen-reader-friendly label — just the body text, without the decorative
  // brackets/prompt characters.
  const ariaLabel = activeSegments.map((s) => s.text).join('')

  // Hover treatment mirrors PrimaryButton (the top-right nav CTA) so both
  // CTA primitives share one hover language: `hover:bg-orange/10`. A small
  // padding + rounded-sm give the tint a touch of breathing room around the
  // brackets instead of hugging the glyph edges.
  //
  // Default border uses `ide-fg-mute` — one of the few places Alex is
  // comfortable deploying the muted IDE foreground. Kept on TerminalCTA
  // only (not PrimaryButton) so the inline CTAs get a quiet frame that
  // lives behind the orange brackets.
  const body = (
    <span
      className={`font-mono inline-flex items-baseline gap-[1ch] rounded-sm border border-ide-fg-mute px-3 py-2 transition hover:bg-orange/10 ${className}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Opening bracket (decorative, hidden from AT). When `bracketBlink`
          is true, this ticks on/off at 2.12s — half the speed of
          TerminalLine's cursor — to signal the CTA has come alive. */}
      <span
        className={`${bracketColor} select-none ${bracketBlinkClass}`}
        aria-hidden
      >
        [
      </span>

      {/* Middle: `>_` prompt + body text. No space between `>` and `_`. */}
      <span className="inline-flex items-baseline gap-[1ch]">
        <span className={`${promptColor} select-none`} aria-hidden>
          &gt;_
        </span>
        <span className={lowercase ? 'lowercase' : ''}>
          {activeSegments.map((seg, i) => (
            <span
              key={i}
              className={`${seg.color ?? textColor} ${seg.className ?? ''}`}
            >
              {seg.text}
            </span>
          ))}
        </span>
      </span>

      {/* Closing bracket (decorative, hidden from AT). Shares the same
          blink rhythm as the opening bracket when `bracketBlink` is true. */}
      <span
        className={`${bracketColor} select-none ${bracketBlinkClass}`}
        aria-hidden
      >
        ]
      </span>
    </span>
  )

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} onClick={onClick}>
        {body}
      </Link>
    )
  }
  return (
    <button type="button" aria-label={ariaLabel} onClick={onClick}>
      {body}
    </button>
  )
}
