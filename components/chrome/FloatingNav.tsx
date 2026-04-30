'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Wordmark } from '@/components/chrome/Wordmark'
import { TerminalCTA } from '@/components/ui/TerminalCTA'

/**
 * FloatingNav — the fixed top nav.
 *
 * Sits above scroll. Logo on the left, menu items on the right.
 *
 * Layout (2026-04-26 pass):
 *   - Desktop (md+): `faq | about me | [talk to a HUMAN]` — three items
 *     separated by muted `|` pipes between them. CTA still bracketed and
 *     bracket-blinking.
 *   - Mobile (<md): `[talk to a HUMAN] [☰]` — CTA stays visible
 *     alongside a hamburger. The hamburger reveals a slide-down panel
 *     containing the secondary items (faq + about me). CTA is excluded
 *     from the hamburger because it's already visible outside it.
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
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Header row carries the IDE-substrate background. Pulled
          OUT of the parent <nav> so the slide-down panel below
          doesn't double up on the bg-ide/90 (two 90%-opacity layers
          stack to ~99% opacity, killing the see-through). The
          panel now sits over the live page content directly. */}
      <div className="grid grid-cols-page bg-ide/90">
        <div aria-hidden className="hidden md:block" />
        <div className="col-span-6 flex items-center justify-between px-4 py-[2px] md:col-span-4 md:px-0 md:py-6">
          <Link
            href="/"
            onClick={(e) => {
              // Same-route guard: if we're already on `/`, don't let the
              // logo click trigger a soft navigation. Without this, Next
              // re-renders the page on click, re-mounting the terminal
              // lines and resetting their typing animations from idle.
              if (pathname === '/') {
                e.preventDefault()
              }
            }}
            className="flex items-center"
            aria-label="alderman.ai"
          >
            {/* Mobile: stacked-logo SVG. Sized 76px so the logo reads as
                the dominant brand anchor on mobile. */}
            <img
              src="/brand-assets/logos/alderman-ai-stacked-logo-v1.svg"
              alt=""
              aria-hidden
              className="block h-[76px] w-[76px] md:hidden"
            />
            {/* Desktop: text wordmark sized to 16px — ~80% of the nav
                CTA's 20px, so it reads as a quieter sibling to the
                primary action on the right. */}
            <span className="hidden md:inline">
              <Wordmark size={16} />
            </span>
          </Link>

          {/* DESKTOP RIGHT GROUP: faq | about your instructor | [CTA]
              Pipes go between items, not around the CTA. Hidden on
              mobile — mobile uses a separate flex group with CTA +
              hamburger instead. */}
          <div className="hidden md:flex items-center gap-6">
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
              about your <span className="text-orange">instructor</span>
            </Link>
            {pipe}
            {cta(20)}
          </div>

          {/* MOBILE RIGHT GROUP: [CTA] [☰]
              CTA stays visible outside the hamburger because it's the
              primary action; the hamburger only houses the secondary
              menu items (faq + about me). Hidden on desktop. */}
          <div className="md:hidden flex items-center gap-3">
            {cta(14)}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 -mr-2 text-purple hover:text-paper transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                {menuOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        <div aria-hidden className="hidden md:block" />
      </div>

      {/* MOBILE SLIDE-DOWN PANEL — secondary menu items.
          Sits below the nav row, full bleed across the IDE substrate,
          padded to align with the page-padding gutter G. Each link
          mirrors the desktop styling (paper-white default, purple on
          hover, lowercase). Tapping a link closes the panel. */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-ide/85 border-t border-ide-rule"
        >
          <div className="grid grid-cols-page">
            <div className="col-span-6 px-[var(--gutter-mobile)] py-6 flex flex-col gap-5">
              <Link
                href="/faq"
                onClick={() => setMenuOpen(false)}
                className="font-mono text-[18px] lowercase transition-colors hover:opacity-80"
              >
                <span className="text-paper">faq</span>
                <span className="text-purple"> / </span>
                <span className="text-paper">pricing</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="font-mono text-[18px] text-purple hover:text-paper transition-colors lowercase"
              >
                about <span className="text-paper">your</span>{' '}
                <span className="text-orange">instructor</span>
              </Link>
              {/* talk-to-a-HUMAN was previously mirrored here; dropped
                  2026-04-26 per Alex — it's already visible in the main
                  bar alongside the hamburger, so duplicating it inside
                  the panel was redundant. */}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
