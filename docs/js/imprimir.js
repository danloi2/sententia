/**
 * js/imprimir.js
 * Versión compatible con Linux / Tauri RPM
 */

async function imprimirCita(format = "png") {
  const element = document.getElementById("cita-print");
  if (!element) return;

  const clone = element.cloneNode(true);
  clone.style.boxShadow = "none";
  clone.style.background = "white"; // Mejor blanco para evitar errores de renderizado en Linux
  clone.style.width = "800px";

  clone.querySelectorAll("button, .btn, .cita-acciones, .dropdown, .dropdown-menu, .no-export")
    .forEach((el) => el.remove());

  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    if (typeof html2canvas === 'undefined') throw new Error("html2canvas not loaded");

    const canvas = await html2canvas(clone, {
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true, // Crucial para Linux
      scale: 2,         // Bajamos un poco la escala para evitar crashes de memoria en el WebView de Fedora
      logging: true     // Activamos logging para que puedas ver errores en la terminal
    });

    if (format === "png") exportPNG(canvas);
    else if (format === "pdf") exportPDF(canvas);

  } catch (error) {
    console.error("Error detallado:", error);
    alert("Error al exportar: Abrir terminal para ver detalles.");
  } finally {
    document.body.removeChild(container);
  }
}

function exportPNG(canvas) {
  const imgData = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imgData;
  link.download = "sententia.png";
  
  // Forzar trigger en WebKitGTK
  const clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true
  });
  
  document.body.appendChild(link);
  link.dispatchEvent(clickEvent);
  document.body.removeChild(link);
}

function exportPDF(canvas) {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) return;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const imgData = canvas.toDataURL("image/png");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const y = (pageHeight - imgHeight) / 2;

  pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
  
  // En Tauri Linux, pdf.save() puede fallar. 
  // Intentamos disparar la descarga de forma manual si falla
  try {
    pdf.save("sententia.pdf");
  } catch (e) {
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sententia.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

window.imprimirCita = imprimirCita;