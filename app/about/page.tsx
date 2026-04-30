import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about — promoted from dev14 (round 3 variant: editorial pullquote).
 *
 * The locked anchor line ("20 years at the intersection of technology,
 * education, and psychology.") is pulled OUT of the hero and treated as
 * a hero-scale pullquote in the middle of the page — the visual peak,
 * borrowed from magazine layouts where a pullquote interrupts the body.
 *
 * Page rhythm:
 *   1. Hero — H1 (3 lines) + headshot PaperApp with stacked-logo overlay.
 *   2. Dark CTA — "let's chat / book a call" SectionTile right under
 *      the portrait.
 *   3. Lead beat — wide centered PaperApp ("Eight years teaching
 *      English in Prague" + 3-clause subtitle + bridge sentence).
 *   4. THE PULLQUOTE — full-canvas TerminalLine on IDE substrate,
 *      generous py-16 md:py-24 breathing room. Left-aligned with
 *      hangingPrompt so the `[ > ` prefix hangs in the outer gutter.
 *      Comma + period in purple per the homepage convention.
 *   5. After-pullquote beat — wide centered PaperApp ("Before Prague:
 *      marketing, freelance, military" + two-sentence subtitle).
 *   6. Closing IDE SectionTile -> /contact.
 *
 * Surface cadence: paper -> IDE peak -> paper -> IDE closer.
 */
export default function AboutPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />

        {/* HERO ZONE — H1 + headshot PaperApp. The anchor line is held
            back for the mid-page pullquote moment. Smaller H1 size than
            the homepage so the hero feels lighter and the pullquote can
            be the visual peak below. */}
        <section className="flex flex-col gap-8 pt-4 pb-8 md:grid md:grid-cols-canvas md:gap-6 md:pt-8 md:items-center">
          <div className="md:col-span-2 md:pr-4">
            <h1 className="font-display text-[37px] md:text-[48px] font-bold leading-[1.05] tracking-display-tight text-ide-fg text-center md:text-left">
              Your team needs
              <br />
              a <span className="text-orange">HUMAN</span> teacher
              <br className="md:hidden" />{' '}
              for <span className="text-green">ai</span>
            </h1>
          </div>

          {/* Headshot PaperApp. Empty chrome strings per convention.
              Stacked-logo overlay at the BR corner — 20px in from the
              image's bottom-right edges, with "alex" in JetBrains Mono
              baseline-aligned to the "man" row of the SVG (man baseline
              sits ~11.5px above the SVG's bottom edge in this 76px
              render — viewBox math: man baseline at y≈322 / vbHeight
              379.5 → 84.8% from top → 64.5px from top of 76px image →
              11.5px from the image's bottom). */}
          <div className="relative md:block">
            <PaperApp width="narrow" bodyClassName="">
              <div className="relative">
                <Image
                  src="/brand-assets/photography/alex-headshot-full-v1.jpg"
                  alt="Alex Alderman"
                  width={1200}
                  height={1823}
                  className="block h-auto w-full"
                  priority
                />
                <div className="absolute bottom-[20px] right-[20px] flex items-end gap-0">
                  <span
                    className="font-mono lowercase text-white leading-none"
                    style={{ fontSize: '16px', marginBottom: '9px' }}
                  >
                    hi, I&apos;m alex
                  </span>
                  <img
                    src="/brand-assets/logos/alderman-ai-stacked-logo-v1.svg"
                    alt=""
                    aria-hidden
                    className="h-[76px] w-[76px]"
                  />
                </div>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* DARK CTA — sits directly under the portrait. */}
        <section className="grid grid-cols-canvas gap-6 pt-16 pb-8 md:pt-20 md:pb-10">
          <div className="col-span-3 md:w-1/3 md:justify-self-center">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow={
                <>
                  let<span className="text-white">&apos;</span>s chat
                </>
              }
              title="book a call"
              href="/contact"
              markerStyle="contained"
            />
          </div>
        </section>

        {/* LEAD BEAT — wide centered PaperApp. Strategic anchor: 8 years
            ESL in Prague, the buying mental model HR already has. */}
        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-12 pb-8 md:pt-16 md:pb-10">
          <PaperApp width="wide" className="md:col-span-3 md:w-2/3 md:justify-self-center">
            <div className="space-y-6 md:space-y-8 py-2">
              <div className="space-y-4 md:space-y-5">
                <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                  8 years teaching English in ČR
                </h2>
                <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                  then 8 more in{' '}
                  <span className="relative inline-block">
                    <span
                      aria-hidden
                      className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                    />
                    <span className="relative">teaching</span>
                  </span>{' '}
                  LinkedIn automation
                </p>
              </div>
              <p className="font-body text-[17px] md:text-[18px] leading-relaxed text-ink max-w-prose mx-auto text-center">
                If your HR team has ever booked English lessons for staff, you already
                have a mental model for what these{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-green/55"
                  />
                  <span className="relative">ai fluency</span>
                </span>{' '}
                lessons look like.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* THE BIG PULLQUOTE — the locked anchor line at hero scale,
            full canvas, generous breathing room. IDE substrate keeps
            the editorial pullquote in the page's authoritative voice;
            comma + period in purple per the homepage punctuation
            convention. Left-aligned with hangingPrompt so the `[ > `
            prefix hangs in the outer gutter, matching the homepage
            hero treatment. */}
        <section className="grid grid-cols-canvas gap-6 py-16 md:py-24">
          <div className="col-span-3 relative">
            {/* Invisible mirror — reserves the final rendered height of
                the terminal line so the "Before Prague" paper-app below
                holds its position while the line types out. Mirrors
                hangingPrompt's 3ch hanging math when brackets are off
                (1ch prompt + 2 leadingSpaces NBSPs) so the reserved box
                matches the live line exactly. */}
            <div
              aria-hidden
              className="font-mono invisible"
              style={{
                fontSize: 'clamp(26px, 6vw, 44px)',
                marginLeft: '-3ch',
                paddingLeft: '3ch',
                textIndent: '-3ch',
              }}
            >
              {'>  20 years at the intersection of technology, education, and psychology.'}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                fontSize="clamp(26px, 6vw, 44px)"
                align="left"
                hangingPrompt
                showBrackets={false}
                persistCursor
                startDelayMs={1620}
                segments={[
                  { text: '20 years', color: 'text-orange' },
                  { text: ' at the intersection of technology' },
                  { text: ',', color: 'text-purple' },
                  { text: ' education', color: 'text-purple' },
                  { text: ',', color: 'text-purple' },
                  { text: ' and psychology' },
                  { text: '.', color: 'text-purple' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* AFTER-PULLQUOTE BEAT — "Before Prague" consolidated paper-app.
            Sentence-level subtitle covers beats 2 + 3 (decade training
            juniors + US military signals intelligence / Korean
            linguist). Returns to App register after the IDE pullquote
            peak. */}
        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-8 pb-12 md:pt-10 md:pb-16">
          <PaperApp width="wide" className="md:col-span-3 md:w-2/3 md:justify-self-center">
            <div className="space-y-4 md:space-y-5 py-2">
              <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Before Prague: military, then marketing, then freelance{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-orange/55"
                  />
                  <span className="relative">mentor</span>
                </span>
              </h2>
              <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                  />
                  <span className="relative">20 years</span>
                </span>{' '}
                training juniors on cutting-edge software. Now 3 years training people on{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-green/55"
                  />
                  <span className="relative">ai</span>
                </span>
                .
              </p>
            </div>
          </PaperApp>
        </section>

        {/* CLOSING CTA — IDE SectionTile -> /contact. */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="col-span-3 md:w-1/3 md:justify-self-center">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="next step"
              title="book a demo lesson"
              href="/contact"
              markerStyle="contained"
            />
          </div>
        </section>
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'about your instructor — alderman.ai',
}
