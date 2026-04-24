'use client'

import { useCallback, useState } from 'react'

import { TerminalLine } from '@/components/special/TerminalLine'
import { TerminalCTA } from '@/components/ui/TerminalCTA'

/**
 * ContactOutroBlock — /contact's closing seam.
 *
 * Pattern mirrors TrialCTASection on `/`: centered TerminalLine above two
 * bracketed CTAs that bracket-blink once the line finishes typing.
 *
 * Copy is placeholder (per CLAUDE.md "Alex writes all real copy"). The
 * download-faq CTA points to `/faq.md` — Alex produces that file externally
 * and drops it into `alderman-ai/public/`, so it 404s until then and goes
 * live with no code change (same pattern as the brochure CTA on `/`).
 *
 * Visible choreography:
 *   1. Pre-viewport: TerminalLine inert as `[ > ]`, CTAs static.
 *   2. On viewport entry: TerminalLine blinks 2× then types the line.
 *   3. On typing complete: brackets drop, CTAs' orange brackets begin
 *      ticker-blinking at 2.12s.
 */
export function ContactOutroBlock() {
  const [terminalDone, setTerminalDone] = useState(false)

  const handleComplete = useCallback(() => {
    setTerminalDone(true)
  }, [])

  return (
    <section
      className="py-16 md:py-24"
      aria-label="Alternative contact — download FAQ or brochure"
    >
      <div className="flex flex-col items-center gap-10">
        <TerminalLine
          onComplete={handleComplete}
          segments={[
            { text: 'but if you don' },
            { text: "'", color: 'text-purple' },
            { text: 't want to talk to a ' },
            { text: 'HUMAN', color: 'text-orange' },
            { text: ', just upload this ' },
            { text: 'faq.md', color: 'text-green' },
            { text: ' to your favorite ' },
            { text: 'ai', color: 'text-green' },
            { text: ' platform ' },
            { text: '...', color: 'text-purple' },
          ]}
        />

        <div className="flex flex-wrap items-baseline justify-center gap-10">
          <TerminalCTA
            href="/faq.md"
            bracketBlink={terminalDone}
            segments={[
              { text: 'download ' },
              { text: 'faq.md', color: 'text-green' },
            ]}
          />
          <TerminalCTA
            href="/alderman-ai-brochure.pdf"
            bracketBlink={terminalDone}
            segments={[
              { text: 'download ' },
              { text: 'brochure', color: 'text-orange' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
