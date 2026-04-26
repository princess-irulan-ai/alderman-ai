'use client'

import { useCallback, useState } from 'react'

import { PaperApp } from '@/components/paper/PaperApp'
import { TerminalLine } from '@/components/special/TerminalLine'
import { TerminalCTA } from '@/components/ui/TerminalCTA'

/**
 * TrialCTASection — bottom-of-home CTA seam.
 *
 * 2026-04-26 (exploratory): wraps the terminal line + CTAs inside a
 * `PaperApp` so the section reads as cream-paper content rather than
 * floating bare on the IDE substrate. Two CTAs:
 *   - just download the brochure (-> /alderman-ai-brochure.pdf, 404 until
 *     Alex drops the PDF in `public/`)
 *   - go to faq (-> /faq)
 * Old CTAs (download brochure + talk to a HUMAN) are retired here —
 * talk-to-a-HUMAN already lives in the floating nav.
 *
 * Section carries `id="brochure"` so the in-nav `#brochure` anchor
 * still scrolls here.
 *
 * Visible choreography:
 *   1. Pre-viewport: TerminalLine inert as `[ > ]`, CTAs static.
 *   2. On viewport entry: TerminalLine blinks 2× then types the line.
 *   3. On typing complete: line's brackets drop, CTAs' orange brackets
 *      begin ticker-blinking at 2.12s.
 *
 * Paper substrate colour overrides: textColor swaps from the
 * ide-substrate default `text-ide-fg` to `text-ink` so the typed line
 * + CTA bodies read on cream paper. Prompt + cursor + bracket colours
 * (purple / purple / orange) work on both substrates and are left
 * default.
 */
export function TrialCTASection() {
  const [terminalDone, setTerminalDone] = useState(false)

  const handleComplete = useCallback(() => {
    setTerminalDone(true)
  }, [])

  return (
    <section
      id="brochure"
      className="md:grid md:grid-cols-canvas md:gap-6 pt-10 pb-16 md:py-16 scroll-mt-24"
      aria-label="Brochure download call-to-action"
    >
      <PaperApp width="wide">
        <div className="flex flex-col items-center gap-10 py-2">
          <TerminalLine
            onComplete={handleComplete}
            textColor="text-ink"
            cursorColor="text-ink-soft"
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
              textColor="text-ink"
              segments={[
                { text: 'just download the ' },
                { text: 'brochure', color: 'text-orange' },
              ]}
            />
            <TerminalCTA
              href="/faq"
              bracketBlink={terminalDone}
              textColor="text-ink"
              segments={[
                { text: 'go to ' },
                { text: 'faq', color: 'text-orange' },
              ]}
            />
          </div>
        </div>
      </PaperApp>
    </section>
  )
}
