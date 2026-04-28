import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { Postit } from '@/components/special/Postit'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about/dev13 — round 3 variant 1: POSTIT-ANCHORED HERO + POLISHED BODY.
 *
 * dev10's Postit-on-headshot hero kept almost as-is. Body tightened:
 * dev10's two stacked TerminalLine seams (before-Prague beats on
 * IDE substrate) replaced with ONE trial-CTA-style paper-app that
 * consolidates the before-Prague beats + folded closer + inner App
 * tile to /contact. Mid IDE tile to /faq cut for cleanliness.
 *
 * Shape: hero → lead beat (wide centered paper-app) → single
 * TerminalLine seam → trial-CTA paper-app → closing IDE tile.
 */
export default function AboutDev13Page() {
  const postitHeading = (
    <span
      className="font-display font-normal block"
      style={{ fontSize: '26px', lineHeight: 1.1 }}
    >
      <span className="font-bold whitespace-nowrap">Certified ESL</span>
      <br />
      <span className="font-bold whitespace-nowrap">teacher</span>
      <br />
      <span className="whitespace-nowrap">8 years in</span>
      <br />
      <span className="whitespace-nowrap">Prague</span>
    </span>
  )

  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />

        {/* HERO ZONE — H1 across canvas, then 2-col split with the
            anchor TerminalLine left and the headshot+Postit composite
            right. Bottom padding reserves room for the Postit's BR
            overhang. Geometry replicated from dev10. */}
        <section className="flex flex-col gap-6 pt-4 pb-32 relative md:grid md:grid-cols-canvas md:gap-6 md:pt-8 md:pb-24 md:items-stretch">
          <h1 className="font-display text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display-tight text-center text-ide-fg mb-5 md:col-span-3 md:mb-4">
            Your team needs
            <br />
            a <span className="text-orange">HUMAN</span> teacher
            <br />
            for <span className="text-green">ai</span>
          </h1>

          {/* Anchor line — locked verbatim, comma + period purple. */}
          <div className="md:col-span-2 md:flex md:flex-col md:justify-center md:pr-6">
            <TerminalLine
              fontSize={28}
              align="left"
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

          {/* Headshot PaperApp + Postit BR overhang. Static (no
              rise-and-slap — that's hero-only orchestration on the
              homepage). Mobile uses scale-to-viewport math
              (50vw / 320px) mirroring the homepage hero's mobile
              Postit treatment so the rotated tip stays inside the
              gutter. Desktop renders at natural 240px. */}
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
            <div
              className="md:hidden absolute left-[58%] top-[68%] pointer-events-none origin-top-left"
              style={{ transform: 'scale(calc(50vw / 320px))' }}
            >
              <Postit rotation={-5} heading={postitHeading} />
            </div>
            <div className="hidden md:block absolute left-[55%] top-[62%] pointer-events-none origin-top-left">
              <Postit rotation={-5} heading={postitHeading} />
            </div>
          </div>
        </section>

        {/* LEAD BEAT — wide centered paper-app, master-style. The
            Postit already delivered the Prague credential aside in
            the hero; this slab carries the HR mental-model bridge
            argument. */}
        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-10 pb-12 md:py-16">
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

        {/* SINGLE TerminalLine seam — the through-line bridge.
            Comma-purple convention; hangs the prefix into the gutter
            so typed text aligns to the canvas left, like the homepage. */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="col-span-3">
            <TerminalLine
              hangingPrompt
              showBrackets={false}
              align="left"
              persistCursor
              startDelayMs={1620}
              segments={[
                { text: 'almost the whole career has been teaching' },
                { text: ',', color: 'text-purple' },
                { text: ' in one form or another' },
                { text: '.', color: 'text-purple' },
              ]}
            />
          </div>
        </section>

        {/* TRIAL-CTA-style consolidated paper-app — H2 "Before Prague"
            + subtitle stack covering beats 2+3, then the folded
            "Two more things" closer (beats 4+5), then the inner
            orange App SectionTile to /contact. Replaces dev10's two
            stacked TerminalLine seams with a single polished slab. */}
        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-12 pb-12 md:pt-16 md:pb-16">
          <div className="md:col-span-3">
            <PaperApp width="wide">
              <div className="space-y-6 md:space-y-8 py-2">
                <div className="space-y-4 md:space-y-5">
                  <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                    Before Prague: marketing, freelance, military
                  </h2>
                  <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                    A decade training juniors on the door-opening software of the moment.
                    Before that, US military — signals intelligence and a Korean linguist.
                  </p>
                </div>
                <div className="border-t border-ink-faint/40 pt-6 md:pt-7 space-y-3 md:space-y-4">
                  <h3 className="font-display text-[20px] md:text-[24px] font-bold leading-[1.15] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                    Two more things worth knowing
                  </h3>
                  <p className="font-body text-[17px] md:text-[18px] leading-relaxed text-ink max-w-prose mx-auto text-center">
                    My formal education is in psychology. Ten years in the Czech Republic,
                    married a Czech, two bilingual kids, still working on my own Czech —
                    strong B1 on a good day.
                  </p>
                </div>
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

        {/* CLOSING IDE SectionTile → /contact. */}
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
