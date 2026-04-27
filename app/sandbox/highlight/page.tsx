import type { ReactNode } from 'react'

import { PaperApp } from '@/components/paper/PaperApp'
import { Postit } from '@/components/special/Postit'

/**
 * Highlighter sandbox — 7 variants of the marker-pen highlight applied
 * to "2025" (perks paper-app h2) and "2026" (the post-it).
 *
 * 2026-04-29 build per Alex: current shipping highlight (`bg-purple/90`
 * solid block, sharp rounded-sm rect) reads as a digital fill rather
 * than a real highlighter pen. Variants below explore opacity, layered
 * strokes, skew, underline-only, and an alternate yellow color so a
 * better default can be picked tomorrow.
 *
 * Per Alex's accompanying spec, the post-it's title + subtitle merge
 * into a single bold (title-weight) string: "ai fluency lessons are
 * the #1 L&D topic of 2026". Each variant renders that exact merged
 * copy with its own highlight on "2026".
 *
 * Variants:
 *   A. current shipping  — bg-purple/90 solid, sharp -rotate-1 rect
 *   B. translucent       — bg-purple/50, same shape, softer marker
 *   C. translucent + skew — bg-purple/55 with -skew-x-6, dynamic stroke
 *   D. layered double-pass — outer faded + inner saturated, mimics
 *                          imperfect overlapping marker strokes
 *   E. wide rounded stroke — bg-purple/55 with rounded-md + larger
 *                          insets, reads as a softer pill
 *   F. underline only    — thick rotated bar below the text, no fill
 *   G. yellow marker     — bg-yellow-300/70, classic highlighter color
 */

type HighlightRender = (text: string) => ReactNode

// Each variant returns a JSX fragment for the highlighted text — keeps
// the variants self-contained so any per-variant DOM can live there.
const variants: Array<{ id: string; label: string; render: HighlightRender }> =
  [
    {
      id: 'A',
      label: 'A. current shipping (bg-purple/90 solid)',
      render: (text) => (
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute -inset-x-1 -inset-y-0.5 -rotate-1 rounded-sm bg-purple/90"
          />
          <span className="relative">{text}</span>
        </span>
      ),
    },
    {
      id: 'B',
      label: 'B. translucent (bg-purple/50)',
      render: (text) => (
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute -inset-x-1 -inset-y-0.5 -rotate-1 rounded-sm bg-purple/50"
          />
          <span className="relative">{text}</span>
        </span>
      ),
    },
    {
      id: 'C',
      label: 'C. translucent + skew (bg-purple/55, -skew-x-6)',
      render: (text) => (
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute -inset-x-1.5 -inset-y-0.5 -rotate-1 -skew-x-6 rounded-sm bg-purple/55"
          />
          <span className="relative">{text}</span>
        </span>
      ),
    },
    {
      id: 'D',
      label: 'D. layered double-pass (outer 30% + inner 65%)',
      render: (text) => (
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute -inset-x-2 -inset-y-1 -rotate-2 rounded-sm bg-purple/30"
          />
          <span
            aria-hidden
            className="absolute -inset-x-1 -inset-y-0.5 rotate-1 rounded-sm bg-purple/65"
          />
          <span className="relative">{text}</span>
        </span>
      ),
    },
    {
      id: 'E',
      label: 'E. wide rounded stroke (bg-purple/55, rounded-md)',
      render: (text) => (
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
          />
          <span className="relative">{text}</span>
        </span>
      ),
    },
    {
      id: 'F',
      label: 'F. underline only (thick rotated bar, no fill)',
      render: (text) => (
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute inset-x-[-2px] -bottom-[3px] h-[6px] -rotate-1 rounded-full bg-purple/80"
          />
          <span className="relative">{text}</span>
        </span>
      ),
    },
    {
      id: 'G',
      label: 'G. yellow marker (bg-yellow-300/70)',
      render: (text) => (
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute -inset-x-1 -inset-y-0.5 -rotate-1 rounded-sm bg-yellow-300/70"
          />
          <span className="relative">{text}</span>
        </span>
      ),
    },
  ]

// Single shared post-it copy renderer — takes the variant's highlight
// renderer for the "2026" token. All other text is title-weight bold
// per Alex's "all to title weighting" spec.
function PostitCopy({ render }: { render: HighlightRender }) {
  return (
    <span
      className="font-display font-bold"
      style={{ fontSize: '24px', lineHeight: 1.12 }}
    >
      ai fluency lessons are the #1 L&amp;D topic of {render('2026')}
    </span>
  )
}

// Single shared perks h2 — Barlow display, bold, with the variant's
// highlight on "2025". Sized to roughly match the live mobile perks
// h2 (22px) so the preview is faithful.
function PerksHeading({ render }: { render: HighlightRender }) {
  return (
    <h2 className="font-display text-[22px] font-bold leading-none text-ink tracking-display-tight whitespace-nowrap">
      {render('2025')} Job Benefits
    </h2>
  )
}

export default function HighlighterSandboxPage() {
  return (
    <div className="min-h-screen bg-ide-2 text-ide-fg">
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        <header className="mb-12">
          <h1 className="font-mono text-[28px] text-ide-fg">
            highlighter sandbox
          </h1>
          <p className="mt-3 font-mono text-[13px] text-ide-fg-dim leading-relaxed max-w-[720px]">
            preview-only · 7 variants of the marker-pen highlight tested
            on the perks &ldquo;2025&rdquo; (paper-app h2) and the
            post-it &ldquo;2026&rdquo; (merged title-weight copy). pick
            one to promote to live.
          </p>
        </header>

        <div className="space-y-16">
          {variants.map((v) => (
            <section key={v.id} className="space-y-4">
              <h2 className="font-mono text-[16px] text-ide-fg-dim lowercase tracking-wider">
                {v.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Perks paper-app preview — full PaperApp wrapper so
                    the highlight reads on the cream surface in context. */}
                <div>
                  <p className="mb-3 font-mono text-[10px] text-ide-fg-mute lowercase tracking-wider">
                    perks h2 (cream paper surface)
                  </p>
                  <PaperApp
                    width="fit"
                    chromeLeft="2025-job-benefits"
                    chromeRight="hr / l&d"
                  >
                    <div className="space-y-6 px-2 py-1">
                      <PerksHeading render={v.render} />
                      <ul className="space-y-2 text-[16px] leading-snug text-ink">
                        <li>- English Lessons</li>
                        <li>- 30 Days PTO</li>
                        <li>- Flexible Home Office</li>
                        <li>- MultiSport Card</li>
                      </ul>
                    </div>
                  </PaperApp>
                </div>

                {/* Post-it preview — merged title-weight copy + this
                    variant's highlight on "2026". */}
                <div>
                  <p className="mb-3 font-mono text-[10px] text-ide-fg-mute lowercase tracking-wider">
                    post-it (orange surface, title-weight merged copy)
                  </p>
                  <div className="flex">
                    <Postit
                      rotation={-5}
                      heading={<PostitCopy render={v.render} />}
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 border-t border-ide-rule pt-6">
          <p className="font-mono text-[11px] text-ide-fg-mute">
            === end sandbox === · 7 variants
          </p>
        </footer>
      </div>
    </div>
  )
}
