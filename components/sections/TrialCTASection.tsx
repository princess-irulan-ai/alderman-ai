'use client'

import { useCallback, useState } from 'react'

import { TerminalLine } from '@/components/special/TerminalLine'
import { TerminalCTA } from '@/components/ui/TerminalCTA'

/**
 * TrialCTASection — holding-page CTA seam. Lives on the dark IDE
 * substrate, one centered terminal line above two bracketed CTAs.
 *
 * Copy here is placeholder (per CLAUDE.md "Alex writes all real copy").
 * Brochure download CTA points to `/alderman-ai-brochure.pdf`; that
 * file doesn't exist in `public/` yet — 404 until Alex drops it in,
 * at which point this CTA goes live without any code change.
 *
 * Second CTA points to `/contact` (added 2026-04-24 for the two-route
 * holding-page launch).
 *
 * Section carries `id="brochure"` so `FloatingNav`'s `#brochure`
 * anchor scrolls here.
 *
 * Visible choreography (unchanged from pre-holding-page version):
 *   1. Pre-viewport: TerminalLine inert as `[ > ]`, CTAs static.
 *   2. On viewport entry: TerminalLine blinks 2× then types the line.
 *   3. On typing complete: line's brackets drop, CTAs' orange brackets
 *      begin ticker-blinking at 2.12s.
 */
export function TrialCTASection() {
  const [terminalDone, setTerminalDone] = useState(false)

  const handleComplete = useCallback(() => {
    setTerminalDone(true)
  }, [])

  return (
    <section
      id="brochure"
      className="grid grid-cols-canvas gap-6 py-16 scroll-mt-24"
      aria-label="Brochure download call-to-action"
    >
      <div className="col-span-3 flex flex-col items-center gap-10">
        <TerminalLine
          onComplete={handleComplete}
          segments={[
            { text: 'download the brochure to see what we' },
            { text: "'", color: 'text-purple' },
            { text: 're building for your ' },
            { text: 'ai', color: 'text-green' },
            { text: ' future ' },
            { text: '...', color: 'text-purple' },
          ]}
        />

        <div className="flex flex-wrap items-baseline justify-center gap-10">
          <TerminalCTA
            href="/alderman-ai-brochure.pdf"
            bracketBlink={terminalDone}
            segments={[
              { text: 'download ' },
              { text: 'brochure', color: 'text-orange' },
            ]}
          />
          <TerminalCTA
            href="/contact"
            lowercase={false}
            bracketBlink={terminalDone}
            segments={[
              { text: 'talk to a ' },
              { text: 'HUMAN', color: 'text-orange', className: 'font-medium' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
