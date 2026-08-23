# Pine Liquors & Spirits — Website

Website project for Pine Liquors & Spirits, a liquor store in Pine, Colorado. Target stack: WordPress, hosted on AWS EC2, with a custom theme.

## Status

Early prototype phase. A static HTML/CSS/JS mockup (`prototype/`) is being used to iterate quickly on layout, branding, and content structure before committing to WordPress theme development. Nothing here is production-ready yet.

**Live prototype preview:** https://caeduswins.github.io/pine-liquors-website/ — auto-deployed from `prototype/` on every push to `main` (see CI below). This repo is public so GitHub Pages can serve it; the eventual production site will move to WordPress on EC2.

## What's tracked here

Only custom code belongs in this repo — WordPress core and third-party plugins are not version-controlled here; they're expected to be managed by the hosting/deploy setup on EC2 instead.

- `prototype/` — static HTML/CSS/JS mockup. No build step and no dependencies to *run* it — open `prototype/index.html` directly in a browser, or serve the folder with any static file server.
- `theme/` — custom WordPress theme (styles, templates, functions). This is where the site will eventually live once the design direction from the prototype is settled and ported over.

## Branching

- `main` is the only branch in active use. Work happens directly on it (or short-lived feature branches merged back in) — no separate long-running deployment branch exists yet since there's no deployment pipeline yet.

## CI

Every push/PR to `main` runs automatically via GitHub Actions (`.github/workflows/ci.yml`):

- `lint` — validates `prototype/index.html` (`html-validate`) and `prototype/*.css` (`stylelint`). These are dev-only tooling (see `package.json`) — they don't ship with the site.
- `php-lint` — runs `php -l` over `theme/*.php` to catch syntax errors early.
- `deploy-prototype` — after both checks above pass, publishes `prototype/` to GitHub Pages.

To run the lint checks locally: `npm install`, then `npm run lint`.

## Local setup

**Prototype:** just open `prototype/index.html` in a browser, or serve the folder statically (e.g. `npx serve prototype`).

**Theme (once there's something to run):** this repo holds theme code only, not a full WordPress install. To preview it, drop (or symlink) the `theme/` folder into `wp-content/themes/` of a local or remote WordPress install and activate it from the WordPress admin.
