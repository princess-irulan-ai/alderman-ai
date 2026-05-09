import Image from 'next/image'
import Link from 'next/link'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /dev/about — desktop port of canonical /about against desktop-spec.md.
 *
 * Mobile JSX mirrors canonical /about (same imports, same prop-shapes,
 * identical mobile render). Differences from canonical, all desktop-only:
 *
 *   1. `desktop-spec route-about` outer marker so the .desktop-
 *      experiment CSS scope kicks in at ≥768px.
 *   2. Side-nav <aside class="side-nav"> block — replaces FloatingNav
 *      at ≥1200px (FloatingNav hidden via CSS at that tier).
 *   3. Terminal seams converted from the older `relative + absolute
 *      inset-0` ghost pattern to the `.grid + col-start-1 row-start-1`
 *      pattern — same visual at mobile, but `.grid` is the selector the
 *      gutter-glow rule hooks into.
 *   4. H1 ends with a purple period (homepage canon — every page H1).
 *   5. Headshot wrapper carries `hero-paper` class — used by CSS to
 *      right-overhang the paper-app at ≥768 (mirrors homepage hero
 *      paper-app's right-gutter overhang).
 *   6. Both IDE CTAs carry `tile-right-edge` — right-overhang into the
 *      right gutter at ≥768.
 *
 * Compositional rhythm (C, R, L, R, C, R, L, C):
 *   1. H1 (3 hard-broken lines) — CENTER
 *   2. Headshot paper-app — RIGHT (overhangs)
 *   3. Terminal seam "working with ai since before chatgpt" — LEFT
 *   4. Dark CTA "let's chat / book an intro call" → /contact — RIGHT
 *   5. Wide paper-app "8 years teaching English to Czechs" — CENTER
 *   6. Dark CTA "have questions? / learn how this works" → /faq — RIGHT
 *   7. Big pullquote "learning new things can be a little scary..." — LEFT
 *   8. Closing wide paper-app + nested App-variant CTA — CENTER
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
    gradient:
      'linear-gradient(to top right, rgba(174, 129, 255, 0.65) 0%, rgba(174, 129, 255, 0.30) 25%, transparent 75%)',
    hover:
      'hover:border-purple/60 hover:shadow-[0_0_28px_rgba(174,129,255,0.45)]',
  },
] as const

export default function AboutPage() {
  return (
    <div className="desktop-spec route-about">
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

        {/* HERO — H1 (3 lines, purple period) + headshot paper-app
            (right-overhang at desktop via hero-paper). */}
        <section className="flex flex-col gap-8 pt-4 pb-8">
          <div>
            <h1 className="font-display text-[37px] font-bold leading-[1.05] tracking-display-tight text-ide-fg text-center mb-10">
              alex alderman<span className="text-purple">:</span>
              <br />
              <span className="text-green">ai</span> expert and
              <br />
              20yr <span className="text-orange">TEACHER</span>
              <span className="text-paper">.</span>
            </h1>
          </div>

          {/* Headshot paper-app. `hero-paper` is the desktop hook —
              CSS caps to 304 + right-overhangs the right gutter by
              gutter-extension at ≥768px. Below 768 the class is inert. */}
          <div className="relative hero-paper">
            <PaperApp width="narrow" bodyClassName="">
              <div className="relative">
                <Image
                  src="/brand-assets/photography/alex-headshot-full-v1.jpg"
                  alt="Alex Alderman"
                  width={1200}
                  height={1823}
                  className="block h-auto w-full"
                  priority
                />
                <div className="absolute bottom-[20px] right-[20px] flex items-end gap-0">
                  <span
                    className="font-mono lowercase text-white leading-none"
                    style={{ fontSize: '16px', marginBottom: '9px' }}
                  >
                    hi, I&apos;m alex
                  </span>
                  <img
                    src="/brand-assets/logos/alderman-ai-stacked-logo-v1.svg"
                    alt=""
                    aria-hidden
                    className="h-[76px] w-[76px]"
                  />
                </div>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* TERMINAL SEAM — career anchor. Ported to .grid pattern so the
            gutter-glow rule fires at desktop. Ghost matches canonical's
            text-only approach (no cursor span) — canonical /about's
            terminal seam doesn't use persistCursor, so the live's final
            state has no trailing cursor and the ghost reserves only
            text height. Comma in purple per punctuation tic. */}
        <section className="pt-8 pb-8 md:pt-10 md:pb-10">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                {'working with ai since before chatgpt, and teaching and training for over 20 YEARS'}
              </span>
            </div>
            <div className="col-start-1 row-start-1">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                align="left"
                segments={[
                  { text: 'working with ' },
                  { text: 'ai', color: 'text-green' },
                  { text: ' since before chatgpt' },
                  { text: ',', color: 'text-purple' },
                  { text: ' and teaching and training for over ' },
                  { text: '20 YEARS', color: 'text-orange' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA1 — "let's chat / book an intro call" → /contact.
            RIGHT-overhang via tile-right-edge. */}
        <section className="pt-8 pb-8 md:pt-10 md:pb-10">
          <SectionTile
            variant="ide"
            accent="purple"
            eyebrow={
              <>
                let<span className="text-purple">&apos;</span>s chat
              </>
            }
            title="book an intro call"
            href="/contact"
            markerStyle="contained"
            className="tile-right-edge"
          />
        </section>

        {/* LEAD BEAT — wide centered PaperApp, 8 years ESL anchor. */}
        <section className="pt-8 pb-8 md:pt-10 md:pb-10">
          <PaperApp width="wide">
            <div className="space-y-5 md:space-y-6 py-2">
              {/* H2 — desktop-only hard breaks for shape control +
                  lead-h2 hook that drops the 28→35px desktop bump
                  to 30px. At 35px the middle segment ("teaching
                  English") measures 245px in the 240px-capped
                  paper-app body and wraps to a 4th line; 30px lands
                  all three at <240px so the explicit <br/>s
                  produce exactly 3 lines.
                  Mobile keeps canonical's natural-wrap rendering —
                  the <br/>s carry `hidden md:inline` so they
                  `display: none` below 768 and the H2 reads as one
                  flat string ("8 years teaching English to Czechs")
                  that wraps to 2 lines naturally inside the mobile
                  paper-app, matching canonical /about. */}
              <h2 className="lead-h2 font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                Teaching EN to
                <br className="hidden md:inline" />
                {' '}Czechs for 8 Years
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                Modern ai is built on a principle called natural
                <br />
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-orange/55"
                  />
                  <span className="relative text-ink">language processing</span>
                </span>
                .
              </p>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                And there&apos;s a difference between just a native speaker and a certified
                <br />
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-orange/55"
                  />
                  <span className="relative text-ink">language instructor</span>
                </span>
                .
              </p>
            </div>
          </PaperApp>
        </section>

        {/* CTA2 — "have questions? / learn how this works" → /faq.
            RIGHT-overhang via tile-right-edge. */}
        <section className="pt-8 pb-8 md:pt-10 md:pb-10">
          <SectionTile
            variant="ide"
            accent="purple"
            eyebrow="have questions?"
            title="learn how this works"
            href="/faq"
            markerStyle="contained"
            className="tile-right-edge"
          />
        </section>

        {/* THE BIG PULLQUOTE — locked anchor line, hero-scale.
            LEFT (hangingPrompt) — terminal voice. Ported to .grid pattern. */}
        <section className="py-8 md:py-10">
          <div className="grid">
            <div
              aria-hidden
              className="col-start-1 row-start-1 font-mono flex items-baseline justify-start text-left invisible"
              style={{ fontSize: 22 }}
            >
              <span>
                {"learning new things can be a little scary but i've found a fun and HUMAN approach that helps "}
                <span className="inline-block">_</span>
              </span>
            </div>
            <div className="col-start-1 row-start-1">
              <TerminalLine
                hangingPrompt
                showBrackets={false}
                persistCursor
                align="left"
                segments={[
                  { text: 'learning new things can be a little ' },
                  { text: 'scary', color: 'text-green' },
                  { text: " but i've found a fun and " },
                  { text: 'HUMAN', color: 'text-orange' },
                  { text: ' approach that helps' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* CLOSING — demo-lesson invitation, wide paper-app + nested
            App-variant SectionTile. CENTER. */}
        <section className="pt-8 pb-16 md:pt-10 md:pb-20">
          <PaperApp width="wide">
            <div className="space-y-5 md:space-y-6 py-2">
              <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
                See my teaching style in action
              </h2>
              <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
                Sign up for a{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                  />
                  <span className="relative text-ink">free demo</span>
                </span>{' '}
                lesson with me, either 1:1 or join in on an existing group.
              </p>
              <div className="pt-6 md:pt-8">
                <SectionTile
                  variant="app"
                  accent="orange"
                  eyebrow="next step"
                  title="Book Demo Lesson"
                  href="/contact"
                  markerStyle="contained"
                />
              </div>
            </div>
          </PaperApp>
        </section>
      </PageFrame>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: 'about your instructor — alderman.ai',
}
