/**
 * PlaceholderChip — small dashed-border mono pill.
 *
 * Per ss2/ss3/ss4: rendered above each copy block as a visible reminder
 * that the body is structural placeholder, not production copy. Removed
 * once Alex writes the real copy in Phase 5.
 *
 * Live on paper substrate (ink-soft text, ink-faint dashed border).
 */
type PlaceholderChipProps = {
  children?: React.ReactNode
  className?: string
}

export function PlaceholderChip({
  children = 'PLACEHOLDER',
  className = '',
}: PlaceholderChipProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 border border-dashed border-ink-faint text-ink-soft font-mono text-[11px] tracking-wider uppercase ${className}`}
    >
      {children}
    </span>
  )
}
