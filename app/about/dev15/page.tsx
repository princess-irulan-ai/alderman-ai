import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about/dev15 — VARIANT 3: SINGLE-PAPER-APP HERO. Inverted register.
 *
 * The hero is ONE wide PaperApp containing the H1 (in App register,
 * text-ink), the headshot, and the anchor line as a font-display
 * <blockquote> below. The whole opening is a single App-register moment
 * — a register-flip from the homepage (which is IDE-substrate-hero,
 * paper-apps below).
 *
 * After the hero, the body lives on the IDE substrate: TerminalLine
 * seams carrying the through-line, plus a single small consolidation
 * paper-app for the "before Prague" beats. Closing IDE SectionTile to
 * /contact.
 *
 * H1 inside the paper-app keeps the locked HUMAN-orange + ai-green word
 * colors per the brand chord. Anchor line stays verbatim. Comma + period
 * in TerminalLines render purple per the homepage convention.
 */
export default function AboutDev15Page() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />

        {/* HERO — ONE wide PaperApp. H1 + headshot + anchor blockquote
            all live INSIDE the paper. Inverted register: App-dominant
            opening, not the homepage's IDE-substrate-hero shape. */}
        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-4 pb-10 md:pt-8 md:pb-16">
          <PaperApp width="wide">
            <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-10 md:items-center">
              {/* Left half (mobile: top): H1 in App register — text-ink
                  on cream. Locked HUMAN orange + ai green still apply. */}
              <h1 className="font-display text-[40px] md:text-[52px] font-bold leading-[1.05] tracking-display-tight text-ink">
                Your team needs
                <br />
                a <span className="text-orange">HUMAN</span> teacher
                <br />
                for <span className="text-green">ai</span>
              </h1>

              {/* Right half (mobile: below H1): the locked headshot,
                  block image, full bleed in its own column. Sits inside
                  the same PaperApp body. */}
              <div className="overflow-hidden rounded-sm">
                <Image
                  src="/brand-assets/photography/alex-headshot-full-v1.jpg"
                  alt="Alex Alderman"
                  width={1200}
                  height={1823}
                  className="block h-auto w-full"
                  priority
                />
              </div>
            </div>

            {/* Anchor line — editorial blockquote in App register, paired
                with the H1+headshot above inside the same paper. Locked
                phrasing, verbatim. Uses font-display for editorial feel
                since we're still inside the App-register paper. */}
            <blockquote className="mt-10 md:mt-12 border-l-2 border-orange/60 pl-5 md:pl-6 max-w-prose">
              <p className="font-display text-[22px] md:text-[28px] font-normal leading-snug text-ink-soft tracking-display-tight">
                20 years at the intersection of technology, education, and
                psychology.
              </p>
            </blockquote>
          </PaperApp>
        </section>

        {/* BODY — IDE substrate dominant. First seam: through-line #1
            (almost the whole career has been teaching). Comma-purple
            convention applied. */}
        <section className="grid grid-cols-canvas gap-6 pt-6 pb-8 md:pt-10 md:pb-10">
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
              ]}
            />
          </div>
        </section>

        {/* Single small consolidation paper-app — credentials
            punctuation. Lead beat (Prague) + before-Prague beats folded
            into ONE paper-app to keep the body IDE-dominant. App-register
            text inside: sentence case, text-ink, font-display heading,
            font-body prose. No eyebrow inside. */}
        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-6 pb-10 md:pt-8 md:pb-12">
          <div className="md:col-start-2 md:col-span-2">
            <PaperApp width="wide">
              <div className="space-y-5 md:space-y-6 py-1">
                <h2 className="font-display text-[26px] md:text-[32px] font-bold leading-[1.1] text-ink tracking-display-tight">
                  Eight years teaching English in Prague
                </h2>
                <p className="font-display text-[17px] md:text-[20px] font-normal leading-snug text-ink-soft max-w-prose">
                  Same scaffolded immersion. Same workplace context. Same
                  business model.
                </p>
                <p className="font-body text-[16px] md:text-[17px] leading-relaxed text-ink max-w-prose">
                  If your HR team has ever booked English lessons for staff,
                  you already have a mental model for what these AI fluency
                  lessons look like.
                </p>
                <p className="font-body text-[15px] md:text-[16px] leading-relaxed text-ink-soft max-w-prose pt-2 border-t border-ink-faint/30">
                  Before Prague: a decade training juniors on the door-opening
                  software of the moment. Before that, US military &mdash;
                  signals intelligence and a Korean linguist.
                </p>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* Second IDE seam — through-line #2 (golden age of software,
            freelance edge). Keeps the body IDE-dominant. */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-10 md:pt-10 md:pb-12">
          <div className="col-span-3">
            <TerminalLine
              hangingPrompt
              showBrackets={false}
              align="left"
              persistCursor
              startDelayMs={1620}
              segments={[
                { text: 'freelancer years' },
                { text: ',', color: 'text-purple' },
                { text: ' time and incentive to teach the new software' },
                { text: '.', color: 'text-purple' },
              ]}
            />
          </div>
        </section>

        {/* Closing IDE SectionTile to /contact — purple accent, mirrors
            the homepage's final-CTA pattern. */}
        <section className="grid grid-cols-canvas gap-6 pt-10 pb-16 md:pt-14 md:pb-20">
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
