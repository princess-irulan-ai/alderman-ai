'use client'

import { TerminalLine } from '@/components/special/TerminalLine'

/**
 * HeroTerminalBlock — H1 hero terminal lines.
 *
 * Vertical-stack hero (locked 2026-05-04, PLAN.md "Desktop strategy"):
 * each line renders independently via `lines="1"` or `lines="2"` and
 * runs its own IntersectionObserver type-out from mount. No `'both'`
 * stacked desktop mode, no baton-pass cursor choreography.
 *
 * Treatment, both lines:
 *   - `hangingPrompt` — the `>` hangs in the page-padding gutter to
 *     the left of the typed text; first character of typed text aligns
 *     to the canvas left edge. Wrapped lines align there too.
 *   - `showBrackets={false}` — drops the framing `[ ]` entirely. The
 *     purple `>` is the first visible character at column 1, followed
 *     by two leading NBSPs. Originally desktop-only had brackets; the
 *     vertical-stack lock dropped them everywhere.
 *   - `persistCursor` — the `_` keeps blinking after typing completes.
 *
 * Copy:
 *   Line 1: "ai fluency lessons help attract / retain top TALENT and
 *           also prepare for the new era of work" (ai green, / purple,
 *           TALENT orange)
 *   Line 2: "fluency helps your TEAMS navigate new tools while reducing
 *           their anxiety about being replaced" (TEAMS orange, anxiety
 *           green)
 *
 * Font-size:
 *   Default `HERO_FONT_SIZE_MOBILE` (22px) at every breakpoint. The old
 *   36px `HERO_FONT_SIZE_DESKTOP` was tuned for the prior wider canvas;
 *   the 540px column uses the mobile size everywhere until a new
 *   desktop type-scale lands.
 */

const HERO_FONT_SIZE_MOBILE = '22px'

export function HeroTerminalBlock({
  lines,
  fontSize,
}: {
  lines: '1' | '2'
  fontSize?: number | string
}) {
  const resolvedFontSize = fontSize ?? HERO_FONT_SIZE_MOBILE

  if (lines === '1') {
    return (
      <div className="w-full pr-0">
        <TerminalLine
          className="[font-variant-ligatures:none]"
          segments={[
            { text: 'ai', color: 'text-green' },
            { text: ' fluency lessons help attract ' },
            { text: '/', color: 'text-purple' },
            { text: ' retain top ' },
            { text: 'TALENT', color: 'text-orange' },
            { text: ' and also prepare for the new era of work' },
          ]}
          fontSize={resolvedFontSize}
          align="left"
          hangingPrompt
          showBrackets={false}
          persistCursor
          startDelayMs={1620}
        />
      </div>
    )
  }

  return (
    <div className="w-full pr-0">
      <TerminalLine
        segments={[
          { text: 'fluency helps your ' },
          { text: 'TEAMS', color: 'text-orange' },
          { text: ' navigate new tools while reducing their ' },
          { text: 'anxiety', color: 'text-green' },
          { text: ' about being replaced' },
        ]}
        fontSize={resolvedFontSize}
        align="left"
        hangingPrompt
        showBrackets={false}
        persistCursor
        startDelayMs={1620}
      />
    </div>
  )
}

export { HERO_FONT_SIZE_MOBILE }
