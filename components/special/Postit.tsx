import type { ReactNode } from 'react'

/**
 * Postit — the orange sticky note.
 *
 * Hero-only per spec. Used exactly once on the site.
 *
 * H1-sandbox pass #3 (2026-04-21 evening — organic crescent curl):
 *  - Square (240×240), ~80% of the previous 300px-wide rectangle.
 *  - Heading-only by default — "AI Fluency Lessons" centered on the
 *    square.
 *  - Main paper shape: rectangle with the BR corner rounded via
 *    `border-radius: 0 0 60px 0`. The rounded arc stands in for the
 *    outer edge of the rolled-up corner.
 *  - Curl shape: a crescent / lens drawn with `clip-path: path(...)`.
 *    Outer edge follows the paper's BR rounded arc (so they share a
 *    boundary); inner edge is a quadratic Bézier curve that bulges
 *    INWARD toward the center of the post-it, giving the fold crease
 *    a soft curved profile instead of a straight diagonal. Closer to
 *    the "rolled paper" look in Alex's reference images than a
 *    polygon triangle.
 *  - Main body gradient: brand orange #FD971F held flat from 0–50%
 *    along the TL→BR diagonal, then transitioning to a more-saturated
 *    dark orange #D67100 at BR.
 *  - Curl gradient: holds a dark, saturated orange through most of
 *    the TL→BR diagonal, then transitions to a lighter orange at the
 *    far BR. Because the crescent spans gradient positions roughly
 *    82–100% of the diagonal, the visible result is: darker near the
 *    fold crease (inner edge, toward center), lighter at the apex of
 *    the curl (outer edge, near the paper's rounded corner tip).
 *  - Two shadows, both kept soft per Alex feedback (no spotlight feel):
 *     1. Paper outline shadow via `filter: drop-shadow(...)` on the
 *        main-body wrapper — gentle, mostly-downward, low opacity.
 *     2. Curl-lift shadow via a second `filter: drop-shadow(...)` on
 *        the curl wrapper — a whisper offset toward TL, so the curl
 *        reads as slightly lifted off the flat paper. Low enough
 *        opacity that the gradient, not the shadow, does the depth
 *        work.
 *
 * H1-sandbox Pass 5 extension (2026-04-21 evening):
 *  - Added optional `rotationOrigin` prop (default `'center'`) that
 *    maps to `transform-origin` on the wrapper div. Needed so the
 *    hero's rise-and-slap animation can pivot around the Post-it's
 *    top-left corner instead of its center — that way the top-left
 *    corner stays anchored at the paper-app center while the rest
 *    of the square rotates/translates around it. Default keeps every
 *    other Postit instance (hero-only anyway today) identical.
 *    Per the H1-sandbox rule, do not adopt off-center origins in
 *    other sections until the hero treatment is explicitly finalized
 *    and ported.
 *
 * Spec: os-model-concept.md "Post-it (hero only)".
 */
type PostitProps = {
  heading?: ReactNode
  children?: ReactNode
  rotation?: number
  className?: string
  /**
   * `transform-origin` value for the rotation. Default `'center'`
   * matches the canonical centered-pivot treatment. The hero uses
   * `'top left'` so the Post-it's top-left corner stays anchored at
   * paper-app-center while the body overhangs to the bottom-right.
   * H1-sandbox only — do not adopt outside the hero without explicit
   * go-ahead.
   */
  rotationOrigin?: string
  /**
   * When true, the post-it shape is mirrored horizontally
   * (`scaleX(-1)` on the wrapper). The rounded BR corner + folded
   * curl visually move from bottom-right to bottom-left, giving a
   * mirror-image companion to the canonical post-it. Text content
   * is counter-flipped at the content layer so headings + body
   * still read normally. Used by the credentials paper-app's
   * bottom-left post-it overhang (TrialCTASection).
   */
  flipX?: boolean
}

// ──────────────────────────────────────────────────────────────────────
// Tuning knobs — kept local so Alex can dial from one place.
// ──────────────────────────────────────────────────────────────────────
const SIZE = 240 // square edge, px.
const CORNER_RADIUS = 60 // px — rounded BR corner radius. Also the radius
                         // of the crescent's outer arc (they share the
                         // same curve — the paper's silhouette and the
                         // curl's outer edge are the same line).

// Main body gradient: brand orange held flat from 0–50% along the TL→BR
// diagonal, then transitioning to a more-saturated dark orange at BR.
// (50% start is a bump from the previous 75% per Alex feedback.)
const BODY_GRADIENT =
  'linear-gradient(135deg, #FD971F 0%, #FD971F 50%, #D67100 100%)'

// Curl crescent gradient: the crescent occupies roughly the bottom-right
// corner region of the square, spanning 135° gradient positions ~75%–100%.
// Reference images show the fold crease (inner edge of the crescent,
// closer to the center of the post-it) in the deepest shadow, and the
// apex of the curl (outer edge, at the corner tip) catching more light.
// So: dark at the crease side (~75–83%), lighter at the tip (~95–100%).
const CURL_GRADIENT =
  'linear-gradient(135deg, #8A3804 75%, #C26414 90%, #F09443 100%)'

// Paper outline drop-shadow — intentionally soft and mostly downward
// (NOT a strong side-lit "spotlight" look). Low opacity + modest blur
// so the post-it reads as resting in gentle ambient light rather than
// being dramatically lit from one side. Dialed down from the old
// `shadow-postit` token per Alex feedback 2026-04-21 evening.
const PAPER_DROP_SHADOW =
  'drop-shadow(1px 4px 8px rgba(0, 0, 0, 0.22))'

// Curl-lift drop-shadow — small offset toward TL so the shadow falls
// onto the flat paper adjacent to the crescent's inner (Bézier) edge,
// selling the lift. Kept deliberately subtle — the gradient difference
// between body and curl does most of the 3D work; this shadow is just
// a whisper on top.
const CURL_LIFT_SHADOW =
  'drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.22))'

// Crescent / lens clip path, described in user-space pixels matching the
// post-it's SIZE×SIZE box. The crescent has two edges:
//
//   Outer edge — an SVG arc that exactly follows the paper's BR rounded
//   corner. Starts where the right edge meets the arc (SIZE, SIZE-RADIUS),
//   sweeps clockwise around to where the bottom edge meets the arc
//   (SIZE-RADIUS, SIZE). Because this arc coincides with the paper
//   silhouette's own rounded corner, the crescent's outer boundary sits
//   flush against the paper's edge — no visible seam.
//
//   Inner edge — a quadratic Bézier curve from (SIZE-RADIUS, SIZE) back
//   to (SIZE, SIZE-RADIUS), with its control point pulled INWARD toward
//   the TL corner at BEZIER_CONTROL. This is the "fold crease." Because
//   the control point is closer to the origin than the straight
//   hypotenuse midpoint would be, the curve bulges inward — giving the
//   crease a soft, organic profile rather than a hard diagonal, which
//   matches the rolled-paper look in Alex's reference images.
//
// Precomputed values for SIZE=240, CORNER_RADIUS=60:
//   arc:     M 240 180  A 60 60 0 0 1 180 240
//   bezier:  Q 200 200  240 180
const ARC_START_X = SIZE                 // 240
const ARC_START_Y = SIZE - CORNER_RADIUS // 180
const ARC_END_X = SIZE - CORNER_RADIUS   // 180
const ARC_END_Y = SIZE                    // 240
// Control point for the Bézier fold crease. TL is (0,0). Midpoint of
// the arc endpoints is ((ARC_START_X + ARC_END_X)/2, (ARC_START_Y +
// ARC_END_Y)/2) = (210, 210). A straight crease from (180,240) to
// (240,180) would pass through (210,210). To bulge the crease inward
// (toward TL / toward the post-it's center), the Bézier control point
// needs to sit at X<210, Y<210. (200, 200) offsets 10px inward along
// both axes — a gentle organic bulge without looking like a full peel.
// Bigger inward offset → deeper crease; smaller → closer to the
// straight hypotenuse.
const BEZIER_CX = 200
const BEZIER_CY = 200
const CURL_CLIP_PATH =
  `path("M ${ARC_START_X} ${ARC_START_Y}` +
  ` A ${CORNER_RADIUS} ${CORNER_RADIUS} 0 0 1 ${ARC_END_X} ${ARC_END_Y}` +
  ` Q ${BEZIER_CX} ${BEZIER_CY} ${ARC_START_X} ${ARC_START_Y} Z")`

export function Postit({
  heading,
  children,
  rotation = -5,
  className = '',
  rotationOrigin = 'center',
  flipX = false,
}: PostitProps) {
  const flipTransform = flipX ? ' scaleX(-1)' : ''
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        transform: `rotate(${rotation}deg)${flipTransform}`,
        transformOrigin: rotationOrigin,
        width: SIZE,
        height: SIZE,
      }}
    >
      {/* Paper outline layer — drop-shadow here draws the main card
          shadow beneath the rounded-rectangle paper silhouette. */}
      <div className="absolute inset-0" style={{ filter: PAPER_DROP_SHADOW }}>
        <div
          className="absolute inset-0"
          style={{
            background: BODY_GRADIENT,
            borderRadius: `0 0 ${CORNER_RADIUS}px 0`,
          }}
        />
      </div>

      {/* Curl crescent layer — drop-shadow here casts a small lift
          shadow onto the flat paper adjacent to the crescent's inner
          (Bézier) edge, implying the corner is lifted off the surface.
          The crescent's outer edge shares the paper's rounded corner
          arc exactly, so only the Bézier "fold crease" casts a visible
          shadow onto the flat paper. */}
      <div className="absolute inset-0" style={{ filter: CURL_LIFT_SHADOW }}>
        <div
          className="absolute inset-0"
          style={{
            background: CURL_GRADIENT,
            clipPath: CURL_CLIP_PATH,
          }}
        />
      </div>

      {/* Content layer — above the paper, no filter. When `flipX` is
          set, the wrapper above mirrored everything via scaleX(-1);
          counter-flip the content here so headings + body text still
          read normally. */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-ink"
        style={flipX ? { transform: 'scaleX(-1)' } : undefined}
      >
        {heading && (
          <div className="font-display font-bold text-[34px] leading-[1.05] tracking-tight">
            {heading}
          </div>
        )}
        {children && (
          <div className="font-body text-[20px] leading-snug mt-5">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
