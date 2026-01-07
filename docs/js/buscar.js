/**
 * js/buscar.js
 *
 * Quote search module using static JSON loaded into CITAS.
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector('form[role="search"]');
  const searchInput = document.getElementById("inputBuscar");
  const container = document.getElementById("cita-container");
  let backupHTML = container.innerHTML; // Save original content

  // ============================
  // Handle search submission
  // ============================
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 2) return; 

    if (!document.getElementById("lista-resultados")) {
      backupHTML = container.innerHTML;
    }

    const resultados = CITAS.filter((item) => {
      return Object.values(item).some((val) =>
        val && val.toString().toLowerCase().includes(query)
      );
    });

    if (resultados.length === 1) {
      if (typeof window.mostrarCita === "function") {
        window.mostrarCita(resultados[0]);
        searchInput.value = "";
      }
    } else if (resultados.length > 1) {
      mostrarLista(resultados, query);
    } else {
      mostrarError(`No results found for: "${query}"`);
    }
  });

  // ============================
  // Display multiple search results in a list
  // ============================
  function mostrarLista(lista, query) {
    // Guardamos los resultados para acceder a ellos desde el evento de clic
    window.listaResultadosActuales = lista;

    container.innerHTML = `
      <div id="lista-resultados" class="col-11 col-md-10 col-lg-8 mx-auto fade-in">
        <div class="card border-0 shadow-lg">
          <div class="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <h5 class="text-primary mb-0 fw-bold">
              <i class="bi bi-search me-2"></i> ${lista.length} Result(s)
            </h5>
            <button type="button" class="btn-close" id="btnCerrar" aria-label="Close results"></button>
          </div>
          <div class="card-body p-4" style="max-height: 50vh; overflow-y: auto;">
            <div class="list-group list-group-flush" id="contenedor-items-busqueda">
              ${lista
                .map(
                  (item, index) => `
                <button type="button" class="list-group-item list-group-item-action border-0 rounded-3 mb-2 shadow-sm p-3 item-resultado"
                  data-index="${index}">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold text-dark">${escaparHTML(item.autor_la || "Anonymous")}</span>
                    <span class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle small">${escaparHTML(item.epoca_la || "")}</span>
                  </div>
                  <div class="small text-muted text-truncate mt-1">${escaparHTML(item.cita_la || item.cita_es || "")}</div>
                </button>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>`;

    // Evento para cerrar y restaurar
    document.getElementById("btnCerrar")?.addEventListener("click", () => {
      container.innerHTML = backupHTML;
    });

    // Delegación de eventos para los items de la lista
    document.getElementById("contenedor-items-busqueda")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".item-resultado");
      if (btn && window.mostrarCita) {
        const index = btn.dataset.index;
        window.mostrarCita(window.listaResultadosActuales[index]);
      }
    });
  }

  // ============================
  // Display an error message
  // ============================
  function mostrarError(msg) {
    container.innerHTML = `
      <div class="col-10 col-md-6 mx-auto alert alert-danger shadow-sm fade-in d-flex flex-column flex-md-row align-items-start gap-3">
        <div class="d-flex align-items-center">
          <i class="bi bi-exclamation-circle-fill me-2"></i>
          <strong>Error:</strong> ${escaparHTML(msg)}
        </div>
        <div class="mt-2 mt-md-0 ms-md-auto">
          <button class="btn btn-sm btn-danger" id="btnRetry">Retry</button>
        </div>
      </div>`;
    
    document.getElementById("btnRetry")?.addEventListener("click", () => {
      location.reload();
    });
  }

  function escaparHTML(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
});