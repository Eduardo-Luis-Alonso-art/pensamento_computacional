// Definição do IntersectionObserver para ativar animação de imagens na galeria
const images = document.querySelectorAll('.ano-galeria img');

// Configuração do IntersectionObserver para mostrar as imagens assim que entram no viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // Adiciona a classe active
        } else {
            entry.target.classList.remove('active'); // Remove a classe active
        }
    });
}, {
    threshold: 0.1, // A imagem vai aparecer quando 10% dela estiver visível
    rootMargin: '0px 0px -10% 0px' // A imagem entra um pouco antes de estar completamente visível
});

// Observa todas as imagens da galeria
images.forEach(image => observer.observe(image));

// Configuração dos nomes dos meses para o calendário
const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Configuração das datas importantes para o calendário
const importantDates = [
    { day: 10, month: 1, description: "Início das Aulas" },
    { day: 4, month: 6, description: "Férias de Julho" },
    { day: 10, month: 10, description: "Última aula do Curso" },
    { day: 15, month: 10, description: "Formatura e encerramento do Curso" },
];

// Definição da data atual
let currentDate = new Date();
let currentMonth = currentDate.getMonth(); // Mês atual
let currentYear = 2025; // Ano fixo para o calendário acadêmico

// Função para gerar o calendário do mês atual
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

    // Preenche os dias do mês com as células vazias até o primeiro dia do mês
    for (let i = 0; i < startDay; i++) {
        row.appendChild(document.createElement('td'));
    }

    // Preenche a primeira semana do calendário
    for (let i = startDay; i < 7; i++) {
        const cell = document.createElement('td');
        cell.textContent = day;
        
        markImportantDates(cell, day, month);

        row.appendChild(cell);
        day++;
    }
    calendarBody.appendChild(row);

    // Preenche as semanas subsequentes
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

// Função para marcar as datas importantes no calendário
function markImportantDates(cell, day, month) {
    importantDates.forEach(date => {
        if (date.day === day && date.month === month) {
            cell.classList.add('marcar');
            cell.title = date.description;
        }
    });
}

// Função para alterar o mês no calendário
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

// Gera o calendário do mês atual
generateCalendar(currentMonth, currentYear);

// Eventos para mudar de mês
document.querySelector('#prev-month').addEventListener('click', () => changeMonth(-1));
document.querySelector('#next-month').addEventListener('click', () => changeMonth(1));