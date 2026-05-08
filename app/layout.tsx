import type { Metadata } from 'next'
import { Barlow, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'alderman.ai — ai fluency instructor and HUMAN advocate',
  description:
    'ai fluency training for Czech HR and L&D teams, delivered like language instruction, not a software rollout.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ide-2 font-body text-ide-fg antialiased">
        {/* Sets --scrollbar-width on <html> for CSS calcs that need
            body-width (vs 100vw which includes the scrollbar).
            Used by the desktop side-nav at >=1200 to center inside
            the left gutter. Fallback in CSS is 0px so non-scrollbar
            platforms (Mac overlay scrollbars, mobile) get correct
            math without JS being load-bearing. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{const f=()=>document.documentElement.style.setProperty('--scrollbar-width',(window.innerWidth-document.documentElement.clientWidth)+'px');f();addEventListener('resize',f);new ResizeObserver(f).observe(document.documentElement);})();`,
          }}
        />
        {children}
      </body>
    </html>
  )
}
