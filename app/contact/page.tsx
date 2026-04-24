import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { ContactOutroBlock } from '@/components/sections/ContactOutroBlock'
import { LabelBracket } from '@/components/ui/LabelBracket'

/**
 * /contact — second route of the holding-page launch.
 *
 * v2 (2026-04-24): rewritten per Alex's new spec. Text-only hero, then
 * contact paper-app, then portrait paper-app (separate + centered), then
 * ContactOutroBlock. Dropped from v1: portrait-in-hero layout, the
 * what_to_expect paper-app, and the operating-hours seam.
 *
 * Structure:
 *   1. Hero       — text only: [ contact ] chip + display + subtitle.
 *   2. contact.md — wide PaperApp, three contact methods (calendar /
 *                   email / phone). Real links kept live.
 *   3. Portrait   — fit-width PaperApp, centered on its own row.
 *   4. Outro      — ContactOutroBlock: terminal line + download-faq
 *                   CTA + download-brochure CTA. Landing next session
 *                   (PLAN.md task 2) — placeholder slot below.
 *
 * Mobile: PaperApp width classes (col-start-*, col-span-*) are inert
 * without a grid parent, so paper apps render as full-width blocks on
 * mobile; `md:grid md:grid-cols-canvas` kicks the canvas in from `md:`.
 */
export default function ContactPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        {/* Top seam — breathing space under the floating nav. Smaller on
            mobile to match the holding page's mobile hero pt-4 rhythm. */}
        <div className="h-[80px] md:h-[120px]" aria-hidden />

        {/* 1. Hero — text-only. Chip + display + subtitle, left-aligned.
            Alignment mirrors the current /contact v1 block (and the open
            design question in PLAN.md re: hero line 1 alignment applies
            here too — flag for Alex on review). */}
        <section className="pb-12 md:pt-8 md:pb-16">
          <p className="font-mono text-[13px] text-ide-fg-mute mb-6">[ contact ]</p>
          <h1 className="font-display text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display-tight text-ide-fg">
            talk to a <span className="text-orange">HUMAN</span>.
          </h1>
          <p className="mt-6 max-w-[680px] font-body text-[16px] md:text-[17px] leading-relaxed text-ide-fg/85">
            in the age of ai, it&apos;s nice to just talk to a person sometimes.
          </p>
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

        {/* 3. Portrait — separate seam, centered. `width="fit"` is
            shrink-wrapped around the image; parent flex centers it.
            bodyClassName="" zeros body padding so the image extends to
            the paper edges (outer rounded-paper + overflow-hidden clip
            the corners). Mobile: image goes full-width of its paper
            wrapper; desktop sits at natural width capped at 600px tall. */}
        <section className="py-8 md:py-16">
          <div className="flex justify-center">
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

        {/* 4. Outro — terminal line + download-faq + download-brochure.
            Mirrors TrialCTASection's choreography. */}
        <ContactOutroBlock />

        {/* Bottom breathing room before footer. */}
        <div className="pb-16 md:pb-32" aria-hidden />
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
