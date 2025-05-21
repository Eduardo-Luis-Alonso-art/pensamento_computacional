// === Ativação de animações para imagens da galeria ===
const galeriaImages = document.querySelectorAll('.ano-galeria img');

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
});

galeriaImages.forEach(image => observer.observe(image));

// === Configuração do calendário ===
const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const importantDates = [
    { day: 10, month: 1, description: "Início das Aulas" },
    { day: 4, month: 6, description: "Férias de Julho" },
    { day: 10, month: 10, description: "Última aula do Curso" },
    { day: 15, month: 10, description: "Formatura e encerramento do Curso" },
];

let currentDate = new Date();
let currentMonth = parseInt(localStorage.getItem('currentMonth'), 10);
if (isNaN(currentMonth) || currentMonth < 0 || currentMonth > 11) {
    currentMonth = currentDate.getMonth();
}

const currentYear = 2025;

function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const monthName = monthNames[month];
    const numDays = lastDay.getDate();
    const startDay = firstDay.getDay();

    const calendarBody = document.querySelector('#calendario tbody');
    const monthNameElement = document.querySelector('#month-name');

    monthNameElement.textContent = `${monthName} ${year}`;
    calendarBody.innerHTML = '';

    let row = document.createElement('tr');
    let day = 1;

    for (let i = 0; i < startDay; i++) {
        row.appendChild(document.createElement('td'));
    }

    for (let i = startDay; i < 7; i++) {
        const cell = document.createElement('td');
        cell.textContent = day;
        markImportantDates(cell, day, month);
        row.appendChild(cell);
        day++;
    }
    calendarBody.appendChild(row);

    while (day <= numDays) {
        row = document.createElement('tr');
        for (let i = 0; i < 7 && day <= numDays; i++) {
            const cell = document.createElement('td');
            cell.textContent = day;
            markImportantDates(cell, day, month);
            row.appendChild(cell);
            day++;
        }
        calendarBody.appendChild(row);
    }
}

function markImportantDates(cell, day, month) {
    importantDates.forEach(date => {
        if (date.day === day && date.month === month) {
            cell.classList.add('marcar');
            cell.title = date.description;
            cell.setAttribute('aria-label', `Data importante: ${date.description}`);
        }
    });
}

function changeMonth(increment) {
    currentMonth += increment;

    if (currentMonth > 11) {
        currentMonth = 0;
    } else if (currentMonth < 0) {
        currentMonth = 11;
    }

    localStorage.setItem('currentMonth', currentMonth);
    generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);

document.querySelector('#prev-month').addEventListener('click', () => changeMonth(-1));
document.querySelector('#next-month').addEventListener('click', () => changeMonth(1));

// === Carrossel de imagens com transição ===
const imagePaths = [
  'img/pensamento.jpg',
  'img/pensamento2.png',
  'img/pensamento3.jpg',
  'img/pensamento4.png',
  'img/pensamento5.png',
  'img/pensamento6.png'
];

const container = document.querySelector('.carrossel-container');

if (container) {
    const imgs = container.querySelectorAll('.carrossel-img');
    let current = 0;
    let next = 1;

    setInterval(() => {
        imgs[current].classList.remove('visible');
        imgs[next].classList.add('visible');

        current = next;
        next = (next + 1) % imagePaths.length;

        // Atualiza a imagem oculta para preparar a próxima troca
        setTimeout(() => {
            imgs[(current + 1) % 2].src = imagePaths[next];
        }, 1000); // tempo igual ao CSS transition
    }, 5000); // tempo de exibição de cada imagem
}