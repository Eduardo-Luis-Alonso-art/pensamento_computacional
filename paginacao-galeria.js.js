// paginacao-galeria.js
const FOTOS_POR_PAGINA = {
    desktop: 9,
    tablet: 6, 
    mobile: 3
};

function inicializarPaginacao() {
    console.log('Inicializando paginação...');
    
    const containers = document.querySelectorAll('.ano-container');
    
    containers.forEach(container => {
        const carrossel = container.querySelector('.carrossel-galeria');
        if (!carrossel) return;
        
        const fotos = Array.from(carrossel.querySelectorAll('.foto-item'));
        console.log(`Container com ${fotos.length} fotos`);
        
        // SEMPRE inicializa a paginação, mesmo com poucas fotos
        const fotosPorPagina = getFotosPorPagina();
        const totalPaginas = Math.ceil(fotos.length / fotosPorPagina);
        
        if (fotos.length === 0) {
            console.log('Sem fotos, pulando...');
            return;
        }
        
        // Remove controles existentes
        const controlesExistentes = container.querySelector('.galeria-paginacao');
        if (controlesExistentes) controlesExistentes.remove();
        
        if (totalPaginas <= 1) {
            console.log('Poucas fotos, mostrando todas sem paginação');
            carrossel.classList.remove('com-paginacao');
            fotos.forEach(foto => foto.classList.add('mostrar'));
            return;
        }
        
        console.log(`Criando paginação com ${totalPaginas} páginas`);
        carrossel.classList.add('com-paginacao');
        criarControlesPaginacao(container, carrossel, fotos, totalPaginas);
    });
}

function criarControlesPaginacao(container, carrossel, fotos, totalPaginas) {
    const fotosPorPagina = getFotosPorPagina();
    
    // Cria controles de paginação
    const controles = document.createElement('div');
    controles.className = 'galeria-paginacao';
    
    // Botão anterior
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagina-btn pagina-nav';
    prevBtn.innerHTML = '◀';
    prevBtn.addEventListener('click', () => mudarPagina(paginaAtual - 1));
    
    // Container para números com scroll
    const numerosContainer = document.createElement('div');
    numerosContainer.className = 'paginacao-container';
    
    // Botões numéricos
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.className = 'pagina-btn';
        btn.textContent = i;
        btn.dataset.pagina = i;
        btn.addEventListener('click', () => mostrarPagina(i));
        numerosContainer.appendChild(btn);
    }
    
    // Botão próximo
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagina-btn pagina-nav';
    nextBtn.innerHTML = '▶';
    nextBtn.addEventListener('click', () => mudarPagina(paginaAtual + 1));
    
    controles.appendChild(prevBtn);
    controles.appendChild(numerosContainer);
    controles.appendChild(nextBtn);
    
    container.appendChild(controles);
    
    // Estado da paginação
    let paginaAtual = 1;
    const maxBotoesVisiveis = 5; // Máximo de botões visíveis
    
    function mostrarPagina(pagina) {
        const novaPagina = Math.max(1, Math.min(pagina, totalPaginas));
        
        if (novaPagina === paginaAtual) return;
        
        paginaAtual = novaPagina;
        
        console.log(`Mostrando página ${paginaAtual} de ${totalPaginas}`);
        
        // Atualiza botões
        atualizarBotoesPaginacao();
        
        // Mostra fotos da página atual
        const inicio = (paginaAtual - 1) * fotosPorPagina;
        const fim = inicio + fotosPorPagina;
        
        fotos.forEach((foto, index) => {
            foto.classList.toggle('mostrar', index >= inicio && index < fim);
        });
        
        // Scroll para o topo da galeria
        setTimeout(() => {
            carrossel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    function mudarPagina(pagina) {
        if (pagina >= 1 && pagina <= totalPaginas) {
            mostrarPagina(pagina);
        }
    }
    
    function atualizarBotoesPaginacao() {
        // Atualiza estados dos botões
        numerosContainer.querySelectorAll('.pagina-btn').forEach(btn => {
            const paginaBtn = parseInt(btn.dataset.pagina);
            btn.classList.toggle('ativo', paginaBtn === paginaAtual);
        });
        
        // Atualiza botões de navegação
        prevBtn.disabled = paginaAtual === 1;
        nextBtn.disabled = paginaAtual === totalPaginas;
        
        // Scroll para o botão ativo
        const btnAtivo = numerosContainer.querySelector(`[data-pagina="${paginaAtual}"]`);
        if (btnAtivo) {
            btnAtivo.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'center' 
            });
        }
    }
    
    // Inicia com a primeira página
    mostrarPagina(1);
    
    // Event listeners para teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') mudarPagina(paginaAtual - 1);
        if (e.key === 'ArrowRight') mudarPagina(paginaAtual + 1);
    });
}

function getFotosPorPagina() {
    if (window.innerWidth >= 1024) return FOTOS_POR_PAGINA.desktop;
    if (window.innerWidth >= 768) return FOTOS_POR_PAGINA.tablet;
    return FOTOS_POR_PAGINA.mobile;
}

// Função para forçar atualização
function atualizarPaginacao() {
    const containers = document.querySelectorAll('.ano-container');
    
    containers.forEach(container => {
        const controles = container.querySelector('.galeria-paginacao');
        if (controles) controles.remove();
        
        const carrossel = container.querySelector('.carrossel-galeria');
        if (carrossel) {
            carrossel.classList.remove('com-paginacao');
            Array.from(carrossel.querySelectorAll('.foto-item')).forEach(foto => {
                foto.classList.remove('mostrar');
            });
        }
    });
    
    setTimeout(inicializarPaginacao, 50);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, aguardando fotos...');
    
    // Aguarda as fotos serem carregadas
    const aguardarFotos = setInterval(() => {
        const fotosExistentes = document.querySelectorAll('.foto-item').length;
        console.log(`Fotos encontradas: ${fotosExistentes}`);
        
        if (fotosExistentes > 0) {
            clearInterval(aguardarFotos);
            setTimeout(() => {
                inicializarPaginacao();
                console.log('Paginação inicializada!');
            }, 100);
        }
    }, 200);
    
    // Re-inicializa ao redimensionar
    window.addEventListener('resize', () => {
        console.log('Redimensionando, atualizando paginação...');
        setTimeout(atualizarPaginacao, 150);
    });
});