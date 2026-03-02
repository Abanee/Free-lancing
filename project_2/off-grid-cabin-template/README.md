# Off-Grid Cabin Rental Web Application

A highly polished, responsive, and accessible web application template for off-grid cabin rental services.

## 🏕️ Project Overview

This is a production-ready web application featuring:
- **100% responsive design** (mobile-first approach)
- **Dark/Light mode** with localStorage persistence
- **RTL/LTR support** for international audiences
- **WCAG 2.1 AA accessibility** compliant
- **Single-page application** with smooth scrolling

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (CDN)
- **Vanilla JavaScript** (ES6+) - No dependencies
- **Google Fonts** - Merriweather & Inter
- **Heroicons** - SVG icons

## 🎨 Design System

### Colors

**Light Mode:**
- Background: `#f9f6f0`
- Text: `#1a1a1a`
- Primary Brand: `#2d4a22` (Forest Green)
- Secondary: `#8b5a2b` (Earth Brown)

**Dark Mode:**
- Background: `#121412`
- Text: `#e0e0e0`
- Primary Brand: `#4f6b45`
- Secondary: `#b87333`

### Typography

- **Headings**: Merriweather (Serif) - Bold, elegant
- **Body Text**: Inter (Sans-serif) - Clean, readable

## 📁 Project Structure

```
off-grid-cabin-template/
├── index.html                 # Main application file (all-in-one)
├── assets/
│   ├── css/                   # Stylesheets
│   ├── js/                    # JavaScript modules
│   └── images/                # Image assets
├── pages/                     # Additional pages (if needed)
└── documentation/
    └── README.md             # This file
```

## 🚀 Quick Start

### 1. Open the Application

Simply open `index.html` in a modern web browser:

```bash
# Option 1: Double-click index.html

# Option 2: Using a local server (recommended)
python -m http.server 8000
# Then visit: http://localhost:8000

# Option 3: Using Node.js
npx serve
```

### 2. No Build Process Required

This application uses:
- Tailwind CSS via CDN
- Google Fonts via CDN  
- Inline JavaScript

**No npm install, no webpack, no build step!**

## ✨ Features

### 1. Landing Page (Home)
- Full-screen hero with background image
- Sticky navigation bar
- Three-column features section
- Featured cabins grid with hover effects
- Newsletter signup footer

### 2. Cabin Details & Booking
- Image gallery (integrated in homepage)
- Detailed amenity lists organized by category
- Multi-step booking form:
  - Step 1: Date & guest selection
  - Step 2: Guest details
  - Step 3: Payment & review
- Real-time price calculation
- Sticky booking widget

### 3. Guest Dashboard
- Sidebar navigation with tabs:
  - My Bookings (upcoming & past)
  - Saved Cabins
  - Pre-Arrival Guides
- Downloadable offline guides:
  - Location & Navigation (GPS, directions)
  - Amenities & Systems (solar, water, heating)
  - Safety & Survival (wildlife, emergencies)
- Access code display
- Booking confirmation cards

## 🎯 Key Implementations

### Dark/Light Mode Toggle

Implemented via Tailwind's dark mode (class strategy):
- Click sun/moon icon in navbar
- Preference saved to localStorage
- Persists across sessions
- CSS variables update automatically

### RTL/LTR Support

- Toggle button in navbar
- Uses logical properties (start/end instead of left/right)
- Tailwind classes: `ms-4` (margin-start), `pe-2` (padding-end)
- Direction saved to localStorage

### Accessibility Features

- ✅ Proper ARIA labels on all interactive elements
- ✅ Semantic HTML5 structure
- ✅ Keyboard navigation support
- ✅ Focus states with visible rings
- ✅ Touch-friendly buttons (min 44px height)
- ✅ High contrast ratios (4.5:1 for text)
- ✅ Alt text on all images

### Responsive Breakpoints

```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization Guide

### Changing Colors

Edit CSS variables in `<style>` section:

```css
:root {
  --color-primary: #2d4a22;  /* Your brand color */
  --color-secondary: #8b5a2b;
  /* ... other variables */
}
```

### Adding New Cabins

Duplicate a cabin card in the "Featured Cabins" section:

```html
<div class="card overflow-hidden">
  <div class="relative">
    <img src="YOUR_IMAGE_URL" alt="Cabin Name">
    <!-- ... rest of card -->
  </div>
</div>
```

### Modifying Navigation

Edit the nav links in the navbar:

```html
<div class="hidden md:flex items-center gap-6">
  <a href="#home" class="nav-link">Home</a>
  <a href="#your-section" class="nav-link">Your Link</a>
</div>
```

## 🎬 JavaScript Functionality

### Theme Toggle
```javascript
themeToggle.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
  localStorage.setItem('theme', theme);
});
```

### Dashboard Tab Switching
```javascript
document.querySelectorAll('.dashboard-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Switch active tab and content
  });
});
```

### Smooth Scroll
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
```

## 📊 Performance Optimizations

- ✅ Lazy loading images (via browser native)
- ✅ Minimal JavaScript (no heavy frameworks)
- ✅ CSS loaded from fast CDN
- ✅ Optimized image formats (WebP recommended)
- ✅ Efficient CSS with Tailwind utilities

## 🔒 Security Considerations

For production deployment:

1. **Form Validation**: Add server-side validation
2. **Payment Integration**: Use Stripe/PayPal SDKs securely
3. **User Authentication**: Implement secure auth (JWT, OAuth)
4. **HTTPS**: Always serve over HTTPS
5. **CSP Headers**: Configure Content Security Policy
6. **XSS Protection**: Sanitize all user inputs

## 🚢 Deployment

### Static Hosting (Recommended)

Deploy to any static host:

**Netlify:**
```bash
# Drag and drop folder to Netlify dashboard
# Or use CLI:
netlify deploy --prod
```

**Vercel:**
```bash
vercel --prod
```

**GitHub Pages:**
```bash
git add .
git commit -m "Deploy"
git push origin main
# Enable Pages in repo settings
```

### Traditional Hosting

Upload all files via FTP to your web server's public directory.

## 📝 License

This template is provided as-is for educational and commercial use.

## 🤝 Support

For questions or customization requests:
- Email: support@offgridcabins.example
- Documentation: See inline code comments

## 🎓 Learning Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

## 🎉 Credits

Built with modern web standards and best practices for:
- Performance
- Accessibility  
- User Experience
- Developer Experience

---

**Version:** 1.0.0  
**Last Updated:** March 2, 2026  
**Author:** Expert Frontend Developer & UI Designer

Happy Coding! 🏕️🌲
