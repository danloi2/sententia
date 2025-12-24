/**
 * js/copiar.js - Gestión de formato enriquecido y portapapeles
 */

/**
 * Gestiona el formato del texto imitando un bloque de cita formal
 */
/**
 * js/copiar.js - Gestión de copia con formato Quotation
 */

function prepararCopia(btn, datos) {
    let textoFinal = "";
    
    // Texto principal en Latín con comillas elegantes
    if (datos.la) {
        textoFinal += `« ${datos.la} »\n\n`;
    }
    
    // Texto original (Griego, Chino, etc.) entre paréntesis si es distinto al latín
    if (datos.orig && datos.orig !== datos.la) {
        textoFinal += `( ${datos.orig} )\n\n`;
    }
    
    // Traducción al español
    if (datos.es) {
        textoFinal += `${datos.es}\n\n`;
    }
    
    // Separador visual de línea fina
    textoFinal += `––––––––––––––––––––––––\n`;
    
    // Autor en mayúsculas para dar jerarquía
    textoFinal += `${datos.autor.toUpperCase()}\n`;
    
    // Metadatos (Idioma y Nación) en la última línea
    if (datos.contexto) {
        textoFinal += `${datos.contexto}`;
    }

    ejecutarCopiado(btn, textoFinal);
}

/**
 * Ejecuta la copia y gestiona el feedback visual del botón
 */
function ejecutarCopiado(btn, texto) {
    navigator.clipboard.writeText(texto).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Copiatum!';
        btn.classList.replace("btn-outline-primary", "btn-success");
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.replace("btn-success", "btn-outline-primary");
        }, 1500);
    }).catch(err => {
        console.error('Incapax de copiare:', err);
    });
}

/**
 * Ejecuta la copia física al portapapeles y gestiona el feedback visual
 */
function ejecutarCopiado(btn, texto) {
    navigator.clipboard.writeText(texto).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Copiatum!';
        btn.classList.replace("btn-outline-primary", "btn-success");
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.replace("btn-success", "btn-outline-primary");
        }, 1500);
    }).catch(err => {
        console.error('Error al copiar: ', err);
        alert("Error al copiar al portapapeles.");
    });
}