// carregar-mais-independente.js
let botoesAtivos = new Map(); // Guarda o estado de cada ano

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Carregar Mais Independente');
    
    // Inicializa quando as fotos estiverem prontas
    setTimeout(inicializarCarregarMaisPorAno, 500);
    
    // Observa mudanças entre anos
    observarMudancaAnos();
});

function inicializarCarregarMaisPorAno() {
    const containers = document.querySelectorAll('.ano-container');
    
    containers.forEach(container => {
        const ano = container.id.replace('ano-', '');
        const carrossel = container.querySelector('.carrossel-galeria');
        if (!carrossel) return;
        
        const fotos = Array.from(carrossel.querySelectorAll('.foto-item'));
        
        // Classifica as fotos (6 primeiras são iniciais, resto são extras)
        fotos.forEach((foto, index) => {
            if (index < 6) {
                foto.classList.add('inicial');
                foto.classList.remove('extra');
            } else {
                foto.classList.add('extra');
                foto.classList.remove('inicial');
                foto.style.display = 'none'; // Garante que extras estão escondidas
            }
        });
        
        // Se tiver mais de 6 fotos, cria botão
        if (fotos.length > 6) {
            criarBotaoCarregarMais(container, fotos, ano);
        }
    });
}

function criarBotaoCarregarMais(container, fotos, ano) {
    // Remove botão existente
    const botaoExistente = container.querySelector('.carregar-mais-container');
    if (botaoExistente) botaoExistente.remove();
    
    const btnContainer = document.createElement('div');
    btnContainer.className = 'carregar-mais-container';
    
    const btn = document.createElement('button');
    btn.className = 'carregar-mais-btn';
    btn.innerHTML = '📸 Ver mais fotos';
    btn.dataset.ano = ano;
    
    btn.addEventListener('click', function() {
        console.log(`📸 Carregando todas as fotos de ${ano}`);
        
        // Mostra TODAS as fotos extras
        const fotosExtras = container.querySelectorAll('.foto-item.extra');
        fotosExtras.forEach(foto => {
            foto.style.display = 'block';
        });
        
        // Marca o carrossel como "todas visíveis"
        const carrossel = container.querySelector('.carrossel-galeria');
        carrossel.classList.add('todas-visiveis');
        
        // Remove o botão
        btnContainer.remove();
        
        // Não salva o estado - quando mudar de ano, recomeça do zero
    });
    
    btnContainer.appendChild(btn);
    container.appendChild(btnContainer);
}

function observarMudancaAnos() {
    // Observa cliques nos botões de ano
    document.querySelectorAll('.ano-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const anoClicado = this.dataset.ano;
            console.log(`🔁 Mudando para ano ${anoClicado}`);
            
            // Quando mudar de ano, força reset visual em todos os containers
            setTimeout(() => {
                resetarTodosOsBotoes();
            }, 100);
        });
    });
}

function resetarTodosOsBotoes() {
    console.log('🔄 Resetando todos os botões...');
    
    document.querySelectorAll('.ano-container').forEach(container => {
        const carrossel = container.querySelector('.carrossel-galeria');
        if (carrossel) {
            carrossel.classList.remove('todas-visiveis');
        }
        
        // Esconde todas as fotos extras
        const fotosExtras = container.querySelectorAll('.foto-item.extra');
        fotosExtras.forEach(foto => {
            foto.style.display = 'none';
        });
        
        // Mostra apenas as fotos iniciais
        const fotosIniciais = container.querySelectorAll('.foto-item.inicial');
        fotosIniciais.forEach(foto => {
            foto.style.display = 'block';
        });
        
        // Recria os botões se necessário
        const fotos = Array.from(container.querySelectorAll('.foto-item'));
        const ano = container.id.replace('ano-', '');
        
        if (fotos.length > 6) {
            // Remove botão existente
            const botaoExistente = container.querySelector('.carregar-mais-container');
            if (botaoExistente) botaoExistente.remove();
            
            // Cria novo botão
            criarBotaoCarregarMais(container, fotos, ano);
        }
    });
}

// Função para forçar reset quando necessário
function resetarGaleria() {
    console.log('🔄 Resetando galeria completa');
    resetarTodosOsBotoes();
}