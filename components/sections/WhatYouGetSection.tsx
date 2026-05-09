'use client'

import { useEffect, useState } from 'react'

import { PaperApp } from '@/components/paper/PaperApp'

/**
 * WhatYouGetSection — H2.
 *
 * Ported into the holding site 2026-04-26 from `alderman-ai-full/`.
 * Sits between the hero and TrialCTA on `/`. Title + subtitle on
 * cream paper, then a three-column illustrated triptych narrating
 * the offer: assess the team -> sort into ability cohorts -> run
 * weekly lessons.
 *
 * Original full-site spec (kept verbatim below for context, since the
 * SVG geometry is the load-bearing part of this component):
 *
 *   Illustration system:
 *     The three columns read as a left-to-right narrative — team listed
 *     -> team sorted into cohorts -> cohorts learning in weekly lessons.
 *     "Top-half silhouettes" per Alex's sketch: bowling-pin head +
 *     rounded-shoulder torso, cut flat at the waist. Spacing rule —
 *     all three icons use the same "half-body gap" between adjacent
 *     bodies: silhouette body path is 12 units wide at the shoulder;
 *     origin spacing 18 -> 6-unit gap = half a body width.
 *
 *     Vertical reference — icon 1's two silhouette rows (origin y=30
 *     top, y=90 bottom) are the standard. Icons 2 and 3 shift their
 *     groups so figures land on those same two lines. Exposed as
 *     `TOP_ROW_Y` / `BOTTOM_ROW_Y`.
 *
 *       Col 1 — Assess your team     9 silhouettes in two tiers.
 *       Col 2 — Sort by ability      Same people grouped into 3 tight
 *                                     clusters of 3 (triangle layout).
 *       Col 3 — 1-2x weekly lessons  Each cluster as a "classroom" —
 *                                     1 student-with-laptop above 2
 *                                     peers.
 *
 *   Palette: silhouettes + laptop base + strokes -> ink-soft. Laptop
 *   screen back -> paper-2. Outer frame -> ink-faint at 0.5 stroke,
 *   50% opacity.
 *
 * Holding-site mobile pass (added during port):
 *   - Title clamps 28px mobile / 38px desktop.
 *   - Subtitle clamps 18px / 22px.
 *   - Triptych grid stacks vertically on mobile (`grid-cols-1
 *     md:grid-cols-3`) — preserves the L->R narrative as a top-down
 *     narrative, which actually reads cleanly on a phone.
 *   - PaperApp width capped to `md:w-2/3` on desktop only; mobile
 *     takes the full content-canvas width (within G=12% gutters).
 *   - Section uses `md:grid md:grid-cols-canvas md:gap-6` so the
 *     canvas grid only kicks in at md+, matching the rest of the
 *     mobile-first sections on this site.
 *
 * Cycling animation refactor 2026-04-27:
 *   The triptych used to swap between three separate Illustration
 *   components on each stage tick — a hard fade-out / swap / fade-in
 *   that read as "9 silhouettes vanish, 9 different silhouettes
 *   appear." Replaced with a unified-silhouette model: ONE list of 9
 *   silhouettes, each with a stable colour identity, each with an
 *   (x, y) target per stage. CSS transitions on `transform` interpolate
 *   the position smoothly between stages, so the user reads it as the
 *   same 9 people moving through 3 keyframes. Only the title still
 *   pulses on stage change (existing `fadeStyle`); silhouettes never
 *   fade. The OuterFrame stays static beneath. The laptop overlays in
 *   stage C cross-fade in on top of their silhouette so the bottom
 *   tier of figures gain "I'm holding a laptop" status without a hard
 *   element swap.
 */

const ILLUSTRATION_VIEWBOX = '0 0 140 140'
const TOP_ROW_Y = 30
const BOTTOM_ROW_Y = 90

function OuterFrame() {
  return (
    <rect
      x={0.5}
      y={0.5}
      width={139}
      height={139}
      className="fill-none stroke-ink-faint"
      strokeWidth={0.5}
      strokeOpacity={0.5}
    />
  )
}

// Cluster centres for stages B (Sort) and C (Lessons). Cluster colour
// identity: topCenter -> orange, bottomLeft -> purple, bottomRight ->
// green. Same as the pre-refactor `CLUSTER_COLORS` mapping; the
// narrative ("orange/purple/green ability cohorts") needs to be
// stable across stages B and C.
const GROUP_CXS = {
  topCenter: 70,
  bottomLeft: 32,
  bottomRight: 108,
} as const

/**
 * Per-silhouette keyframe positions across the three stages.
 *
 * Each entry is one of the 9 figures, with a stable `color` (3 green,
 * 3 orange, 3 purple) and a position for each stage. Stage A positions
 * mirror the original `AssessIllustration` layout. Stage B positions
 * cluster the same-coloured figures using the original
 * `SortIllustration` triangle layout (left/middle/right within each
 * cluster). Stage C uses the original `LessonsIllustration` layout —
 * one figure per cluster sits at the laptop-holder slot (the middle
 * `cx - 10` x-position from Sort, raised up to the upper row of the
 * cluster), the other two flank as peers.
 *
 * Identity mapping rationale: the Assess colour pattern dictates which
 * three figures are orange / purple / green, so they have to land in
 * the topCenter / bottomLeft / bottomRight clusters respectively in
 * stages B and C (since the cluster-colour mapping is fixed). Within
 * each cluster I pick one figure to be the laptop-holder in stage C
 * (`isLaptopHolder` flag) and place the other two as peers.
 */
// 4 stages as of 2026-04-28 CEFR introduction: existing 3 plus a new
// "level" stage between assess and sort, in which a small CEFR-style
// level label fades in above each silhouette's head. Labels travel with
// the silhouettes through Sort. In Lessons, only the laptop-holder's
// label persists (per-cluster signal); the two peer labels fade out.
// "CEFR" is never written anywhere in the UI — the introduction is
// meant to be subtle (CEFR notation is public-domain, not trademarked,
// but we don't claim alignment).
type Stage = 'assess' | 'level' | 'sort' | 'lessons'

type SilhouetteSpec = {
  id: string
  color: 'fill-green' | 'fill-orange' | 'fill-purple'
  // Position per stage. (x, y) is the top-left of the 20x24 silhouette
  // local bounding box, same as the old `Silhouette` x/y props.
  positions: Record<Stage, { x: number; y: number }>
  // True if this figure becomes the laptop-holder in stage C. Drives
  // the cross-faded laptop overlay rendering.
  isLaptopHolder: boolean
}

// Sort/Lessons cluster slot offsets relative to cluster cx.
// Sort layout (all in same row, y = TOP_ROW_Y or BOTTOM_ROW_Y):
//   left   = cx - 28
//   middle = cx - 10
//   right  = cx + 8
// Lessons layout puts the laptop-holder at cx - 10 on the upper row of
// the cluster; the two peers stay on the lower row at cx - 19 and cx - 1.
const SLOT_LEFT = -28
const SLOT_MIDDLE = -10
const SLOT_RIGHT = 8
const LESSON_PEER_LEFT = -19
const LESSON_PEER_RIGHT = -1

// Stage C row offsets per cluster:
//   topCenter cluster: laptop-holder at TOP_ROW_Y, peers at TOP_ROW_Y + 24 = 54.
//   bottom clusters:  laptop-holder at BOTTOM_ROW_Y - 23 = 67, peers at BOTTOM_ROW_Y.
// (Matches the pre-refactor LessonsIllustration: cyTop=29 with student
// at cyTop+1=30 and peers at cyTop+24=53; bottom cyTop=66 with student
// at cyTop+1=67 and peers at cyTop+24=90.)
const TOP_CLUSTER_LAPTOP_Y = TOP_ROW_Y // 30
const TOP_CLUSTER_PEER_Y = TOP_ROW_Y + 23 // 53
const BOTTOM_CLUSTER_LAPTOP_Y = BOTTOM_ROW_Y - 23 // 67
const BOTTOM_CLUSTER_PEER_Y = BOTTOM_ROW_Y // 90

// Helper to build the per-stage positions for a single figure.
function makeSpec(
  id: string,
  color: SilhouetteSpec['color'],
  assess: { x: number; y: number },
  cluster: keyof typeof GROUP_CXS,
  role: 'laptop' | 'peerLeft' | 'peerRight',
): SilhouetteSpec {
  const cx = GROUP_CXS[cluster]
  const sortY = cluster === 'topCenter' ? TOP_ROW_Y : BOTTOM_ROW_Y
  const sortSlot =
    role === 'laptop' ? SLOT_MIDDLE : role === 'peerLeft' ? SLOT_LEFT : SLOT_RIGHT
  const sortPos = { x: cx + sortSlot, y: sortY }

  let lessonsPos: { x: number; y: number }
  if (role === 'laptop') {
    lessonsPos = {
      x: cx + SLOT_MIDDLE,
      y: cluster === 'topCenter' ? TOP_CLUSTER_LAPTOP_Y : BOTTOM_CLUSTER_LAPTOP_Y,
    }
  } else {
    const slot = role === 'peerLeft' ? LESSON_PEER_LEFT : LESSON_PEER_RIGHT
    lessonsPos = {
      x: cx + slot,
      y: cluster === 'topCenter' ? TOP_CLUSTER_PEER_Y : BOTTOM_CLUSTER_PEER_Y,
    }
  }

  return {
    id,
    color,
    positions: {
      // Stage A and the new A2 (level) share Assess positions — the
      // level stage just fades labels in, doesn't move the figures.
      assess,
      level: assess,
      sort: sortPos,
      lessons: lessonsPos,
    },
    isLaptopHolder: role === 'laptop',
  }
}

// The 9 figures. IDs encode colour + index; comments note their Assess
// position so the colour distribution audit stays readable.
//
// Within each cluster I picked the laptop-holder somewhat arbitrarily
// (the figure that was in the middle of the original Assess row, where
// available) — this is a judgement call, since the original Assess +
// Lessons layouts don't dictate one. Any of the three figures in a
// cluster could be the laptop-holder; what matters is that it's
// consistent across the loop.
const SILHOUETTES: SilhouetteSpec[] = [
  // --- Oranges -> topCenter cluster (laptop figure has Assess top idx 3) ---
  makeSpec('o1', 'fill-orange', { x: 33, y: TOP_ROW_Y }, 'topCenter', 'peerLeft'),
  makeSpec('o2', 'fill-orange', { x: 87, y: TOP_ROW_Y }, 'topCenter', 'laptop'),
  makeSpec('o3', 'fill-orange', { x: 60, y: BOTTOM_ROW_Y }, 'topCenter', 'peerRight'),

  // --- Purples -> bottomLeft cluster ---
  makeSpec('p1', 'fill-purple', { x: 69, y: TOP_ROW_Y }, 'bottomLeft', 'peerRight'),
  makeSpec('p2', 'fill-purple', { x: 42, y: BOTTOM_ROW_Y }, 'bottomLeft', 'laptop'),
  makeSpec('p3', 'fill-purple', { x: 96, y: BOTTOM_ROW_Y }, 'bottomLeft', 'peerLeft'),

  // --- Greens -> bottomRight cluster ---
  makeSpec('g1', 'fill-green', { x: 51, y: TOP_ROW_Y }, 'bottomRight', 'peerLeft'),
  makeSpec('g2', 'fill-green', { x: 24, y: BOTTOM_ROW_Y }, 'bottomRight', 'peerRight'),
  makeSpec('g3', 'fill-green', { x: 78, y: BOTTOM_ROW_Y }, 'bottomRight', 'laptop'),
]

// Color -> CEFR-ish level label. Mapping per Alex 2026-04-28: purples
// = A1, greens = A2, oranges = B1. The label is rendered inside each
// silhouette's animated `<g>` (so it travels with the body during
// stage transitions). Color matches the silhouette fill so the chord
// stays consistent.
const LEVEL_BY_COLOR: Record<SilhouetteSpec['color'], string> = {
  'fill-purple': 'A1',
  'fill-green': 'A2',
  'fill-orange': 'B1',
}

/**
 * AnimatedSilhouette — one of the 9 unified figures. Renders the
 * silhouette body (always visible), and a laptop overlay that
 * cross-fades in only when the active stage is C and this figure is
 * the cluster's laptop-holder. Position is animated via a CSS
 * transition on the wrapper `<g>` `transform`.
 *
 * Note on transform animation: SVG `transform` attribute transitions
 * are not universally interpolated by browsers. To get smooth motion
 * we apply the translate via the CSS `transform` property on the `<g>`
 * (which works in all current browsers via the SVG-2 transform-as-
 * presentation behaviour) and let the CSS `transition` interpolate it.
 */
function AnimatedSilhouette({
  spec,
  stage,
  transitionMs,
}: {
  spec: SilhouetteSpec
  stage: Stage
  transitionMs: number
}) {
  const { x, y } = spec.positions[stage]
  const showLaptop = stage === 'lessons' && spec.isLaptopHolder
  // Label opacity logic (V1 picked from sandbox 2026-04-28):
  //   Stage A (assess): hidden — labels haven't been "discovered" yet.
  //   Stage A2 (level): fade in for everyone — each person's level shows
  //     above their head.
  //   Stage B (sort):   stays visible, travels with the figure to its cluster.
  //   Stage C (lessons): only the laptop-holder's label persists; the two
  //     peers' labels fade out so the cluster's level reads as one signal
  //     above the laptop-holder, not three stacked ones.
  const labelOpacity =
    stage === 'assess'
      ? 0
      : stage === 'lessons'
        ? spec.isLaptopHolder
          ? 1
          : 0
        : 1
  const level = LEVEL_BY_COLOR[spec.color]

  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {/* Silhouette body — always visible. Head + rounded-shoulder torso. */}
      <g className={spec.color}>
        <circle cx="10" cy="5" r="3.6" />
        <path d="M4,24 L4,11 Q4,8 10,8 Q16,8 16,11 L16,24 Z" />
      </g>
      {/* Laptop overlay — only renders for laptop-holders in stage C.
          Cross-fades in/out via opacity transition. The screen panel
          covers the torso (which is fine, the silhouette stays
          beneath); the laptop base extends past either side as the
          flat keyboard line. */}
      <g
        style={{
          opacity: showLaptop ? 1 : 0,
          transition: `opacity ${transitionMs}ms ease-in-out`,
        }}
      >
        <rect
          x="0"
          y="6.5"
          width="20"
          height="14"
          rx="0.8"
          className="fill-paper-2 stroke-ink-soft"
          strokeWidth="0.8"
        />
        <rect
          x="-2"
          y="20.5"
          width="24"
          height="1.8"
          rx="0.4"
          className={spec.color}
        />
      </g>
      {/* CEFR-style level label — sits above the head. Local y of the
          head crown is ~1.4 (cy=5, r=3.6 -> top of circle at 1.4); y=-1
          places the baseline of a 6px text just above the crown. The
          label is a sibling INSIDE the same animated `<g>` so it
          translates with the figure when stage changes. */}
      <text
        x={10}
        y={-1}
        textAnchor="middle"
        className={`font-display ${spec.color}`}
        style={{
          fontSize: 6,
          fontWeight: 700,
          letterSpacing: 0.2,
          opacity: labelOpacity,
          transition: `opacity ${transitionMs}ms ease-in-out`,
        }}
      >
        {level}
      </text>
    </g>
  )
}

/**
 * CyclingTriptych — single-stage rotating display of the three stage
 * titles, with all 9 silhouettes smoothly transitioning between
 * keyframes underneath. The title pulse + the silhouette motion are
 * decoupled: title fades on stage advance; silhouettes never fade,
 * they glide.
 *
 * Loop timing: STAGE_HOLD_MS is how long each stage sits at its
 * keyframe before advancing. TRANSITION_MS is the silhouette glide
 * duration (also reused for the title pulse). The title's fade-out
 * starts simultaneously with the silhouette glide; we hold the new
 * title at full opacity for the rest of the dwell.
 *
 * Respects `prefers-reduced-motion`: pins to stage A if the user
 * opts out (no timer started, no transitions kicked off).
 */
const STAGES: { key: Stage; title: string }[] = [
  { key: 'assess', title: 'ASSESS YOUR TEAM' },
  { key: 'level', title: 'IDENTIFY LEVELS' },
  { key: 'sort', title: 'SORT BY ABILITY' },
  { key: 'lessons', title: 'WEEKLY LESSONS' },
]

const STAGE_HOLD_MS = 2200
const TRANSITION_MS = 850
const TITLE_FADE_MS = 350

function CyclingTriptych() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [titleVisible, setTitleVisible] = useState(true)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let advanceTimeout: ReturnType<typeof setTimeout> | undefined
    let restoreTimeout: ReturnType<typeof setTimeout> | undefined

    const tick = () => {
      // Fade title out, then advance stage (kicks off the silhouette
      // glide via state change), then fade title back in.
      setTitleVisible(false)
      restoreTimeout = setTimeout(() => {
        setActiveIndex((i) => (i + 1) % STAGES.length)
        setTitleVisible(true)
      }, TITLE_FADE_MS)
    }

    const interval = setInterval(tick, STAGE_HOLD_MS + TRANSITION_MS)

    return () => {
      clearInterval(interval)
      if (advanceTimeout) clearTimeout(advanceTimeout)
      if (restoreTimeout) clearTimeout(restoreTimeout)
    }
  }, [])

  const { title, key: stage } = STAGES[activeIndex]

  return (
    <div className="pt-2">
      <div className="mx-auto max-w-[280px] space-y-4 md:space-y-5 text-center">
        <h3
          className="font-display text-[18px] font-bold leading-tight text-ink min-h-[1.5em] transition-opacity"
          style={{
            opacity: titleVisible ? 1 : 0,
            transitionDuration: `${TITLE_FADE_MS}ms`,
          }}
        >
          {title}
        </h3>
        {/* Single SVG containing the static OuterFrame and all 9
            animated silhouettes. Frame and figures share a viewBox so
            positions stay aligned across the loop. */}
        <div className="relative">
          <svg
            viewBox={ILLUSTRATION_VIEWBOX}
            className="block h-auto w-full"
            aria-hidden="true"
          >
            <OuterFrame />
            {SILHOUETTES.map((spec) => (
              <AnimatedSilhouette
                key={spec.id}
                spec={spec}
                stage={stage}
                transitionMs={TRANSITION_MS}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

export function WhatYouGetSection() {
  return (
    <section className="pt-8 pb-8 md:py-16">
      <PaperApp width="wide">
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
              Onboarding
            </h2>
            <p className="font-display text-[18px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
              The same as setting up{' '}
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute -inset-x-2 -inset-y-1 -rotate-1 rounded-md bg-purple/55"
                />
                <span className="relative">English lessons</span>
              </span>
              {' '}for your company.
            </p>
          </div>

          <CyclingTriptych />
        </div>
      </PaperApp>
    </section>
  )
}
