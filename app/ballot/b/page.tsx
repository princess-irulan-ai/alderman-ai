import { Barlow_Semi_Condensed } from 'next/font/google'

import HomePage from '../../page'

/**
 * /ballot/b — paper-register enrichment, Direction B: "condensed
 * editorial" (middle — Barlow Semi Condensed display voice; same
 * superfamily as the brand Barlow). Font is instantiated HERE, not in
 * the root layout, so real routes never load it. Styling lives in
 * globals.css §PAPER-REGISTER ENRICHMENT BALLOT. Throwaway route.
 */
const barlowSemi = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-semi',
  display: 'swap',
})

export const metadata = {
  title: 'ballot b — condensed editorial',
  robots: { index: false, follow: false },
}

export default function BallotB() {
  return (
    <div className={`${barlowSemi.variable} ballot-dir-b`}>
      <HomePage />
    </div>
  )
}
