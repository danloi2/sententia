/**
 * Lógica de búsqueda integral: Autor, Cita, Idioma y Nación
 */
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector('form[role="search"]');
    const searchInput = document.getElementById("inputBuscar");
    const container = document.getElementById("cita-container");

    let ultimaCitaAleatoriaHTML = container.innerHTML;

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();

        if (query.length < 2) return;

        if (!document.getElementById("lista-resultados")) {
            ultimaCitaAleatoriaHTML = container.innerHTML;
        }

        fetch("db/esaldi.json")
            .then(response => response.json())
            .then(data => {
                const resultados = data.filter(item => {
                    // Campos de texto y autor
                    const textFields = [
                        item.autor_la, item.autor_es, 
                        item.cita_la, item.cita_es,
                        item.cita_original
                    ];
                    // Campos de metadatos (Nación e Idioma)
                    const metaFields = [
                        item.nacion_la, item.nacion_es, 
                        item.idioma_la, item.idioma_es
                    ];

                    // Combinamos todos y verificamos si alguno incluye la búsqueda
                    return [...textFields, ...metaFields].some(field => 
                        field && field.toLowerCase().includes(query)
                    );
                });

                if (resultados.length === 1) {
                    mostrarCita(resultados[0]);
                    searchInput.value = "";
                } else if (resultados.length > 1) {
                    mostrarListaResultados(resultados, query);
                } else {
                    mostrarError(`Nullum responsum inventum pro: "${escaparHTML(query)}"`);
                }
            })
            .catch(err => {
                console.error("Search error:", err);
                mostrarError("Error in investigatione.");
            });
    });

    function mostrarListaResultados(lista, query) {
        container.innerHTML = `
            <div id="lista-resultados" class="col-11 col-md-10 col-lg-8 fade-in">
                <div class="card border-0 shadow-lg">
                    <div class="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                        <h5 class="text-primary mb-0 fw-bold">
                            <i class="bi bi-search me-2"></i>${lista.length} Resultata
                        </h5>
                        <button type="button" class="btn-close" aria-label="Close" id="btnCerrarBusqueda"></button>
                    </div>
                    <div class="card-body p-4" style="max-height: 50vh; overflow-y: auto;">
                        <div class="list-group list-group-flush">
                            ${lista.map((item) => {
                                const itemData = JSON.stringify(item).replace(/'/g, "&apos;");
                                return `
                                <button type="button" 
                                    class="list-group-item list-group-item-action border-0 rounded-3 mb-2 shadow-sm p-3"
                                    onclick='mostrarCita(${itemData})'>
                                    <div class="d-flex justify-content-between">
                                        <span class="fw-bold text-dark">${escaparHTML(item.autor_la || item.autor_es)}</span>
                                        <span class="badge rounded-pill bg-light text-primary border">${escaparHTML(item.nacion_la || "")}</span>
                                    </div>
                                    <div class="small text-muted text-truncate mt-1">${escaparHTML(item.cita_la)}</div>
                                </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <div class="card-footer bg-light border-0 text-center py-2">
                        <small class="text-secondary opacity-75">Terminus: "${escaparHTML(query)}"</small>
                    </div>
                </div>
            </div>`;

        document.getElementById("btnCerrarBusqueda").addEventListener("click", () => {
            container.innerHTML = ultimaCitaAleatoriaHTML;
            searchInput.value = "";
        });
    }
});