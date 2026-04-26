/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        md: '1000px',
      },
      colors: {
        // IDE register
        ide: '#272822',
        'ide-2': '#1E1F1A',
        'ide-surface': '#3E3D32',
        'ide-rule': '#3A3B33',
        'ide-fg': '#F8F8F2',
        'ide-fg-dim': '#B0AFA7',
        'ide-fg-mute': '#75715E',
        // Paper register
        paper: '#F6F4EE',
        'paper-2': '#EDEAE0',
        ink: '#1C1C1A',
        'ink-soft': '#5A5A54',
        'ink-faint': '#A19F96',
        // Accents
        orange: '#FD971F',
        green: '#A6E22E',
        purple: '#AE81FF',
      },
      fontFamily: {
        display: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        body: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'Menlo', 'monospace'],
        marker: ['var(--font-kalam)', 'cursive'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        'display-tight': '-0.02em',
      },
      boxShadow: {
        // Ambient orange glow under every paper app. Non-negotiable per spec.
        // Promoted from H1-sandbox to canonical 2026-04-22 — retired the old
        // hard orange stripe (`14px 14px 0 -4px` + inset sheen) in favour of
        // a 3-layer stack tuned on-screen during the H1 polish pass:
        //   (1) 3px muted ide-fg-mute ledge at 0 blur / 0 spread — "card
        //       thickness" illusion along the bottom and right edges.
        //   (2) Soft orange glow off that ledge — visible warmth, no hard
        //       edge (offset 6/10, blur 32, 28% opacity).
        //   (3) Pulled-in dark grounding shadow — keeps paper on substrate
        //       (offset 28/38, blur 80, 50% opacity; pulled in from the old
        //       40/50/100 to make room for the new layers).
        // Raw string also mirrored in `lib/tokens.ts` as `ambientGlow`.
        'paper-glow': [
          '3px 3px 0 0 rgba(117, 113, 94, 0.80)',
          '6px 10px 32px rgba(253, 151, 31, 0.28)',
          '28px 38px 80px rgba(0, 0, 0, 0.50)',
        ].join(', '),
        postit: '4px 6px 16px rgba(0, 0, 0, 0.45), 1px 2px 4px rgba(0, 0, 0, 0.35)',
      },
      gridTemplateColumns: {
        // Outer page grid: 6 equal columns. Outer 1/6 on each side are IDE margin.
        page: 'repeat(6, minmax(0, 1fr))',
        // Content canvas: 3 equal sub-columns inside the middle 4/6.
        canvas: 'repeat(3, minmax(0, 1fr))',
      },
      borderRadius: {
        paper: '14px',
        tile: '7px',
      },
      keyframes: {
        // Hard on/off blink for TerminalLine's cursor. `steps(1, end)` on the
        // animation keeps it from fading; the two stops switch opacity at the
        // halfway point for a classic terminal feel.
        'terminal-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        // Same hard on/off shape, but at half speed. Used on TerminalCTA
        // brackets after the terminal line finishes deploying — creates a
        // "now you can click me" shimmer without being as twitchy as the
        // cursor itself.
        'bracket-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        // Three-line cascading cursor for H1 line 2's scroll-nudge `v`.
        // Once the `_` → `v` swap fires (2 blinks after the line types out),
        // the `v` hops DOWN one line-height per blink, cycling through
        // three vertical positions (n → n+1 → n+2 → n, repeat) FOREVER.
        // The `v` never goes back to `_`. No dead air between cycles —
        // the cascade is continuous at the standard cursor blink rate.
        // Reads as a looping "scroll down" ribbon of `v`s. Alex's spec
        // 2026-04-22 evening:
        //   "keeping the same blink rate, once the string is typed, here
        //   should be the blinks: 1. _ at n, 2. _ at n, 3. v at n,
        //   4. v at n+1, 5. v at n+2 ... back to 3 and repeat 3-5
        //   continuously (v never goes back to _)"
        // The first two `_` blinks are handled upstream by `TerminalLine`'s
        // `doneCursorGlyphDelayMs={2120}`; this animation only governs the
        // post-swap cascade.
        //
        // ── Revision 2 (2026-04-22 late evening) ────────────────────────
        // First pass used `steps(6, end)` on a 7-keyframe shape whose final
        // keyframe snapped translateY back to 0 at 100%. Video Alex sent
        // showed the cursor SMOOTHLY oscillating down-then-up through 5+
        // intermediate positions instead of hopping discretely between 3.
        // Two root causes identified:
        //   1. The `steps(6, end)` timing function was likely not applied.
        //      Suspect the comma inside `steps(6, end)` collides with the
        //      `animation:` shorthand's own comma delimiter when Tailwind
        //      concatenates the string. Easing fell back to the default
        //      `ease`, which linearly interpolates between keyframes.
        //   2. Even if steps() HAD worked, the `100% → 0%` loop-back
        //      returned translateY to 0, which with any non-stepped easing
        //      produces a visible UP-slide over the final 16.67% of the
        //      cycle — the "back up through the same positions" motion
        //      Alex described in the handoff diagram.
        //
        // Fix — "self-stepping" keyframes: every phase is a HELD plateau
        // between two identical keyframes, separated by a near-zero-
        // duration (0.01% of cycle ≈ 0.3ms) bridge to the next value.
        // Linear interpolation across a 0.3ms bridge is sub-frame at any
        // realistic monitor refresh, so transitions read as hard jumps
        // regardless of the easing function applied — belt-and-suspenders
        // against whatever the browser ends up using for timing. The
        // final keyframe at 100% KEEPS opacity 0 AND translateY at the
        // last position (108px). The CSS loop boundary then snaps back
        // to the 0% values in zero time with zero interpolation — no
        // visible UP-slide.
        //
        // Units: switched from `lh` to px to remove a second uncertainty
        // variable (whether `lh` resolves against the expected line-
        // height). 54px matches the measured H1 line spacing (fontSize
        // 36 × line-height ~1.5). 108px = 2 × 54. Adjust both in lockstep
        // if the H1 line-height ever changes.
        //
        // Cadence: total cycle 3.18s = 3 × 1.06s. Each of the three
        // positions gets exactly one 1.06s blink (0.53s ON + 0.53s OFF),
        // matching the codified `terminal-blink` rhythm.
        'cursor-cascade-3': {
          // Slot 1 — v visible at y=0
          '0%':       { opacity: '1', transform: 'translateY(0)' },
          '16.66%':   { opacity: '1', transform: 'translateY(0)' },
          // Slot 2 — v invisible at y=0 (0.01% bridge jump)
          '16.67%':   { opacity: '0', transform: 'translateY(0)' },
          '33.32%':   { opacity: '0', transform: 'translateY(0)' },
          // Slot 3 — v visible at y=54px (1lh-equivalent)
          '33.33%':   { opacity: '1', transform: 'translateY(54px)' },
          '49.99%':   { opacity: '1', transform: 'translateY(54px)' },
          // Slot 4 — v invisible at y=54px
          '50%':      { opacity: '0', transform: 'translateY(54px)' },
          '66.66%':   { opacity: '0', transform: 'translateY(54px)' },
          // Slot 5 — v visible at y=108px (2lh-equivalent)
          '66.67%':   { opacity: '1', transform: 'translateY(108px)' },
          '83.32%':   { opacity: '1', transform: 'translateY(108px)' },
          // Slot 6 — v invisible at y=108px, held through loop boundary
          // so the snap back to y=0 happens while opacity is 0 (no slide).
          '83.33%':   { opacity: '0', transform: 'translateY(108px)' },
          '100%':     { opacity: '0', transform: 'translateY(108px)' },
        },
      },
      animation: {
        'terminal-blink': 'terminal-blink 1.06s steps(1, end) infinite',
        'bracket-blink': 'bracket-blink 2.12s steps(1, end) infinite',
        // In between the cursor's 1.06s and the bracket's 2.12s — used
        // for H1 line 2's trailing `how it works  v` scroll-nudge pulse.
        // Landed on 1.6s after a two-pass tune with Alex (2026-04-22
        // evening): first pass was 2.12/1.5 ≈ 1.4s; 1.6s felt closer to
        // the "quiet breathing pulse" target. Reuses the terminal-blink
        // hard-on/off keyframe shape.
        'tail-blink': 'terminal-blink 1.6s steps(1, end) infinite',
        // Three-line cascading cursor (see keyframe above). Total cycle
        // 3.18s = 3 × 1.06s, matching the codified `terminal-blink`
        // period. Easing is `linear` — the keyframe itself is "self-
        // stepping" (paired identical plateaus + sub-frame bridge jumps),
        // so the easing function can't introduce visible interpolation
        // between positions. Switched off `steps(6, end)` in revision 2
        // because the comma inside the function was almost certainly
        // colliding with Tailwind's `animation:` shorthand concatenation
        // (fell back to `ease`, which smooth-slid the cursor across all
        // the intermediate y values instead of hopping between 3). With
        // self-stepping keyframes, linear + no stepping now gives the
        // same 3-position hop `steps()` was supposed to give.
        'cursor-cascade-3': 'cursor-cascade-3 3.18s linear infinite',
      },
    },
  },
  plugins: [],
}
