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
        {children}
      </body>
    </html>
  )
}
