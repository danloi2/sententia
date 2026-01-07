/**
 * js/imprimir.js
 *
 * Export the displayed quote to PNG or PDF.
 * Features:
 *  - Removes all buttons and UI controls
 *  - Proportionally enlarged fonts for readability
 *  - Transparent PNG support
 *  - PDF export as A4 landscape
 */

// ============================
// Main export function
// ============================
async function imprimirCita(format = "png") {
  // Get the quote element
  const element = document.getElementById("cita-print");
  if (!element) {
    console.warn("Element #cita-print not found");
    return;
  }

  // 🔁 Clone the element so we don't modify the on-screen quote
  const clone = element.cloneNode(true);
  clone.style.boxShadow = "none";         // Remove shadows for clean export
  clone.style.background = "transparent"; // Transparent background for PNG

  // 🚫 Remove all interactive elements: buttons, dropdowns, action panels
  clone
    .querySelectorAll(
      "button, .btn, .cita-acciones, .dropdown, .dropdown-menu, .no-export"
    )
    .forEach((el) => el.remove());

  // Set a fixed width for consistent rendering
  clone.style.width = "800px";

  // 📦 Create a container off-screen to hold the cloned element
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-10000px";
  container.style.left = "-10000px";
  container.style.background = "transparent";
  container.appendChild(clone);
  document.body.appendChild(container);

  // 🔍 Determine canvas scaling to enlarge text proportionally
  const SCALE = format === "pdf" ? 3.5 : 3.5; // Adjust this to control text size

  try {
    // Render the clone to a canvas using html2canvas
    const canvas = await html2canvas(clone, {
      backgroundColor: null, // Keep PNG transparent
      useCORS: true,         // Allow cross-origin images
      scale: SCALE,          // Scale canvas to make text larger
    });

    // Export based on chosen format
    if (format === "png") exportPNG(canvas);
    else if (format === "pdf") exportPDF(canvas);
  } catch (error) {
    console.error("Error exporting quote:", error);
    alert("Error exporting quote (see console for details)");
  } finally {
    // Clean up: remove the off-screen container
    document.body.removeChild(container);
  }
}

// ============================
// Export canvas as PNG
// ============================
function exportPNG(canvas) {
  const link = document.createElement("a");
  link.download = "sententia.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ============================
// Export canvas as PDF (A4 landscape)
// ============================
function exportPDF(canvas) {
  const { jsPDF } = window.jspdf;

  // Create a new A4 landscape PDF
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Compute image height to maintain aspect ratio
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const y = (pageHeight - imgHeight) / 2; // center vertically

  // Add the canvas image to the PDF and save
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, y, imgWidth, imgHeight);
  pdf.save("sententia.pdf");
}

// 🔑 Expose the function to global scope for dropdown buttons
window.imprimirCita = imprimirCita;

