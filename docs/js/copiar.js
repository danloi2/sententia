/**
 * js/copiar.js
 */

// ============================
// Prepare the text for clipboard
// ============================
function prepararCopia(button, data) {
  if (!data || typeof data !== "object") return;

  let finalText = "";

  // 1. Latin text wrapped in angular quotes
  if (data.la) {
    finalText += `« ${data.la} »\n\n`;
  }

  // 2. Original text (if different from Latin)
  if (data.orig && data.orig !== data.la) {
    finalText += `( ${data.orig} )\n\n`;
  }

  // 3. Spanish translation
  if (data.es) {
    finalText += `${data.es}\n\n`;
  }

  // 4. Author name
  finalText += `${data.autor ? data.autor : "Anónimo"}\n`;

  // 5. Reference (if exists)
  if (data.referencia) {
    finalText += `${data.referencia}\n`;
  }

  // 6. Context: era • language • nation
  if (data.contexto) {
    finalText += `${data.contexto}`;
  }

  ejecutarCopiado(button, finalText.trim());
}

// ============================
// Execute clipboard copy and provide feedback
// ============================
function ejecutarCopiado(button, text) {
  // Comprobación de seguridad para navegadores antiguos o entornos bloqueados
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    // Fallback para entornos donde la API está bloqueada (común en algunos WebViews de Linux)
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      mostrarFeedback(button);
    } catch (err) {
      alert("Error: Clipboard not accessible.");
    }
    document.body.removeChild(textArea);
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      mostrarFeedback(button);
    })
    .catch((err) => {
      console.error("Clipboard copy error:", err);
      mostrarErrorCopia(button);
    });
}

// Función auxiliar para el feedback visual
function mostrarFeedback(button) {
  const originalHTML = button.innerHTML;
  button.innerHTML = '<i class="bi bi-check-lg"></i> Copiatum!';
  
  // Manejamos las clases con seguridad
  button.classList.remove("btn-outline-primary");
  button.classList.add("btn-success");

  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.classList.remove("btn-success");
    button.classList.add("btn-outline-primary");
  }, 1500);
}

function mostrarErrorCopia(button) {
  const alertContainer = document.createElement("div");
  alertContainer.className = "alert alert-danger alert-dismissible fade show mt-3";
  alertContainer.innerHTML = `
    <strong>Error:</strong> No se pudo copiar.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  button.closest(".card-body")?.prepend(alertContainer);
}

// EXTREMADAMENTE IMPORTANTE: Exponer a global para que lecturajson.js la encuentre
window.prepararCopia = prepararCopia;