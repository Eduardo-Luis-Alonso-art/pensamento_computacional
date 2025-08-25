// galeria-loader.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando carregamento da galeria...');
    carregarGaleria();
    inicializarLightbox();
    
    // Não inicializa ver-mais aqui, deixe o ver-mais.js cuidar disso
});

function carregarGaleria() {
    console.log('Carregando galeria data...');
    
    if (typeof galeriaData === 'undefined') {
        console.error('galeriaData não está definido!');
        return;
    }
    
    Object.keys(galeriaData).forEach(ano => {
        const container = document.getElementById(`carrossel-${ano}`);
        if (!container) {
            console.error('Container não encontrado para ano:', ano);
            return;
        }
        
        const fotos = galeriaData[ano];
        console.log('Processando ano:', ano, 'com', fotos.length, 'fotos');
        
        if (fotos.length === 0) {
            container.innerHTML = `
                <div class="mensagem-futuro">
                    <p>Nossas memórias de ${ano} estão sendo criadas agora!</p>
                    <p>Volte em breve para conferir.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        fotos.forEach((foto, index) => {
            const fotoElement = criarElementoFoto(foto, ano, index);
            container.appendChild(fotoElement);
        });
    });
    
    console.log('Galeria carregada com sucesso');
}


function criarElementoFoto(foto, ano, index) {
    const div = document.createElement('div');
    div.className = 'foto-item';
    div.innerHTML = `
        <div class="foto-wrapper">
            <img src="${foto.src}" alt="${foto.alt}" loading="lazy" data-ano="${ano}" data-index="${index}">
            <div class="info-foto">
                <span class="foto-titulo">${foto.titulo}</span>
                <span class="foto-data">${foto.data}</span>
            </div>
        </div>
    `;
    
    return div;
}

function inicializarLightbox() {
    // Adiciona evento de clique para todas as imagens
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.foto-wrapper')) {
            const img = e.target;
            const ano = img.getAttribute('data-ano');
            const index = parseInt(img.getAttribute('data-index'));
            
            if (ano && !isNaN(index)) {
                abrirLightbox(ano, index);
            }
        }
    });
    
    // Fechar lightbox
    document.querySelector('.fechar-lightbox').addEventListener('click', function() {
        document.querySelector('.lightbox-mobile').style.display = 'none';
    });
    
    // Fechar lightbox clicando fora
    document.querySelector('.lightbox-mobile').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
}

function abrirLightbox(ano, index) {
    const foto = galeriaData[ano][index];
    const lightbox = document.querySelector('.lightbox-mobile');
    const lightboxImg = document.getElementById('lightbox-imagem-mobile');
    const lightboxTitulo = document.getElementById('lightbox-titulo-mobile');
    const lightboxData = document.getElementById('lightbox-data-mobile');
    
    if (foto && lightboxImg && lightboxTitulo && lightboxData) {
        lightboxImg.src = foto.src;
        lightboxImg.alt = foto.alt;
        lightboxTitulo.textContent = foto.titulo;
        lightboxData.textContent = foto.data;
        
        lightbox.style.display = 'flex';
    }
}

// Adicione estas funções no final do galeria-loader.js

// ===== FUNÇÕES VER MAIS =====
function inicializarBotoesVerMais() {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.carrossel-galeria').forEach(carrossel => {
            carrossel.classList.add('mostrar-todas');
        });
        return;
    }
    
    const containers = document.querySelectorAll('.ano-container');
    
    containers.forEach(container => {
        const carrossel = container.querySelector('.carrossel-galeria');
        if (!carrossel) return;
        
        const fotos = carrossel.querySelectorAll('.foto-item');
        
        if (fotos.length > 3) {
            criarBotaoVerMais(container, carrossel, fotos.length);
        } else {
            carrossel.classList.add('mostrar-todas');
        }
    });
}

function criarBotaoVerMais(container, carrossel, totalFotos) {
    const verMaisBtn = document.createElement('button');
    verMaisBtn.className = 'ver-mais-btn';
    verMaisBtn.textContent = `Ver mais fotos (${totalFotos - 3}+)`;
    
    const containerBtn = document.createElement('div');
    containerBtn.className = 'ver-mais-container';
    containerBtn.appendChild(verMaisBtn);
    
    container.insertBefore(containerBtn, carrossel.nextSibling);
    
    verMaisBtn.addEventListener('click', function() {
        const estaMostrandoTodas = carrossel.classList.contains('mostrar-todas');
        
        if (estaMostrandoTodas) {
            carrossel.classList.remove('mostrar-todas');
            this.textContent = `Ver mais fotos (${totalFotos - 3}+)`;
        } else {
            carrossel.classList.add('mostrar-todas');
            this.textContent = 'Ver menos';
        }
    });
}

// Inicializar após carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarGaleria();
    inicializarLightbox();
    setTimeout(() => {
        inicializarBotoesVerMais();
        window.addEventListener('resize', inicializarBotoesVerMais);
    }, 100);

    // No final da função carregarGaleria():
function carregarGaleria() {
    // ... código existente ...
    
    Object.keys(galeriaData).forEach(ano => {
        // ... código existente ...
        
        // Garante que as fotos têm a classe correta
        setTimeout(() => {
            const fotos = container.querySelectorAll('.foto-item');
            fotos.forEach(foto => {
                foto.classList.add('foto-item'); // Garante a classe
            });
        }, 50);
    });
}
});