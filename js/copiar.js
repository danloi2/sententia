/**
 * js/copiar.js
 */

// ============================
// Prepare the text for clipboard
// ============================
function prepararCopia(button, data) {
  if (!data || typeof data !== 'object') return;

  let finalText = '';

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
  finalText += `${data.autor ? data.autor : 'Anónimo'}\n`;

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
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      mostrarFeedback(button);
    } catch (err) {
      alert('Error: Clipboard not accessible.');
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
      console.error('Clipboard copy error:', err);
      mostrarErrorCopia(button);
    });
}

// Función auxiliar para el feedback visual
function mostrarFeedback(button) {
  const originalHTML = button.innerHTML;
  button.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg> Copiatum!';
  // Cambiar estilos temporalmente para feedback
  button.classList.remove('border-primary-200', 'bg-white', 'text-primary-700');
  button.classList.add('bg-green-500', 'text-white', 'border-green-500');

  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.classList.remove('bg-green-500', 'text-white', 'border-green-500');
    button.classList.add('border-primary-200', 'bg-white', 'text-primary-700');
  }, 1500);
}

function mostrarErrorCopia(button) {
  const alertContainer = document.createElement('div');
  alertContainer.className =
    'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50';
  alertContainer.innerHTML = `
    <div class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
      </svg>
      <strong>Error:</strong> No se pudo copiar.
      <button type="button" class="ml-2 text-red-700 hover:text-red-900 flex items-center" onclick="this.parentElement.parentElement.remove()" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  `;
  document.body.appendChild(alertContainer);
  setTimeout(() => alertContainer.remove(), 5000);
}

// EXTREMADAMENTE IMPORTANTE: Exponer a global para que lecturajson.js la encuentre
window.prepararCopia = prepararCopia;
