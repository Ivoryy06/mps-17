# MPS Portfolio

A portfolio website for Marsudirini Photography Students, showcasing members across generations.

## 🌐 Website

**[https://ivoryy06.github.io/mps](https://ivoryy06.github.io/mps)**

## Structure

```
mps/
├── index.html              # Home page — member grid, gen filter, search
├── gallery.html            # Photo gallery
├── about.html              # About page
├── credits.html            # Credits page
├── contact.html            # Contact page
├── 404.html                # Custom 404 page
├── pages/
│   ├── index.html          # Members index (alternate entry)
│   └── member1–10.html     # Individual member profile pages
├── css/
│   ├── pagehome.css        # Home page styles
│   └── member-shared.css   # Shared styles for member pages
├── pictures/               # Images and SVGs
├── script.js               # Shared JS (lazy load, lightbox, tilt, visitor counter)
├── members.json            # Member data (name, role, page, widget, gen)
├── generate_members.cpp    # Regenerates members.json from C++ source
├── validate_members.py     # Validates members.json fields
├── counter.php             # Self-hosted visitor counter (not active on GitHub Pages)
└── manifest.json           # PWA manifest
```

## Scripts

### `script.js` — shared client-side logic

- **Lazy loading** — member card images load only when scrolled into view via `IntersectionObserver`
- **Lightbox** — clicking carousel images opens a fullscreen modal; arrow keys navigate between images
- **Bio toggle** — "Read More / Read Less" button on each member card
- **3D tilt effect** — member cards tilt on mouse movement using CSS `rotateX/Y`
- **Visitor counter** — fetches the all-time visit count from [hits.sh](https://hits.sh) and displays it in the footer

### `generate_members.cpp` — regenerate members.json

Edit the member list in the source, then compile and run:

```bash
g++ -o generate_members generate_members.cpp
./generate_members
# → members.json updated
```

### `validate_members.py` — check members.json

Validates that every member entry has `name`, `role`, and `page` fields:

```bash
python validate_members.py
# OK — N members valid.
```

### `counter.php` — visitor counter (self-hosted only)

Not active on GitHub Pages (no PHP support). Reads and increments a `visitors.txt` file, returning `{ "visitors": N }` as JSON. To self-host, deploy this file on a PHP server and update the fetch URL in `script.js`.

## Visitor Counter

The footer shows an all-time visit count powered by [hits.sh](https://hits.sh) — no server required. The count is fetched on every page load via:

```js
fetch("https://hits.sh/ivoryy06.github.io/mps17.json")
  .then(r => r.json())
  .then(d => { counterEl.textContent = d.count ?? d.total ?? "—"; });
```

It increments automatically each time the page is visited and persists across sessions.
