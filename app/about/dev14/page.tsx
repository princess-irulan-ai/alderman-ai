import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about/dev14 — variant 2 of round 3.
 *
 * Angle: EDITORIAL PULLQUOTE MID-PAGE.
 *
 * The locked anchor line ("20 years at the intersection of technology,
 * education, and psychology.") gets pulled OUT of the hero and treated
 * as a hero-scale pullquote in the middle of the page — the visual peak,
 * borrowed from magazine layouts where a pullquote interrupts the body.
 *
 * Page rhythm:
 *   1. Hero — H1 (3 lines) + headshot PaperApp. No anchor here.
 *   2. Lead beat — wide centered PaperApp ("Eight years teaching
 *      English in Prague" + 3-clause subtitle + bridge sentence).
 *   3. THE PULLQUOTE — full-canvas centered hero-scale TerminalLine on
 *      IDE substrate, generous py-16 md:py-24 breathing room. Comma +
 *      period in purple per the homepage convention.
 *   4. After-pullquote beat — wide centered PaperApp ("Before Prague:
 *      marketing, freelance, military" + two-sentence subtitle).
 *   5. Closing IDE SectionTile -> /contact.
 *
 * Surface cadence: paper -> IDE peak -> paper -> IDE closer. The
 * pullquote is the page's argument standing alone in the middle.
 */
export default function AboutDev14Page() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />

        {/* HERO ZONE — H1 + headshot PaperApp. The anchor line is held
            back for the mid-page pullquote moment. Smaller H1 size than
            the master so the hero feels lighter and the pullquote can
            be the visual peak below. */}
        <section className="flex flex-col gap-8 pt-4 pb-8 md:grid md:grid-cols-canvas md:gap-6 md:pt-8 md:items-center">
          <div className="md:col-span-2 md:pr-4">
            <h1 className="font-display text-[36px] md:text-[48px] font-bold leading-[1.05] tracking-display-tight text-ide-fg text-center md:text-left">
              Your team needs
              <br />
              a <span className="text-orange">HUMAN</span> teacher
              <br />
              for <span className="text-green">ai</span>
            </h1>
          </div>

          {/* Headshot PaperApp. Empty chrome strings per convention. */}
          <div className="relative md:block">
            <PaperApp width="narrow" bodyClassName="">
              <Image
                src="/brand-assets/photography/alex-headshot-full-v1.jpg"
                alt="Alex Alderman"
                width={1200}
                height={1823}
                className="block h-auto w-full"
                priority
              />
            </PaperApp>
          </div>
        </section>

        {/* LEAD BEAT — wide centered PaperApp. Strategic anchor: 8 years
            ESL in Prague, the buying mental model HR already has. */}
        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-12 pb-8 md:pt-16 md:pb-10">
          <PaperApp width="wide" className="md:col-span-3 md:w-2/3 md:justify-self-center">
            <div className="space-y-6 md:space-y-8 py-2">
              <div className="space-y-4 md:space-y-5">
                <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                  Eight years teaching English in Prague
                </h2>
                <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                  Same scaffolded immersion. Same workplace context. Same business model.
                </p>
              </div>
              <p className="font-body text-[17px] md:text-[18px] leading-relaxed text-ink max-w-prose mx-auto text-center">
                If your HR team has ever booked English lessons for staff, you already
                have a mental model for what these AI fluency lessons look like.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* THE BIG PULLQUOTE — the locked anchor line at hero scale,
            full canvas, generous breathing room. IDE substrate keeps
            the editorial pullquote in the page's authoritative voice;
            comma + period in purple per the homepage punctuation
            convention. This is the page's visual peak. */}
        <section className="grid grid-cols-canvas gap-6 py-16 md:py-24">
          <div className="col-span-3 flex justify-center">
            <TerminalLine
              fontSize="clamp(26px, 6vw, 44px)"
              align="center"
              persistCursor
              startDelayMs={1620}
              segments={[
                { text: '20 years at the intersection of technology' },
                { text: ',', color: 'text-purple' },
                { text: ' education' },
                { text: ',', color: 'text-purple' },
                { text: ' and psychology' },
                { text: '.', color: 'text-purple' },
              ]}
            />
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
                Before Prague: marketing, freelance, military
              </h2>
              <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                A decade training juniors on the door-opening software of the moment.
                Before that, US military &mdash; signals intelligence and a Korean linguist.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* CLOSING CTA — IDE SectionTile -> /contact. */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="col-span-3 md:col-start-2 md:col-span-1">
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
