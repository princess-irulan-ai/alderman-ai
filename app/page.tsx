import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrialCTASection } from '@/components/sections/TrialCTASection'
import { WhatYouGetSection } from '@/components/sections/WhatYouGetSection'
import { TerminalLine } from '@/components/special/TerminalLine'

export default function HomePage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />
        <HeroSection />
        <WhatYouGetSection />
        {/* H2.5 — terminal-line seam between H2 and the TrialCTA paper-app.
            Sits on the dark IDE substrate, leads into "the plan." Uses
            hangingPrompt + showBrackets={false} so the `>` hangs in the
            outer gutter and the typed text aligns to the canvas left
            edge — matches the hero lines above.

            Wrapped in a CSS grid alongside an invisible ghost copy of
            the fully-typed line, both pinned to col-start-1 row-start-1
            so the cell height tracks the ghost. Same pattern hero line
            1 uses — locks the line's height from the first paint so the
            TrialCTA paper-app below doesn't shift downward as the line
            types out. */}
        <section className="grid grid-cols-canvas gap-6 py-8 md:py-12">
          <div className="col-span-3 grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 24 }}
            >
              <span>
                <span className="select-none">&gt;</span>
                {'  i get it, PEOPLE are scared and they don’t want to learn ai, but i’m the perfect INSTRUCTOR to teach them '}
                <span className="inline-block">_</span>
              </span>
            </div>
            <div className="col-start-1 row-start-1">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                align="left"
                persistCursor
                startDelayMs={1620}
                segments={[
                  { text: 'i get it' },
                  { text: ',', color: 'text-purple' },
                  { text: ' ' },
                  { text: 'PEOPLE', color: 'text-orange' },
                  { text: ' are scared and they don' },
                  { text: '’', color: 'text-purple' },
                  { text: 't want to learn ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ',', color: 'text-purple' },
                  { text: ' but i' },
                  { text: '’', color: 'text-purple' },
                  { text: 'm the perfect ' },
                  { text: 'INSTRUCTOR', color: 'text-orange' },
                  { text: ' to teach them' },
                ]}
              />
            </div>
          </div>
        </section>
        <TrialCTASection />
      </PageFrame>
      <Footer />
    </>
  )
}
