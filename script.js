let titulo = document.getElementById('titulo');
let botão = document.getElementById('botão');
let comprar1 = document.getElementById('comprar1');
let quantidade = 0;
let intervaloAutoClick = null;    // controla o primeiro autoclicker
let intervaloAutoClick2 = null;   // controla o segundo autoclicker (super autoclicker)
let quantidade_fazenda = 0;
let preco_fazenda = 20;
let delay = 3000;   // delay inicial do autoclicker principal (em ms)
let delay2 = 1000;  // delay inicial do segundo autoclicker
let transcender_valor = 0; // quantas vezes o botão transcender foi clicado
let transcender_valor_click = 1;  // quanto cada clique manual soma (aumenta ao transcender)
let transcender = document.getElementById('botão_transcender');

// Função para limpar os intervalos dos autoclickers (para evitar intervalos zumbis)
function pararAutoClickers() {
    if (intervaloAutoClick !== null) {
        clearInterval(intervaloAutoClick);
        intervaloAutoClick = null;
    }
    if (intervaloAutoClick2 !== null) {
        clearInterval(intervaloAutoClick2);
        intervaloAutoClick2 = null;
    }
}

// Evento do botão transcender — reseta tudo e para autoclickers
transcender.addEventListener('click', function() {
    transcender_valor++;
    quantidade = 0;
    quantidade_fazenda = 0;
    preco_fazenda = 20;
    delay = 3000;
    delay2 = 1000;
    transcender_valor_click += 1;  // aumenta poder do clique manual

    pararAutoClickers(); // para os autoclickers!

    atualizarTitulo();
});

comprar1.style.opacity = '0.5';
comprar1.style.pointerEvents = 'none';

// Clique manual no botão principal — soma com base no transcender_valor
botão.addEventListener('click', function() {
    quantidade += transcender_valor_click;
 // aumenta o valor do transcender
    atualizarTitulo();
});

// Comprar fazenda — aumenta quantidade_fazenda, diminui delay, cria autoclickers
comprar1.addEventListener('click', function() {
    if (quantidade < preco_fazenda) return;

    quantidade -= preco_fazenda;
    quantidade_fazenda++;
    preco_fazenda = Math.floor(preco_fazenda * 1.2); // preço sobe 20%
    
    // diminui delay do primeiro autoclicker, mínimo 100ms
    delay = Math.max(100, Math.floor(delay * 0.6)); 
    
    atualizarTitulo();

    // Atualiza ou cria o primeiro autoclicker
    if (intervaloAutoClick !== null) {
        clearInterval(intervaloAutoClick);
    }
    intervaloAutoClick = setInterval(() => {
        quantidade += 1;
        atualizarTitulo();
    }, delay);

    // Ativa ou atualiza o segundo autoclicker a partir de 10 fazendas
    if (quantidade_fazenda >= 10) {
        delay2 = Math.max(1, Math.floor(delay2 * 0.8)); // nunca menor que 1ms
        if (intervaloAutoClick2 !== null) {
            clearInterval(intervaloAutoClick2);
        }
        intervaloAutoClick2 = setInterval(() => {
            quantidade += 1;
            atualizarTitulo();
        }, delay2);
    }
});

// Atualiza todos os textos e estado visual da UI
function atualizarTitulo() {
    titulo.innerText = `Você tem ${quantidade} Charizards`;

    if (quantidade_fazenda > 0) {
        if (quantidade_fazenda === 1) {
            document.getElementById('quantidade_fazenda').innerText = `Você tem ${quantidade_fazenda} Fazenda`;
        } else {
            document.getElementById('quantidade_fazenda').innerText = `Você tem ${quantidade_fazenda} Fazendas`;
        }
    } else {
        document.getElementById('quantidade_fazenda').innerText = '';
    }

    // Cálculo dos ganhos por minuto
    let ganhosPorMinuto = 0;
    let infoTempo = [];
    if (intervaloAutoClick !== null) {
        ganhosPorMinuto += Math.floor(60000 / delay);
        infoTempo.push(`1 Charizard a cada ${(delay / 1000).toFixed(2)}s`);
    }
    if (intervaloAutoClick2 !== null) {
        ganhosPorMinuto += Math.floor(60000 / delay2);
        infoTempo.push(`1 Charizard a cada ${(delay2 / 1000).toFixed(3)}s`);
    }

    document.getElementById('valor_de_acrescento').innerText =
        `Você ganha ${ganhosPorMinuto} Charizards por minuto\n${infoTempo.join(' | ')}`;

    comprar1.innerText = `Comprar Fazenda (${preco_fazenda} Charizards)`;

    // Ativa/desativa o botão comprar fazenda baseado na quantidade
    if (quantidade < preco_fazenda) {
        comprar1.style.opacity = '0.5';
        comprar1.style.pointerEvents = 'none';
    } else {
        comprar1.style.opacity = '1';
        comprar1.style.pointerEvents = 'auto';
    }
    function atualizarTitulo() {
    // ... seu código atual ...

    // Mostrar ou esconder o botão transcender
    if (quantidade < 1000) {
        transcender.style.display = 'none';  // esconde o botão
    } else {
        transcender.style.display = 'inline-block'; // mostra o botão (ou 'block', depende do layout)
    }

    if (transcender_valor >= 3) {
        finalizar.style.display = 'flex'; // mostra o botão de finalizar  
    }
}
    atualizarTitulo(); // chama a função para atualizar o título e UI
}

// Para tocar musica de fundo
let musica = document.getElementById('musica');
let audio = new Audio('pokemon_musica.mp3');
const parado = 'diglipuff.png';
const tocando = 'diglipuff_tocando.png';    

audio.volume = 0.1; // volume baixo

musica.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        musica.src = tocando;
    } else {
        audio.pause();
        musica.src = parado;
    }
});

let finalizar = document.getElementById('finalizar');
finalizar.addEventListener('click', function() {
    window.location.href = 'fim.html';
});