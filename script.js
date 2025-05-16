// Seleciona todas as imagens da galeria
const images = document.querySelectorAll('.ano-galeria img');

// Cria o observador de interseção
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');  // Adiciona a classe active para ativar o efeito
        } else {
            entry.target.classList.remove('active');  // Remove a classe active quando sair da tela
        }
    });
}, {
    threshold: 0.3, // Inicia o efeito quando 30% da imagem for visível
    rootMargin: '0px 0px -50% 0px'  // Faz a imagem ainda ficar "ativa" por um tempo depois de sair de vista
});

// Observa cada imagem
images.forEach(image => {
    observer.observe(image);
});