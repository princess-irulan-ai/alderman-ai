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
        {/* left 1/6 margin — IDE substrate */}
        <div aria-hidden />
        {/* 4/6 content canvas */}
        <div className="col-span-4">{children}</div>
        {/* right 1/6 margin — IDE substrate */}
        <div aria-hidden />
      </div>
    </div>
  )
}
