// Direcionamento de botão para >Landing Page<

function logado() {
  setTimeout(function () {
    window.location.href = "pages/P2.html";
  }, 500);
}

function gamepage() {
  window.location.href = "pages/gamepage.html";
}

let rankeamento = [];
const stars = document.querySelectorAll(".star");
const averageRatingEl = document.getElementById("media-de-estrelas");

stars.forEach((star) => {
  star.addEventListener("mouseover", function () {
    resetStars();
    const value = this.getAttribute("data-value");
    highlightStars(value);
  });

  star.addEventListener("click", function () {
    const value = parseInt(this.getAttribute("data-value"));
    rankeamento.push(value);
    updateAverageRating();
  });
});

function highlightStars(value) {
  for (let i = 0; i < value; i++) {
    stars[i].classList.add("filled");
  }
}

function resetStars() {
  stars.forEach((star) => star.classList.remove("filled"));
}

function updateAverageRating() {
  const sum = rankeamento.reduce((a, b) => a + b, 0);
  const average = (sum / rankeamento.length).toFixed(1);
  averageRatingEl.textContent = average;
}
