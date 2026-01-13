/**
 * js/imprimir.js - Versión Proporciones Corregidas y Fix OKLCH
 */

async function abrirEnNavegador(event, url) {
  if (event) event.preventDefault();

  // 1. Intentamos detectar si estamos en la App de escritorio (Tauri)
  const tauri = window.__TAURI__ || window.__TAURI_API__;

  if (tauri && tauri.opener) {
    try {
      await tauri.opener.open(url);
      return;
    } catch (e) {
      console.error('Error con el plugin opener:', e);
    }
  }

  // 2. Modo Web: Abre pestaña nueva
  window.open(url, '_blank', 'noopener,noreferrer');
}

async function imprimirCita(format = 'png') {
  const element = document.getElementById('cita-print');
  if (!element) return;

  // Guardamos estilos originales que vamos a modificar temporalmente
  const originalBoxShadow = element.style.boxShadow;

  // Ocultamos temporalmente los elementos que no queremos exportar
  const elementsToHide = element.querySelectorAll(
    'button, #export-dropdown, .cita-acciones, .no-export'
  );
  const originalDisplayValues = [];
  elementsToHide.forEach((el, i) => {
    originalDisplayValues[i] = el.style.display;
    el.style.display = 'none';
  });

  // Removemos sombra para la captura
  element.style.boxShadow = 'none';

  try {
    // html2canvas-pro soporta oklch, oklab y color-mix nativamente
    if (typeof html2canvas === 'undefined') throw new Error('html2canvas-pro no cargado');

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true,
      scale: 2,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    });

    await guardarConTauri(canvas, format);
  } catch (error) {
    console.error('Error en exportación:', error);
    alert('Error al generar la imagen: ' + error.message);
  } finally {
    // Restauramos los estilos originales
    element.style.boxShadow = originalBoxShadow;
    elementsToHide.forEach((el, i) => {
      el.style.display = originalDisplayValues[i];
    });
  }
}

async function guardarConTauri(canvas, formato) {
  try {
    const tauri = window.__TAURI__ || window.__TAURI_API__;
    let dataUint8;
    let blobUrl;

    if (formato === 'png') {
      const base64 = canvas.toDataURL('image/png').split(',')[1];
      const binaryString = atob(base64);
      dataUint8 = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        dataUint8[i] = binaryString.charCodeAt(i);
      }
      blobUrl = canvas.toDataURL('image/png');
    } else {
      const { jsPDF } = window.jspdf || {};
      if (!jsPDF) throw new Error('jsPDF no cargado');

      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const imgData = canvas.toDataURL('image/png');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ratio = canvas.width / canvas.height;
      let printWidth = pageWidth - 20;
      let printHeight = printWidth / ratio;

      if (printHeight > pageHeight - 20) {
        printHeight = pageHeight - 20;
        printWidth = printHeight * ratio;
      }

      const x = (pageWidth - printWidth) / 2;
      const y = (pageHeight - printHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, printWidth, printHeight);
      dataUint8 = new Uint8Array(pdf.output('arraybuffer'));
      blobUrl = URL.createObjectURL(pdf.output('blob'));
    }

    // Integración con File System de Tauri (Si estamos en la App)
    if (tauri && tauri.dialog && tauri.fs) {
      const filePath = await tauri.dialog.save({
        defaultPath: `sententia.${formato}`,
        filters: [{ name: formato.toUpperCase(), extensions: [formato] }],
      });

      if (filePath) {
        await tauri.fs.writeFile(filePath, dataUint8);
        return;
      }
    }

    // Fallback: Descarga directa en navegador
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `sententia.${formato}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Fallo al guardar el archivo:', err);
  }
}

// Exponer la función globalmente
window.imprimirCita = imprimirCita;
