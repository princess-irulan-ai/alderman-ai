import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { LabelBracket } from '@/components/ui/LabelBracket'

/**
 * /contact — second route of the holding-page launch.
 *
 * Ported from the full-site `/contact` (alderman-ai-full/app/contact/page.tsx)
 * with the A1 headshot slab pulled in from `/about` so the page opens on
 * Alex's face — "make it personable" per the 2026-04-24 holding-page scope
 * expansion. Structure:
 *
 *   1. Hero seam          — text ([ contact ] chip + display + intro para)
 *                           on the left, snug-fit portrait PaperApp on the
 *                           right. Mobile stacks portrait → text.
 *   2. contact.md         — wide PaperApp with three contact methods
 *                           (calendar / email / phone). Real links kept
 *                           live so the page is reachable from day one.
 *   3. what_to_expect.md  — wide PaperApp, three-step walkthrough.
 *   4. Operating hours    — mono IDE-substrate seam.
 *
 * Mobile: every `grid-cols-canvas` section is gated at `md:` — below md
 * the content canvas is a flex column with `px-4` gutter (from PageFrame).
 * PaperApp's width classes (col-start-*, col-span-*) are inert without a
 * grid parent, so paper apps render as full-width blocks on mobile.
 *
 * Copy: ported verbatim from the full-site page as placeholder-grade copy
 * Alex will rewrite. Real email / phone / calendar stay live.
 */
export default function ContactPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        {/* Top seam — breathing space under the floating nav. Smaller on
            mobile to match the holding page's mobile hero pt-4 rhythm. */}
        <div className="h-[80px] md:h-[120px]" aria-hidden />

        {/* 1. Hero seam — text + portrait.
            Mobile: flex-col, portrait first (order-1) then text (order-2),
            so landing on /contact leads with Alex's face. Desktop:
            flex-row, text-left (md:order-1) with snug portrait on the
            right (md:order-2). Gap is tighter on mobile to keep the
            vertical rhythm; wider on desktop where the two blocks live
            side-by-side. */}
        <section className="flex flex-col gap-8 pb-12 md:flex-row md:items-start md:gap-12 md:pt-8 md:pb-16">
          <div className="order-2 md:order-1 md:flex-1 md:min-w-0">
            <p className="font-mono text-[13px] text-ide-fg-mute mb-6">[ contact ]</p>
            <h1 className="font-display text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display-tight text-ide-fg">
              talk to a <span className="text-orange">HUMAN</span>.
            </h1>
            <p className="mt-6 max-w-[680px] font-body text-[16px] md:text-[17px] leading-relaxed text-ide-fg/85">
              20 minutes. a short audit of where ai is — and isn&apos;t —
              working in your team. you leave with three concrete moves. no
              slide deck, no sales pitch.
            </p>
          </div>
          <div className="order-1 md:order-2 md:shrink-0">
            {/* bodyClassName="" — zero body padding so the image extends
                to paper's edges. Outer rounded-paper + overflow-hidden
                clip the corners. Mobile image is full-width of its paper
                wrapper; desktop sits at natural width capped at 600px tall. */}
            <PaperApp width="fit" bodyClassName="">
              <Image
                src="/brand-assets/photography/alex-headshot-full-v1.jpg"
                alt="Alex Alderman"
                width={1200}
                height={1823}
                className="block h-auto w-full md:w-auto md:max-h-[600px]"
                priority
              />
            </PaperApp>
          </div>
        </section>

        {/* 2. contact.md — three methods.
            Real email / phone / calendar links are live (a contact page
            needs to be reachable). Each row uses a coloured left-border
            keyed to the brand chord: orange (calendar / primary),
            purple (email), green (phone). */}
        <section className="py-8 md:grid md:grid-cols-canvas md:gap-6 md:py-16">
          <PaperApp width="wide">
            <div className="space-y-8">
              <LabelBracket>reach me</LabelBracket>
              <ul className="space-y-5 font-mono text-[15px]">
                <li>
                  <a
                    href="https://calendar.app.google/uBw7TdkAFi4rF4Nu8"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col gap-1 border-l-2 border-orange py-2 pl-6 transition-colors hover:bg-ink/5"
                  >
                    <span className="flex items-center gap-2 text-ink-soft">
                      <span className="text-purple">&gt;_</span>
                      book.audit()
                    </span>
                    <span className="text-[19px] text-orange group-hover:underline">
                      calendar.app.google — 20-min slot
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:alex@alderman.ai"
                    className="group flex flex-col gap-1 border-l-2 border-purple py-2 pl-6 transition-colors hover:bg-ink/5"
                  >
                    <span className="flex items-center gap-2 text-ink-soft">
                      <span className="text-purple">&gt;_</span>
                      email.send()
                    </span>
                    <span className="text-[19px] text-purple group-hover:underline">
                      alex@alderman.ai
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+420725830908"
                    className="group flex flex-col gap-1 border-l-2 border-green py-2 pl-6 transition-colors hover:bg-ink/5"
                  >
                    <span className="flex items-center gap-2 text-ink-soft">
                      <span className="text-purple">&gt;_</span>
                      phone.ring()
                    </span>
                    <span className="text-[19px] text-green group-hover:underline">
                      +420 725 830 908
                    </span>
                  </a>
                </li>
              </ul>
              <p className="font-mono text-[12px] text-ink-faint pt-4 border-t border-ink-faint/30">
                === Prague, Czechia · available CET business hours ===
              </p>
            </div>
          </PaperApp>
        </section>

        {/* 3. what_to_expect.md — three-step walkthrough. */}
        <section className="py-8 md:grid md:grid-cols-canvas md:gap-6 md:py-16">
          <PaperApp width="wide">
            <div className="space-y-8">
              <LabelBracket>what to expect</LabelBracket>
              <div className="space-y-6">
                <div className="font-mono text-[13px] leading-relaxed">
                  <div className="flex gap-2">
                    <span className="select-none text-purple">&gt;_</span>
                    <span className="text-ink">step.01 — you book</span>
                  </div>
                  <div className="mt-1 flex gap-2 pl-5">
                    <span className="select-none text-ink-faint">→</span>
                    <span className="text-ink-soft">
                      pick a 20-min slot. no intake form. no pre-call homework.
                    </span>
                  </div>
                </div>
                <div className="font-mono text-[13px] leading-relaxed">
                  <div className="flex gap-2">
                    <span className="select-none text-purple">&gt;_</span>
                    <span className="text-ink">step.02 — we talk</span>
                  </div>
                  <div className="mt-1 flex gap-2 pl-5">
                    <span className="select-none text-ink-faint">→</span>
                    <span className="text-ink-soft">
                      three questions: what ai tools are in use? who uses them
                      well? where does it break? that&apos;s it.
                    </span>
                  </div>
                </div>
                <div className="font-mono text-[13px] leading-relaxed">
                  <div className="flex gap-2">
                    <span className="select-none text-purple">&gt;_</span>
                    <span className="text-ink">step.03 — you leave with a plan</span>
                  </div>
                  <div className="mt-1 flex gap-2 pl-5">
                    <span className="select-none text-ink-faint">→</span>
                    <span className="text-ink-soft">
                      three concrete moves, ranked by leverage. no slide deck.
                      no proposal follow-up unless you ask.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </PaperApp>
        </section>

        {/* 4. Operating hours seam. */}
        <section className="py-8 pb-16 md:grid md:grid-cols-canvas md:gap-6 md:py-16 md:pb-32">
          <div className="text-center font-mono text-[12px] md:col-span-3 md:text-[13px] text-ide-fg-mute tracking-wider">
            === operating hours: mon-fri, 09:00-17:30 CET. replies within one
            working day. ===
          </div>
        </section>
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'contact — alderman.ai',
  description:
    'Book a 20-minute ai fluency audit with alderman.ai. Email, phone, or direct calendar booking.',
}
