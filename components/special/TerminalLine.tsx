'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * TerminalLine — animated one-line "terminal" for IDE-substrate seams.
 *
 * Visual: `>_` idle → `> content_` typing → `> content` (or `> content _`
 * in hanging mode) done.
 *   >    — purple leading prompt. In NON-HANGING mode, sits inline as
 *          a flex item before the typed text. In HANGING mode, sits
 *          absolutely-positioned `3ch` to the left of the container's
 *          content edge (decoupled from the typed text — moving the
 *          container does not move the prompt's offset, and the gap
 *          between prompt and text is determined by the container's
 *          left position, not by inline whitespace).
 *   _    — purple blinking cursor; rides the end of the typed text while
 *          typing. Disappears on `done` unless `persistCursor` is set.
 *
 * CODIFIED DEFAULTS (Alderman terminal voice):
 *   fontSize       var(--font-terminal) — resolves to the page's
 *                  canonical terminal-line size (22px on mobile-locked
 *                  pages; bumped to 30px on /dev/home-page at desktop
 *                  via the .desktop-experiment scope in globals.css).
 *   leadingSpaces  2  (NBSPs prepended to typed content in NON-HANGING
 *                  mode only; in HANGING mode the prompt is in the
 *                  gutter, no NBSP gap needed and leadingSpaces is
 *                  effectively 0).
 *   startDelayMs   1060ms  (1 × 1.06s cursor blink on viewport entry)
 *   charDelayMs    27ms
 *
 * Behavior:
 *   1. Pre-viewport: renders idle with no cursor. Inert until visible.
 *   2. Entering viewport: cursor appears, blinks on 1.06s cycle.
 *   3. After `startDelayMs`: types content at `charDelayMs`.
 *   4. When finished: cursor retires (or persists if `persistCursor`).
 *      Fires `onComplete` so upstream siblings can react.
 *
 * Accepts EITHER a flat `text` string OR a `segments` array (for inline
 * color accents — e.g. highlighting `ai` in green inside an otherwise
 * ide-fg-colored line).
 *
 * Respects `prefers-reduced-motion`: shows the full line instantly with
 * no cursor if reduced-motion is set.
 *
 * HANGING-PROMPT MODE (`hangingPrompt`, opt-in):
 *   The `>` prompt is absolutely-positioned at `left: -3ch` from the
 *   container's content edge, sitting in the outer gutter. Typed text
 *   flows normally inside the container starting at content-box-left.
 *   The prompt and typed text are positionally INDEPENDENT — adjusting
 *   the container's position (e.g. via grid margin-left) shifts the
 *   typed text but not the prompt's offset relative to the container,
 *   so the prompt always sits 3ch to the left of where the text starts.
 *   Used by every TerminalLine on the live site (mobile + desktop).
 *
 *   Refactor history (2026-05-07): previously this mode bonded the
 *   prompt and typed text into a single inline flow via negative-margin
 *   + padding + text-indent math. The bond meant moving the text moved
 *   the prompt by the same amount and vice versa. The decoupled design
 *   above replaces that bond — bracket framing was dropped entirely
 *   (had been opacity-0 on every page anyway via showBrackets=false),
 *   and the prompt became a real positional element instead of a piece
 *   of the typed-text flow.
 *
 * PERSISTENT CURSOR (`persistCursor`, opt-in):
 *   Keeps the `_` cursor blinking in the `done` phase instead of
 *   retiring it. Default off — opt in when the line should keep
 *   feeling active after typing completes (e.g. the hero).
 *
 * ┌───────────────────────────────────────────────────────────────────────┐
 * │ USAGE                                                                 │
 * │                                                                       │
 * │   // Simple:                                                          │
 * │   <TerminalLine text="cd ./how_it_works.md" />                        │
 * │                                                                       │
 * │   // Inline color accents:                                            │
 * │   <TerminalLine                                                       │
 * │     segments={[                                                       │
 * │       { text: 'run it in any ' },                                     │
 * │       { text: 'ai', color: 'text-green' },                            │
 * │       { text: ' platform ' },                                         │
 * │       { text: '...', color: 'text-purple' },                          │
 * │     ]}                                                                │
 * │   />                                                                  │
 * └───────────────────────────────────────────────────────────────────────┘
 */

export type TerminalSegment = {
  /** The substring of the line this segment represents. */
  text: string
  /** Tailwind text-color class. Defaults to the primitive's `textColor` (ide-fg). */
  color?: string
  /**
   * When true, this segment's span gets the `doneBlinkClassName` animation
   * class applied in the `done` phase — pulses while the rest of the line
   * stays static. Use to blink only the tail of a line.
   */
  blinkOnDone?: boolean
}

export type TerminalLineProps = {
  /** Plain text for a single-color line. Ignored if `segments` is provided. */
  text?: string
  /** Styled segments for inline color accents. Takes precedence over `text`. */
  segments?: TerminalSegment[]
  /**
   * How long the cursor blinks (after the component enters the viewport)
   * before typing starts. Default 1060ms — one full 1.06s blink cycle.
   */
  startDelayMs?: number
  /**
   * Delay between each character while typing. Default 27ms — the codified
   * "Alderman terminal speed."
   */
  charDelayMs?: number
  /** Horizontal alignment within its parent. Default `"center"`. */
  align?: 'left' | 'center'
  /** Tailwind text-color class for un-accented typed text. Default `"text-ide-fg"`. */
  textColor?: string
  /** Tailwind text-color class for the leading `>` prompt. Default `"text-purple"`. */
  promptColor?: string
  /** Tailwind text-color class for the blinking `_` cursor. Default `"text-purple"`. */
  cursorColor?: string
  /**
   * @deprecated Brackets are no longer rendered. Prop accepted for
   * back-compat with existing call sites; has no effect.
   */
  bracketColor?: string
  /**
   * Font size. Default `var(--font-terminal)` — resolves to the page's
   * canonical terminal-line size (22px on mobile-locked pages; bumped
   * to 30px on /dev/home-page at desktop via the `.desktop-experiment`
   * scope in globals.css).
   */
  fontSize?: number | string
  /**
   * Number of leading non-breaking spaces prepended to the typed content
   * in NON-HANGING mode. Default 2 — the codified `>  text` gap when
   * the prompt is inline with the text. Ignored in HANGING mode (prompt
   * sits in the gutter, no NBSP gap needed).
   */
  leadingSpaces?: number
  /** Extra classes applied to the outer wrapper. */
  className?: string
  /** Fires once when the typing animation completes (phase → done). */
  onComplete?: () => void
  /**
   * If true, render in hanging-prompt mode: the `>` is absolutely-
   * positioned at `left: -3ch` from the container's content edge,
   * sitting in the outer gutter. Typed text flows normally inside
   * the container starting at content-box-left, decoupled from the
   * prompt. The `align` prop is ignored in hanging mode (effectively
   * forced to left).
   *
   * Default false — non-hanging flex layout is the alternative for
   * cases where prompt and text should sit together inline.
   */
  hangingPrompt?: boolean
  /**
   * If true, the `_` cursor keeps blinking in the `done` phase instead of
   * disappearing when typing completes.
   */
  persistCursor?: boolean
  /**
   * Glyph rendered as the blinking cursor during the `typing` and (if
   * `persistCursor`) `done` phases. Default `"_"`.
   */
  cursorGlyph?: string
  /**
   * Glyph rendered as the blinking cursor DURING THE IDLE PHASE only.
   * Default `undefined` — fall back to `cursorGlyph`.
   */
  idleCursorGlyph?: string
  /**
   * Glyph the blinking cursor swaps TO once the line reaches the
   * `done` phase and the `doneCursorGlyphDelayMs` timer fires. Default
   * `undefined` — fall back to `cursorGlyph`.
   */
  doneCursorGlyph?: string
  /**
   * Delay in ms between entering the `done` phase and swapping the
   * cursor glyph to `doneCursorGlyph`. Default 0.
   */
  doneCursorGlyphDelayMs?: number
  /**
   * When true, the ENTIRE line (prompt + typed text + cursor) blinks
   * as a single unit once the `done` phase is reached, via the outer
   * wrapper. The cursor's own per-span blink is suppressed. Default
   * false.
   */
  blinkOnDone?: boolean
  /**
   * Tailwind animation class applied to (a) any segment that sets
   * `blinkOnDone: true` once the line reaches `done`, and (b) the
   * persistent cursor span in the `done` phase. Default
   * `'animate-terminal-blink'`.
   */
  doneBlinkClassName?: string
  /**
   * @deprecated Brackets are no longer rendered. Prop accepted for
   * back-compat with existing call sites; has no effect.
   */
  showBrackets?: boolean
}

export function TerminalLine({
  text,
  segments,
  startDelayMs = 1060,
  charDelayMs = 27,
  align = 'center',
  textColor = 'text-ide-fg',
  promptColor = 'text-purple',
  cursorColor = 'text-purple',
  fontSize = 'var(--font-terminal)',
  leadingSpaces = 2,
  className = '',
  onComplete,
  hangingPrompt = false,
  persistCursor = false,
  cursorGlyph = '_',
  idleCursorGlyph,
  doneCursorGlyph,
  doneCursorGlyphDelayMs = 0,
  blinkOnDone = false,
  doneBlinkClassName = 'animate-terminal-blink',
}: TerminalLineProps) {
  // Resolve segments. In NON-HANGING mode, prepend `leadingSpaces` NBSPs
  // to the front of the first segment so the line types out `>_` → `> _`
  // → `>  _` → `>  d_`… In HANGING mode the prompt is in the gutter and
  // typed text starts at content-box-left, so no NBSP gap is needed —
  // typing begins directly with the first content character.
  const effectiveLeadingSpaces = hangingPrompt ? 0 : leadingSpaces
  const activeSegments: TerminalSegment[] = useMemo(() => {
    const base: TerminalSegment[] =
      segments && segments.length > 0 ? segments : text ? [{ text }] : []
    if (effectiveLeadingSpaces <= 0 || base.length === 0) return base
    const pad = ' '.repeat(effectiveLeadingSpaces)
    const [first, ...rest] = base
    return [{ ...first, text: `${pad}${first.text}` }, ...rest]
  }, [segments, text, effectiveLeadingSpaces])

  const fullText = useMemo(
    () => activeSegments.map((s) => s.text).join(''),
    [activeSegments],
  )

  const [typedCount, setTypedCount] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'typing' | 'done'>('idle')
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useRef(false)

  // One-shot IntersectionObserver: flip `inView` to true the first time
  // the line enters the viewport (any amount), then disconnect.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const node = containerRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0 },
    )
    io.observe(node)

    return () => io.disconnect()
  }, [])

  // On viewport entry / text change: respect reduced-motion, otherwise
  // queue the idle-then-type sequence.
  useEffect(() => {
    reduceMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion.current) {
      setTypedCount(fullText.length)
      setPhase('done')
      return
    }

    if (!inView) return

    setTypedCount(0)
    setPhase('idle')

    const startTimer = setTimeout(() => {
      setPhase('typing')
    }, startDelayMs)

    return () => clearTimeout(startTimer)
  }, [inView, fullText, startDelayMs])

  // While typing, tick one char at a time until we hit the end.
  useEffect(() => {
    if (phase !== 'typing') return
    if (typedCount >= fullText.length) {
      setPhase('done')
      return
    }

    const t = setTimeout(() => {
      setTypedCount((n) => n + 1)
    }, charDelayMs)

    return () => clearTimeout(t)
  }, [phase, typedCount, fullText.length, charDelayMs])

  // Fire `onComplete` exactly once when we land in the 'done' phase.
  useEffect(() => {
    if (phase === 'done') {
      onComplete?.()
    }
  }, [phase, onComplete])

  // Done-phase cursor-glyph swap (opt-in via `doneCursorGlyph`).
  const [doneCursorSwapped, setDoneCursorSwapped] = useState(false)
  useEffect(() => {
    if (phase !== 'done' || doneCursorGlyph === undefined) {
      setDoneCursorSwapped(false)
      return
    }
    if (doneCursorGlyphDelayMs <= 0) {
      setDoneCursorSwapped(true)
      return
    }
    const t = setTimeout(() => setDoneCursorSwapped(true), doneCursorGlyphDelayMs)
    return () => clearTimeout(t)
  }, [phase, doneCursorGlyph, doneCursorGlyphDelayMs])

  // Build the visible segment spans from typedCount.
  const visibleSpans: React.ReactNode[] = []
  let consumed = 0
  for (let i = 0; i < activeSegments.length; i++) {
    if (typedCount <= consumed) break
    const seg = activeSegments[i]
    const take = Math.min(seg.text.length, typedCount - consumed)
    const colorClass = seg.color ?? textColor
    const blinkClass =
      phase === 'done' && seg.blinkOnDone ? ` ${doneBlinkClassName}` : ''
    visibleSpans.push(
      <span key={i} className={`${colorClass}${blinkClass}`}>
        {seg.text.slice(0, take)}
      </span>,
    )
    consumed += seg.text.length
  }

  const alignClass =
    align === 'center' ? 'justify-center text-center' : 'justify-start text-left'

  // Derived render flags:
  //   showCursor       Visible when in view AND (still typing OR
  //                    `persistCursor`).
  //   blinkingWhole    Whole-wrapper pulse: only when top-level
  //                    `blinkOnDone` is set AND `done` phase reached.
  //                    Suppresses the cursor's own blink so the two
  //                    don't fall out of phase.
  const showCursor = inView && (phase !== 'done' || persistCursor)
  const blinkingWhole = blinkOnDone && phase === 'done'

  // Cursor glyph resolution by phase.
  const resolvedCursorGlyph =
    phase === 'idle'
      ? idleCursorGlyph ?? cursorGlyph
      : phase === 'done' && doneCursorSwapped && doneCursorGlyph !== undefined
        ? doneCursorGlyph
        : cursorGlyph

  // Cursor blink class resolution.
  const cursorBlinkClass = blinkingWhole
    ? ''
    : phase === 'done' && doneCursorGlyph !== undefined && doneCursorSwapped
      ? doneBlinkClassName
      : 'animate-terminal-blink'

  return (
    <div
      ref={containerRef}
      className={
        hangingPrompt
          ? `font-mono ${blinkingWhole ? doneBlinkClassName : ''} ${className}`
          : `font-mono flex items-baseline gap-[0.5ch] ${alignClass} ${blinkingWhole ? doneBlinkClassName : ''} ${className}`
      }
      style={{
        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        ...(hangingPrompt
          ? {
              position: 'relative',
              // Reserve 1 line of vertical space even when the inner
              // span is empty (idle, pre-viewport-entry). The prompt
              // is absolute-positioned so it doesn't contribute to
              // the parent's height; without this min-height the
              // container collapses to 0 before the IntersectionObserver
              // fires, which can prevent IO from firing at all.
              minHeight: '1lh',
            }
          : {}),
      }}
      aria-label={`terminal: > ${fullText}`}
    >
      {/* PROMPT — purple `>`. In HANGING mode, absolutely-positioned at
          `left: -3ch` so it sits in the outer gutter, decoupled from
          the inline flow of typed text. In NON-HANGING mode, it lives
          inside the inner wrapper alongside the typed text + cursor
          so the flex layout treats them as one group. */}
      {hangingPrompt && (
        <span
          className={`${promptColor} select-none`}
          style={{ position: 'absolute', left: 'var(--prompt-offset, -3ch)', top: 0 }}
          aria-hidden
        >
          &gt;
        </span>
      )}

      {/* TEXT WRAPPER — typed segments + cursor (and the prompt in
          non-hanging mode). */}
      <span>
        {!hangingPrompt && (
          <span className={`${promptColor} select-none`}>&gt;</span>
        )}
        {visibleSpans}
        {showCursor && (
          <span
            className={`${cursorColor} inline-block ${cursorBlinkClass}`}
            style={hangingPrompt ? { marginLeft: '1ch' } : undefined}
            aria-hidden
          >
            {resolvedCursorGlyph}
          </span>
        )}
      </span>
    </div>
  )
}
