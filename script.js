// Direcionamento de botão para >Landing Page<

function logado() {
  setTimeout(function () {
    window.location.href = "pages/P2.html";
  }, 500);
}

const elements = document.querySelectorAll(".jogado, .curtir, .salvar");

document.addEventListener("DOMContentLoaded", function () {
  const jogos = {
    dks: [4, 4, 5, 4],
    hollow: [5, 5, 4, 5],
    tlou: [4, 5, 5, 5],
    tunic: [5, 5, 3, 3],
  };

  function atualizarMedia(gameId) {
    const gameCard = document.querySelector(
      `.game-card[data-game-id="${gameId}"]`
    );
    if (!gameCard) return;

    const mediaDisplay = gameCard.querySelector(".media-de-estrelas");
    const stars = gameCard.querySelectorAll(".star");

    if (!jogos[gameId] || jogos[gameId].length === 0) return;
    const sum = jogos[gameId].reduce((acc, curr) => acc + curr, 0);
    const average = (sum / jogos[gameId].length).toFixed(1);

    mediaDisplay.textContent = average;
    atualizarEstrelas(stars, Math.round(average));
  }

  function atualizarEstrelas(stars, rating) {
    console.log(
      "Atualizando estrelas para:",
      rating,
      "Estrelas encontradas:",
      stars.length
    );
    stars.forEach((star) => {
      star.classList.toggle(
        "active",
        parseInt(star.getAttribute("data-value")) <= rating
      );
    });
  }

  document.querySelectorAll(".game-card").forEach((card) => {
    const gameId = card.getAttribute("data-game-id");
    atualizarMedia(gameId);
  });

  const modal = document.getElementById("modal-resenha");
  const fecharModal = document.querySelector(".fechar-modal");
  const starsModal = document.querySelectorAll(".star-modal");
  const botaoEnviar = document.getElementById("enviar-resenha");
  let classificacaoSelecionada = 0;
  let jogoSelecionado = "";

  document.querySelectorAll(".registre").forEach((botao) => {
    botao.addEventListener("click", function () {
      jogoSelecionado = this.getAttribute("data-game-id");

      if (!jogoSelecionado) {
        alert("Erro: Nenhum jogo foi selecionado.");
        return;
      }

      modal.style.display = "block";
    });
  });

  if (fecharModal) {
    fecharModal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  starsModal.forEach((star) => {
    star.addEventListener("click", function () {
      classificacaoSelecionada = parseInt(this.getAttribute("data-value"));
      atualizarEstrelasModal(classificacaoSelecionada);
    });
  });

  function atualizarEstrelasModal(rating) {
    starsModal.forEach((star) => {
      star.classList.toggle(
        "active",
        parseInt(star.getAttribute("data-value")) <= rating
      );
    });
  }

  if (botaoEnviar) {
    botaoEnviar.addEventListener("click", function () {
      const textoResenha = document.getElementById("texto-resenha").value;

      if (!jogoSelecionado) {
        alert("Erro ao identificar o jogo.");
        return;
      }

      if (classificacaoSelecionada === 0) {
        alert("Por favor, selecione uma nota antes de enviar!");
        return;
      }

      if (textoResenha.trim() === "") {
        alert("Por favor, escreva sua resenha!");
        return;
      }

      alert("Resenha enviada com sucesso!");
      modal.style.display = "none";

      if (!jogos[jogoSelecionado]) jogos[jogoSelecionado] = [];
      jogos[jogoSelecionado].push(classificacaoSelecionada);
      atualizarMedia(jogoSelecionado);

      document.getElementById("texto-resenha").value = "";
      classificacaoSelecionada = 0;
    });
  }
});
