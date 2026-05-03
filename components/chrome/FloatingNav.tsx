'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Wordmark } from '@/components/chrome/Wordmark'
import { PaperApp } from '@/components/paper/PaperApp'
import { TerminalCTA } from '@/components/ui/TerminalCTA'

/**
 * FloatingNav — the fixed top nav.
 *
 * Sits above scroll. Logo on the left, menu items on the right.
 *
 * Layout (2026-04-30 pass):
 *   - Desktop (md+): `[wordmark]  ............  faq | about me | [talk to a HUMAN]`
 *     — wordmark left, three secondary items right with muted `|` pipes
 *     between them. CTA still bracketed and bracket-blinking.
 *   - Mobile (<md): `[☰]  [talk to a HUMAN]  [stacked logo]` — three-up
 *     row, hamburger far left, CTA centered, stacked-logo far right.
 *     Hamburger reveals a slide-down panel containing the secondary
 *     items (faq + about me). CTA stays in the bar so it's always
 *     visible without opening the panel.
 *
 * Background: `bg-ide/90` — the IDE substrate colour at 90% opacity, so
 * the nav reads as a near-solid bar when paper apps sit under it. Kept
 * the final 10% of translucency so the edge under the bar still
 * whispers through, rather than slabbing flat onto the page.
 *
 * CTA: the nav uses `TerminalCTA` with `bracketBlink` so the orange
 * `[ ]` pulse continuously, `lowercase={false}` so `HUMAN` stays in its
 * brand-rule caps, `showPrompt={false}` so the leading `>_` is dropped,
 * and `!border-0` so the muted bordered frame is suppressed.
 *
 * Client component: we need useState for the mobile hamburger toggle.
 *
 * Spec: site-plan.md homepage block 1, os-model-concept.md "Navigation is
 * not chrome."
 */
export function FloatingNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close the mobile menu on Escape and when the viewport crosses up to
  // the desktop breakpoint (where the panel is hidden anyway, but
  // leaving `menuOpen` true would re-open it on resize back to mobile).
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    function handleResize() {
      if (window.matchMedia('(min-width: 1000px)').matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Lock body scroll when the full-bleed mobile menu is open so the
  // page underneath doesn't drift while the user is in the menu.
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [menuOpen])

  const cta = (fontSize: number) => (
    <TerminalCTA
      href="/contact"
      fontSize={fontSize}
      lowercase={false}
      bracketBlink
      showPrompt={false}
      className="!border-0"
      segments={[
        { text: 'talk to a ' },
        {
          text: 'HUMAN',
          color: 'text-orange',
          className: 'font-medium',
        },
      ]}
    />
  )

  // Pipe separator between non-CTA menu items on desktop. Muted ide-fg
  // colour so it reads as background chrome, not as a clickable item.
  const pipe = (
    <span
      aria-hidden
      className="font-mono text-[14px] text-ide-fg-mute select-none"
    >
      |
    </span>
  )

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Header row carries the IDE-substrate background. Pulled
          OUT of the parent <nav> so the slide-down panel below
          doesn't double up on the bg-ide/90 (two 90%-opacity layers
          stack to ~99% opacity, killing the see-through). The
          panel now sits over the live page content directly. */}
      <div className="grid grid-cols-page bg-ide/90">
        <div aria-hidden className="hidden md:block" />
        <div className="col-span-6 md:col-span-4">
          {/* MOBILE BAR: [stacked logo]  ............  [hamburger]
              Two-element bar: identity on the left, menu affordance on
              the right. Removed from DOM entirely when the menu is
              open — the menu paper-app takes over as the only thing
              on screen, with the logo migrating into the paper-app's
              body so the bar + paper-app feel like one unified
              surface rather than two stacked layers. */}
          {!menuOpen && (
            <div className="md:hidden flex items-center justify-between px-[var(--gutter-mobile)] py-[2px]">
              <Link
                href="/"
                onClick={(e) => {
                  if (pathname === '/') e.preventDefault()
                }}
                className="flex items-center"
                aria-label="alderman.ai"
              >
                <img
                  src="/brand-assets/logos/alderman-ai-stacked-logo-v1.svg"
                  alt=""
                  aria-hidden
                  className="block h-[76px] w-[76px] -ml-3"
                />
              </Link>

              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
                onClick={() => setMenuOpen(true)}
                className="text-purple hover:text-paper transition-colors"
              >
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </button>
            </div>
          )}

          {/* DESKTOP BAR: [wordmark] ............ faq | about | [CTA] */}
          <div className="hidden md:flex items-center justify-between py-6">
            <Link
              href="/"
              onClick={(e) => {
                // Same-route guard: if we're already on `/`, don't let the
                // logo click trigger a soft navigation. Without this, Next
                // re-renders the page on click, re-mounting the terminal
                // lines and resetting their typing animations from idle.
                if (pathname === '/') e.preventDefault()
              }}
              className="flex items-center"
              aria-label="alderman.ai"
            >
              <Wordmark size={16} />
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/faq"
                className="font-mono text-[14px] text-paper hover:text-purple transition-colors lowercase"
              >
                faq
              </Link>
              {pipe}
              <Link
                href="/about"
                className="font-mono text-[14px] text-paper hover:text-purple transition-colors lowercase"
              >
                about me
              </Link>
              {pipe}
              {cta(20)}
            </div>
          </div>
        </div>
        <div aria-hidden className="hidden md:block" />
      </div>

    </nav>

      {/* MOBILE PAPER-APP MENU + DIMMED BACKDROP.
          When ☰ is tapped, the nav bar disappears and a paper-app
          takes its place at the top of the viewport. The IDE-color
          backdrop at 80% opacity heavily dims the page below — the
          intent is that the paper-app is the only legible thing on
          screen, with an intense orange halo radiating out from it
          into the dark substrate. Tap outside the paper-app (on the
          dimmed backdrop) or tap any item to close.

          This menu paper-app is intentionally NOT styled like the
          page paper-apps:
            - empty chrome labels (just the dot chord — no filename)
            - paper-app font (`font-display`) at bold weight, title
              case (the rest of the page is lowercase IDE; the menu
              lives in paper-app dialect)
            - custom multi-layer orange glow via `paperStyle` —
              overrides the canonical `shadow-paper-glow` so this
              shadow does NOT propagate to the page paper-apps
            - 1/12 gutter (vs 1/6 for page paper-apps) so it reads as
              wider / more dominant
            - 50px from the top of the viewport for breathing room */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="md:hidden fixed inset-0 z-40 bg-ide/90 pt-[50px]"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="px-[8.333%]"
            onClick={(e) => e.stopPropagation()}
          >
            <PaperApp
              width="wide"
              chromeLeft=""
              chromeRight=""
              paperStyle={{
                boxShadow:
                  '0 0 25px 0 rgba(174,129,255,1), 0 0 400px 0 rgba(174,129,255,0.4)',
              }}
            >
              <nav className="flex flex-col gap-5 py-2">
                {/* Context-aware menu: shows the three pages that are
                    NOT the current one. Canonical order:
                      Home → Pricing/FAQ → About Me → Talk to a HUMAN
                    `pathname !== item.href` filters out whatever
                    route the user is currently on, so the menu always
                    surfaces three "elsewhere" destinations.

                    Per-item styling (not position-based):
                      - Talk to a HUMAN: purple gradient = primary CTA.
                      - All others: orange gradient = utility links.
                    On /contact (where Talk to a HUMAN is filtered out)
                    the menu shows three orange tiles with no primary
                    — the user is already at the conversion goal. */}
                {[
                  {
                    href: '/',
                    label: <>Homepage</>,
                    gradient:
                      'linear-gradient(to top right, rgba(253, 151, 31, 0.65) 0%, rgba(253, 151, 31, 0.30) 25%, transparent 75%)',
                    hover:
                      'hover:border-orange/60 hover:shadow-[0_0_28px_rgba(253,151,31,0.45)]',
                  },
                  {
                    href: '/faq',
                    label: <>Pricing / FAQ</>,
                    gradient:
                      'linear-gradient(to top right, rgba(253, 151, 31, 0.65) 0%, rgba(253, 151, 31, 0.30) 25%, transparent 75%)',
                    hover:
                      'hover:border-orange/60 hover:shadow-[0_0_28px_rgba(253,151,31,0.45)]',
                  },
                  {
                    href: '/about',
                    label: <>About Me</>,
                    gradient:
                      'linear-gradient(to top right, rgba(253, 151, 31, 0.65) 0%, rgba(253, 151, 31, 0.30) 25%, transparent 75%)',
                    hover:
                      'hover:border-orange/60 hover:shadow-[0_0_28px_rgba(253,151,31,0.45)]',
                  },
                  {
                    href: '/contact',
                    label: (
                      <>
                        Talk to a{' '}
                        <span className="uppercase text-orange">HUMAN</span>
                      </>
                    ),
                    // Purple gradient for the primary CTA — fixes the
                    // orange-on-orange contrast with `HUMAN`, and reads
                    // as the dominant choice against the orange-gradient
                    // siblings above.
                    gradient:
                      'linear-gradient(to top right, rgba(174, 129, 255, 0.65) 0%, rgba(174, 129, 255, 0.30) 25%, transparent 75%)',
                    hover:
                      'hover:border-purple/60 hover:shadow-[0_0_28px_rgba(174,129,255,0.45)]',
                  },
                ]
                  .filter((item) => item.href !== pathname)
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block w-full rounded-tile border-2 border-ink/15 ${item.hover} transition-[box-shadow,border-color] duration-200 pl-5 pr-5 py-2.5 font-display font-bold text-[22px] text-ink text-right`}
                      style={{ background: item.gradient }}
                    >
                      {item.label}
                    </Link>
                  ))}
              </nav>
            </PaperApp>
          </div>
        </div>
      )}
    </>
  )
}
