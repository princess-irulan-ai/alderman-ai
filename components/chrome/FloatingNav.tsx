'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PaperApp } from '@/components/paper/PaperApp'

/**
 * FloatingNav — the fixed top nav.
 *
 * Sits above scroll. Mobile-only layout at all breakpoints (locked
 * 2026-05-04): `[stacked logo]  ............  [hamburger]`. Hamburger
 * reveals a paper-app menu with the three "elsewhere" destinations.
 *
 * Desktop matches mobile by constraining the nav content to the same
 * 400px column as PageFrame so the logo/hamburger sit at the column
 * edges instead of floating off in the IDE substrate.
 *
 * Background: `bg-ide/90` — the IDE substrate colour at 90% opacity, so
 * the nav reads as a near-solid bar when paper apps sit under it. Kept
 * the final 10% of translucency so the edge under the bar still
 * whispers through, rather than slabbing flat onto the page.
 *
 * Client component: we need useState for the hamburger toggle.
 *
 * Spec: site-plan.md homepage block 1, os-model-concept.md "Navigation is
 * not chrome." Desktop strategy: PLAN.md "Desktop strategy 2026-05-04".
 */
export function FloatingNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close the menu on Escape.
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [])

  // Lock body scroll when the full-bleed menu is open so the page
  // underneath doesn't drift while the user is in the menu.
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [menuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-ide/90">
          {/* Column-constrained on desktop so the nav aligns with the
              page content column. Inner div carries the 12% gutter
              padding — same pattern as PageFrame. */}
          <div className="md:mx-auto md:max-w-[400px]">
            {/* Two-element bar: identity on the left, menu affordance on
                the right. Removed from DOM entirely when the menu is
                open — the menu paper-app takes over as the only thing
                on screen, with the logo migrating into the paper-app's
                body so the bar + paper-app feel like one unified
                surface rather than two stacked layers. */}
            {!menuOpen && (
              <div className="flex items-center justify-between px-[var(--gutter-mobile)] py-[2px]">
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
          </div>
        </div>
      </nav>

      {/* PAPER-APP MENU + DIMMED BACKDROP.
          When ☰ is tapped, the nav bar disappears and a paper-app
          takes its place at the top of the viewport. The IDE-color
          backdrop at 80% opacity heavily dims the page below — the
          intent is that the paper-app is the only legible thing on
          screen, with an intense orange halo radiating out from it
          into the dark substrate. Tap outside the paper-app (on the
          dimmed backdrop) or tap any item to close.

          On desktop, the menu paper-app is constrained to the same
          400px column as PageFrame so it visually anchors to the page
          content rather than spanning the viewport. */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 bg-ide/90 pt-[50px]"
          onClick={() => setMenuOpen(false)}
        >
          <div className="md:mx-auto md:max-w-[400px]">
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
        </div>
      )}
    </>
  )
}
