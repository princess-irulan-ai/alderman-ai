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
        <section className="flex flex-col gap-8 pt-4 pb-8">
          <div>
            <h1 className="font-display text-[37px] font-bold leading-[1.05] tracking-display-tight text-ide-fg text-center mb-10">
              alex alderman<span className="text-purple">:</span>
              <br />
              an <span className="text-green">ai</span> expert and
              <br />
              also a <span className="text-orange">TEACHER</span>
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
          <div className="relative">
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

        {/* TERMINAL SEAM — career anchor between the portrait and the
            dark CTA. Comma in purple per the punctuation convention. */}
        <section className="pt-8 pb-8 md:pt-10 md:pb-10">
          <div className="relative">
            <div
              aria-hidden
              className="font-mono invisible"
              style={{
                fontSize: '22px',
                marginLeft: '-3ch',
                paddingLeft: '3ch',
                textIndent: '-3ch',
              }}
            >
              {'>  working with ai since before chatgpt, and teaching and training for over 20 YEARS'}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                fontSize="22px"
                align="left"
                hangingPrompt
                showBrackets={false}
                segments={[
                  { text: 'working with ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' since before chatgpt' },
                  { text: ',' },
                  { text: ' and teaching and training for over ' },
                  { text: '20 YEARS', color: 'text-orange' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* DARK CTA — sits directly under the portrait. */}
        <section className="pt-8 pb-8 md:pt-10 md:pb-10">
          <div>
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow={
                <>
                  let<span className="text-purple">&apos;</span>s chat
                </>
              }
              title="book an intro call"
              href="/contact"
              markerStyle="contained"
            />
          </div>
        </section>

        {/* LEAD BEAT — wide centered PaperApp. Strategic anchor: 8 years
            ESL in Prague, the buying mental model HR already has. */}
        <section className="pt-8 pb-8 md:pt-10 md:pb-10">
          <PaperApp width="wide">
            <div className="space-y-5 md:space-y-6 py-2">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                8 years teaching English to Czechs
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                Modern ai is literally built on a principle called natural
                <br />
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-orange/55"
                  />
                  <span className="relative text-ink">language processing</span>
                </span>
                .
              </p>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                And I&apos;m sure you&apos;ve experienced the difference between just a native speaker and a certified
                <br />
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-orange/55"
                  />
                  <span className="relative text-ink">language instructor</span>
                </span>
                .
              </p>
            </div>
          </PaperApp>
        </section>

        {/* QUESTIONS-PATH TILE — purple IDE SectionTile -> /faq for
            the cautious reader who wants service details before
            booking. Sits between the credibility paper-app and the
            pullquote, catching the natural "ok, how does this work?"
            reader question after the credibility beat. */}
        <section className="pt-8 pb-8 md:pt-10 md:pb-10">
          <div>
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="have questions?"
              title="learn how this works"
              href="/faq"
              markerStyle="contained"
            />
          </div>
        </section>

        {/* THE BIG PULLQUOTE — the locked anchor line at hero scale,
            full canvas, generous breathing room. IDE substrate keeps
            the editorial pullquote in the page's authoritative voice;
            comma + period in purple per the homepage punctuation
            convention. Left-aligned with hangingPrompt so the `[ > `
            prefix hangs in the outer gutter, matching the homepage
            hero treatment. */}
        <section className="py-8 md:py-10">
          <div className="relative">
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
                fontSize: '22px',
                marginLeft: '-3ch',
                paddingLeft: '3ch',
                textIndent: '-3ch',
              }}
            >
              {">  learning new things can be a little scary but i've found a fun and HUMAN approach that helps"}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                fontSize="22px"
                align="left"
                hangingPrompt
                showBrackets={false}
                persistCursor
                segments={[
                  { text: 'learning new things can be a little ' },
                  { text: 'scary', color: 'text-green' },
                  { text: " but i've found a fun and " },
                  { text: 'HUMAN', color: 'text-orange' },
                  { text: ' approach that helps' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* CLOSING BEAT — demo-lesson invitation in a paper-app, with
            an orange App-variant SectionTile nested inside (matches
            the homepage TrialCTASection pattern). */}
        <section className="pt-8 pb-16 md:pt-10 md:pb-20">
          <PaperApp width="wide">
            <div className="space-y-5 md:space-y-6 py-2">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                See my teaching style in action
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                Sign up for a{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                  />
                  <span className="relative text-ink">free demo</span>
                </span>{' '}
                lesson with me, either 1:1 or join in on an existing group.
              </p>
              <div className="pt-6 md:pt-8">
                <SectionTile
                  variant="app"
                  accent="orange"
                  eyebrow="next step"
                  title="book demo lesson"
                  href="/contact"
                  markerStyle="contained"
                />
              </div>
            </div>
          </PaperApp>
        </section>
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'about your instructor — alderman.ai',
}
