const scrollBox = document.getElementById('scrollBox');
const conteudo = document.getElementById('conteudo');
const clone = conteudo.cloneNode(true);
scrollBox.appendChild(clone);

let scrollY = 0;
let isPaused = false;

function scrollLoop() {
    if (!isPaused) {
        scrollY = (scrollY + 0.5) % conteudo.scrollHeight;
        scrollBox.scrollTop = scrollY;
    }
    requestAnimationFrame(scrollLoop);
}

scrollLoop();

scrollBox.addEventListener('mouseenter', () => isPaused = true);
scrollBox.addEventListener('mouseleave', () => isPaused = false);