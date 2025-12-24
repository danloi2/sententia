/**
 * js/copiar.js
 * Módulo encargado de la exportación de citas al portapapeles.
 * * Este script transforma el objeto de datos de la cita en un bloque de texto 
 * con formato enriquecido (estilo Quotation) y gestiona la interacción 
 * visual del botón (feedback) tras la acción.
 */

/**
 * Procesa los datos de la cita y construye el String con formato decorativo.
 * @param {HTMLElement} btn - El botón que disparó la acción (para cambiar su estado visual).
 * @param {Object} datos - Objeto con los campos: la, orig, es, autor, contexto.
 */
function prepararCopia(btn, datos) {
    let textoFinal = "";
    
    // 1. Texto principal en Latín: Se envuelve en comillas latinas/angulares « »
    if (datos.la) {
        textoFinal += `« ${datos.la} »\n\n`;
    }
    
    // 2. Texto original: Si la fuente es Griego o Chino, se añade entre paréntesis
    // Solo se añade si es diferente a la cita en latín para evitar redundancia.
    if (datos.orig && datos.orig !== datos.la) {
        textoFinal += `( ${datos.orig} )\n\n`;
    }
    
    // 3. Traducción al español: Texto plano para facilitar la lectura.
    if (datos.es) {
        textoFinal += `${datos.es}\n\n`;
    }
    
    // 4. Separador visual: Una línea de guiones largos para dar aspecto de edición impresa.
    textoFinal += `––––––––––––––––––––––––\n`;
    
    // 5. Firma: El autor se convierte a MAYÚSCULAS para resaltar la autoridad de la fuente.
    textoFinal += `${datos.autor.toUpperCase()}\n`;
    
    // 6. Contexto: Época, Idioma y Nación (ya formateados con puntos '•' desde lecturajson.js).
    if (datos.contexto) {
        textoFinal += `${datos.contexto}`;
    }

    // Enviamos el bloque construido a la función que interactúa con el sistema
    ejecutarCopiado(btn, textoFinal);
}

/**
 * Ejecuta la copia física al portapapeles del sistema y gestiona el feedback visual.
 * Utiliza la API moderna 'navigator.clipboard'.
 * @param {HTMLElement} btn - El botón presionado.
 * @param {string} texto - El bloque de texto final ya procesado.
 */
function ejecutarCopiado(btn, texto) {
    navigator.clipboard.writeText(texto).then(() => {
        // --- ÉXITO: Feedback visual para el usuario ---
        const originalHTML = btn.innerHTML; // Guardamos el estado original (Icono + 'Copiare')
        
        // Cambiamos el texto y el color del botón (Bootstrap classes)
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Copiatum!';
        btn.classList.replace("btn-outline-primary", "btn-success");
        
        // Tras 1.5 segundos, revertimos el botón a su estado original
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.replace("btn-success", "btn-outline-primary");
        }, 1500);
        
    }).catch(err => {
        // --- ERROR: El navegador denegó el acceso o no es compatible ---
        console.error('Incapax de copiare:', err);
        alert("Error al copiar al portapapeles.");
    });
}