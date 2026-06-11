import { Fraunces } from 'next/font/google'

import HomePage from '../../page'

/**
 * /ballot/c — paper-register enrichment, Direction C: "serif display"
 * (boldest — Fraunces for paper headings, a distinct typographic
 * identity for the paper register; body prose stays Barlow). Font is
 * instantiated HERE, not in the root layout, so real routes never load
 * it. Styling lives in globals.css §PAPER-REGISTER ENRICHMENT BALLOT.
 * Throwaway route.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata = {
  title: 'ballot c — serif display',
  robots: { index: false, follow: false },
}

export default function BallotC() {
  return (
    <div className={`${fraunces.variable} ballot-dir-c`}>
      <HomePage />
    </div>
  )
}
