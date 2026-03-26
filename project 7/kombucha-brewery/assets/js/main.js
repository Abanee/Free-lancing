document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const themeBtn = document.getElementById('theme-toggle');
    const rtlBtn = document.getElementById('rtl-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ==========================================
    // THEME TOGGLE (Class-based, no stylesheet swap)
    // ==========================================
    const applyTheme = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        if (themeBtn) {
            themeBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
        }
    };

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = !document.body.classList.contains('dark-mode');
            applyTheme(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ==========================================
    // RTL TOGGLE
    // ==========================================
    const applyDir = (dir) => {
        document.documentElement.dir = dir;
        if (rtlBtn) {
            rtlBtn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
        }
    };

    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentDir = document.documentElement.dir || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            applyDir(newDir);
            localStorage.setItem('direction', newDir);
        });
    }

    // ==========================================
    // RESTORE SAVED SETTINGS ON LOAD
    // ==========================================
    if (localStorage.getItem('theme') === 'dark') {
        applyTheme(true);
    }
    if (localStorage.getItem('direction') === 'rtl') {
        applyDir('rtl');
    }

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all (optional – set to true for single-open behavior)
            faqItems.forEach(i => {
                i.classList.remove('open');
                const q = i.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });

            // Open clicked (if it was closed)
            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ==========================================
    // FILTER BUTTONS (Flavors page)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Full filter logic would require data attributes on cards
            // This handles the visual active state
        });
    });

    // ==========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    const scrollElements = document.querySelectorAll('.up-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12 });

        scrollElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        scrollElements.forEach(el => el.classList.add('visible'));
    }
});
