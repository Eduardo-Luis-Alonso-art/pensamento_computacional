// ======================
// CARROSSEL DE INSTRUTORES
// ======================
function initInstructorsCarousel() {
  const slides = document.querySelector('.slides');
  const imagens = document.querySelectorAll('.slides img');
  let index = 0;

  function passarSlide() {
    index = (index + 1) % imagens.length;
    updateSlidePosition();
  }

  function updateSlidePosition() {
    const larguraSlide = imagens[0].clientWidth;
    slides.style.transform = `translateX(${-index * larguraSlide}px)`;
  }

  const slideInterval = setInterval(passarSlide, 5000);
  window.addEventListener('resize', updateSlidePosition);

  return () => clearInterval(slideInterval);
}

// ======================
// ANIMAÇÃO DA GALERIA
// ======================
function initGalleryAnimation() {
  const galeriaImages = document.querySelectorAll('.ano-galeria img');

  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('active', entry.intersectionRatio >= 0.3);
    });
  }, {
    threshold: [0, 0.3],
    rootMargin: '0px 0px -10% 0px'
  });

  galeriaImages.forEach(image => galleryObserver.observe(image));
}

// ======================
// CALENDÁRIO INTERATIVO
// ======================
function initCalendar() {
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
  let currentMonth = parseInt(localStorage.getItem('currentMonth'), 10) || currentDate.getMonth();
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
      const cell = createCalendarCell(day++, month);
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);

    while (day <= numDays) {
      row = document.createElement('tr');
      for (let i = 0; i < 7 && day <= numDays; i++) {
        const cell = createCalendarCell(day++, month);
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }

  function createCalendarCell(day, month) {
    const cell = document.createElement('td');
    cell.textContent = day;
    markImportantDates(cell, day, month);
    return cell;
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
    currentMonth = (currentMonth + increment + 12) % 12;
    localStorage.setItem('currentMonth', currentMonth);
    generateCalendar(currentMonth, currentYear);
  }

  // Initialize and set up event listeners
  generateCalendar(currentMonth, currentYear);
  document.querySelector('#prev-month').addEventListener('click', () => changeMonth(-1));
  document.querySelector('#next-month').addEventListener('click', () => changeMonth(1));
}

// ======================
// ANIMAÇÃO DE PENSAMENTO COMPUTACIONAL
// ======================
function initPensamentoAnimation() {
  const pensamentoBoxes = document.querySelectorAll('.pensamento-box');

  const pensamentoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, { threshold: 0.9 });

  pensamentoBoxes.forEach(box => pensamentoObserver.observe(box));
}

// ======================
// SCROLL AUTOMÁTICO
// ======================
function initAutoScroll() {
  const scrollBox = document.getElementById('scrollBox');
  const conteudo = document.getElementById('conteudo');
  const clone = conteudo.cloneNode(true);
  scrollBox.appendChild(clone);

  let scrollY = 0;
  let isPaused = false;
  let animationId;

  function scrollLoop() {
    if (!isPaused) {
      scrollY = (scrollY + 0.5) % conteudo.scrollHeight;
      scrollBox.scrollTop = scrollY;
    }
    animationId = requestAnimationFrame(scrollLoop);
  }

  scrollBox.addEventListener('mouseenter', () => isPaused = true);
  scrollBox.addEventListener('mouseleave', () => isPaused = false);

  scrollLoop();
  return () => cancelAnimationFrame(animationId);
}

// ======================
// CARROSSEL DE MONITORES
// ======================
function initMonitorsCarousel() {
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

  function handleNavigation() {
    pauseCarrossel();
    startCarrossel();
  }

  nextBtn.addEventListener('click', () => {
    nextCard();
    handleNavigation();
  });

  prevBtn.addEventListener('click', () => {
    prevCard();
    handleNavigation();
  });

  carrosselContainer.addEventListener('mouseenter', pauseCarrossel);
  carrosselContainer.addEventListener('mouseleave', startCarrossel);

  showCard(currentIndex);
  startCarrossel();
  return pauseCarrossel;
}

// ======================
// HEADER SCROLL BEHAVIOR
// ======================
function initHeaderScroll() {
  const header = document.querySelector("header");
  let prevScrollPos = window.pageYOffset;

  window.addEventListener("scroll", function() {
    const currentScrollPos = window.pageYOffset;
    header.style.top = prevScrollPos > currentScrollPos ? "0" : "-100px";
    prevScrollPos = currentScrollPos;
  });
}

// ======================
// GALERIA POR ANO
// ======================
function initYearGallery() {
  const anoBtns = document.querySelectorAll('.ano-btn');
  const anoContainers = document.querySelectorAll('.ano-container');
  
  anoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      anoBtns.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      
      const ano = btn.dataset.ano;
      anoContainers.forEach(container => {
        container.classList.toggle('ativo', container.id === `ano-${ano}`);
      });
    });
  });
}

// ======================
// LIGHTBOX MOBILE
// ======================
function initMobileLightbox() {
  const lightboxMobile = document.querySelector('.lightbox-mobile');
  const lightboxImgMobile = document.getElementById('lightbox-imagem-mobile');
  const lightboxTituloMobile = document.getElementById('lightbox-titulo-mobile');
  const lightboxDataMobile = document.getElementById('lightbox-data-mobile');
  const closeLightbox = document.querySelector('.fechar-lightbox');
  const fotoItems = document.querySelectorAll('.foto-item');

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function openLightbox(imgSrc, titulo, data) {
    lightboxImgMobile.src = imgSrc;
    lightboxTituloMobile.textContent = titulo;
    lightboxDataMobile.textContent = data;
    lightboxMobile.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightboxHandler() {
    lightboxMobile.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  fotoItems.forEach(item => {
    item.addEventListener('click', function() {
      if (isMobile()) {
        const img = this.querySelector('img');
        const titulo = this.querySelector('.foto-titulo').textContent;
        const data = this.querySelector('.foto-data').textContent;
        openLightbox(img.src, titulo, data);
      }
    });
  });

  closeLightbox.addEventListener('click', closeLightboxHandler);
  lightboxMobile.addEventListener('click', (e) => {
    if (e.target === lightboxMobile) closeLightboxHandler();
  });

  window.addEventListener('orientationchange', closeLightboxHandler);
}

// ======================
// INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', function() {
  const cleanupFunctions = [
    initInstructorsCarousel(),
    initMonitorsCarousel(),
    initAutoScroll()
  ].filter(Boolean);

  initGalleryAnimation();
  initCalendar();
  initPensamentoAnimation();
  initHeaderScroll();
  initYearGallery();
  initMobileLightbox();

  console.log("Olá, me chamo Juliana. Muito prazer.");

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  });
});