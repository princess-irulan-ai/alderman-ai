import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { LabelBracket } from '@/components/ui/LabelBracket'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

/**
 * /about — ported from alderman-ai-full's /about (the "about your
 * instructor" page the top-nav link resolves to). Desktop layout matches
 * the source 1:1 per Alex 2026-04-26 ("the about should be the same as
 * Meet Your Instructor on desktop"). Mobile rules added on top so the
 * page renders without horizontal overflow at <md (single-col stacks,
 * smaller display sizes).
 *
 * Copy is the existing placeholder-grade port from the prior live site —
 * Alex will rewrite at Phase 5.
 *
 * Sections, top-to-bottom:
 *   1. Hero (A1)           — text on left, snug-fit paper app with
 *                            headshot on right
 *   2. story.md            — wide paper app, [ the story ] + 4 paras + quote
 *   3. diagnostic.md       — wide paper app, two-col who.for/who.not.for
 *   4. Portrait + where.md — medium paper app, Prague/Czechia location
 *   5. Final CTA           — full IDE substrate, "want to see…" + button
 */
export default function AboutPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[80px] md:h-[120px]" aria-hidden />

        {/* 1. Hero (A1) — text on left, snug-fit reality.md paper app
            with headshot on right. Mobile stacks vertically (text first,
            then headshot below). */}
        <section className="flex flex-col gap-8 pt-4 pb-12 md:flex-row md:items-start md:gap-12 md:pt-8 md:pb-16">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display-tight text-ide-fg">
              enabling <span className="text-green">ai</span> value with{' '}
              <span className="text-orange">HUMAN</span> values
            </h1>
            <p className="mt-6 max-w-[680px] font-body text-[16px] md:mt-8 md:text-[17px] leading-relaxed text-ide-fg/85">
              i<span className="text-purple">’</span>ve spent over 20 years
              working at the intersection of technology
              <span className="text-purple">,</span> education
              <span className="text-purple">,</span> and persuasion
              <span className="text-purple">.</span> i am the perfect instructor
              to teach you ai<span className="text-purple">.</span> i still
              believe in a world where ai is a tool for humans and not the other
              way around<span className="text-purple">.</span> for all of the
              silicon valley nerds thinking ai will run the world in three years
              <span className="text-purple">,</span> i challenge them to sell
              b2b services in europe<span className="text-purple">.</span>
            </p>
          </div>
          <div className="md:shrink-0">
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

        {/* 2. story.md */}
        <section className="py-12 md:grid md:grid-cols-canvas md:gap-6 md:py-16">
          <PaperApp width="wide">
            <div className="space-y-8 md:space-y-10">
              <LabelBracket>the story</LabelBracket>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
                <h2 className="font-display text-[26px] md:text-[32px] font-bold leading-[1.1] text-ink tracking-display-tight">
                  why I teach ai the way language teachers teach language.
                </h2>
                <div className="space-y-4 font-body text-[15px] md:space-y-5 md:text-[16px] leading-relaxed text-ink/90">
                  <p>
                    I spent a decade building software. Then I spent a decade
                    teaching people how to build software. The pattern never
                    changed: people learn tools by using them in context, with
                    feedback, on real work.
                  </p>
                  <p>
                    ai is no different. And yet most ai training today looks
                    like a 1990s software rollout — a Friday afternoon webinar,
                    a link to ChatGPT, and a cheerful &quot;let us know if you
                    have any questions.&quot;
                  </p>
                  <p>
                    Meanwhile the language-teaching world figured out fifty
                    years ago that immersion plus scaffolding beats theory
                    every time. You learn Czech by speaking Czech, not by
                    memorising verb tables. You learn ai by working with ai —
                    on your work, with someone who can tell you when the output
                    is hallucinating and when it&apos;s actually the best draft
                    you&apos;d get from a junior colleague.
                  </p>
                  <p>
                    That&apos;s what alderman.ai does. Six-to-eight week
                    programmes, real work as the curriculum, weekly live
                    sessions, async feedback on artifacts. It&apos;s HR&apos;s
                    L&amp;D model applied to ai. It&apos;s language teaching
                    applied to a new kind of language.
                  </p>
                </div>
              </div>
              <blockquote className="border-l-2 border-orange pl-5 font-display text-[18px] md:pl-6 md:text-[22px] font-semibold leading-snug text-ink/95">
                &ldquo;fluency is not a feature. it&apos;s a habit.&rdquo;
              </blockquote>
            </div>
          </PaperApp>
        </section>

        {/* 3. diagnostic.md */}
        <section className="py-12 md:grid md:grid-cols-canvas md:gap-6 md:py-16">
          <PaperApp width="wide">
            <div className="space-y-6 md:space-y-8">
              <LabelBracket>diagnostic</LabelBracket>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                <div className="font-mono text-[13px] leading-relaxed">
                  <div className="flex gap-2">
                    <span className="select-none text-purple">&gt;_</span>
                    <span className="text-ink">who.this.is.for()</span>
                  </div>
                  <div className="mt-2 flex gap-2 pl-5">
                    <span className="select-none text-ink-faint">→</span>
                    <span className="text-ink-soft">
                      HR and L&amp;D leads in Czech companies (30-3000 FTE) who
                      ran the ai experiment in 2024-25 and want to do it
                      properly this time.
                    </span>
                  </div>
                </div>
                <div className="font-mono text-[13px] leading-relaxed">
                  <div className="flex gap-2">
                    <span className="select-none text-purple">&gt;_</span>
                    <span className="text-ink">who.this.is.not.for()</span>
                  </div>
                  <div className="mt-2 flex gap-2 pl-5">
                    <span className="select-none text-ink-faint">→</span>
                    <span className="text-ink-soft">
                      teams looking for a one-hour prompt workshop, a recorded
                      course, or a shiny tool to deploy. ai fluency is taught,
                      not installed.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </PaperApp>
        </section>

        {/* 4. Portrait + where.md — portrait on top of paper-app on
            mobile; desktop puts portrait in col-start-2 with the narrow
            paper-app auto-flowing to col-start-3. */}
        <section className="flex flex-col items-center gap-8 py-12 md:grid md:grid-cols-canvas md:gap-6 md:py-16 md:items-center">
          <div className="flex justify-center md:col-span-1 md:col-start-2">
            <Image
              src="/brand-assets/photography/still-human-circle-portrait.svg"
              alt="Alex Alderman — still HUMAN"
              width={300}
              height={300}
              className="h-[220px] w-[220px] md:h-[300px] md:w-[300px]"
            />
          </div>
          <PaperApp width="narrow">
            <div className="space-y-4">
              <h3 className="font-display text-[22px] md:text-[24px] font-bold leading-tight text-ink tracking-display-tight">
                based in Prague. working across Czechia.
              </h3>
              <p className="font-body text-[14px] md:text-[15px] leading-relaxed text-ink-soft">
                in-person cohorts and audits in Prague and Brno; remote cohorts
                in english or czech across the country. always one instructor,
                never a platform.
              </p>
            </div>
          </PaperApp>
        </section>

        {/* 5. Final CTA */}
        <section className="py-20 md:grid md:grid-cols-canvas md:gap-6 md:py-32">
          <div className="md:col-span-3 flex flex-col items-center text-center gap-6 md:gap-8">
            <div className="font-mono text-[13px] text-ide-fg-mute tracking-wider">
              [ end of file ]
            </div>
            <h2 className="font-display text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-display-tight text-ide-fg max-w-[880px]">
              want to see what this looks like for your team?
            </h2>
            <p className="max-w-[620px] font-body text-[16px] md:text-[17px] leading-relaxed text-ide-fg/85">
              book a 20-minute audit. I&apos;ll listen, ask three questions, and
              tell you where ai fluency is worth investing — and where it
              isn&apos;t yet.
            </p>
            <div className="pt-2">
              <PrimaryButton href="/contact">talk to a HUMAN</PrimaryButton>
            </div>
          </div>
        </section>
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'about your instructor — alderman.ai',
  description:
    'alderman.ai is Alex Alderman — an AI fluency instructor based in Prague, teaching HR and L&D teams to work with ai, not around it.',
}
