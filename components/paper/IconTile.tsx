import type { ReactNode } from 'react'

/**
 * IconTile — IDE-dark rounded square with a centered glyph.
 *
 * Used inside the hero paper app (mock example.job Benefits page) to give
 * the impression of a real careers / benefits product UI. Glyph is rendered
 * as text/string content (emoji, Unicode, or a single character) — keeps
 * the frame light and copy-editable later.
 *
 * Spec: ss1 reference — small dark square (≈54px), purple-tinted icon,
 * paired with a bold ink label and a soft ink sub-label below.
 */
type IconTileProps = {
  glyph: ReactNode
  label: string
  sub?: string
  className?: string
}

export function IconTile({ glyph, label, sub, className = '' }: IconTileProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex h-[54px] w-[54px] items-center justify-center rounded-tile bg-ide text-purple text-[22px]">
        {glyph}
      </div>
      <div className="font-display text-[15px] font-semibold text-ink leading-tight">
        {label}
      </div>
      {sub && (
        <div className="font-body text-[13px] text-ink-soft leading-snug">
          {sub}
        </div>
      )}
    </div>
  )
}
