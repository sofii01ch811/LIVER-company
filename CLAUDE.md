# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **design handoff bundle** exported from Claude Design (claude.ai/design), not a production codebase. See `README.md` — the user mocked up a landing page in HTML/CSS/JS and the expectation is that a coding agent will **recreate the visuals pixel-perfectly** in whatever stack the target project uses (React/Vue/native). Do not treat the prototype's DOM structure as canonical — match the *visual output*.

The subject is **Cloud Liver** (クラウドライバー), a Japanese live-streaming/VTuber agency for gamers. All copy is Japanese.

## File layout

- `project/index.html` — the primary LP (~1.6k lines, single file). This is what the user had open at handoff and is almost always the file to work on.
- `project/company.html` — the 会社概要 (company info) subpage. Cross-linked from `index.html` via `<a href="company.html">` and back via `index.html#<section-id>` anchors.
- `project/assets/` — referenced images (decorations `deco_*.png`, page-2/3 frames `p2_*.png`/`p3_*.png`, `gamepad_3d.png`, `streamer_photo.jpg`, `logo_light.png`, etc.).
- `project/uploads/` — user-supplied reference images. Not necessarily used by the HTML; treat as inspiration/source material, not as imports to preserve.

Both HTML files are **fully self-contained**: all CSS lives in a single `<style>` block in `<head>`, all JS in one `<script>` at end of `<body>`. There is no build step, no package.json, no node_modules, no tests, no linter config.

## Previewing

There are no build/lint/test commands. To preview, open the HTML file directly in a browser (`file://`) or serve the `project/` directory statically, e.g. `python3 -m http.server --directory project 8000`. Per `README.md`, do **not** open in a browser or take screenshots unless the user asks — the source spells out dimensions/colors/layout.

## Design system (defined in `index.html` `:root`)

The same tokens appear in both HTML files and any reimplementation should preserve them:

- Brand gradient: `linear-gradient(90deg, #3b6df8 0%, #9b5cf6 50%, #ec4899 100%)` (blue → purple → pink). Used on the primary CTA pill, brand wordmark, headings.
- Ink: `#1b1f3a` (primary text), `#4a4f6f` (secondary), `#8a90ab` (muted), `#cdd1e8` (grey accent).
- Surfaces: `#fbfaff` (bg), `#f3f0fc` (bg-soft), `#e7e6f3` (line).
- Fonts (loaded from Google Fonts): **Noto Sans JP** (body), **Bebas Neue** (display labels like PLAY/STREAM/EARN), **Orbitron** (brand wordmark / Latin labels), **Caveat** (handwritten accents), **Press Start 2P** (retro/game accents).
- Viewport is **fixed 1280px** (`<meta name="viewport" content="width=1280">`, `body{min-width:1280px;overflow-x:hidden}`). The design is desktop-only by intent — there is no responsive/mobile layout.

## Page anatomy

`index.html` sections (anchor IDs match the nav `<a href="#...">` links):

1. `header.site` (fixed, shrinks on scroll via `.scrolled` class)
2. `.hero`
3. `#service` — 02 SERVICE (4 service cards `.svc-card.s1`–`.s4`)
4. `#support` — 03 SUPPORT (5 `.sup-card`s)
5. `#results` — 04 RESULTS
6. `#flow` — 05 FLOW
7. `#faq` — 06 FAQ
8. `#cta` — 07 CTA BANNER
9. `footer.site`

`company.html` sections: PAGE HERO → 代表メッセージ → VMV → COMPANY INFO → HISTORY → ACCESS → CTA → footer.

## Behavior (the inline `<script>`)

Three things only, all in `index.html`'s trailing IIFE:

1. **Sticky header shrink**: toggles `header.site.scrolled` when `window.scrollY > 12`.
2. **Voices carousel**: `#voicesTrack` is translated horizontally; `#voicesPrev`/`#voicesNext` and `#voicesDots > i` are the controls. Wraps modulo `track.children.length`.
3. **Scroll-triggered fade-in**: elements with class `.fade-in` (and stagger variants `.delay-1`…`.delay-5`, `.from-right`, `.scale-in`) get `.visible` added via `IntersectionObserver`. Fallback: if `IntersectionObserver` is missing, all become visible immediately.

`company.html` has its own much smaller script — just the header-shrink logic.

Respect `@media (prefers-reduced-motion: reduce)` — the background orbs disable their drift animations under it.

## When editing

- Keep changes inside the relevant single HTML file; do not split into external CSS/JS unless the user asks. The bundle's value is that each page is one self-contained artifact.
- Anchor IDs (`#service`, `#support`, `#results`, `#flow`, `#faq`, `#cta`) are referenced from both pages' nav menus — renaming one means updating both files.
- Image paths are relative (`assets/...`, `uploads/...`) and resolve from `project/`. New images go in `project/assets/`.
- All decorative `<img>`s use `alt=""` intentionally (presentational). Preserve that pattern for new decorations.
