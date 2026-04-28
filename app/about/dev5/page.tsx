import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'

/**
 * /about — variant dev5 (variant 2 of 3, spawn 2026-04-28).
 *
 * Angle: "twenty years of the same job, just a new tool."
 *
 * The page reads as one continuous teaching career rather than five
 * disconnected gigs. The 8y ESL beat opens the body — strategic
 * anchor, the analog HR/L&D already buys — then the page loops back
 * and walks the chronological line forward through it: military
 * (signals intelligence, Korean linguist, unit training) → ESL Prague
 * → freelance / agency era teaching juniors door-opening software →
 * AI fluency lessons today. Each beat is a small paper-app card so
 * the page reads as a stack of "exhibits" rather than a CV.
 *
 * Composition map:
 *  - Headshot PaperApp (locked, kept from canonical /about).
 *  - Anchor-line PaperApp inset — the locked 20-year line as a quiet
 *    blockquote on cream paper, narrow width, sat right.
 *  - "lead beat" PaperApp — 8y ESL teacher in Prague. Wide. Carries
 *    the strategic-bridge sentence (without naming "AI fluency = new
 *    language"; the analogy is the read).
 *  - Three medium PaperApps in chronological order (military →
 *    agency/freelance → today). The page is a stack of papers a
 *    reader could shuffle through.
 *  - SectionTile IDE/purple to /contact at the bottom.
 *
 * No Postit (hero-only), no still-HUMAN circle portrait (homepage
 * carries that chord), no TerminalLine seams (this page is biography,
 * not pitch — quieter than the homepage). Sample copy is bracketed
 * placeholder + light Alex-flavored phrasing; final copy is
 * Alex-rewritten.
 */
export default function AboutDev5Page() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[80px] md:h-[120px]" aria-hidden />

        {/* Headshot — locked PaperApp (carried from canonical /about).
            Width=fit so the cream card hugs the photo, full-bleed body. */}
        <section className="py-8 md:py-12">
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

        {/* Anchor-line inset — the locked 20-year line, treated as a
            quiet blockquote on a narrow paper card, right-justified
            within the canvas. Locked verbatim per instructor-bio.md. */}
        <section className="grid grid-cols-canvas gap-6 pt-6 pb-8 md:pt-8 md:pb-10">
          <PaperApp
            width="medium"
            chromeLeft="anchor.txt"
            chromeRight="—"
          >
            <p className="font-display text-[22px] md:text-[26px] leading-snug tracking-display-tight text-ink max-w-prose">
              20 years at the intersection of technology, education, and
              psychology.
            </p>
          </PaperApp>
        </section>

        {/* Lead beat — 8y certified ESL teacher in Prague. Wide paper
            so it gets the most real estate on the page. The
            strategic-bridge sentence makes the offering feel like a
            natural extension of language teaching without naming the
            "rare overlap." */}
        <section className="grid grid-cols-canvas gap-6 pt-4 pb-8 md:pt-6 md:pb-10">
          <PaperApp
            width="wide"
            chromeLeft="prague.md"
            chromeRight="2016 — 2024"
          >
            <div className="max-w-prose space-y-5 font-body text-[17px] leading-relaxed text-ink">
              <p className="font-display text-[20px] md:text-[24px] font-bold leading-tight tracking-display-tight">
                eight years teaching english to working czechs in
                prague.
              </p>
              <p>
                certified esl teacher, mostly one-on-one and small
                groups, mostly working professionals trying to fit
                lessons around real jobs. same scaffolded-immersion
                pedagogy i use now: short live sessions, real tasks
                from the learner&rsquo;s actual work, a coach pulling
                them past the bits they&rsquo;d skip on their own.
              </p>
              <p>
                hr and l&amp;d already know what to do with
                &ldquo;language lessons for staff.&rdquo; ai fluency
                lessons sit in that same shape — different surface,
                same job.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* Beat 2 — military origin. Korean linguist + signals
            intelligence + unit training. Establishes early-career
            rigor and that language teaching / language learning
            started before Prague. Phrasing rule: never abbreviate
            "signals intelligence" to SIGINT. */}
        <section className="grid grid-cols-canvas gap-6 pt-4 pb-8 md:pt-6 md:pb-10">
          <PaperApp
            width="medium"
            chromeLeft="prior.md"
            chromeRight="first career"
          >
            <div className="max-w-prose space-y-4 font-body text-[17px] leading-relaxed text-ink">
              <p className="font-display text-[20px] font-bold leading-tight tracking-display-tight">
                before prague, the us military.
              </p>
              <p>
                signals intelligence, korean linguist. hands-on with
                cutting-edge tech and hardware in a job where
                misunderstanding the language was the whole problem.
                also ran training inside the unit — the language
                teaching started here, not in prague.
              </p>
              <p>
                my formal education is in psychology, picked up
                around the edges of all this. it&rsquo;s the lens i
                still use when a learner stalls: what does the
                discomfort actually feel like, and what gets them
                past it.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* Beat 3 — marketing agency + freelance era. Software-fluency
            training of juniors during the "golden age of software."
            Direct precedent for the AI fluency move. Through-line #2:
            freelancers had time + incentive to keep up with new tools
            and pass that on to junior people. */}
        <section className="grid grid-cols-canvas gap-6 pt-4 pb-8 md:pt-6 md:pb-10">
          <PaperApp
            width="medium"
            chromeLeft="freelance.md"
            chromeRight="~10 years"
          >
            <div className="max-w-prose space-y-4 font-body text-[17px] leading-relaxed text-ink">
              <p className="font-display text-[20px] font-bold leading-tight tracking-display-tight">
                a decade in marketing, freelance and agency.
              </p>
              <p>
                the last ten-ish years have been a quiet golden age
                of door-opening software — linkedin tools,
                sales/marketing platforms, a steady drip of new things
                that opened a career door for the people who picked
                them up early. most full-time-job people couldn&rsquo;t
                keep up. freelancers had the time and the incentive,
                so we did.
              </p>
              <p>
                a lot of that decade was teaching whichever junior
                person was in front of me how to use the new tool
                well enough that it actually moved their career. that
                pattern is the one i&rsquo;m running on ai now.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* Beat 4 — today. Closes the chronological sweep on the
            current offering and seams into the CTA. Light personal
            note (Czech immigrant, still learning) lands the "knows
            what learning feels like" through-line without making it
            the headline. */}
        <section className="grid grid-cols-canvas gap-6 pt-4 pb-8 md:pt-6 md:pb-10">
          <PaperApp
            width="medium"
            chromeLeft="now.md"
            chromeRight="2026"
          >
            <div className="max-w-prose space-y-4 font-body text-[17px] leading-relaxed text-ink">
              <p className="font-display text-[20px] font-bold leading-tight tracking-display-tight">
                same job, new tool.
              </p>
              <p>
                ten years in czechia, married to a czech, two
                bilingual kids, czech somewhere around strong b1 on
                a good day. still a learner. it keeps me honest about
                what the discomfort of picking up something hard
                actually feels like.
              </p>
              <p>
                the ai fluency lessons are the same work i&rsquo;ve
                been doing for twenty years — military instruction,
                language teaching, software coaching — pointed at the
                tool that&rsquo;s in front of working people right
                now.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* Closing CTA — IDE/purple SectionTile to /contact. Hands the
            reader off to book a 1:1 demo lesson (the page's funnel
            destination per the brief). */}
        <section className="grid grid-cols-canvas gap-6 pt-10 pb-16 md:pt-14 md:pb-20">
          <div className="col-span-3 md:col-start-2 md:col-span-1">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="next step"
              title="book a demo lesson"
              href="/contact"
              markerStyle="contained"
            />
          </div>
        </section>
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'about your instructor — alderman.ai',
}
