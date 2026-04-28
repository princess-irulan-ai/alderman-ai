import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'
import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * /about — variant 3 (dev3).
 *
 * Angle: "log of practice." The career framed as numbered chapters of one
 * long teaching career, not five scattered jobs. The 8y ESL beat leads as
 * chapter 01 (strategic anchor — closest analog to the offering). The
 * locked anchor line ("20 years at the intersection…") sits on its own
 * between the chapters and the closing CTA, as a centered IDE-substrate
 * pull. The differentiator (rare overlap) is never named — the chapters
 * carry it implicitly.
 *
 * Composition:
 *   - terminal-line prologue (low-key opener, hangingPrompt)
 *   - headshot paper-app (medium, right) with the eyebrow + first paragraph
 *     introducing the "teaching career" frame
 *   - 5 chapter paper-apps (alternating widths) — 01 ESL Prague, 02 agency
 *     years, 03 military, 04 psychology, 05 long-term in Czech republic
 *   - centered terminal-line carrying the locked anchor line, IDE substrate
 *   - closing SectionTile (IDE / purple) → /contact
 *
 * Mobile-first. `max-w-prose` on every prose block per the toolbox guardrail.
 */
export default function AboutDev3Page() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />

        {/* Prologue terminal line — low-key opener that names the frame
            ("a teaching career, in chapters") before the page starts.
            Hangs the prompt into the gutter so typed text aligns to the
            canvas left edge, matching the homepage hero pattern. */}
        <section className="grid grid-cols-canvas gap-6 pt-4 pb-10 md:pt-8 md:pb-14">
          <div className="col-span-3">
            <TerminalLine
              hangingPrompt
              showBrackets={false}
              align="left"
              segments={[
                { text: 'a teaching career, in chapters' },
              ]}
            />
          </div>
        </section>

        {/* Headshot paper-app — full-bleed photo, mirroring the
            canonical /about composition. `width='fit'` + `bodyClassName=''`
            so the image extends to the paper edges and the outer
            `rounded-paper overflow-hidden` clips its corners cleanly.
            Centered in the canvas via the parent flex. */}
        <section className="py-4 md:py-8">
          <div className="flex justify-center">
            <PaperApp width="fit" bodyClassName="" chromeLeft="instructor.md" chromeRight="alex alderman">
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

        {/* Framing paragraph — a separate prose paper-app sets up the
            chapter structure that follows. Right-justified medium so it
            sits asymmetrically against the centered photo above and the
            chapter cards below. */}
        <section className="grid grid-cols-canvas gap-6 pt-10 pb-12 md:pt-14">
          <div className="col-span-3 md:col-start-2 md:col-span-2">
            <PaperApp
              width="medium"
              chromeLeft="frame.md"
              chromeRight="how to read this"
            >
              <div className="max-w-prose">
                <p className="font-display text-[11px] uppercase tracking-[0.18em] font-semibold text-purple mb-3">
                  who is teaching
                </p>
                <h1 className="font-display text-[28px] font-bold text-ink leading-tight tracking-display-tight mb-5">
                  hi, i&rsquo;m alex.
                </h1>
                <p className="font-body text-[17px] leading-relaxed text-ink mb-4">
                  the short version: most of my working life so far has
                  been spent teaching people things. military instruction,
                  language pedagogy, software fluency. five chapters, one
                  through-line. ai fluency lessons are the next chapter.
                </p>
                <p className="font-body text-[15px] leading-relaxed text-ink-soft">
                  the longer version is below, more or less in order of
                  how much it shapes the way these lessons run.
                </p>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* Chapter 01 — 8y ESL Prague. LEAD BEAT. Strategic anchor.
            Closest analog to the ai fluency offering — same scaffolded
            pedagogy, same workplace setting, same business model. The
            page leads with this so HR/L&D readers map ai lessons onto a
            buying mental model they already have. */}
        <section className="grid grid-cols-canvas gap-6 pb-10">
          <div className="col-span-3 md:col-start-1 md:col-span-2">
            <PaperApp
              width="medium"
              chromeLeft="ch_01.md"
              chromeRight="prague, 8 years"
            >
              <div className="max-w-prose">
                <p className="font-display text-[11px] uppercase tracking-[0.18em] font-semibold text-orange mb-3">
                  chapter 01 &mdash; the closest analog
                </p>
                <h2 className="font-display text-[24px] font-bold text-ink leading-tight tracking-display-tight mb-5">
                  eight years as a certified esl teacher in prague.
                </h2>
                <p className="font-body text-[17px] leading-relaxed text-ink mb-4">
                  scaffolded immersion, working professionals, real
                  workplace context. one-to-one and small group, mostly
                  in-house at companies. it&rsquo;s the same pedagogy and
                  business model as the ai fluency lessons &mdash; just a
                  different subject.
                </p>
                <p className="font-body text-[15px] leading-relaxed text-ink-soft">
                  if &ldquo;language lessons for staff&rdquo; is a
                  category your company already buys, ai fluency lessons
                  fit on that same shelf. that&rsquo;s by design.
                </p>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* Chapter 02 — marketing agency / freelance, software fluency
            for juniors. Direct precedent for the ai-fluency move. */}
        <section className="grid grid-cols-canvas gap-6 pb-10">
          <div className="col-span-3 md:col-start-2 md:col-span-2">
            <PaperApp
              width="medium"
              chromeLeft="ch_02.md"
              chromeRight="agency / freelance"
            >
              <div className="max-w-prose">
                <p className="font-display text-[11px] uppercase tracking-[0.18em] font-semibold text-green mb-3">
                  chapter 02 &mdash; the precedent
                </p>
                <h2 className="font-display text-[24px] font-bold text-ink leading-tight tracking-display-tight mb-5">
                  marketing agency, freelance, and the golden age of
                  door-opening software.
                </h2>
                <p className="font-body text-[17px] leading-relaxed text-ink mb-4">
                  the last decade was a quiet boom of software that
                  opened career doors &mdash; linkedin tools, sales and
                  marketing platforms, anything a junior could learn fast
                  to get into a room. as a freelancer i had the time and
                  incentive to actually pick the new tools up, use them
                  where they fit, and walk junior people through the same.
                </p>
                <p className="font-body text-[15px] leading-relaxed text-ink-soft">
                  ai fluency lessons are the same pattern, applied to ai.
                </p>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* Chapter 03 — military, sigint + Korean linguist. Origin of
            both the language-teaching thread and deep tech comfort. */}
        <section className="grid grid-cols-canvas gap-6 pb-10">
          <div className="col-span-3 md:col-start-1 md:col-span-2">
            <PaperApp
              width="medium"
              chromeLeft="ch_03.md"
              chromeRight="us military"
            >
              <div className="max-w-prose">
                <p className="font-display text-[11px] uppercase tracking-[0.18em] font-semibold text-purple mb-3">
                  chapter 03 &mdash; where it started
                </p>
                <h2 className="font-display text-[24px] font-bold text-ink leading-tight tracking-display-tight mb-5">
                  signals intelligence and a korean linguist&rsquo;s
                  first classroom.
                </h2>
                <p className="font-body text-[17px] leading-relaxed text-ink mb-4">
                  first career: us military, signals intelligence, korean
                  linguist. cutting-edge hardware in one hand, a second
                  language in the other. language-teaching and language-
                  learning both started here, not in prague.
                </p>
                <p className="font-body text-[15px] leading-relaxed text-ink-soft">
                  i also ran training for my unit. the &ldquo;teaching as
                  a daily verb&rdquo; habit dates from then.
                </p>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* Chapter 04 — psychology degree. Frames the discomfort of
            learning a new thing — important context for what an ai
            fluency lesson actually feels like. */}
        <section className="grid grid-cols-canvas gap-6 pb-10">
          <div className="col-span-3 md:col-start-2 md:col-span-2">
            <PaperApp
              width="medium"
              chromeLeft="ch_04.md"
              chromeRight="formal education"
            >
              <div className="max-w-prose">
                <p className="font-display text-[11px] uppercase tracking-[0.18em] font-semibold text-orange mb-3">
                  chapter 04 &mdash; how learning works
                </p>
                <h2 className="font-display text-[24px] font-bold text-ink leading-tight tracking-display-tight mb-5">
                  my formal education is in psychology.
                </h2>
                <p className="font-body text-[17px] leading-relaxed text-ink mb-4">
                  picking up a new tool as an adult is mildly
                  uncomfortable. that discomfort is a real thing,
                  not a personal failing &mdash; and there are decent
                  ways to design around it. that&rsquo;s the part of a
                  psychology background that shows up in these lessons.
                </p>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* Chapter 05 — Czech immigrant. Self-aware closer to the
            chapters. Knows what learning hard things feels like
            because he&rsquo;s still doing it. Sets up the anchor line
            beat that follows. */}
        <section className="grid grid-cols-canvas gap-6 pb-12">
          <div className="col-span-3 md:col-start-1 md:col-span-2">
            <PaperApp
              width="medium"
              chromeLeft="ch_05.md"
              chromeRight="prague, ongoing"
            >
              <div className="max-w-prose">
                <p className="font-display text-[11px] uppercase tracking-[0.18em] font-semibold text-green mb-3">
                  chapter 05 &mdash; still a student
                </p>
                <h2 className="font-display text-[24px] font-bold text-ink leading-tight tracking-display-tight mb-5">
                  ten years in the czech republic, still learning czech.
                </h2>
                <p className="font-body text-[17px] leading-relaxed text-ink mb-4">
                  married to a czech, two bilingual kids. czech is
                  probably strong b1, early b2 on a good day. it&rsquo;s
                  hard, and it stays hard, and i&rsquo;m glad to know
                  what that feels like from this side of the desk too.
                </p>
              </div>
            </PaperApp>
          </div>
        </section>

        {/* Anchor-line beat. Centered terminal-line on the IDE
            substrate, between the last chapter and the closing CTA.
            This is the locked verbatim phrasing — single splash
            placement on /about, treated as a high-impact moment. */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-8 md:pt-14 md:pb-12">
          <div className="col-span-3 md:col-start-1 md:col-span-3">
            <div className="max-w-prose mx-auto text-center">
              <TerminalLine
                align="center"
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
          </div>
        </section>

        {/* Closing CTA — IDE-purple SectionTile pointing to /contact.
            Single hand-off, no parallel "see the lessons" link.
            Eyebrow framed as the natural next chapter. */}
        <section className="grid grid-cols-canvas gap-6 pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="col-span-3 md:col-start-2 md:col-span-1">
            <SectionTile
              variant="ide"
              accent="purple"
              eyebrow="next chapter"
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
