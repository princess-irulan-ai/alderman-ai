import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrialCTASection } from '@/components/sections/TrialCTASection'
import { WhatYouGetSection } from '@/components/sections/WhatYouGetSection'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

export default function HomePage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />
        <HeroSection />
        <WhatYouGetSection />
        {/* IDE-purple SectionTile sitting on the dark substrate after
            WhatYouGetSection's paper-app. First live use of the new
            tile primitive. Walking-cursor marker carries a soft purple
            drop-shadow glow per Alex's "kind of purple glow / hovering"
            spec. Clicks through to /faq (FAQ + pricing). */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-2 md:pt-12 md:pb-3">
          <div className="col-span-3 md:col-start-2 md:col-span-1">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="ai fluency"
              title="see a demo lesson"
              href="/faq"
            />
          </div>
        </section>
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
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-2 md:pt-12 md:pb-3">
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
        {/* Circular portrait — between the H2.5 seam and the credentials
            paper-app. Centered on the dark IDE substrate.

            The SVG draws a charcoal "frame" ring around the photo at 74%
            of its bbox width (measured: dark frame outer edge spans 36-244
            in a 281px rendered image; photo edge spans 56-223; frame
            thickness ~20px each side). Center is at ~50% x / 49% y — the
            "still HUMAN" arc occupies a sliver below the circle, nudging
            the frame center slightly above absolute middle.

            Border + paper-app shadow stack (muted ledge + orange glow +
            dark grounding) sit on an inner overlay sized to that 74%
            ring — replaces the soft frame-to-substrate transition with a
            hard 2px line, and casts the shadow from the visible circle's
            edge instead of from the SVG bbox. `aspect-square` keeps the
            wrapper square so the same proportions hold at both mobile
            (~281px constrained by gutter) and desktop (440px). */}
        <section className="flex justify-center">
          <div className="relative aspect-square w-full max-w-[360px] md:max-w-[440px]">
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
                // One-off shadow for this portrait — DECOUPLED from
                // `shadow-paper-glow`. Tuned independently per Alex
                // (2026-04-27): the muted "card thickness" ledge is dialled
                // way down (1px / 0.40 vs paper-glow's 3px / 0.80) to keep
                // the 3D feel minor. Visually similar to paper-glow today,
                // but changes here MUST NOT propagate to paper-apps and
                // vice-versa — a tweak to one should never silently move
                // the other. If paper-glow drifts, leave this alone.
                boxShadow: [
                  '1px 1px 0 0 rgba(117, 113, 94, 0.40)',
                  '6px 10px 32px rgba(253, 151, 31, 0.28)',
                  '28px 38px 80px rgba(0, 0, 0, 0.50)',
                ].join(', '),
              }}
            />
          </div>
        </section>
        <TrialCTASection />
      </PageFrame>
      <Footer />
    </>
  )
}
