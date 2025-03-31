// Direcionamento de botão para >Landing Page<

function logado() {
  setTimeout(function () {
    window.location.href = "pages/P2.html";
  }, 500);
}

function gamepage() {
  window.location.href = "pages/gamepage.html";
}

const elements = document.querySelectorAll(".jogado, .curtir, .salvar");

elements.forEach((element) => {
  element.addEventListener("click", function () {
    // Adiciona a classe 'clicked' ao elemento
    element.classList.add("clicked");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");
  const mediaDisplay = document.getElementById("media-de-estrelas");
  let ratings = [4, 3, 5, 4];
  atualizarMedia();
  let avaliou = false;

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      if (avaliou) {
        alert("Você já avaliou este jogo!");
        return;
      }

      const rating = parseInt(this.getAttribute("data-value"));
      ratings.push(rating);
      avaliou = true;
      atualizarEstrelas(rating);
      atualizarMedia();
    });
  });

  function atualizarEstrelas(rating) {
    stars.forEach((star) => {
      star.classList.toggle(
        "active",
        parseInt(star.getAttribute("data-value")) <= rating
      );
    });
  }

  function atualizarMedia() {
    if (ratings.length === 0) return;
    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    const average = (sum / ratings.length).toFixed(1);
    mediaDisplay.textContent = average;
  }
});
