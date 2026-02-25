// ============================================
// ProtoWorks - Main JavaScript
// ============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
  initPreloader();
  initThemeToggle();
  initMobileMenu();
  initScrollAnimations();
  initFormValidation();
  detectSystemTheme();
  initEliteCarousel();
  initGlassNavbar();
  initLogout();
});

// ============================================
// Preloader Handler
// ============================================
function initPreloader() {
  // Create Preloader Element
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = `
    <div class="loader-content">
      <svg class="loader-svg" viewBox="0 0 100 100">
        <!-- Bed Background -->
        <rect x="20" y="20" width="60" height="60" rx="4" fill="var(--color-border)" opacity="0.2"/>
        
        <!-- Thread being printed -->
        <path class="printed-thread" d="M30 30 H70 V70 H30 V30" />
        
        <!-- Printer Nozzle (Dynamic Group) -->
        <g class="printer-nozzle">
          <rect x="25" y="10" width="10" height="20" rx="2" />
          <path d="M25 30 L30 38 L35 30 Z" />
          <circle cx="30" cy="38" r="1.5" fill="var(--color-secondary)" />
        </g>
      </svg>
      <div class="loader-text">Initializing Lab...</div>
    </div>
  `;

  document.body.prepend(preloader);

  // Lock scroll during loading
  document.body.style.overflow = 'hidden';

  // Minimum duration of 1 second
  setTimeout(() => {
    preloader.classList.add('fade-out');
    document.body.style.overflow = '';

    // Remove from DOM after fade animation
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 1000);
}

// ============================================
// Theme Toggle
// ============================================
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Detect system theme preference
function detectSystemTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// Listen for system theme changes
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', function () {
    const isActive = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking a link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ============================================
// Elite Hero Carousel
// ============================================
function initEliteCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  setInterval(nextSlide, slideInterval);
}

// ============================================
// Glass Navbar Scroll Effect
// ============================================
function initGlassNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============================================
// Form Validation
// ============================================
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const inputs = form.querySelectorAll('[required]');

      inputs.forEach(input => {
        const errorEl = input.parentElement.querySelector('.form-error');

        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--color-destructive)';
          if (errorEl) errorEl.style.display = 'block';
        } else {
          input.style.borderColor = 'var(--color-border)';
          if (errorEl) errorEl.style.display = 'none';
        }

        // Email validation
        if (input.type === 'email' && input.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            isValid = false;
            input.style.borderColor = 'var(--color-destructive)';
            if (errorEl) {
              errorEl.textContent = 'Please enter a valid email address';
              errorEl.style.display = 'block';
            }
          }
        }
      });

      if (isValid) {
        const action = form.getAttribute('action');
        if (action && action !== '#') {
          // If valid and has action, redirect
          window.location.href = action;
        } else {
          // Default behavior
          alert('Form submitted successfully!');
          form.reset();
        }
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', function () {
        const errorEl = input.parentElement.querySelector('.form-error');

        if (!input.value.trim()) {
          input.style.borderColor = 'var(--color-destructive)';
          if (errorEl) errorEl.style.display = 'block';
        } else {
          input.style.borderColor = 'var(--color-border)';
          if (errorEl) errorEl.style.display = 'none';
        }
      });
    });
  });
}

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============================================
// Utility Functions
// ============================================

// ============================================
// Logout Handler
// ============================================
function initLogout() {
  const logoutBtns = document.querySelectorAll('.logout-btn, [href*="logout"]');
  if (logoutBtns.length === 0) return;

  logoutBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showLogoutModal();
    });
  });
}

function showLogoutModal() {
  // Create Modal Overlay
  const modal = document.createElement('div');
  modal.className = 'custom-modal-overlay';
  modal.innerHTML = `
    <div class="custom-modal logout-modal animate-on-scroll" style="opacity: 1; transform: translateY(0);">
      <div class="modal-header">
        <h3 class="modal-title">Logout Confirmation</h3>
      </div>
      <div class="modal-body">
        <p>Where would you like to go after logging out?</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline modal-btn" id="logout-home">Home Page</button>
        <button class="btn btn-primary modal-btn" id="logout-login">Login Page</button>
        <button class="btn btn-text modal-btn" id="logout-cancel">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Modal Actions
  document.getElementById('logout-home').addEventListener('click', () => {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/documentation/') ? '../index.html' : 'index.html';
  });

  document.getElementById('logout-login').addEventListener('click', () => {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/documentation/') ? 'login.html' : 'pages/login.html';
  });

  document.getElementById('logout-cancel').addEventListener('click', () => {
    modal.classList.add('fade-out');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  });
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Format date
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
}

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-border);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add CSS animations
const eliteStyle = document.createElement('style');
eliteStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  /* Custom Modal Styles */
  .custom-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  }

  .custom-modal {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .modal-title {
    margin: 0 0 1rem 0;
    color: var(--color-text-primary);
  }

  .modal-body {
    margin-bottom: 2rem;
    color: var(--color-text-secondary);
  }

  .modal-footer {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .modal-btn {
    width: 100%;
  }

  .btn-text {
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    padding: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .btn-text:hover {
    color: var(--color-text-primary);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .fade-out {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;
document.head.appendChild(eliteStyle);