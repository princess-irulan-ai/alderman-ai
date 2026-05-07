import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about/master — CONTROL / BENCHMARK variant.
 *
 * Mirrors the homepage's exact element order with /about copy slotted
 * into each slot. Not a "good" variant — a floor. Anything else
 * produced for /about needs to be at least this coherent.
 *
 * Element order (parallel to alderman-ai/app/page.tsx):
 *   1. FloatingNav
 *   2. PageFrame
 *   3. 120px top spacer
 *   4. HERO ZONE — H1 (3 lines, brand caps for HUMAN/ai), then a
 *      hero-scale TerminalLine carrying the anchor line on the IDE
 *      substrate, with the headshot PaperApp on the right (no Postit
 *      animation — keeps the master simple; the right column is just
 *      the locked headshot).
 *   5. WHAT YOU GET style — wide centered PaperApp with H2 + subtitle +
 *      lead beat content.
 *   6. TerminalLine seam (H2.5 — comma-purple convention applied).
 *   7. IDE SectionTile → /faq (mirroring homepage's "learn about ai
 *      lessons" tile).
 *   8. TRIAL CTA style — credentials paper-app with H2 + subtitle +
 *      App-variant SectionTile inside (mirrors TrialCTASection without
 *      the BL post-it overhang to keep the master simple).
 *   9. Final IDE SectionTile → /contact (mirrors homepage's "book a
 *      demo lesson" closer).
 *  10. Footer
 *
 * Uses distilled copy throughout — short, sentence-level, no paragraph
 * drafts. PaperApp chrome strings are LEFT EMPTY per the homepage
 * convention (no fake filenames). Paper-app body text uses sentence/
 * Title Case (not lowercase). Brand colors only on locked words
 * (HUMAN, ai) and on terminal-line punctuation (commas, periods).
 */
export default function AboutMasterPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />

        {/* HERO ZONE — mirrors HeroSection's grid + element order:
            H1 spanning the canvas, then a 2-col arrangement (terminal
            block left, paper-app right). Skips the Postit rise-and-slap
            for master simplicity (homepage uses it; master doesn't have
            to). */}
        <section className="flex flex-col gap-6 pt-4 pb-8 relative md:grid md:grid-cols-canvas md:gap-6 md:pt-8 md:items-stretch">
          <h1 className="font-display text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display-tight text-center text-ide-fg mb-5 md:col-span-3 md:mb-4">
            Your team needs
            <br />
            a <span className="text-orange">HUMAN</span> teacher
            <br />
            for <span className="text-green">ai</span>
          </h1>

          {/* Left col: hero-scale TerminalLine carrying the locked
              anchor line. Comma + period in purple per the homepage
              convention (connective punctuation as purple segments).
              Anchor line is locked verbatim. */}
          <div className="md:col-span-2 md:flex md:flex-col md:pr-6">
            <TerminalLine
              fontSize={28}
              align="left"
              persistCursor
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

          {/* Right col: headshot PaperApp. Locked from canonical /about.
              No chrome strings (homepage convention). */}
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

        {/* "WHAT YOU GET" style — wide centered PaperApp with H2 +
            subtitle + lead beat. Mirrors WhatYouGetSection's
            md:w-2/3 md:justify-self-center treatment. */}
        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-10 pb-16 md:py-16">
          <PaperApp width="wide" className="md:w-2/3 md:justify-self-center">
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

        {/* H2.5 seam — terminal line on IDE substrate. Comma-purple
            convention. Hangs the prefix into the gutter and aligns
            typed text to the canvas left, like the homepage. */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="col-span-3">
            <TerminalLine
              hangingPrompt
              showBrackets={false}
              align="left"
              persistCursor
              segments={[
                { text: 'almost the whole career has been teaching' },
                { text: ',', color: 'text-purple' },
                { text: ' in one form or another' },
              ]}
            />
          </div>
        </section>

        {/* IDE-purple SectionTile (mirrors homepage's mid-page tile to
            /faq). Surfaces a parallel path: "want details on the
            lessons before booking?" */}
        <section className="grid grid-cols-canvas gap-6 pt-12 pb-8 md:pt-16 md:pb-10">
          <div className="col-span-3 md:col-start-2 md:col-span-1">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="ai fluency"
              title="learn about ai lessons"
              href="/faq"
              markerStyle="contained"
            />
          </div>
        </section>

        {/* "TRIAL CTA" style — credentials paper-app with H2 + subtitle +
            App-variant SectionTile inside. Mirrors TrialCTASection's
            structure (less the BL post-it overhang, kept simple here). */}
        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-12 pb-16 md:pt-16 md:pb-16 scroll-mt-24">
          <div className="md:col-span-3">
            <PaperApp width="wide">
              <div className="space-y-4 md:space-y-5 py-2">
                <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                  Before Prague: marketing, freelance, military
                </h2>
                <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                  A decade training juniors on the door-opening software of the moment.
                  Before that, US military — signals intelligence and a Korean linguist.
                </p>
                <div className="mx-auto max-w-[420px] pt-4 md:pt-6">
                  <SectionTile
                    variant="app"
                    accent="orange"
                    eyebrow="see if it lands"
                    title="Book a demo lesson"
                    href="/contact"
                    markerStyle="contained"
                  />
                </div>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* Final IDE-purple SectionTile — closer (mirrors homepage's
            "book a demo lesson" final CTA). */}
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
