/**
 * js/imprimir.js - Versión Final (Alineación Derecha + PDF Fix)
 */

async function abrirEnNavegador(event, url) {
  if (event) event.preventDefault();
  window.open(url, '_blank', 'noopener,noreferrer');
}

async function imprimirCita(format = 'png') {
  const element = document.getElementById('cita-print');
  if (!element) return;

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
    const capturador = window.html2canvas;
    if (!capturador) throw new Error('html2canvas no cargado');

    const canvas = await capturador(element, {
      backgroundColor: '#ffffff',
      useCORS: true,
      scale: 3,
      logging: false,
      windowHeight: 2000,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('cita-print');
        if (clonedElement) {
          clonedElement.style.width = '950px';
          clonedElement.style.maxWidth = 'none';
          clonedElement.style.height = 'auto';
          clonedElement.style.overflow = 'visible';
          clonedElement.style.margin = '0';

          const figcaption = clonedElement.querySelector('figcaption');
          if (figcaption) {
            figcaption.style.display = 'flex';
            figcaption.style.flexDirection = 'column';
            // ALINEACIÓN A LA DERECHA
            figcaption.style.alignItems = 'flex-end';
            figcaption.style.textAlign = 'right';
            figcaption.style.gap = '8px';
            figcaption.style.marginTop = '24px';
            figcaption.style.width = '100%';
          }

          // Ajustamos el bloque de Referencia (cuadro azul)
          const referencia = clonedElement.querySelector('.bg-primary-50');
          if (referencia) {
            referencia.style.display = 'inline-flex';
            referencia.style.justifyContent = 'flex-end';
          }

          // Ajustamos Época • Lengua • Nación
          const contextText = figcaption ? figcaption.querySelector('span:last-child') : null;
          if (contextText) {
            contextText.style.display = 'block';
            contextText.style.width = '100%';
            contextText.style.whiteSpace = 'nowrap';
            contextText.style.textAlign = 'right';
          }
        }
      },
    });

    await descargarArchivo(canvas, format);
  } catch (error) {
    console.error('Error:', error);
  } finally {
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
      // Corregido: Extracción limpia de jsPDF
      const { jsPDF } = window.jspdf || {};
      if (!jsPDF) throw new Error('jsPDF no encontrado');

      // Corregido: Instancia directa sin el prefijo erróneo 'pdfjs.'
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const imgData = canvas.toDataURL('image/png');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ratio = canvas.width / canvas.height;
      let printWidth = pageWidth - 30;
      let printHeight = printWidth / ratio;

      if (printHeight > pageHeight - 20) {
        printHeight = pageHeight - 20;
        printWidth = printHeight * ratio;
      }

      pdf.addImage(
        imgData,
        'PNG',
        (pageWidth - printWidth) / 2,
        (pageHeight - printHeight) / 2,
        printWidth,
        printHeight
      );
      finalUrl = pdf.output('bloburl');
    }

    const link = document.createElement('a');
    link.href = finalUrl;
    link.download = `sententia_${Date.now()}.${formato}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Error en la descarga:', err);
  }
}

window.imprimirCita = imprimirCita;
