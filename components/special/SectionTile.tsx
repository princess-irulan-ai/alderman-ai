'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * SectionTile — "one system, two dialects" tile primitive.
 *
 * Same anatomy in both variants:
 *   eyebrow  — small label above the title
 *   title    — the main line (single line, sentence case OK)
 *   marker   — walking-cursor CTA affordance at the bottom
 *
 * SURFACE-DRIVEN DIALECT:
 *   IDE variant (variant='ide')  — sits on dark substrate. Mono font.
 *     Eyebrow:  `=== eyebrow ===` in muted ide-fg-mute.
 *     Title:    mono, ide-fg, medium weight.
 *     Marker:   `[ >_ ]` with the `_` walking horizontally through 3
 *               positions on a 1.06s loop (`animate-cursor-walk-3`).
 *               Brackets are colored by the `bracketColor` prop
 *               (default neutral / ide-fg). The `>` and `_` carry the
 *               accent color.
 *
 *   APP variant (variant='app')  — sits on cream paper. Barlow display.
 *     Eyebrow:  `EYEBROW` (caps) OR `— EYEBROW —` (em-dash flanked) per
 *               `eyebrowStyle`. Muted ink-soft.
 *     Title:    Barlow display, ink, bold.
 *     Marker:   pill outline (rounded-full, ink stroke, transparent
 *               fill) with a small ink-filled knob walking horizontally
 *               through 3 positions on the same 1.06s loop
 *               (`animate-knob-walk-3`). No background tint behind the
 *               pill — Alex's spec.
 *
 * SANDBOX KNOBS:
 *   `bracketColor` (IDE only) — try the framing brackets in neutral,
 *     purple, or orange. Default neutral.
 *   `eyebrowStyle` (App only) — try plain caps or em-dash flanked.
 *     Default caps.
 *
 * INTERACTION:
 *   When `href` is provided, the whole tile is the click target
 *   (rendered with `next/link`). Subtle hover: border color shifts to
 *   the accent. When `href` is absent, renders as a non-interactive
 *   `<div>` (no hover, no click) — used by the sandbox to preview
 *   variants without pretending they're clickable.
 *
 * NOT YET WIRED ANYWHERE LIVE — this is the new primitive intended to
 * eventually replace TerminalCTA's role on section seams. Currently
 * only consumed by `app/sandbox/tile/page.tsx`.
 */

export type SectionTileVariant = 'ide' | 'app'
export type SectionTileAccent = 'purple' | 'orange' | 'green'
export type SectionTileBracketColor = 'neutral' | 'purple' | 'orange'
export type SectionTileEyebrowStyle = 'caps' | 'em-dash'
/**
 * Marker rendering mode (sandbox prototype 2026-04-28).
 *   classic   — current shipping look. IDE: `[ >_ ]` framing brackets.
 *               App: pill with transparent fill. Right-justified under
 *               the title.
 *   contained — IDE (v3): orange brackets + white `_` cursor + purple
 *               `>` prompt, no fill, no glow. App: pill with cream fill
 *               and orange knob. Both centered under the title.
 *   notched   — like contained but the marker is absolutely positioned
 *               on the bottom border (vertically centered on the line,
 *               horizontally centered on the x-axis), so half hangs
 *               inside the tile and half hangs into the surrounding
 *               surface. Tile vertical padding collapses since the
 *               marker is no longer in the flow — reads as a literal
 *               button. App pill fill for notched can be `'cream'` or
 *               `'purple'` via `appPillFill` so Alex can see which
 *               reads better when half-hanging into cream paper.
 */
export type SectionTileMarkerStyle = 'classic' | 'contained' | 'notched'

/** IDE-only sandbox knob for the notched prototype: title font family. */
export type SectionTileIdeTitleFont = 'mono' | 'barlow'

/** App-only sandbox knob for the notched prototype: pill fill color. */
export type SectionTileAppPillFill = 'cream' | 'purple'

/**
 * IDE-only sandbox knob for the notched prototype: which frame surrounds
 * the walking cursor.
 *   rectangle — current shipping notched look. 1px orange border around a
 *               `bg-ide-2` interior holding the walking cursor.
 *   brackets  — orange `[` and `]` glyphs flanking a `bg-ide-2` interior.
 *               Same blackout-the-seam trick as `rectangle` (the patch
 *               between the brackets matches the substrate so the cursor
 *               doesn't render across the gradient/substrate seam) but
 *               trades the rectangle frame for the bracket vocabulary the
 *               classic shipping marker already uses elsewhere on the
 *               site. 2026-04-29 prototype per Alex's request to see if
 *               brackets work in the notched position.
 */
export type SectionTileIdeNotchedFrame = 'rectangle' | 'brackets'

/**
 * Tile height profile (2026-04-28 — supports the contained-notched
 * variant Alex wanted in the sandbox).
 *   spacious — full body height that classic/contained tiles produce
 *              (title + marker zone + padding). Used for tiles where
 *              we want the contained shape regardless of whether the
 *              marker is in flow or notched on the border.
 *   compact  — body collapses to title-only height. Used for the
 *              "button"-shaped notched variant where the marker is
 *              the only thing on the border and there's no in-flow
 *              marker zone.
 * Only applies when markerStyle === 'notched'. Classic/contained
 * always use spacious dimensions because the marker IS in flow.
 */
export type SectionTileHeight = 'compact' | 'spacious'

export type SectionTileProps = {
  variant: SectionTileVariant
  /** Accent color for the marker glyphs. Default 'purple'. */
  accent?: SectionTileAccent
  eyebrow: string | ReactNode
  title: string | ReactNode
  /** If provided, the whole tile becomes a link. Otherwise non-interactive. */
  href?: string
  /**
   * IDE-only. Color of the framing `[ ]` brackets around the marker.
   * Default 'neutral' (ide-fg). Sandbox knob.
   */
  bracketColor?: SectionTileBracketColor
  /**
   * App-only. Eyebrow framing — plain CAPS or `— EYEBROW —` em-dash
   * flanked. Default 'caps'. Sandbox knob.
   */
  eyebrowStyle?: SectionTileEyebrowStyle
  /**
   * Marker rendering mode. 'classic' (default) = current shipping look.
   * 'contained' = orange-bracket IDE / cream-pill App, centered.
   * 'notched' = same marker styles but absolutely positioned on the
   * bottom border (sandbox prototype).
   */
  markerStyle?: SectionTileMarkerStyle
  /**
   * IDE-only sandbox knob (notched prototype). Default 'mono'.
   * 'barlow' switches the title to font-display Barlow at the App's
   * type scale — testing whether the IDE tile reads better with a
   * heading-voice title and reserves mono for the eyebrow + marker.
   */
  ideTitleFont?: SectionTileIdeTitleFont
  /**
   * App-only sandbox knob (notched prototype). Default 'cream'.
   * 'purple' switches the pill fill to brand purple so the half that
   * hangs into cream paper still reads — sandbox compares both.
   */
  appPillFill?: SectionTileAppPillFill
  /**
   * IDE-only sandbox knob (notched prototype). Default 'rectangle'
   * (current shipping notched look). 'brackets' swaps the orange
   * rectangle frame for `[ ]` bracket glyphs with a blacked-out
   * interior.
   */
  ideNotchedFrame?: SectionTileIdeNotchedFrame
  /**
   * Tile body height. Only meaningful when `markerStyle='notched'`.
   * Default 'spacious' — body retains the classic/contained
   * dimensions even though the marker is on the border (so the tile
   * keeps the same overall footprint as a non-notched sibling).
   * 'compact' collapses the body to title-only height — produces
   * the literal button shape.
   */
  tileHeight?: SectionTileHeight
  /** Extra classes appended to the outer wrapper. */
  className?: string
}

// Accent → Tailwind text-color class. Used for the `>` prompt and `_`
// cursor in IDE variant, and the knob fill / border in App variant
// (App variant currently uses ink for the knob; accent is reserved for
// future use / hover states).
const ACCENT_TEXT: Record<SectionTileAccent, string> = {
  purple: 'text-purple',
  orange: 'text-orange',
  green: 'text-green',
}

const ACCENT_BORDER_HOVER: Record<SectionTileAccent, string> = {
  purple: 'hover:border-purple/60',
  orange: 'hover:border-orange/60',
  green: 'hover:border-green/60',
}

// IDE bracket-color knob. Neutral = the codified ide-fg (off-white).
// Purple / orange try the framing in a brand color so Alex can compare.
const BRACKET_TEXT: Record<SectionTileBracketColor, string> = {
  neutral: 'text-ide-fg',
  purple: 'text-purple',
  orange: 'text-orange',
}

// Soft accent-colored glow under the IDE marker — a CSS drop-shadow
// filter that traces opaque pixels (brackets + cursor + prompt) and
// projects a low-opacity halo, giving the click affordance a subtle
// "this is interactive" warmth at rest. Per Alex 2026-04-28: "the
// animated cursor should have a kind of purple glow" — reading "purple"
// as accent-colored, so the glow color tracks the accent prop.
const ACCENT_GLOW_DROP: Record<SectionTileAccent, string> = {
  purple: 'drop-shadow-[0_0_10px_rgba(174,129,255,0.55)]',
  orange: 'drop-shadow-[0_0_10px_rgba(253,151,31,0.55)]',
  green: 'drop-shadow-[0_0_10px_rgba(166,226,46,0.55)]',
}

// Accent-tinted box-shadow that fires on tile hover, giving the whole
// tile a soft glow that reads as a click affordance. Applied only to
// interactive tiles (those with an `href`). Per Alex 2026-04-29.
const ACCENT_HOVER_GLOW: Record<SectionTileAccent, string> = {
  purple: 'hover:shadow-[0_0_28px_rgba(174,129,255,0.45)]',
  orange: 'hover:shadow-[0_0_28px_rgba(253,151,31,0.45)]',
  green: 'hover:shadow-[0_0_28px_rgba(166,226,46,0.45)]',
}

// Diagonal accent-tint gradient for the tile shell — concentrated at the
// bottom-left corner, fading to transparent toward the top-right. Reads
// as a soft opalescent metallic feel, similar to the paper-app chrome
// strip. Most of the tint lives in the BL so the eyebrow (top-left) and
// title (mid) stay clean. Per Alex 2026-04-28: "fill gradient, really
// light, hypotenuse from BL to TR, color at corner shifting to white at
// 25% across".
//
// Split by variant 2026-04-28 (later same day): purple-on-dark naturally
// has more pop than orange-on-cream, so the App-variant gradient is
// cranked higher (~0.50 / 0.22 vs IDE's 0.30 / 0.10) to compensate.
// IDE values stayed put — Alex was happy with the purple level.
// 2026-04-28 (later): bumped both variants' gradient strength after
// the eyebrow notch refactor freed up the top-left tinted zone (eyebrow
// no longer sits inside the gradient — it's on the border with its own
// surface-bg). IDE: 0.30/0.10 → 0.45/0.18. App: 0.50/0.22 → 0.65/0.30.
// Keeps the BL-corner-anchored shape, just more saturated.
const ACCENT_GRADIENT_IDE: Record<SectionTileAccent, string> = {
  purple:
    'linear-gradient(to top right, rgba(174, 129, 255, 0.45) 0%, rgba(174, 129, 255, 0.18) 25%, transparent 65%)',
  orange:
    'linear-gradient(to top right, rgba(253, 151, 31, 0.45) 0%, rgba(253, 151, 31, 0.18) 25%, transparent 65%)',
  green:
    'linear-gradient(to top right, rgba(166, 226, 46, 0.45) 0%, rgba(166, 226, 46, 0.18) 25%, transparent 65%)',
}

const ACCENT_GRADIENT_APP: Record<SectionTileAccent, string> = {
  purple:
    'linear-gradient(to top right, rgba(174, 129, 255, 0.65) 0%, rgba(174, 129, 255, 0.30) 25%, transparent 75%)',
  orange:
    'linear-gradient(to top right, rgba(253, 151, 31, 0.65) 0%, rgba(253, 151, 31, 0.30) 25%, transparent 75%)',
  green:
    'linear-gradient(to top right, rgba(166, 226, 46, 0.65) 0%, rgba(166, 226, 46, 0.30) 25%, transparent 75%)',
}

// Knob fill color for the App-variant pill marker. Originally `bg-ink`
// (dark dot on cream); 2026-04-28 Alex asked for the knob to carry the
// accent color (orange knob on the orange tile). Same accent map shape
// as ACCENT_TEXT but on bg-* instead of text-*.
const ACCENT_KNOB_BG: Record<SectionTileAccent, string> = {
  purple: 'bg-purple',
  orange: 'bg-orange',
  green: 'bg-green',
}

export function SectionTile({
  variant,
  accent = 'purple',
  eyebrow,
  title,
  href,
  bracketColor = 'neutral',
  eyebrowStyle = 'caps',
  markerStyle = 'classic',
  ideTitleFont = 'mono',
  appPillFill = 'cream',
  ideNotchedFrame = 'rectangle',
  tileHeight = 'spacious',
  className = '',
}: SectionTileProps) {
  const isIde = variant === 'ide'
  const isNotched = markerStyle === 'notched'
  const isCompact = isNotched && tileHeight === 'compact'

  // Outer container classes — surface-appropriate border + spacing. IDE
  // variant uses a sharper rounded-tile + ide-rule border; App variant
  // uses rounded-paper-ish + ink/15 border. Hover lifts border to accent.
  // Border 2px (bumped 2026-04-28). Vertical padding `py-3` for classic/
  // contained; tightened to `py-2` in notched mode since the marker is
  // out of flow and the tile collapses to button height. `relative` is
  // load-bearing for the absolute-positioned notched eyebrow above and
  // the absolute-positioned notched marker below.
  const interactive = Boolean(href)
  const hoverBorderClass = interactive ? ACCENT_BORDER_HOVER[accent] : ''
  const hoverGlowClass = interactive ? ACCENT_HOVER_GLOW[accent] : ''
  // Vertical padding logic:
  //   - Classic / contained: `py-3` (12px each side). Marker sits in
  //     flow below the title, so total tile height = pad + title +
  //     mt-4 + marker + pad.
  //   - Notched + spacious: `pt-3 pb-12` (12px top + 48px bottom).
  //     The 48px bottom reserves vertical space equivalent to where
  //     the in-flow marker would have been (mt-4 + ~marker height +
  //     padding) so the tile keeps the same footprint as a
  //     contained-style tile. Marker is absolutely positioned on
  //     the bottom border.
  //   - Notched + compact: `py-3`. No extra space — body collapses
  //     to title-only height. Tile reads as a literal button.
  const verticalPadClass = isNotched
    ? isCompact
      ? 'py-3'
      : 'pt-3 pb-12'
    : 'py-3'
  const baseShellClass = isIde
    ? `relative block rounded-tile border-2 border-ide-rule px-5 ${verticalPadClass} transition-[box-shadow,border-color] duration-200 ${hoverBorderClass} ${hoverGlowClass}`
    : `relative block rounded-tile border-2 border-ink/15 px-5 ${verticalPadClass} transition-[box-shadow,border-color] duration-200 ${hoverBorderClass} ${hoverGlowClass}`
  const shellStyle = {
    background: (isIde ? ACCENT_GRADIENT_IDE : ACCENT_GRADIENT_APP)[accent],
  }

  const content: ReactNode = (
    <>
      {/* Eyebrow — colored by accent. Floats ABOVE the tile's top border
          per Alex 2026-04-28: notched-into-the-border was creating a
          visible bg-color rectangle that read as a "box around the
          eyebrow" once the gradient strengthened. Pulled fully outside
          the shell (`bottom-full mb-1`) so the tile keeps a complete
          perimeter and the eyebrow becomes a small label sitting just
          above it. No bg — eyebrow text floats freely on whatever the
          surrounding surface is. */}
      {isIde ? (
        <div
          className={`absolute bottom-full left-5 mb-1 font-mono text-[11px] tracking-[0.12em] lowercase ${ACCENT_TEXT[accent]}`}
        >
          <span aria-hidden>===&nbsp;</span>
          {eyebrow}
          <span aria-hidden>&nbsp;===</span>
        </div>
      ) : (
        <div
          className={`absolute bottom-full left-5 mb-1 font-display text-[11px] uppercase tracking-[0.18em] font-semibold ${ACCENT_TEXT[accent]}`}
        >
          {eyebrowStyle === 'em-dash' ? (
            <>
              <span aria-hidden>—&nbsp;</span>
              {typeof eyebrow === 'string' ? eyebrow.toUpperCase() : eyebrow}
              <span aria-hidden>&nbsp;—</span>
            </>
          ) : typeof eyebrow === 'string' ? (
            eyebrow.toUpperCase()
          ) : (
            eyebrow
          )}
        </div>
      )}

      {/* Title — IDE default keeps lowercase mono (terminal voice).
          Sandbox knob `ideTitleFont='barlow'` swaps to Barlow display
          for the notched prototype to test heading-voice on the IDE
          tile (the eyebrow + marker still carry mono so the terminal
          reference stays). App respects the caller's casing per Alex
          2026-04-28 ("light tile title in Title Case"). */}
      <div
        className={
          isIde
            ? ideTitleFont === 'barlow'
              ? 'font-display text-[22px] font-bold text-ide-fg lowercase leading-tight tracking-display-tight'
              : 'font-mono text-[20px] font-medium text-ide-fg lowercase leading-tight'
            : 'font-display text-[22px] font-bold text-ink leading-tight tracking-display-tight'
        }
      >
        {title}
      </div>

      {/* Marker — walking cursor (IDE) or walking knob (App). Position
          flips to centered when `markerStyle === 'contained'`; in
          `notched` mode the marker is absolutely positioned on the
          BOTTOM BORDER (vertically centered on the line, half hangs
          inside the tile, half hangs into the surrounding surface).
          Default classic stays right-justified. */}
      {isNotched ? (
        // `flex` collapses the wrapper's box to the marker's exact
        // height (otherwise inline-block's line-box descender space
        // pads the wrapper, throwing translate-y-1/2 off — Alex
        // flagged the App pill was hanging only ~1/3 below the
        // border instead of 50/50).
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 pointer-events-none flex">
          {isIde ? (
            <IdeMarker
              accent={accent}
              bracketColor={bracketColor}
              markerStyle={markerStyle}
              ideNotchedFrame={ideNotchedFrame}
            />
          ) : (
            <AppMarker
              accent={accent}
              markerStyle={markerStyle}
              appPillFill={appPillFill}
            />
          )}
        </div>
      ) : (
        <div
          className={`mt-4 flex ${markerStyle === 'contained' ? 'pl-[50%]' : 'justify-end'}`}
        >
          {isIde ? (
            <IdeMarker
              accent={accent}
              bracketColor={bracketColor}
              markerStyle={markerStyle}
              ideNotchedFrame={ideNotchedFrame}
            />
          ) : (
            <AppMarker
              accent={accent}
              markerStyle={markerStyle}
              appPillFill={appPillFill}
            />
          )}
        </div>
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseShellClass} ${className}`}
        style={shellStyle}
      >
        {content}
      </Link>
    )
  }

  // No href — render a plain div with no hover affordance so sandbox
  // tiles don't pretend to be clickable. Same border + gradient + relative
  // positioning + notched-aware vertical padding as the interactive
  // shell, just no hover state.
  return (
    <div
      className={`${
        isIde
          ? `relative block rounded-tile border-2 border-ide-rule px-5 ${verticalPadClass}`
          : `relative block rounded-tile border-2 border-ink/15 px-5 ${verticalPadClass}`
      } ${className}`}
      style={shellStyle}
    >
      {content}
    </div>
  )
}

/**
 * IDE marker — `[ >_ ]` with a walking underscore cursor.
 *
 * The interior is a fixed-width 3-cell area. The `>` sits at column 0,
 * the `_` rides on a translateX animation that hops it through 3
 * positions (0 / 0.6ch / 1.2ch) over 1.06s, then snap-backs. Brackets
 * stay still — only the `_` moves.
 *
 * Layout note: the `>_` pair is wrapped in a fixed-width inline-block
 * sized to ~3ch so the trailing space inside the brackets always reads
 * the same width regardless of cursor position. Brackets sit outside
 * that fixed-width region so they don't drift.
 */
function IdeMarker({
  accent,
  bracketColor,
  markerStyle,
  ideNotchedFrame = 'rectangle',
}: {
  accent: SectionTileAccent
  bracketColor: SectionTileBracketColor
  markerStyle: SectionTileMarkerStyle
  ideNotchedFrame?: SectionTileIdeNotchedFrame
}) {
  const accentClass = ACCENT_TEXT[accent]
  const bracketClass = BRACKET_TEXT[bracketColor]

  // Shared interior — fixed-width prompt + walking cursor. Same in both
  // marker styles; only the framing changes.
  const interior = (
    <span
      className="relative inline-block"
      style={{ width: '5ch', height: '1em' }}
    >
      <span className={`${accentClass} absolute left-0 top-0`}>
        &gt;
      </span>
      <span
        className={`${accentClass} absolute top-0 inline-block animate-cursor-walk-3 motion-reduce:animate-none`}
        style={{ left: '0.8ch' }}
      >
        _
      </span>
    </span>
  )

  if (markerStyle === 'contained') {
    // Contained mode v3 (2026-04-28): orange brackets framing the
    // cursor. White `_`, accent `>`, no fill, no glow. Lives centered
    // above the bottom border (still inside the tile, in flow).
    return (
      <span
        className="font-mono text-[16px] inline-flex items-baseline gap-[0.25ch] select-none"
        aria-hidden
      >
        <span className="text-orange">[</span>
        <span
          className="relative inline-block"
          style={{ width: '5ch', height: '1em' }}
        >
          <span className={`${accentClass} absolute left-0 top-0`}>
            &gt;
          </span>
          <span
            className="text-ide-fg absolute top-0 inline-block animate-cursor-walk-3 motion-reduce:animate-none"
            style={{ left: '0.8ch' }}
          >
            _
          </span>
        </span>
        <span className="text-orange">]</span>
      </span>
    )
  }

  if (markerStyle === 'notched') {
    if (ideNotchedFrame === 'brackets') {
      // Brackets variant (2026-04-29 prototype). Same blackout-the-seam
      // trick as the rectangle variant — the dark patch between the two
      // bracket glyphs is `bg-ide-2` so the cursor doesn't render across
      // the gradient/substrate seam — but the visible frame is two
      // orange bracket glyphs straddling the seam instead of a 1px
      // rectangle border. The brackets themselves are solid color, so
      // the seam through them is invisible. Same translateY +4 / -4
      // counter-translate as the rectangle variant so the cursor's
      // page-y position is unchanged.
      return (
        <span
          className="font-mono text-[16px] inline-flex items-baseline select-none"
          style={{ transform: 'translateY(4px)' }}
          aria-hidden
        >
          <span className="text-orange">[</span>
          <span className="bg-ide-2 inline-block px-[2px] py-[4px]">
            <span
              className="relative inline-block"
              style={{
                width: '5ch',
                height: '1em',
                transform: 'translateY(-4px)',
              }}
            >
              <span className={`${accentClass} absolute left-0 top-0`}>
                &gt;
              </span>
              <span
                className="text-ide-fg absolute top-0 inline-block animate-cursor-walk-3 motion-reduce:animate-none"
                style={{ left: '0.8ch' }}
              >
                _
              </span>
            </span>
          </span>
          <span className="text-orange">]</span>
        </span>
      )
    }

    // Notched rectangle mode (2026-04-28, latest rev per Alex):
    //  - 1px border (`border` not `border-2`).
    //  - Tight vertical padding: 1px above `>`, 1px below `_`.
    //  - Rectangle is shifted down 2px relative to its natural
    //    position (transform translateY +2px on the outer box) so
    //    the box bottom drops past the walking `_` cursor's
    //    descender. The inner cursor track has a counter-translate
    //    of -2px so the `>` and `_` glyphs stay at their original
    //    page position — only the rectangle visibly drops.
    //  - Right padding trimmed 2px (`pr-[6px]` vs `pl-2 = 8px`)
    //    per Alex's "right edge 2px narrower from the right side
    //    only". Left padding stays at `pl-2`.
    return (
      <span
        className="font-mono text-[16px] inline-flex items-baseline rounded-sm border border-orange bg-ide-2 pl-[7px] pr-[5px] py-px select-none"
        style={{ transform: 'translateY(4px)' }}
        aria-hidden
      >
        <span
          className="relative inline-block"
          style={{
            width: '5ch',
            height: '1em',
            transform: 'translateY(-4px)',
          }}
        >
          <span className={`${accentClass} absolute left-0 top-0`}>
            &gt;
          </span>
          <span
            className="text-ide-fg absolute top-0 inline-block animate-cursor-walk-3 motion-reduce:animate-none"
            style={{ left: '0.8ch' }}
          >
            _
          </span>
        </span>
      </span>
    )
  }

  // Classic mode (current shipping): `[ >_ ]` framing brackets.
  return (
    <span
      className={`font-mono text-[16px] inline-flex items-baseline gap-[0.25ch] select-none ${ACCENT_GLOW_DROP[accent]}`}
      aria-hidden
    >
      <span className={bracketClass}>[</span>
      <span className="inline-flex items-baseline gap-[0.25ch]">
        {interior}
      </span>
      <span className={bracketClass}>]</span>
    </span>
  )
}

/**
 * App marker — pill outline with a walking ink knob.
 *
 * Pill: 44px × 18px, thin ink/40 stroke, transparent fill, rounded-full.
 * Knob: 12px circle, ink fill, walks through 3 positions (0 / 13px /
 * 26px) over 1.06s, then snap-backs. No background tint behind the
 * pill — Alex's spec ruled out the lavender SVG-ref tint.
 *
 * Knob inset: positioned at top: 50%, translateY(-50%) so it stays
 * vertically centered as it walks. The walk-knob-3 animation only
 * changes translateX; the static translateY(-50%) is composed via
 * a wrapper span so the two transforms don't fight.
 */
function AppMarker({
  accent,
  markerStyle,
  appPillFill,
}: {
  accent: SectionTileAccent
  markerStyle: SectionTileMarkerStyle
  appPillFill: SectionTileAppPillFill
}) {
  // Pill fill resolution:
  //   classic   → transparent (gradient shows through)
  //   contained → bg-paper (cream punches out against orange gradient)
  //   notched   → driven by `appPillFill` prop:
  //     'cream'  = bg-paper (same as contained — test if pill outline
  //                alone keeps the half-hanging knob visible against
  //                cream paper-app body)
  //     'purple' = bg-purple (high-contrast against both interior
  //                gradient AND exterior cream — cleaner read)
  const pillFillClass =
    markerStyle === 'contained'
      ? 'bg-paper'
      : markerStyle === 'notched'
        ? appPillFill === 'purple'
          ? 'bg-purple'
          : 'bg-paper'
        : 'bg-transparent'
  // Knob color: in notched-purple mode, swap to cream so the knob
  // contrasts with the purple pill fill. Otherwise keep accent (orange
  // on the orange tile).
  const knobBgClass =
    markerStyle === 'notched' && appPillFill === 'purple'
      ? 'bg-paper'
      : ACCENT_KNOB_BG[accent]

  return (
    <span
      className="relative inline-block"
      style={{ width: '44px', height: '18px' }}
      aria-hidden
    >
      {/* Pill outline + fill */}
      <span
        className={`absolute inset-0 rounded-full border border-ink/40 ${pillFillClass}`}
      />
      {/* Knob wrapper carries the static vertical centering + horizontal
          inset (3px from the left edge of the pill). The inner span
          carries the walking animation so transforms don't fight. Knob
          fill is accent-colored per Alex 2026-04-28 ("orange knob on
          the orange tile"). */}
      <span
        className="absolute"
        style={{ left: '3px', top: '50%', transform: 'translateY(-50%)' }}
      >
        <span
          className={`block rounded-full ${knobBgClass} animate-knob-walk-3 motion-reduce:animate-none`}
          style={{ width: '12px', height: '12px' }}
        />
      </span>
    </span>
  )
}
