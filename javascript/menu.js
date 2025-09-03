document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMobile = document.querySelector('.nav-mobile');
    const closeBtn = document.querySelector('.close-btn');
    
    if (!hamburgerBtn || !navMobile || !closeBtn) return;

    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        navMobile.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-open');
        hamburgerBtn.classList.add('active');
    }

    function closeMenu() {
        navMobile.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburgerBtn.classList.remove('active');
    }

    hamburgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    const navLinks = navMobile.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                closeMenu();
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            } else {
                closeMenu();
            }
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMobile.classList.contains('active')) {
            closeMenu();
        }
    });
});