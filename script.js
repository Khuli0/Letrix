    const palavraSecreta = "CARTA";
    const tabuleiro = document.getElementById("tabuleiro");
    const caixaInfo = document.getElementById("caixa-informacoes");
    const input = document.getElementById("entrada");
    const botoesTeclado = document.querySelectorAll(".teclado button");

    let palavraAtual = "";

    function atualizarCaixas() {
  for (let i = 0; i < 5; i++) {
    const caixa = document.getElementById("c" + i);
    caixa.textContent = palavraAtual[i] || "";
    caixa.classList.remove("ativa"); // remove de todos
  }

  // adiciona "ativa" na próxima caixa livre
  if (palavraAtual.length < 5) {
    const ativa = document.getElementById("c" + palavraAtual.length);
    ativa.classList.add("ativa");
  }
}


    function apagarLetra() {
      palavraAtual = palavraAtual.slice(0, -1);
      atualizarCaixas();
    }

    function adicionarLetra(letra) {
      if (palavraAtual.length < 5) {
        palavraAtual += letra;
        atualizarCaixas();
      }
    }

    function enviarPalavra() {
      if (palavraAtual.length !== 5) {
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

      verificarPalavra(palavraAtual);
      palavraAtual = "";
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

      atualizarMensagem(`${certas} letra${certas !== 1 ? "s" : "" } no lugar certo e ${lugarErrado} no lugar errado.`);
    }

    function atualizarMensagem(mensagem) {
      caixaInfo.textContent = mensagem;
    }

    // Teclado virtual
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

    // Teclado físico
    document.addEventListener("keydown", e => {
      const tecla = e.key.toUpperCase();
      if (tecla === "ENTER") {
        enviarPalavra();
      } else if (tecla === "BACKSPACE") {
        apagarLetra();
      } else if (/^[A-ZÇ]$/.test(tecla)) {
        adicionarLetra(tecla);
      }
    });


const modal = document.getElementById("infoModal");
const abrirBtn = document.getElementById("openModal");

abrirBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
