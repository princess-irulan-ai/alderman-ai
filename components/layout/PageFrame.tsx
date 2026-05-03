import type { ReactNode } from 'react'

/**
 * PageFrame — the outer page shell.
 *
 * Mobile: full-width canvas with G (`--gutter-mobile`) on each side.
 * Desktop (≥1000px): 540px centered column on IDE substrate — uniform
 * scale-up of the mobile stack rather than per-component md: variants.
 *
 * Two nested divs by design: the outer column applies max-width + mx-auto
 * so its OWN width becomes 540 on desktop; the inner div applies the 12%
 * gutter padding. Percentage padding in CSS computes against the
 * containing block (the immediate parent), so this nesting forces the
 * 12% to resolve against the 540 column rather than the full viewport
 * (which would over-pad to ~334px each side at wide viewports and
 * collapse the content area to ~0).
 *
 * Spec: PLAN.md "Desktop strategy (locked 2026-05-04)".
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ide-2">
      <div className="md:mx-auto md:max-w-[400px]">
        <div className="px-[var(--gutter-mobile)]">
          {children}
        </div>
      </div>
    </div>
  )
}
