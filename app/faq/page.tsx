import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { FaqChat, type FaqEntry } from '@/components/special/FaqChat'
import { Postit } from '@/components/special/Postit'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

// PROVISIONAL Q&A. The full list lands in a later session (likely two
// sessions out from this one — next session is /faq cleanup, the one
// after is real Q&A copy). These six are placeholder copy to
// demonstrate structure + conventions.
// Convention: questions use proper capitalization and end with `?` (or `.`).
const FAQ_ENTRIES: FaqEntry[] = [
  {
    q: 'How long is a teaching hour?',
    a: '50 minutes — that’s one teaching hour.',
  },
  {
    q: 'What fits in 8 hours per month?',
    a: 'Roughly 2 teams meeting weekly for a month, or 1 team meeting twice a week. By the end your team has built real ai workflows, not just watched demos.',
  },
  {
    q: 'Can I cancel or change tiers?',
    a: 'Yes — month to month. You commit to one month at a time; raise or lower your hour count whenever.',
  },
  {
    q: 'Who is this for?',
    a: 'Czech HR and L&D teams adding ai fluency as a benefit. Most groups are 4–6 people.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a demo lesson. We’ll meet your team, gauge level, and propose a starting tier.',
  },
  {
    q: 'Do you teach in Czech or English?',
    a: 'English by default. Czech available for groups that prefer it.',
  },
]

export default function FaqPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />
        <section className="pt-4 pb-8 md:pt-8 md:pb-10">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-display-tight text-center text-ide-fg">
            have a <span className="text-orange">HUMAN</span>
            <br />
            <span className="text-purple">(</span>{' '}or <span className="text-green">ai</span>{' '}<span className="text-purple">)</span> answer
            <br />{' '}
            your questions
          </h1>
        </section>

        <section className="pt-8 pb-[160px] md:pt-10 md:pb-[180px]">
          <div className="relative">
            <PaperApp width="wide">
              <div className="space-y-4 md:space-y-5 py-2">
                <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                  Complex topic.
                  <br />
                  Simple pricing.
                </h2>
                <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                  Cost is the number of 50m teaching hours used across all of your groups per month.
                </p>
                <p className="font-display text-[18px] font-bold leading-snug text-ink max-w-[780px] mx-auto text-center !mt-8 md:!mt-10">
                  Buy more. Pay less. Simple.
                </p>
                <table className="mx-auto !mt-8 md:!mt-10 border-collapse border-2 border-orange font-display text-[16px] text-ink">
                  <thead>
                    <tr>
                      <th className="border-2 border-orange px-4 py-2 font-bold text-left">Hours</th>
                      <th className="border-2 border-orange px-4 py-2 font-bold text-left">Price (each)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2 border-orange px-4 py-2">4</td>
                      <td className="border-2 border-orange px-4 py-2">5000 Kč</td>
                    </tr>
                    <tr>
                      <td className="border-2 border-orange px-4 py-2">8</td>
                      <td className="border-2 border-orange px-4 py-2">4500 Kč</td>
                    </tr>
                    <tr>
                      <td className="border-2 border-orange px-4 py-2">16+</td>
                      <td className="border-2 border-orange px-4 py-2">4000 Kč</td>
                    </tr>
                  </tbody>
                </table>
                {/* Reserves vertical room for the post-it BR overhang. */}
                <div className="h-[30px]" aria-hidden />
              </div>
            </PaperApp>
            {/* Pricing-example post-it. Same BR-overhang pattern as the
                FAQ download paper-app further down the page — see that
                block for the full rationale on the mobile scale formula
                and the desktop fixed-position fallback. */}
            <div className="absolute left-1/2 top-[520px] pointer-events-none origin-top-left [transform:scale(calc(var(--page-half)/250px))]">
              <Postit
                rotation={-5}
                heading={
                  <span
                    className="block font-display font-normal"
                    style={{ width: '200px', fontSize: '32px', lineHeight: 1.1 }}
                  >
                    <span className="whitespace-nowrap">2 groups,</span>
                    <br />
                    <span className="whitespace-nowrap">once a week</span>
                    <br />
                    <span className="whitespace-nowrap">= 8 hrs / mo</span>
                    <br />
                    <span className="whitespace-nowrap">= 36.000 Kč</span>
                  </span>
                }
              />
            </div>
          </div>
        </section>

        <section className="pt-4 pb-8 md:pt-6 md:pb-10">
          <div>
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="Have questions?"
              title="book a call"
              href="/contact"
              markerStyle="contained"
            />
          </div>
        </section>

        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="relative">
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
              {'>  below are three ways to get answers: faq "chat box", faq doc for ai platforms, or just ask a HUMAN'}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                align="left"
                persistCursor
                startDelayMs={1620}
                segments={[
                  { text: 'below are three ways to get answers' },
                  { text: ':', color: 'text-purple' },
                  { text: ' faq ' },
                  { text: '"', color: 'text-purple' },
                  { text: 'chat box' },
                  { text: '"', color: 'text-purple' },
                  { text: ', faq doc for ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' platforms, or just ask a ' },
                  { text: 'HUMAN', color: 'text-orange' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Chat-style FAQ — paper-app with carousel question selector +
            accumulating Q&A history. Branding-version of an FAQ section,
            not real ai (the real-ai option is the markdown download
            below). */}
        <section className="pt-4 pb-12 md:pt-6 md:pb-14">
          <div>
            <FaqChat
              entries={FAQ_ENTRIES}
              emptyState={
                <div className="space-y-6">
                  <p>
                    This is a branded FAQ —{' '}
                    <span className="relative inline-block">
                      <span
                        aria-hidden
                        className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-green/55"
                      />
                      <span className="relative">not ai</span>
                    </span>
                  </p>
                  <p>Tap a question below to ask it.</p>
                  <p>Use the arrows to navigate.</p>
                </div>
              }
            />
          </div>
        </section>

        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="relative">
            {/* Invisible mirror — reserves the final rendered height of
                the terminal line so the download CTA below holds its
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
              {'>  if YOU want more in depth answers, upload the following file into your ai platform of choice'}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                align="left"
                persistCursor
                startDelayMs={1620}
                segments={[
                  { text: 'if ' },
                  { text: 'YOU', color: 'text-orange' },
                  { text: ' want more in depth answers, upload the following file into your ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' platform of choice' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="pt-10 pb-10 md:pt-20 md:pb-16">
          <div>
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="upload to ai"
              title="download FAQ file"
              markerStyle="contained"
            />
          </div>
        </section>

        <section className="pt-4 pb-16 md:pt-6 md:pb-20">
          <PaperApp width="wide">
            <div className="space-y-4 md:space-y-5 py-2">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Don&apos;t want to talk to ai? Don&apos;t worry.
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
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

      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'faq — alderman.ai',
}
