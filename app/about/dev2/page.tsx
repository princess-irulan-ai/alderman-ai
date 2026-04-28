import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about — variant 2 of 3.
 *
 * Angle: long-form first-person narrative. The page reads like Alex
 * telling the story himself — career as one continuous teaching arc,
 * not five disconnected jobs. ESL leads (strategic anchor, closest
 * analog to the offering); other beats stack as supporting context.
 *
 * Composition:
 *   1. Locked headshot in PaperApp (currently the only thing on canonical /about).
 *   2. Anchor line as a TerminalLine seam — high-impact splash placement.
 *   3. Wide PaperApp holding the narrative. Prose blocks at max-w-prose.
 *      ESL beat opens; agency / military / psychology / Czech-immigrant
 *      beats follow in priority order from the brief.
 *   4. A single SectionTile CTA → /contact.
 *
 * The "rare overlap" differentiator is shown via the beats themselves —
 * never labelled. Sample copy is a step above lorem ipsum; Alex rewrites.
 */
export default function AboutDev2Page() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        {/* Top spacer — clears FloatingNav. */}
        <div className="h-[80px] md:h-[120px]" aria-hidden />

        {/* Headshot paper-app. Locked element from canonical /about,
            kept up top so the page opens with a face. Chrome strip
            carries an identity hint in the left slot — terminal-voice
            label for who this page is about, no résumé title. */}
        <section className="py-8 md:py-12">
          <div className="flex justify-center">
            <PaperApp
              width="fit"
              bodyClassName=""
              chromeLeft="alex-alderman.headshot"
              chromeRight="01"
            >
              <Image
                src="/brand-assets/photography/alex-headshot-full-v1.jpg"
                alt="Alex Alderman"
                width={1200}
                height={1823}
                className="block h-auto w-full md:w-auto md:max-h-[560px]"
                priority
              />
            </PaperApp>
          </div>
        </section>

        {/* Anchor-line seam. The locked phrase as a single splash
            placement — IDE-substrate terminal-voice line, brackets
            on. High-impact, intentionally not paraphrased. */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-12 md:pt-12 md:pb-16">
          <div className="col-span-3">
            <TerminalLine
              align="left"
              segments={[
                { text: '20 years at the intersection of ' },
                { text: 'technology', color: 'text-purple' },
                { text: ', ' },
                { text: 'education', color: 'text-orange' },
                { text: ', and ' },
                { text: 'psychology', color: 'text-green' },
                { text: '.' },
              ]}
            />
          </div>
        </section>

        {/* Narrative paper-app — the bulk of the page. Wide on the
            canvas; prose constrained to max-w-prose so desktop line
            length stays readable per the toolbox guardrail.

            Beat order: ESL leads (strategic anchor); agency-era
            software-fluency training next (direct precedent); military
            origin (early-career rigor + language thread); psychology
            (frames how learning feels); Czech-immigrant (still learning
            something hard, today). Through-line: the same person has
            been teaching, in some form, for the whole 20 years. */}
        <section className="grid grid-cols-canvas gap-6 pb-12 md:pb-16">
          <PaperApp
            width="wide"
            chromeLeft="about.md"
            chromeRight="long read"
          >
            <div className="font-body text-ink space-y-6 text-[17px] leading-relaxed max-w-prose">
              {/* Opening orientation — sets the through-line up front
                  without naming "the rare overlap." */}
              <p>
                hi. i&apos;m alex. most of what i&apos;ve done for the
                last twenty years has been some form of teaching —
                language, software, the unglamorous stuff that opens
                doors. ai fluency is the same job, applied to a new
                tool.
              </p>

              {/* ESL beat — LEAD. Strategic anchor: HR/L&D already has
                  a buying mental model for "language lessons for
                  staff," and AI fluency lessons map onto that model.
                  The beat is framed to make the analog feel obvious. */}
              <h2 className="font-display text-[22px] font-bold tracking-display-tight text-ink pt-2">
                eight years teaching english in prague
              </h2>
              <p>
                i spent eight years as a certified esl teacher here in
                prague, mostly with working professionals. one-on-ones,
                small groups, in-house at companies. scaffolded
                immersion — you do the thing in the language while
                someone who&apos;s done it before guides you through
                it. messy at first, then it clicks.
              </p>
              <p>
                the ai fluency offering is built on the same pedagogy,
                the same business model, and the same kind of working
                relationship. if your team has ever hired a language
                trainer, the shape of this is already familiar.
              </p>

              {/* Agency / freelance beat — direct precedent for the AI
                  fluency move. Surfaces through-line #2 (golden age of
                  software, freelancer edge) without naming it. */}
              <h2 className="font-display text-[22px] font-bold tracking-display-tight text-ink pt-2">
                a decade of training juniors on the new software
              </h2>
              <p>
                alongside the teaching i ran a small marketing agency
                and freelanced. the last ten years have been a kind of
                golden age for door-opening software — the linkedin
                tools, sales enablement, the bits of automation that
                quietly turn a junior into someone who ships.
              </p>
              <p>
                most full-time-job people couldn&apos;t keep up with
                that release cadence. as a freelancer i had time and
                incentive to. i taught it forward to the junior people
                around me whenever i could. the ai fluency offering is
                the same pattern, applied to a faster-moving category.
              </p>

              {/* Military beat — first career, early-career rigor +
                  language thread. Phrasing rule: never abbreviate
                  "signals intelligence" to SIGINT. */}
              <h2 className="font-display text-[22px] font-bold tracking-display-tight text-ink pt-2">
                korean linguist, before any of this
              </h2>
              <p>
                first career was the us military — signals intelligence
                and korean linguist. that&apos;s where the languages
                started, not in prague. it&apos;s also where the
                teaching started: i ran training for my unit. the
                hardware was cutting-edge for the time, and getting
                comfortable with new tech under pressure became a
                habit.
              </p>

              {/* Psychology + Czech-immigrant beats folded into a
                  single "what i bring to the room" closer. The
                  psychology beat frames how learning feels; the Czech
                  beat keeps the present-tense thread (still learning
                  something hard today). Light self-aware register. */}
              <h2 className="font-display text-[22px] font-bold tracking-display-tight text-ink pt-2">
                what i bring into the room
              </h2>
              <p>
                my formal education is in psychology. that ends up
                mattering more than the surface would suggest — most
                of what makes a lesson land or not land is what&apos;s
                going on for the learner before, during, and after the
                actual content. i pay attention to that.
              </p>
              <p>
                i&apos;ve also been a long-term immigrant here for
                about ten years. married a czech, raising two
                bilingual kids, still working on my own czech (a
                strong b1 on a good day, a humble a2 if the topic
                turns to plumbing). i know what the discomfort of
                learning a hard new thing feels like from the inside,
                because i&apos;m still in it.
              </p>
              <p>
                that&apos;s the long version. the short version: if
                you&apos;ve ever brought in a language trainer for
                your team, you already know what working with me looks
                like. the language is just different.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* End-of-page CTA → /contact. Single SectionTile, IDE
            variant on dark substrate, purple accent — matches the
            homepage's closing tile so the cross-page CTA vocabulary
            stays consistent. Eyebrow "next step" intentionally
            mirrors the homepage close — sample copy, Alex tunes. */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-16 md:pt-12 md:pb-20">
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
