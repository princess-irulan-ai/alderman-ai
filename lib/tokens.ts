/**
 * alderman.ai design tokens — the OS model palette.
 *
 * Single source of truth for colors used in code. For CSS/Tailwind classes,
 * use the equivalent `bg-ide`, `text-ink`, etc. utilities defined in
 * tailwind.config.js (which read from these same hex values).
 *
 * Spec: os-model-concept.md "Ratified visual system"
 * Reference: reference-screenshots/ss1-ss5.png
 */

export const tokens = {
  // IDE register (dark substrate)
  ide: '#272822',
  ide2: '#1E1F1A', // page background
  ideSurface: '#3E3D32',
  ideRule: '#3A3B33',
  ideFg: '#F8F8F2',
  ideFgDim: '#B0AFA7',
  ideFgMute: '#75715E',

  // Paper register (light cards)
  paper: '#F6F4EE', // paper-app body fill
  paper2: '#EDEAE0', // paper-app chrome strip fill
  ink: '#1C1C1A',
  inkSoft: '#5A5A54',
  inkFaint: '#A19F96',

  // Accents (Monokai-derived)
  orange: '#FD971F', // ambient glow, post-it, semantic accent
  green: '#A6E22E',
  purple: '#AE81FF', // IDE tile outline, >_ prefix
} as const

export type TokenName = keyof typeof tokens

/**
 * Ambient glow: the shadow stack behind every paper app.
 * Non-negotiable per spec. Promoted from H1-sandbox to canonical 2026-04-22.
 * Three-layer composition (front to back):
 *   1. 3px muted ide-fg-mute ledge at 0 blur / 0 spread — the "card
 *      thickness" feel along the bottom and right edges.
 *   2. Soft orange glow off that ledge — visible warmth, no hard edge.
 *   3. Pulled-in dark grounding shadow — keeps paper on the substrate.
 *
 * The canonical surface is the Tailwind utility `shadow-paper-glow` in
 * `tailwind.config.js` (applied to every PaperApp). This export mirrors
 * the same string for any code that needs it raw.
 */
export const ambientGlow =
  '3px 3px 0 0 rgba(117, 113, 94, 0.80), ' +
  '6px 10px 32px rgba(253, 151, 31, 0.28), ' +
  '28px 38px 80px rgba(0, 0, 0, 0.50)'
