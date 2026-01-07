/**
 * js/copiar.js
 *
 * Module responsible for copying the displayed quote to the clipboard.
 * Supports static JSON structure used in the application.
 *
 * Features:
 *  - Formats text with Latin quotes, original text, translation, author, reference, and context
 *  - Provides visual feedback on successful copy
 *  - Handles errors gracefully
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

  // Trigger the actual clipboard copy
  ejecutarCopiado(button, finalText.trim());
}

// ============================
// Execute clipboard copy and provide feedback
// ============================
function ejecutarCopiado(button, text) {
  if (!navigator.clipboard) {
    alert("Your browser does not support the Clipboard API.");
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Change button temporarily to show success
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i class="bi bi-check-lg"></i> Copiatum!';
      button.classList.replace("btn-outline-primary", "btn-success");

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.replace("btn-success", "btn-outline-primary");
      }, 1500);
    })
    .catch((err) => {
      console.error("Clipboard copy error:", err);

      // Display an alert within the card if copying fails
      const alertContainer = document.createElement("div");
      alertContainer.className =
        "alert alert-danger alert-dismissible fade show mt-3";
      alertContainer.role = "alert";
      alertContainer.innerHTML = `
        <strong>Error:</strong> Could not copy to clipboard.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      button.closest(".card-body")?.prepend(alertContainer);
    });
}
