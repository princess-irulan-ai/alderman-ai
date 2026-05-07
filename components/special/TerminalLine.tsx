'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * TerminalLine — animated one-line "terminal" for IDE-substrate seams.
 *
 * Framed visual: `[ >_ ]` idle → `[ >  content_ ]` typing → `>  content` done
 *   [ ]  — orange brackets (framing while idle/typing; drop away on done)
 *   >    — purple leading prompt, sits tight against the cursor in idle
 *          (`>_`). Two NBSPs are auto-prepended to the typed content via
 *          the `leadingSpaces` prop (default 2), so they type out as the
 *          first two characters of the animation.
 *   _    — purple blinking cursor; rides the end of the typed text while
 *          typing, disappears entirely once typing is complete.
 *
 * CODIFIED DEFAULTS (Alderman terminal voice):
 *   fontSize       var(--font-terminal) — 22px on mobile/mobile-locked
 *                  pages, 30.8px on pages that opt into desktop
 *                  expansion via PageFrame's `desktopExpanded` prop
 *                  (the .desktop-expanded class scope; see globals.css).
 *                  All TerminalLine instances render at the same size
 *                  on a given page; there's no separate "hero" treatment.
 *   leadingSpaces  2   (NBSPs baked into the front of the typed content)
 *   startDelayMs   1060ms   (1 × 1.06s cursor blink on viewport entry)
 *   charDelayMs    27ms     (25% faster than the previous 36ms; original was 45ms)
 *
 * Any new TerminalLine deployed anywhere else in the site should look and
 * feel identical to the H2.5 instance without the caller having to pass
 * these values. Only override a default if there's a specific reason.
 *
 * Behavior:
 *   1. Pre-viewport: renders `[ > ]` with no cursor. The component stays
 *      inert until it enters the viewport.
 *   2. Entering viewport: the IntersectionObserver triggers. Cursor appears
 *      tight against the `>` prompt (`>_`) and blinks on the 1.06s cycle.
 *   3. After `startDelayMs`: begins typing the content at `charDelayMs`.
 *      The first `leadingSpaces` chars typed are NBSPs, so the line opens
 *      up `>_` → `> _` → `>  _` → `>  d_` …
 *   4. When finished: cursor is removed, framing brackets drop away. The
 *      line sits as `>  full typed line` — quiet, no blinking, no frame.
 *      Fires `onComplete` so upstream siblings can react.
 *
 * Accepts EITHER a flat `text` string OR a `segments` array (for inline
 * color accents — e.g. highlighting `ai` in green and `...` in purple
 * inside an otherwise ide-fg-colored line).
 *
 * Respects `prefers-reduced-motion`: shows the full line instantly with no
 * cursor if reduced-motion is set.
 *
 * Colors, sizes, and framing are exposed as props for reuse — but the
 * defaults match Alex's locked design and should not need overriding in
 * most cases.
 *
 * HANGING-PROMPT MODE (`hangingPrompt`, opt-in):
 *   Swaps the outer from flex to block and hangs the whole `[ >  `
 *   prefix OUTSIDE the component's left edge via negative margin +
 *   padding + text-indent math. The typed text's first visible character
 *   lands at the container's left edge (x=0); wrapped lines also align
 *   at x=0; the `[`, space, `>`, and both NBSPs sit `3 + leadingSpaces`
 *   ch to the left, in the outer gutter. The closing `]` flows inline
 *   at the end of the typed text (after the cursor) and wraps with the
 *   rest of the content.
 *
 *   Brackets drop on `done` in hanging mode (same as non-hanging mode)
 *   but are kept in the DOM at opacity 0 so the 5ch-prefix hanging
 *   math (which accounts for `[` + NBSP on the left) holds through
 *   the transition — pulling them out of layout mid-animation would
 *   lurch the typed text 2ch leftward into the gutter. The `align`
 *   prop is ignored in hanging mode (effectively forced to left).
 *   Used by the hero (H1) so the typed text lines up with the wordmark
 *   in the floating nav while the framing hangs in the canvas's outer
 *   gutter to its left.
 *
 * PERSISTENT CURSOR (`persistCursor`, opt-in):
 *   Keeps the `_` cursor blinking in the `done` phase instead of
 *   retiring it. Default behavior is the quiet end-state (cursor gone,
 *   brackets gone, line settles). Opt in when the blinking cursor
 *   should linger — e.g. the hero, where a live cursor keeps the
 *   moment feeling active even after the copy is fully typed.
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
   * stays static. Use to blink only the tail of a line (e.g. H1 line 2's
   * `how it works  v` scroll-nudge, where the opening `here's` sits static
   * and the trailing copy + cursor pulse in sync). Ignored in idle/typing
   * phases. Orthogonal to the top-level `blinkOnDone` prop, which blinks
   * the entire wrapper as one unit; per-segment `blinkOnDone` is the
   * finer-grained alternative.
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
   * before typing starts. Default 2120ms — two full 1.06s blink cycles.
   */
  startDelayMs?: number
  /**
   * Delay between each character while typing. Default 36ms — the codified
   * "Alderman terminal speed" (20% faster than the original 45ms medium).
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
  /** Tailwind text-color class for the framing `[` and `]`. Default `"text-orange"`. */
  bracketColor?: string
  /**
   * Font size. Default `var(--font-terminal)` — resolves to the page's
   * canonical terminal-line size (22px on mobile-locked pages, 30.8px
   * on pages that opted into desktop expansion via PageFrame's
   * `desktopExpanded` prop, scoped through the `.desktop-expanded`
   * class in globals.css). Pass a number for a fixed px size, or a
   * CSS string for any other expression. The hanging-prompt math
   * uses `ch` units so it stays correct across font-size changes.
   */
  fontSize?: number | string
  /**
   * Number of leading non-breaking spaces prepended to the typed content.
   * Default 2 — the codified `>  text` gap. These NBSPs get typed out as
   * the first characters of the animation so the line opens up `>_` →
   * `> _` → `>  _` → `>  d_`… Set to 0 for a tight `>content` layout.
   */
  leadingSpaces?: number
  /** Extra classes applied to the outer wrapper. */
  className?: string
  /** Fires once when the typing animation completes (phase → done). */
  onComplete?: () => void
  /**
   * If true, render in hanging-prompt mode: the outer becomes block-level
   * and the whole `[ >  ` prefix hangs OUTSIDE the left edge of this
   * component via negative margin + padding + text-indent math. The
   * typed text's first visible character lands at the container's left
   * edge (x=0); wrapped lines also align at x=0; the prefix sits
   * `3 + leadingSpaces` ch to the left. The closing `]` flows inline
   * at the end of the typed text and wraps with the content.
   *
   * Brackets stay visible in all phases in this mode (the hanging math
   * accounts for their width). Use this when you want the typed text to
   * line up with a sibling element (e.g. the wordmark) and the framing
   * to visually hang in the outer gutter. The `align` prop is ignored
   * in hanging mode (effectively forced to left).
   *
   * Default false — non-hanging flex layout is the site-wide canonical
   * treatment.
   */
  hangingPrompt?: boolean
  /**
   * If true, the `_` cursor keeps blinking in the `done` phase instead of
   * disappearing when typing completes. Default false — the codified
   * behavior is that the cursor retires once the line is fully typed,
   * leaving a quiet `>  text` end-state. Opt in per-instance when the
   * blinking cursor should linger (e.g. the hero, where the live cursor
   * keeps the moment feeling active).
   */
  persistCursor?: boolean
  /**
   * Glyph rendered as the blinking cursor during the `typing` and (if
   * `persistCursor`) `done` phases. Default `"_"` — the codified
   * terminal underscore. Override when the cursor needs to carry a
   * different affordance — e.g. `"V\u00a0\u00a0V\u00a0\u00a0V"` in
   * H1's second hero terminal line, where the cursor is repurposed as a
   * purple "scroll down" nudge after the line types out. The whole glyph
   * string blinks as one unit (the `animate-terminal-blink` animation
   * sits on the wrapping span). Use NBSPs inside multi-char glyphs so
   * inter-char spacing doesn't collapse via HTML whitespace folding.
   */
  cursorGlyph?: string
  /**
   * Glyph rendered as the blinking cursor DURING THE IDLE PHASE only.
   * Default `undefined` — fall back to `cursorGlyph` so a caller can
   * set a single glyph for all phases by just passing `cursorGlyph`.
   *
   * Set this to decouple the idle-blink glyph from the typing/done
   * glyph. Not used on H1 today — line 2 was originally wired with
   * `idleCursorGlyph="_"` + `cursorGlyph="v"` (swap at typing-start),
   * but 2026-04-22 evening that swap moved to a DONE-phase swap via
   * `doneCursorGlyph` (below), so idle + typing now share the same
   * `_` glyph by falling through to `cursorGlyph`'s default.
   *
   * Whitespace handling: same NBSP rule as `cursorGlyph`.
   */
  idleCursorGlyph?: string
  /**
   * Glyph the blinking cursor swaps TO once the line reaches the
   * `done` phase and the `doneCursorGlyphDelayMs` timer fires. Default
   * `undefined` — fall back to `cursorGlyph` so the cursor stays the
   * same glyph across typing and done (the codified behavior).
   *
   * Set this to have the cursor "change character" after the line
   * finishes writing. Used by H1's line 2: the `_` underscore types
   * through the line, blinks two more times on the done rhythm, then
   * the glyph swaps to a lowercase `v` scroll-nudge that keeps
   * blinking at the slower `doneBlinkClassName` cadence. Pairs with
   * `doneCursorGlyphDelayMs` to control WHEN the swap fires.
   *
   * Blink-cadence interaction: before the swap fires (i.e. during
   * the done-phase "hold the typing glyph" window), the cursor stays
   * on `animate-terminal-blink` (1.06s) rather than jumping straight
   * to `doneBlinkClassName`. Otherwise the `_` would pre-slow its
   * rhythm before handing off to the new glyph, which Alex called out
   * 2026-04-22 evening as feeling off — the underscore should finish
   * its own rhythm first, then `v` picks up the slower cadence.
   *
   * Whitespace handling: same NBSP rule as `cursorGlyph`.
   */
  doneCursorGlyph?: string
  /**
   * Delay in ms between entering the `done` phase and swapping the
   * cursor glyph to `doneCursorGlyph`. Default 0 — swap immediately
   * on done if `doneCursorGlyph` is set. Ignored if `doneCursorGlyph`
   * is not set.
   *
   * H1 line 2 passes 2120ms = 2 × 1.06s cursor blinks, so the `_`
   * underscore gets two more blinks on the typing rhythm after the
   * line finishes writing before handing off to the `v` scroll-nudge.
   * Nice rhythmic echo: 2120ms is also the codified idle-blink
   * window duration (`startDelayMs` default), so the `_` spends the
   * same amount of time blinking at the start AND at the end of its
   * lifetime before it retires.
   */
  doneCursorGlyphDelayMs?: number
  /**
   * When true, the ENTIRE line (brackets + prompt + typed text + cursor)
   * blinks as a single unit once the `done` phase is reached, via
   * `animate-terminal-blink` on the outer wrapper. The cursor's own
   * per-span blink is suppressed in the done phase so the two blinks
   * don't fall out of phase and flicker. Default false — the codified
   * behavior blinks only the cursor, never the whole line.
   *
   * Originally added for H1's line 2 (Alex 2026-04-22): the whole
   * scroll-nudge line pulsed purple in sync with the V cursor. H1 line
   * 2 was later reshaped 2026-04-22 evening to blink only the trailing
   * portion (see per-segment `blinkOnDone` on `TerminalSegment`), so
   * this whole-wrapper prop is kept for any future "pulse the whole
   * line" deployment but is no longer used on H1.
   */
  blinkOnDone?: boolean
  /**
   * Tailwind animation class applied to (a) any segment that sets
   * `blinkOnDone: true` once the line reaches the `done` phase, and
   * (b) the persistent cursor span in the `done` phase (when
   * `persistCursor` is on). Default `'animate-terminal-blink'` — the
   * site-canonical 1.06s cadence, identical to every other blinking
   * cursor on the site.
   *
   * Pass `'animate-bracket-blink'` (2.12s, = half the default cadence)
   * when the done-phase pulse should feel slower/quieter — e.g. H1
   * line 2's scroll-nudge tail, where a calmer pulse reads less
   * urgent than the typing cursor's rhythm (Alex 2026-04-22 evening).
   * Any Tailwind animation utility works; `tailwind.config.js` defines
   * the two cadences used on-site today.
   */
  doneBlinkClassName?: string
  /**
   * When false, the framing `[` and `]` never render in any phase —
   * the line reads as `>_` (idle) / `>  text_` (typing/done) with no
   * bracket chrome at all. Default true (the codified terminal voice).
   *
   * Added 2026-04-24 for the hero's mobile line 1: Alex's spec was
   * "the purple angle bracket will be the first character, followed
   * by two spaces" — so the `[` prefix is dropped on mobile and the
   * `>` prompt sits as column-1 of the content area. Desktop still
   * passes `showBrackets` default-true with `hangingPrompt` so the
   * framing brackets hang in the outer gutter.
   *
   * Setting `showBrackets={false}` together with `hangingPrompt={true}`
   * is unsupported — the hanging math assumes a 5ch prefix width that
   * accounts for `[` + space. Keep them paired: hanging uses brackets,
   * no-hanging-on-mobile drops them.
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
  bracketColor = 'text-orange',
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
  showBrackets = true,
}: TerminalLineProps) {
  // Resolve the caller's segments, then prepend `leadingSpaces` NBSPs to
  // the front of the first segment. This is how every TerminalLine in the
  // system gets its `>  text` gap — typed out as part of the animation so
  // the idle state stays tight (`>_`) and the done state reads as `>  text`
  // without the caller having to think about it.
  const activeSegments: TerminalSegment[] = useMemo(() => {
    const base: TerminalSegment[] =
      segments && segments.length > 0 ? segments : text ? [{ text }] : []
    if (leadingSpaces <= 0 || base.length === 0) return base
    const pad = '\u00a0'.repeat(leadingSpaces)
    const [first, ...rest] = base
    return [{ ...first, text: `${pad}${first.text}` }, ...rest]
  }, [segments, text, leadingSpaces])

  const fullText = useMemo(
    () => activeSegments.map((s) => s.text).join(''),
    [activeSegments],
  )

  const [typedCount, setTypedCount] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'typing' | 'done'>('idle')
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useRef(false)

  // One-shot IntersectionObserver: flip `inView` to true the first time the
  // line enters the viewport (any amount), then disconnect so we don't
  // re-trigger if the user scrolls back past it. This is what gates the
  // idle-then-type sequence — per spec, the animation waits for the user
  // to arrive at this seam rather than firing on page load.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const node = containerRef.current
    if (!node) return

    // If IntersectionObserver isn't available (very old browsers), just
    // flip inView immediately — we'd rather have the animation run than
    // leave the line blank forever.
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
  // queue the idle-then-type sequence. This effect is a no-op until the
  // IntersectionObserver above flips `inView` to true.
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

  // Fire `onComplete` exactly once when we land in the 'done' phase. This is
  // how the parent section coordinates state — e.g. kicking off the bracket-
  // blink on downstream CTAs once typing wraps.
  useEffect(() => {
    if (phase === 'done') {
      onComplete?.()
    }
  }, [phase, onComplete])

  // Done-phase cursor-glyph swap (opt-in via `doneCursorGlyph`). When the
  // line reaches `done`, this timer fires after `doneCursorGlyphDelayMs`
  // and flips `doneCursorSwapped` to true. Used by H1 line 2 to let the
  // `_` underscore hold through two more blinks on the typing rhythm before
  // handing off to the `v` scroll-nudge glyph. A delay of 0 (default) swaps
  // immediately on done. Resets on phase reset to keep the component
  // replayable (we don't play again today, but the reset is cheap insurance).
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

  // Build the visible segment spans from typedCount. Per-segment
  // `blinkOnDone`: when a segment opts in AND the line has reached the
  // `done` phase, its span picks up `doneBlinkClassName`. Lets callers
  // pulse only part of a line (e.g. H1 line 2's trailing `how it works`
  // scroll-nudge) while the rest sits static.
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

  // Derived render flags — centralizing the conditions so the JSX below
  // doesn't have to re-reason about them at each render site.
  //
  //   hangCh        Width (in ch = monospace char widths) of the "hanging"
  //                 prefix in hanging-prompt mode: `[` + space + `>` +
  //                 `leadingSpaces` NBSPs. Defaults to 3 + 2 = 5ch. This
  //                 is how far LEFT of the container edge the block gets
  //                 shifted so the first REAL typed character lines up
  //                 with the container's left edge. Brackets are part of
  //                 the prefix in hanging mode — removing them would
  //                 shift the text-indent math and break column-alignment.
  //                 Not used outside hanging mode.
  //   showCursor       The cursor is visible when the line is in view AND
  //                    either still typing OR the caller opted into
  //                    `persistCursor` (which keeps it blinking after
  //                    done).
  //   bracketsVisible  Whether the `[` and `]` are painted. Drops to
  //                    false on `done` in BOTH modes — matches Alex's
  //                    spec that "both brackets should disappear after
  //                    full text is displayed" (2026-04-21). In hanging
  //                    mode this is implemented by painting the kept-in-
  //                    layout brackets at opacity 0; in non-hanging
  //                    mode it's achieved by simply not rendering them.
  //   bracketsInLayout Whether the `[` and `]` span elements are
  //                    RENDERED (present in the DOM). In non-hanging
  //                    mode this is the same as `bracketsVisible` —
  //                    they unmount on `done`. In hanging mode they
  //                    stay in the DOM at all phases so the hanging-
  //                    indent math keeps its 5ch prefix width even
  //                    after the brackets go invisible; otherwise the
  //                    typed text would lurch leftward by 2ch when the
  //                    `[` span is removed.
  //   blinkingWhole    Whether the ENTIRE wrapper (brackets + prompt +
  //                    typed text + cursor) should blink as a single
  //                    unit via `doneBlinkClassName` on the outer div.
  //                    True only when the top-level `blinkOnDone` prop
  //                    is set AND the line has reached the `done`
  //                    phase. When true, the cursor's own blink is
  //                    suppressed (applied as a plain span, no
  //                    animation class) so the two blinks don't fall
  //                    out of phase and flicker — the whole wrapper's
  //                    pulse carries the cursor along with everything
  //                    else. Used nowhere today; kept for any future
  //                    "pulse the whole line" deployment.
  // 3ch when brackets render (`[` + space + `>`); 1ch when they don't
  // (just `>`). Pre-2026-04-26 was hardcoded 3+leadingSpaces, which
  // worked for desktop (brackets always on) but pushed the typed text
  // off the left of the viewport on mobile when brackets were off.
  const hangCh = (showBrackets ? 3 : 1) + leadingSpaces
  const showCursor = inView && (phase !== 'done' || persistCursor)
  const bracketsVisible = showBrackets && phase !== 'done'
  const bracketsInLayout = showBrackets && (hangingPrompt || bracketsVisible)
  const blinkingWhole = blinkOnDone && phase === 'done'

  // Cursor glyph resolution by phase:
  //   idle   → `idleCursorGlyph` if set, otherwise `cursorGlyph`.
  //   typing → `cursorGlyph` (the codified `_`).
  //   done   → `doneCursorGlyph` once `doneCursorSwapped` has flipped
  //            (timer fired); `cursorGlyph` until then (the "hold the
  //            typing glyph for N more blinks" window).
  // This three-way split lets callers run an idle-specific glyph, a
  // typing glyph, and a swap-in done glyph all independently. Default
  // collapses everything back to the codified `_`.
  const resolvedCursorGlyph =
    phase === 'idle'
      ? idleCursorGlyph ?? cursorGlyph
      : phase === 'done' && doneCursorSwapped && doneCursorGlyph !== undefined
        ? doneCursorGlyph
        : cursorGlyph

  // Cursor blink class resolution:
  //   - If the WHOLE wrapper is pulsing (`blinkingWhole`), suppress the
  //     cursor's own animation — the outer class carries it.
  //   - Otherwise, in `done` phase: if the caller opted into a glyph
  //     swap AND the swap HAS fired, use `doneBlinkClassName` (the
  //     slower/quieter tail-blink cadence). If the swap has NOT fired
  //     yet (still inside the "hold the _ for 2 more blinks" window),
  //     stay on the standard `animate-terminal-blink` so the `_` keeps
  //     its typing-phase rhythm through the hold window.
  //   - Idle / typing phases: always `animate-terminal-blink`.
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
      style={
        hangingPrompt
          ? {
              // Hanging-prompt math: negative margin shifts the block LEFT
              // by `hangCh` so its border-left sits outside the parent's
              // content area. Matching `padding-left: hangCh` pulls the
              // content-box back to the parent's left edge, so text flows
              // starting there. `text-indent: -hangCh` then pulls the FIRST
              // line back by `hangCh`, placing `>` (and its two typed
              // NBSPs) in the outer gutter to the left. Net effect: the
              // first visible character of typed text lands at the parent's
              // left edge (= wordmark edge); wrapped lines also align
              // there; `>` hangs outside.
              fontSize:
                typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
              marginLeft: `-${hangCh}ch`,
              paddingLeft: `${hangCh}ch`,
              textIndent: `-${hangCh}ch`,
            }
          : {
              fontSize:
                typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
            }
      }
      aria-label={`terminal: [ >${fullText} ]`}
    >
      {/* Opening bracket — drops on 'done' (non-hanging unmounts; hanging
          paints at opacity 0 so the 5ch hanging math holds). */}
      {bracketsInLayout && (
        <span
          className={`${bracketColor} select-none`}
          style={bracketsVisible ? undefined : { opacity: 0 }}
          aria-hidden
        >
          {hangingPrompt ? '[\u00a0' : '['}
        </span>
      )}

      {/* Middle: purple `>` prompt, typed segments, then blinking cursor. */}
      <span>
        <span className={`${promptColor} select-none`}>&gt;</span>
        {visibleSpans}
        {showCursor && (
          <span
            className={`${cursorColor} inline-block ${cursorBlinkClass}`}
            style={{
              textIndent: 0,
              ...(hangingPrompt ? { marginLeft: '1ch' } : {}),
            }}
            aria-hidden
          >
            {resolvedCursorGlyph}
          </span>
        )}
      </span>

      {/* Closing bracket — mirrors opening bracket behavior. */}
      {bracketsInLayout && (
        <span
          className={`${bracketColor} select-none`}
          style={bracketsVisible ? undefined : { opacity: 0 }}
          aria-hidden
        >
          {hangingPrompt ? '\u00a0]' : ']'}
        </span>
      )}
    </div>
  )
}
