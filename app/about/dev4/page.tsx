import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about — variant 1 ("dev4").
 *
 * Angle: "the same lesson, in many forms." Lead with the 8-year ESL
 * beat as a concrete scene (Prague, working professionals), then zoom
 * out so the rest of the career reads as the same job in different
 * costumes — military instruction, freelance software training,
 * still-learning Czech today. Pedagogy as the through-line; the
 * "rare overlap" lives in what the beats show, never named.
 *
 * Composition vocabulary:
 *  - IDE-substrate prose blocks, mobile-gutter constrained, with
 *    `max-w-prose` so desktop doesn't render unreadable line lengths
 *    (the desktop-guardrail rule from toolbox.md).
 *  - Three `PaperApp` insets carry the load-bearing punctuation:
 *      A1  headshot (full-bleed image, fit width).
 *      A2  the locked anchor line as a pull-quote.
 *      A3  a brief "what learning feels like" paper, framed by
 *          the psychology + Czech-immigrant beats — keeps the
 *          page on the human register before the CTA.
 *  - A single `TerminalLine` opens the page (small terminal-voice
 *    framing line: "about your instructor"). The rest is
 *    biographical, not terminal — /about is more biography than pitch.
 *  - Closes with an APP-variant `SectionTile` to /contact. The cream-
 *    paper dialect matches the page's biographical register; the
 *    homepage already carries the IDE-tile handoff to /contact, so
 *    this variant tries the App dialect instead. Eyebrow + title are
 *    sample copy.
 *
 * Sample copy is sample copy. Alex rewrites the keepers.
 */
export default function AboutDev4Page() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        {/* Top breathing room — match the canonical /about page. */}
        <div className="h-[80px] md:h-[120px]" aria-hidden />

        {/* Opening framing line. Single TerminalLine, small font, sets
            the surface dialect (IDE substrate) before the page hands
            off to App-register paper-apps and prose below. */}
        <section className="pt-4 pb-10 md:pt-6 md:pb-14">
          <TerminalLine
            align="left"
            persistCursor
            fontSize={18}
            startDelayMs={620}
            segments={[{ text: 'about your instructor' }]}
          />
        </section>

        {/* Lead beat — 8 years certified ESL teacher in Prague. The
            strategic anchor: HR/L&D readers already know what
            "language lessons for staff" looks like, so naming the
            shape concretely (Prague, working professionals, eight
            years) is the page's first move. Prose constrained to
            `max-w-prose` (~65ch) per the desktop guardrail. */}
        <section className="pt-2 pb-10 md:pb-12">
          <div className="font-body text-ide-fg text-[17px] md:text-[18px] leading-relaxed max-w-prose space-y-5">
            <p>
              for eight years i taught english in prague. mostly working
              professionals — engineers, lawyers, the occasional ceo —
              the same kind of person who, today, is being asked to get
              fluent with ai.
            </p>
            <p>
              same shape of problem, really. you have a job to do. there
              is a tool you do not yet know how to use. someone has to
              walk in once a week and turn that gap into something
              workable, without making you feel small about it.
            </p>
            <p>
              i was certified, i was paid for it, and i did it long
              enough to know what works.
            </p>
          </div>
        </section>

        {/* A1 — headshot paper-app. Full-bleed image inside a `fit`
            paper so the card hugs the photo. Right-justified on
            desktop (default `width="fit"` lives inside a flex row
            we right-align here on md+ so the prose-left / image-right
            rhythm holds without competing with the prose width). On
            mobile it centers — narrow gutter handles the placement. */}
        <section className="pb-12 md:pb-16">
          <div className="flex justify-center md:justify-end">
            <PaperApp
              width="fit"
              bodyClassName=""
              chromeLeft="alex.jpg"
              chromeRight="A1"
            >
              <Image
                src="/brand-assets/photography/alex-headshot-full-v1.jpg"
                alt="Alex Alderman"
                width={1200}
                height={1823}
                className="block h-auto w-full max-w-[280px] md:max-w-[360px]"
                priority
              />
            </PaperApp>
          </div>
        </section>

        {/* Through-line beat — golden age of software, freelance edge.
            Direct precedent for the AI fluency move. Same "you teach
            the tool while you use the tool" pattern, just applied to
            different software. Avoids résumé-speak; concrete verb,
            specific noun. */}
        <section className="pb-10 md:pb-12">
          <div className="font-body text-ide-fg text-[17px] md:text-[18px] leading-relaxed max-w-prose space-y-5">
            <p>
              before that — and alongside it, on and off — i ran a
              marketing agency, freelanced, and spent the last decade
              showing junior people how to use whatever new piece of
              software had just opened a door.
            </p>
            <p>
              linkedin tooling. sales platforms. the sort of stack that
              goes from novelty to non-negotiable inside a quarter.
              freelancers had time and reason to play with this stuff.
              full-time staff, generally, did not. so i taught.
            </p>
            <p>
              the ai fluency lessons i teach now are the same pattern,
              with a faster-moving toolset.
            </p>
          </div>
        </section>

        {/* Earlier beat — US military signals intelligence + Korean
            linguist. Establishes early-career rigor and the language-
            teaching origin (it didn't start in Prague). Phrasing rule:
            never abbreviate to "SIGINT". */}
        <section className="pb-10 md:pb-12">
          <div className="font-body text-ide-fg text-[17px] md:text-[18px] leading-relaxed max-w-prose space-y-5">
            <p>
              the first career was in the us military — signals
              intelligence, korean linguist, hands-on with the kind of
              equipment most people will never see up close. that is
              where the language thing actually started, and where i
              first ran training for a unit.
            </p>
            <p>
              looking back, almost the whole twenty years has been
              teaching, in one form or another. korean. english.
              software. now ai.
            </p>
          </div>
        </section>

        {/* A2 — anchor-line pull-quote paper. The locked verbatim
            line, treated as a single splash placement. App-register
            display type, generous leading, max-w-prose constraint.
            Medium-width paper so it sits more dominantly than the
            headshot card, less heavily than a full-canvas slab. */}
        <section className="pb-12 md:pb-16">
          <div className="grid grid-cols-canvas gap-6">
            <PaperApp
              width="medium"
              chromeLeft="anchor.txt"
              chromeRight="A2"
            >
              <p className="font-display text-[26px] md:text-[30px] leading-snug tracking-display-tight text-ink max-w-prose">
                20 years at the intersection of technology, education,
                and psychology.
              </p>
            </PaperApp>
          </div>
        </section>

        {/* Psychology + Czech-immigrant beats, folded together as
            "what learning feels like". Sits inside its own paper-app
            (A3) — keeps the page on the App register for the closing
            stretch, and gives the most personal beat the warmest
            surface. Light self-aware metacommentary on the czech
            ability per voice-reference.md ("hedges over hyperbole",
            "specific over generic"). */}
        <section className="pb-12 md:pb-16">
          <div className="grid grid-cols-canvas gap-6">
            <PaperApp
              width="wide"
              chromeLeft="learning.md"
              chromeRight="A3"
            >
              <div className="font-body text-ink text-[17px] md:text-[18px] leading-relaxed max-w-prose space-y-5">
                <p>
                  my formal education is in psychology. it is the part
                  of the toolkit that gets the least airtime, and
                  probably does the most work — knowing what a stuck
                  learner looks like, knowing the difference between
                  confused and overwhelmed, knowing when to stop
                  explaining and just let someone try the thing.
                </p>
                <p>
                  i have also lived in the czech republic for about ten
                  years. married to a czech, two bilingual kids, a
                  language i am still — somewhere around early b2,
                  depending on the topic — actively bad at. it keeps me
                  honest about what learning a hard new thing actually
                  feels like from the other chair.
                </p>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* Closing CTA — App-variant SectionTile to /contact. The
            handoff lives on the App register because the page has
            spent its second half there (anchor pull, learning paper).
            App dialect: caps eyebrow, Barlow display title, walking-
            knob marker. Centered on canvas, narrow column. */}
        <section className="grid grid-cols-canvas gap-6 pt-4 pb-16 md:pt-8 md:pb-24">
          <div className="col-span-3 md:col-start-2 md:col-span-1">
            <SectionTile
              variant="app"
              accent="orange"
              eyebrow="next step"
              title="book a 1:1 demo lesson"
              href="/contact"
              eyebrowStyle="caps"
              markerStyle="classic"
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
