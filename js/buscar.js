/**
 * js/buscar.js
 * Búsqueda de citas usando JSON estático cargado en CITAS.
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector('form[role="search"]');
  const searchInput = document.getElementById("inputBuscar");
  const container = document.getElementById("cita-container");
  let backupHTML = container.innerHTML;

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 2) return;

    if (!document.getElementById("lista-resultados")) {
      backupHTML = container.innerHTML;
    }

    // Filtrar resultados
    const resultados = CITAS.filter(item => {
      return Object.values(item).some(val =>
        val && val.toString().toLowerCase().includes(query)
      );
    });

    if (resultados.length === 1) {
      mostrarCita(resultados[0]);
      searchInput.value = "";
    } else if (resultados.length > 1) {
      mostrarLista(resultados, query);
    } else {
      mostrarError(`Nullum responsum pro: "${query}"`);
    }
  });

  function mostrarLista(lista, query) {
    // Guardamos la lista globalmente para usar índices
    window.listaResultados = lista;

    container.innerHTML = `
      <div id="lista-resultados" class="col-11 col-md-10 col-lg-8 mx-auto fade-in">
        <div class="card border-0 shadow-lg">
          <div class="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <h5 class="text-primary mb-0 fw-bold">
              <i class="bi bi-search me-2"></i> ${lista.length} Resultata
            </h5>
            <button type="button" class="btn-close" id="btnCerrar" aria-label="Cerrar resultados"></button>
          </div>
          <div class="card-body p-4" style="max-height: 50vh; overflow-y: auto;">
            <div class="list-group list-group-flush">
              ${lista.map((item, index) => `
                <button type="button" class="list-group-item list-group-item-action border-0 rounded-3 mb-2 shadow-sm p-3"
                  onclick="mostrarCita(window.listaResultados[${index}])">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold text-dark">${item.autor_la || "Anónimo"}</span>
                    <span class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle small">${item.epoca_la || ""}</span>
                  </div>
                  <div class="small text-muted text-truncate mt-1">${item.cita_la || item.cita_es || ""}</div>
                </button>
              `).join("")}
            </div>
          </div>
        </div>
      </div>`;

    // Botón para cerrar resultados y restaurar backup
    const btnCerrar = document.getElementById("btnCerrar");
    if (btnCerrar) btnCerrar.addEventListener("click", () => container.innerHTML = backupHTML);
  }

  function mostrarError(msg) {
    container.innerHTML = `
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
});

