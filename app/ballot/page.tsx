import Link from 'next/link'

/**
 * /ballot — index for the paper-register enrichment ballot
 * (rebuild-t1t2, 2026-06-11). Three rendered directions of the same
 * rebuilt homepage, conservative → bolder. Phone-reviewable: open each,
 * scroll the paper surfaces, pick by looking. Throwaway route — delete
 * with the /ballot/* directions after the pick.
 */
export const metadata = {
  title: 'paper-register ballot',
  robots: { index: false, follow: false },
}

const DIRECTIONS = [
  {
    href: '/ballot/a',
    label: 'a — ruled paper',
    detail:
      'conservative. Barlow only — bigger headings, ruled underlines, deeper ink.',
  },
  {
    href: '/ballot/b',
    label: 'b — condensed editorial',
    detail:
      'middle. Barlow Semi Condensed display voice — same family, new posture.',
  },
  {
    href: '/ballot/c',
    label: 'c — serif display',
    detail:
      'boldest. Fraunces serif for paper headings — a distinct paper identity.',
  },
]

export default function BallotIndex() {
  return (
    <main className="min-h-screen bg-ide-2 px-[12%] py-16">
      <h1 className="font-mono text-[22px] text-ide-fg lowercase mb-2">
        paper-register ballot
      </h1>
      <p className="font-mono text-[14px] text-ide-fg-dim lowercase mb-10">
        same homepage, three paper treatments. pick by looking.
      </p>
      <ul className="space-y-8">
        {DIRECTIONS.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="font-mono text-[20px] text-purple hover:text-orange"
            >
              {d.label}
            </Link>
            <p className="font-mono text-[14px] text-ide-fg-mute mt-1">
              {d.detail}
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}
