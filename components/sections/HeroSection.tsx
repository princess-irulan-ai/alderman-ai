import { PaperApp } from '@/components/paper/PaperApp'
import { GutterGlow } from '@/components/special/GutterGlow'
import { Postit } from '@/components/special/Postit'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * HeroSection — top of the homepage.
 *
 * Vertical stack at every breakpoint: H1 → terminal line 1 →
 * paper-app with stuck-on post-it → terminal line 2. Below the
 * tablet breakpoint the column locks at 400px (PLAN.md "Desktop =
 * mobile at 400px"); at tablet+ inside `.desktop-expanded` (the
 * homepage dev sandbox) the column widens to 540 and H1 fills it
 * (78px). Paper-app + post-it stay mobile-sized regardless.
 *
 * `inlineTerminal` (opt-in, /dev/home-page only): narrows the
 * terminal-line wrap zone to 414px centered in the 540 column.
 * Wrap-zone width is sized to preserve mobile's 20-visible-chars-
 * per-line ratio at the bumped 30px desktop terminal font (mobile:
 * 22px / 264-content-box / 20 chars; desktop: 30px / 360-content-
 * box / 20 chars). Copy authored for mobile wraps at the same word
 * boundaries on desktop. `>` hangs to the LEFT of the wrap zone
 * via hangingPrompt's negative-margin math (lands ~9px in from the
 * gutter at this width), `_` cursor trails after typed text.
 * Default false — / uses the full content area as wrap zone.
 *
 * Post-it sits in its landed position from frame one — no rise/slap
 * choreography, no baton-pass between terminal lines. Each TerminalLine
 * runs its own IntersectionObserver-driven type-out independently and
 * inherits its font size from the canonical `--font-terminal` CSS var.
 */

export function HeroSection({
  inlineTerminal = false,
}: {
  inlineTerminal?: boolean
} = {}) {
  // Terminal-line layout differs in inlineTerminal (/dev/home-page) mode:
  //   - leadingSpaces stays at the canonical 2 (= 2 NBSPs between `>` and
  //     visible text). Combined with hangingPrompt's -3ch margin, `>` lands
  //     at column-left - 39 with its bbox fully in the gutter, well past
  //     the rule line; typed text starts at column-left + 15.
  //   - The wrapper sits at column-left + 15 (left-aligned) with a 407px
  //     wrap zone, so text breaks at the paper-app's right edge below
  //     (column-left + 422).
  // Canonical mode (used on `/`): leadingSpaces=2 + mx-auto centering as
  // before — paths stay independent.
  const leadingSpaces = 2
  const ghostPad = ' '.repeat(leadingSpaces)

  // Post-it copy — merged title-weight + body-weight into a single
  // heading per Alex 2026-04-28. Inline fontSize=24px overrides Postit's
  // wrapper text-[34px]/[43px] — the merged copy is longer than the
  // original two-word heading and needs a smaller size to wrap cleanly
  // inside the 240×240 post-it.
  const postitHeading = (
    <span
      className="block font-display font-normal"
      style={{ width: '200px', fontSize: '32px', lineHeight: 1.05 }}
    >
      <span className="whitespace-nowrap">ai lessons</span>
      <br />
      <span className="whitespace-nowrap">will be the</span>
      <br />
      <span className="font-bold whitespace-nowrap">top L&amp;D perk</span>
      <br />
      <span className="whitespace-nowrap">
        of{' '}
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
          />
          <span className="relative">2026</span>
        </span>
      </span>
    </span>
  )

  const perks = (
    <div className="space-y-8 py-2">
      <h2 className="font-display text-[22px] font-bold leading-none text-ink tracking-display-tight whitespace-nowrap">
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
          />
          <span className="relative">2025</span>
        </span>{' '}
        Job Benefits
      </h2>
      <ul className="space-y-4 text-[18px] leading-snug text-ink">
        <li>- English Lessons</li>
        <li>- 30 Days PTO</li>
        <li>- Flexible Home Office</li>
        <li>- MultiSport Card</li>
      </ul>
    </div>
  )

  return (
    <section className="flex flex-col gap-6 pt-4 pb-8">
      {/* H1 wrapped in a relative container so the GutterGlows can
          position themselves against the column's gutter rules.
          mb-14 lives on the wrapper (not the H1) so the wrapper's
          rendered height matches the H1's text bbox — the glow's
          `calc(100% + 20px)` height then extends exactly 10px above
          and below the topmost/bottommost text rather than picking
          up the H1's bottom margin. */}
      <div className="relative mb-14">
        <h1 className="font-display text-[40px] [.desktop-expanded_&]:tablet:text-[78px] font-bold leading-[1.05] tracking-display-tight text-center text-ide-fg">
          <span className="text-green">ai</span> is a language
          <br />
          your <span className="text-orange">COMPANY</span>
          <br />
          needs to learn
        </h1>
        {inlineTerminal && (
          <>
            <GutterGlow side="left" color="purple" />
            <GutterGlow side="right" color="purple" />
          </>
        )}
      </div>

      {/* Terminal line 1 — wrapped in a CSS grid alongside an invisible
          ghost copy of the fully-typed line, both pinned to the same
          col-start-1 row-start-1. The ghost reserves the wrapped-line
          height from first paint so the paper-app below doesn't slide
          downward as the line types out. */}
      <div className="grid [.desktop-expanded_&]:tablet:max-w-[407px] [.desktop-expanded_&]:tablet:ml-[15px]">
        <div
          aria-hidden
          className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
          style={{ fontSize: 'var(--font-terminal)' }}
        >
          <span>
            <span className="select-none">&gt;</span>
            {`${ghostPad}ai fluency lessons help attract / retain top TALENT and also prepare for a new era of work `}
            <span className="inline-block">_</span>
          </span>
        </div>
        <div className="col-start-1 row-start-1">
          <TerminalLine
            className="[font-variant-ligatures:none]"
            segments={[
              { text: 'ai', color: 'text-green' },
              { text: ' fluency lessons help attract ' },
              { text: '/', color: 'text-purple' },
              { text: ' retain top ' },
              { text: 'TALENT', color: 'text-orange' },
              { text: ' and also prepare for a new era of work' },
            ]}
            align="left"
            hangingPrompt
            leadingSpaces={leadingSpaces}
            showBrackets={false}
            persistCursor
          />
        </div>
      </div>

      {/* Paper-app with stuck-on post-it. Post-it is positioned with its
          visible top-left corner at paper-app y≈244, anchored at the
          paper-app's horizontal center via `left-1/2`. Scale is
          calc(--page-half / 250px). On mobile --page-half = 50vw so the
          rotated bottom-right tip lands at viewport-right; once the
          column locks at 400px above 400px viewport, --page-half clamps
          at 200px and the scale stays at 200/250 = 0.8.
          The unit MUST be a length — `calc(50vw / 240)` (no unit on the
          divisor) is invalid CSS for `scale()` because vw/number = length,
          but `scale()` requires a unitless ratio. `50vw / 250px` is
          length/length = unitless ratio = valid. The 250px (vs the
          source's 240) accounts for the rotated bbox: at -5° the
          bottom-right tip moves to x≈250. */}
      <div className="mt-5 relative">
        <div className="relative [.desktop-expanded_&]:tablet:max-w-[304px] [.desktop-expanded_&]:tablet:ml-auto [.desktop-expanded_&]:tablet:mr-[15px]">
          <PaperApp width="narrow">{perks}</PaperApp>
          <div className="absolute left-1/2 top-[244px] [.desktop-expanded_&]:tablet:left-[370px] pointer-events-none origin-top-left z-10 [transform:scale(calc(var(--page-half)/250px))]">
            <Postit rotation={-5} heading={postitHeading} />
          </div>
        </div>
        {inlineTerminal && <GutterGlow side="right" color="orange" />}
      </div>

      {/* Terminal line 2 — sits below the post-it overhang. mt = calc
          (--page-half - 82px) gives ~1 line of clearance below the
          post-it bottom. On mobile --page-half = 50vw so it tracks the
          viewport; above 400px viewport --page-half clamps at 200px so
          the gap settles at 118px inside the locked column. */}
      <div className="mt-[calc(var(--page-half)-82px)] grid [.desktop-expanded_&]:tablet:max-w-[407px] [.desktop-expanded_&]:tablet:ml-[15px]">
        <div
          aria-hidden
          className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
          style={{ fontSize: 'var(--font-terminal)' }}
        >
          <span>
            <span className="select-none">&gt;</span>
            {`${ghostPad}fluency helps your TEAMS navigate new tools while reducing their anxiety about being replaced `}
            <span className="inline-block">_</span>
          </span>
        </div>
        <div className="col-start-1 row-start-1">
          <TerminalLine
            segments={[
              { text: 'fluency helps your ' },
              { text: 'TEAMS', color: 'text-orange' },
              { text: ' navigate new tools while reducing their ' },
              { text: 'anxiety', color: 'text-green' },
              { text: ' about being replaced' },
            ]}
            align="left"
            hangingPrompt
            leadingSpaces={leadingSpaces}
            showBrackets={false}
            persistCursor
          />
        </div>
      </div>
    </section>
  )
}
