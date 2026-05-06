import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

export default function FaqDownloadPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />

        <section className="pt-4 pb-10 md:pt-8 md:pb-14">
          <h1 className="text-center font-display text-[40px] font-bold leading-[1.05] tracking-display-tight text-ide-fg">
            learn about our
            <br />
            <span className="text-orange">COMPANY</span> via the
            <br />
            interactive <span className="text-green">ai</span> FAQ
          </h1>
        </section>

        <section className="pt-4 pb-12 md:pt-6 md:pb-16">
          <PaperApp width="wide">
            <div className="space-y-4 md:space-y-5 py-2">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Download our FAQ.md
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[680px] mx-auto text-center">
                Markdown files (.md) are special files optimized for
                <br />
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-green/55"
                  />
                  <span className="relative">ai platforms</span>
                </span>
              </p>
              <SectionTile
                variant="app"
                accent="orange"
                gradientAccent="purple"
                eyebrow="here's the file"
                title="Download FAQ (en)"
                href="/alderman-ai-faq.md"
                download
                markerStyle="contained"
                className="!mt-10 md:!mt-12"
              />
              <SectionTile
                variant="app"
                accent="orange"
                eyebrow="tady je soubor"
                title="Stáhnout FAQ (cz)"
                href="/alderman-ai-faq-cz.md"
                download
                markerStyle="contained"
                className="!mt-8 md:!mt-10"
              />
            </div>
          </PaperApp>
        </section>

        {/* Terminal seam after the download block. Types in when it
            scrolls into view. Same invisible-mirror pattern as /faq —
            reserves the final rendered line height so the block below
            doesn't jump while the line types out. */}
        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="relative">
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
              {'>  just upload that file into any ai platform for a fully interactive deep dive into our company'}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                align="left"
                persistCursor
                segments={[
                  { text: 'just upload that file into any ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' platform for a fully interactive deep dive into our company' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="pt-6 pb-10 md:pt-10 md:pb-14">
          <div>
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="need more help?"
              title="download instructions"
              href="/README.txt"
              download
              markerStyle="contained"
            />
          </div>
        </section>

        <section className="pt-4 pb-12 md:pt-6 md:pb-16">
          <PaperApp width="wide">
            <div className="space-y-5 md:space-y-6 py-2">
              <h2 className="font-display text-[26px] font-bold leading-[1.15] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Think this is weird?
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[680px] mx-auto text-center">
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-green/55"
                  />
                  <span className="relative">It is!</span>
                </span>
                {' '}It&apos;s something completely new. But it&apos;s also a practical demonstration of how a well crafted ai file can deliver information, a core approach of{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-orange/55"
                  />
                  <span className="relative">our teaching method</span>
                </span>
                .
              </p>
            </div>
          </PaperApp>
        </section>

        {/* Terminal seam after the "Think this is weird?" paper-app —
            offers the human-talk fallback before the CTA below. Same
            invisible-mirror height-reservation pattern as the terminal
            above. */}
        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="relative">
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
              {'>  prefer to just talk to a HUMAN? no problem. the button below will help you set up a free demo call'}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                align="left"
                persistCursor
                segments={[
                  { text: 'prefer to just talk to a ' },
                  { text: 'HUMAN', color: 'text-orange' },
                  { text: '? no problem. the button below will help you set up a free demo call' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Still-HUMAN portrait — same asset / sizing / ring overlay
            as / and /contact. Sits between the human-talk terminal
            seam and the "talk to ALEX" CTA below, giving a face to
            the offer. */}
        <section className="flex justify-center -mt-4 md:-mt-2">
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

        <section className="pt-8 pb-16 md:pt-12 md:pb-20">
          <div>
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="go to website"
              title={<>talk to <span className="normal-case text-orange">ALEX</span></>}
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
  title: 'faq download — alderman.ai',
}
