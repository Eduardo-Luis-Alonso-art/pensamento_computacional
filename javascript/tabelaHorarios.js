function adaptTableForMobile() {
    const tabela = document.querySelector('.tabela-horarios');
    if (!tabela) return;

    if (window.innerWidth <= 767) {
        const headers = ['Dia da Semana', 'Horário de Início', 'Horário de Término'];
        tabela.querySelectorAll('tbody td').forEach((cell, index) => {
            cell.setAttribute('data-label', headers[index % 3]);
        });
    }
}

window.addEventListener('DOMContentLoaded', adaptTableForMobile);
window.addEventListener('resize', adaptTableForMobile);