/**
 * js/buscar.js
 * Motor de búsqueda integral para la base de datos de citas.
 * * Funcionalidades clave:
 * 1. Filtrado en tiempo real sobre múltiples campos (Autor, Cita, Época, Nación, Idioma).
 * 2. Soporte para términos tanto en Latín como en Español.
 * 3. Gestión de interfaz: muestra una lista si hay varios resultados o la tarjeta directa si solo hay uno.
 * 4. Copia de seguridad del HTML original para restaurar la vista tras cerrar la búsqueda.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const searchForm = document.querySelector('form[role="search"]');
    const searchInput = document.getElementById("inputBuscar");
    const container = document.getElementById("cita-container");

    // Variable para almacenar el contenido original (la cita aleatoria) 
    // y poder restaurarlo al cerrar la lista de búsqueda.
    let backupHTML = container.innerHTML;

    // Escuchador del evento de envío del formulario
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue
        const query = searchInput.value.trim().toLowerCase();

        // Validación mínima: no buscar si hay menos de 2 caracteres
        if (query.length < 2) return;

        // Si no estamos viendo ya una lista de resultados, guardamos lo que hay en pantalla
        if (!document.getElementById("lista-resultados")) {
            backupHTML = container.innerHTML;
        }

        // Obtención de datos y lógica de filtrado
        fetch("db/esaldi.json")
            .then(response => response.json())
            .then(data => {
                const resultados = data.filter(item => {
                    /**
                     * Definimos los campos donde el buscador va a "bucear".
                     * Incluimos versiones en latín (_la) y español (_es) para que 
                     * el usuario encuentre "Edad Media" tanto como "Medium Aevum".
                     */
                    const campos = [
                        item.autor_la, item.autor_es, 
                        item.cita_la, item.cita_es,
                        item.nacion_la, item.nacion_es, 
                        item.idioma_la, item.idioma_es,
                        item.epoca_la, item.epoca_es
                    ];
                    
                    // Comprobamos si alguno de los campos contiene la palabra buscada
                    return campos.some(f => f && f.toLowerCase().includes(query));
                });

                // --- GESTIÓN DE RESULTADOS ---
                if (resultados.length === 1) {
                    // Si solo hay un resultado, mostramos la tarjeta directamente
                    mostrarCita(resultados[0]);
                    searchInput.value = "";
                } else if (resultados.length > 1) {
                    // Si hay varios, desplegamos la lista de selección
                    mostrarLista(resultados, query);
                } else {
                    // Si no hay nada, mostramos mensaje de error (en latín para mantener el estilo)
                    mostrarError(`Nullum responsum pro: "${query}"`);
                }
            });
    });

    /**
     * Renderiza una lista de botones con los resultados encontrados.
     * @param {Array} lista - Array de objetos filtrados.
     * @param {string} query - El término que el usuario buscó.
     */
    function mostrarLista(lista, query) {
        container.innerHTML = `
            <div id="lista-resultados" class="col-11 col-md-10 col-lg-8 fade-in">
                <div class="card border-0 shadow-lg">
                    <div class="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                        <h5 class="text-primary mb-0 fw-bold">
                            <i class="bi bi-search me-2"></i>${lista.length} Resultata
                        </h5>
                        <button type="button" class="btn-close" id="btnCerrar" aria-label="Close"></button>
                    </div>
                    
                    <div class="card-body p-4" style="max-height: 50vh; overflow-y: auto;">
                        <div class="list-group list-group-flush">
                            ${lista.map(item => {
                                // Preparamos el objeto para pasarlo como string a la función mostrarCita
                                const itemData = JSON.stringify(item).replace(/'/g, "&apos;");
                                return `
                                <button type="button" class="list-group-item list-group-item-action border-0 rounded-3 mb-2 shadow-sm p-3"
                                    onclick='mostrarCita(${itemData})'>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="fw-bold text-dark">${item.autor_la || item.autor_es}</span>
                                        <span class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle small">
                                            ${item.epoca_la || ""}
                                        </span>
                                    </div>
                                    <div class="small text-muted text-truncate mt-1">${item.cita_la}</div>
                                </button>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>`;

        // Lógica del botón cerrar: restaura la cita aleatoria que estaba antes de buscar
        document.getElementById("btnCerrar").onclick = () => { 
            container.innerHTML = backupHTML; 
            searchInput.value = "";
        };
    }
});