# Historic Preservation & Restoration Contractor Website

A premium, production-ready website template for historic preservation and restoration contractors. Built with **Semantic HTML5**, **Tailwind CSS**, and **Vanilla ES6+ JavaScript**.

## 🏛️ Project Overview

This is a Phase 1 implementation of a comprehensive website featuring:
- **Dark/Light Mode** with automatic system preference detection
- **LTR/RTL Support** for internationalization
- **Fully Responsive** mobile-first design
- **Interactive Components** including before/after image sliders
- **Client Dashboard** with project tracking and document management
- **Blog System** with masonry-style layouts
- **Premium Animations** and glassmorphism effects

## 📁 Project Structure

```
historic-restoration-template/
├── assets/
│   ├── css/
│   │   ├── dark-mode.css       # Theme variables and dark mode styling
│   │   ├── style.css           # Custom styles and animations
│   │   └── rtl.css             # Right-to-left language support
│   ├── js/
│   │   ├── main.js             # Global UI, toggles, animations
│   │   └── dashboard.js        # Client portal logic
│   ├── plugins/                # Future third-party plugins
│   ├── images/                 # Project images
│   └── fonts/                  # Custom fonts (if needed)
├── pages/
│   ├── index.html              # Home page
│   ├── dashboard.html          # Client portal
│   ├── blog.html               # News & insights
│   └── project-galleries.html  # Portfolio with before/after
└── documentation/
    └── README.md               # This file
```

## 🎨 Design System

### Color Palette
- **Primary (Terracotta)**: `#D4745B` - Warm, earthy tone representing heritage
- **Secondary (Ochre)**: `#E8B464` - Warm gold accent
- **Accent (Deep Blue)**: `#2C3E50` - Architectural sophistication

### Typography
- **Display Font**: Crimson Pro (serif) - For headings and elegant titles
- **Body Font**: Manrope (sans-serif) - Clean, modern readability

### Responsive Breakpoints
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `1024px - 1280px`
- Large: `> 1280px`

## 🚀 Features

### Global Components

#### Navbar
- Sticky/glassmorphism effect on scroll
- Logo and navigation links
- RTL/LTR toggle button
- Dark/Light mode toggle
- "Client Login" CTA
- Mobile hamburger menu (< 768px)

#### Footer
- Company information
- Quick links and service categories
- Newsletter signup with validation
- Social media icons
- Contact details

### Page-Specific Features

#### 1. Home (`index.html`)
- **Hero Section**: Full-screen cinematic layout with dual CTAs
- **Stats Showcase**: Project metrics (500+ projects, 38 years, etc.)
- **Features Grid**: 6 core competencies with detailed descriptions
- **Mini Gallery**: Before/after comparison preview
- **Scroll Animations**: Fade-in-up effects on scroll

#### 2. Client Portal (`dashboard.html`)
- **Sidebar Navigation**: Overview, Timeline, Documents, Approvals
- **Project Statistics**: Progress, completed phases, budget tracking
- **Interactive Timeline**: Visual Gantt-style project phases
- **Document Library**: Searchable table with download functionality
- **Approval Cards**: Interactive approve/reject buttons
- **Recent Activity Feed**: Real-time project updates

#### 3. Blog (`blog.html`)
- **Masonry Grid Layout**: 2-column responsive article grid
- **Article Cards**: Images, categories, reading time, author info
- **Sidebar**: Categories filter, recent posts, newsletter
- **Pagination**: Multi-page navigation
- **Category Badges**: Color-coded article types

#### 4. Project Galleries (`project-galleries.html`)
- **Filter Bar**: Sticky filter (All, Residential, Commercial, Monuments, Religious)
- **Before/After Sliders**: Interactive drag comparison
- **Project Details**: Location, duration, era, specifications
- **Service Tags**: Technologies and techniques used
- **Alternating Layouts**: Image left/right for visual interest

## 💻 Technology Stack

### Frontend Framework
- **Tailwind CSS v3** (via CDN)
- Custom CSS variables for theming
- Semantic HTML5 markup

### JavaScript
- **Vanilla ES6+** (no frameworks)
- Modular architecture
- Event-driven design

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Key Functionalities

### Theme Management
```javascript
// Automatic system preference detection
// Manual toggle with localStorage persistence
// Smooth transitions between themes
```

### Direction Management
```javascript
// LTR/RTL toggle for internationalization
// Proper text alignment and layout mirroring
// Supports Arabic, Hebrew layouts
```

### Image Comparison Slider
```javascript
// Drag handle for before/after reveal
// Touch-friendly for mobile devices
// Smooth animations
```

### Responsive Navigation
```javascript
// Desktop: Inline navigation
// Mobile: Slide-in hamburger menu
// Smooth open/close animations
```

## 🎨 Customization Guide

### Changing Colors
Edit `assets/css/dark-mode.css`:
```css
:root {
  --color-primary: #D4745B;     /* Your brand color */
  --color-secondary: #E8B464;   /* Accent color */
  --color-accent: #2C3E50;      /* Contrast color */
}
```

### Updating Fonts
Edit `assets/css/style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');

:root {
  --font-display: 'YourDisplayFont', serif;
  --font-body: 'YourBodyFont', sans-serif;
}
```

### Adding New Pages
1. Create HTML file in `pages/` directory
2. Include CSS and JS files:
```html
<link rel="stylesheet" href="../assets/css/dark-mode.css">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="../assets/css/rtl.css">
<script src="../assets/js/main.js"></script>
```

## 📱 Mobile Optimization

### Touch-Friendly Elements
- Minimum 44px touch targets
- Swipeable comparison sliders
- Optimized hamburger menu
- Responsive images

### Performance
- Lazy loading for images (recommended)
- Minimal JavaScript bundle
- CSS-only animations where possible
- Optimized asset loading

## 🧪 Testing Checklist

- [ ] Test all breakpoints (mobile, tablet, desktop)
- [ ] Verify dark/light mode toggle
- [ ] Test RTL/LTR switching
- [ ] Check comparison slider functionality
- [ ] Validate form submissions
- [ ] Test mobile menu open/close
- [ ] Verify all navigation links
- [ ] Check scroll animations
- [ ] Test keyboard navigation
- [ ] Validate HTML/CSS

## 🔧 Development Setup

### Prerequisites
- Modern web browser
- Text editor (VS Code, Sublime, etc.)
- Local web server (optional but recommended)

### Running Locally
1. Extract the project files
2. Open `pages/index.html` in a web browser
3. Or use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

## 📝 Best Practices

### HTML
- Semantic markup (`<header>`, `<nav>`, `<main>`, `<article>`, etc.)
- Proper heading hierarchy (`h1` → `h2` → `h3`)
- Accessible ARIA labels where needed
- Optimized image `alt` attributes

### CSS
- Mobile-first approach
- BEM-like naming conventions
- CSS custom properties for theming
- Minimal specificity conflicts

### JavaScript
- No jQuery dependencies
- Event delegation for performance
- Error handling for robustness
- Clean, commented code

## 🚀 Deployment

### Production Checklist
1. **Optimize Images**: Compress all images (TinyPNG, ImageOptim)
2. **Minify Assets**: Minify CSS and JavaScript files
3. **CDN Setup**: Consider using a CDN for Tailwind CSS in production
4. **Analytics**: Add Google Analytics or similar
5. **SEO**: Update meta tags, add sitemap, robots.txt
6. **Testing**: Cross-browser testing
7. **Performance**: Run Lighthouse audit

### Hosting Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Traditional Hosting**: Any web server (Apache, Nginx)
- **Cloud**: AWS S3, Google Cloud Storage, Azure

## 🎓 Learning Resources

### Tailwind CSS
- [Official Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### JavaScript
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)

## 📄 License

This template is free to use for personal and commercial projects. Attribution appreciated but not required.

## 🤝 Support

For issues, questions, or feature requests:
- Review the documentation
- Check browser console for errors
- Verify all file paths are correct
- Ensure JavaScript is enabled

## 🎉 Credits

### Images
- Placeholder images from [Unsplash](https://unsplash.com)

### Fonts
- Crimson Pro - Google Fonts
- Manrope - Google Fonts

### Icons
- Heroicons (via inline SVG)

---

**Built with ❤️ for historic preservation professionals**

Version 1.0.0 | March 2024
