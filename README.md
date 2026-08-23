# Web Dev Exploration

Early-stage web project. Target stack: WordPress, hosted on AWS EC2, with custom theme/CSS work.

## Status

Nothing is locked in yet — this is a starting point, not a settled architecture. Folder name and structure are expected to change once the actual site direction is clearer.

## What's tracked here

Only custom code belongs in this repo — the WordPress core and third-party plugins are not version-controlled here; they're expected to be managed by the hosting/deploy setup on EC2 instead.

- `theme/` — custom WordPress theme (styles, templates, functions). This is where the CSS work happens.

## Local setup (once there's something to run)

This repo holds theme code only, not a full WordPress install. To actually preview it, drop (or symlink) the `theme/` folder into `wp-content/themes/` of a local or remote WordPress install and activate it from the WordPress admin.
