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
        <div aria-hidden />
        <div className="col-span-4 flex items-center justify-between py-6">
          <Link href="/" className="flex items-center">
            {/* Wordmark sized to 16px — ~80% of the nav CTA's 20px, so
                it reads as a quieter sibling to the primary action on
                the right. Text-based (not SVG) so it stays on the same
                font-size scale as the nav link next to it. */}
            <Wordmark size={16} />
          </Link>
          <div className="flex items-center gap-6">
            {/* Holding-page nav: only the primary CTA.
                `href="#brochure"` scrolls to TrialCTASection (the
                brochure-download moment). Swap to a real target when
                full nav ships. */}
            <TerminalCTA
              href="#brochure"
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
          </div>
        </div>
        <div aria-hidden />
      </div>
    </nav>
  )
}
