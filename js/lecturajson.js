/**
 * js/lecturajson.js
 */

document.addEventListener("DOMContentLoaded", () => {
    fetch("db/esaldi.json")
        .then(response => response.json())
        .then(data => {
            const citaAleatoria = data[Math.floor(Math.random() * data.length)];
            mostrarCita(citaAleatoria);
        })
        .catch(err => mostrarError("Error al cargar la base de datos."));
});

function mostrarCita(cita) {
    const container = document.getElementById("cita-container");
    
    // ORDEN CORRECTO: Epoca -> Idioma -> Nacion
    const metadatos = [
        cita.epoca_la, 
        cita.idioma_la, 
        cita.nacion_la
    ].filter(Boolean).join(" • ");

    const datosCopia = {
        la: cita.cita_la || "",
        orig: cita.cita_original || "",
        es: cita.cita_es || "",
        autor: cita.autor_la || cita.autor_es || "Anónimo",
        contexto: metadatos
    };
    
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
                        <div class="small text-muted">${escaparHTML(metadatos)}</div>
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

function escaparHTML(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function mostrarError(msg) {
    document.getElementById("cita-container").innerHTML = `<div class="alert alert-danger">${msg}</div>`;
}