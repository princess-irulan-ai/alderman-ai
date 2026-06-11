import Link from 'next/link'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /course — standalone Tier-2 sales page (branch rebuild-t1t2).
 *
 * IA: Modified Candidate A (`research — IA verdict (2026-06-11).md`).
 * This page must be self-serve-evaluation-complete: a buyer who never
 * sees the homepage pitch can evaluate and shortlist from here alone
 * (verified silent-evaluation finding — first contact happens ~61% of
 * the way through the buying journey).
 *
 * Commercial claims sourced from `claims-manifest.md` (fork root) — no
 * claim lands in copy unless it's in the manifest, dated. Sample copy;
 * Alex approves all real copy before ship.
 *
 * OPEN SLOT — pricing display (claims-manifest §Tier 2, gap row):
 * the Pricing paper-app below renders the orientation-month anchor
 * shape (18.000 / 36.000 Kč) as the DRAFT DEFAULT. Ongoing-cohort
 * pricing copy is deliberately absent — no dictated claim exists for
 * it. Operator word lands via veto pack Item 4 before any price copy
 * ships.
 *
 * Compositional rhythm (mirrors the homepage's surface-switching):
 *   1. H1 (3 lines, purple period) — what the page is, instantly
 *   2. Hero TerminalLine — the method claim
 *   3. A0 Orientation paper-app — the entry product
 *   4. "A 50-minute session" paper-app — format + method
 *   5. Terminal seam — six keyboards / one HUMAN (the whisper)
 *   6. "After orientation" paper-app — ongoing model + cohort rotation
 *   7. IDE tile — co-equal door back to the daily track (/)
 *   8. "Measured from day one" paper-app + inner App tile → /faq
 *   9. Pricing paper-app — DRAFT SLOT, see above
 *  10. Terminal seam — the demo is a real lesson
 *  11. IDE tile — next step / book a demo lesson → /contact
 */
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
    href: '/faq',
    label: 'Pricing / FAQ',
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
    // Primary CTA: no background, always-on purple border + glow
    // (no hover state since it's already at the hover-look). `!` on
    // border-purple/60 overrides the default `border-ink/15`.
    gradient: '',
    hover:
      '!border-purple/60 shadow-[0_0_28px_rgba(174,129,255,0.45)]',
  },
] as const

export const metadata = {
  title: 'live lessons — alderman.ai',
  description:
    'Live group AI lessons for companies. Small groups, everyone in their own AI tool, a human coaching the room. Starts with a one-month A0 Orientation.',
}

export default function CoursePage() {
  return (
    <div className="desktop-spec route-course">
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
        <div className="page-header-spacer h-[120px]" aria-hidden />

        {/* HERO ZONE — H1 + method TerminalLine + A0 Orientation
            paper-app. Says what the page is INSTANTLY: live group
            lessons, and every group starts with the orientation month. */}
        <section className="flex flex-col gap-8 pt-4 pb-8">
          <h1 className="font-display text-[37px] font-bold leading-[1.05] tracking-display-tight text-ide-fg text-center mb-8 md:mb-10">
            live <span className="text-green">ai</span> lessons
            <br />
            for small groups<span className="text-purple">,</span>
            <br />
            coached by a <span className="text-orange">HUMAN</span>
            <span className="text-purple">.</span>
          </h1>
        </section>

        <section className="pt-4 pb-8 md:pt-8 md:pb-10">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                {'the ai does the teaching, alex coaches the room '}
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
                  { text: 'the ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' does the teaching' },
                  { text: ', ', color: 'text-purple' },
                  { text: 'alex coaches the room' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="pt-8 pb-8 md:py-12">
          <PaperApp width="medium">
            <div className="space-y-5">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight">
                A0 Orientation
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft">
                Every group starts here. One month, four weekly sessions
                — about four hours total. Orientation in{' '}
                <span className="text-green">ai</span>,{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                  />
                  <span className="relative">zero to one</span>
                </span>
                .
              </p>
            </div>
          </PaperApp>
        </section>

        {/* BODY ZONE */}
        <section className="pt-8 pb-8 md:py-12">
          <PaperApp width="wide">
            <div className="space-y-5 max-w-[780px] mx-auto">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight text-center">
                A 50-minute session
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft text-center">
                Up to six people, everyone with their hands on a keyboard,
                each in their own <span className="text-green">ai</span>{' '}
                tool. A lesson file structures the hour — the{' '}
                <span className="text-green">ai</span> does the actual
                teaching, and I coach the room through it live.
              </p>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft text-center">
                No slides. The session is the work itself.
              </p>
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
                {'six keyboards, their own ai, one HUMAN coaching the room '}
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
                  { text: 'six keyboards' },
                  { text: ', ', color: 'text-purple' },
                  { text: 'their own ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ', ', color: 'text-purple' },
                  { text: 'one ' },
                  { text: 'HUMAN', color: 'text-orange' },
                  { text: ' coaching the room' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="pt-8 pb-8 md:py-12">
          <PaperApp width="wide">
            <div className="space-y-5 max-w-[780px] mx-auto">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight text-center">
                After orientation, it keeps going
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft text-center">
                The arrangement is ongoing — a month&rsquo;s notice ends
                it, no long contracts. Your people rotate through in
                bounded cohorts: one group finishes its run, the next
                steps in.
              </p>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft text-center">
                Renewal means the next cohort — not paying forever.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* Co-equal door back to the daily track. /course has to sell on
            its own, but the other entry point stays one visible step
            away (Modified Candidate A — doors, not upsells). */}
        <section className="pt-8 pb-8 md:pt-16 md:pb-10">
          <SectionTile
            variant="ide"
            accent="purple"
            eyebrow="self-study track"
            title="daily 5-min ai lessons"
            href="/"
            markerStyle="contained"
            className="tile-right-edge"
          />
        </section>

        <section className="pt-8 pb-8 md:py-12">
          <PaperApp width="wide">
            <div className="space-y-5 max-w-[780px] mx-auto">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight text-center">
                Measured from day one
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft text-center">
                Everyone starts with a baseline assessment — it&rsquo;s{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                  />
                  <span className="relative">free</span>
                </span>
                . From there, progress gets reported quarterly — written
                for the meeting where the training budget gets justified.
              </p>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft text-center">
                Documented evidence your company is taking{' '}
                <span className="text-green">ai</span> training measures —
                the kind you file away for future audits.
              </p>
              <div className="pt-10 md:pt-12">
                <SectionTile
                  variant="app"
                  accent="orange"
                  eyebrow="still curious"
                  title="Questions, Answered"
                  href="/faq"
                  markerStyle="contained"
                />
              </div>
            </div>
          </PaperApp>
        </section>

        {/* PRICING — DRAFT SLOT (claims-manifest §Tier 2 gap row).
            Renders the orientation-month anchors as the draft default.
            Ongoing-cohort pricing copy intentionally absent — no
            dictated claim covers it. Do not ship without operator word
            (veto pack Item 4). */}
        <section className="pt-8 pb-8 md:py-12">
          <PaperApp width="medium">
            <div className="space-y-5">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight">
                Pricing
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft">
                The orientation month: 18.000 Kč for one group of up to
                six — or 36.000 Kč for two groups running in parallel.
              </p>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft">
                The baseline assessment costs nothing.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* CTA ZONE */}
        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                {'the demo lesson is a real lesson, just the smallest one '}
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
                  { text: 'the demo lesson is a real lesson' },
                  { text: ', ', color: 'text-purple' },
                  { text: 'just the smallest one' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="pt-8 pb-16 md:pt-12 md:pb-20">
          <SectionTile
            variant="ide"
            accent="purple"
            eyebrow="next step"
            title="book a demo lesson"
            href="/contact"
            markerStyle="contained"
            className="tile-right-edge"
          />
        </section>
      </PageFrame>
      <Footer />
    </div>
  )
}
