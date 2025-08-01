// VARIÁVEIS PRINCIPAIS
const palavraSecreta = "PERTO";
const tabuleiro = document.getElementById("tabuleiro");
const caixaInfo = document.getElementById("caixa-informacoes");
const input = document.getElementById("entrada");
const botoesTeclado = document.querySelectorAll(".teclado button");
const botaoDica = document.getElementById("botaoDica");
const boxesDica = document.querySelectorAll(".box-dica");

let tentativas = 0;
let palavraAtual = ["", "", "", "", ""];
let posicaoAtual = 0;
let dicasUsadas = [];

// FUNÇÃO ATUALIZAR ENTRADA
function atualizarCaixas() {
  for (let i = 0; i < 5; i++) {
    const caixa = document.getElementById("c" + i);
    caixa.textContent = palavraAtual[i];
    caixa.classList.remove("ativa");
  }
  if (posicaoAtual < 5) {
    document.getElementById("c" + posicaoAtual).classList.add("ativa");
  }
}

function apagarLetra() {
  if (posicaoAtual > 0 && palavraAtual[posicaoAtual] === "") {
    posicaoAtual--;
  }
  palavraAtual[posicaoAtual] = "";
  atualizarCaixas();
}

function adicionarLetra(letra) {
  if (posicaoAtual < 5) {
    palavraAtual[posicaoAtual] = letra;
    if (posicaoAtual < 4) posicaoAtual++;
    atualizarCaixas();
  }
}

function enviarPalavra() {
  if (palavraAtual.includes("")) {
    atualizarMensagem("Digite exatamente 5 letras.");
    return;
  }

  const linha = document.createElement("div");
  linha.classList.add("linha-tabuleiro");

  for (let letra of palavraAtual) {
    const caixa = document.createElement("div");
    caixa.classList.add("caixa");
    caixa.textContent = letra;
    linha.appendChild(caixa);
  }

  tabuleiro.appendChild(linha);
  tabuleiro.scrollTop = tabuleiro.scrollHeight;

  tentativas++;
  document.getElementById("contador-tentativas").textContent = `Tentativas: ${tentativas}`;

  verificarPalavra(palavraAtual.join(""));
  palavraAtual = ["", "", "", "", ""];
  posicaoAtual = 0;
  atualizarCaixas();
}

function verificarPalavra(palavra) {
  let certas = 0;
  let lugarErrado = 0;
  let letrasUsadas = {};

  for (let i = 0; i < 5; i++) {
    if (palavra[i] === palavraSecreta[i]) {
      certas++;
      letrasUsadas[i] = true;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (palavra[i] !== palavraSecreta[i]) {
      for (let j = 0; j < 5; j++) {
        if (
          palavra[i] === palavraSecreta[j] &&
          palavra[j] !== palavraSecreta[j] &&
          !letrasUsadas[j]
        ) {
          lugarErrado++;
          letrasUsadas[j] = true;
          break;
        }
      }
    }
  }

  atualizarMensagem(`${certas} letra${certas !== 1 ? "s" : ""} no lugar certo e ${lugarErrado} no lugar errado.`);
}

function atualizarMensagem(mensagem) {
  caixaInfo.textContent = mensagem;
}

// TECLADO VIRTUAL
botoesTeclado.forEach(botao => {
  botao.addEventListener("click", () => {
    const valor = botao.textContent;
    if (valor === "←") {
      apagarLetra();
    } else if (valor === "ENTER") {
      enviarPalavra();
    } else {
      adicionarLetra(valor);
    }
    input.focus();
  });
});

// TECLADO FÍSICO
document.addEventListener("keydown", e => {
  const tecla = e.key.toUpperCase();

  if (tecla === "ENTER") {
    enviarPalavra();
  } else if (tecla === "BACKSPACE") {
    apagarLetra();
  } else if (tecla === "ARROWLEFT") {
    if (posicaoAtual > 0) posicaoAtual--;
    atualizarCaixas();
  } else if (tecla === "ARROWRIGHT") {
    if (posicaoAtual < 4) posicaoAtual++;
    atualizarCaixas();
  } else if (/^[A-ZÇ]$/.test(tecla)) {
    adicionarLetra(tecla);
  }
});

// MODAIS
const infoModal = document.getElementById("infoModal");
const openModalInfo = document.getElementById("openModalInfo");
const instructionsModal = document.getElementById("instructionsModal");
const openModalInstructions = document.getElementById("openModalInstructions");

openModalInfo.addEventListener("click", () => {
  infoModal.style.display = "flex";
});

openModalInstructions.addEventListener("click", () => {
  instructionsModal.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target === infoModal) infoModal.style.display = "none";
  if (e.target === instructionsModal) instructionsModal.style.display = "none";
});

// DICA - Mostra na linha de dica visual
botaoDica.addEventListener("click", () => {
  const posicoesDisponiveis = [];
  for (let i = 0; i < palavraSecreta.length; i++) {
    if (!dicasUsadas.includes(i)) {
      posicoesDisponiveis.push(i);
    }
  }

  if (posicoesDisponiveis.length === 0) {
    atualizarMensagem("Todas as letras já foram reveladas.");
    botaoDica.disabled = true;
    botaoDica.style.opacity = "0.6";
    botaoDica.style.cursor = "default";
    return;
  }

  const posicao = posicoesDisponiveis[Math.floor(Math.random() * posicoesDisponiveis.length)];
  dicasUsadas.push(posicao);

  const box = document.getElementById("d" + posicao);
  box.textContent = palavraSecreta[posicao];
  box.classList.add("certa");
});
