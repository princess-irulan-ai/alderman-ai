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
 * Opt-in `desktopExpanded`: bumps the column to 520px at md (≥768px),
 * leaving mobile untouched. Used by the homepage as the desktop
 * testing ground (2026-05-06). When the experiment proves out, other
 * pages can opt in too.
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
  // var bump (mobile 22px → tablet 28.6px) to opted-in pages — so
  // every TerminalLine inside reads the bigger size at md+ without
  // touching pages that stay mobile-locked. See globals.css.
  //
  // Desktop layout (when `desktopExpanded` is on): column widens to
  // 660 and the 12% interior gutter is dropped at tablet+. The 660
  // becomes the H1 canvas (H1 fills it). Terminals + paper-apps +
  // CTAs apply their own caps inside the 660 (520 / 304 today),
  // centered, so the column bleed-zones around each become a
  // consistent visual gutter.
  const colClass = desktopExpanded
    ? 'desktop-expanded mx-auto max-w-[400px] tablet:max-w-[700px]'
    : 'mx-auto max-w-[400px]'
  // Mobile keeps the 12% interior gutter. At desktop home, the
  // gutter drops so the 700 column itself becomes the widest visual
  // boundary (nav + H1 fill it). Narrower elements (terminal,
  // paper-apps, CTAs) apply their own caps inside.
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
