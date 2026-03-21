# Velocity - Digital Marketing Studio Template

## 🚀 Overview

A production-ready, modern 2026 web template for a **Digital Marketing Studio** specializing in performance marketing for e-commerce and SaaS companies. Built with a distinctive **Data-Driven Neo-Brutalist** aesthetic that's bold, confident, and conversion-focused.

### Key Features

✨ **Design System**
- Custom design tokens with CSS variables
- Distinctive fonts (Outfit + Manrope, NOT generic Inter/Roboto)
- Bold color palette with electric accents
- Glassmorphism and neo-brutalist elements
- Light + Dark themes
- LTR + RTL layout support

⚡ **Performance**
- Mobile-first responsive design
- Hardware-accelerated animations
- Optimized Core Web Vitals
- Reduced motion support
- SEO-optimized HTML structure

🎯 **Interactivity**
- Theme toggle (light/dark)
- Direction toggle (LTR/RTL)
- Smooth scroll animations
- Animated counters for stats
- Form validation
- Service filtering
- Mobile-friendly navigation

♿ **Accessibility**
- WCAG 2.1 AA compliant
- Keyboard navigable
- ARIA attributes
- Semantic HTML5
- Focus-visible states

## 📁 Project Structure

```
template-name/
├── assets/
│   ├── css/
│   │   ├── style.css          # base theme, layout, typography, utilities
│   │   ├── dark-mode.css      # dark theme overrides
│   │   └── rtl.css            # RTL-specific overrides
│   ├── js/
│   │   ├── main.js            # global interactions, navigation, animations, theme toggles
│   │   └── plugins/           # external or modular JS plugins
│   ├── images/                # optimized images, SVGs, illustrations
│   └── fonts/                 # custom/local web fonts
├── pages/
│   ├── index.html             # Home page
│   ├── services.html          # Services page
│   ├── blog.html              # Blog listing & featured posts
│   ├── contact.html           # Contact page
│   ├── signin.html            # Sign-in page
│   └── login.html             # Login page
├── documentation/             # Usage and customization guide
└── README.md                  # Project info and build notes
```

## 🎨 Design Tokens

### Color Palette

**Light Theme:**
- Primary: `#0066FF` (Electric Blue)
- Secondary: `#FF3366` (Hot Pink)
- Accent: `#00FFCC` (Cyan)

**Dark Theme:**
- Enhanced with neon glow effects
- Electric accents for CTAs
- High-contrast text

### Typography
- **Display Font:** Outfit (800-900 weight)
- **Body Font:** Manrope (400-700 weight)
- Responsive fluid typography using `clamp()`

### Spacing
- 4px base unit system
- Consistent spacing scale from 4px to 128px

## 🚀 Getting Started

### Quick Start

1. **Open the template:**
   ```bash
   # Navigate to the pages folder
   cd pages/
   
   # Open index.html in your browser
   open index.html
   # or
   python -m http.server 8000
   ```

2. **Start customizing:**
   - Colors: Edit CSS variables in `assets/css/style.css` (`:root` section)
   - Content: Update HTML files in `pages/`
   - Fonts: Change Google Fonts imports in HTML head

### Development Server

For local development with live reload:

```bash
# Using Python
python -m http.server 8000

# Using Node/npx
npx serve pages/

# Using VS Code Live Server extension
# Right-click on index.html → "Open with Live Server"
```

Then visit `http://localhost:8000`

## 🎨 Customization Guide

### Change Brand Colors

Edit `assets/css/style.css`:

```css
:root {
  --color-primary: #0066FF;      /* Your primary brand color */
  --color-secondary: #FF3366;    /* Your secondary brand color */
  --color-accent: #00FFCC;       /* Your accent color */
}
```

### Change Fonts

1. Update Google Fonts import in HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

2. Update CSS variables:
```css
:root {
  --font-display: 'YourDisplayFont', sans-serif;
  --font-body: 'YourBodyFont', sans-serif;
}
```

### Modify Content

**Home Page Hero:**
- Edit `pages/index.html` → Section with class `bg-pattern`
- Update headline, subheading, and CTA buttons

**Services:**
- Edit `pages/services.html` → Service cards in grid
- Add/remove services by duplicating card structure

**Blog Posts:**
- Edit `pages/blog.html` → Article cards
- Update featured post content

### Add New Pages

1. Duplicate an existing HTML file
2. Update `<title>`, meta description, and `<h1>`
3. Add navigation link in navbar
4. Update active state in navbar

## ⚙️ Features Documentation

### Theme Toggle

Automatically detects user's system preference and allows manual override:
- Light mode: Clean, minimal with subtle shadows
- Dark mode: Deep backgrounds with neon accents and glow effects

### RTL Support

Full right-to-left layout support for Arabic, Hebrew, etc:
- Mirrors padding, margins, and layout
- Flips icons and arrows
- Adjusts text alignment

### Form Validation

Client-side validation on all forms:
- Required field checking
- Email format validation
- Phone number validation
- Password strength (min 8 characters)
- Real-time error display

### Service Filtering

JavaScript-powered category filtering on Services page:
- Filter by service category
- Smooth animation on filter
- "All Services" default view

### Animated Counters

Stats animate on scroll into view:
- Easing function for smooth counting
- Intersection Observer for performance
- Configurable duration and target values

### Back to Top Button

Smooth scroll to top with:
- Appears after scrolling 300px
- Smooth scroll animation
- Fade in/out transition

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
Base:     < 768px   (Mobile)
md:       ≥ 768px   (Tablet)
lg:       ≥ 1024px  (Desktop)
xl:       ≥ 1280px  (Large Desktop)
```

## 🔧 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari/Chrome

## 📊 Performance Optimization

- **Images:** Use WebP format where possible
- **CSS:** Already minified for production
- **JS:** Vanilla ES6, no dependencies
- **Fonts:** Google Fonts with `display=swap`
- **Critical CSS:** Inline critical styles in `<head>` for faster FCP

## 🎯 SEO Best Practices

Each page includes:
- Unique `<title>` (≤60 chars)
- Meta description (150-160 chars)
- Semantic HTML5 structure
- Proper heading hierarchy (H1 → H6)
- Alt text on images
- Open Graph tags

## ♿ Accessibility Checklist

- [x] Semantic HTML landmarks
- [x] ARIA labels on interactive elements
- [x] Keyboard navigation support
- [x] Focus-visible states
- [x] Color contrast (WCAG AA)
- [x] Screen reader friendly
- [x] Reduced motion support

## 🚢 Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. Push to Git repository
2. Connect to hosting platform
3. Set build directory to `pages/`
4. Deploy!

### Traditional Web Hosting

1. Upload all files to server
2. Ensure proper directory structure
3. Set `pages/index.html` as site root

## 🔄 Integration Ready

This template is prepared for:
- **Forms:** Formspree, Netlify Forms, or custom backend
- **Analytics:** Google Analytics 4, Plausible, Fathom
- **CMS:** Netlify CMS, Forestry, or any headless CMS
- **Email:** Mailchimp, ConvertKit, Klaviyo

## 📝 License

This template is free to use for personal and commercial projects.

## 🤝 Support

For questions or issues:
- Review this README
- Check code comments in CSS/JS files
- Inspect browser console for errors

## 📚 Tech Stack

- **HTML5:** Semantic structure
- **CSS3:** Custom properties, Grid, Flexbox
- **JavaScript (ES6+):** Vanilla, no frameworks
- **Bootstrap 5.3:** Grid system and utilities
- **Tailwind CSS 3.3:** Utility-first styling
- **Google Fonts:** Outfit + Manrope

## 🎉 Credits

- **Design:** Modern 2026 aesthetic with neo-brutalist accents
- **Fonts:** Google Fonts (Outfit, Manrope)
- **Icons:** SVG inline icons
- **Template:** Digital Marketing Studio (Performance Marketing Focus)

---

**Built with ⚡ by the Velocity team**

For the best experience, use this template as a starting point and customize it to match your unique brand and business needs.
