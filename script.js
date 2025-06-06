const slides = document.querySelector('.slides');
const imagens = document.querySelectorAll('.slides img');

let index = 0;

function passarSlide() {
index++;

if (index >= imagens.length) {
    index = 0;
}

const larguraSlide = imagens[0].clientWidth;
  slides.style.transform = `translateX(${-index * larguraSlide}px)`;
}

setInterval(passarSlide, 5000);

window.addEventListener('resize', () => {
const larguraSlide = imagens[0].clientWidth;
  slides.style.transform = `translateX(${-index * larguraSlide}px)`;
});





const galeriaImages = document.querySelectorAll('.ano-galeria img');

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.3) { 
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: [0, 0.3],  
    rootMargin: '0px 0px -10% 0px'  
});

galeriaImages.forEach(image => galleryObserver.observe(image));

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

    // Preenche células vazias antes do primeiro dia do mês
    for (let i = 0; i < startDay; i++) {
        row.appendChild(document.createElement('td'));
    }

    // Preenche o restante da semana com os dias
    for (let i = startDay; i < 7; i++) {
        const cell = document.createElement('td');
        cell.textContent = day;
        markImportantDates(cell, day, month);
        row.appendChild(cell);
        day++;
    }
    calendarBody.appendChild(row);

    // Preenche as semanas seguintes
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

// Gera o calendário inicial
generateCalendar(currentMonth, currentYear);

// Botões para trocar mês
document.querySelector('#prev-month').addEventListener('click', () => changeMonth(-1));
document.querySelector('#next-month').addEventListener('click', () => changeMonth(1));

// === Ativação de animação para o pensamento ===
const pensamentoBoxes = document.querySelectorAll('.pensamento-box');

const pensamentoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.9
});

pensamentoBoxes.forEach(box => pensamentoObserver.observe(box));


//Scroll
const scrollBox = document.getElementById('scrollBox');
  const conteudo = document.getElementById('conteudo');

  // Clone para efeito infinito
  const clone = conteudo.cloneNode(true);
  scrollBox.appendChild(clone);

  let scrollY = 0;
  let isPaused = false;

  function scrollLoop() {
    if (!isPaused) {
      scrollY += 0.5; // velocidade
      if (scrollY >= conteudo.scrollHeight) {
        scrollY = 0;
      }
      scrollBox.scrollTop = scrollY;
    }
    requestAnimationFrame(scrollLoop);
  }

  scrollLoop();

  // Pausa no hover
  scrollBox.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  scrollBox.addEventListener('mouseleave', () => {
    isPaused = false;
  });