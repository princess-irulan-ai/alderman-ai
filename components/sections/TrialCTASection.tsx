import { PaperApp } from '@/components/paper/PaperApp'
import { Postit } from '@/components/special/Postit'
import { SectionTile } from '@/components/special/SectionTile'

/**
 * TrialCTASection — credentials paper-app + BL post-it overhang.
 *
 * 2026-04-29 (composition reshuffle): the section now holds only the
 * credentials title + subtitle + App SectionTile + BL post-it. The
 * "enabling ai value with human values" tagline and the two
 * old-style `[ ... ]` TerminalCTA buttons have been removed; their
 * roles are absorbed by the new "book a full demo" IDE SectionTile
 * that sits further down the home page after the portrait.
 *
 * Section retains `id="brochure"` so any in-nav `#brochure` anchor
 * still scrolls here.
 *
 * The post-it overhang (~152px on mobile) is unaccounted for in this
 * section's flow — the page-level element that follows must add its
 * own top margin to clear it (currently the portrait section uses
 * `mt-[184px] md:mt-8`).
 */
export function TrialCTASection() {
  return (
    <section
      id="brochure"
      className="md:grid md:grid-cols-canvas md:gap-6 pt-12 pb-16 md:pt-16 md:pb-16 scroll-mt-24"
      aria-label="Credentials"
    >
      <div className="relative md:col-span-3">
        <PaperApp width="wide">
          <div className="space-y-4 md:space-y-5 pt-2 pb-[96px]">
            <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
              I&rsquo;ve been teaching for{' '}
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                />
                <span className="relative">20 years</span>
              </span>
            </h2>
            <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
              Including languages, software, and workflow modernization.
            </p>
            {/* Orange APP-variant SectionTile — first live use of the
                paper-dialect tile. Sits inside the credentials paper-app
                after the subtitle. PLACEHOLDER copy — Alex listed several
                eyebrow ideas (Meet your instructor / See my experience /
                Why trust me / More about me / More about Alex), shipping
                "instructor" / "see my experience" as a starting point;
                expect to iterate in the sandbox. */}
            <div className="mx-auto max-w-[420px] pt-10 md:pt-12">
              <SectionTile
                variant="app"
                accent="orange"
                eyebrow="instructor"
                title="See My Experience"
                href="/about"
                markerStyle="contained"
              />
            </div>
          </div>
        </PaperApp>
        {/* Bottom-left post-it — mirror of the hero's BR post-it. Sits
            ON the paper-app (overlaps its bottom-left corner area)
            and overhangs DOWN-LEFT past the paper-app's BL corner.
              - `right-1/2` anchors the post-it's right edge at the
                paper-app's horizontal center.
              - `top-full -mt-8` puts the wrapper's top 32px ABOVE
                the paper-app's bottom edge — i.e. inside the
                paper-app's bottom padding zone, just below the
                subtitle's last line. The post-it's body extends
                DOWN from that anchor.
              - `origin-top-right` scales from that anchor so the
                rotated+scaled tip lands at the viewport's left edge
                on mobile (mirror of the hero math). */}
        <div
          className="absolute right-1/2 top-full -mt-[92px] md:right-auto md:top-auto md:left-0 md:bottom-[-220px] pointer-events-none origin-top-right md:!transform-none"
          style={{ transform: 'scale(calc(50vw / 250px))' }}
        >
          <Postit
            flipX
            rotation={5}
            heading={
              <span
                className="font-display font-normal"
                style={{ fontSize: '30px', lineHeight: 1.05 }}
              >
                including 8+ years of{' '}
                <span className="relative inline-block font-bold">
                  <span
                    aria-hidden
                    className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                  />
                  <span className="relative">teaching ESL</span>
                </span>{' '}
                in the Czech Republic
              </span>
            }
          />
        </div>
      </div>
    </section>
  )
}
