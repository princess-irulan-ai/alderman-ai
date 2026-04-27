import { PaperApp } from '@/components/paper/PaperApp'
import { SectionTile } from '@/components/special/SectionTile'

/**
 * SectionTile sandbox — final 6-variant comparison set.
 *
 * Reduced 2026-04-28 (third pass) from 8 tiles to 6 per Alex's pick.
 * Locked accent assignment ("purple on dark, orange on light") removed
 * the multi-accent grids; what remains is a focused side-by-side of
 * the three IDE variants and the three App variants Alex wants to
 * choose between for the live tiles.
 *
 * The six survivors:
 *
 *   IDE / dark substrate:
 *     1. Contained spacious — current shipping look (orange brackets,
 *        white cursor, marker centered in flow above the bottom border).
 *     2. Contained-notched spacious — same tile footprint as #1 but the
 *        orange-rectangle marker is absolutely positioned ON the bottom
 *        border (half hangs inside, half hangs into substrate). Body
 *        retains contained-style internal padding.
 *     3. Notched compact (Barlow) — short button-shaped tile, marker
 *        notched on bottom border, title in Barlow display (heading
 *        voice) instead of mono. Eyebrow + marker stay mono.
 *
 *   App / cream paper:
 *     4. Contained — cream-fill pill + orange knob, marker centered
 *        in flow. Title in Title Case. Em-dash eyebrow (`— EYEBROW —`).
 *     5. Contained-notched — same shell as #4 but pill notched on the
 *        bottom border. Em-dash eyebrow.
 *     6. Notched compact — short button shape, cream-fill pill notched
 *        on the bottom border. Em-dash eyebrow.
 *
 * Eyebrow alignment 2026-04-28: eyebrow's left edge moved from `left-4`
 * (16px) to `left-5` (20px) so its first character (the `=` for IDE,
 * the `—` for App) aligns with the title's left edge (shell's
 * `px-5` = 20px content inset). Same rule for both registers.
 *
 * Tiles are non-interactive in the sandbox (no `href`) — focus is
 * comparing styles, not testing click targets.
 *
 * Both registers width-capped to `max-w-[420px] mx-auto` so the
 * IDE tiles match the App tiles' visual width inside their PaperApp
 * surface. Page-level surface separation: IDE tiles render directly
 * on `bg-ide-2` (the page background); App tiles render inside a real
 * `<PaperApp width="wide">` so the cream-paper surface they ship on
 * is the surface they're previewed on.
 */

const PLACEHOLDER_EYEBROW = 'how it works'
const PLACEHOLDER_TITLE_IDE = 'three steps to fluency'
const PLACEHOLDER_TITLE_APP = 'Three Steps to Fluency'

export default function SectionTileSandboxPage() {
  return (
    <div className="min-h-screen bg-ide-2 text-ide-fg">
      <div className="mx-auto max-w-[860px] px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="font-mono text-[28px] text-ide-fg">
            SectionTile sandbox
          </h1>
          <p className="mt-3 font-mono text-[13px] text-ide-fg-dim leading-relaxed">
            preview-only · 6 final variants · 3 ide (purple on dark) +
            3 app (orange on cream) · pick which combinations ship to
            live tiles
          </p>
          <p className="mt-2 font-mono text-[12px] text-ide-fg-mute leading-relaxed">
            eyebrow: <span className="text-ide-fg-dim">"{PLACEHOLDER_EYEBROW}"</span>
            {' · '}
            ide title: <span className="text-ide-fg-dim">"{PLACEHOLDER_TITLE_IDE}"</span>
            {' · '}
            app title: <span className="text-ide-fg-dim">"{PLACEHOLDER_TITLE_APP}"</span>
          </p>
        </header>

        {/* IDE / purple — three variants on the dark substrate.
            All three width-capped to 420px so they match the App tile
            widths inside the PaperApp body below. */}
        <section className="mb-20">
          <h2 className="font-mono text-[18px] text-ide-fg mb-2">
            === ide / purple ===
          </h2>
          <p className="font-mono text-[12px] text-ide-fg-mute mb-8 leading-relaxed">
            1. contained spacious (current shipping) ·
            2. contained-notched spacious (same height, marker on
            border) ·
            3. notched compact + barlow (button shape, heading voice
            on title)
          </p>

          <div className="space-y-10">
            {/* 1. Contained spacious — current shipping look. */}
            <div>
              <div className="font-mono text-[10px] text-ide-fg-mute mb-2 lowercase tracking-wider">
                1. contained spacious
              </div>
              <div className="mx-auto w-full max-w-[420px]">
                <SectionTile
                  variant="ide"
                  accent="purple"
                  eyebrow={PLACEHOLDER_EYEBROW}
                  title={PLACEHOLDER_TITLE_IDE}
                  markerStyle="contained"
                />
              </div>
            </div>

            {/* 2. Contained-notched spacious — new variant. */}
            <div>
              <div className="font-mono text-[10px] text-ide-fg-mute mb-2 lowercase tracking-wider">
                2. contained-notched spacious — same body height as
                #1, marker notched on bottom border
              </div>
              <div className="mx-auto w-full max-w-[420px]">
                <SectionTile
                  variant="ide"
                  accent="purple"
                  eyebrow={PLACEHOLDER_EYEBROW}
                  title={PLACEHOLDER_TITLE_IDE}
                  markerStyle="notched"
                  tileHeight="spacious"
                />
              </div>
            </div>

            {/* 3. Notched compact, Barlow title. */}
            <div>
              <div className="font-mono text-[10px] text-ide-fg-mute mb-2 lowercase tracking-wider">
                3. notched compact (button) — barlow title, mono
                eyebrow + marker
              </div>
              <div className="mx-auto w-full max-w-[420px]">
                <SectionTile
                  variant="ide"
                  accent="purple"
                  eyebrow={PLACEHOLDER_EYEBROW}
                  title={PLACEHOLDER_TITLE_IDE}
                  markerStyle="notched"
                  tileHeight="compact"
                  ideTitleFont="barlow"
                />
              </div>
            </div>
          </div>
        </section>

        {/* App / orange — three variants inside real PaperApp surfaces.
            Each tile wrapped in `mx-auto max-w-[420px]` inside the
            PaperApp body so widths match the IDE tiles above. All
            three carry em-dash eyebrow. Title in Title Case. */}
        <section className="mb-20">
          <h2 className="font-mono text-[18px] text-ide-fg mb-2">
            === app / orange ===
          </h2>
          <p className="font-mono text-[12px] text-ide-fg-mute mb-8 leading-relaxed">
            4. contained (current shipping) ·
            5. contained-notched (same height, pill on border) ·
            6. notched compact (button shape, cream-fill pill on
            border) · all three em-dash eyebrow.
          </p>

          <div className="space-y-10">
            {/* 4. Contained — current shipping look. */}
            <div>
              <div className="font-mono text-[10px] text-ide-fg-mute mb-3 lowercase tracking-wider">
                4. contained — em-dash eyebrow, title case
              </div>
              <div className="grid grid-cols-canvas">
                <PaperApp
                  width="wide"
                  chromeLeft="sandbox.tile"
                  chromeRight="app · 4 · contained"
                >
                  <div className="mx-auto max-w-[420px]">
                    <SectionTile
                      variant="app"
                      accent="orange"
                      eyebrow={PLACEHOLDER_EYEBROW}
                      title={PLACEHOLDER_TITLE_APP}
                      markerStyle="contained"
                      eyebrowStyle="em-dash"
                    />
                  </div>
                </PaperApp>
              </div>
            </div>

            {/* 5. Contained-notched — pill notched on bottom border. */}
            <div>
              <div className="font-mono text-[10px] text-ide-fg-mute mb-3 lowercase tracking-wider">
                5. contained-notched — same body height as #4, pill
                notched on bottom border
              </div>
              <div className="grid grid-cols-canvas">
                <PaperApp
                  width="wide"
                  chromeLeft="sandbox.tile"
                  chromeRight="app · 5 · contained-notched"
                >
                  <div className="mx-auto max-w-[420px]">
                    <SectionTile
                      variant="app"
                      accent="orange"
                      eyebrow={PLACEHOLDER_EYEBROW}
                      title={PLACEHOLDER_TITLE_APP}
                      markerStyle="notched"
                      tileHeight="spacious"
                      eyebrowStyle="em-dash"
                      appPillFill="cream"
                    />
                  </div>
                </PaperApp>
              </div>
            </div>

            {/* 6. Notched compact — short button. */}
            <div>
              <div className="font-mono text-[10px] text-ide-fg-mute mb-3 lowercase tracking-wider">
                6. notched compact (button) — cream-fill pill on
                border
              </div>
              <div className="grid grid-cols-canvas">
                <PaperApp
                  width="wide"
                  chromeLeft="sandbox.tile"
                  chromeRight="app · 6 · notched compact"
                >
                  <div className="mx-auto max-w-[420px]">
                    <SectionTile
                      variant="app"
                      accent="orange"
                      eyebrow={PLACEHOLDER_EYEBROW}
                      title={PLACEHOLDER_TITLE_APP}
                      markerStyle="notched"
                      tileHeight="compact"
                      eyebrowStyle="em-dash"
                      appPillFill="cream"
                    />
                  </div>
                </PaperApp>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t border-ide-rule pt-6">
          <p className="font-mono text-[11px] text-ide-fg-mute">
            === end sandbox === · 6 final variants · 3 ide + 3 app
          </p>
        </footer>
      </div>
    </div>
  )
}
