import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * PrimaryButton — the locked [>_] talk-to-a-HUMAN style.
 *
 * Dark fill, mono type, purple ">_" prefix. Carry-forward from prior live
 * site per Alex's note that this token is locked.
 */
type PrimaryButtonProps = {
  href?: string
  children: ReactNode
  onClick?: () => void
}

export function PrimaryButton({ href, children, onClick }: PrimaryButtonProps) {
  const body = (
    <span className="inline-flex items-center gap-2.5 border border-orange px-4 py-2.5 font-mono text-[13px] font-medium text-ide-fg transition hover:bg-orange/10">
      <span className="text-purple">&gt;_</span>
      <span>{children}</span>
    </span>
  )
  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {body}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick}>
      {body}
    </button>
  )
}
