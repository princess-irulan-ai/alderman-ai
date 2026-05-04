import Image from 'next/image'
import Link from 'next/link'

/**
 * Footer — thin IDE-substrate footer strip.
 *
 * Mobile-only layout at all breakpoints (locked 2026-05-04, PLAN.md
 * "Desktop strategy"): centered stacked logo with `© alex` on the left
 * and `2026` on the right, plus a low-contrast trade-license line below.
 * The desktop 3-column layout was retired when desktop ported to a
 * uniform mobile-scale 400px column.
 */
export function Footer() {
  return (
    <footer className="border-t border-ide-rule">
      {/* alex | logo | 2026.
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
      <div className="flex items-start justify-center gap-3 py-5">
        <span
          className="font-mono text-[14px] text-paper lowercase"
          style={{ marginTop: '33px' }}
        >
          <span className="text-purple text-[20px] not-italic">©</span> alex
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
      {/* Trade license line — bottom chrome under the logo row.
          Centered, low-contrast; purple parens + orange HUMAN per
          brand chord. */}
      <div className="text-center font-mono text-[12px] text-ide-fg-mute pb-3 md:pb-4">
        <span className="text-purple">(</span>a <span className="text-orange">HUMAN</span> with a <span className="text-green">cz</span> trade license<span className="text-purple">)</span>
      </div>
    </footer>
  )
}
