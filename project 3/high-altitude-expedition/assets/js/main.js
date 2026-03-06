/* ─── Apex Ascent Expeditions — Main JS ─── */

(function () {
  'use strict';

  // ─── Theme Toggle ───
  const html = document.documentElement;
  const themeToggles = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');

  function getStoredTheme() { try { return localStorage.getItem('apex-theme'); } catch { return null; } }
  function getSystemTheme() { return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }

  function applyTheme(theme) {
    const sunIcons = document.querySelectorAll('#icon-sun, #mobile-icon-sun');
    const moonIcons = document.querySelectorAll('#icon-moon, #mobile-icon-moon');
    if (theme === 'dark') {
      html.classList.add('dark');
      sunIcons.forEach(el => el.classList.remove('hidden'));
      moonIcons.forEach(el => el.classList.add('hidden'));
      themeToggles.forEach(toggle => toggle.setAttribute('aria-label', 'Switch to light mode'));
    } else {
      html.classList.remove('dark');
      sunIcons.forEach(el => el.classList.add('hidden'));
      moonIcons.forEach(el => el.classList.remove('hidden'));
      themeToggles.forEach(toggle => toggle.setAttribute('aria-label', 'Switch to dark mode'));
    }
  }

  if (themeToggles.length > 0) {
    const stored = getStoredTheme();
    applyTheme(stored || getSystemTheme());
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const isDark = html.classList.contains('dark');
        const next = isDark ? 'light' : 'dark';
        try { localStorage.setItem('apex-theme', next); } catch { }
        applyTheme(next);
      });
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!getStoredTheme()) applyTheme(e.matches ? 'dark' : 'light');
  });

  // ─── RTL Toggle ───
  const rtlToggles = document.querySelectorAll('#rtl-toggle, #mobile-rtl-toggle');
  if (rtlToggles.length > 0) {
    rtlToggles.forEach(rtlToggle => {
      rtlToggle.addEventListener('click', () => {
        const isRTL = html.getAttribute('dir') === 'rtl';
        if (isRTL) {
          html.removeAttribute('dir');
          rtlToggles.forEach(t => t.textContent = 'RTL');
        } else {
          html.setAttribute('dir', 'rtl');
          rtlToggles.forEach(t => t.textContent = 'LTR');
        }
      });
    });
  }

  // ─── Mobile Menu ───
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    const lines = hamburger.querySelectorAll('.hamburger-line');
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
      if (open) {
        if (lines[0]) lines[0].style.transform = 'translateY(8px) rotate(45deg)';
        if (lines[1]) lines[1].style.opacity = '0';
        if (lines[2]) lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        lines.forEach(l => { l.style.transform = ''; l.style.opacity = ''; });
      }
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        lines.forEach(l => { l.style.transform = ''; l.style.opacity = ''; });
      });
    });
  }

  // ─── Navbar Scroll Shadow ───
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.1)' : '';
    }, { passive: true });
  }

  // ─── Scroll Reveal ───
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ─── Cost Bar Animation ───
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const w = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.cost-bar').forEach(b => barObserver.observe(b));

  // ─── Form Validation (Contact/Application) ───
  const form = document.getElementById('application-form');
  const successEl = document.getElementById('form-success');

  function showError(fieldId, errorId, show) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (!field || !error) return;
    if (show) {
      field.classList.add('error'); error.classList.add('visible');
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.classList.remove('error'); error.classList.remove('visible');
      field.setAttribute('aria-invalid', 'false');
    }
  }
  function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  if (form) {
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const msgEl = document.getElementById('message');
    const counter = document.getElementById('message-count');

    if (nameEl) nameEl.addEventListener('blur', function () { showError('name', 'name-error', this.value.trim().length < 2); });
    if (emailEl) emailEl.addEventListener('blur', function () { showError('email', 'email-error', !validateEmail(this.value.trim())); });
    if (msgEl && counter) {
      msgEl.addEventListener('input', function () {
        const len = this.value.length;
        counter.textContent = `${len} / 50 min`;
        counter.style.color = len >= 50 ? 'var(--accent)' : 'var(--text-sec)';
      });
      msgEl.addEventListener('blur', function () { showError('message', 'message-error', this.value.trim().length < 50); });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      const name = nameEl ? nameEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const message = msgEl ? msgEl.value.trim() : '';

      if (name.length < 2) { showError('name', 'name-error', true); valid = false; } else showError('name', 'name-error', false);
      if (!validateEmail(email)) { showError('email', 'email-error', true); valid = false; } else showError('email', 'email-error', false);
      if (message.length < 50) { showError('message', 'message-error', true); valid = false; } else showError('message', 'message-error', false);

      const consentEl = document.getElementById('consent');
      const consentErr = document.getElementById('consent-error');
      if (consentEl && !consentEl.checked) {
        if (consentErr) consentErr.classList.add('visible');
        valid = false;
      } else if (consentErr) consentErr.classList.remove('visible');

      if (!valid) { const first = form.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return; }

      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Submitting…'; btn.style.opacity = '0.7'; }
      setTimeout(() => {
        form.style.display = 'none';
        if (successEl) { successEl.classList.add('visible'); successEl.focus(); }
      }, 1200);
    });
  }

  // ─── Counter Animation ───
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString() + (el.getAttribute('data-suffix') || '');
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  // ─── Smooth scroll ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ─── Tab switcher ───
  document.querySelectorAll('[data-tab-trigger]').forEach(btn => {
    btn.addEventListener('click', function () {
      const group = this.getAttribute('data-tab-group');
      const tab = this.getAttribute('data-tab-trigger');
      document.querySelectorAll(`[data-tab-group="${group}"] [data-tab-trigger]`).forEach(b => b.classList.remove('active-tab'));
      document.querySelectorAll(`[data-tab-content][data-tab-group="${group}"]`).forEach(c => c.classList.add('hidden'));
      this.classList.add('active-tab');
      const content = document.querySelector(`[data-tab-content="${tab}"][data-tab-group="${group}"]`);
      if (content) content.classList.remove('hidden');
    });
  });

  // ─── Accordion ───
  document.querySelectorAll('[data-accordion-trigger]').forEach(btn => {
    btn.addEventListener('click', function () {
      const content = document.getElementById(this.getAttribute('data-accordion-trigger'));
      const icon = this.querySelector('.accordion-icon');
      const isOpen = !content.classList.contains('hidden');
      content.classList.toggle('hidden');
      if (icon) icon.style.transform = isOpen ? '' : 'rotate(45deg)';
    });
  });

})();
