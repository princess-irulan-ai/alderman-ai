import Link from 'next/link'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { FaqChat, type FaqEntry } from '@/components/special/FaqChat'
import { Postit } from '@/components/special/Postit'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

// Side-nav menu items — same destinations as the FloatingNav menu, but
// always visible (no toggle) and styled for the side-nav narrower
// container. /faq filtered out — current route excluded from its own
// nav menu (matches canonical / pattern).
const SIDE_NAV_ITEMS = [
  {
    href: '/',
    label: 'Homepage',
    gradient:
      'linear-gradient(to top right, rgba(253, 151, 31, 0.65) 0%, rgba(253, 151, 31, 0.30) 25%, transparent 75%)',
    hover:
      'hover:border-orange/60 hover:shadow-[0_0_28px_rgba(253,151,31,0.45)]',
  },
  {
    href: '/about',
    label: 'About Me',
    gradient:
      'linear-gradient(to top right, rgba(253, 151, 31, 0.65) 0%, rgba(253, 151, 31, 0.30) 25%, transparent 75%)',
    hover:
      'hover:border-orange/60 hover:shadow-[0_0_28px_rgba(253,151,31,0.45)]',
  },
  {
    href: '/contact',
    isPrimary: true,
    label: (
      <>
        Talk to a <span className="uppercase text-orange">HUMAN</span>
      </>
    ),
    gradient:
      'linear-gradient(to top right, rgba(174, 129, 255, 0.65) 0%, rgba(174, 129, 255, 0.30) 25%, transparent 75%)',
    hover:
      'hover:border-purple/60 hover:shadow-[0_0_28px_rgba(174,129,255,0.45)]',
  },
] as const

const FAQ_ENTRIES: FaqEntry[] = [
  {
    q: 'Who are ai fluency lessons for?',
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
    q: 'Are sessions online or in person?',
    a: 'Online. These are hands-on lessons using ai, so an instructor in front of a whiteboard is ineffective. It also lets your team use personal hardware if your IT restricts all ai.',
  },
  {
    q: 'Do we need to know ai already?',
    a: 'No. Most teams start as beginners – about 95% of people, despite the marketing buzz. The ai itself adapts to each student, so mixed-experience groups still work.',
  },
  {
    q: 'Can we create groups by department?',
    a: 'Yes. By default, lessons are general – works for any team. If a whole team is interested (marketing, accounting), we tailor lessons to their actual work.',
  },
  {
    q: 'What ai platform will we need?',
    a: 'Whatever your IT allows. Free ChatGPT, paid Claude, even what’s built into Microsoft Word – we make lessons compatible with what your company permits.',
  },
  {
    q: 'Are sessions in Czech or English?',
    a: 'Lessons in English, with Czech help when needed. The ai itself can teach in any language. Think of the ai as your teacher and me as the assistant. (ale mluvím česky docela dobře)',
  },
  {
    q: 'How does pricing work?',
    a: 'By the teaching hour. The more hours per month, the lower the per-hour rate – see the table at the top of this page.',
  },
  {
    q: 'How long is the business commitment?',
    a: 'Month-to-month with one month notice on either side. Missed sessions can be rescheduled within two weeks. Annual deals are available if you want to lock in pricing.',
  },
  {
    q: 'How’s this different from online courses?',
    a: 'An online course doesn’t help when people are resistant to ai in the first place. I have the cultural and pedagogical experience to get them actually engaging with the topic – not just opting out.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a call or send an email. We’ll do an intro meeting with anyone interested, sort into groups, agree on cadence, and start as soon as your people are ready.',
  },
]

export default function FaqPage() {
  return (
    <div className="desktop-spec route-faq">
      <FloatingNav />
      <aside aria-label="Site navigation (desktop)" className="side-nav">
        <Link href="/" aria-label="alderman.ai" className="side-nav-logo-link">
          <img
            src="/brand-assets/logos/alderman-ai-stacked-logo-v1.svg"
            alt=""
            aria-hidden
            className="side-nav-logo block"
          />
        </Link>
        <div className="side-nav-menu">
          <PaperApp width="fit" chromeLeft="" chromeRight="" bodyClassName="">
            <nav className="flex flex-col gap-2 p-[10px]">
              {SIDE_NAV_ITEMS.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`block rounded-tile border-2 border-ink/15 ${item.hover} transition-[box-shadow,border-color] duration-200 px-3 py-2 font-display font-bold text-[20px] text-ink text-right`}
                  style={{ background: item.gradient }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </PaperApp>
        </div>
      </aside>
      <PageFrame>
        <div className="h-[120px]" aria-hidden />
        <section className="pt-4 pb-8 md:pt-8 md:pb-10">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-display-tight text-center text-ide-fg">
            have a <span className="text-orange">HUMAN</span>
            <br />
            <span className="text-purple">(</span>{' '}or <span className="text-green">ai</span>{' '}<span className="text-purple">)</span> answer
            <br />{' '}
            your questions<span className="text-purple">.</span>
          </h1>
        </section>

        <section className="pt-8 pb-[148px] md:pt-10 md:pb-[180px]">
          <div className="relative">
            <PaperApp width="wide">
              <div className="space-y-5 md:space-y-5 py-2">
                <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                  Complex topic.
                  <br />
                  {/* Purple highlight on "Simple" — desktop only. The
                      bg pseudo span is hidden at <1200 via
                      `.purple-bg-desktop { display: none }`, so
                      mobile + tablet render plain bold "Simple
                      pricing." identical to canonical /faq. */}
                  <span className="relative inline-block">
                    <span
                      aria-hidden
                      className="purple-bg-desktop absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                    />
                    <span className="relative text-ink">Simple</span>
                  </span>{' '}
                  pricing.
                </h2>
                <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                  Cost is the number of 50m teaching hours used across all of your groups per month.
                </p>
                {/* MOBILE + TABLET: "Buy more. Pay less. Simple." sits
                    inside paper-app 1 as a punchline beat between the
                    subhead and the table. At desktop tier (≥1200) this
                    is hidden via `.pricing-buy-mobile { display:
                    none }` and the text is duplicated into paper-app 2
                    as the table's TITLE. Mobile + tablet byte-
                    identical to canonical. */}
                <p className="pricing-buy-mobile font-display text-[18px] font-bold leading-snug text-ink max-w-[780px] mx-auto text-center !mt-8 md:!mt-10">
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
                {/* MOBILE + TABLET: pricing table renders inside the
                    main paper-app. At desktop tier (≥1200) this is
                    hidden via `.pricing-table-mobile { display:
                    none }` and the table is duplicated into the
                    `.pricing-split-only` section below — so on
                    desktop the pricing splits into TWO paper-apps:
                    centered "complex topic / simple pricing"
                    explanation + left-overhanging table. Mobile and
                    tablet (<1200) stay byte-identical to canonical. */}
                <table className="pricing-table-mobile mx-auto !mt-8 md:!mt-10 border-collapse border-2 border-ink font-display text-[16px] text-ink">
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
                <div className="pricing-spacer-mobile h-[30px]" aria-hidden />
              </div>
            </PaperApp>
            {/* MOBILE + TABLET POST-IT — sits inside paper-app 1's
                relative wrapper, anchored at canonical anchorTop=520.
                Hidden at desktop (≥1200) where a separate post-it
                renders inside paper-app 2 instead. Mobile + tablet
                byte-identical to canonical /faq. */}
            <Postit
              className="pricing-postit-mobile"
              overhang="br"
              anchorTop={516}
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
                  <span className="whitespace-nowrap">
                    ={' '}
                    <span className="relative inline-block">
                      <span
                        aria-hidden
                        className="absolute -inset-x-2 -inset-y-0.5 -rotate-1 rounded-md bg-purple/55"
                      />
                      <span className="relative text-ink">36.000 Kč</span>
                    </span>
                  </span>
                </span>
              }
            />
          </div>
        </section>

        {/* DESKTOP-ONLY: pricing table extracted into its own paper-app
            and left-overhung into the left gutter. Hidden by default;
            only renders at ≥1200px inside the `.desktop-spec.dev-
            faq` scope (see globals.css `.pricing-split-only` rule).
            Mirrors the homepage hero paper-app's right-overhang pattern
            but flipped to the left side, giving the pricing block a
            two-beat rhythm at desktop: centered explanation + left-
            overhanging table. */}
        <section className="pricing-split-only">
          <div className="relative">
            <PaperApp width="wide">
            <div className="space-y-4 md:space-y-5 py-2">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Buy more. Pay less.{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                  />
                  <span className="relative text-ink">Simple</span>
                </span>
                .
              </h2>
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
            </div>
          </PaperApp>
            {/* DESKTOP POST-IT — anchored to paper-app 2's relative
                wrapper. CSS in globals.css positions it: top edge on
                the table's vertical center, right edge at the right
                gutter inlay (column-right + 39). Hidden at <1200; the
                mobile+tablet post-it inside paper-app 1 renders
                instead. */}
            <Postit
              className="pricing-postit-desktop"
              overhang="br"
              anchorTop={0}
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
                  <span className="whitespace-nowrap">
                    ={' '}
                    <span className="relative inline-block">
                      <span
                        aria-hidden
                        className="absolute -inset-x-2 -inset-y-0.5 -rotate-1 rounded-md bg-purple/55"
                      />
                      <span className="relative text-ink">36.000 Kč</span>
                    </span>
                  </span>
                </span>
              }
            />
          </div>
        </section>

        {/* "book a call" — centered (no tile-right-edge) so the first
            purple CTA after the pricing block lands on the column
            centerline instead of overhanging the right gutter. */}
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
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                {'below are three ways to get answers: faq "chat box", faq doc for ai platforms, or just ask a HUMAN '}
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
                  { text: 'below are three ways to get answers' },
                  { text: ':', color: 'text-purple' },
                  { text: ' faq ' },
                  { text: '"' },
                  { text: 'chat box' },
                  { text: '"' },
                  { text: ',', color: 'text-purple' },
                  { text: ' faq doc for ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' platforms' },
                  { text: ',', color: 'text-purple' },
                  { text: ' or just ask a ' },
                  { text: 'HUMAN', color: 'text-orange' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="pt-4 pb-8 md:pt-6 md:pb-14">
          <div>
            <FaqChat
              entries={FAQ_ENTRIES}
              emptyState={
                <div className="space-y-14 max-w-[220px] mx-auto">
                  <p>
                    This is a branded
                    <br />
                    FAQ —{' '}
                    <span className="relative inline-block">
                      <span
                        aria-hidden
                        className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-green/55"
                      />
                      <span className="relative text-ink">not ai</span>
                    </span>
                  </p>
                  <p className="leading-snug">
                    select questions
                    <br />
                    <span className="relative inline-block mr-3">
                      <span
                        aria-hidden
                        className="absolute -inset-x-1 -inset-y-0.5 -rotate-1 rounded-md bg-purple/55"
                      />
                      <span className="relative text-ink">&lt;</span>
                    </span>
                    for more info
                    <span className="relative inline-block ml-3">
                      <span
                        aria-hidden
                        className="absolute -inset-x-1 -inset-y-0.5 -rotate-1 rounded-md bg-purple/55"
                      />
                      <span className="relative text-ink">&gt;</span>
                    </span>
                  </p>
                  <p className="faq-arrows-hint">Use the arrows to navigate.</p>
                </div>
              }
            />
          </div>
        </section>

        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                {'if YOU want more in depth answers, upload the following file into your ai platform of choice '}
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
                  { text: 'if ' },
                  { text: 'YOU', color: 'text-orange' },
                  { text: ' want more in depth answers' },
                  { text: ',', color: 'text-purple' },
                  { text: ' upload the following file into your ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' platform of choice' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* "download FAQ file" — right-edge overhang for rhythm break
            after the centered FaqChat + left-anchored terminal seam. */}
        <section className="pt-8 pb-8 md:pt-20 md:pb-16">
          <div>
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="upload to ai"
              title="download FAQ file"
              href="/faq-download"
              markerStyle="contained"
              className="tile-right-edge"
            />
          </div>
        </section>

        <section className="pt-8 pb-8 md:pt-6 md:pb-14">
          <PaperApp width="wide">
            <div className="space-y-5 md:space-y-5 py-2">
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
                title="Detailed Instructions"
                href="/faq-download"
                markerStyle="contained"
                className="!mt-10 md:!mt-12"
              />
            </div>
          </PaperApp>
        </section>

        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                {"don't want to talk to ai? i totally get it "}
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
                  { text: 'don' },
                  { text: "'", color: 'text-purple' },
                  { text: 't want to talk to ' },
                  { text: 'ai', color: 'text-green' },
                  { text: '?', color: 'text-purple' },
                  { text: ' i totally get it' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Closing CTA — right-edge overhang as the final emphatic
            beat. Mirrors /dev/home-page's closing "book a demo lesson"
            tile pattern. */}
        <section className="pt-8 pb-16 md:pt-10 md:pb-20">
          <div>
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="book a call"
              title={<>talk to a <span className="normal-case text-orange">HUMAN</span></>}
              href="/contact"
              markerStyle="contained"
              className="tile-right-edge"
            />
          </div>
        </section>

      </PageFrame>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: 'faq — alderman.ai',
}
