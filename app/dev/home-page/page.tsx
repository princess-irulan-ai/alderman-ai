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

/**
 * /dev/home-page — desktop layout proving ground.
 *
 * This page mirrors the canonical `/` exactly at mobile (<768px). It
 * imports the same shared components with no prop changes, so its
 * mobile JSX/render is byte-identical to `/`. The only structural
 * difference is the `desktop-experiment` marker class on the outer
 * wrapper — which has zero CSS attached below the tablet breakpoint.
 *
 * At 768px+, CSS in `globals.css` scoped to
 * `body:has(.desktop-experiment)` inside `@media (min-width: 768px)`
 * paints the desktop layout (column 550, gutter rules, GutterGlows,
 * H1 78px, terminal 30px, paper-app right-align, etc.) by overriding
 * existing Tailwind utility classes already in the JSX. No JSX edits
 * to shared components.
 *
 * Architectural rule: this file is the ONLY allowed JSX touchpoint
 * for desktop work. Shared components stay frozen; if a desktop
 * effect needs new DOM, that DOM is added via CSS pseudo-elements
 * (::before / ::after) on existing class targets.
 */
// Side-nav menu items — same destinations as the FloatingNav menu, but
// always visible (no toggle) and styled for the side-nav narrower
// container. Hardcoded inline rather than reused from FloatingNav to
// keep that shared component frozen.
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

export default function DevHomePage() {
  return (
    <div className="desktop-experiment">
      <FloatingNav />
      {/* DEV SIDE NAV — only visible at >=1200px via the
          .dev-side-nav rules in globals.css. Below that gate it's
          `display: none`. The existing FloatingNav stays the
          navigation surface at <1200px (mobile + tablet); at >=1200
          FloatingNav is also hidden via CSS and this aside takes
          over. Both elements render unconditionally — gating happens
          purely in CSS so React state is untouched. */}
      <aside aria-label="Site navigation (desktop)" className="dev-side-nav">
        <Link href="/" aria-label="alderman.ai" className="dev-side-nav-logo-link">
          <img
            src="/brand-assets/logos/alderman-ai-stacked-logo-v1.svg"
            alt=""
            aria-hidden
            className="dev-side-nav-logo block"
          />
        </Link>
        <div className="dev-side-nav-menu">
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
        <HeroSection />
        <WhatYouGetSection />
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
                boxShadow: [
                  '1px 1px 0 0 rgba(117, 113, 94, 0.40)',
                  '6px 10px 32px rgba(253, 151, 31, 0.28)',
                  '28px 38px 80px rgba(0, 0, 0, 0.50)',
                ].join(', '),
              }}
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
    </div>
  )
}
