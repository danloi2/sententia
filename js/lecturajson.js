/**
 * js/lecturajson.js - Lógica de inicio, estadísticas y carga de datos
 */

document.addEventListener("DOMContentLoaded", () => {
    fetch("db/esaldi.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) throw new Error("Base de datos vacía.");

            // 1. Calcular y mostrar estadísticas (Totales)
            renderStats(data);

            // 2. Seleccionar y mostrar una cita aleatoria al inicio
            const citaAleatoria = data[Math.floor(Math.random() * data.length)];
            mostrarCita(citaAleatoria);
        })
        .catch(err => {
            console.error(err);
            mostrarError("Error al cargar la sabiduría latina.");
        });
});

/**
 * Calcula el total de citas y autores únicos
 */
function renderStats(data) {
    const statsContainer = document.getElementById("stats-container");
    if (!statsContainer) return;

    const totalCitas = data.length;
    // Creamos un Set para contar autores únicos (sin repetir)
    const autoresUnicos = [...new Set(data.map(item => item.autor_la || item.autor_es))].length;

    statsContainer.innerHTML = `
        <div class="d-flex justify-content-center gap-3 mt-4 fade-in">
            <span class="small text-secondary bg-white border rounded-pill px-3 py-1 shadow-sm">
                <i class="bi bi-chat-quote-fill text-primary me-1"></i> 
                <strong>${totalCitas}</strong> Sententiae
            </span>
            <span class="small text-secondary bg-white border rounded-pill px-3 py-1 shadow-sm">
                <i class="bi bi-people-fill text-primary me-1"></i> 
                <strong>${autoresUnicos}</strong> Auctores
            </span>
        </div>
    `;
}

/**
 * Muestra la cita en una tarjeta elegante
 */
function mostrarCita(cita) {
    const container = document.getElementById("cita-container");
    
    // ORDEN DE METADATOS: Época primero, luego Idioma, luego Nación
    const metadatosArray = [
        cita.epoca_la, 
        cita.idioma_la, 
        cita.nacion_la
    ].filter(Boolean); // Filtra campos nulos o vacíos
    
    const contextoFormateado = metadatosArray.join(" • ");

    // Objeto de datos que será procesado por prepararCopia en copiar.js
    const datosCopia = {
        la: cita.cita_la || "",
        orig: cita.cita_original || "",
        es: cita.cita_es || "",
        autor: cita.autor_la || cita.autor_es || "Anónimo",
        contexto: contextoFormateado
    };
    
    // Escapar comillas para evitar errores en el atributo onclick
    const jsonCopia = JSON.stringify(datosCopia).replace(/'/g, "&apos;");

    container.innerHTML = `
        <div class="col-11 col-md-10 col-lg-8 fade-in">
            <div class="card border-0 shadow-lg">
                <div class="card-body p-4 p-md-5 border-start border-5 border-primary">
                    <blockquote class="blockquote mb-0 text-start">
                        
                        ${cita.cita_la ? `<p class="display-6 fw-bold text-primary mb-2">${escaparHTML(cita.cita_la)}</p>` : ''}
                        
                        ${cita.cita_original && cita.cita_original !== cita.cita_la ? 
                            `<p class="h6 fst-italic text-muted mb-3 opacity-75 small">${escaparHTML(cita.cita_original)}</p>` : ''}
                        
                        <p class="h5 text-dark border-top pt-3 mt-3">${escaparHTML(cita.cita_es)}</p>
                        
                    </blockquote>
                    
                    <figcaption class="blockquote-footer mt-4 text-end mb-0">
                        <strong class="text-dark">${escaparHTML(datosCopia.autor)}</strong>
                        <div class="small text-muted">
                            ${escaparHTML(contextoFormateado)}
                        </div>
                    </figcaption>

                    <div class="d-flex gap-2 mt-4 pt-3 border-top border-light">
                        <button class="btn btn-sm btn-outline-primary rounded-pill px-3" onclick='prepararCopia(this, ${jsonCopia})'>
                            <i class="bi bi-clipboard-check"></i> Copiare
                        </button>
                        <button class="btn btn-sm btn-primary rounded-pill px-3" onclick="location.reload()">
                            <i class="bi bi-shuffle"></i> Sententia Nova
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * Muestra un mensaje de error en el contenedor principal
 */
function mostrarError(msg) {
    document.getElementById("cita-container").innerHTML = `
        <div class="col-10 col-md-6 alert alert-danger shadow-sm text-start fade-in">
            <i class="bi bi-exclamation-circle-fill me-2"></i>
            <strong>Error:</strong> ${escaparHTML(msg)}
            <hr>
            <button class="btn btn-sm btn-danger" onclick="location.reload()">Reintentar</button>
        </div>`;
}

/**
 * Utilidad para evitar inyecciones XSS
 */
function escaparHTML(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}