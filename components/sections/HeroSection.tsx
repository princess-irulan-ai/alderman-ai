import { PaperApp } from '@/components/paper/PaperApp'
import {
  HERO_FONT_SIZE_MOBILE,
  HeroTerminalBlock,
} from '@/components/sections/HeroTerminalBlock'
import { Postit } from '@/components/special/Postit'

/**
 * HeroSection — top of the homepage.
 *
 * Vertical stack at every breakpoint per the locked desktop strategy
 * (PLAN.md "Desktop = mobile at 400px"): H1 → terminal line 1 →
 * paper-app with stuck-on post-it → terminal line 2. The 400px desktop
 * column comes from PageFrame; this section is breakpoint-agnostic.
 *
 * Post-it sits in its landed position from frame one — no rise/slap
 * choreography, no baton-pass between terminal lines. Each TerminalLine
 * runs its own IntersectionObserver-driven type-out independently.
 */
export function HeroSection() {
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
      <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-display-tight text-center text-ide-fg mb-14">
        <span className="text-green">ai</span> is a language
        <br />
        your <span className="text-orange">COMPANY</span>
        <br />
        needs to learn
      </h1>

      {/* Terminal line 1 — wrapped in a CSS grid alongside an invisible
          ghost copy of the fully-typed line, both pinned to the same
          col-start-1 row-start-1. The ghost reserves the wrapped-line
          height from first paint so the paper-app below doesn't slide
          downward as the line types out. */}
      <div className="grid">
        <div
          aria-hidden
          className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
          style={{ fontSize: HERO_FONT_SIZE_MOBILE }}
        >
          <span>
            <span className="select-none">&gt;</span>
            {'  ai fluency lessons help attract / retain top TALENT and also prepare for the new era of work '}
            <span className="inline-block">_</span>
          </span>
        </div>
        <div className="col-start-1 row-start-1">
          <HeroTerminalBlock lines="1" fontSize={HERO_FONT_SIZE_MOBILE} />
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
      <div className="mt-5">
        <div className="relative">
          <PaperApp width="narrow">{perks}</PaperApp>
          <div className="absolute left-1/2 top-[244px] pointer-events-none origin-top-left [transform:scale(calc(var(--page-half)/250px))]">
            <Postit rotation={-5} heading={postitHeading} />
          </div>
        </div>
      </div>

      {/* Terminal line 2 — sits below the post-it overhang. mt = calc
          (--page-half - 82px) gives ~1 line of clearance below the
          post-it bottom. On mobile --page-half = 50vw so it tracks the
          viewport; above 400px viewport --page-half clamps at 200px so
          the gap settles at 118px inside the locked column. */}
      <div className="mt-[calc(var(--page-half)-82px)] grid">
        <div
          aria-hidden
          className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
          style={{ fontSize: HERO_FONT_SIZE_MOBILE }}
        >
          <span>
            <span className="select-none">&gt;</span>
            {"  fluency helps your TEAMS navigate new tools while reducing their anxiety about being replaced "}
            <span className="inline-block">_</span>
          </span>
        </div>
        <div className="col-start-1 row-start-1">
          <HeroTerminalBlock lines="2" fontSize={HERO_FONT_SIZE_MOBILE} />
        </div>
      </div>
    </section>
  )
}
