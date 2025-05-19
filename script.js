const images = document.querySelectorAll('.ano-galeria img');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50% 0px'
});

images.forEach(image => {
    observer.observe(image);
});

const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const importantDates = [
    { day: 10, month: 1, description: "Início das Aulas" },
    { day: 4, month: 6, description: "Férias de Julho" },
    { day: 10, month: 10, description: "última aula do Curso" },
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
    
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);

document.querySelector('#prev-month').addEventListener('click', () => changeMonth(-1));
document.querySelector('#next-month').addEventListener('click', () => changeMonth(1));