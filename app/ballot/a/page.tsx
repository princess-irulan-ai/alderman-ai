import HomePage from '../../page'

/**
 * /ballot/a — paper-register enrichment, Direction A: "ruled paper"
 * (conservative — no new fonts). The full homepage rendered under the
 * direction class; styling lives in globals.css §PAPER-REGISTER
 * ENRICHMENT BALLOT. Throwaway route — delete after the operator picks.
 */
export const metadata = {
  title: 'ballot a — ruled paper',
  robots: { index: false, follow: false },
}

export default function BallotA() {
  return (
    <div className="ballot-dir-a">
      <HomePage />
    </div>
  )
}
