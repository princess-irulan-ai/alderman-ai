import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about/dev1 — variant 1 of 3 (parallel spawn 2026-04-28).
 *
 * Composition angle: a four-room timeline. The page reads as a series
 * of paper-apps, each holding one beat — "files in a project" rendered
 * onto cream paper. TerminalLine seams between them carry the
 * connective tissue (through-lines) in IDE voice without labeling the
 * differentiator outright.
 *
 * Beat order (per /about brief):
 *   1. 8 years certified ESL Prague — LEAD beat (strategic anchor).
 *      Paired with the headshot inside its own narrow PaperApp on the
 *      same row so the lead beat opens the page with face + claim
 *      together.
 *   2. Marketing agency + freelance — software-fluency training of
 *      juniors during the door-opening-software decade.
 *   3. US military, signals intelligence + Korean linguist — first
 *      career, language-teaching origin, deep tech comfort.
 *   4. Formal education in psychology — frames the discomfort of
 *      learning a new thing.
 *
 * Anchor line ("20 years at the intersection of technology, education,
 * and psychology.") lands verbatim as a wide PaperApp pull-quote
 * between beats 2 and 3 — the splash placement called for in
 * instructor-bio.md. Personal Czech-immigrant beat is a quiet aside
 * inside the psychology paper-app rather than its own card.
 *
 * Closing move: IDE-purple SectionTile pointing to /contact, matching
 * the homepage's final tile vocabulary so /about hands off in the same
 * gesture the rest of the site uses.
 */
export default function AboutDev1Page() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[80px] md:h-[120px]" aria-hidden />

        {/* Opening terminal seam — names the page in voice. Keeps the
            same hanging-prompt pattern the homepage uses for hero
            lines so /about feels like part of the same surface. */}
        <section className="grid grid-cols-canvas gap-6 pb-6 md:pb-10">
          <div className="col-span-3">
            <TerminalLine
              hangingPrompt
              showBrackets={false}
              align="left"
              persistCursor
              startDelayMs={520}
              segments={[
                { text: 'who is teaching the lessons' },
              ]}
            />
          </div>
        </section>

        {/* Lead beat — 8 years certified ESL Prague. Paired with the
            headshot on the same vertical run: headshot in a fit
            PaperApp first, prose in a wide PaperApp directly under
            it. Stack reads top-to-bottom on mobile (face, then
            claim). The "filename" chrome strip leans into the
            IDE/file metaphor — each beat is a file in the project. */}
        <section className="flex flex-col items-center gap-6 pb-10">
          <PaperApp width="fit" bodyClassName="" chromeLeft="alex-alderman.jpg" chromeRight="instructor">
            <Image
              src="/brand-assets/photography/alex-headshot-full-v1.jpg"
              alt="Alex Alderman"
              width={1200}
              height={1823}
              className="block h-auto w-full max-w-[280px] md:max-w-[340px]"
              priority
            />
          </PaperApp>
        </section>

        <section className="grid grid-cols-canvas gap-6 pb-12">
          <PaperApp width="wide" chromeLeft="prague-esl.md" chromeRight="lead beat">
            <div className="max-w-prose">
              <p className="font-display text-[26px] md:text-[30px] leading-tight tracking-display-tight font-bold">
                eight years teaching english to working professionals in prague.
              </p>
              <div className="font-body text-[17px] leading-relaxed mt-5 space-y-4 text-ink">
                <p>
                  certified, classroom and one-to-one, mostly company
                  programmes — the same shape these ai fluency lessons
                  take. small cohorts, scaffolded immersion, the
                  language-of-work as the working medium.
                </p>
                <p>
                  the buying model is familiar to anyone running an l&amp;d
                  budget: hire a teacher, run a course, your team can do
                  the new thing. ai fluency lessons sit on that same shelf.
                  the substrate changed; the pedagogy did not.
                </p>
              </div>
            </div>
          </PaperApp>
        </section>

        {/* Through-line seam #1 — "almost an entire career spent
            teaching." Mono voice on the dark substrate, small, no
            bracket frame, no fanfare. Connects beat 1 → beat 2. */}
        <section className="grid grid-cols-canvas gap-6 pb-10">
          <div className="col-span-3">
            <TerminalLine
              hangingPrompt
              showBrackets={false}
              align="left"
              persistCursor
              startDelayMs={420}
              segments={[
                { text: 'before that, ten years of training people on door-opening software' },
              ]}
            />
          </div>
        </section>

        {/* Beat 2 — agency / freelance decade. Software-fluency
            training of juniors during the "golden age." Direct
            precedent for the AI fluency move; the brief flags this
            pattern explicitly as a through-line. */}
        <section className="grid grid-cols-canvas gap-6 pb-12">
          <PaperApp width="wide" chromeLeft="agency-decade.md" chromeRight="2014 — 2024">
            <div className="max-w-prose">
              <p className="font-display text-[24px] md:text-[28px] leading-tight tracking-display-tight font-bold">
                a marketing agency and a long freelance run.
              </p>
              <div className="font-body text-[17px] leading-relaxed mt-5 space-y-4 text-ink">
                <p>
                  the last decade or so has been a pretty steady release
                  cycle of door-opening software — linkedin tooling, sales
                  and marketing stacks, anything that turned a junior
                  person's afternoon into a competitive advantage.
                </p>
                <p>
                  freelancers had the time to poke at the new tool when it
                  landed. full-time staff usually didn't. so a chunk of
                  every project i ran had a coaching layer underneath it —
                  showing the junior on the team how to use the thing,
                  not just handing them the deliverable.
                </p>
                <p>
                  ai is the same pattern, with a much larger surface area.
                </p>
              </div>
            </div>
          </PaperApp>
        </section>

        {/* Anchor line — wide PaperApp pull-quote, verbatim. The
            instructor-bio.md spec calls this out as a single splash
            placement; treating it as a low-chrome blockquote (no
            chrome filename, accent dots only) keeps the line itself
            the focal point. */}
        <section className="grid grid-cols-canvas gap-6 pb-12">
          <PaperApp
            width="wide"
            chromeLeft=""
            chromeRight=""
          >
            <blockquote className="max-w-prose">
              <p className="font-display text-[26px] md:text-[34px] leading-[1.15] tracking-display-tight font-bold text-ink">
                20 years at the intersection of technology, education, and psychology.
              </p>
            </blockquote>
          </PaperApp>
        </section>

        {/* Through-line seam #2 — gestures backward in time so beat 3
            (military) reads as origin rather than detour. */}
        <section className="grid grid-cols-canvas gap-6 pb-10">
          <div className="col-span-3">
            <TerminalLine
              hangingPrompt
              showBrackets={false}
              align="left"
              persistCursor
              startDelayMs={420}
              segments={[
                { text: 'the language-teaching thread starts earlier than prague' },
              ]}
            />
          </div>
        </section>

        {/* Beat 3 — US military, signals intelligence + Korean linguist.
            First career; language-teaching origin; deep tech comfort.
            Phrasing rules from instructor-bio.md: "signals intelligence"
            never abbreviated to SIGINT. */}
        <section className="grid grid-cols-canvas gap-6 pb-12">
          <PaperApp width="wide" chromeLeft="signals-and-korean.md" chromeRight="first career">
            <div className="max-w-prose">
              <p className="font-display text-[24px] md:text-[28px] leading-tight tracking-display-tight font-bold">
                u.s. military — signals intelligence, korean linguist.
              </p>
              <div className="font-body text-[17px] leading-relaxed mt-5 space-y-4 text-ink">
                <p>
                  the language-teaching thread actually starts here, not
                  in prague. korean linguist, hands-on with cutting-edge
                  hardware, and running training for the unit on the side.
                </p>
                <p>
                  the takeaway is less "i used to be a soldier" and more
                  "the comfort with new technical systems is older than
                  any current trend, and the habit of teaching what i
                  learn started before the first paid lesson."
                </p>
              </div>
            </div>
          </PaperApp>
        </section>

        {/* Beat 4 — formal education in psychology + personal Czech
            immigrant aside. Combined into one paper-app: the
            psychology framing is "i understand what learning feels
            like," and the Czech beat is the lived example, kept
            light per the brief. Phrasing rule: "my formal education
            is in psychology" — no "four-year degree" framing. */}
        <section className="grid grid-cols-canvas gap-6 pb-14">
          <PaperApp width="wide" chromeLeft="why-it-clicks.md" chromeRight="formation">
            <div className="max-w-prose">
              <p className="font-display text-[24px] md:text-[28px] leading-tight tracking-display-tight font-bold">
                my formal education is in psychology.
              </p>
              <div className="font-body text-[17px] leading-relaxed mt-5 space-y-4 text-ink">
                <p>
                  which is a pretty good background for a job that's
                  mostly about helping someone get past the discomfort of
                  not-knowing-yet. learning a new tool as an adult
                  professional is rarely a knowledge problem. it's a
                  confidence problem dressed as a knowledge problem.
                </p>
                <p>
                  for what it's worth, i've been the learner too — ten
                  years in the czech republic, married to a czech, two
                  bilingual kids, czech somewhere around early b2 on a
                  good day. it keeps me honest about what hard feels like.
                </p>
              </div>
            </div>
          </PaperApp>
        </section>

        {/* Closing IDE SectionTile → /contact. Same dialect as the
            homepage's terminal CTAs so /about hands the reader to the
            funnel destination using the site's established gesture.
            Eyebrow + title are sample copy — Alex rewrites the keepers. */}
        <section className="grid grid-cols-canvas gap-6 pt-4 pb-16 md:pt-8 md:pb-20">
          <div className="col-span-3 md:col-start-2 md:col-span-1">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="see for yourself"
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
