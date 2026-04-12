# MPS 17 Portfolio

Portfolio website for MPS angkatan 17 members.

## Structure

```
mps17/
├── pages/          # HTML pages (index + member pages)
├── css/            # Stylesheets
├── pictures/       # Images
├── tools/          # Dev tools
│   └── generate_members.cpp
├── members.json    # Member data (auto-generated)
├── script.js       # Shared scripts
└── README.md
```

## Languages Used

| Language | Purpose |
|----------|---------|
| HTML | Page structure |
| CSS / SCSS | Styling |
| JavaScript | Interactivity |
| JSON | Member data |
| C++ | Member JSON generator |
| Python | Data validation script |
| PHP | Local dev server + visitor counter |
| Markdown | Documentation |

## Setup

### Generate members.json (C++)
```bash
g++ -o tools/generate_members tools/generate_members.cpp
./tools/generate_members
```

### Validate members.json (Python)
```bash
python3 tools/validate_members.py
```

### Serve locally (PHP)
```bash
php -S localhost:8000 -t pages/
```

### Compile SCSS
```bash
sass css/pagehome.scss css/pagehome.css
```
