# Velocity Template Usage Guide

Welcome to the Velocity Digital Marketing Studio template. This guide will help you understand the project structure and how to customize it.

## Project Structure

```
template-name/
├── assets/
│   ├── css/
│   │   ├── style.css          // base theme, layout, typography, utilities
│   │   ├── dark-mode.css      // dark theme overrides
│   │   └── rtl.css            // RTL-specific overrides
│   ├── js/
│   │   ├── main.js            // global interactions, navigation, animations, theme toggles
│   │   └── plugins/           // external or modular JS plugins
│   ├── images/                // optimized images, SVGs, illustrations
│   └── fonts/                 // custom or local web fonts
├── pages/
│   ├── index.html             // Home page
│   ├── services.html          // Services page
│   ├── blog.html              // Blog listing & featured posts
│   ├── contact.html           // Contact page with working form markup
│   ├── signin.html            // Sign-in page
│   └── login.html             // Login page
├── documentation/             // Usage and customization guide
└── README.md                  // Project info and build notes
```

## Customization

### 1. Theme and Colors
Most theme settings and colors are defined in `assets/css/style.css` using CSS variables. You can easily change the primary, secondary, and accent colors to match your brand.

### 2. Dark Mode
Dark mode overrides are handled in `assets/css/dark-mode.css`. The toggle functionality is implemented in `assets/js/main.js`.

### 3. RTL Support
RTL (Right-to-Left) support is available via `assets/css/rtl.css`. The project includes a toggle for easy testing.

### 4. Adding New Pages
When adding new pages, place them in the `pages/` directory. Ensure you use the correct relative paths for assets:
- CSS: `../assets/css/style.css`
- JS: `../assets/js/main.js`

## Forms
The `contact.html`, `signin.html`, and `login.html` pages include form markup. You'll need to connect these to a backend service to handle submissions.
