/**
 * js/lecturajson.js
 * * Main logic for loading and displaying static JSON quotes.
 */

// ============================
// Global variables
// ============================
let CITAS = []; 

// ============================
// Initialization: Load quotes on DOM ready
// ============================
document.addEventListener("DOMContentLoaded", () => {
  fetch("db/esaldi.json")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (!data || data.length === 0) throw new Error("Database is empty.");
      CITAS = data;

      renderStats(data);

      const randomQuote = data[Math.floor(Math.random() * data.length)];
      mostrarCita(randomQuote);
    })
    .catch((err) => {
      console.error(err);
      mostrarError("Error loading quotes.");
    });
});

// ============================
// Render statistics
// ============================
function renderStats(data) {
  const statsContainer = document.getElementById("stats-container");
  if (!statsContainer) return;

  const totalQuotes = data.length;
  const uniqueAuthors = [...new Set(data.map((item) => item.autor_la))].length;

  statsContainer.innerHTML = `
    <div class="row justify-content-center mt-4 fade-in">
      <div class="col-auto mb-2">
        <span class="small text-secondary bg-white border rounded-pill px-3 py-1 shadow-sm d-flex align-items-center">
          <i class="bi bi-chat-quote-fill text-primary me-1"></i> 
          <strong>${totalQuotes}</strong><span class="ms-2">Sententiae</span>
        </span>
      </div>
      <div class="col-auto mb-2">
        <span class="small text-secondary bg-white border rounded-pill px-3 py-1 shadow-sm d-flex align-items-center">
          <i class="bi bi-people-fill text-primary me-1"></i> 
          <strong>${uniqueAuthors}</strong><span class="ms-2">Auctores</span>
        </span>
      </div>
    </div>`;
}

// ============================
// Display a single quote in the UI
// ============================
function mostrarCita(quote) {
  const container = document.getElementById("cita-container");

  const metadataArray = [quote.epoca_la, quote.idioma_la, quote.nacion_la].filter(Boolean);
  const formattedContext = metadataArray.join(" • ");
  const formattedReference = quote.referencia && quote.referencia.trim() !== "" ? quote.referencia.trim() : null;
  const finalImage = quote.imagen && quote.imagen !== "0" ? quote.imagen : "./assets/empty.png";
  const imageText = quote.imagen_atr && quote.imagen_atr !== "0" ? quote.imagen_atr : quote.autor_la || "";

  const copyData = {
    la: quote.cita_la || "",
    orig: quote.cita_original || "",
    es: quote.cita_es || "",
    autor: quote.autor_la || "Anonymous",
    contexto: formattedContext,
    referencia: formattedReference || "",
  };

  // 1. Render HTML without onclick attributes
  container.innerHTML = `
    <div class="col-11 col-md-10 col-lg-8 fade-in mx-auto">
      <figure class="card border-0 shadow-lg" role="region" aria-label="Sententia" id="cita-print">
        <div class="card-body p-4 p-md-5">
          <div class="row g-4 align-items-start">

            <div class="col-12 col-md-4 text-center">
              <img
                src="${escaparHTML(finalImage)}"
                alt="Image associated with ${escaparHTML(quote.autor_la || "quote")}"
                class="img-fluid rounded shadow-sm mb-2"
                style="cursor: pointer;"
                data-bs-toggle="modal"
                data-bs-target="#imagenModal"
                data-atribucion="${escaparHTML(imageText)}"
              />
              ${imageText ? `<div class="small text-muted fst-italic">${escaparHTML(imageText)}</div>` : ""}
            </div>

            <div class="col-12 col-md-8 border-start border-5 border-primary ps-md-4">
              <blockquote class="blockquote mb-0 text-start">
                ${quote.cita_la ? `<p class="fs-3 fw-bold text-primary mb-2">${escaparHTML(quote.cita_la)}</p>` : ""}
                ${quote.cita_original && quote.cita_original !== quote.cita_la
                  ? `<p class="fst-italic text-muted mb-3 small">${escaparHTML(quote.cita_original)}</p>` : ""}
                ${quote.cita_es && quote.cita_es !== quote.cita_original
                  ? `<p class="h5 text-dark border-top pt-3 mt-3">${escaparHTML(quote.cita_es)}</p>` : ""}
              </blockquote>

              <figcaption class="blockquote-footer mt-4 text-end mb-0">
                <strong class="text-dark">${escaparHTML(copyData.autor)}</strong>
                ${copyData.referencia ? `<div class="mt-2"><span class="badge bg-light text-secondary border rounded-pill px-3 py-1"><i class="bi bi-book me-1"></i>${escaparHTML(copyData.referencia)}</span></div>` : ""}
                <div class="small text-muted mt-1">${escaparHTML(formattedContext)}</div>
              </figcaption>

              <div class="cita-acciones d-flex flex-wrap gap-2 mt-4 pt-3 border-top border-light">
                <button id="btn-copiar" class="btn btn-sm btn-outline-primary rounded-pill px-3">
                  <i class="bi bi-clipboard-check"></i> Copiare
                </button>

                <button id="btn-nueva" class="btn btn-sm btn-primary rounded-pill px-3">
                  <i class="bi bi-shuffle"></i> Sententia Nova
                </button>

                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-success dropdown-toggle rounded-pill px-3"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-file-earmark-arrow-down"></i> Exportare
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item btn-exportar" data-format="pdf" href="#">PDF</a></li>
                    <li><a class="dropdown-item btn-exportar" data-format="png" href="#">PNG</a></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </figure>
    </div>`;

  // 2. Attach Event Listeners manually after HTML is injected
  
  // Copy button
  document.getElementById("btn-copiar").addEventListener("click", function() {
    if (typeof window.prepararCopia === "function") {
      window.prepararCopia(this, copyData);
    }
  });

  // New quote button
  document.getElementById("btn-nueva").addEventListener("click", () => {
    location.reload();
  });

  // Export buttons
  document.querySelectorAll(".btn-exportar").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const format = el.getAttribute("data-format");
      if (window.imprimirCita) {
        window.imprimirCita(format);
      }
    });
  });
}

// ============================
// Display error message
// ============================
function mostrarError(msg) {
  document.getElementById("cita-container").innerHTML = `
    <div class="col-10 col-md-6 mx-auto alert alert-danger shadow-sm fade-in">
      <strong>Error:</strong> ${escaparHTML(msg)}
    </div>`;
}

// ============================
// Utility: Escape HTML
// ============================
function escaparHTML(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ============================
// Image modal logic
// ============================
document.addEventListener("click", (e) => {
  const img = e.target.closest("[data-bs-target='#imagenModal']");
  if (!img) return;

  const modalImg = document.getElementById("modalImagen");
  const modalAtr = document.getElementById("modalAtribucion");
  
  if (modalImg) {
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  }
  if (modalAtr) {
    modalAtr.textContent = img.dataset.atribucion || "";
  }
});