import type { ReactNode } from 'react'

/**
 * PageFrame — the outer page shell.
 *
 * Default behavior: column caps at 400px max-w centered at every
 * viewport (the mobile-locked spec from PLAN.md "Desktop = mobile at
 * 400px"). Below 400px the cap is a no-op and the column fills the
 * viewport; above 400px the column locks to 400px and centers on the
 * IDE substrate.
 *
 * Opt-in `desktopExpanded`: bumps the column to 540px at tablet
 * (≥768px), leaving mobile untouched. Used by the homepage dev
 * sandbox (`/dev/home-page`) as the desktop testing ground. When the
 * experiment proves out, other pages can opt in too.
 *
 * Two nested divs by design: the outer column applies max-width +
 * mx-auto so its OWN width becomes the cap once the viewport passes
 * the cap; the inner div applies the 12% gutter padding. Percentage
 * padding in CSS computes against the containing block (the immediate
 * parent), so this nesting forces the 12% to resolve against the
 * column rather than the full viewport.
 */
export function PageFrame({
  children,
  desktopExpanded = false,
}: {
  children: ReactNode
  desktopExpanded?: boolean
}) {
  // The `desktop-expanded` class scopes the `--font-terminal` CSS
  // var bump (mobile 22px → tablet 30px) to opted-in pages — so
  // every TerminalLine inside reads the bigger size at tablet+
  // without touching pages that stay mobile-locked. See globals.css.
  //
  // Desktop layout (when `desktopExpanded` is on): column widens to
  // 540 and the 12% interior gutter is dropped at tablet+. The 540
  // is the brand-loud canvas — H1 + terminal lines fill it (1.35×
  // bump). Paper-apps + CTAs cap themselves at mobile-size (304)
  // and center inside the 540, so the column bleed-zones around each
  // read as gutter space. Post-its drift outward naturally because
  // they're anchored at the paper-app horizontal center.
  // 1px muted vertical rules 5px outside the column on each side at
  // tablet+ — they demarcate the column from the surrounding IDE-2
  // gutter while preserving a small breathing buffer between the
  // content edge and the rule line. Pseudo-elements (rather than
  // border) so the column's 540px content width stays exact and the
  // rule sits OUTSIDE the box, in the gutter, not on the box edge.
  // `left:-6px` / `right:-6px` = 5px gap + 1px rule width.
  // `z-0` here establishes a stacking context on the column, so
  // `GutterGlow` can sit at `z-[-1]` BEHIND both the ::before/::after
  // rule lines. Without the stacking context, a negative z-index would
  // sink below the column entirely. With it, the painting order inside
  // the column becomes: glow (z=-1) → in-flow content → ::before/::after
  // (positioned z-auto) → positive z-index (e.g. hero post-it). Result:
  // both rule lines paint OVER the glow's band uniformly on left and
  // right, regardless of DOM tree order.
  const colClass = desktopExpanded
    ? [
        'desktop-expanded relative z-0 mx-auto max-w-[400px] tablet:max-w-[550px]',
        "tablet:before:content-[''] tablet:before:absolute tablet:before:top-0 tablet:before:bottom-0 tablet:before:left-[-1px] tablet:before:w-px tablet:before:bg-ide-rule",
        "tablet:after:content-[''] tablet:after:absolute tablet:after:top-0 tablet:after:bottom-0 tablet:after:right-[-1px] tablet:after:w-px tablet:after:bg-ide-rule",
      ].join(' ')
    : 'mx-auto max-w-[400px]'
  // Mobile keeps the 12% interior gutter. At desktop, gutter drops
  // so the 540 column itself becomes the widest visual boundary
  // (H1 + terminal lines fill it). Narrower elements (paper-apps,
  // CTAs) apply their own caps inside.
  const innerClass = desktopExpanded
    ? 'px-[var(--gutter-mobile)] tablet:px-0'
    : 'px-[var(--gutter-mobile)]'
  return (
    <div className="min-h-screen bg-ide-2">
      <div className={colClass}>
        <div className={innerClass}>
          {children}
        </div>
      </div>
    </div>
  )
}
