/* ============================================================
   ADVENTURE FILM & PHOTOGRAPHY COLLECTIVE
   Main JavaScript — main.js
   Modular, Production-Ready
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     THEME MANAGER
     ============================================================ */
  const ThemeManager = {
    STORAGE_KEY: 'afpc-theme',

    init() {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const theme = saved || preferred;
      this.apply(theme, false);

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.apply(e.matches ? 'dark' : 'light', true);
        }
      });

      document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
    },

    apply(theme, animate = true) {
      if (animate) {
        document.body.classList.add('theme-transitioning');
        setTimeout(() => document.body.classList.remove('theme-transitioning'), 500);
      }
      document.documentElement.setAttribute('data-theme', theme);
    },

    toggle() {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(this.STORAGE_KEY, next);
      this.apply(next, true);
    }
  };

  /* ============================================================
     RTL MANAGER
     ============================================================ */
  const RTLManager = {
    STORAGE_KEY: 'afpc-rtl',

    init() {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved === 'rtl') {
        this.apply('rtl');
      }

      document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
    },

    apply(dir) {
      document.documentElement.setAttribute('dir', dir);
      const text = dir === 'rtl' ? 'RTL' : 'LTR';
      document.querySelectorAll('[data-rtl-toggle] .rtl-toggle-text').forEach(el => {
        el.textContent = text;
      });
    },

    toggle() {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      localStorage.setItem(this.STORAGE_KEY, next);
      this.apply(next);
    }
  };

  /* ============================================================
     NAVIGATION MANAGER
     ============================================================ */
  const NavManager = {
    navbar: null,
    hamburger: null,
    mobileNav: null,
    overlay: null,
    isHeroPage: false,

    init() {
      this.navbar = document.querySelector('.navbar');
      this.hamburger = document.querySelector('.hamburger');
      this.mobileNav = document.querySelector('.mobile-nav');
      this.overlay = document.querySelector('.mobile-nav-overlay');

      if (!this.navbar) return;

      this.isHeroPage = !!document.querySelector('.hero');
      this.handleScroll();
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

      if (this.hamburger) {
        this.hamburger.addEventListener('click', () => this.toggleMobile());
      }

      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.closeMobile());
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeMobile();
      });

      this.setActiveLink();
    },

    handleScroll() {
      const scrolled = window.scrollY > 60;
      this.navbar.classList.toggle('scrolled', scrolled);

      if (this.isHeroPage) {
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;
        this.navbar.classList.toggle('hero-active', window.scrollY < heroHeight - 100);
      }
    },

    toggleMobile() {
      const isOpen = this.mobileNav?.classList.contains('open');
      if (isOpen) this.closeMobile();
      else this.openMobile();
    },

    openMobile() {
      this.mobileNav?.classList.add('open');
      this.overlay?.classList.add('active');
      this.hamburger?.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    closeMobile() {
      this.mobileNav?.classList.remove('open');
      this.overlay?.classList.remove('active');
      this.hamburger?.classList.remove('active');
      document.body.style.overflow = '';
    },

    setActiveLink() {
      const path = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const href = link.getAttribute('href')?.split('/').pop() || '';
        if (href === path || (path === '' && href === 'index.html')) {
          link.classList.add('active');
        }
      });
    }
  };

  /* ============================================================
     SCROLL REVEAL MANAGER
     ============================================================ */
  const ScrollReveal = {
    init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => {
        observer.observe(el);
      });
    }
  };

  /* ============================================================
     PARALLAX HERO
     ============================================================ */
  const HeroParallax = {
    hero: null,
    heroBg: null,

    init() {
      this.hero = document.querySelector('.hero');
      this.heroBg = document.querySelector('.hero-image');
      if (!this.hero || !this.heroBg) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      window.addEventListener('scroll', () => this.update(), { passive: true });
    },

    update() {
      const scrolled = window.scrollY;
      if (scrolled > window.innerHeight) return;
      const parallaxVal = scrolled * 0.35;
      this.heroBg.style.transform = `translateY(${parallaxVal}px)`;
    }
  };

  /* ============================================================
     COUNTER ANIMATION
     ============================================================ */
  const CounterAnimation = {
    init() {
      const counters = document.querySelectorAll('[data-count]');
      if (!counters.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(el) {
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 1800;
      const isDecimal = target % 1 !== 0;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;
        el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    }
  };

  /* ============================================================
     CURSOR GLOW
     ============================================================ */
  const CursorGlow = {
    glow: null,

    init() {
      this.glow = document.querySelector('.cursor-glow');
      if (!this.glow) return;
      if (window.matchMedia('(pointer: coarse)').matches) {
        this.glow.style.display = 'none';
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.glow.style.display = 'none';
        return;
      }

      document.addEventListener('mousemove', (e) => {
        this.glow.style.left = e.clientX + 'px';
        this.glow.style.top = e.clientY + 'px';
      }, { passive: true });
    }
  };

  /* ============================================================
     GALLERY FILTERS
     ============================================================ */
  const GalleryFilter = {
    init() {
      const filterBtns = document.querySelectorAll('.filter-btn');
      const cards = document.querySelectorAll('[data-category]');
      if (!filterBtns.length) return;

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');

          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
              card.style.display = '';
              card.style.opacity = '0';
              card.style.transform = 'translateY(16px)';
              requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            } else {
              card.style.transition = 'opacity 0.3s ease';
              card.style.opacity = '0';
              setTimeout(() => { card.style.display = 'none'; }, 300);
            }
          });
        });
      });
    }
  };

  /* ============================================================
     LIGHTBOX
     ============================================================ */
  const Lightbox = {
    lightbox: null,
    lightboxImg: null,

    init() {
      this.lightbox = document.querySelector('.lightbox');
      this.lightboxImg = document.querySelector('.lightbox-img');
      if (!this.lightbox) return;

      document.querySelectorAll('[data-lightbox]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          const src = trigger.getAttribute('data-lightbox') ||
            trigger.querySelector('img')?.src;
          if (src) this.open(src);
        });
      });

      this.lightbox.querySelector('.lightbox-close')?.addEventListener('click', () => this.close());

      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.close();
      });
    },

    open(src) {
      if (this.lightboxImg) this.lightboxImg.src = src;
      this.lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.lightbox.classList.remove('open');
      document.body.style.overflow = '';
      if (this.lightboxImg) setTimeout(() => { this.lightboxImg.src = ''; }, 300);
    }
  };

  /* ============================================================
     GALLERY STRIP EXPAND
     ============================================================ */
  const GalleryStrip = {
    init() {
      // Already handled via CSS :hover. This is for touch support
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('touchstart', function () {
          document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('touch-active'));
          this.classList.add('touch-active');
        }, { passive: true });
      });
    }
  };

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        });
      });
    }
  };

  /* ============================================================
     FORM HANDLING
     ============================================================ */
  const FormHandler = {
    init() {
      document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleSubmit(form);
        });
      });

      // Upload area
      const uploadArea = document.querySelector('.upload-area');
      if (uploadArea) {
        const fileInput = uploadArea.querySelector('input[type="file"]');
        uploadArea.addEventListener('click', () => fileInput?.click());
        uploadArea.addEventListener('dragover', (e) => {
          e.preventDefault();
          uploadArea.style.borderColor = 'var(--accent1)';
        });
        uploadArea.addEventListener('dragleave', () => {
          uploadArea.style.borderColor = '';
        });
        uploadArea.addEventListener('drop', (e) => {
          e.preventDefault();
          uploadArea.style.borderColor = '';
          const files = e.dataTransfer.files;
          if (files.length && fileInput) {
            fileInput.files = files;
            uploadArea.querySelector('.upload-filename').textContent = files[0].name;
          }
        });
        if (fileInput) {
          fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
              uploadArea.querySelector('.upload-filename').textContent = fileInput.files[0].name;
            }
          });
        }
      }
    },

    handleSubmit(form) {
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn?.innerHTML;

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83">
              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
            </path>
          </svg>
          Sending...
        `;
      }

      setTimeout(() => {
        if (btn) {
          btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 13 4 4L19 7"/>
            </svg>
            Message Sent!
          `;
          btn.style.background = '#16a34a';
          btn.style.borderColor = '#16a34a';
        }
        form.reset();
        const fileDisplay = form.querySelector('.upload-filename');
        if (fileDisplay) fileDisplay.textContent = 'No file chosen';
      }, 1800);
    }
  };

  /* ============================================================
     VIDEO PLAY ON HOVER
     ============================================================ */
  const VideoCards = {
    init() {
      document.querySelectorAll('.video-card').forEach(card => {
        const video = card.querySelector('video');
        if (!video) return;

        card.addEventListener('mouseenter', () => {
          video.play().catch(() => {});
        });

        card.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      });
    }
  };

  /* ============================================================
     STAGGER CHILDREN ANIMATION
     ============================================================ */
  const StaggerChildren = {
    init() {
      document.querySelectorAll('[data-stagger]').forEach(parent => {
        const delay = parseFloat(parent.getAttribute('data-stagger')) || 0.1;
        parent.querySelectorAll(':scope > *').forEach((child, i) => {
          child.classList.add('reveal');
          child.style.transitionDelay = `${i * delay}s`;
        });
      });
    }
  };

  /* ============================================================
     TESTIMONIAL MARQUEE (mobile)
     ============================================================ */
  const TestimonialMarquee = {
    init() {
      const track = document.querySelector('.testimonial-track');
      if (!track) return;
      // Clone items for infinite scroll
      const clone = track.innerHTML;
      track.innerHTML += clone;
    }
  };

  /* ============================================================
     BLOG FILTERS
     ============================================================ */
  const BlogFilter = {
    init() {
      const filterBtns = document.querySelectorAll('.blog-filter-btn');
      const posts = document.querySelectorAll('.blog-post-item');
      if (!filterBtns.length) return;

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          posts.forEach(post => {
            if (filter === 'all' || post.getAttribute('data-cat') === filter) {
              post.style.display = '';
            } else {
              post.style.display = 'none';
            }
          });
        });
      });
    }
  };

  /* ============================================================
     INIT ALL
     ============================================================ */
  function init() {
    ThemeManager.init();
    RTLManager.init();
    NavManager.init();
    ScrollReveal.init();
    HeroParallax.init();
    CounterAnimation.init();
    CursorGlow.init();
    GalleryFilter.init();
    Lightbox.init();
    GalleryStrip.init();
    SmoothScroll.init();
    FormHandler.init();
    VideoCards.init();
    StaggerChildren.init();
    BlogFilter.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for inline use
  window.AFPC = { ThemeManager, NavManager };

})();
