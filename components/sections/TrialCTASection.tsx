import { PaperApp } from '@/components/paper/PaperApp'
import { TerminalCTA } from '@/components/ui/TerminalCTA'

/**
 * TrialCTASection — bottom-of-home credentials + CTA seam.
 *
 * 2026-04-26 (third pass): the paper-app now holds only the
 * credentials title + subtitle. The two CTAs (brochure / faq)
 * have moved OUT of the paper-app and sit below it on the dark
 * IDE substrate, centered. CTA `textColor` swaps back from
 * `text-ink` (cream paper) to the primitive default (`text-ide-fg`,
 * which reads as off-white on the dark substrate).
 *
 * Section retains `id="brochure"` so the in-nav `#brochure` anchor
 * still scrolls here.
 *
 * Two CTAs:
 *   - just download the brochure -> /alderman-ai-brochure.pdf (404 until
 *     Alex drops the PDF in `public/`)
 *   - go to faq -> /faq
 */
export function TrialCTASection() {
  return (
    <section
      id="brochure"
      className="md:grid md:grid-cols-canvas md:gap-6 pt-10 pb-16 md:py-16 scroll-mt-24"
      aria-label="Credentials and brochure download"
    >
      <PaperApp width="wide">
        <div className="space-y-4 md:space-y-5 py-2">
          <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
            I&rsquo;ve been doing this for 20 years
          </h2>
          <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
            ... since I was a signals intelligence officer for the US
            government
          </p>
        </div>
      </PaperApp>

      {/* CTAs on the dark IDE substrate, sitting below the paper-app.
          col-span-3 + flex justify-center so they center across the
          full canvas width. mt-10 / md:mt-14 reserves breathing room
          between the paper-app's bottom edge (with its glow) and the
          CTAs. */}
      <div className="md:col-span-3 mt-10 md:mt-14 flex flex-wrap items-baseline justify-center gap-10">
        <TerminalCTA
          href="/alderman-ai-brochure.pdf"
          bracketBlink
          segments={[
            { text: 'just download the ' },
            { text: 'brochure', color: 'text-orange' },
          ]}
        />
        <TerminalCTA
          href="/faq"
          bracketBlink
          segments={[
            { text: 'go to ' },
            { text: 'faq', color: 'text-orange' },
          ]}
        />
      </div>
    </section>
  )
}
