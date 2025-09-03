const pensamentoBoxes = document.querySelectorAll('.pensamento-box');

const pensamentoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('active', entry.isIntersecting);
    });
}, { threshold: 0.9 });

pensamentoBoxes.forEach(box => pensamentoObserver.observe(box));