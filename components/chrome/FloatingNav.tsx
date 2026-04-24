import Link from 'next/link'

import { Wordmark } from '@/components/chrome/Wordmark'
import { TerminalCTA } from '@/components/ui/TerminalCTA'

/**
 * FloatingNav — the fixed top nav.
 *
 * Sits above scroll. Wordmark left, secondary link + TerminalCTA right.
 * Right edge aligns to the inner edge of the right 1/6 margin (= right edge
 * of the content canvas), so the CTA and paper apps share a right-edge
 * gutter.
 *
 * Background: `bg-ide/90` — the IDE substrate colour at 90% opacity, so
 * the nav reads as a near-solid bar when paper apps sit under it (was
 * fully transparent, which let the paper cream bleed through). Kept the
 * final 10% of translucency so the edge under the bar still whispers
 * through, rather than slabbing flat onto the page.
 *
 * CTA: the nav uses `TerminalCTA` — the same bracketed primitive as the
 * H2.5 inline CTAs. Opted in to `bracketBlink` so the orange `[` and `]`
 * pulse continuously (there's no upstream TerminalLine to wait for up
 * here). `lowercase={false}` so `HUMAN` stays in its brand-rule caps.
 *
 * Spec: site-plan.md homepage block 1, os-model-concept.md "Navigation is
 * not chrome."
 */
export function FloatingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ide/90">
      <div className="grid grid-cols-page">
        <div aria-hidden className="hidden md:block" />
        <div className="col-span-6 flex items-center justify-between px-4 py-4 md:col-span-4 md:px-0 md:py-6">
          <Link href="/" className="flex items-center" aria-label="alderman.ai">
            {/* Mobile: stacked-logo SVG (`alderman-ai-stacked-logo-v1.svg`).
                The text wordmark + nav CTA together exceed the 343px
                mobile content width, so on mobile the wordmark swaps for
                the vertically-stacked logo to free up horizontal room.
                Sized at 48px tall — bumped up from the original 36px
                (2026-04-24 pass) so the logo reads as the dominant
                brand anchor on mobile, with the nav CTA shrunk to a
                quieter secondary weight. */}
            <img
              src="/brand-assets/logos/alderman-ai-stacked-logo-v1.svg"
              alt=""
              aria-hidden
              className="block h-12 w-auto md:hidden"
            />
            {/* Desktop: text wordmark sized to 16px — ~80% of the nav
                CTA's 20px, so it reads as a quieter sibling to the
                primary action on the right. Text-based (not SVG) so it
                stays on the same font-size scale as the nav link next
                to it. */}
            <span className="hidden md:inline">
              <Wordmark size={16} />
            </span>
          </Link>
          <div className="flex items-center gap-6">
            {/* Holding-page nav: only the primary CTA.
                Points at the dedicated `/contact` route (added 2026-04-24
                for the two-route holding-page launch). Mobile renders a
                smaller-typography variant — 14px vs the codified 20px —
                so the nav reads as logo-dominant with the CTA as a
                quieter sibling. Desktop keeps the 20px canonical size.
                Two TerminalCTA renders + md: gating is the simplest way
                to drive a breakpoint-specific fontSize through a prop
                that's a single number (no responsive style hatch on the
                primitive). */}
            <span className="md:hidden">
              <TerminalCTA
                href="/contact"
                fontSize={14}
                lowercase={false}
                bracketBlink
                segments={[
                  { text: 'talk to a ' },
                  {
                    text: 'HUMAN',
                    color: 'text-orange',
                    className: 'font-medium',
                  },
                ]}
              />
            </span>
            <span className="hidden md:inline-flex">
              <TerminalCTA
                href="/contact"
                lowercase={false}
                bracketBlink
                segments={[
                  { text: 'talk to a ' },
                  {
                    text: 'HUMAN',
                    color: 'text-orange',
                    className: 'font-medium',
                  },
                ]}
              />
            </span>
          </div>
        </div>
        <div aria-hidden className="hidden md:block" />
      </div>
    </nav>
  )
}
