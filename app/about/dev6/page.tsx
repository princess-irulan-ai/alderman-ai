import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about/dev6 — variant 3 of the /about spawn (2026-04-28).
 *
 * Angle: career-as-folder. Each beat lives in its own PaperApp with a
 * filename in the chrome strip — `prague.md`, `agency.md`, `army.md`,
 * `psych.md`, `home.md`. The beats stack vertically, full-canvas width,
 * letting the chrome filenames do the era-labeling work that an eyebrow
 * or terminal seam would otherwise carry.
 *
 * Lead beat: 8y ESL in Prague — first paper-app after the headshot +
 * anchor line. Strategic anchor per the brief.
 *
 * Closing move: IDE SectionTile (orange accent) → /contact.
 */
export default function AboutDev6Page() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[80px] md:h-[120px]" aria-hidden />

        {/* Headshot — keep the locked PaperApp treatment from canonical
            /about. `width="fit"` shrinks the card to the photo. */}
        <section className="py-8 md:py-12">
          <div className="flex justify-center">
            <PaperApp
              width="fit"
              bodyClassName=""
              chromeLeft="alex.jpg"
              chromeRight="01"
            >
              <Image
                src="/brand-assets/photography/alex-headshot-full-v1.jpg"
                alt="Alex Alderman"
                width={1200}
                height={1823}
                className="block h-auto w-full md:w-auto md:max-h-[520px]"
                priority
              />
            </PaperApp>
          </div>
        </section>

        {/* Anchor line as its own wide PaperApp pull-quote. The brief
            calls a blockquote-style inset of the 20-year line "tends to
            work as a paper-app inset" — taking that literally here. */}
        <section className="py-6 md:py-10">
          <PaperApp
            width="wide"
            chromeLeft="anchor.md"
            chromeRight="01:01"
          >
            <p className="font-display text-[26px] md:text-[34px] leading-[1.15] tracking-display-tight text-ink max-w-prose">
              20 years at the intersection of technology, education, and
              psychology.
            </p>
            <p className="font-body text-[15px] mt-6 text-ink-soft max-w-prose">
              [the line above is the anchor — locked verbatim. body copy
              below it is alex placeholder.]
            </p>
          </PaperApp>
        </section>

        {/* Terminal seam — hands off from the "who" (photo + anchor) to
            the "what shaped him" beats below. Sits on the dark IDE
            substrate between paper-apps. */}
        <section className="grid grid-cols-canvas gap-6 pt-10 pb-10 md:pt-14 md:pb-12">
          <div className="col-span-3">
            <TerminalLine
              align="left"
              segments={[
                { text: 'almost the whole career has been ' },
                { text: 'teaching', color: 'text-orange' },
                { text: ' in some form' },
              ]}
            />
          </div>
        </section>

        {/* BEAT 1 — lead beat: 8y ESL in Prague.
            Strategic anchor per the brief: closest analog to the AI
            fluency offering, maps onto HR's existing buying mental
            model for language training. */}
        <section className="py-6 md:py-8">
          <PaperApp
            width="wide"
            chromeLeft="prague.md"
            chromeRight="lead beat"
          >
            <h2 className="font-display text-[24px] md:text-[28px] font-bold tracking-display-tight text-ink leading-tight max-w-prose">
              eight years teaching english in prague.
            </h2>
            <div className="mt-5 space-y-4 font-body text-[17px] leading-relaxed text-ink max-w-prose">
              <p>
                certified esl teacher, working with adults in workplace
                settings — same scaffolded-immersion pedagogy and
                business model the ai fluency lessons run on now.
              </p>
              <p>
                if your hr team has ever booked english lessons for
                staff, you already have a mental model for what these
                ai fluency lessons look like. the room is the same. the
                pacing is the same. the difference is what gets
                practiced.
              </p>
              <p className="text-ink-soft">
                [alex to rewrite — the prague-as-bridge framing is the
                load-bearing piece, language stays.]
              </p>
            </div>
          </PaperApp>
        </section>

        {/* BEAT 2 — agency / freelance. Direct precedent for the AI
            fluency move: software-fluency training of juniors during
            the door-opening-software decade. */}
        <section className="py-6 md:py-8">
          <PaperApp
            width="wide"
            chromeLeft="agency.md"
            chromeRight="precedent"
          >
            <h2 className="font-display text-[24px] md:text-[28px] font-bold tracking-display-tight text-ink leading-tight max-w-prose">
              ten years in agencies and freelance marketing.
            </h2>
            <div className="mt-5 space-y-4 font-body text-[17px] leading-relaxed text-ink max-w-prose">
              <p>
                ran a marketing agency, freelanced through the rest. the
                last decade or so has been a kind of golden age for
                door-opening software — linkedin tools, sales and
                marketing platforms, anything that turned a junior
                person into someone who could carry their own weight.
              </p>
              <p>
                a freelancer has the time and the incentive to actually
                pick the new tools up. most full-time-job people don't.
                so any junior who would sit still long enough, i'd
                teach them what i'd been using.
              </p>
              <p>
                the ai fluency offering is the same pattern, pointed at
                a different category of tool.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* BEAT 3 — military / korean linguist. Establishes early-career
            rigor + that language-teaching origin predates Prague. */}
        <section className="py-6 md:py-8">
          <PaperApp
            width="wide"
            chromeLeft="army.md"
            chromeRight="origin"
          >
            <h2 className="font-display text-[24px] md:text-[28px] font-bold tracking-display-tight text-ink leading-tight max-w-prose">
              before that — us military, signals intelligence, korean
              linguist.
            </h2>
            <div className="mt-5 space-y-4 font-body text-[17px] leading-relaxed text-ink max-w-prose">
              <p>
                first career. signals intelligence work, korean
                linguist, hands-on with cutting-edge hardware and
                software for the era. the language-teaching and
                language-learning thread didn't start in prague — it
                started here.
              </p>
              <p>
                also ran training inside the unit. so the teaching
                thread didn't start in prague either.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* BEAT 4 — psychology degree. Frames the discomfort of
            learning. Shorter beat — keeps the page moving. */}
        <section className="py-6 md:py-8">
          <PaperApp
            width="wide"
            chromeLeft="psych.md"
            chromeRight="lens"
          >
            <h2 className="font-display text-[24px] md:text-[28px] font-bold tracking-display-tight text-ink leading-tight max-w-prose">
              my formal education is in psychology.
            </h2>
            <div className="mt-5 space-y-4 font-body text-[17px] leading-relaxed text-ink max-w-prose">
              <p>
                the part that matters for teaching adults a new tool
                is knowing what learning a new tool actually feels
                like — the resistance, the embarrassment, the slow
                start. psychology gives a vocabulary for that. it
                doesn't replace doing the thing, but it shapes how the
                room is run.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* BEAT 5 — personal: czech immigrant. Light self-aware
            note. Variants can be self-deprecating about Czech-learning
            "if it lands" per the brief — leaning into it lightly here. */}
        <section className="py-6 md:py-8">
          <PaperApp
            width="wide"
            chromeLeft="home.md"
            chromeRight="present"
          >
            <h2 className="font-display text-[24px] md:text-[28px] font-bold tracking-display-tight text-ink leading-tight max-w-prose">
              ten years in the czech republic. still learning the
              language.
            </h2>
            <div className="mt-5 space-y-4 font-body text-[17px] leading-relaxed text-ink max-w-prose">
              <p>
                married into a czech family. two bilingual kids. czech
                ability somewhere around strong b1, depending on the
                topic — strong enough to function, weak enough that i
                still know exactly what it feels like to sit on the
                wrong side of a learning curve.
              </p>
              <p className="text-ink-soft">
                [alex — the b1 line is from the bio doc; tweak if you
                want it less precise.]
              </p>
            </div>
          </PaperApp>
        </section>

        {/* Closing IDE SectionTile → /contact. Orange accent
            (homepage ends with purple — small intentional divergence
            for /about so the /contact handoff has its own color
            signature). */}
        <section className="grid grid-cols-canvas gap-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="col-span-3 md:col-start-2 md:col-span-1">
            <SectionTile
              variant="ide"
              accent="orange"
              eyebrow="see if it fits"
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
