const slides = document.querySelector('.slides');
const imagens = document.querySelectorAll('.slides img');
let index = 0;

function passarSlide() {
    index = (index + 1) % imagens.length;
    const larguraSlide = imagens[0].clientWidth;
    slides.style.transform = `translateX(${-index * larguraSlide}px)`;
}

setInterval(passarSlide, 5000);

window.addEventListener('resize', () => {
    const larguraSlide = imagens[0].clientWidth;
    slides.style.transform = `translateX(${-index * larguraSlide}px)`;
});