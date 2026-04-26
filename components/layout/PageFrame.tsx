import type { ReactNode } from 'react'

/**
 * PageFrame — the outer page shell.
 *
 * Implements the locked 6-column page grid from os-model-concept.md:
 *   | 1/6 margin | 4/6 content canvas | 1/6 margin |
 *
 * Everything visible lives in the 4/6 canvas. The 1/6 margins on each side
 * are pure IDE substrate — nothing ever bleeds to the page edge.
 *
 * Spec: os-model-concept.md "Page grid (locked)"
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ide-2">
      <div className="grid grid-cols-page">
        {/* left 1/6 margin — IDE substrate. Hidden below md; the locked
            6-col page grid only applies from tablet up. On mobile the
            content canvas is full-width with a proportional gutter
            (`--gutter-mobile`, defined in globals.css). */}
        <div aria-hidden className="hidden md:block" />
        {/* Content canvas — full width on mobile with G (gutter-mobile)
            on each side; middle 4/6 of the locked page grid from md up.
            G is the single key metric that defines mobile alignment;
            change `--gutter-mobile` in globals.css to adjust. */}
        <div className="col-span-6 px-[var(--gutter-mobile)] md:col-span-4 md:px-0">{children}</div>
        <div aria-hidden className="hidden md:block" />
      </div>
    </div>
  )
}
