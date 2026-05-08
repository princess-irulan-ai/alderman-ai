import Image from 'next/image'
import Link from 'next/link'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { Postit } from '@/components/special/Postit'
import { SectionTile } from '@/components/special/SectionTile'

/**
 * /contact — canonical, promoted from /dev/contact.
 *
 * Mobile JSX matches the prior canonical /contact; differences are
 * desktop-only and gated by `.desktop-experiment` + media queries:
 *
 *   1. `desktop-experiment dev-contact` outer marker (the dev-* class
 *      naming is shared with the other promoted pages and will rename
 *      site-wide in the marker-class sweep).
 *   2. Side-nav <aside class="dev-side-nav"> block — replaces FloatingNav
 *      at >=1200. /contact filtered out of SIDE_NAV_ITEMS (current route).
 *   3. H1 closing period in purple — cross-page brand tic per
 *      desktop-spec.md.
 *   4. Email IDE SectionTile gains `tile-right-edge` for right-gutter
 *      overhang at desktop, matching /about's IDE CTA pattern.
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
    href: '/about',
    label: 'About Me',
    gradient:
      'linear-gradient(to top right, rgba(253, 151, 31, 0.65) 0%, rgba(253, 151, 31, 0.30) 25%, transparent 75%)',
    hover:
      'hover:border-orange/60 hover:shadow-[0_0_28px_rgba(253,151,31,0.45)]',
  },
] as const

export default function ContactPage() {
  return (
    <div className="desktop-experiment dev-contact">
      <FloatingNav />
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
        <section className="pt-4 pb-12 md:pt-8 md:pb-16">
          <h1 className="text-center font-display text-[40px] font-bold leading-[1.05] tracking-display-tight text-ide-fg">
            in the age of <span className="text-green">ai</span> it can be nice to talk to a <span className="text-orange">HUMAN</span><span className="text-purple">.</span>
          </h1>
        </section>

        <section className="pt-8 pb-[138px] md:pt-10 md:pb-[170px]">
          <div className="relative">
            <PaperApp width="wide">
              <div className="space-y-4 md:space-y-5 py-2">
                <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                  Get in touch any way you&apos;d like
                </h2>
                <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                  <span className="relative inline-block">
                    <span
                      aria-hidden
                      className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                    />
                    <span className="relative">Book a demo</span>
                  </span>
                  {' '}lesson, ask a question, or just introduce yourself!
                </p>
                <SectionTile
                  variant="app"
                  accent="orange"
                  eyebrow="Book a call"
                  href="https://cal.com/alex-the-ai-instructor/30m"
                  title="Let's have a chat"
                  markerStyle="contained"
                  className="!mt-10 md:!mt-12"
                />
                <div className="h-[55px]" aria-hidden />
              </div>
            </PaperApp>
            <Postit
              overhang="br"
              anchorTop={390}
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
        </section>

        <section className="grid grid-cols-canvas gap-6 pt-4 pb-8 md:pt-6 md:pb-10">
          <div className="col-span-3">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow={
                <>
                  <span className="text-orange">alex</span>
                  <span className="text-purple">@</span>
                  <span className="text-paper">alder</span>
                  <span className="text-orange">man</span>
                  <span className="text-purple">.</span>
                  <span className="text-green">ai</span>
                </>
              }
              title="or send me an email"
              href="mailto:alex@alderman.ai"
              markerStyle="contained"
              className="tile-right-edge"
            />
          </div>
        </section>

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

        <section className="pt-8 pb-8 md:pt-12 md:pb-10">
          <PaperApp width="wide">
            <div className="space-y-4 md:space-y-5 py-2">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Not ready to chat?
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                Just{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                  />
                  <span className="relative">follow me</span>
                </span>
                {' '}on LinkedIn for more information.
              </p>
              <SectionTile
                variant="app"
                accent="orange"
                eyebrow="Follow me"
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
                className="!mt-10 md:!mt-12"
              />
            </div>
          </PaperApp>
        </section>
      </PageFrame>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: 'contact — alderman.ai',
}
