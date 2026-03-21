/* ================================================================
   Digital Marketing Studio - Main JavaScript
   Global interactions, animations, and behaviors
   ================================================================ */

'use strict';

// ============================================
// 1. Theme Management
// ============================================

class ThemeManager {
  constructor() {
    this.theme = this.getStoredTheme() || this.getPreferredTheme();
    this.init();
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateToggleIcon();
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  updateToggleIcon() {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;

    const icon = this.theme === 'light' 
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    
    toggleBtn.innerHTML = icon;
  }

  init() {
    this.setTheme(this.theme);
    
    document.addEventListener('DOMContentLoaded', () => {
      const toggleBtn = document.querySelector('.theme-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggleTheme());
      }
    });
  }
}

// ============================================
// 2. RTL Management
// ============================================

class RTLManager {
  constructor() {
    this.direction = this.getStoredDirection() || 'ltr';
    this.init();
  }

  getStoredDirection() {
    return localStorage.getItem('direction');
  }

  setDirection(direction) {
    this.direction = direction;
    document.documentElement.setAttribute('dir', direction);
    localStorage.setItem('direction', direction);
    this.updateToggleIcon();
  }

  toggleDirection() {
    const newDirection = this.direction === 'ltr' ? 'rtl' : 'ltr';
    this.setDirection(newDirection);
  }

  updateToggleIcon() {
    const toggleBtn = document.querySelector('.rtl-toggle');
    if (!toggleBtn) return;

    const icon = this.direction === 'ltr'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 12l6-6M3 12l6 6"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12H3M21 12l-6-6M21 12l-6 6"/></svg>';
    
    toggleBtn.innerHTML = icon;
  }

  init() {
    this.setDirection(this.direction);
    
    document.addEventListener('DOMContentLoaded', () => {
      const toggleBtn = document.querySelector('.rtl-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggleDirection());
      }
    });
  }
}

// ============================================
// 3. Navigation Management
// ============================================

class NavigationManager {
  constructor() {
    this.navbar = null;
    this.mobileMenuToggle = null;
    this.mobileMenu = null;
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.navbar = document.querySelector('.navbar');
      this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      this.mobileMenu = document.querySelector('.mobile-menu');

      this.setupScrollBehavior();
      this.setupMobileMenu();
      this.setupActiveLinks();
    });
  }

  setupScrollBehavior() {
    if (!this.navbar) return;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      this.lastScrollY = currentScrollY;
    });
  }

  setupMobileMenu() {
    if (!this.mobileMenuToggle || !this.mobileMenu) return;

    this.mobileMenuToggle.addEventListener('click', () => {
      this.mobileMenuToggle.classList.toggle('active');
      this.mobileMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (this.mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const mobileLinks = this.mobileMenu.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.mobileMenuToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.mobileMenu.contains(e.target) && 
          !this.mobileMenuToggle.contains(e.target) &&
          this.mobileMenu.classList.contains('active')) {
        this.mobileMenuToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  setupActiveLinks() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link, .mobile-menu-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (href === 'index.html' && currentPath === '')) {
        link.classList.add('active');
      }
    });
  }
}

// ============================================
// 4. Scroll Animations (Intersection Observer)
// ============================================

class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupIntersectionObserver();
    });
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
  }
}

// ============================================
// 5. Counter Animations
// ============================================

class CounterAnimation {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = parseInt(target);
    this.duration = duration;
    this.startTime = null;
    this.hasStarted = false;
  }

  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  animate(currentTime) {
    if (!this.startTime) this.startTime = currentTime;
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    const easedProgress = this.easeOutQuart(progress);
    const currentValue = Math.floor(easedProgress * this.target);
    
    this.element.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame((time) => this.animate(time));
    } else {
      this.element.textContent = this.target.toLocaleString();
    }
  }

  start() {
    if (!this.hasStarted) {
      this.hasStarted = true;
      requestAnimationFrame((time) => this.animate(time));
    }
  }
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = element.getAttribute('data-counter');
        const counter = new CounterAnimation(element, target);
        counter.start();
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// ============================================
// 6. Form Validation
// ============================================

class FormValidator {
  constructor(form) {
    this.form = form;
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const isValid = this.validateForm();
      
      if (isValid) {
        this.handleSuccess();
      }
    });

    // Real-time validation
    const inputs = this.form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('.form-control[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const errorContainer = field.parentElement.querySelector('.form-error');

    // Clear previous errors
    field.classList.remove('error');
    if (errorContainer) {
      errorContainer.textContent = '';
    }

    // Required field check
    if (field.hasAttribute('required') && !value) {
      this.showError(field, 'This field is required');
      return false;
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showError(field, 'Please enter a valid email address');
        return false;
      }
    }

    // Phone validation
    if (field.name === 'phone' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value) || value.length < 10) {
        this.showError(field, 'Please enter a valid phone number');
        return false;
      }
    }

    // Password validation
    if (type === 'password' && value && value.length < 8) {
      this.showError(field, 'Password must be at least 8 characters');
      return false;
    }

    return true;
  }

  showError(field, message) {
    field.classList.add('error');
    let errorContainer = field.parentElement.querySelector('.form-error');
    
    if (!errorContainer) {
      errorContainer = document.createElement('span');
      errorContainer.className = 'form-error';
      errorContainer.setAttribute('role', 'alert');
      field.parentElement.appendChild(errorContainer);
    }
    
    errorContainer.textContent = message;
    field.setAttribute('aria-describedby', errorContainer.id || 'error-' + field.name);
  }

  handleSuccess() {
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'alert alert-success';
    successMsg.style.cssText = 'padding: 1rem; background: var(--color-success); color: white; border-radius: var(--radius-md); margin-bottom: 1rem; animation: fadeInUp 0.3s ease-out;';
    successMsg.textContent = 'Thank you! Your message has been sent successfully.';
    
    this.form.insertBefore(successMsg, this.form.firstChild);
    this.form.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMsg.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => successMsg.remove(), 300);
    }, 5000);
  }
}

// ============================================
// 7. Back to Top Button
// ============================================

class BackToTop {
  constructor() {
    this.button = null;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.button = document.querySelector('.back-to-top');
      if (!this.button) return;

      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          this.button.classList.add('visible');
        } else {
          this.button.classList.remove('visible');
        }
      });

      this.button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
  }
}

// ============================================
// 8. Service Filters (for services.html)
// ============================================

class ServiceFilters {
  constructor() {
    this.filterButtons = null;
    this.serviceCards = null;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.filterButtons = document.querySelectorAll('[data-filter]');
      this.serviceCards = document.querySelectorAll('[data-category]');

      if (this.filterButtons.length === 0) return;

      this.filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.getAttribute('data-filter');
          this.filterServices(filter);
          this.updateActiveButton(button);
        });
      });
    });
  }

  filterServices(filter) {
    this.serviceCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.style.display = '';
        card.classList.add('animate-scale-in');
      } else {
        card.style.display = 'none';
        card.classList.remove('animate-scale-in');
      }
    });
  }

  updateActiveButton(activeButton) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }
}

// ============================================
// 9. Initialize Everything
// ============================================

// Initialize theme and RTL
const themeManager = new ThemeManager();
const rtlManager = new RTLManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navigation = new NavigationManager();
  
  // Scroll animations
  const scrollAnimations = new ScrollAnimations();
  
  // Counter animations
  initCounters();
  
  // Back to top
  const backToTop = new BackToTop();
  
  // Service filters
  const serviceFilters = new ServiceFilters();
  
  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => new FormValidator(form));
});

// ============================================
// 10. Performance Monitoring
// ============================================

// Log page load performance
window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    // Only log in development (remove or add condition for production)
    // console.log(`Page loaded in ${pageLoadTime}ms`);
  }
});
