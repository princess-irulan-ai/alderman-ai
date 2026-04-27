import { PaperApp } from '@/components/paper/PaperApp'
import { Postit } from '@/components/special/Postit'
import { SectionTile } from '@/components/special/SectionTile'
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
      className="md:grid md:grid-cols-canvas md:gap-6 pt-4 pb-16 md:pt-6 md:pb-16 scroll-mt-24"
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
            {/* Orange APP-variant SectionTile — first live use of the
                paper-dialect tile. Sits inside the credentials paper-app
                after the subtitle. PLACEHOLDER copy — Alex listed several
                eyebrow ideas (Meet your instructor / See my experience /
                Why trust me / More about me / More about Alex), shipping
                "instructor" / "see my experience" as a starting point;
                expect to iterate in the sandbox. */}
            <div className="mx-auto max-w-[420px] pt-4 md:pt-6">
              <SectionTile
                variant="app"
                accent="orange"
                eyebrow="instructor"
                title="See My Experience"
                href="/about"
              />
            </div>
          </div>
        </PaperApp>
        {/* Bottom-left post-it — mirror of the hero's BR post-it. Sits
            ON the paper-app (overlaps its bottom-left corner area)
            and overhangs DOWN-LEFT past the paper-app's BL corner.
              - `right-1/2` anchors the post-it's right edge at the
                paper-app's horizontal center.
              - `top-full -mt-8` puts the wrapper's top 32px ABOVE
                the paper-app's bottom edge — i.e. inside the
                paper-app's bottom padding zone, just below the
                subtitle's last line. The post-it's body extends
                DOWN from that anchor.
              - `origin-top-right` scales from that anchor so the
                rotated+scaled tip lands at the viewport's left edge
                on mobile (mirror of the hero math). */}
        <div
          className="absolute right-1/2 top-full -mt-8 pointer-events-none origin-top-right"
          style={{ transform: 'scale(calc(50vw / 250px))' }}
        >
          <Postit
            flipX
            rotation={5}
            heading={
              <span
                className="font-display font-normal"
                style={{ fontSize: '30px', lineHeight: 1.05 }}
              >
                including 8+ years of{' '}
                <span className="font-bold">teaching ESL</span> in the
                Czech Republic
              </span>
            }
          />
        </div>
      </div>

      {/* Tagline — first item below the BL post-it overhang. Mobile mt
          = post-it overhang (~152px) + canonical 32px gap. JetBrains Mono. */}
      <div className="md:col-span-3 mt-[184px] md:mt-8 flex flex-col items-center">
        <p className="font-mono text-[24px] md:text-[34px] leading-tight text-ide-fg/85 text-center">
          enabling <span className="text-green">ai</span> value
          with{' '}<span className="text-orange">HUMAN</span> values
        </p>
      </div>

      {/* CTAs on the dark IDE substrate, below the tagline. mt-8 = 32px. */}
      <div className="md:col-span-3 mt-8 md:mt-8 flex flex-col items-center gap-4 md:flex-row md:items-baseline md:justify-center md:gap-10">
        <TerminalCTA
          href="/about"
          fontSize={18}
          bracketBlink
          className="whitespace-nowrap"
          segments={[
            { text: ' learn  about  ' },
            { text: 'ME', color: 'text-orange', className: 'uppercase' },
          ]}
        />
        <TerminalCTA
          href="/faq"
          fontSize={18}
          bracketBlink
          className="whitespace-nowrap"
          segments={[
            { text: 'see ' },
            { text: 'faq', color: 'text-paper' },
            { text: ' / ', color: 'text-purple' },
            { text: 'pricing', color: 'text-paper' },
          ]}
        />
      </div>
    </section>
  )
}
