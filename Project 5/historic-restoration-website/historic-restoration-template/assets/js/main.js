/**
 * Main JavaScript
 * Historic Preservation & Restoration Contractor
 * 
 * Global UI logic, theme toggles, animations, and interactive features
 */

// ============================================================================
// INITIALIZATION & DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Prevent transition flash on page load
  document.body.classList.add('preload');
  
  // Initialize all modules
  initThemeManager();
  initDirectionManager();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initComparisonSliders();
  initNewsletterForm();
  
  // Remove preload class after a brief delay
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 100);
});

// ============================================================================
// THEME MANAGER (Dark/Light Mode)
// ============================================================================

function initThemeManager() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    html.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon(savedTheme);
  } else if (systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
    html.classList.add('dark');
    updateThemeIcon('dark');
  } else {
    html.setAttribute('data-theme', 'light');
    html.classList.remove('dark');
    updateThemeIcon('light');
  }
  
  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      html.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Add subtle animation
      themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
      }, 300);
    });
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      html.classList.toggle('dark', newTheme === 'dark');
      updateThemeIcon(newTheme);
    }
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('svg');
  if (!icon) return;
  
  if (theme === 'dark') {
    // Sun icon for switching to light mode
    icon.innerHTML = `
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `;
  } else {
    // Moon icon for switching to dark mode
    icon.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
}

// ============================================================================
// DIRECTION MANAGER (LTR/RTL)
// ============================================================================

function initDirectionManager() {
  const dirToggle = document.getElementById('dir-toggle');
  const html = document.documentElement;
  
  // Check for saved direction preference
  const savedDir = localStorage.getItem('direction') || 'ltr';
  html.setAttribute('dir', savedDir);
  updateDirIcon(savedDir);
  
  // Direction toggle click handler
  if (dirToggle) {
    dirToggle.addEventListener('click', () => {
      html.classList.add('transitioning');
      
      const currentDir = html.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      
      html.setAttribute('dir', newDir);
      localStorage.setItem('direction', newDir);
      updateDirIcon(newDir);
      
      // Remove transitioning class after animation
      setTimeout(() => {
        html.classList.remove('transitioning');
      }, 300);
    });
  }
}

function updateDirIcon(direction) {
  const dirToggle = document.getElementById('dir-toggle');
  if (!dirToggle) return;
  
  dirToggle.textContent = direction.toUpperCase();
}

// ============================================================================
// NAVBAR EFFECTS
// ============================================================================

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  const scrollThreshold = 20;
  
  const updateNavbarStyle = () => {
    const currentScroll = window.pageYOffset;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (currentScroll > scrollThreshold) {
      navbar.classList.add('shadow-md', 'backdrop-blur-md');
      // Dark White in light mode, Dark Black in dark mode - high opacity for scroll
      navbar.style.backgroundColor = isDark ? 'rgba(26, 22, 20, 0.98)' : 'rgba(248, 245, 241, 0.95)';
      navbar.style.borderBottomColor = isDark ? 'rgba(232, 148, 127, 0.2)' : 'rgba(212, 116, 91, 0.1)';
    } else {
      navbar.classList.remove('shadow-md', 'backdrop-blur-md');
      // Slightly more transparent at the top
      navbar.style.backgroundColor = isDark ? 'rgba(26, 22, 20, 0.85)' : 'rgba(248, 245, 241, 0.85)';
      navbar.style.borderBottomColor = 'transparent';
    }
  };

  // Initial call
  updateNavbarStyle();
  
  window.addEventListener('scroll', updateNavbarStyle);
  
  // Also update when theme changes
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Small delay to ensure data-theme attribute has updated
      setTimeout(updateNavbarStyle, 10);
    });
  }
}

// ============================================================================
// MOBILE MENU
// ============================================================================

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  
  if (!hamburger || !mobileMenu) return;
  
  // Open mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close mobile menu
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  
  // Close menu when clicking on links
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with 'animate-on-scroll' class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
}

// ============================================================================
// IMAGE COMPARISON SLIDER
// ============================================================================

function initComparisonSliders() {
  const sliders = document.querySelectorAll('.comparison-slider');
  
  sliders.forEach(slider => {
    const afterImage = slider.querySelector('.after-image');
    const handle = slider.querySelector('.slider-handle');
    const button = slider.querySelector('.slider-button');
    
    if (!afterImage || !handle || !button) return;
    
    let isDragging = false;
    
    // Mouse events
    button.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
    
    // Touch events
    button.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDragging);
    
    function startDragging(e) {
      isDragging = true;
      e.preventDefault();
    }
    
    function stopDragging() {
      isDragging = false;
    }
    
    function drag(e) {
      if (!isDragging) return;
      
      const sliderRect = slider.getBoundingClientRect();
      let x;
      
      if (e.type.includes('touch')) {
        x = e.touches[0].clientX - sliderRect.left;
      } else {
        x = e.clientX - sliderRect.left;
      }
      
      // Constrain x within slider bounds
      x = Math.max(0, Math.min(x, sliderRect.width));
      
      const percentage = (x / sliderRect.width) * 100;
      
      afterImage.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
      button.style.left = `${percentage}%`;
    }
  });
}

// ============================================================================
// NEWSLETTER FORM VALIDATION
// ============================================================================

function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      
      if (!emailInput || !submitBtn) return;
      
      const email = emailInput.value.trim();
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        showFormMessage(form, 'Please enter a valid email address', 'error');
        emailInput.classList.add('border-red-500');
        return;
      }
      
      // Simulate form submission
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';
      
      setTimeout(() => {
        showFormMessage(form, 'Thank you for subscribing!', 'success');
        emailInput.value = '';
        emailInput.classList.remove('border-red-500');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
      }, 1500);
    });
  });
}

function showFormMessage(form, message, type) {
  // Remove existing message
  const existingMessage = form.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageEl = document.createElement('div');
  messageEl.className = `form-message mt-3 text-sm ${type === 'error' ? 'text-red-600' : 'text-green-600'}`;
  messageEl.textContent = message;
  
  form.appendChild(messageEl);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    messageEl.remove();
  }, 5000);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Smooth scroll to element
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format date
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

// Generate random ID
function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================================
// EXPORTS (for use in other modules)
// ============================================================================

window.APP = {
  scrollToElement,
  debounce,
  formatDate,
  generateId
};

console.log('✨ Historic Restoration Website - Initialized');
