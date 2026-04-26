import { PaperApp } from '@/components/paper/PaperApp'
import { Postit } from '@/components/special/Postit'
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
      <div className="relative md:col-span-3">
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
        {/* Bottom-left post-it overhang — mirror image of the hero's
            BR post-it. flipX puts the rounded corner + curl on the
            BL; rotation=+5° flips the hero's -5° tilt the opposite
            way. Anchored with its TOP-RIGHT corner at the paper-app's
            bottom-center (right-1/2 top-full origin-top-right), so
            the scaled+rotated tip lands at the viewport's left edge
            on mobile (mirror of the hero math). `mt-8` pushes the
            wrapper 32px below the paper-app bottom edge so the
            rotation-extended visual top clears the subtitle's last
            line ("US government"). */}
        <div
          className="absolute right-1/2 top-full mt-16 pointer-events-none origin-top-right"
          style={{ transform: 'scale(calc(50vw / 250px))' }}
        >
          <Postit
            flipX
            rotation={5}
            heading={
              <span style={{ fontSize: '24px', lineHeight: 1.15 }}>
                over eight years of teaching ESL
              </span>
            }
          />
        </div>
      </div>

      {/* CTAs on the dark IDE substrate, sitting below the paper-app
          AND clear of the BL post-it overhang. mt-[250px] on mobile
          reserves enough vertical room for the post-it (~50vw tall +
          mt-8 push + buffer); desktop keeps the original md:mt-14
          since the post-it overhang scales differently up there. */}
      <div className="md:col-span-3 mt-[280px] md:mt-14 flex flex-wrap items-baseline justify-center gap-10">
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
