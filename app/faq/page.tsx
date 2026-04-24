import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'
import { FaqOutroBlock } from '@/components/sections/FaqOutroBlock'
import { LabelBracket } from '@/components/ui/LabelBracket'

/**
 * /faq — third route of the holding-page launch.
 *
 * Instructions page explaining how the visitor downloads a `faq.md` and
 * uploads it to any LLM to get Q&A about Alex's company. Alex produces
 * `faq.md` externally and drops it into `alderman-ai/public/` — the
 * download-faq CTA points to `/faq.md` and 404s until then.
 *
 * Structure:
 *   1. Hero       — text-only: [ faq ] chip + display + subtitle.
 *   2. how.md     — wide PaperApp, three placeholder-grade steps walking
 *                   the visitor through download → upload → ask.
 *   3. Outro      — TerminalLine + download-faq + download-brochure CTAs,
 *                   same choreography as ContactOutroBlock / TrialCTASection.
 *                   Lives in its own client component so this page can
 *                   stay a server component and export `metadata`.
 *
 * Copy is placeholder (per CLAUDE.md "Alex writes all real copy"). Each
 * step body reads as bracketed monospaced placeholder copy until Alex
 * drops real copy in.
 */
export default function FaqPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        {/* Top seam — matches /contact's mobile/desktop rhythm. */}
        <div className="h-[80px] md:h-[120px]" aria-hidden />

        {/* 1. Hero — text-only. Chip + display + subtitle, left-aligned. */}
        <section className="pb-12 md:pt-8 md:pb-16">
          <p className="font-mono text-[13px] text-ide-fg-mute mb-6">[ faq ]</p>
          <h1 className="font-display text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display-tight text-ide-fg">
            ask <span className="text-green">ai</span> about us.
          </h1>
          <p className="mt-6 max-w-[680px] font-body text-[16px] md:text-[17px] leading-relaxed text-ide-fg/85">
            [placeholder subtitle — download a faq.md, upload it to any ai
            platform, and ask anything about alderman.ai.]
          </p>
        </section>

        {/* 2. how.md — three steps. Placeholder-grade, bracketed copy
            until Alex drops real instructions in. */}
        <section className="py-8 md:grid md:grid-cols-canvas md:gap-6 md:py-16">
          <PaperApp width="wide">
            <div className="space-y-8">
              <LabelBracket>how it works</LabelBracket>
              <ol className="space-y-6 font-mono text-[15px]">
                <li className="flex flex-col gap-1 border-l-2 border-orange py-2 pl-6">
                  <span className="flex items-center gap-2 text-ink-soft">
                    <span className="text-purple">&gt;_</span>
                    step_01.download()
                  </span>
                  <span className="text-[17px] text-ink">
                    [placeholder — grab the faq.md from the button below.]
                  </span>
                </li>
                <li className="flex flex-col gap-1 border-l-2 border-purple py-2 pl-6">
                  <span className="flex items-center gap-2 text-ink-soft">
                    <span className="text-purple">&gt;_</span>
                    step_02.upload()
                  </span>
                  <span className="text-[17px] text-ink">
                    [placeholder — open your favorite ai platform (claude,
                    chatgpt, gemini, etc.) and attach the file.]
                  </span>
                </li>
                <li className="flex flex-col gap-1 border-l-2 border-green py-2 pl-6">
                  <span className="flex items-center gap-2 text-ink-soft">
                    <span className="text-purple">&gt;_</span>
                    step_03.ask()
                  </span>
                  <span className="text-[17px] text-ink">
                    [placeholder — ask anything about alderman.ai. the model
                    will answer from the file.]
                  </span>
                </li>
              </ol>
              <p className="font-mono text-[12px] text-ink-faint pt-4 border-t border-ink-faint/30">
                === works with any ai platform that accepts file uploads ===
              </p>
            </div>
          </PaperApp>
        </section>

        {/* 3. Outro — TerminalLine + download-faq + download-brochure CTAs. */}
        <FaqOutroBlock />

        <div className="pb-16 md:pb-32" aria-hidden />
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'faq — alderman.ai',
  description:
    'Download a faq.md and ask any ai platform anything about alderman.ai.',
}
