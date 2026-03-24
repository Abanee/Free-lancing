document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const scrollElements = document.querySelectorAll('.up-on-scroll');

    // Scroll effect for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeBtn.textContent = isDark ? 'Light' : 'Dark';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // RTL Toggle
    const rtlBtn = document.getElementById('rtl-toggle');
    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentDir = document.documentElement.dir || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.dir = newDir;
            rtlBtn.textContent = newDir === 'ltr' ? 'RTL' : 'LTR';
            localStorage.setItem('direction', newDir);
        });
    }

    // Restore saved settings
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = 'Light';
    }
    if (localStorage.getItem('direction') === 'rtl') {
        document.documentElement.dir = 'rtl';
        if (rtlBtn) rtlBtn.textContent = 'LTR';
    }

    // Intersection Observer for animations
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial check
    handleScrollAnimation();
});
