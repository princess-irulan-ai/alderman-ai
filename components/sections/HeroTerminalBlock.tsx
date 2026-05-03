'use client'

import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * HeroTerminalBlock — H1 hero display text as ONE word-wrapping `TerminalLine`
 * primitive inside a bounded container.
 *
 * Supersedes `HeroTerminalStack` (three-stacked-lines iteration, rejected
 * 2026-04-21 evening — Alex: "it's only going to be one terminal line, not
 * three, but it will word wrap, and that's okay"). `HeroTerminalStack.tsx`
 * is now orphaned on disk pending cleanup.
 *
 * Container geometry (Alex's spec 2026-04-21, structure pass):
 *   - Width:  `w-3/4` inside the hero's `col-span-2` left slot. The hero
 *             section lives in `grid-cols-canvas` (3 sub-cols inside the
 *             canvas, which is itself the middle 4/6 of the page). col-span-2
 *             = 2/3 of canvas; w-3/4 of that = 1/2 of canvas — Alex's
 *             "half of the two-thirds that's not on the outer margins."
 *   - No left padding: the typed TEXT's first character left-aligns with
 *             the wordmark in the floating nav — i.e. the canvas grid left
 *             edge, which is also col-span-2's left edge. So the container
 *             is flush to x=0 and the text is flush inside it.
 *   - Right padding: `pr-8` (32px) — breathing-room buffer so the typed
 *             line doesn't touch the Post-it on the paper app next to it
 *             when it wraps.
 *
 * Content (current — 2026-04-22 comma pass):
 *   "attract, upskill, and retain top HUMAN talent and prepare your
 *   company for the ai future" — with the two commas pulled out as
 *   their own purple segments. Brand accents via `segments`:
 *     - HUMAN          → text-orange
 *     - ai             → text-green
 *     - , (both)       → text-purple
 *   Everything else stays text-ide-fg. The framing `[ ]` stays orange
 *   via the primitive's `bracketColor` default, the leading `>` stays
 *   purple, the persistent blinking `_` stays purple. Net effect: all
 *   three brand accents show up on the hero line — orange via brackets
 *   + HUMAN, purple via `>` / `_` + comma punctuation, green via `ai`.
 *   The purple commas give the line an in-text purple presence for the
 *   first time, strengthening the dot-chord echo.
 *
 *   Copy-history note: (1) first real-copy pass: "attract, upskill,
 *   and retain HUMAN talent and prepare them ( and your job
 *   descriptions) for the ai future" — "job descriptions" inside a
 *   purple-wrapped parenthetical; (2) same session: swapped "job
 *   descriptions" → "job adverts" and scoped the purple to just the
 *   paren punctuation (parens purple, content default); (3) following
 *   turn: inserted "top" before HUMAN ("retain top HUMAN") and swapped
 *   "them" for "your company" ("prepare your company ( and your job
 *   adverts)"); (4) following turn: cut the parenthetical phrase
 *   entirely — Alex felt the aside was pulling focus — landing on the
 *   tight "for the ai future" version; (5) 2026-04-22: briefly swapped
 *   the closing phrase to "for your ai transformation" but reverted
 *   same-session — wrapped in a weird spot at the hero's container
 *   width; kept the comma-to-purple promotion from that pass.
 *
 * Primitive overrides:
 *   - `fontSize={36}` — 1.5× the codified 24px default. Was 48 (2×) on the
 *     first container pass; Alex dialed it down ~25% on 2026-04-21 evening
 *     after seeing the bounded container on real screens. 36 keeps the
 *     hero feeling larger than the H2.5/seam instances (24) without
 *     fighting the paper app for visual weight.
 *   - `align="left"` — line sits against the container's left edge.
 *   All other values (`startDelayMs`, `charDelayMs`, `leadingSpaces`,
 *   prompt/cursor/bracket colors) stay at their codified defaults.
 *
 * Hanging-prompt + persistent-cursor (landed 2026-04-21 evening across
 * a 2-pass iteration, then pass 3 brought brackets back in):
 *   Alex's full spec for the hero, both wired through as opt-in props
 *   on TerminalLine:
 *     (a) `hangingPrompt` — the whole `[ >  ` prefix hangs OUTSIDE this
 *         block's left edge (which is the wordmark edge). The first
 *         visible character of typed text lands at the wordmark edge;
 *         wrapped lines align there too; the prefix hangs
 *         `3 + leadingSpaces` ch (= 5ch at the default leadingSpaces=2)
 *         to the left, in the canvas's outer gutter. Closing `]` flows
 *         inline at the end of the typed text and wraps naturally. The
 *         framing `[ ]` brackets stay visible in all phases in this
 *         mode (pass 3 — pass 2 had them hidden, but dropping them
 *         would break the column-alignment math). Implementation is
 *         negative margin + matching padding-left + negative text-indent;
 *         see TerminalLine JSDoc for the math.
 *     (b) `persistCursor` — the `_` keeps blinking after typing
 *         completes instead of retiring. Keeps the hero moment feeling
 *         alive even after the copy is fully typed. All other
 *         TerminalLine instances on the site (H2.5 CTA seam, any future
 *         seams) stay on the codified default where the cursor retires
 *         on `done` and brackets drop on `done`.
 *
 *   Neither prop ports to other sections per the H1-sandbox rule.
 *
 * H1-sandbox scope note: this component is scoped to H1's experimental
 * iteration lane. If the treatment graduates and ports to other sections,
 * rename + generalize.
 *
 * ─────────────────────────────────────────────────────────────────────
 * Line 2 (2026-04-22 — paired-line hero choreography)
 * ─────────────────────────────────────────────────────────────────────
 * A second TerminalLine appears BELOW line 1, left-justified to the same
 * gutter column (so its `>` prompt sits directly beneath line 1's `>`
 * in the outer canvas gutter). Gated by the `line2Ready` prop, which
 * `HeroSection` flips to `true` at `POSTIT_LAND_PEEK_MS` before the
 * Post-it finishes landing — the cursor-baton-pass moment.
 *
 * When `line2Ready` flips:
 *   (a) Line 1's `persistCursor` flips to `false` — its blinking `_`
 *       goes dark (brackets were already faded to opacity 0 on done).
 *       The typed text itself stays put.
 *   (b) Line 2 mounts into the DOM. Its own IntersectionObserver fires
 *       on mount (the hero is already in view by definition of when we
 *       mount it), which kicks off the codified 2120ms idle-blink
 *       window, then the type-out.
 *   (c) Line 2's cursor is phase-aware. During the 2120ms IDLE phase
 *       it renders as `"_"` (via `idleCursorGlyph="_"`) so the idle-
 *       blink reads as a conventional terminal waiting to type —
 *       matching line 1's idle feel. The moment typing begins, the
 *       cursor switches to a single `"V"` (via `cursorGlyph="V"`) and
 *       stays `V` through the typing phase and the done phase,
 *       repurposing itself as a purple "scroll down" nudge. The
 *       underscore-to-V transition happens at exactly the start-of-
 *       typing instant by design — Alex's spec 2026-04-22: "starts
 *       as normal '_' like in heroterminal1, switches to blinking 'V'
 *       after two blinks of '_'."
 *   (d) Line 2 uses `persistCursor` so the V sits blinking at the
 *       end of the done-state line, holding the scroll nudge.
 *   (e) Line 2 is all-purple: `textColor="text-purple"` and
 *       `bracketColor="text-purple"` (the `>` prompt and the cursor
 *       are purple by default already). Every character in the line
 *       is purple, distinguishing it from line 1's ide-fg body copy
 *       with orange brackets and green/orange inline accents.
 *   (f) Line 2 uses `blinkOnDone`: after the line types out fully,
 *       the ENTIRE line (brackets + `>` + typed text + V cursor)
 *       blinks as one synchronized unit. The cursor's own blink is
 *       suppressed in the done phase to prevent out-of-phase flicker
 *       — the outer wrapper's `animate-terminal-blink` governs the
 *       rhythm. Reads as a unified purple pulse that says "scroll
 *       down" more strongly than a lone blinking V would.
 *
 * Line 2 copy (2026-04-22 Alex-approved placeholder, second pass):
 * `"here's how it works"` — no inline color accents; single segment
 * picks up the line-wide purple `textColor`. Phase 5 may rewrite.
 *
 * ─────────────────────────────────────────────────────────────────────
 * Bottom-justified layout (2026-04-22 Round 4)
 * ─────────────────────────────────────────────────────────────────────
 * Wrapper uses `h-full flex flex-col justify-between` instead of the
 * previous `space-y-12` stack. Rationale (Alex's spec 2026-04-22):
 *   "make the bottom of [the paper-app screenshot] the bottom of the
 *   H1 container and have heroterminal 2 and the postit bottom
 *   justified with the container and aligned with each other"
 *
 * How it works:
 *   - `HeroSection` uses `grid-cols-canvas` with `items-stretch`, so
 *     both columns of the grid row grow to the tallest natural height.
 *   - The right column (paper app + post-it) sets the row height via
 *     its `pb-[120px]` cushion, which reserves space for the post-it's
 *     rotated lower-left corner that hangs below the paper app.
 *   - `h-full` here makes this block fill that stretched column height.
 *   - `flex flex-col justify-between` pushes its two direct children
 *     (line 1, line 2 wrapper) to the top and bottom of the column.
 *   - Result: line 1 sits at the top of H1 next to the Post-it's start
 *     position; line 2 sits at the bottom, aligned with where the
 *     post-it ultimately lands after the slap. The `V` scroll nudge
 *     on line 2 lives at the visual floor of the hero section.
 *
 * Note on line 2 mount: when `line2Ready` is false, the only child is
 * line 1, so `justify-between` degrades to "line 1 at the top, empty
 * space below" — line 1 does NOT jump to the bottom. The moment line 2
 * mounts, the second flex item appears and `justify-between` spreads
 * the two to top/bottom without moving line 1.
 */
type HeroLines = 'both' | '1' | '2'

/**
 * Mobile font-size for the hero terminal lines. Desktop stays at the
 * locked 36px; mobile shrinks via clamp so the typed line wraps to a
 * reasonable number of mobile-screen lines without the per-character
 * `ch` math (in TerminalLine's hanging-prompt mode) blowing past the
 * viewport. Picks 22px at 375px wide, scales up to 36px at 654px+ wide
 * (just below the md breakpoint at 768px, where the desktop fontSize
 * takes over). Inline styles set the actual computed size — see
 * HeroSection for the responsive choice.
 */
// 2026-04-26 Alex: fixed at 22px on mobile (was clamp 22-36) so the
// hero's hanging-prompt math has a predictable hang width — clamp made
// the hang grow with viewport at a different rate than G, breaking
// edge alignment between viewports. Fixed font keeps proportions
// stable across all mobile widths.
const HERO_FONT_SIZE_MOBILE = '22px'
const HERO_FONT_SIZE_DESKTOP = 36

export function HeroTerminalBlock({
  line2Ready = false,
  lines = 'both',
  fontSize,
}: {
  /**
   * When true, line 1's `_` cursor goes dark and a second TerminalLine
   * mounts below line 1 (hanging-prompt, same gutter column). Driven
   * by `HeroSection`'s post-it-landing timer. Defaults to false so the
   * component is still renderable in isolation.
   */
  line2Ready?: boolean
  /**
   * Which lines to render. Default 'both' = the desktop-canonical
   * stacked layout. Pass '1' or '2' for the mobile stack where the
   * paper-app sits BETWEEN line 1 and line 2 in the page flow — see
   * HeroSection for the mobile composition.
   */
  lines?: HeroLines
  /**
   * Override the font-size passed down to both TerminalLine
   * primitives. Default `36` (the locked desktop size). Pass a string
   * (e.g. `'clamp(22px, 5.5vw, 36px)'`) for a responsive mobile size.
   */
  fontSize?: number | string
}) {
  const resolvedFontSize = fontSize ?? HERO_FONT_SIZE_DESKTOP

  // Hanging-prompt + framing brackets are DESKTOP-only treatments. On
  // mobile (`lines='1'` / `lines='2'`), the canvas gutter isn't wide
  // enough to host a prefix that hangs outside the content canvas —
  // the `[` and `>` clip off the left edge of the viewport. So mobile:
  //   - `hangingPrompt={false}` — the prefix flows inline from the
  //     content edge, no outer-gutter break-out.
  //   - `showBrackets={false}` — the framing `[` and `]` drop entirely
  //     (not just hide on done), so the purple `>` prompt IS the first
  //     character at column 1, followed by the codified two leading
  //     NBSPs. Alex's 2026-04-24 spec: "the purple angle bracket will
  //     be the first character, followed by two spaces."
  // Desktop still gets both bracket chrome AND the hanging prefix in
  // the canvas's outer gutter — the codified hero voice.
  // Hanging prompt is now enabled on mobile too (Alex 2026-04-26):
  // typed text aligns with the page-padding gutter; the `>` hangs in
  // the gutter to its left. Brackets stay desktop-only — mobile
  // doesn't have room to hang the full `[ >  ` prefix without clipping.
  // The page-padding gutter on mobile is now proportional
  // (`--gutter-mobile` in globals.css, currently 5%), wide enough at
  // realistic mobile viewports to host the codified leadingSpaces=2.
  const useHangingPrompt = true
  const showBrackets = lines === 'both'
  // Mobile renders line 1 and line 2 separately (lines='1' / lines='2');
  // desktop renders both stacked (lines='both'). The terminal-line
  // behaviour diverges between the two:
  //   - Mobile: every hero line ends with a plain blinking `_` after a
  //     1ch gap. Line 1's persistCursor stays true even after line 2
  //     mounts (no baton-pass dimming). Line 2 drops the `v`-cascade
  //     `doneCursorGlyph` swap so the cursor stays as `_`.
  //   - Desktop: keeps the original baton-pass + `v` scroll-nudge
  //     cascade unchanged.
  const isMobile = lines !== 'both'

  const line1 = (
    <TerminalLine
      className="[font-variant-ligatures:none]"
      segments={[
        { text: 'take a ' },
        { text: 'HUMAN', color: 'text-orange' },
        { text: ' approach to ' },
        { text: 'ai', color: 'text-green' },
        { text: ' adoption and make sure no one is left behind' },
      ]}
      fontSize={resolvedFontSize}
      align="left"
      hangingPrompt={useHangingPrompt}
      showBrackets={showBrackets}
      persistCursor={isMobile || !line2Ready}
      startDelayMs={1620}
    />
  )

  // Desktop: cursor swaps `_` -> `v` after typing and cascades down
  // (see tailwind.config.js -> cursor-cascade-3). Mobile: keep the `_`
  // blinking — no glyph swap, no cascade.
  const line2 = line2Ready ? (
    <TerminalLine
      segments={[
        { text: 'fluency helps your ' },
        { text: 'TEAMS', color: 'text-orange' },
        { text: ' navigate new tools while reducing their ' },
        { text: 'anxiety', color: 'text-green' },
        { text: ' about being replaced' },
      ]}
      fontSize={resolvedFontSize}
      align="left"
      hangingPrompt={useHangingPrompt}
      showBrackets={showBrackets}
      persistCursor
      startDelayMs={1620}
    />
  ) : null

  if (lines === '1') {
    // Single-line mode: no flex column / no h-full / no justify-between.
    // Used by the mobile stack so line 1 sits directly above the paper-app
    // and line 2 sits directly below it without forcing a stretched
    // container.
    return <div className="w-full pr-0">{line1}</div>
  }

  if (lines === '2') {
    return <div className="w-full pr-0">{line2}</div>
  }

  // 'both' — desktop default. Bottom-justified two-line stack inside
  // the col-span-2 left slot of the canvas grid. See JSDoc above for
  // the h-full + justify-between layout rationale.
  return (
    <div className="w-3/4 pr-8 flex flex-col gap-[3em]">
      {line1}
      {line2}
    </div>
  )
}

export { HERO_FONT_SIZE_MOBILE }
