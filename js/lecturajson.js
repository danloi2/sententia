/**
 * Lógica de inicio y carga de datos
 */
document.addEventListener("DOMContentLoaded", () => {
    fetch("db/esaldi.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) throw new Error("Base de datos vacía.");
            const citaAleatoria = data[Math.floor(Math.random() * data.length)];
            mostrarCita(citaAleatoria);
        })
        .catch(err => {
            console.error(err);
            mostrarError("Error al cargar la sabiduría latina.");
        });
});

/**
 * Muestra la cita en una tarjeta elegante con jerarquía de tamaños
 */
function mostrarCita(cita) {
    const container = document.getElementById("cita-container");
    const textoACopiar = `${cita.cita_la || cita.cita_es} — ${cita.autor_la || 'Anónimo'}`;

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
                        <strong class="text-dark">${escaparHTML(cita.autor_la || cita.autor_es || "Anónimo")}</strong>
                        <div class="small text-muted">
                            ${escaparHTML([cita.idioma_la, cita.nacion_la].filter(Boolean).join(" • "))}
                        </div>
                    </figcaption>

                    <div class="d-flex gap-2 mt-4 pt-3 border-top border-light">
                        <button class="btn btn-sm btn-outline-primary rounded-pill px-3" onclick="copiarTexto(this, '${escaparHTML(textoACopiar)}')">
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

function mostrarError(msg) {
    document.getElementById("cita-container").innerHTML = `
        <div class="col-10 col-md-6 alert alert-danger shadow-sm text-start fade-in">
            <i class="bi bi-exclamation-circle-fill me-2"></i>
            <strong>Error:</strong> ${escaparHTML(msg)}
            <hr>
            <button class="btn btn-sm btn-danger" onclick="location.reload()">Reintentar</button>
        </div>`;
}

function copiarTexto(btn, texto) {
    navigator.clipboard.writeText(texto).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Copiatum!';
        btn.classList.replace("btn-outline-primary", "btn-success");
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.replace("btn-success", "btn-outline-primary");
        }, 1500);
    });
}

function escaparHTML(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}