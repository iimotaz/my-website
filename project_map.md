# Project Map — Motaz Video Editor Portfolio

## Directory Structure

```
my-website/
├── index.html          # Main page — hero, showreel, videos, testimonials, contact form
├── policy.html         # Privacy policy page
├── 404.html            # Custom 404 error page
│
├── styles.css          # All CSS — light/dark themes, responsive layout, animations
├── script.js           # Main logic — render content, modal, form, language, theme
├── config.js           # Site data — name, bio, videos, tools, clients, testimonials
├── policy.js           # Policy page theme toggle logic
│
├── vercel.json         # Vercel config — CSP headers, cache rules, security headers
├── robots.txt          # Search engine crawl rules
├── sitemap.xml         # SEO sitemap
├── .gitignore          # Git ignored files (edit.html, editor.js)
│
├── assets/             # Static assets
│   └── avatar.png      # Profile photo
│
├── fonts/              # Custom font files (if any)
│
├── edit.html           # (Gitignored) Admin editor for live config preview
├── editor.js           # (Gitignored) Editor logic
│
└── README.md           # Project overview
```

## Quick Reference

| File | Role |
|------|------|
| `index.html` | Single-page portfolio — loads `config.js` + `script.js` |
| `config.js` | All editable content (edit this to update the site) |
| `script.js` | Renders content, handles form/modal/theme/language |
| `styles.css` | All styling — dark/light themes, responsive |
| `policy.html` | Privacy policy, loads `policy.js` for theme |
| `404.html` | Shown on missing pages |
| `vercel.json` | Security headers (CSP), cache control |
| `robots.txt` | Allows crawling all paths |
| `sitemap.xml` | SEO sitemap for search engines |

## Dependencies

```
index.html
  ├── config.js         (data)
  ├── script.js         (rendering + logic)
  ├── styles.css        (styling)
  └── assets/avatar.png (profile image)

policy.html
  └── policy.js         (theme toggle)
```