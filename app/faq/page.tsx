import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { Postit } from '@/components/special/Postit'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

export default function FaqPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />
        <section className="pt-4 pb-8 md:pt-8 md:pb-10">
          <h1 className="font-display text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display-tight text-center text-ide-fg">
            have a <span className="text-orange">HUMAN</span>
            <br />
            <span className="text-purple">(</span>or <span className="text-green">ai</span>
            <span className="text-purple">)</span> answer
            <br className="md:hidden" />{' '}
            your questions
          </h1>
        </section>

        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-8 pb-12 md:pt-10 md:pb-16">
          <PaperApp width="wide" className="md:col-span-3 md:w-2/3 md:justify-self-center">
            <div className="space-y-4 md:space-y-5 py-2">
              <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                We believe in simple pricing
              </h2>
              <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                We sell packages of monthly teaching hours that can be divided
                to as many groups as you wish.
              </p>
              <p className="font-body text-[15px] md:text-[16px] font-bold leading-snug text-orange max-w-[780px] mx-auto text-center">
                <span className="text-purple">(</span>Max <span className="text-purple">6</span> people per group<span className="text-purple">)</span>
              </p>
              <table className="mx-auto !mt-8 md:!mt-10 border-collapse border-2 border-purple font-display text-[16px] md:text-[18px] text-ink">
                <thead>
                  <tr>
                    <th className="border-2 border-purple px-4 py-2 font-bold text-left">Hours</th>
                    <th className="border-2 border-purple px-4 py-2 font-bold text-left">Price (each)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-purple px-4 py-2">4</td>
                    <td className="border-2 border-purple px-4 py-2">5000 Kč</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-purple px-4 py-2">8</td>
                    <td className="border-2 border-purple px-4 py-2">4500 Kč</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-purple px-4 py-2">16+</td>
                    <td className="border-2 border-purple px-4 py-2">4000 Kč</td>
                  </tr>
                </tbody>
              </table>
              <p className="font-body text-[15px] md:text-[16px] !mt-8 md:!mt-10 font-bold leading-snug text-orange max-w-[780px] mx-auto text-center">
                <span className="text-purple">(</span>Teaching hour <span className="text-purple">=</span> 50m<span className="text-purple">)</span>
              </p>
              <SectionTile
                variant="app"
                accent="orange"
                eyebrow="Have questions?"
                eyebrowStyle="em-dash"
                title="Book a demo call"
                href="/contact"
                markerStyle="contained"
                className="!mt-16 md:!mt-20 max-w-[280px] mx-auto"
              />
            </div>
          </PaperApp>
        </section>

        <section className="grid grid-cols-canvas gap-6 pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="col-span-3 relative">
            {/* Invisible mirror — reserves the final rendered height of
                the terminal line so the next paper-app holds its
                position while the line types out. Mirrors the
                showBrackets={false} 3ch hang (1ch prompt + 2 NBSP
                leadingSpaces). */}
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
              {'>  feel free to ask ai any of YOUR questions about our business'}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                align="left"
                persistCursor
                startDelayMs={1620}
                segments={[
                  { text: 'feel free to ask ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' any of ' },
                  { text: 'YOUR', color: 'text-orange' },
                  { text: ' questions about our business' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-12 pb-[138px] md:pt-14 md:pb-[170px]">
          <div className="relative md:col-span-3 md:w-2/3 md:justify-self-center">
            <PaperApp width="wide">
              <div className="space-y-4 md:space-y-5 py-2">
                <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                  Download the <span className="text-purple">FAQ</span> file below
                </h2>
                <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                  Then upload it to your favorite ai platform <span className="text-purple">(</span>ChatGPT, Claude,
                  etc<span className="text-purple">)</span>. You can then ask it anything you want to know about us.
                </p>
                {/* Spacer reserves vertical room for the absolutely-
                    positioned Post-it that overhangs the BR corner —
                    same pattern as the homepage perks paper-app. */}
                <div className="h-[30px]" aria-hidden />
              </div>
            </PaperApp>
            {/* Post-it overlay.
                Mobile: `top-[X]` positions the top-left corner inside
                the spacer area; `scale(calc(50vw / 250px))` makes the
                rotated BR tip land exactly at viewport-right.
                Desktop: the 50vw scale formula assumed the paper-app
                fills the canvas (mobile). At md+ the paper-app is only
                2/3 of canvas centered, so 50vw scales the post-it to
                ~2.5× and overruns adjacent sections. On desktop we
                drop the scale (native 240×240) and anchor at the
                paper-app's BR corner with a small overhang.
                Rotation -5° is canonical Postit tilt and lives on the
                primitive itself. */}
            <div
              className="absolute left-1/2 top-[300px] md:left-auto md:top-auto md:right-0 md:bottom-[-160px] pointer-events-none origin-top-left md:!transform-none"
              style={{ transform: 'scale(calc(50vw / 250px))' }}
            >
              <Postit
                rotation={-5}
                heading={
                  <span
                    className="block font-display font-normal"
                    style={{ width: '200px', fontSize: '30px', lineHeight: 1.1 }}
                  >
                    <span className="whitespace-nowrap">upload the</span>
                    <br />
                    <span className="font-bold whitespace-nowrap">faq.md file</span>
                    <br />
                    <span className="whitespace-nowrap">
                      using the{' '}
                      <span className="relative inline-block">
                        <span
                          aria-hidden
                          className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                        />
                        <span className="relative">( + )</span>
                      </span>
                    </span>
                    <br />
                    <span className="whitespace-nowrap">icon on most</span>
                    <br />
                    <span className="relative inline-block whitespace-nowrap">
                      <span
                        aria-hidden
                        className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-green/55"
                      />
                      <span className="relative">ai platforms</span>
                    </span>
                  </span>
                }
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-canvas gap-6 pt-4 pb-16 md:pt-6 md:pb-20">
          <div className="col-span-3 md:w-2/3 md:justify-self-center">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="upload to ai"
              title="download FAQ file"
              markerStyle="contained"
            />
          </div>
        </section>

        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-4 pb-8 md:pt-6 md:pb-10">
          <PaperApp width="wide" className="md:col-span-3 md:w-2/3 md:justify-self-center">
            <div className="space-y-4 md:space-y-5 py-2">
              <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Don&apos;t want to talk to ai? Don&apos;t worry.
              </h2>
              <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                Just book a quick intro call with Alex instead.
              </p>
              <SectionTile
                variant="app"
                accent="orange"
                eyebrow="Book a call"
                eyebrowStyle="em-dash"
                title="Chat with Alex"
                href="/contact"
                markerStyle="contained"
                className="!mt-10 md:!mt-12 max-w-[280px] mx-auto"
              />
            </div>
          </PaperApp>
        </section>

        <section className="grid grid-cols-canvas gap-6 pt-12 pb-8 md:pt-14 md:pb-10">
          <div className="col-span-3 relative">
            {/* Invisible mirror — reserves the final rendered height of
                the terminal line so the closing CTA below holds its
                position while the line types out. */}
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
              {">  i can't wait to help YOUR TEAM prepare for the ai future :) :)"}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                align="left"
                persistCursor
                startDelayMs={1620}
                segments={[
                  { text: 'i can' },
                  { text: "'", color: 'text-purple' },
                  { text: 't wait to help ' },
                  { text: 'YOUR TEAM', color: 'text-orange' },
                  { text: ' prepare for the ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' future ' },
                  { text: ':) :)', color: 'text-purple' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-canvas gap-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="col-span-3 md:w-2/3 md:justify-self-center">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="ready to chat?"
              title="book demo call"
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
  title: 'faq — alderman.ai',
}
