import type { ReactNode } from 'react'

/**
 * PageFrame — the outer page shell.
 *
 * Column caps at 400px max-w centered at every viewport. Below 400px
 * the cap is a no-op and the column fills the viewport; above 400px
 * the column locks to 400px and centers on the IDE substrate. So
 * mobile (≤400px) = full-width canvas with G (`--gutter-mobile`) each
 * side; desktop (>400px) = 400px centered column with the same 12%
 * interior gutter. Type sizes, post-it scaling, paper-app width all
 * use mobile values — desktop is the mobile stack centered on the IDE
 * substrate, no per-component md: variants for visual size.
 *
 * Two nested divs by design: the outer column applies max-width +
 * mx-auto so its OWN width becomes 400 once the viewport passes 400px;
 * the inner div applies the 12% gutter padding. Percentage padding in
 * CSS computes against the containing block (the immediate parent),
 * so this nesting forces the 12% to resolve against the 400px column
 * rather than the full viewport (which would over-pad and collapse
 * the content area at wide viewports).
 *
 * Spec: PLAN.md "Desktop = mobile at 400px (locked + implemented
 * 2026-05-04, session 29)".
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ide-2">
      <div className="mx-auto max-w-[400px]">
        <div className="px-[var(--gutter-mobile)]">
          {children}
        </div>
      </div>
    </div>
  )
}
