# Pine Liquors & Spirits — Project Context

Handoff/resume document for this project. If a session is lost, paste this
file into a new chat (or just reopen this repo — see `CLAUDE.md`) to pick
up where things left off. Kept up to date as work progresses; treat it as
the source of truth over memory of "what we did."

**Emergency resume checklist:** (1) read this whole file, (2) run
`git log --oneline -10` and `git status` to confirm the repo matches what's
described below, (3) check the live prototype URL still renders, (4) check
the Open items list for what's next. That's sufficient — nothing else is
required to pick this project back up cold.

**Known gotcha — local Claude Code session history is keyed by folder
path.** This repo was renamed from `web-dev-exploration` to
`pine-liquors-website` (see Repo layout below). Claude Code's local session
transcripts (`~/.claude/projects/<folder-path>/*.jsonl` on this machine) are
filed per exact folder path, so any session run before that rename is not
retrievable under the current path — as of 2026-08-25 only 2 transcripts
exist locally, both from after the rename. **This file is the only durable
record of anything decided before that point** — raw chat history is not a
fallback for pre-rename decisions the way it is for post-rename ones.

Last updated: 2026-09-07 (warm-interior photo pass — swapped the two
"empty/industrial cooler" category tiles for warmer shots and added a
full-bleed interior "ambiance" band between Shop and Location; see Open
items #2).

**Resolved 2026-09-07 — business name confirmed.** The "Long's Liquor"
road sign is old signage from before a rebrand; **"Pine Liquors &
Spirits" is the current, correct name**, confirmed by the user. Physical
signage just hasn't caught up yet. Per the user, `road-sign-longs-liquor.jpg`
is deliberately excluded from site use for now (shows the outdated name)
— kept in `prototype/assets/` as a reference photo only, not wired into
any page. Revisit if/when the physical sign is updated.

## The business

Pine Liquors & Spirits, a liquor store in Pine, Colorado. We (the user's
team) manage its Google Business Profile, which is where the following
confirmed details came from:

- **Address:** 67348 US Hwy 285, Pine, CO 80470
- **Phone:** (303) 838-4278
- **Rating:** 4.1★, 26 Google reviews
- **Hours:** **confirmed** — 11:00 AM – 7:30 PM, all 7 days of the week
  (same hours every day). Live in `prototype/index.html` as of
  2026-08-25.
- **Reviews in use:** "Great customer service and extremely friendly
  staff!" — M. (5★); "Good selection, and has mostly everything you need
  from a liquor aspect." — Google review (3★)
- **Featured products:** Wine and Spirits categories now name real
  carried brands — Hennessy, Grey Goose, and local wine from Aspen Peak
  Cellars (confirmed 2026-09-02). Beer and Mixers are still generic;
  more brands welcome whenever provided.
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

## QA process (established 2026-09-07 — follow this, don't push straight to main)

Before this date, changes went straight to `main` and were verified against
the *live* site after the fact — lint catches syntax errors, not "does this
look right in a browser." That's not good enough now that this is a real
business's site. Process going forward:

1. **Always, before any push:** run `npm ci && npm run lint` locally (must
   pass), and actually load `prototype/index.html` — e.g.
   `npx serve prototype` or `python -m http.server` from that folder — and
   look at the change in a real browser. Don't rely on lint alone; it
   doesn't catch layout/visual regressions.
2. **Trivial, single-line content-only fixes** (a typo, a price, a phone
   digit — no CSS/structural/image change) may still go straight to `main`
   after step 1 passes. Low risk, and this is a solo-dev pre-launch project.
3. **Anything else** (CSS, HTML structure, images, multiple files): work on
   a short-lived branch (`git checkout -b fix/<short-name>`), push it, and
   open a PR into `main`. CI already runs `lint` + `php-lint` automatically
   on pull requests (`.github/workflows/ci.yml`, `pull_request` trigger) —
   no workflow changes were needed, that machinery just wasn't being used.
   `deploy-prototype` only runs `if: github.ref == 'refs/heads/main'`, so
   nothing goes live until the PR is actually merged. Merge only once CI is
   green **and** step 1's local visual check passed. Delete the branch after
   merging.
4. **If something still slips through:** `git revert <commit>` + push is the
   fast undo — GitHub Pages redeploys automatically within ~30–60s of the
   next push to `main`. Fast recovery is a safety net, not a substitute for
   steps 1–3.

## Working-style notes for whoever (or whichever session) picks this up

- Decisions that change public exposure or connect new external services
  (making the repo public, enabling Pages, connecting a new hosting
  provider) should still be confirmed explicitly — don't assume the
  precedent set once extends automatically to the next such decision.
- Real data (address/phone/hours/reviews) should come from the team's
  Google Business Profile, not be invented.

## Open items / TODO

1. ~~Confirm real weekly opening hours.~~ **Done 2026-08-25** — 11:00 AM –
   7:30 PM, all 7 days.
2. ~~Real product photography.~~ **Done 2026-09-07**, then refined the
   same day (warm-interior pass). Current category-tile images (set in
   `prototype/styles.css`, `.card__image--*`):
   - Wine (feature): `wine-liqueur-shelf.jpg` — warm, stocked wine +
     liqueur shelves under the log-beam ceiling.
   - Spirits: `premium-spirits-shelf-hennessy.jpg` — unchanged, the full
     spirits wall.
   - Beer: `back-room-coolers-snacks.jpg` — **weakest tile, known
     placeholder.** It's warm (knotty pine, glass-door coolers) and not
     empty/grim, but the centre crop reads "snack corner / back room"
     more than "beer." Per the user (2026-09-07): use what we have for
     now, get a proper stocked-beer-cooler photo from the owner later
     and swap it in.
   - Mixers: `cooler-drinks-closeup.jpg` — unchanged.

   **Dropped for looking unwelcoming:** `wine-beer-fridge.jpg` (half the
   frame is a bare, empty cooler) and `walk-in-cooler-beer-cases-2.jpg`
   (stained diamond-plate floor, half-empty wire racks). Both still in
   `prototype/assets/`, just not referenced.

   **New "ambiance" band:** a full-bleed interior section (`.ambiance`
   in CSS, markup between `#shop` and `#location` in `index.html`) using
   `liquor-aisle-fireball-display.jpg` — the best single "this is our
   store" wide shot (log ceiling, warm light, Fireball tower, whiskey
   wall). `background-position` is nudged to `28% 38%` to favour the
   aisle and keep the cluttered sticky-note counter toward the edge.

   Also removed the stale "Placeholder categories — swap in real
   featured products/brands when ready" note under the Shop grid; the
   categories now name real brands and use real photos.

   Still-unused photos in `prototype/assets/`: `storefront-exterior.jpg`
   (good for a hero or the Location section), `checkout-counter-shooters.jpg`,
   `walk-in-cooler-beer-cases-1.jpg`, `liquor-wall-vodka-office.jpg`,
   `whiskey-wall-cigarettes-office.jpg` (best views of the hand-painted
   Western mural, but all have office chair / monitor / license
   paperwork clutter in frame — worth asking the owner for a clean
   re-shoot of the mural wall). The 2026-09-02 marketing photos
   (Hennessy bar-shot, Aspen Peak Cellars bottle) were removed from the
   repo entirely. `road-sign-longs-liquor.jpg` is deliberately excluded
   from site use (old name/signage — see the note near the top of this
   file).
3. ~~Specific featured products/brands.~~ **Done 2026-09-07** — Wine,
   Spirits, and Beer tiles all name real carried brands (Hennessy, Grey
   Goose, Jameson, Elijah Craig, Aspen Peak Cellars, Colorado Native,
   New Belgium Voodoo Ranger, Coors Banquet). Mixers stays generic by
   nature of the category; revisit only if a specific mixer brand
   becomes worth naming.
4. Fold in notes from the user's OneNote once shared.
5. Eventually: port the settled design from `prototype/` into `theme/`
   and provision the AWS EC2 hosting — not started yet.
