/**
 * js/lecturajson.js
 * * Lógica principal de la aplicación:
 * 1. Carga la base de datos desde un archivo JSON.
 * 2. Calcula estadísticas globales (total de citas y autores).
 * 3. Renderiza una cita aleatoria con un diseño de tarjeta elegante.
 * 4. Gestiona errores de carga y seguridad (XSS).
 */

// Se ejecuta automáticamente cuando el HTML ha sido cargado completamente
document.addEventListener("DOMContentLoaded", () => {
    // Petición asíncrona para obtener el archivo de base de datos
    fetch("db/esaldi.json")
        .then(response => {
            // Verificación técnica: Si el archivo no existe o hay error de servidor
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            // Verificación de contenido: Si el JSON está vacío
            if (!data || data.length === 0) throw new Error("Base de datos vacía.");

            // 1. Generar los contadores de la parte inferior
            renderStats(data);

            // 2. Algoritmo de selección aleatoria: Índice entre 0 y longitud del array
            const citaAleatoria = data[Math.floor(Math.random() * data.length)];
            
            // 3. Pintar la cita seleccionada en el HTML
            mostrarCita(citaAleatoria);
        })
        .catch(err => {
            // Captura cualquier error en la cadena anterior y lo muestra al usuario
            console.error(err);
            mostrarError("Error al cargar la sabiduría latina.");
        });
});

/**
 * Calcula y muestra el total de citas y autores únicos.
 * @param {Array} data - El array completo de objetos del JSON.
 */
function renderStats(data) {
    const statsContainer = document.getElementById("stats-container");
    if (!statsContainer) return; // Seguridad: Si el contenedor no existe en el HTML, no hace nada

    // El total de citas es simplemente el tamaño del array
    const totalCitas = data.length;

    /**
     * Cálculo de autores únicos:
     * 1. .map extrae todos los nombres de autores.
     * 2. new Set() elimina automáticamente los duplicados.
     * 3. El operador [...] convierte el Set de nuevo a un Array para medir su .length
     */
    const autoresUnicos = [...new Set(data.map(item => item.autor_la || item.autor_es))].length;

    // Inyección de las píldoras de información en el footer del main
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
 * Construye la interfaz visual (tarjeta) para la cita seleccionada.
 * @param {Object} cita - El objeto individual que contiene los textos y metadatos.
 */
function mostrarCita(cita) {
    const container = document.getElementById("cita-container");
    
    /**
     * Gestión de metadatos (Línea inferior de la cita):
     * Se crea un array con el orden: Época -> Idioma -> Nación.
     * .filter(Boolean) elimina elementos si el campo en el JSON está vacío.
     * .join(" • ") añade el punto separador solo donde es necesario.
     */
    const metadatosArray = [
        cita.epoca_la, 
        cita.idioma_la, 
        cita.nacion_la
    ].filter(Boolean);
    
    const contextoFormateado = metadatosArray.join(" • ");

    // Prepara un objeto limpio para que la función de copiar (copiar.js) lo procese
    const datosCopia = {
        la: cita.cita_la || "",
        orig: cita.cita_original || "",
        es: cita.cita_es || "",
        autor: cita.autor_la || cita.autor_es || "Anónimo",
        contexto: contextoFormateado
    };
    
    /**
     * Serialización para el atributo 'onclick':
     * Convertimos el objeto a string y escapamos comillas simples para que
     * el HTML no se rompa al pasar el objeto a la función 'prepararCopia'.
     */
    const jsonCopia = JSON.stringify(datosCopia).replace(/'/g, "&apos;");

    // Construcción del HTML dinámico mediante Template Literals
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
 * Renderiza un componente visual de error si falla el fetch o el procesamiento.
 * @param {string} msg - Mensaje personalizado del error.
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
 * Función de saneamiento (Sanitize).
 * Convierte caracteres especiales en entidades HTML seguras para prevenir
 * ataques de Inyección de Código (XSS).
 */
function escaparHTML(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}