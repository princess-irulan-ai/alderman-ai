'use client'

import { useEffect, useState } from 'react'

import { PaperApp } from '@/components/paper/PaperApp'

/**
 * Triptych sandbox — CEFR variations.
 *
 * Iterating on a 4-stage version of the live cycling triptych
 * (`components/sections/WhatYouGetSection.tsx`). The live triptych
 * cycles A -> B -> C (assess / sort / lessons). This sandbox inserts
 * a new A2 stage between A and B in which a CEFR-style level label
 * fades in above each silhouette's head:
 *   purple silhouettes -> "A1"
 *   green silhouettes  -> "A2"
 *   orange silhouettes -> "B1"
 * Labels then travel WITH each silhouette through the Sort stage.
 * In the final Lessons stage, the per-person labels need to
 * consolidate so they don't pile up on the laptop layout — three
 * variations of that consolidation are rendered side-by-side here.
 *
 * Variation 1 — per-cluster label above the laptop-holder. Each
 *   cluster's three labels collapse into one above the top figure.
 * Variation 2 — label rendered as text on the laptop screen. Per-
 *   peer labels fade out, the cluster's level appears centred on the
 *   laptop's screen rectangle.
 * Variation 3 — single label below the bottom pair, per cluster.
 *   Labels above heads fade out; one label per cluster anchors at
 *   the bottom.
 *
 * Architecture: forked `CyclingTriptych` from the live file rather
 * than generalising it (less risk to the live triptych while we
 * iterate). The unified-silhouette + transform-on-`<g>` model is
 * preserved verbatim. The label is added as a `<text>` sibling to
 * the silhouette inside the same animated `<g>` group, so when the
 * group's transform translates, the label moves with the figure.
 * Per-stage label opacity and (for variation 1's consolidation)
 * per-stage label position are both interpolated by CSS transitions.
 *
 * NOT linked from the nav. URL-only access at `/sandbox/triptych`.
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

const GROUP_CXS = {
  topCenter: 70,
  bottomLeft: 32,
  bottomRight: 108,
} as const

// Four stages: existing 3 plus the new "level" annotation stage that
// sits between assess and sort. Title pick for the new stage:
// "IDENTIFY LEVELS" — short, neutral, doesn't say "CEFR" (per spec
// the introduction is meant to be subtle).
type Stage = 'assess' | 'level' | 'sort' | 'lessons'

type ClusterColor = 'fill-green' | 'fill-orange' | 'fill-purple'

type SilhouetteSpec = {
  id: string
  color: ClusterColor
  cluster: keyof typeof GROUP_CXS
  positions: Record<Stage, { x: number; y: number }>
  isLaptopHolder: boolean
}

const SLOT_LEFT = -28
const SLOT_MIDDLE = -10
const SLOT_RIGHT = 8
const LESSON_PEER_LEFT = -19
const LESSON_PEER_RIGHT = -1

const TOP_CLUSTER_LAPTOP_Y = TOP_ROW_Y // 30
const TOP_CLUSTER_PEER_Y = TOP_ROW_Y + 23 // 53
const BOTTOM_CLUSTER_LAPTOP_Y = BOTTOM_ROW_Y - 23 // 67
const BOTTOM_CLUSTER_PEER_Y = BOTTOM_ROW_Y // 90

function makeSpec(
  id: string,
  color: ClusterColor,
  cluster: keyof typeof GROUP_CXS,
  assess: { x: number; y: number },
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
    cluster,
    positions: {
      // Stage A and A2 share Assess positions — the level stage just
      // adds the label, doesn't move anyone.
      assess,
      level: assess,
      sort: sortPos,
      lessons: lessonsPos,
    },
    isLaptopHolder: role === 'laptop',
  }
}

const SILHOUETTES: SilhouetteSpec[] = [
  // Oranges -> topCenter cluster (B1)
  makeSpec('o1', 'fill-orange', 'topCenter', { x: 33, y: TOP_ROW_Y }, 'peerLeft'),
  makeSpec('o2', 'fill-orange', 'topCenter', { x: 87, y: TOP_ROW_Y }, 'laptop'),
  makeSpec('o3', 'fill-orange', 'topCenter', { x: 60, y: BOTTOM_ROW_Y }, 'peerRight'),

  // Purples -> bottomLeft cluster (A1)
  makeSpec('p1', 'fill-purple', 'bottomLeft', { x: 69, y: TOP_ROW_Y }, 'peerRight'),
  makeSpec('p2', 'fill-purple', 'bottomLeft', { x: 42, y: BOTTOM_ROW_Y }, 'laptop'),
  makeSpec('p3', 'fill-purple', 'bottomLeft', { x: 96, y: BOTTOM_ROW_Y }, 'peerLeft'),

  // Greens -> bottomRight cluster (A2)
  makeSpec('g1', 'fill-green', 'bottomRight', { x: 51, y: TOP_ROW_Y }, 'peerLeft'),
  makeSpec('g2', 'fill-green', 'bottomRight', { x: 24, y: BOTTOM_ROW_Y }, 'peerRight'),
  makeSpec('g3', 'fill-green', 'bottomRight', { x: 78, y: BOTTOM_ROW_Y }, 'laptop'),
]

// Color -> CEFR-ish level label.
const LEVEL_BY_COLOR: Record<ClusterColor, string> = {
  'fill-purple': 'A1',
  'fill-green': 'A2',
  'fill-orange': 'B1',
}

// Tailwind text class matching silhouette fill color, for label `<text>`.
const TEXT_COLOR_BY_FILL: Record<ClusterColor, string> = {
  'fill-purple': 'fill-purple',
  'fill-green': 'fill-green',
  'fill-orange': 'fill-orange',
}

const STAGES: { key: Stage; title: string }[] = [
  { key: 'assess', title: 'ASSESS YOUR TEAM' },
  { key: 'level', title: 'IDENTIFY LEVELS' },
  { key: 'sort', title: 'SORT BY ABILITY' },
  { key: 'lessons', title: 'WEEKLY LESSONS' },
]

const STAGE_HOLD_MS = 2200
const TRANSITION_MS = 850
const TITLE_FADE_MS = 350
// Total cycle: 4 × (hold + transition) ≈ 12.2s. Within spec target 12-14s.

type Variation = 'aboveLaptop' | 'onScreen' | 'belowPeers'

/**
 * Per-silhouette label. The label sits inside the same animated `<g>`
 * as the silhouette so it translates with the figure across stages
 * A2 -> B. In stage A and stage C the label opacity is driven by the
 * variation:
 *   - All variations: opacity 0 in stage A, 1 in stages A2 and B.
 *   - Variation 1 (aboveLaptop): in stage C, only laptop-holders show
 *     the label; peers fade their per-person label out.
 *   - Variation 2 (onScreen): in stage C all per-person labels fade
 *     out — the cluster-level text is rendered separately on the
 *     laptop screen.
 *   - Variation 3 (belowPeers): in stage C all per-person labels fade
 *     out — a separate cluster label is rendered below the peers.
 *
 * Label position note (variation 1): when a peer becomes the
 * laptop-holder's "owner of the label" in stage C, only the
 * laptop-holder shows it — but we DON'T migrate the peer labels to a
 * shared spot. They just fade out. The laptop-holder's own label
 * stays where it always is (above its head). This avoids messy
 * tweening of label positions across silhouettes.
 */
function labelOpacityFor(stage: Stage, variation: Variation, spec: SilhouetteSpec): number {
  if (stage === 'assess') return 0
  if (stage === 'level' || stage === 'sort') return 1
  // stage === 'lessons'
  if (variation === 'aboveLaptop') return spec.isLaptopHolder ? 1 : 0
  return 0
}

function AnimatedSilhouette({
  spec,
  stage,
  variation,
  transitionMs,
}: {
  spec: SilhouetteSpec
  stage: Stage
  variation: Variation
  transitionMs: number
}) {
  const { x, y } = spec.positions[stage]
  const showLaptop = stage === 'lessons' && spec.isLaptopHolder
  const labelOpacity = labelOpacityFor(stage, variation, spec)
  const level = LEVEL_BY_COLOR[spec.color]

  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {/* Silhouette body */}
      <g className={spec.color}>
        <circle cx="10" cy="5" r="3.6" />
        <path d="M4,24 L4,11 Q4,8 10,8 Q16,8 16,11 L16,24 Z" />
      </g>
      {/* Laptop overlay — stage C laptop-holders only */}
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
      {/* Per-person CEFR label — sits above the head. Local y of the
          head is 5 (cy of the circle, r=3.6) so y=-1 places the
          baseline of an 8px text just above the crown. */}
      <text
        x={10}
        y={-1}
        textAnchor="middle"
        className={`font-display ${TEXT_COLOR_BY_FILL[spec.color]}`}
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
 * Per-cluster overlays for stage C consolidation. Rendered OUTSIDE
 * the silhouette `<g>` group so they're independent of any single
 * silhouette's transform. Opacity is 0 outside stage C.
 *
 * Variation 2 — `<text>` centred on the laptop's screen rect.
 *   The screen rect (in silhouette local coords) is x=0..20 / y=6.5..20.5.
 *   So screen centre is (10, 13.5) in local coords. In SVG global
 *   coords the laptop-holder's transform puts its origin at
 *   `(spec.lessons.x, spec.lessons.y)`, so the screen centre is at
 *   `(spec.lessons.x + 10, spec.lessons.y + 13.5)`.
 *
 * Variation 3 — `<text>` centred under each cluster's bottom row.
 *   Each cluster's lower row is the peer row in stage C (peers at y=53
 *   for topCenter, y=90 for bottoms). Place text at peer-row + ~28
 *   units (just below the figure, comfortably inside the 140 viewbox).
 *
 * For both variations the cluster-level text fades in at stage C and
 * stays parked at its anchor — there's no sort-stage rendering of
 * these.
 */
function ClusterOverlays({
  stage,
  variation,
  transitionMs,
}: {
  stage: Stage
  variation: Variation
  transitionMs: number
}) {
  if (variation === 'aboveLaptop') return null
  const opacity = stage === 'lessons' ? 1 : 0

  // Build one entry per cluster (laptop-holder in stage C drives
  // both the laptop position and the cluster identity).
  const clusters = SILHOUETTES.filter((s) => s.isLaptopHolder)

  return (
    <g
      style={{
        opacity,
        transition: `opacity ${transitionMs}ms ease-in-out`,
      }}
    >
      {clusters.map((spec) => {
        const level = LEVEL_BY_COLOR[spec.color]
        const lessonsPos = spec.positions.lessons
        if (variation === 'onScreen') {
          // Centred on the laptop screen.
          return (
            <text
              key={spec.id}
              x={lessonsPos.x + 10}
              y={lessonsPos.y + 15.5}
              textAnchor="middle"
              className={`font-display ${TEXT_COLOR_BY_FILL[spec.color]}`}
              style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.4 }}
            >
              {level}
            </text>
          )
        }
        // belowPeers — each cluster gets a single label sitting under
        // the bottom pair of figures. Use cluster cx as the x anchor;
        // y depends on whether the bottom row is at TOP_CLUSTER_PEER_Y
        // (53) or BOTTOM_CLUSTER_PEER_Y (90). Bottom-row baseline = y + 24
        // (silhouette body is 24 tall), then +5 for breathing room.
        const cx = GROUP_CXS[spec.cluster]
        const bottomRowY = spec.cluster === 'topCenter' ? TOP_CLUSTER_PEER_Y : BOTTOM_CLUSTER_PEER_Y
        const y = Math.min(bottomRowY + 24 + 5, 138)
        return (
          <text
            key={spec.id}
            x={cx}
            y={y}
            textAnchor="middle"
            className={`font-display ${TEXT_COLOR_BY_FILL[spec.color]}`}
            style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.3 }}
          >
            {level}
          </text>
        )
      })}
    </g>
  )
}

function SandboxCyclingTriptych({ variation }: { variation: Variation }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [titleVisible, setTitleVisible] = useState(true)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let restoreTimeout: ReturnType<typeof setTimeout> | undefined

    const tick = () => {
      setTitleVisible(false)
      restoreTimeout = setTimeout(() => {
        setActiveIndex((i) => (i + 1) % STAGES.length)
        setTitleVisible(true)
      }, TITLE_FADE_MS)
    }

    const interval = setInterval(tick, STAGE_HOLD_MS + TRANSITION_MS)

    return () => {
      clearInterval(interval)
      if (restoreTimeout) clearTimeout(restoreTimeout)
    }
  }, [])

  const { title, key: stage } = STAGES[activeIndex]

  return (
    <div className="pt-2">
      <div className="mx-auto max-w-[280px] space-y-4 md:space-y-5 text-center">
        <h3
          className="font-display text-[18px] md:text-[20px] font-bold leading-tight text-ink min-h-[1.5em] transition-opacity"
          style={{
            opacity: titleVisible ? 1 : 0,
            transitionDuration: `${TITLE_FADE_MS}ms`,
          }}
        >
          {title}
        </h3>
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
                variation={variation}
                transitionMs={TRANSITION_MS}
              />
            ))}
            <ClusterOverlays
              stage={stage}
              variation={variation}
              transitionMs={TRANSITION_MS}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

const VARIATIONS: { key: Variation; caption: string; chromeRight: string }[] = [
  {
    key: 'aboveLaptop',
    caption: 'Variation 1 — per-cluster label above top person (laptop-holder)',
    chromeRight: 'v1 · above-laptop',
  },
  {
    key: 'onScreen',
    caption: 'Variation 2 — label rendered as text on the laptop screen',
    chromeRight: 'v2 · on-screen',
  },
  {
    key: 'belowPeers',
    caption: 'Variation 3 — single label below the bottom pair of each cluster',
    chromeRight: 'v3 · below-peers',
  },
]

export default function TriptychSandboxPage() {
  return (
    <div className="min-h-screen bg-ide-2 text-ide-fg">
      <div className="mx-auto max-w-[860px] px-6 py-16">
        <header className="mb-10">
          <h1 className="font-mono text-[28px] text-ide-fg">
            Triptych sandbox — CEFR variations
          </h1>
          <p className="mt-3 font-mono text-[13px] text-ide-fg-dim leading-relaxed">
            preview-only · not linked from the live site · 4 stages
            (assess / identify levels / sort / lessons) · cycles auto
          </p>
          <p className="mt-2 font-mono text-[12px] text-ide-fg-mute leading-relaxed">
            three variations of stage-C label consolidation rendered
            below. each instance runs its own timer, so they don't stay
            in lockstep — that's expected for a comparison sandbox.
          </p>
        </header>

        <div className="space-y-12">
          {VARIATIONS.map((v) => (
            <section key={v.key}>
              <p className="font-mono text-[11px] text-ide-fg-mute mb-3 lowercase tracking-wider">
                {v.caption}
              </p>
              <div className="grid grid-cols-canvas">
                <PaperApp
                  width="wide"
                  chromeLeft="sandbox.triptych"
                  chromeRight={v.chromeRight}
                >
                  <SandboxCyclingTriptych variation={v.key} />
                </PaperApp>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 border-t border-ide-rule pt-6">
          <p className="font-mono text-[11px] text-ide-fg-mute">
            === end sandbox === · 3 variations · stage hold {STAGE_HOLD_MS}ms
            · transition {TRANSITION_MS}ms · cycle ≈{' '}
            {((STAGE_HOLD_MS + TRANSITION_MS) * 4) / 1000}s
          </p>
        </footer>
      </div>
    </div>
  )
}
