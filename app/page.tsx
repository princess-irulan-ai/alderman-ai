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
        {/* H2.5 — terminal-line seam between the WhatYouGet onboarding
            triptych and the demo-lesson IDE CTA below. Sits on the dark
            IDE substrate. Uses hangingPrompt + showBrackets={false} so
            the `>` hangs in the outer gutter and the typed text aligns
            to the canvas left edge — matches the hero lines above.

            Wrapped in a CSS grid alongside an invisible ghost copy of
            the fully-typed line, both pinned to col-start-1 row-start-1
            so the cell height tracks the ghost. Same pattern hero line
            1 uses — locks the line's height from the first paint so the
            CTA tile below doesn't shift downward as the line types out. */}
        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
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
        {/* IDE-purple SectionTile — "see a demo lesson" CTA. Sits on
            the dark IDE substrate after the H2.5 terminal seam and
            before the credentials paper-app. Clicks through to /faq
            (FAQ + pricing). */}
        <section className="pt-12 pb-8 md:pt-16 md:pb-10">
          <SectionTile
            variant="ide"
            accent="purple"
            eyebrow="ai fluency"
            title="have questions?"
            href="/faq"
            markerStyle="contained"
          />
        </section>
        <TrialCTASection />
        {/* Circular portrait — between the credentials paper-app (with
            its BL post-it overhang) and the final "book a full demo"
            IDE CTA. Centered on the dark IDE substrate. The
            `mt-[184px] md:mt-8` clears the post-it overhang on mobile
            (~152px overhang + canonical 32px gap).

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
        {/* Relocated hero terminal line (was line 1 of HeroTerminalBlock).
            Sits between the still-HUMAN circular portrait and the final
            CTA — the "take a HUMAN approach" beat now lands as the closing
            argument before the booking ask. Same hangingPrompt + ghost-copy
            height-reservation pattern as the H2.5 seam above. */}
        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
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

        {/* Final IDE-purple SectionTile — "book a full demo" CTA. Last
            element on the home page, replaces the old "enabling ai
            value with human values" tagline + the two flashing-bracket
            TerminalCTAs that previously closed the page. Eyebrow is a
            placeholder ("next step") — Alex to drop final copy.
            Provisional href: /contact. */}
        <section className="pt-8 pb-16 md:pt-12 md:pb-20">
          <SectionTile
            variant="ide"
            accent="purple"
            eyebrow="next step"
            title="book a demo lesson"
            href="/contact"
            markerStyle="contained"
          />
        </section>
      </PageFrame>
      <Footer />
    </>
  )
}
