document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.monitor-card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const container = document.querySelector('.carrossel-monitores');
    let currentIndex = 0, intervalId;

    function showCard(index) {
        cards.forEach(card => card.classList.remove('active'));
        cards[index].classList.add('active');
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    }

    function start() {
        intervalId = setInterval(nextCard, 5000);
    }

    function pause() {
        clearInterval(intervalId);
    }

    nextBtn.addEventListener('click', () => { nextCard(); pause(); start(); });
    prevBtn.addEventListener('click', () => { prevCard(); pause(); start(); });
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', start);

    showCard(currentIndex);
    start();
});