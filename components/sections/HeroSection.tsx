'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { PaperApp } from '@/components/paper/PaperApp'
import {
  HERO_FONT_SIZE_MOBILE,
  HeroTerminalBlock,
} from '@/components/sections/HeroTerminalBlock'
import { Postit } from '@/components/special/Postit'

/**
 * HeroSection — the top slab of the homepage.
 *
 * Pass 5 (2026-04-21 evening — "slap the Post-it on") turned this into a
 * CLIENT component so it can orchestrate the Post-it rise-and-slap
 * animation. Prior passes were server components; the animation state is
 * the reason for the switch.
 *
 * Structure:
 *  - Left (col-span-2): `HeroTerminalBlock` — TWO stacked word-wrapping
 *    `TerminalLine` primitives on the IDE substrate. Line 1 is
 *    fontSize=36, hanging-prompt + persist-cursor, content "attract,
 *    upskill, and retain top HUMAN talent and prepare your company for
 *    the ai future." (HUMAN/orange, ai/green, commas/purple). Line 2 is
 *    the same shape directly below, gated by the `line2Ready` prop
 *    flipped here (see POSTIT_LAND_PEEK_MS / baton-pass notes below).
 *    Line 2's cursor is phase-aware: `"_"` during the idle-blink
 *    window (matching line 1), then switches to a single lowercase
 *    `"v"` at the start of typing and stays through done — a purple
 *    scroll-down nudge. Line 2's coloring is split — `here's` is
 *    paper-colored with a purple apostrophe, ` how it works` is
 *    purple, `>` prompt and `v` cursor are purple, brackets are
 *    orange (primitive default, same as line 1). In done phase only
 *    the `v` cursor blinks (at `animate-tail-blink` — 1.6s, landed
 *    after a two-pass tune with Alex 2026-04-22 evening); the typed
 *    text all sits static. Copy (placeholder, pending Phase 5):
 *    "here's how it works".
 *  - Right (col-start-3, narrow PaperApp): Perks & Benefits panel with a
 *    vertical list of three perks — MultiSport Card / Flexible Home
 *    Office / 30 days PTO. Paper app is shifted LEFT by PAPER_SHIFT_PX
 *    so the composite {paper + Post-it overhang} right-aligns with the
 *    nav CTA rail after the Post-it lands.
 *  - Post-it overlay: rises from below the fold during typing, lands
 *    with its TOP-LEFT corner at the paper-app's center, overhanging
 *    the bottom-right quadrant of the paper. Tilted -5° with
 *    transform-origin='top left' so the pivot stays on the landing
 *    anchor.
 *
 * ────────────────────────────────────────────────────────────────────
 * Eye-follow choreography (Pass 5, Alex's spec)
 * ────────────────────────────────────────────────────────────────────
 * The user's gaze is intentionally pulled through four beats:
 *   1. TerminalLine types L→R. Eye tracks the cursor.
 *   2. ~1s before typing ends, the Post-it enters the field of vision
 *      rising up the right side of the viewport. Eye is peripherally
 *      aware.
 *   3. Typing finishes. Post-it lands ~1s later on the Perks panel.
 *      Eye snaps to the arrival.
 *   4. Eye reads the three perks (vertical list, fast vertical saccade)
 *      then lands on the Post-it's "AI Fluency Lessons" headline
 *      overlapping the top of the panel — the emotional payload.
 *
 * Net effect: typing → Post-it arrival → perks scan → Post-it read,
 * ending on Alderman's value prop without shouting.
 *
 * Note: the Post-it overhang obscures the lower portion of the perks
 * list after landing. The vertical-list layout keeps the top two items
 * fully visible; the 3rd ("30 days PTO") is partly occluded. Alex
 * explicitly accepted this tradeoff — the occluded-hint-of-more-perks
 * reads fine and the Post-it is the priority.
 *
 * ────────────────────────────────────────────────────────────────────
 * Timing (all tunable — see PLAN.md "Pass 5")
 * ────────────────────────────────────────────────────────────────────
 * Starts from IntersectionObserver firing on the section. Both the
 * TerminalLine (via its own inView gating) and the rise trigger at the
 * same moment — entry into the viewport — so their clocks run in sync.
 *
 *   POSTIT_RISE_DELAY_MS (5900ms)  rise begins
 *   POSTIT_RISE_MS       (2700ms)  rise duration
 *   land at 8600ms post-entry — approximately 1s AFTER line 1 typing
 *   finishes (rough estimate: ~92 chars × 36ms charDelay ≈ 3312ms on
 *   top of the 2120ms idle-blink start delay).
 *
 *   POSTIT_LAND_PEEK_MS  (1500ms)  baton-pass window: line 2 mounts
 *                                  and line 1's cursor fades 1500ms
 *                                  BEFORE land (at t=7100ms). Line 2's
 *                                  own IntersectionObserver immediately
 *                                  fires and runs the codified 2120ms
 *                                  idle-blink, then types out. Bumped
 *                                  from 500ms → 1500ms 2026-04-22
 *                                  evening (Alex: "heroterminalline2
 *                                  should begin a whole second
 *                                  earlier").
 *
 * Alex locked line-1 and Post-it timings on 2026-04-22. Going forward
 * ONLY POSTIT_LAND_PEEK_MS and line 2's internal timings are tunable.
 *
 * Reduced motion (`prefers-reduced-motion: reduce`): skip the animation
 * entirely — Post-it renders in its landed position from load.
 *
 * ────────────────────────────────────────────────────────────────────
 * Paper app shift (PAPER_SHIFT_PX)
 * ────────────────────────────────────────────────────────────────────
 * The paper app is `translateX(-${PAPER_SHIFT_PX}px)`'d from page load.
 * The shift is NEVER animated — it's baked in from the first frame so
 * the user never sees it settle. The Post-it arrival completes the
 * composite right-alignment visually.
 *
 * Starting value 120px is a guess. Final value depends on the rendered
 * widths of the narrow PaperApp + the Post-it's rotated overhang.
 * Screenshot-tune after first render.
 *
 * ────────────────────────────────────────────────────────────────────
 * H1-sandbox scope (post-promotion)
 * ────────────────────────────────────────────────────────────────────
 * 2026-04-22: the former H1-sandbox PaperApp treatments (11px dots +
 * purple-orange-green order + opalescent chrome + 3-layer shadow stack)
 * were promoted to canonical defaults on `PaperApp`. H1 no longer passes
 * any of those overrides — it picks them up from the primitive's
 * defaults alongside every other paper app on the site.
 *
 * Still H1-exclusive: the Post-it's `rotationOrigin='top left'` + the
 * rise-and-slap IntersectionObserver choreography orchestrated here.
 * Post-it defaults on the primitive are unchanged, so the rest of the
 * site renders without the hero behavior.
 *
 * History in short (see git for full detail):
 *   • Early: `replace`/`RETAIN` display block + `OrangeScratch` overlay
 *     (Phase 4 Makeswift proof-of-concept).
 *   • Swapped to a stacked three-`TerminalLine` treatment, then to a
 *     single word-wrapping TerminalLine in a bounded container
 *     (`HeroTerminalBlock`).
 *   • 2026-04-21 evening: Pass 4 landed cursor-polish + brackets-drop
 *     + items-start fix + real hero copy.
 *   • 2026-04-21 evening: Pass 5 (this commit) added the rise-and-slap
 *     Post-it animation, vertical perks list, paper-app shift, and
 *     Post-it subheading.
 */

// ──────────────────────────────────────────────────────────────────────
// Pass 5 tuning constants — all tunable, all centralized here.
// ──────────────────────────────────────────────────────────────────────

/**
 * Delay between viewport entry and rise start (ms). Tuned on-screen
 * 2026-04-21 evening with Alex:
 *   • 900ms (original guess) → Post-it entered view too early
 *   • +7000 → 7900ms — overshoot, Post-it felt late / dead-air
 *   • -2000 → 5900ms (current) — lands in the pocket right after the
 *     eye finishes reading the typed line.
 * Re-tune if the hero copy gets longer/shorter since typing duration
 * anchors the target landing moment.
 */
const POSTIT_RISE_DELAY_MS = 5900

/** Duration of the rise animation (ms). */
const POSTIT_RISE_MS = 2700

/** Cubic-bezier for the rise — steady travel with a small overshoot/snap at land. */
const RISE_EASING = 'cubic-bezier(0.18, 0.89, 0.32, 1.15)'

/**
 * Paper app left-shift. Compensates for the Post-it's bottom-right
 * overhang so the composite {paper + Post-it} right-aligns with the
 * nav CTA rail AFTER the Post-it lands. 120px is a starting guess —
 * tune on screen. See PLAN.md "Pass 5" for the geometry.
 */
const PAPER_SHIFT_PX = 120

/**
 * Off-screen starting translateY for the Post-it. 100vh below its
 * landed anchor guarantees the Post-it is not above the fold on page
 * load, regardless of viewport height. Bump to 120vh if taller
 * viewports ever show a peek.
 */
const POSTIT_OFFSCREEN_TRANSLATE = '100vh'

/**
 * How many ms BEFORE the Post-it finishes landing to flip `line2Ready`
 * on — the cursor-baton-pass moment. Tuned 2026-04-22 evening to 1500
 * (up from an initial 500) per Alex: "heroterminalline2 should begin
 * a whole second earlier." At 1500, line 1's blinking `_` goes dark
 * and line 2 mounts 1500ms BEFORE the Post-it finishes landing —
 * which means line 2's idle-blink window (2120ms) spans the final
 * phase of the Post-it rise + the landing moment + ~620ms after,
 * then typing kicks off. Landing is at `POSTIT_RISE_DELAY_MS +
 * POSTIT_RISE_MS = 8600ms`; with peek=1500 the baton pass fires at
 * 7100ms post viewport-entry.
 *
 * ONLY this constant (+ line 2's copy and internal timings) should be
 * tuned going forward — line 1's `startDelayMs` / `charDelayMs` and
 * both Post-it constants above are locked at Alex's direction 2026-04-22.
 */
const POSTIT_LAND_PEEK_MS = 1500

/**
 * Truncated-holding-page launch (2026-04-24 — Alex): line 2 is hidden
 * while the site runs on the two-route holding page, because the
 * TrialCTA preamble terminal line now carries the scroll-pointer role
 * that line 2 used to play. All line-2 code (HeroTerminalBlock
 * `lines='2'` path, `line2Ready` state machinery, baton-pass timing in
 * useEffect) is intentionally preserved — flip this to `true` to
 * restore the two-line hero when the full site ships.
 *
 * With line 2 disabled, `line2Ready` stays `false` forever, which means
 * line 1's `persistCursor={!line2Ready}` resolves to `true` — its
 * blinking `_` cursor keeps going indefinitely after typing completes.
 * That's the desired behavior when line 1 stands alone.
 */
const SHOW_LINE_2 = true

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [phase, setPhase] = useState<'idle' | 'rising' | 'landed'>('idle')
  // Second-line gate. Flips true at (land − POSTIT_LAND_PEEK_MS). Drives
  // both (a) the fade-out of line 1's persisting `_` cursor and (b) the
  // conditional mount of line 2 inside HeroTerminalBlock.
  const [line2Ready, setLine2Ready] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    // Mobile (<md = <768px): skip the rise-and-slap entirely. The post-it
    // lives in normal flow below the paper-app on mobile (see the layout
    // classes further down) and there's no absolute-positioned overlay
    // for the rise to operate on. Land from frame one so line 2 mounts
    // straight away and the done-state layout is the first paint. Terminal
    // typing animation (driven by the TerminalLine primitives' own IOs) is
    // untouched — it still types on mobile, just without the post-it
    // choreography gating it.
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches

    // Reduced-motion OR mobile: skip animation, land from frame one. Line 2
    // is mounted immediately alongside — no baton-pass choreography, both
    // hero lines render in their done state from the first paint.
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || isMobile) {
      setPhase('landed')
      if (SHOW_LINE_2) setLine2Ready(true)
      return
    }

    let riseTimer: ReturnType<typeof setTimeout> | null = null
    let landTimer: ReturnType<typeof setTimeout> | null = null
    let line2Timer: ReturnType<typeof setTimeout> | null = null

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            riseTimer = setTimeout(() => {
              setPhase('rising')
            }, POSTIT_RISE_DELAY_MS)
            landTimer = setTimeout(() => {
              setPhase('landed')
            }, POSTIT_RISE_DELAY_MS + POSTIT_RISE_MS)
            // Baton pass: fires POSTIT_LAND_PEEK_MS before the Post-it
            // finishes landing. Line 1's persistCursor flips off and
            // line 2 mounts into the DOM below line 1. Line 2's own
            // IntersectionObserver fires on mount and kicks the
            // codified 2120ms idle-blink then the type-out.
            // Gated on SHOW_LINE_2: while line 2 is disabled for the
            // holding-page launch, we skip the baton pass entirely so
            // line 1's cursor persists indefinitely.
            if (SHOW_LINE_2) {
              line2Timer = setTimeout(
                () => {
                  setLine2Ready(true)
                },
                POSTIT_RISE_DELAY_MS + POSTIT_RISE_MS - POSTIT_LAND_PEEK_MS,
              )
            }
            io.disconnect()
            return
          }
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (riseTimer) clearTimeout(riseTimer)
      if (landTimer) clearTimeout(landTimer)
      if (line2Timer) clearTimeout(line2Timer)
    }
  }, [])

  // Transform state on the Post-it's positioning wrapper.
  //   idle    → translateY(100vh) — off-screen below the fold. No
  //             transition so the initial paint doesn't animate from
  //             wherever React initially placed things.
  //   rising  → translateY(0), transition active → animates the rise.
  //   landed  → translateY(0), transition still on; kept active so any
  //             subsequent state-driven tweak animates smoothly.
  //
  // NOTE: rotation lives on the Postit itself (via `rotation={-5}` +
  // `rotationOrigin='top left'`). The wrapper's transform is pure
  // translate so the rise animation and the tilt don't interact.
  const isOffscreen = phase === 'idle'
  const postitWrapperStyle: CSSProperties = {
    transform: isOffscreen
      ? `translateY(${POSTIT_OFFSCREEN_TRANSLATE})`
      : 'translateY(0)',
    transition: isOffscreen
      ? 'none'
      : `transform ${POSTIT_RISE_MS}ms ${RISE_EASING}`,
    willChange: 'transform',
  }

  // Post-it copy is shared across the desktop overlay and the mobile
  // contained version. Extracting it here keeps the two render paths
  // from drifting on the load-bearing copy.
  const postitHeading = (
    <>
      ai fluency
      <br />
      lessons
    </>
  )
  const postitBody = (
    <>
      the #1 L&D topic
      <br />
      of 2026
    </>
  )

  // Perks list — same content in both layouts; reused inline in each
  // paper-app instance.
  const perks = (
    <div className="space-y-8 py-2">
      <h2 className="font-display text-[22px] md:text-[34px] font-bold leading-none text-ink tracking-display-tight whitespace-nowrap uppercase">
        Perks & Benefits
      </h2>
      <ul className="space-y-4 text-[18px] leading-snug text-ink">
        <li>- English Lessons</li>
        <li>- Flexible Home Office</li>
        <li>- MultiSport Card</li>
      </ul>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-6 pt-4 pb-8 relative md:grid md:grid-cols-canvas md:gap-6 md:pt-8 md:items-stretch"
    >
      {/* ─── MOBILE STACK (block md:hidden) ─────────────────────────────
          Order per Alex 2026-04-24: line 1 → paper-app (with Post-it
          contained INSIDE the body, below the perks list) → line 2.
          Post-it is load-bearing copy, so it stays in the layout — just
          repositioned from the desktop overhanging overlay to a
          contained block inside the paper-app on mobile. No rise-and-
          slap animation here (the useEffect above sets
          phase='landed' immediately on mobile).
          Terminal typing animation is preserved on mobile via the
          `lines='1'` / `lines='2'` slots — each renders its own
          TerminalLine which runs its own IO-driven type-out. */}
      {/* Mobile line 1, wrapped in a CSS grid cell alongside an invisible
          ghost copy of the fully-typed state. The ghost is `aria-hidden
          + invisible` (reserves layout, paints transparent) and
          structurally mirrors the live mobile TerminalLine — same
          font-mono, same flex wrapper, same font-size, same `>  text_`
          shape WITHOUT framing brackets (the mobile variant drops
          `[ ]` entirely per Alex's 2026-04-24 spec). Both children
          occupy `col-start-1 row-start-1`, so the cell's height tracks
          the ghost and the paper-app below no longer slides down as
          the TerminalLine types out (Alex's 2026-04-24 spec: "all the
          space the text will need to deploy to already be there").
          Desktop doesn't need this pre-reserve: the hero's desktop
          layout pins the paper-app to its own grid column and the
          terminal doesn't push it. */}
      <div className="md:hidden grid">
        <div
          aria-hidden
          className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
          style={{ fontSize: HERO_FONT_SIZE_MOBILE }}
        >
          <span>
            <span className="select-none">&gt;</span>
            {'\u00a0\u00a0attract, upskill, and retain top HUMAN talent and prepare your company for your ai transformation\u00a0'}
            <span className="inline-block">_</span>
          </span>
        </div>
        <div className="col-start-1 row-start-1">
          <HeroTerminalBlock
            line2Ready={line2Ready}
            lines="1"
            fontSize={HERO_FONT_SIZE_MOBILE}
          />
        </div>
      </div>
      <div className="md:hidden mt-8">
        {/* Post-it composition (2026-04-26 Alex spec, supersedes 04-24):
            paper-app fully contains the post-it in its bottom-right
            corner — no bottom overhang. Width is no longer centered;
            the wrapper fills the page-padding gutters so the paper-app
            left/right edges align with the menu logo and CTA. The
            post-it is a sibling of PaperApp inside a `relative`
            container so its position can sit outside PaperApp's
            `overflow-hidden` body if needed (e.g. slight right
            overhang). 240px spacer below perks reserves vertical room
            for the post-it inside the paper-app body. */}
        <div className="relative">
          <PaperApp width="narrow">
            {perks}
          </PaperApp>
          {/* Post-it positioned with its visible top-left corner in
              the gap between "Flexible Home Office" and "English
              Lessons" — y≈216px in paper-app coords. Visible right
              edge reaches the viewport's right edge at every mobile
              width (Alex spec 2026-04-26). The math: paper-app center
              always lives at 50vw (page padding G is symmetric on
              both sides of the page), so the distance from paper-app
              center to viewport right is always 50vw.
              Two subtleties baked into the divisor `250px`:
                (1) The unit MUST be a length — `calc(50vw / 240)`
                    (no unit on the divisor) is invalid CSS for
                    `scale()` because vw/number = length, but
                    `scale()` requires a unitless ratio. Browsers
                    silently drop the whole transform. `50vw / 250px`
                    is length/length = unitless ratio = valid.
                (2) The post-it is rotated -5° around its center, so
                    the rotated bounding box is ~260px wide (the
                    bottom-right tip moves to x≈250 after rotation).
                    Dividing by 250 (instead of the source's 240)
                    sizes the scale so the rightmost rotated tip
                    lands exactly at viewport right (50vw + 250×k =
                    100vw), not 2vw past it.
              The lower portion of the post-it overhangs the paper-
              app's bottom edge — no overflow clipping on ancestors,
              so it renders freely. */}
          <div
            className="absolute left-1/2 top-[216px] pointer-events-none origin-top-left"
            style={{ transform: 'scale(calc(50vw / 250px))' }}
          >
            <Postit rotation={-5} heading={postitHeading}>
              {postitBody}
            </Postit>
          </div>
        </div>
      </div>
      {SHOW_LINE_2 && (
        // Mobile line 2 sits below the post-it's overhang. The post-it
        // visual height = 50vw (per the calc-scale spec), and overhangs
        // the paper-app by (50vw - 80px) since the post-it top is at
        // y=216 inside the paper-app and the paper-app body bottoms at
        // y≈296. Add (50vw + 17px) of mt to clear the overhang and
        // leave ~4 line-heights of breathing room (the 24px from gap-6
        // is included in the total). At 390 viewport the gap totals
        // 50vw+41 = ~236px between paper-app bottom and line 2 top.
        <div className="md:hidden mt-[calc(50vw+17px)]">
          <HeroTerminalBlock
            line2Ready={line2Ready}
            lines="2"
            fontSize={HERO_FONT_SIZE_MOBILE}
          />
        </div>
      )}

      {/* ─── DESKTOP TWO-COL (hidden md:contents) ───────────────────────
          Left col-span-2: HeroTerminalBlock with both lines stacked.
          Right col: paper-app translated left by PAPER_SHIFT_PX with
          the Post-it as an absolute overlay rising from below the fold.
          Wrapped in `md:contents` so the inner divs become direct
          children of the section's grid (canvas grid takes effect at
          md+ only). */}
      <div className="hidden md:col-span-2 md:flex md:flex-col md:pr-6">
        <HeroTerminalBlock line2Ready={line2Ready} />
      </div>
      <div className="relative hidden md:block md:pb-[120px] md:[transform:translateX(-120px)]">
        <PaperApp width="narrow">{perks}</PaperApp>
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none z-50"
          style={postitWrapperStyle}
        >
          <Postit rotation={-5} rotationOrigin="top left" heading={postitHeading}>
            {postitBody}
          </Postit>
        </div>
      </div>
    </section>
  )
}
