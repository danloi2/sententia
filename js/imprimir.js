/**
 * js/imprimir.js - Versión Web Limpia
 */

async function abrirEnNavegador(event, url) {
  if (event) event.preventDefault();
  window.open(url, '_blank', 'noopener,noreferrer');
}

async function imprimirCita(format = 'png') {
  const element = document.getElementById('cita-print');
  if (!element) return;

  // 1. Preparar el elemento para la captura
  const originalBoxShadow = element.style.boxShadow;
  const elementsToHide = element.querySelectorAll(
    'button, #export-dropdown, .cita-acciones, .no-export'
  );

  const originalDisplayValues = [];
  elementsToHide.forEach((el, i) => {
    originalDisplayValues[i] = el.style.display;
    el.style.display = 'none';
  });

  element.style.boxShadow = 'none';

  try {
    // 2. Verificación flexible de la librería (Soporta html2canvas y variantes Pro)
    const capturador = window.html2canvas;
    if (!capturador) {
      throw new Error('La librería de captura (html2canvas) no está cargada en el index.html');
    }

    // 3. Ejecutar captura con ajustes de alta calidad
    const canvas = await capturador(element, {
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: false,
      scale: 3, // Alta resolución
      logging: false,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    await descargarArchivo(canvas, format);
  } catch (error) {
    console.error('Error en exportación:', error);
    alert('Error al generar el archivo: ' + error.message);
  } finally {
    // 4. Restaurar interfaz
    element.style.boxShadow = originalBoxShadow;
    elementsToHide.forEach((el, i) => {
      el.style.display = originalDisplayValues[i];
    });
  }
}

async function descargarArchivo(canvas, formato) {
  try {
    let finalUrl;

    if (formato === 'png') {
      finalUrl = canvas.toDataURL('image/png');
    } else {
      // Soporte PDF vía jsPDF
      const { jsPDF } = window.jspdf || {};
      if (!jsPDF) throw new Error('Librería jsPDF no encontrada');

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const ratio = canvas.width / canvas.height;

      let printWidth = pageWidth - margin * 2;
      let printHeight = printWidth / ratio;

      if (printHeight > pageHeight - margin * 2) {
        printHeight = pageHeight - margin * 2;
        printWidth = printHeight * ratio;
      }

      const x = (pageWidth - printWidth) / 2;
      const y = (pageHeight - printHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, printWidth, printHeight);
      finalUrl = pdf.output('bloburl');
    }

    // 5. Crear enlace de descarga invisible
    const link = document.createElement('a');
    link.href = finalUrl;
    link.download = `sententia_${Date.now()}.${formato}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (formato === 'pdf') {
      setTimeout(() => URL.revokeObjectURL(finalUrl), 100);
    }
  } catch (err) {
    console.error('Error en la descarga:', err);
  }
}

window.imprimirCita = imprimirCita;
