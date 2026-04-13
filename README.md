# MPS 17 Portfolio

A portfolio website showcasing the members of MPS Angkatan 17.

## 🌐 Website

**[https://ivoryy06.github.io/mps17](https://ivoryy06.github.io/mps17)**

## Structure

```
mps17/
├── index.html              # Home page
├── pages/                  # Member detail pages
├── css/
│   ├── pagehome.scss       # Main stylesheet (SCSS source)
│   ├── pagehome.css        # Compiled CSS (commit this)
│   └── member*.css         # Per-member styles
├── pictures/               # Images and SVGs
├── script.js               # Shared JS (lazy load, lightbox, counter)
├── members.json            # Member data (name, role, page, widget)
├── generate_members.cpp    # Regenerates members.json from C++ source
├── validate_members.py     # Validates members.json fields
├── counter.php             # Self-hosted visitor counter (PHP, not used on GitHub Pages)
└── manifest.json           # PWA manifest
```

## Scripts

### `generate_members.cpp` — regenerate members.json

Edit the member list directly in the source, then compile and run:

```bash
g++ -o generate_members generate_members.cpp
./generate_members
# → members.json updated
```

Run this whenever you add, remove, or rename a member.

### `validate_members.py` — check members.json

Validates that every member has `name`, `role`, and `page` fields:

```bash
python validate_members.py
# OK — 6 members valid.
```

Run this after editing `members.json` manually or after regenerating it.

### `css/pagehome.scss` — compile SCSS

The SCSS source uses variables, mixins (`glass`, `pill-btn`, `flex-center`, `transition`), and nesting. Compile to CSS before committing:

```bash
sass css/pagehome.scss css/pagehome.css
# or watch for changes:
sass --watch css/pagehome.scss:css/pagehome.css
```

### `counter.php` — visitor counter (self-hosted only)

This file is **not active on GitHub Pages** (no PHP support). Visitor counts are fetched client-side from [hits.sh](https://hits.sh) and displayed in the footer.

To self-host the counter on your own PHP server:
1. Deploy `counter.php` alongside the site
2. Update the fetch URL in `script.js` to point to your server

## Visitor Counter

The footer shows a live visit count powered by [hits.sh](https://hits.sh) — no server required. It increments automatically on each page load.
