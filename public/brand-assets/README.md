# brand-assets/

Canonical brand assets for alderman.ai. Single source of truth.

Rules:
- **Everything in this folder is official.** If it lives here, it's approved for use.
- **Versioned filenames.** Every asset gets `-v1`, `-v2`, etc. Never overwrite; always bump.
- **Never reference `uploads/` from a design or production file.** `uploads/` is raw input only. Once an asset is canonical, it moves here with a proper name.
- **Track provenance.** This README logs each asset's origin and current version.

---

## Folder structure

```
brand-assets/
├── README.md                  (this file)
├── logos/                     (marks, wordmarks, favicons)
├── scribbles/                 (hand-drawn orange annotations)
├── photography/               (portraits, composed hero imagery)
└── (future: icons/, patterns/, etc.)
```

---

## Asset log

### logos/

| File | Description | Source | Status |
|---|---|---|---|
| `alderman-ai-mark-v1.png` | The alderman.ai mark, **filled-ground version**. 3×3 grid. Barlow. Full color map (`al` green, `der` white, `man` orange, purple `>_` cursor split across top-left and under `al`) on solid dark ide-bg ground. 1000×1000 PNG. Use when you need a self-contained mark with its own background (favicon, social avatar, dense layouts). | Designed in Canva, uploaded 2026-04. | **Canonical.** |
| `alderman-ai-mark-transparent-v1.svg` | The mark, **transparent-ground SVG**. Same grid and color map as the PNG, **but the ground is transparent** — the `der` letters render in white `#F8F8F2`, so this variant **only works placed on a dark IDE substrate** (or another sufficiently dark color). Use in chrome strips, IDE sections, and anywhere the mark is composited over dark background. 489×570 viewBox. | Designed in Canva, uploaded 2026-04. | **Canonical (dark-substrate use only).** |
| `alderman-ai-wordmark-v2.svg` | The inline wordmark. `alderman.ai` in JetBrains Mono, transparent background, with the **full canonical four-segment color map**: `alder` purple · `man` orange · `.` purple · `ai` green. Works on both paper and IDE substrates. **Supersedes `alderman-ai-wordmark-ide-v1.svg`** (which only had a single purple accent). 372×83 viewBox. | Designed in Canva, uploaded 2026-04. | **Canonical.** |
| `alderman-ai-wordmark-ide-v1.svg` | Previous wordmark. Purple accent on `ai` only, otherwise monochrome. **Superseded by v2.** Kept temporarily for reference; delete after v2 is referenced everywhere in active code. | Designed in Canva, uploaded 2026-04. | **Deprecated.** |

Open needs (not yet produced):
- **Light-ground variant of the mark** (for paper-environment placements — dark `der` letters on paper ground instead of white on dark).
- Favicon reduction (16×16 and 32×32 — purple `>_` on dark square, letters dropped).
- LinkedIn company avatar export (400×400 square, filled-ground PNG variant).

### scribbles/

| File | Description | Source | Status |
|---|---|---|---|
| `replace-retain-v2.svg` | The canonical `replace RETAIN` gesture. Struck-through green `replace` with `RETAIN` in solid orange below. **No arrow. No neon glow** (neon was dropped from v1 → v2 because Canva's neon effect does not survive SVG export). | Designed in Canva, uploaded 2026-04. | **Canonical.** |
| `human-approach-tagline-v1.svg` | Tagline lockup: "a HUMAN approach to the ai future." | Designed in Canva, uploaded 2026-04. | **Canonical.** |

Open needs:
- Bullet-highlight scribble (hand-drawn orange rectangle for framing a single line item).

### photography/

Empty. To be populated:
- `alex-portrait-still-human-v1.png` — circular portrait with "still HUMAN" arc (currently at `uploads/alderman.ai.png`, to be moved once named).
- `hero-phone-composition-v1.png` — the phone + scribble hero image (currently at `uploads/Hero section.png`, to be moved once the final version is chosen).

---

## Naming convention

```
<brand-kebab>-<asset-kebab>-v<n>.<ext>
```

Examples:
- `alderman-ai-mark-v1.png`
- `alderman-ai-mark-favicon-v1.svg`
- `alderman-ai-wordmark-chord-v1.svg`
- `alex-portrait-still-human-v1.png`

---

## Promotion workflow

When a new asset is approved for canonical use:

1. Produce the final file (in Canva, Figma, wherever).
2. Upload to `uploads/` for review if needed.
3. Once approved, copy to `brand-assets/<subfolder>/<name>-v1.<ext>`.
4. Add a row to the asset log in this README.
5. Delete or leave the `uploads/` original at your discretion — it is no longer referenced.
