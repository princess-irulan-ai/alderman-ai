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
            edge — matches the hero lines above. */}
        <section className="grid grid-cols-canvas gap-6 py-8 md:py-12">
          <div className="col-span-3">
            <TerminalLine
              hangingPrompt
              showBrackets={false}
              align="left"
              segments={[
                { text: 'look, i get it, ' },
                { text: 'PEOPLE', color: 'text-orange' },
                { text: ' are scared and they don’t want to learn ' },
                { text: 'ai', color: 'text-green' },
                { text: ', but i have a plan.' },
              ]}
            />
          </div>
        </section>
        <TrialCTASection />
      </PageFrame>
      <Footer />
    </>
  )
}
