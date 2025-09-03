document.querySelectorAll('.modulo').forEach(modulo => {
    modulo.addEventListener('touchstart', () => modulo.classList.add('touched'));
    modulo.addEventListener('touchend', () => modulo.classList.remove('touched'));
});