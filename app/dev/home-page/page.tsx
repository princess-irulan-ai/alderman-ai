import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrialCTASection } from '@/components/sections/TrialCTASection'
import { WhatYouGetSection } from '@/components/sections/WhatYouGetSection'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /dev/home-page — desktop-expansion experiment for the homepage.
 *
 * Created 2026-05-07 to isolate the in-progress desktop layout work
 * from the live `/` route. While `/` reverts to the mobile-locked
 * column at every viewport, this dev page opts into PageFrame's
 * `desktopExpanded` so descendants pick up the `.desktop-expanded`
 * scope and apply tablet+ widening.
 *
 * Shared section components (HeroSection, WhatYouGet, TrialCTA) gate
 * their tablet: classes on the `.desktop-expanded` ancestor scope, so
 * they only widen here. FloatingNav matches the route via
 * `pathname === '/dev/home-page'`.
 */
export default function DevHomePage() {
  return (
    <>
      <FloatingNav />
      <PageFrame desktopExpanded>
        <div className="h-[120px] tablet:h-[244px]" aria-hidden />
        <HeroSection inlineTerminal />
        <WhatYouGetSection />
        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="grid tablet:max-w-[407px] tablet:ml-[15px]">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 'var(--font-terminal)' }}
            >
              <span>
                <span className="select-none">&gt;</span>
                {'  fluency lessons are hands on usage of ai with a HUMAN guiding the process '}
                <span className="inline-block">_</span>
              </span>
            </div>
            <div className="col-start-1 row-start-1">
              <TerminalLine
                hangingPrompt
                leadingSpaces={2}
                showBrackets={false}
                align="left"
                persistCursor
                segments={[
                  { text: 'fluency lessons are hands on usage of ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' with a ' },
                  { text: 'HUMAN', color: 'text-orange' },
                  { text: ' guiding the process' },
                ]}
              />
            </div>
          </div>
        </section>
        <section className="pt-12 pb-8 md:pt-16 md:pb-10">
          <div className="tablet:max-w-[304px] tablet:mx-auto">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="ai fluency"
              title="have questions?"
              href="/faq"
              markerStyle="contained"
            />
          </div>
        </section>
        <TrialCTASection />
        <section className="flex justify-center mt-[36px] md:mt-8">
          <div className="relative aspect-square w-full max-w-[360px]">
            <Image
              src="/brand-assets/photography/still-human-circle-portrait.svg"
              alt="Alex Alderman — still HUMAN"
              width={300}
              height={300}
              className="block h-full w-full"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[49%] h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ide-fg-mute"
              style={{
                boxShadow: [
                  '1px 1px 0 0 rgba(117, 113, 94, 0.40)',
                  '6px 10px 32px rgba(253, 151, 31, 0.28)',
                  '28px 38px 80px rgba(0, 0, 0, 0.50)',
                ].join(', '),
              }}
            />
          </div>
        </section>
        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="grid tablet:max-w-[407px] tablet:ml-[15px]">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 'var(--font-terminal)' }}
            >
              <span>
                <span className="select-none">&gt;</span>
                {'  take a HUMAN approach to ai adoption and make sure no one is left behind '}
                <span className="inline-block">_</span>
              </span>
            </div>
            <div className="col-start-1 row-start-1">
              <TerminalLine
                hangingPrompt
                leadingSpaces={2}
                showBrackets={false}
                align="left"
                persistCursor
                segments={[
                  { text: 'take a ' },
                  { text: 'HUMAN', color: 'text-orange' },
                  { text: ' approach to ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' adoption and make sure no one is left behind' },
                ]}
              />
            </div>
          </div>
        </section>
        <section className="pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="tablet:max-w-[304px] tablet:mx-auto">
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
