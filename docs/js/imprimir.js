/**
 * js/imprimir.js
 */

async function imprimirCita(format = "png") {
  const element = document.getElementById("cita-print");
  if (!element) {
    console.warn("Element #cita-print not found");
    return;
  }

  // Clonar el elemento
  const clone = element.cloneNode(true);
  clone.style.boxShadow = "none";
  clone.style.background = "transparent";

  // Eliminar botones y controles
  clone
    .querySelectorAll("button, .btn, .cita-acciones, .dropdown, .dropdown-menu, .no-export")
    .forEach((el) => el.remove());

  clone.style.width = "800px";

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-10000px";
  container.style.left = "-10000px";
  container.appendChild(clone);
  document.body.appendChild(container);

  const SCALE = 3.5;

  try {
    // IMPORTANTE: Asegúrate de que html2canvas esté cargado
    if (typeof html2canvas === 'undefined') {
        throw new Error("html2canvas library not loaded");
    }

    const canvas = await html2canvas(clone, {
      backgroundColor: null,
      useCORS: true,
      scale: SCALE,
      logging: false // Desactivar logs para mejorar rendimiento
    });

    if (format === "png") exportPNG(canvas);
    else if (format === "pdf") exportPDF(canvas);

  } catch (error) {
    console.error("Error exporting quote:", error);
  } finally {
    document.body.removeChild(container);
  }
}

function exportPNG(canvas) {
  const link = document.createElement("a");
  link.download = "sententia.png";
  link.href = canvas.toDataURL("image/png");
  // En Linux/Tauri, a veces el link debe estar en el DOM para funcionar
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportPDF(canvas) {
  // Manejo más robusto de la librería jsPDF
  const { jsPDF } = window.jspdf || window.pdfjs || {};
  if (!jsPDF) {
    console.error("jsPDF not found");
    return;
  }

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const y = (pageHeight - imgHeight) / 2;

  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, y, imgWidth, imgHeight);
  pdf.save("sententia.pdf");
}

// Exponer a nivel global de forma segura
window.imprimirCita = imprimirCita;