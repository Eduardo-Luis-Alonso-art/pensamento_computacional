document.addEventListener('DOMContentLoaded', function () {
    const anoButtons = document.querySelectorAll('.ano-btn');
    const anoContainers = document.querySelectorAll('.ano-container');

    function showAno(ano) {
        anoButtons.forEach(btn => btn.classList.remove('ativo'));
        anoContainers.forEach(container => container.classList.remove('ativo'));

        document.querySelector(`.ano-btn[data-ano="${ano}"]`)?.classList.add('ativo');
        document.getElementById(`ano-${ano}`)?.classList.add('ativo');
    }

    anoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const ano = this.getAttribute('data-ano');
            showAno(ano);
        });
    });

    showAno('2025');
});