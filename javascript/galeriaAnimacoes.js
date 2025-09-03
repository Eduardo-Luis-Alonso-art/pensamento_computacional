const galeriaImages = document.querySelectorAll('.ano-container.ativo img');

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('active', entry.intersectionRatio >= 0.3);
    });
}, {
    threshold: [0, 0.3],
    rootMargin: '0px 0px -10% 0px'
});

galeriaImages.forEach(img => galleryObserver.observe(img));