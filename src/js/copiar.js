/**
 * js/copiar.js
 * Módulo encargado de exportar citas al portapapeles.
 * Compatible con JSON estático.
 */

function prepararCopia(btn, datos) {
  if (!datos || typeof datos !== "object") return;

  let textoFinal = "";

  // 1. Texto en Latín entre comillas angulares
  if (datos.la) {
    textoFinal += `« ${datos.la} »\n\n`;
  }

  // 2. Texto original (si distinto del latín)
  if (datos.orig && datos.orig !== datos.la) {
    textoFinal += `( ${datos.orig} )\n\n`;
  }

  // 3. Traducción al español
  if (datos.es) {
    textoFinal += `${datos.es}\n\n`;
  }

  // 4. Autor
  textoFinal += `${datos.autor ? datos.autor : "Anónimo"}\n`;

  // 5. Referencia (si existe)
  if (datos.referencia) {
    textoFinal += `${datos.referencia}\n`;
  }

  // 6. Contexto: época • idioma • nación
  if (datos.contexto) {
    textoFinal += `${datos.contexto}`;
  }

  ejecutarCopiado(btn, textoFinal.trim());
}

function ejecutarCopiado(btn, texto) {
  if (!navigator.clipboard) {
    alert("Tu navegador no soporta la API de portapapeles.");
    return;
  }

  navigator.clipboard
    .writeText(texto)
    .then(() => {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-lg"></i> Copiatum!';
      btn.classList.replace("btn-outline-primary", "btn-success");

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.replace("btn-success", "btn-outline-primary");
      }, 1500);
    })
    .catch((err) => {
      console.error("Error al copiar:", err);

      const alertContainer = document.createElement("div");
      alertContainer.className =
        "alert alert-danger alert-dismissible fade show mt-3";
      alertContainer.role = "alert";
      alertContainer.innerHTML = `
        <strong>Error:</strong> No se pudo copiar al portapapeles.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      btn.closest(".card-body")?.prepend(alertContainer);
    });
}
