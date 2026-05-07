import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { FaqChat, type FaqEntry } from '@/components/special/FaqChat'
import { Postit } from '@/components/special/Postit'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

const FAQ_ENTRIES: FaqEntry[] = [
  {
    q: 'Who is this for?',
    a: 'Proactive companies who want to attract, retain, and upskill current and future employees to prepare them and your company for your eventual ai transformation.',
  },
  {
    q: 'What does a session look like?',
    a: '50 minutes of hands-on learning about ai by using ai. I’m there to guide and troubleshoot, but most of the learning happens using my proprietary ai lesson files.',
  },
  {
    q: 'What’s the ai lesson file?',
    a: 'A custom file your team opens in their ai of choice. It guides them through the topic, checks understanding, and flags when they should ask me for help.',
  },
  {
    q: 'How often and how big are the groups?',
    a: 'Up to 6 people per group. Cadence is up to you – most companies run one to three groups, meeting 1–2x a week. Similar to typical language lessons.',
  },
  {
    q: 'How long is the program?',
    a: 'Open-ended. Like language lessons, ai is ongoing skill-building – not a 12-week course with a finish line.',
  },
  {
    q: 'Online or in-person?',
    a: 'Online. These are hands-on lessons using ai, so an instructor in front of a whiteboard is ineffective. It also lets your team use personal hardware if your IT restricts all ai.',
  },
  {
    q: 'Do we need to know ai already?',
    a: 'No. Most teams start as beginners – about 95% of people, despite the marketing buzz. The ai itself adapts to each student, so mixed-experience groups still work.',
  },
  {
    q: 'Can lessons be tailored to specific teams?',
    a: 'Yes. By default, lessons are general – works for any team. If a whole team is interested (marketing, accounting), we tailor lessons to their actual work.',
  },
  {
    q: 'What ai tools do you use?',
    a: 'Whatever your IT allows. Free ChatGPT, paid Claude, even what’s built into Microsoft Word – we make lessons compatible with what your company permits.',
  },
  {
    q: 'Czech or English?',
    a: 'Lessons in English, with Czech help when needed. The ai itself can teach in any language. Think of the ai as your teacher and me as the assistant. (ale mluvím česky docela dobře)',
  },
  {
    q: 'How does pricing work?',
    a: 'By the teaching hour. The more hours per month, the lower the per-hour rate – see the table at the top of this page.',
  },
  {
    q: 'What’s the commitment?',
    a: 'Month-to-month with one month notice on either side. Missed sessions can be rescheduled within two weeks. Annual deals are available if you want to lock in pricing.',
  },
  {
    q: 'How is this different from an online course?',
    a: 'An online course doesn’t help when people are resistant to ai in the first place. I have the cultural and pedagogical experience to get them actually engaging with the topic – not just opting out.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a call or send an email. We’ll do an intro meeting with anyone interested, sort into groups, agree on cadence, and start as soon as your people are ready.',
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
                  Buy more. Pay less.{' '}
                  <span className="relative inline-block">
                    <span
                      aria-hidden
                      className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                    />
                    <span className="relative text-ink">Simple</span>
                  </span>
                  .
                </p>
                <table className="mx-auto !mt-8 md:!mt-10 border-collapse border-2 border-ink font-display text-[16px] text-ink">
                  <thead>
                    <tr>
                      <th className="border-2 border-ink px-4 py-2 font-bold text-left">Hours</th>
                      <th className="border-2 border-ink px-4 py-2 font-bold text-left">Price (each)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2 border-ink px-4 py-2">4</td>
                      <td className="border-2 border-ink px-4 py-2">5000 Kč</td>
                    </tr>
                    <tr>
                      <td className="border-2 border-ink px-4 py-2">8</td>
                      <td className="border-2 border-ink px-4 py-2">4500 Kč</td>
                    </tr>
                    <tr>
                      <td className="border-2 border-ink px-4 py-2">16+</td>
                      <td className="border-2 border-ink px-4 py-2">4000 Kč</td>
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
              href="/faq-download"
              markerStyle="contained"
            />
          </div>
        </section>

        <section className="pt-4 pb-12 md:pt-6 md:pb-14">
          <PaperApp width="wide">
            <div className="space-y-4 md:space-y-5 py-2">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Need some help with FAQ file?
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                You can find more detailed instructions below.
              </p>
              <SectionTile
                variant="app"
                accent="orange"
                eyebrow="CLICK HERE"
                title="Detailed instructions"
                href="/faq-download"
                markerStyle="contained"
                className="!mt-10 md:!mt-12"
              />
            </div>
          </PaperApp>
        </section>

        {/* Second fallback path — for readers who don't want to engage
            with ai at all and would rather book a human. Mirrors the
            terminal+CTA pattern from /faq-download. */}
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
              {">  don't want to talk to ai? i totally get it"}
            </div>
            <div className="absolute inset-0">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                align="left"
                persistCursor
                segments={[
                  { text: "don't want to talk to " },
                  { text: 'ai', color: 'text-green' },
                  { text: '? i totally get it' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="pt-6 pb-16 md:pt-10 md:pb-20">
          <div>
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="book a call"
              title={<>talk to a <span className="normal-case text-orange">HUMAN</span></>}
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
