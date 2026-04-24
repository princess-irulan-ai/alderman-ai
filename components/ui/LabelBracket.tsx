/**
 * LabelBracket — `[ label ]` purple mono label.
 *
 * Per ss3: small bracketed label that sits above a sub-block heading
 * inside paper apps. Brackets and label both render in ide-fg-mute /
 * ink-faint depending on substrate; default is paper substrate so we
 * use ink-faint with the brackets in a slightly darker ink-soft.
 *
 * Pure structural marker — not the same as PlaceholderChip (which flags
 * "no copy yet"). LabelBracket stays in production as a layout signal.
 */
type LabelBracketProps = {
  children: React.ReactNode
  className?: string
}

export function LabelBracket({ children, className = '' }: LabelBracketProps) {
  return (
    <span
      className={`font-mono text-[12px] text-ink-faint tracking-tight ${className}`}
    >
      <span className="text-ink-soft">[ </span>
      {children}
      <span className="text-ink-soft"> ]</span>
    </span>
  )
}
