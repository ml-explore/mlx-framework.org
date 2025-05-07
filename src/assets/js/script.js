document.addEventListener('DOMContentLoaded', () => {
    const logoEl = document.querySelector('body .content .page1 .page-content .logo');
    const claimPage1El = document.querySelector('body .content .page1 .page-content .claim');
    const fadeEls = document.querySelectorAll('body .fade-in');
    const fixedHeader = document.querySelector('body header');
    const page1El = document.querySelector('body .content .page1');
    const deepLinkEls = document.querySelectorAll('[id]');
    const mobileMenuIcon = document.querySelector('body header .mobile-menu-icon');
    const navMenu = document.querySelector('body header .section-content ul');

    [logoEl, claimPage1El].forEach(el => {
        el.style.opacity = 0;
        el.style.visibility = 'hidden';
        el.style.transition = 'opacity 0.5s ease-in-out';
    });

    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);

        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }

    fadeInElement(logoEl, 800);
    fadeInElement(claimPage1El, 1600);
    fadeInOnScroll(fadeEls);

    const threshold = page1El.offsetHeight - 200;

    const headerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                fixedHeader.classList.add('visible');
            } else {
                fixedHeader.classList.remove('visible');
            }
        });
    }, { rootMargin: `-${threshold}px 0px 0px 0px` });

    headerObserver.observe(page1El);

    const deepLinksObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const targetId = entry.target.id ? `#${entry.target.id}` : ''
                history.replaceState(null, null, targetId);
            }
        });
    }, {
        root: null,
        threshold: 0.5,
    });

    deepLinkEls.forEach(section => deepLinksObserver.observe(section));

    mobileMenuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    function fadeInElement(el, delay) {
        setTimeout(() => {
            el.style.visibility = 'visible';
            el.style.opacity = 1;
        }, delay);
    }

    function fadeInOnScroll(elements) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => observer.observe(el));
    }
});
