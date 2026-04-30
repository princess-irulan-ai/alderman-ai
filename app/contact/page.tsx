import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { Postit } from '@/components/special/Postit'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

export default function ContactPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />
        <section className="pt-4 pb-12 md:pt-8 md:pb-16">
          <h1 className="text-center font-display text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display-tight text-ide-fg">
            in the age of <span className="text-green">ai</span> it can be nice to talk to a <span className="text-orange">HUMAN</span>
          </h1>
        </section>

        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-8 pb-[138px] md:pt-10 md:pb-[170px]">
          <div className="relative md:col-span-3 md:w-2/3 md:justify-self-center">
            <PaperApp width="wide">
              <div className="space-y-4 md:space-y-5 py-2">
                <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                  Get in touch any way you&apos;d like
                </h2>
                <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                  Book a demo lesson, ask a question, or just introduce yourself! <span className="text-orange text-[1.25em]">♥</span>
                </p>
                <SectionTile
                  variant="app"
                  accent="orange"
                  eyebrow="Book a call"
                  eyebrowStyle="em-dash"
                  href="https://cal.com/alex-the-ai-instructor/30m"
                  title={<>Let&apos;s have a chat <span className="text-purple">:)</span></>}
                  markerStyle="contained"
                  className="!mt-10 md:!mt-12 max-w-[280px] mx-auto"
                />
                <div className="h-[55px]" aria-hidden />
              </div>
            </PaperApp>
            <div
              className="absolute left-1/2 top-[390px] pointer-events-none origin-top-left"
              style={{ transform: 'scale(calc(50vw / 250px))' }}
            >
              <Postit
                rotation={-5}
                heading={
                  <span
                    className="block font-display font-normal"
                    style={{ width: '200px', fontSize: '28px', lineHeight: 1.1 }}
                  >
                    <span className="whitespace-nowrap">
                      give me{' '}
                      <span className="relative inline-block">
                        <span
                          aria-hidden
                          className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                        />
                        <span className="relative">30m</span>
                      </span>
                    </span>
                    <br />
                    <span className="font-bold whitespace-nowrap">and i promise</span>
                    <br />
                    <span className="whitespace-nowrap">i&apos;ll teach you</span>
                    <br />
                    <span className="whitespace-nowrap">something useful</span>
                  </span>
                }
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-canvas gap-6 pt-4 pb-8 md:pt-6 md:pb-10">
          <div className="col-span-3 grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                <span className="select-none">&gt;</span>
                {'  prefer email? shoot ME a message '}
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
                  { text: 'prefer email' },
                  { text: '?', color: 'text-purple' },
                  { text: ' shoot ' },
                  { text: 'ME', color: 'text-orange' },
                  { text: ' a message' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-canvas gap-6 pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="col-span-3 md:col-start-2 md:col-span-1">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="send an email"
              title={
                <>
                  <span className="text-orange">alex</span>
                  <span className="text-purple">@</span>
                  <span className="text-white">alder</span>
                  <span className="text-orange">man</span>
                  <span className="text-purple">.</span>
                  <span className="text-green">ai</span>
                </>
              }
              href="mailto:alex@alderman.ai"
              markerStyle="contained"
            />
          </div>
        </section>

        <section className="flex justify-center md:mt-8">
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
                boxShadow: [
                  '1px 1px 0 0 rgba(117, 113, 94, 0.40)',
                  '6px 10px 32px rgba(253, 151, 31, 0.28)',
                  '28px 38px 80px rgba(0, 0, 0, 0.50)',
                ].join(', '),
              }}
            />
          </div>
        </section>

        <section className="md:grid md:grid-cols-canvas md:gap-6 pt-8 pb-8 md:pt-12 md:pb-10">
          <PaperApp width="wide" className="md:col-span-3 md:w-2/3 md:justify-self-center">
            <div className="space-y-4 md:space-y-5 py-2">
              <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Not ready to chat?
              </h2>
              <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                Just follow me on LinkedIn for more information.
              </p>
              <SectionTile
                variant="app"
                accent="orange"
                eyebrow="Follow me"
                eyebrowStyle="em-dash"
                href="https://www.linkedin.com/in/alex-the-ai-instructor/"
                title={
                  <span className="inline-flex items-center justify-center gap-2">
                    <span>Connect on</span>
                    <span aria-hidden className="text-purple">→</span>
                    <span className="text-orange inline-flex" aria-label="LinkedIn">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                        aria-hidden
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </span>
                  </span>
                }
                markerStyle="contained"
                className="!mt-10 md:!mt-12 max-w-[280px] mx-auto"
              />
            </div>
          </PaperApp>
        </section>
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'contact — alderman.ai',
}
