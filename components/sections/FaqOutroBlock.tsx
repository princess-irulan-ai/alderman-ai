'use client'

import { useCallback, useState } from 'react'

import { TerminalLine } from '@/components/special/TerminalLine'
import { TerminalCTA } from '@/components/ui/TerminalCTA'

/**
 * FaqOutroBlock — /faq's closing seam.
 *
 * Same choreography as ContactOutroBlock / TrialCTASection: centered
 * TerminalLine above two bracketed CTAs that bracket-blink once the line
 * finishes typing. Split into its own client component so the /faq page
 * can stay a server component and export `metadata`.
 */
export function FaqOutroBlock() {
  const [terminalDone, setTerminalDone] = useState(false)
  const handleComplete = useCallback(() => setTerminalDone(true), [])

  return (
    <section
      className="py-16 md:py-24"
      aria-label="Download FAQ or brochure"
    >
      <div className="flex flex-col items-center gap-10">
        <TerminalLine
          onComplete={handleComplete}
          segments={[
            { text: 'grab the ' },
            { text: 'faq.md', color: 'text-green' },
            { text: ' ' },
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
