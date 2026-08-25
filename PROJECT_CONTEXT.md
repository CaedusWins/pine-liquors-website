# Pine Liquors & Spirits — Project Context

Handoff/resume document for this project. If a session is lost, paste this
file into a new chat (or just reopen this repo — see `CLAUDE.md`) to pick
up where things left off. Kept up to date as work progresses; treat it as
the source of truth over memory of "what we did."

Last updated: 2026-08-25 (after the asymmetric/bento/glass redesign and the
motion-and-interaction pass that followed it).

## The business

Pine Liquors & Spirits, a liquor store in Pine, Colorado. We (the user's
team) manage its Google Business Profile, which is where the following
confirmed details came from:

- **Address:** 67348 US Hwy 285, Pine, CO 80470
- **Phone:** (303) 838-4278
- **Rating:** 4.1★, 26 Google reviews
- **Hours:** only the closing time was visible in the source screenshot
  (7:30 PM). Opening time is an **unconfirmed placeholder** (10:00 AM,
  same daily) — confirm before this goes further.
- **Reviews in use:** "Great customer service and extremely friendly
  staff!" — M. (5★); "Good selection, and has mostly everything you need
  from a liquor aspect." — Google review (3★)
- **Featured products:** generic categories only so far (wine, spirits,
  beer, mixers) — no specific brands/picks provided yet.
- The user has a local OneNote with further notes not yet shared here.

## Direction / decisions made

- **Stack:** static HTML/CSS/JS prototype now, WordPress on AWS EC2 later
  (not started — `theme/` is just a placeholder scaffold). Static-first
  was chosen specifically to iterate on layout/branding faster than
  fighting a full WordPress environment.
- **Branding:** modern/upscale (dark background + gold accents), chosen
  over a rustic/mountain-town direction. Fraunces (serif, Google Fonts)
  for display headings, system sans-serif stack for body text.
- **Content sections:** hero, age-verification gate, shop-by-category,
  hours & location (with embedded map), reviews, footer with a
  responsible-drinking note — the "everything" option was chosen over a
  minimal set.
- **Design patterns borrowed from research** (East London Liquor Co. and
  similar independent wine/spirits shops): one strong filled CTA plus a
  minimal text-link CTA rather than multiple buttons; underline-on-hover
  nav; category tiles as photo-ready cards (currently color-coded
  gradient placeholders, swap in real product photography later);
  editorial pull-quote styling for reviews.
- **Current visual treatment (as of the Aug 23 redesign, two commits,
  `3e3134d` then `d8cfcef`)** — layered on top of the section list below,
  not a change to it:
  - Hero: asymmetric split layout — large fluid-type headline (italic
    accent word) on the left, a glassmorphic "quick info" panel (rating,
    live-status dot, hours, address, phone, directions CTA) on the
    right, over a gold/wine/pine radial mesh glow. Headline renders as a
    masked, staggered line reveal rather than a plain fade-in. A giant
    translucent "PINE" wordmark bleeds behind the content for scale.
  - Shop-by-category: bento grid (one large feature tile + three
    regular) with hover-reveal "Explore →" affordance; cards get a
    subtle mouse-driven 3D tilt.
  - Reviews: two-column layout — big-number rating summary beside
    stacked review cards, with a large translucent quote-mark watermark
    behind the section; the 4.1 figure animates as a count-up when it
    scrolls into view.
  - Location: floating glass "Open now" badge over the embedded map.
  - Interaction/motion layer: frosted, shrinking sticky header on
    scroll; scroll-reveal fade+rise via IntersectionObserver; a
    cursor-tracked spotlight glow over the hero; magnetic CTA buttons
    that shift toward the cursor; themed scrollbar; subtle film-grain
    texture over the dark background. Buttons are pill-shaped with a
    gradient fill/soft glow.
  - **Accessibility guardrail:** every cursor-driven or motion effect
    (spotlight, tilt, magnetic buttons, scroll-reveal, count-up) is
    gated behind `(hover: hover)` and/or `prefers-reduced-motion` checks
    in both CSS and JS — touch devices and reduced-motion users get the
    static/instant version. Preserve this gating in any future changes
    to these effects.
- **Repo visibility is public.** It started private; GitHub Pages does
  not work on private repos on the free GitHub plan, so — after
  confirming with the user — the repo was made public specifically to
  enable a live preview link. This was a deliberate, explicit tradeoff,
  not a default.

## Repo layout

Local path: `c:\Development\pine-liquors-website` (git repo root; renamed
from the original `web-dev-exploration` scaffold folder).
GitHub: **https://github.com/CaedusWins/pine-liquors-website** (public,
owned by GitHub user `CaedusWins`).
Branch: **`main` only** — no other branches exist or are needed yet,
since there's no deployment pipeline complex enough to warrant them.

```
prototype/        static HTML/CSS/JS mockup — no build step, no runtime deps
  index.html
  styles.css
  script.js
theme/             placeholder WordPress theme (untouched since initial commit)
  functions.php
  style.css
.github/workflows/ci.yml   CI: lint, php-lint, deploy-prototype (see below)
package.json       dev-only lint tooling (html-validate, stylelint) — NOT
                   a dependency of the shipped site
.htmlvalidate.json / .stylelintrc.json   lint configs
.vscode/settings.json   LOCAL ONLY (gitignored) — points php.validate.executablePath
                   at the locally-installed PHP; machine-specific, not shared
```

## CI/CD (GitHub Actions, `.github/workflows/ci.yml`)

Runs on every push/PR to `main`:

1. **`lint`** — `html-validate` on `prototype/index.html`, `stylelint`
   (stylelint-config-recommended — deliberately *not* -standard, which
   fights the BEM class naming used throughout) on `prototype/*.css`.
2. **`php-lint`** — `php -l` over every file in `theme/*.php`.
3. **`deploy-prototype`** — gated on the two jobs above passing; publishes
   `prototype/` to GitHub Pages.

**Live prototype URL (auto-updates on every push to `main`):**
**https://caeduswins.github.io/pine-liquors-website/**

## Local machine setup (relevant if resuming on this same machine)

- **GitHub CLI (`gh`)** installed via winget, authenticated as
  `CaedusWins`. Binary: `C:\Program Files\GitHub CLI\gh.exe` (not always
  on PATH in fresh shells — invoke by full path if `gh` isn't found).
- **PHP 8.2** installed via winget for local editor diagnostics (CI uses
  the same version). Binary:
  `C:\Users\Caedu\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.8.2_Microsoft.Winget.Source_8wekyb3d8bbwe\php.exe`,
  wired into the gitignored `.vscode/settings.json`.
- **Node.js** (v22.x) available for the lint tooling; `npm ci && npm run
  lint` reproduces the CI lint step locally.
- A separate VS Code window for this repo may be running with
  `--disable-workspace-trust` (session-scoped workaround for Workspace
  Trust/Restricted Mode limiting extensions on a freshly opened folder;
  doesn't touch global settings).

## Unrelated but worth knowing

`c:\Development\Wulfram_Development\wulfram3\` is a **completely separate**
git repo (own GitHub remote `CaedusWins/wulfram3`, own branches) for a
different project. No connection to this repo — mentioned only because
it's easy to confuse the two in a shared VS Code/terminal environment.

## Working-style notes for whoever (or whichever session) picks this up

- Routine git commit/push to `main` on this repo can happen without
  asking each time — that's an established standing preference.
- Decisions that change public exposure or connect new external services
  (making the repo public, enabling Pages, connecting a new hosting
  provider) should still be confirmed explicitly — don't assume the
  precedent set once extends automatically to the next such decision.
- Real data (address/phone/hours/reviews) should come from the team's
  Google Business Profile, not be invented.

## Open items / TODO

1. Confirm real weekly opening hours (only closing time is confirmed).
2. Real product photography to replace the placeholder category tiles.
3. Specific featured products/brands (currently generic categories only).
4. Fold in notes from the user's OneNote once shared.
5. Eventually: port the settled design from `prototype/` into `theme/`
   and provision the AWS EC2 hosting — not started yet.
