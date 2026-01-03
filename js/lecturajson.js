/**
 * js/lecturajson.js
 * Lógica principal para JSON estático de citas.
 */

let CITAS = []; // variable global para usarla también en buscar.js

document.addEventListener("DOMContentLoaded", () => {
  const citaContainer = document.getElementById("cita-container");

  fetch("db/esaldi.json")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (!data || data.length === 0) throw new Error("Base de datos vacía.");
      CITAS = data; // guardar globalmente

      renderStats(data);

      const citaAleatoria = data[Math.floor(Math.random() * data.length)];
      mostrarCita(citaAleatoria);
    })
    .catch((err) => {
      console.error(err);
      mostrarError("Error al cargar las citas.");
    });
});

function renderStats(data) {
  const statsContainer = document.getElementById("stats-container");
  if (!statsContainer) return;

  const totalCitas = data.length;
  const autoresUnicos = [...new Set(data.map((item) => item.autor_la))].length;

  statsContainer.innerHTML = `
    <div class="row justify-content-center mt-4 fade-in">
      <div class="col-auto mb-2">
        <span class="small text-secondary bg-white border rounded-pill px-3 py-1 shadow-sm d-flex align-items-center">
          <i class="bi bi-chat-quote-fill text-primary me-1"></i> 
          <strong>${totalCitas}</strong><span class="ms-2">Sententiae</span>
        </span>
      </div>
      <div class="col-auto mb-2">
        <span class="small text-secondary bg-white border rounded-pill px-3 py-1 shadow-sm d-flex align-items-center">
          <i class="bi bi-people-fill text-primary me-1"></i> 
          <strong>${autoresUnicos}</strong><span class="ms-2"> Auctores</span>
        </span>
      </div>
    </div>`;
}

function mostrarCita(cita) {
  const container = document.getElementById("cita-container");
  const metadatosArray = [cita.epoca_la, cita.idioma_la, cita.nacion_la].filter(
    Boolean
  );
  const contextoFormateado = metadatosArray.join(" • ");

  const datosCopia = {
    la: cita.cita_la || "",
    orig: cita.cita_original || "",
    es: cita.cita_es || "",
    autor: cita.autor_la || "Anónimo",
    contexto: contextoFormateado,
  };

  const jsonCopia = JSON.stringify(datosCopia).replace(/'/g, "&apos;");

  container.innerHTML = `
    <div class="col-11 col-md-10 col-lg-8 fade-in mx-auto">
      <figure class="card border-0 shadow-lg" role="region" aria-label="Sententia">
        <div class="card-body p-4 p-md-5 border-start border-5 border-primary">
          <blockquote class="blockquote mb-0 text-start">
            ${
              cita.cita_la
                ? `<p class="display-6 fw-bold text-primary mb-2">${escaparHTML(
                    cita.cita_la
                  )}</p>`
                : ""
            }
            ${
              cita.cita_original && cita.cita_original !== cita.cita_la
                ? `<p class="h6 fst-italic text-muted mb-3 opacity-75 small">${escaparHTML(
                    cita.cita_original
                  )}</p>`
                : ""
            }
            <p class="h5 text-dark border-top pt-3 mt-3">${escaparHTML(
              cita.cita_es
            )}</p>
          </blockquote>
          <figcaption class="blockquote-footer mt-4 text-end mb-0">
            <strong class="text-dark">${escaparHTML(datosCopia.autor)}</strong>
            <div class="small text-muted">${escaparHTML(
              contextoFormateado
            )}</div>
          </figcaption>
          <div class="d-flex flex-wrap gap-2 mt-4 pt-3 border-top border-light">
            <button class="btn btn-sm btn-outline-primary rounded-pill px-3" onclick='prepararCopia(this, ${jsonCopia})'>
              <i class="bi bi-clipboard-check"></i> Copiare
            </button>
            <button class="btn btn-sm btn-primary rounded-pill px-3" onclick="location.reload()">
              <i class="bi bi-shuffle"></i> Sententia Nova
            </button>
          </div>
        </div>
      </figure>
    </div>`;
}

function mostrarError(msg) {
  document.getElementById("cita-container").innerHTML = `
    <div class="col-10 col-md-6 mx-auto alert alert-danger shadow-sm fade-in d-flex flex-column flex-md-row align-items-start gap-3">
      <div class="d-flex align-items-center">
        <i class="bi bi-exclamation-circle-fill me-2"></i>
        <strong>Error:</strong> ${escaparHTML(msg)}
      </div>
      <div class="mt-2 mt-md-0 ms-md-auto">
        <button class="btn btn-sm btn-danger" onclick="location.reload()">Reintentar</button>
      </div>
    </div>`;
}

function escaparHTML(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
