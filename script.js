const images = document.querySelectorAll('.ano-galeria img');

// Ajuste do IntersectionObserver para mostrar as imagens mais rápido
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // Adiciona a classe active
        } else {
            entry.target.classList.remove('active'); // Remove a classe active
        }
    });
}, {
    threshold: 0.1, // A imagem vai aparecer quando 20% dela estiver visível
    rootMargin: '0px 0px -10% 0px' // A imagem entra um pouco antes de estar completamente visível
});

images.forEach(image => {
    observer.observe(image); // Observa cada imagem da galeria
});

const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth(); // Mês atual
let currentYear = 2025; // Ano fixo para o calendário acadêmico

const importantDates = [
    { day: 10, month: 1, description: "Início das Aulas" },
    { day: 4, month: 6, description: "Férias de Julho" },
    { day: 10, month: 10, description: "Última aula do Curso" },
    { day: 15, month: 10, description: "Formatura e encerramento do Curso" },
];

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
        }
    });
}

function changeMonth(increment) {
    currentMonth += increment;

    // Impede a mudança de ano
    if (currentMonth > 11) {
        currentMonth = 0; // Janeiro
    } else if (currentMonth < 0) {
        currentMonth = 11; // Dezembro
    }

    generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);

document.querySelector('#prev-month').addEventListener('click', () => changeMonth(-1));
document.querySelector('#next-month').addEventListener('click', () => changeMonth(1));