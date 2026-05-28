# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **design handoff bundle** exported from Claude Design (claude.ai/design), not a production codebase. See `README.md` — the user mocked up a landing page in HTML/CSS/JS and the expectation is that a coding agent will **recreate the visuals pixel-perfectly** in whatever stack the target project uses (React/Vue/native). Do not treat the prototype's DOM structure as canonical — match the *visual output*.

The subject is **Cloud Liver** (クラウドライバー), a Japanese live-streaming/VTuber agency for gamers. All copy is Japanese.

## File layout

**`docs/` is the canonical, in-development site.** All edits should go here. `project/` is frozen at the initial design handoff state and is kept for reference only — do not modify it unless the user explicitly asks.

`docs/` (canonical, GitHub Pages-served):
- `docs/index.html` — the primary LP. Loads external CSS/JS (no inline `<style>` / `<script>` blocks of substance).
- `docs/company.html` — 会社概要 subpage. Same external CSS/JS pattern.
- `docs/css/style.css` — site-wide stylesheet (the original `<style>` block extracted out + many later refinements: intro splash, intensified neon `.bg-shapes`, floating translucent panels, scale-down typography, etc.).
- `docs/js/main.js` — header shrink + FAQ open/close + smooth-scroll + scroll fade-in observer.
- `docs/assets/` — images (decorations `deco_*.png`, `gamepad_3d.png`, `streamer_photo.jpg`, `faq_question_3d.png`, etc.).

`project/` (frozen initial handoff, kept for reference):
- `project/index.html` / `project/company.html` — single-file mocks with inline `<style>`/`<script>` exported from Claude Design. Does NOT include the post-handoff polish (intro splash, intensified neon shapes, panels, etc.) — that all lives in `docs/`. Anchor IDs and page anatomy below still match.
- `project/assets/`, `project/uploads/` — accompanying images.

There is no build step, no package.json, no node_modules, no tests, no linter config.

## Previewing

There are no build/lint/test commands. To preview, serve `docs/` statically: `python3 -m http.server --directory docs 8000`, then open `http://localhost:8000/index.html` (or `/company.html`). Per `README.md`, do **not** open in a browser or take screenshots unless the user asks — the source spells out dimensions/colors/layout.

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

## Behavior

In `docs/`, behavior lives in `docs/js/main.js` (not inline). It handles:

1. **Sticky header shrink**: toggles `header.site.scrolled` when `window.scrollY > 12`.
2. **FAQ open/close** with smooth animation.
3. **Smooth-scroll** for anchor links.
4. **Scroll-triggered fade-in**: elements with class `.fade-in` (and stagger variants `.delay-1`…`.delay-5`, `.from-right`, `.scale-in`) get `.visible` added via `IntersectionObserver`. Fallback: if `IntersectionObserver` is missing, all become visible immediately.

Note: `docs/index.html` includes a once-per-load **intro splash** overlay (`.intro-splash`) — a 5.6s gradient fade introducing the brand line. The `<h2 class="intro-text">` here mirrors the HERO `<h1>` copy, so keep them in sync.

`company.html` reuses the same `main.js`.

Respect `@media (prefers-reduced-motion: reduce)` — the background orbs/shapes disable their drift animations under it.

## When editing

- Edit `docs/` (HTML, `docs/css/style.css`, `docs/js/main.js`). Do not touch `project/` unless explicitly asked.
- Anchor IDs (`#service`, `#support`, `#results`, `#flow`, `#faq`, `#cta`) are referenced from both pages' nav menus — renaming one means updating both files.
- Image paths are relative (`assets/...`) and resolve from `docs/`. New images go in `docs/assets/`.
- All decorative `<img>`s use `alt=""` intentionally (presentational). Preserve that pattern for new decorations.
- The HERO `<h1 class="h1">` and the intro splash `<h2 class="intro-text">` share the same copy — when changing one, change the other (and the `<title>`).

## Gitワークフロー
- 修正タスクが完了したら必ず以下を実行する:
  1. `git status` で変更内容をユーザに見せる
  2. ユーザの確認後、`git add . && git commit -m "..."` でコミット
  3. コミット後、`git push` でGitHubに反映
- コミットメッセージは日本語で具体的に
- 1タスク1コミット




