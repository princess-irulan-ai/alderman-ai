import Image from 'next/image'
import Link from 'next/link'

/**
 * Footer — thin IDE-substrate footer strip.
 *
 * Per ss5: three columns inside the page canvas.
 *   left   — alderman.ai stacked mark (links to /)
 *   center — brand tagline slot (placeholder, Alex writes)
 *   right  — © + year + " · still HUMAN" meta
 *
 * Uses the page's 6-col grid — content sits in the middle 4/6 to match the
 * rest of the site. Low-contrast (ide-fg-mute) so it reads as chrome, not
 * a content section.
 */
export function Footer() {
  return (
    <footer className="border-t border-ide-rule">
      <div className="grid grid-cols-page py-8">
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
