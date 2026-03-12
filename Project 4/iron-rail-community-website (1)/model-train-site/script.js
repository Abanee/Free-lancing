/* ============================================================
   IRON RAIL COMMUNITY — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Hamburger Menu ─────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
      const expanded = hamburger.classList.contains('open');
      hamburger.setAttribute('aria-expanded', expanded);
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Active Nav Link ───────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ── Gallery Filtering ─────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
          if (filter === 'all') {
            item.style.display = '';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
          } else {
            const matches = item.dataset.scale === filter
              || item.dataset.era === filter
              || item.dataset.manufacturer === filter;

            if (matches) {
              item.style.display = '';
              setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.95)';
              setTimeout(() => { item.style.display = 'none'; }, 250);
            }
          }
        });
      });
    });

    // Smooth transitions on gallery items
    galleryItems.forEach(item => {
      item.style.transition = 'opacity 0.25s, transform 0.25s';
    });
  }

  /* ── Dashboard Submit Form ─────────────────────────────── */
  const layoutForm = document.getElementById('layout-submit-form');
  const successBanner = document.getElementById('form-success');

  if (layoutForm) {
    layoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const title = layoutForm.querySelector('#layout-title');
      const scale = layoutForm.querySelector('#layout-scale');
      let valid = true;

      [title, scale].forEach(field => {
        if (!field || !field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Simulate upload
      const submitBtn = layoutForm.querySelector('[type="submit"]');
      submitBtn.textContent = 'Submitting…';
      submitBtn.disabled = true;

      setTimeout(() => {
        layoutForm.reset();
        submitBtn.textContent = 'Submit Layout';
        submitBtn.disabled = false;
        if (successBanner) {
          successBanner.classList.remove('hidden');
          setTimeout(() => successBanner.classList.add('hidden'), 5000);
        }
      }, 1500);
    });
  }

  /* ── Upload Zone Drag & Drop Visual ───────────────────── */
  const uploadZone = document.querySelector('.upload-zone');
  if (uploadZone) {
    ['dragenter', 'dragover'].forEach(evt => {
      uploadZone.addEventListener(evt, (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--pullman-green)';
        uploadZone.style.background = '#f0fdf4';
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      uploadZone.addEventListener(evt, (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '';
        uploadZone.style.background = '';
      });
    });

    uploadZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length) {
        uploadZone.querySelector('p').textContent = `✓ ${files[0].name} ready to upload`;
      }
    });

    // Click to trigger file input
    uploadZone.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = () => {
        if (input.files.length) {
          uploadZone.querySelector('p').textContent = `✓ ${input.files[0].name} ready to upload`;
        }
      };
      input.click();
    });
  }

  /* ── Scroll Reveal Animation ───────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Dashboard Tab Navigation ──────────────────────────── */
  const dashLinks = document.querySelectorAll('.dash-nav-link');
  const dashPanels = document.querySelectorAll('.dash-panel');

  if (dashLinks.length && dashPanels.length) {
    dashLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        dashLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const target = link.dataset.panel;
        dashPanels.forEach(panel => {
          panel.classList.toggle('hidden', panel.id !== target);
        });
      });
    });
  }

  /* ── Counter Animation ─────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;

          const tick = () => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString();
            if (current < target) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

});

  /* ── Theme Controller ──────────────────────────────────── */
  class ThemeController {
    constructor() {
      this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
      this.init();
    }

    init() {
      this.applyTheme(this.currentTheme);
      this.bindEvents();
    }

    getSystemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
      try {
        const stored = localStorage.getItem('ironrail-theme');
        return stored && ['light', 'dark'].includes(stored) ? stored : null;
      } catch (e) {
        console.warn('localStorage unavailable, using system theme');
        return null;
      }
    }

    storeTheme(theme) {
      try {
        localStorage.setItem('ironrail-theme', theme);
        localStorage.setItem('ironrail-theme-timestamp', Date.now().toString());
      } catch (e) {
        console.warn('Could not store theme preference');
      }
    }

    applyTheme(theme) {
      // Add transition class for smooth theme switching
      document.body.classList.add('theme-transitioning');
      
      // Remove existing theme classes
      document.body.className = document.body.className.replace(/theme-\w+/g, '');
      document.body.classList.add(`theme-${theme}`);
      
      this.updateThemeIcons(theme);
      this.currentTheme = theme;
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 300);
    }

    updateThemeIcons(theme) {
      const icons = document.querySelectorAll('.theme-icon');
      icons.forEach(icon => {
        icon.textContent = theme === 'light' ? '🌙' : '☀️';
      });
    }

    toggleTheme() {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme(newTheme);
      this.storeTheme(newTheme);
    }

    bindEvents() {
      document.addEventListener('click', (e) => {
        if (e.target.closest('.theme-toggle')) {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
  }

  /* ── Direction Controller ──────────────────────────────── */
  class DirectionController {
    constructor() {
      this.currentDirection = this.getStoredDirection() || 'ltr';
      this.init();
    }

    init() {
      this.applyDirection(this.currentDirection);
      this.bindEvents();
    }

    getStoredDirection() {
      try {
        const stored = localStorage.getItem('ironrail-direction');
        return stored && ['ltr', 'rtl'].includes(stored) ? stored : null;
      } catch (e) {
        console.warn('localStorage unavailable, using LTR');
        return null;
      }
    }

    storeDirection(direction) {
      try {
        localStorage.setItem('ironrail-direction', direction);
        localStorage.setItem('ironrail-direction-timestamp', Date.now().toString());
      } catch (e) {
        console.warn('Could not store direction preference');
      }
    }

    applyDirection(direction) {
      document.documentElement.setAttribute('dir', direction);
      this.updateDirectionText(direction);
      this.currentDirection = direction;
      
      // Trigger layout recalculation for proper RTL rendering
      document.body.style.display = 'none';
      document.body.offsetHeight; // Force reflow
      document.body.style.display = '';
    }

    updateDirectionText(direction) {
      const texts = document.querySelectorAll('.direction-text');
      texts.forEach(text => {
        text.textContent = direction.toUpperCase();
      });
    }

    toggleDirection() {
      const newDirection = this.currentDirection === 'ltr' ? 'rtl' : 'ltr';
      this.applyDirection(newDirection);
      this.storeDirection(newDirection);
    }

    bindEvents() {
      document.addEventListener('click', (e) => {
        if (e.target.closest('.direction-toggle')) {
          e.preventDefault();
          this.toggleDirection();
        }
      });
    }
  }

  /* ── Initialize Controllers ────────────────────────────── */
  try {
    const themeController = new ThemeController();
    const directionController = new DirectionController();
  } catch (error) {
    console.warn('Failed to initialize theme/direction controllers:', error);
    
    // Fallback: Basic theme toggle without localStorage
    document.addEventListener('click', (e) => {
      if (e.target.closest('.theme-toggle')) {
        e.preventDefault();
        const isDark = document.body.classList.contains('theme-dark');
        document.body.classList.toggle('theme-dark', !isDark);
        document.body.classList.toggle('theme-light', isDark);
        
        // Update icons
        document.querySelectorAll('.theme-icon').forEach(icon => {
          icon.textContent = isDark ? '🌙' : '☀️';
        });
      }
      
      if (e.target.closest('.direction-toggle')) {
        e.preventDefault();
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        document.documentElement.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
        
        // Update text
        document.querySelectorAll('.direction-text').forEach(text => {
          text.textContent = isRTL ? 'LTR' : 'RTL';
        });
      }
    });
  }