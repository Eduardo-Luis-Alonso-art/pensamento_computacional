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

  // Células vazias para dias do mês anterior
  for (let i = 0; i < startDay; i++) {
    row.appendChild(document.createElement('td'));
  }

  // Primeira semana
  for (let i = startDay; i < 7; i++) {
    const cell = document.createElement('td');
    cell.textContent = day;
    markImportantDates(cell, day, month);
    row.appendChild(cell);
    day++;
  }
  calendarBody.appendChild(row);

  // Restante do mês
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
  if (currentMonth > 11) currentMonth = 0;
  else if (currentMonth < 0) currentMonth = 11;

  localStorage.setItem('currentMonth', currentMonth);
  generateCalendar(currentMonth, currentYear);
}

// Inicialização do calendário
generateCalendar(currentMonth, currentYear);
document.querySelector('#prev-month').addEventListener('click', () => changeMonth(-1));
document.querySelector('#next-month').addEventListener('click', () => changeMonth(1));

// Adaptação da tabela de horários para mobile
function adaptTableForMobile() {
    const tabela = document.querySelector('.tabela-horarios');
    if (!tabela) return;

    if (window.innerWidth <= 767) {
        // Adiciona labels para as células
        const headers = ['Dia da Semana', 'Horário de Início', 'Horário de Término'];
        const cells = tabela.querySelectorAll('tbody td');
        
        cells.forEach((cell, index) => {
            const headerIndex = index % 3;
            cell.setAttribute('data-label', headers[headerIndex]);
        });
    }
}

// Executa na carga e no redimensionamento
window.addEventListener('DOMContentLoaded', adaptTableForMobile);
window.addEventListener('resize', adaptTableForMobile);