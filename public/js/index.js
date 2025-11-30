const API = "http://localhost:3001/destinos";

async function carregarDestinos() {
  try {
    const res = await fetch(API);
    const destinos = await res.json();
    gerarCarrossel(destinos);
    gerarCards(destinos);
  } catch (err) {
    console.error("Erro ao carregar destinos:", err);
  }
}

function gerarCarrossel(destinos) {
  const container = document.getElementById("carousel-container");
  if (!container) return;

  let indicadores = "";
  let slides = "";

  destinos.forEach((destino, index) => {
    indicadores += `<button type="button" data-bs-target="#carousel" data-bs-slide-to="${index}" class="${index === 0 ? "active" : ""}"></button>`;

    slides += `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <a href="detalhes.html?id=${destino.id}">
          <img src="${destino.imagem}" class="d-block w-100" style="height: 450px; object-fit: cover;">
        </a>
        <div class="carousel-caption d-none d-md-block bg-black bg-opacity-75 p-3 rounded">
          <h5 class="text-white fw-bold">${destino.titulo}</h5>
          <p>${(destino.conteudo || "").substring(0, 80)}...</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div id="carousel" class="carousel slide w-50 mx-auto mt-4 mb-5" data-bs-ride="carousel">
      <div class="carousel-indicators">${indicadores}</div>
      <div class="carousel-inner">${slides}</div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  `;
}

function gerarCards(destinos) {
  const container = document.getElementById("cards-cidades");
  if (!container) return;

  let html = "";

  destinos.forEach(destino => {
    html += `
      <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
        <a href="detalhes.html?id=${destino.id}" class="text-decoration-none w-100">
          <div class="card w-75 h-100 shadow-sm">
            <img src="${destino.imagem}" class="card-img-top" alt="${destino.titulo}">
            <div class="card-body text-center">
              <h5 class="card-title">${destino.titulo}</h5>
            </div>
          </div>
        </a>
      </div>
    `;
  });

  container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", carregarDestinos);
