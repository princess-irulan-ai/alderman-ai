import Image from 'next/image'
import Link from 'next/link'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrialCTASection } from '@/components/sections/TrialCTASection'
import { WhatYouGetSection } from '@/components/sections/WhatYouGetSection'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

// Side-nav menu items — same destinations as the FloatingNav menu, but
// always visible (no toggle) and styled for the side-nav narrower
// container. Hardcoded inline rather than reused from FloatingNav to
// keep that shared component frozen. Homepage filtered out — current
// route excluded from its own nav menu.
const SIDE_NAV_ITEMS = [
  {
    href: '/faq',
    label: 'Pricing / FAQ',
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
    // Primary CTA: no background, always-on purple border + glow
    // (no hover state since it's already at the hover-look). `!` on
    // border-purple/60 overrides the default `border-ink/15`.
    gradient: '',
    hover:
      '!border-purple/60 shadow-[0_0_28px_rgba(174,129,255,0.45)]',
  },
] as const

export default function HomePage() {
  return (
    <div className="desktop-spec">
      <FloatingNav />
      {/* DESKTOP SIDE NAV — only visible at >=1200px via the
          .side-nav rules in globals.css. Below that gate it's
          `display: none`. The existing FloatingNav stays the
          navigation surface at <1200px (mobile + tablet); at >=1200
          FloatingNav is also hidden via CSS and this aside takes
          over. Both elements render unconditionally — gating happens
          purely in CSS so React state is untouched. */}
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
        <HeroSection />
        {/* T1 OFFER MECHANICS — rebuild-t1t2. The homepage sells the
            daily track end-to-end (Modified Candidate A). Claims from
            claims-manifest.md §Tier 1, dictated 2026-06-10: daily 5-min
            lesson / company channel / own ai tool / 500-person cap /
            10K flat / monthly topic reporting for audits. Price shown
            per manifest gap #2 default (show prices, T1 at 10K). */}
        <section className="pt-8 pb-8 md:py-12">
          <PaperApp width="wide">
            <div className="space-y-5 max-w-[780px] mx-auto">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight text-center">
                The daily lesson
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft text-center">
                A 5-minute <span className="text-green">ai</span> lesson
                lands in your company channel, daily. Everyone runs it in
                their own <span className="text-green">ai</span> tool —
                five minutes, hands on, then back to work.
              </p>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft text-center">
                Up to 500 people.{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                  />
                  <span className="relative">10.000 Kč a month</span>
                </span>
                , flat.
              </p>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft text-center">
                Monthly topic reporting included — documented evidence
                your company is taking{' '}
                <span className="text-green">ai</span> training measures,
                the kind you file away for future audits.
              </p>
            </div>
          </PaperApp>
        </section>
        <WhatYouGetSection />
        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                {'fluency lessons are hands on usage of ai with a HUMAN guiding the process '}
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
        {/* T2 CO-EQUAL DOOR — own framing + own CTA, never an upsell
            footnote (operator-dictated entry-point requirement + IA
            verdict). Claims from claims-manifest.md §Tier 2: groups ≤6,
            live coaching, A0 Orientation entry month. */}
        <section className="pt-8 pb-8 md:py-12">
          <PaperApp width="medium">
            <div className="space-y-5">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight">
                Rather have it live?
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft">
                The other track: live small-group lessons — up to six
                people, everyone hands-on, coached live. Every group
                starts with a one-month orientation.
              </p>
              <div className="pt-6">
                <SectionTile
                  variant="app"
                  accent="orange"
                  eyebrow="live lessons"
                  title="See the Course"
                  href="/course"
                  markerStyle="contained"
                />
              </div>
            </div>
          </PaperApp>
        </section>
        <section className="pt-8 pb-8 md:pt-16 md:pb-10">
          <SectionTile
            variant="ide"
            accent="purple"
            eyebrow="ai fluency"
            title="have questions?"
            href="/faq"
            markerStyle="contained"
            className="tile-right-edge"
          />
        </section>
        <TrialCTASection />
        <section className="flex justify-center md:mt-8">
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
        <section className="pt-8 pb-8 md:pt-12 md:pb-10 -mt-2 md:mt-0">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                {'take a HUMAN approach to ai adoption and make sure no one is left behind '}
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
