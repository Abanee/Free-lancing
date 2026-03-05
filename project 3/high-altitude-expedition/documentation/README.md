# Apex Ascent Expeditions — Website Documentation

## Project Overview

A multi-page website for a high-altitude mountaineering expedition company. Built with vanilla HTML, CSS, and JavaScript using Tailwind CSS (CDN) for utility classes.

---

## File Structure

```
high-altitude-expedition/
├── assets/
│   ├── css/
│   │   ├── style.css          — Core styles, variables, components
│   │   ├── dark-mode.css      — Dark theme overrides
│   │   └── rtl.css            — Right-to-left language support
│   ├── js/
│   │   └── main.js            — Theme toggle, mobile menu, forms, animations
│   ├── plugins/               — Placeholder for third-party plugins
│   ├── images/                — Placeholder for local images (currently using Unsplash CDN)
│   └── fonts/                 — Placeholder for self-hosted fonts
├── pages/
│   ├── index.html             — Home / Landing page
│   ├── home 2.html            — Alternative dark homepage variant
│   ├── about.html             — Team, story, milestones, values
│   ├── itinerary.html         — Expeditions, day-by-day itinerary, cost breakdowns
│   ├── contact.html           — Application form with file upload & validation
│   ├── service.html           — Full services list & comparison table
│   ├── login.html             — Login page
│   ├── signup.html            — Registration page
│   └── coming-soon.html       — 2026 season countdown page
└── documentation/
    └── README.md              — This file
```

---

## Technologies Used

- **HTML5** — Semantic markup, ARIA accessibility attributes
- **Tailwind CSS** (via CDN) — Utility-first styling
- **Vanilla JavaScript** — No frameworks required
- **Google Fonts** — Oswald (headings) + Inter (body)
- **Unsplash** — Placeholder images (replace with licensed images for production)

---

## CSS Variables (Theme System)

All colors are controlled via CSS custom properties in `style.css`:

```css
:root {
  --bg:       #f8fafc;   /* Page background */
  --bg-card:  #f1f5f9;   /* Card/section background */
  --text:     #0f172a;   /* Primary text */
  --text-sec: #64748b;   /* Secondary text */
  --accent:   #ea580c;   /* Orange brand accent */
  --border:   #cbd5e1;   /* Border color */
  --nav-bg:   rgba(248,250,252,0.92);  /* Navbar glass effect */
}
```

Dark mode overrides these in `.dark { }` selector. Dark mode is toggled by adding/removing the `dark` class on `<html>`.

---

## JavaScript Features (main.js)

| Feature | Description |
|---|---|
| Theme Toggle | Light/dark mode with localStorage persistence |
| Mobile Menu | Hamburger animation + slide-down panel |
| Scroll Reveal | Intersection Observer fades elements in on scroll |
| Counter Animation | Animates numbers on scroll for stat sections |
| Cost Bar Animation | Animates progress bars on scroll |
| Form Validation | Real-time inline validation with accessible error messages |
| Accordion | FAQ expand/collapse toggling |
| Tab Switcher | Content tab switching (extensible) |
| Smooth Scroll | Animated scroll for anchor links |

---

## Adding a New Page

1. Copy the navbar and footer HTML from any existing page
2. Link the CSS files in `<head>`:
   ```html
   <link rel="stylesheet" href="../assets/css/style.css" />
   <link rel="stylesheet" href="../assets/css/dark-mode.css" />
   ```
3. Link main.js before `</body>`:
   ```html
   <script src="../assets/js/main.js"></script>
   ```
4. Set the active nav link to `style="color:var(--accent)"` for the current page

---

## Customisation Guide

### Changing Brand Color
Find and replace `#ea580c` (and `#c2410c` hover) across all CSS files.

### Adding Expedition Cards
Copy the card structure from `index.html` → Featured Expeditions section.

### Replacing Images
All images currently use Unsplash CDN URLs. Replace with:
```html
<img src="../assets/images/your-image.webp" alt="Description" />
```

### Dark Mode Default
Change `applyTheme(stored || getSystemTheme())` to `applyTheme('dark')` in `main.js` to force dark mode by default.

---

## Accessibility

- All interactive elements have minimum 44×44px touch targets
- ARIA labels on all icon-only buttons
- Form fields have associated `<label>` elements
- Error messages linked via `aria-invalid` and `id` references
- Keyboard navigation supported throughout

---

## Production Checklist

- [ ] Replace Unsplash images with licensed alternatives
- [ ] Set up real form submission endpoint (replace `onsubmit` handlers)
- [ ] Replace placeholder email/phone with real contact details
- [ ] Add Google Analytics or equivalent tracking
- [ ] Configure real authentication for login/signup pages
- [ ] Compress and self-host fonts
- [ ] Add meta OG tags for social sharing
- [ ] Submit sitemap to Google Search Console

---

## Browser Support

Tested in: Chrome 120+, Firefox 121+, Safari 17+, Edge 120+

Requires: CSS custom properties, Intersection Observer API, `backdrop-filter`

---

*© 2025 Apex Ascent Expeditions. Documentation maintained by the web team.*
