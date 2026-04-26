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
 */

/**
 * Silhouette — top-half human shape. Circle head + rounded-shoulder torso,
 * flat bottom at "waist." 20x24 local bounding box.
 *
 * `color` is a Tailwind fill-* utility class (e.g. `fill-green`,
 * `fill-orange`, `fill-purple`). Defaults to `fill-ink-soft` (the
 * neutral muted-ink the figures originally shipped with).
 */
function Silhouette({
  x,
  y,
  color = 'fill-ink-soft',
}: {
  x: number
  y: number
  color?: string
}) {
  return (
    <g transform={`translate(${x},${y})`} className={color}>
      <circle cx="10" cy="5" r="3.6" />
      <path d="M4,24 L4,11 Q4,8 10,8 Q16,8 16,11 L16,24 Z" />
    </g>
  )
}

/**
 * StudentWithLaptop — silhouette with an open laptop held up in front.
 * Screen's back panel is what the viewer sees. Top of head visible above
 * the laptop's top edge; torso fully obstructed.
 *
 * `color` recolors the head + laptop base (the parts that stand in for
 * the figure itself). The laptop screen stays paper-2 / ink-soft outline
 * regardless — the screen represents reflective glass and shouldn't pick
 * up the figure's group colour.
 */
function StudentWithLaptop({
  x,
  y,
  color = 'fill-ink-soft',
}: {
  x: number
  y: number
  color?: string
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="10" cy="5" r="3.6" className={color} />
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
        className={color}
      />
    </g>
  )
}

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

function AssessIllustration() {
  // Top row: 4 silhouettes at visual-center spacing 18.
  const topOrigins = [33, 51, 69, 87]
  // Bottom row: 5 silhouettes at spacing 18.
  const bottomOrigins = [24, 42, 60, 78, 96]
  // Pseudo-random colour distribution — 3 green, 3 orange, 3 purple
  // across 9 silhouettes (no obvious banding or pairs). Read top-to-
  // bottom, left-to-right.
  //   top:    orange, green, purple, orange   (cumulative: 1G 2O 1P)
  //   bottom: green,  purple, orange, green, purple  (final: 3G 3O 3P)
  const topColors = [
    'fill-orange',
    'fill-green',
    'fill-purple',
    'fill-orange',
  ]
  const bottomColors = [
    'fill-green',
    'fill-purple',
    'fill-orange',
    'fill-green',
    'fill-purple',
  ]
  return (
    <svg viewBox={ILLUSTRATION_VIEWBOX} className="h-auto w-full" aria-hidden="true">
      <OuterFrame />
      {topOrigins.map((x, i) => (
        <Silhouette key={`t-${x}`} x={x} y={TOP_ROW_Y} color={topColors[i]} />
      ))}
      {bottomOrigins.map((x, i) => (
        <Silhouette key={`b-${x}`} x={x} y={BOTTOM_ROW_Y} color={bottomColors[i]} />
      ))}
    </svg>
  )
}

const GROUP_CXS = {
  topCenter: 70,
  bottomLeft: 32,
  bottomRight: 108,
} as const

// Per-cluster colour assignment shared by Sort + Lessons. The narrative
// ("team gets sorted -> those groups have lessons") reads more cleanly
// when the same cluster keeps the same colour across icons 2 and 3.
const CLUSTER_COLORS = {
  topCenter: 'fill-orange',
  bottomLeft: 'fill-purple',
  bottomRight: 'fill-green',
} as const

function SortIllustration() {
  const groups = [
    { cx: GROUP_CXS.topCenter,   y: TOP_ROW_Y,    color: CLUSTER_COLORS.topCenter   },
    { cx: GROUP_CXS.bottomLeft,  y: BOTTOM_ROW_Y, color: CLUSTER_COLORS.bottomLeft  },
    { cx: GROUP_CXS.bottomRight, y: BOTTOM_ROW_Y, color: CLUSTER_COLORS.bottomRight },
  ]
  return (
    <svg viewBox={ILLUSTRATION_VIEWBOX} className="h-auto w-full" aria-hidden="true">
      <OuterFrame />
      {groups.map(({ cx, y, color }) => (
        <g key={`${cx}-${y}`}>
          <Silhouette x={cx - 28} y={y} color={color} />
          <Silhouette x={cx - 10} y={y} color={color} />
          <Silhouette x={cx + 8} y={y} color={color} />
        </g>
      ))}
    </svg>
  )
}

function LessonsIllustration() {
  // Top group: student origin y = TOP_ROW_Y    -> cyTop = TOP_ROW_Y - 1 = 29
  // Bottom groups: peer origin y = BOTTOM_ROW_Y -> cyTop = BOTTOM_ROW_Y - 24 = 66
  // Cluster colours mirror SortIllustration so each ability group keeps
  // its colour identity across the two icons.
  const groups = [
    { cx: GROUP_CXS.topCenter,   cyTop: TOP_ROW_Y - 1,       color: CLUSTER_COLORS.topCenter   },
    { cx: GROUP_CXS.bottomLeft,  cyTop: BOTTOM_ROW_Y - 24,   color: CLUSTER_COLORS.bottomLeft  },
    { cx: GROUP_CXS.bottomRight, cyTop: BOTTOM_ROW_Y - 24,   color: CLUSTER_COLORS.bottomRight },
  ]
  return (
    <svg viewBox={ILLUSTRATION_VIEWBOX} className="h-auto w-full" aria-hidden="true">
      <OuterFrame />
      {groups.map(({ cx, cyTop, color }) => (
        <g key={`${cx}-${cyTop}`}>
          <StudentWithLaptop x={cx - 10} y={cyTop + 1} color={color} />
          <Silhouette x={cx - 19} y={cyTop + 24} color={color} />
          <Silhouette x={cx - 1} y={cyTop + 24} color={color} />
        </g>
      ))}
    </svg>
  )
}

/**
 * CyclingTriptych — single-stage rotating display of the three illustration
 * + headline pairs. Replaces the static three-column grid: holds each stage
 * for `STAGE_DURATION_MS` (default 2000), then advances to the next.
 *
 * One stage visible at a time. Subtle fade on stage change to soften the
 * cut. Respects `prefers-reduced-motion`: pins to the first stage if the
 * user opts out.
 *
 * Title height is reserved via `min-h-[1.5em]` (the headlines are all
 * single-line at this font-size) so the layout doesn't jump as titles
 * rotate. Illustration block is capped at `max-w-[280px]` so a single
 * centered icon doesn't balloon when given the whole paper-app body
 * width on desktop.
 */
const STAGES = [
  { title: 'ASSESS YOUR TEAM', Illustration: AssessIllustration },
  { title: 'SORT BY ABILITY', Illustration: SortIllustration },
  { title: '1-2x WEEKLY LESSONS', Illustration: LessonsIllustration },
] as const

const STAGE_DURATION_MS = 2000
const FADE_MS = 250

function CyclingTriptych() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = setInterval(() => {
      // Fade out, swap stage at half-fade, fade back in.
      setFadeIn(false)
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % STAGES.length)
        setFadeIn(true)
      }, FADE_MS)
    }, STAGE_DURATION_MS)

    return () => clearInterval(id)
  }, [])

  const { title, Illustration } = STAGES[activeIndex]

  return (
    <div className="pt-2">
      <div
        className="mx-auto max-w-[280px] space-y-4 md:space-y-5 text-center transition-opacity"
        style={{
          opacity: fadeIn ? 1 : 0,
          transitionDuration: `${FADE_MS}ms`,
        }}
      >
        <h3 className="font-display text-[18px] md:text-[20px] font-bold leading-tight text-ink min-h-[1.5em]">
          {title}
        </h3>
        <Illustration />
      </div>
    </div>
  )
}

export function WhatYouGetSection() {
  return (
    <section className="md:grid md:grid-cols-canvas md:gap-6 pt-10 pb-16 md:py-16">
      <PaperApp
        width="wide"
        className="md:w-2/3 md:justify-self-center"
      >
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <h2 className="font-display text-[28px] md:text-[38px] font-bold leading-[1.1] text-ink tracking-display-tight max-w-[780px] mx-auto text-center">
              The world&apos;s most valuable language is now ai
            </h2>
            <p className="font-display text-[18px] md:text-[22px] font-normal leading-snug text-ink-soft max-w-[780px] mx-auto text-center">
              That&apos;s why I teach it the same way I taught English for
              over 8 years.
            </p>
          </div>

          <CyclingTriptych />
        </div>
      </PaperApp>
    </section>
  )
}
