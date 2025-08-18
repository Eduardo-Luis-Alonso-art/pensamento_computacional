// =====================================
// CARROSSEL DE INSTRUTORES (SLIDES AUTOMÁTICOS)
// =====================================
const slides = document.querySelector('.slides');
const imagens = document.querySelectorAll('.slides img');
let index = 0;

function passarSlide() {
  index++;
  if (index >= imagens.length) index = 0;
  const larguraSlide = imagens[0].clientWidth;
  slides.style.transform = `translateX(${-index * larguraSlide}px)`;
}

setInterval(passarSlide, 5000);

window.addEventListener('resize', () => {
  const larguraSlide = imagens[0].clientWidth;
  slides.style.transform = `translateX(${-index * larguraSlide}px)`;
});

// =====================================
// ANIMAÇÃO DE ENTRADA DAS IMAGENS DA GALERIA
// =====================================
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

// =====================================
// CALENDÁRIO INTERATIVO COM DATAS IMPORTANTES
// =====================================
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

// =====================================
// ANIMAÇÃO PARA SEÇÃO DE PENSAMENTO COMPUTACIONAL
// =====================================
const pensamentoBoxes = document.querySelectorAll('.pensamento-box');

const pensamentoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.9 });

pensamentoBoxes.forEach(box => pensamentoObserver.observe(box));

// =====================================
// SCROLL AUTOMÁTICO COM PAUSA NO HOVER
// =====================================
const scrollBox = document.getElementById('scrollBox');
const conteudo = document.getElementById('conteudo');
const clone = conteudo.cloneNode(true);
scrollBox.appendChild(clone);

let scrollY = 0;
let isPaused = false;

function scrollLoop() {
  if (!isPaused) {
    scrollY += 0.5;
    if (scrollY >= conteudo.scrollHeight) scrollY = 0;
    scrollBox.scrollTop = scrollY;
  }
  requestAnimationFrame(scrollLoop);
}

scrollLoop();

scrollBox.addEventListener('mouseenter', () => isPaused = true);
scrollBox.addEventListener('mouseleave', () => isPaused = false);

// =====================================
// CARROSSEL DE MONITORES COM AUTOPLAY
// =====================================
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.monitor-card');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const carrosselContainer = document.querySelector('.carrossel-monitores');
  let currentIndex = 0;
  let intervalId;

  function showCard(index) {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  }

  function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
  }

  function startCarrossel() {
    intervalId = setInterval(nextCard, 5000);
  }

  function pauseCarrossel() {
    clearInterval(intervalId);
  }

  // Event listeners
  nextBtn.addEventListener('click', () => {
    nextCard();
    pauseCarrossel();
    startCarrossel();
  });

  prevBtn.addEventListener('click', () => {
    prevCard();
    pauseCarrossel();
    startCarrossel();
  });

  carrosselContainer.addEventListener('mouseenter', pauseCarrossel);
  carrosselContainer.addEventListener('mouseleave', startCarrossel);

  // Inicialização
  showCard(currentIndex);
  startCarrossel();
});

// =====================================
// COMPORTAMENTO DO HEADER NO SCROLL
// =====================================
let prevScrollPos = window.pageYOffset;
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
  const currentScrollPos = window.pageYOffset;
  header.style.top = prevScrollPos > currentScrollPos ? "0" : "-100px";
  prevScrollPos = currentScrollPos;
});

// =====================================
// NAVEGAÇÃO ENTRE ANOS E LIGHTBOX
// =====================================
document.addEventListener('DOMContentLoaded', function() {
  // Navegação entre anos
  const anoBtns = document.querySelectorAll('.ano-btn');
  const anoContainers = document.querySelectorAll('.ano-container');
  
  anoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      anoBtns.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      
      const ano = btn.dataset.ano;
      anoContainers.forEach(container => {
        container.classList.remove('ativo');
        if (container.id === `ano-${ano}`) container.classList.add('ativo');
      });
    });
  });
  
  // Lightbox mobile
  const lightboxMobile = document.querySelector('.lightbox-mobile');
  const lightboxImgMobile = document.getElementById('lightbox-imagem-mobile');
  const lightboxTituloMobile = document.getElementById('lightbox-titulo-mobile');
  const lightboxDataMobile = document.getElementById('lightbox-data-mobile');
  const closeLightbox = document.querySelector('.fechar-lightbox');
  const fotoItems = document.querySelectorAll('.foto-item');
  
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  fotoItems.forEach(item => {
    item.addEventListener('click', function() {
      if (isMobile()) {
        const img = this.querySelector('img');
        const titulo = this.querySelector('.foto-titulo').textContent;
        const data = this.querySelector('.foto-data').textContent;
        
        lightboxImgMobile.src = img.src;
        lightboxTituloMobile.textContent = titulo;
        lightboxDataMobile.textContent = data;
        lightboxMobile.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  closeLightbox.addEventListener('click', () => {
    lightboxMobile.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  lightboxMobile.addEventListener('click', (e) => {
    if (e.target === lightboxMobile) {
      lightboxMobile.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  window.addEventListener('orientationchange', function() {
    if (lightboxMobile.style.display === 'flex') {
      lightboxMobile.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});


// Adiciona feedback tátil para dispositivos touch
document.querySelectorAll('.modulo').forEach(modulo => {
    modulo.addEventListener('touchstart', function() {
        this.classList.add('touched');
    });
    
    modulo.addEventListener('touchend', function() {
        this.classList.remove('touched');
    });
});
