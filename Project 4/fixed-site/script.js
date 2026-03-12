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

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

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
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Gallery Filtering ─────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
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
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      uploadZone.addEventListener(evt, (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '';
      });
    });

    uploadZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length) {
        uploadZone.querySelector('p').textContent = `✓ ${files[0].name} ready to upload`;
      }
    });

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
  const dashLinks = document.querySelectorAll('.dash-nav-link[data-panel]');
  const dashPanels = document.querySelectorAll('.dash-panel');

  if (dashLinks.length && dashPanels.length) {
    const showPanel = (panelId) => {
      dashLinks.forEach(l => l.classList.remove('active'));
      dashPanels.forEach(panel => {
        if (panel.id === panelId) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
      const activeLink = document.querySelector(`.dash-nav-link[data-panel="${panelId}"]`);
      if (activeLink) activeLink.classList.add('active');
    };

    dashLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.panel;
        if (!target) return;
        showPanel(target);

        // On mobile, close sidebar after clicking
        const sidebar = document.getElementById('dashSidebar');
        const overlay = document.getElementById('dashOverlay');
        const toggle = document.getElementById('dashToggle');
        if (sidebar && window.innerWidth < 768) {
          sidebar.classList.remove('active');
          if (overlay) { overlay.classList.remove('active'); overlay.classList.add('hidden'); }
          if (toggle) toggle.classList.remove('open');
          document.body.classList.remove('menu-open');
        }
      });
    });

    // Make overview submit button work
    const overviewSubmitBtn = document.querySelector('[onclick*="panel-submit"]');
    if (overviewSubmitBtn) {
      overviewSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPanel('panel-submit');
      });
      overviewSubmitBtn.removeAttribute('onclick');
    }

    // My Layouts "New Layout" button
    const layoutsNewBtn = document.querySelector('#panel-layouts [onclick*="panel-submit"]');
    if (layoutsNewBtn) {
      layoutsNewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPanel('panel-submit');
      });
      layoutsNewBtn.removeAttribute('onclick');
    }
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
(function() {
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
        return null;
      }
    }

    storeTheme(theme) {
      try { localStorage.setItem('ironrail-theme', theme); } catch (e) {}
    }

    applyTheme(theme) {
      document.body.classList.add('theme-transitioning');
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${theme}`);
      this.updateThemeIcons(theme);
      this.currentTheme = theme;
      setTimeout(() => { document.body.classList.remove('theme-transitioning'); }, 300);
    }

    updateThemeIcons(theme) {
      document.querySelectorAll('.theme-icon').forEach(icon => {
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

  try { new ThemeController(); } catch(e) { console.warn('Theme controller error', e); }
})();

/* ── RTL Controller ──────────────────────────────────── */
(function() {
  class RTLController {
    constructor() {
      this.currentDir = this.getStoredDir() || 'ltr';
      this.init();
    }

    init() {
      this.applyDir(this.currentDir);
      this.bindEvents();
    }

    getStoredDir() {
      try {
        const stored = localStorage.getItem('ironrail-dir');
        return stored && ['ltr', 'rtl'].includes(stored) ? stored : null;
      } catch (e) {
        return null;
      }
    }

    storeDir(dir) {
      try { localStorage.setItem('ironrail-dir', dir); } catch (e) {}
    }

    applyDir(dir) {
      document.documentElement.setAttribute('dir', dir);
      this.updateRTLLinks(dir);
      this.currentDir = dir;
    }

    updateRTLLinks(dir) {
      document.querySelectorAll('.rtl-toggle span').forEach(span => {
        span.textContent = dir === 'ltr' ? 'RTL' : 'LTR';
      });
    }

    toggleDir() {
      const newDir = this.currentDir === 'ltr' ? 'rtl' : 'ltr';
      this.applyDir(newDir);
      this.storeDir(newDir);
    }

    bindEvents() {
      document.addEventListener('click', (e) => {
        if (e.target.closest('.rtl-toggle')) {
          e.preventDefault();
          this.toggleDir();
        }
      });
    }
  }

  try { new RTLController(); } catch(e) { console.warn('RTL controller error', e); }
})();

/* ── Dashboard Sidebar Toggle ────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const dashToggle = document.getElementById('dashToggle');
  const dashSidebar = document.getElementById('dashSidebar');
  const dashOverlay = document.getElementById('dashOverlay');
  const dashClose = document.getElementById('dashClose');

  if (dashSidebar) {
    const toggleSidebar = () => {
      dashSidebar.classList.toggle('active');
      if (dashToggle) dashToggle.classList.toggle('open');
      if (dashOverlay) {
        const isActive = dashSidebar.classList.contains('active');
        dashOverlay.classList.toggle('active', isActive);
        dashOverlay.classList.toggle('hidden', !isActive);
      }
      document.body.classList.toggle('menu-open');
    };

    if (dashToggle) dashToggle.addEventListener('click', toggleSidebar);
    if (dashClose) dashClose.addEventListener('click', toggleSidebar);
    if (dashOverlay) dashOverlay.addEventListener('click', toggleSidebar);
  }
});
