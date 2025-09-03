document.addEventListener('DOMContentLoaded', function () {
    const lightboxMobile = document.querySelector('.lightbox-mobile');
    const lightboxImgMobile = document.getElementById('lightbox-imagem-mobile');
    const lightboxTituloMobile = document.getElementById('lightbox-titulo-mobile');
    const lightboxDataMobile = document.getElementById('lightbox-data-mobile');
    const closeLightbox = document.querySelector('.fechar-lightbox');
    const fotoItems = document.querySelectorAll('.foto-item');

    function isMobile() {
        return window.innerWidth <= 768;
    }

    fotoItems.forEach(item => {
        item.addEventListener('click', function () {
            if (isMobile()) {
                const img = this.querySelector('img');
                const titulo = this.querySelector('.foto-titulo').textContent;
                const data = this.querySelector('.foto-data').textContent;

                lightboxImgMobile.src = img.src;
                lightboxTituloMobile.textContent = titulo;
                lightboxDataMobile.textContent = data;
                lightboxMobile.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function close() {
        lightboxMobile.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeLightbox.addEventListener('click', close);
    lightboxMobile.addEventListener('click', e => { if (e.target === lightboxMobile) close(); });
    window.addEventListener('orientationchange', close);
});