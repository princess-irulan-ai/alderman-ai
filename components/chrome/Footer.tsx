import Image from 'next/image'
import Link from 'next/link'

/**
 * Footer — thin IDE-substrate footer strip.
 *
 * Mobile (<md): centered stacked logo only. No tagline, no copyright —
 * the holding page carries no meta chrome on mobile per Alex 2026-04-24.
 *
 * Desktop (md+): per ss5, three columns inside the page canvas.
 *   left   — alderman.ai stacked mark (links to /)
 *   center — brand tagline slot (placeholder, Alex writes)
 *   right  — © + year + " · still HUMAN" meta
 *
 * Uses the page's 6-col grid — desktop content sits in the middle 4/6 to
 * match the rest of the site. Low-contrast (ide-fg-mute) so it reads as
 * chrome, not a content section.
 */
export function Footer() {
  return (
    <footer className="border-t border-ide-rule">
      {/* Mobile: alex | logo | 2026.
          Alignment math (for the 140px stacked-logo render):
            - SVG viewBox is 249.75 x 379.5 with empty padding around
              the visible glyphs. At 140px tall, the visible glyphs
              occupy y=33 to y=119 (measured via SVG path bboxes).
            - "alex" text top aligns to visible-logo TOP -> 33px
              top margin.
            - "2026" text bottom aligns to visible-logo BOTTOM -> 21px
              bottom margin (140 - 119 = 21).
          `items-start` on the row anchors all three children to the
          top of the row; `self-end` on 2026 overrides to bottom-anchor
          so the bottom-margin offset reads from the row's bottom edge
          (which equals the logo's bottom edge since the logo is the
          tallest child). */}
      <div className="flex items-start justify-center gap-3 py-10 md:hidden">
        <span
          className="font-mono text-[14px] text-paper lowercase"
          style={{ marginTop: '33px' }}
        >
          © alex
        </span>
        <Link href="/" aria-label="alderman.ai home">
          <Image
            src="/brand-assets/logos/alderman-ai-stacked-logo-v1.svg"
            alt="alderman.ai"
            width={90}
            height={138}
            className="h-[140px] w-auto"
          />
        </Link>
        <span
          className="font-mono text-[14px] text-paper self-end"
          style={{ marginBottom: '21px' }}
        >
          2026
        </span>
      </div>
      {/* Desktop: 3-column chrome inside the page canvas. */}
      <div className="hidden md:grid md:grid-cols-page md:py-8">
        <div aria-hidden />
        <div className="col-span-4 grid grid-cols-3 items-center gap-6">
          <div className="flex items-center">
            <Link href="/" aria-label="alderman.ai home">
              <Image
                src="/brand-assets/logos/alderman-ai-stacked-logo-v1.svg"
                alt="alderman.ai"
                width={36}
                height={55}
                className="h-[48px] w-auto"
              />
            </Link>
          </div>
          <div className="text-center font-mono text-[12px] text-ide-fg-mute">
            [ tagline slot — enabling <span className="text-green">ai</span> value with{' '}
            <span className="text-orange">HUMAN</span> values ]
          </div>
          <div className="text-right font-mono text-[12px] text-ide-fg-mute">
            © 2026 · still <span className="text-orange">HUMAN</span>
          </div>
        </div>
        <div aria-hidden />
      </div>
    </footer>
  )
}
