/**
 * main.js — Global Scripts
 * Handles: mobile menu, navbar scroll behavior,
 * index page cabin rendering, and shared utilities.
 */

/* =====================
   NAVBAR SCROLL BEHAVIOR
   ===================== */
const navbar = document.getElementById('navbar');

if (navbar) {
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on load in case page is pre-scrolled
}

/* =====================
   MOBILE MENU TOGGLE
   ===================== */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* =====================
   INDEX PAGE: CABIN GRID
   ===================== */
document.addEventListener('DOMContentLoaded', () => {
  // Index page hero grid — show first 3 featured cabins
  const heroGrid = document.getElementById('cabins-grid');
  if (heroGrid && typeof CABINS_DATA !== 'undefined') {
    // Check we're on index (not cabins.html which calls renderCabins itself)
    const isIndexPage = document.title.includes('Escape Into the Wild');
    if (isIndexPage) {
      const featured = CABINS_DATA.slice(0, 3);
      heroGrid.innerHTML = featured.map(c => buildCabinCard(c)).join('');
    }
  }

  // Dashboard favorites
  if (typeof renderFavorites === 'function') {
    renderFavorites();
  }
});

/* =====================
   CABIN DETAIL: DESCRIPTION TOGGLE
   ===================== */
function toggleDescription() {
  const more = document.getElementById('desc-more');
  const btn = document.getElementById('read-more-btn');
  if (!more || !btn) return;

  const isHidden = more.classList.contains('hidden');
  more.classList.toggle('hidden', !isHidden);
  btn.textContent = isHidden ? 'Show less ↑' : 'Show more ↓';
}

/* =====================
   THEME & RTL TOGGLES
   ===================== */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const directionToggle = document.getElementById('direction-toggle');
  const directionToggleMobile = document.getElementById('direction-toggle-mobile');

  // Load saved preferences
  const savedTheme = localStorage.getItem('theme');
  const savedDir = localStorage.getItem('direction');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
    if (themeToggleMobile) themeToggleMobile.textContent = '🌙 Theme';
  }

  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    if (directionToggle) directionToggle.textContent = '⬅️';
    if (directionToggleMobile) directionToggleMobile.textContent = '⬅️ Direction';
  }

  // Handle Theme Toggle
  const toggleTheme = () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    const emoji = isLight ? '🌙' : '☀️';
    if (themeToggle) themeToggle.textContent = emoji;
    if (themeToggleMobile) themeToggleMobile.textContent = emoji + ' Theme';
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // Handle Direction Toggle
  const toggleDirection = () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('direction', newDir);
    
    const emoji = newDir === 'rtl' ? '⬅️' : '➡️';
    if (directionToggle) directionToggle.textContent = emoji;
    if (directionToggleMobile) directionToggleMobile.textContent = emoji + ' Direction';
  };

  if (directionToggle) directionToggle.addEventListener('click', toggleDirection);
  if (directionToggleMobile) directionToggleMobile.addEventListener('click', toggleDirection);
});
