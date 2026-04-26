import { PaperApp } from '@/components/paper/PaperApp'
import { TerminalCTA } from '@/components/ui/TerminalCTA'

/**
 * TrialCTASection — bottom-of-home credentials + CTA seam.
 *
 * 2026-04-26 (second exploratory pass): the typed terminal preamble
 * was retired in favour of a static title + subtitle introducing the
 * instructor's credentials before the brochure / faq CTAs. Brackets
 * on both CTAs blink continuously — no upstream typing animation
 * gating them anymore, so they shimmer from page load.
 *
 * Section retains `id="brochure"` so the in-nav `#brochure` anchor
 * still scrolls here.
 *
 * Two CTAs:
 *   - just download the brochure -> /alderman-ai-brochure.pdf (404 until
 *     Alex drops the PDF in `public/`)
 *   - go to faq -> /faq
 *
 * No client state needed any more — server component.
 */
export function TrialCTASection() {
  return (
    <section
      id="brochure"
      className="md:grid md:grid-cols-canvas md:gap-6 pt-10 pb-16 md:py-16 scroll-mt-24"
      aria-label="Credentials and brochure download"
    >
      <PaperApp width="wide">
        <div className="flex flex-col gap-10 py-2">
          <div className="space-y-4 md:space-y-5">
            <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
              I&rsquo;ve been doing this for 20 years
            </h2>
            <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
              ... since I was a signals intelligence officer for the US
              gov
            </p>
          </div>

          <div className="flex flex-wrap items-baseline justify-center gap-10">
            <TerminalCTA
              href="/alderman-ai-brochure.pdf"
              bracketBlink
              textColor="text-ink"
              segments={[
                { text: 'just download the ' },
                { text: 'brochure', color: 'text-orange' },
              ]}
            />
            <TerminalCTA
              href="/faq"
              bracketBlink
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
