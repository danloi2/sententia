/**
 * js/imprimir.js - Versión Proporciones Corregidas
 */

async function imprimirCita(format = "png") {
  const element = document.getElementById("cita-print");
  if (!element) return;

  const clone = element.cloneNode(true);
  clone.style.boxShadow = "none";
  clone.style.background = "white";
  clone.style.width = "800px"; // Ancho base para consistencia
  clone.querySelectorAll("button, .btn, .cita-acciones, .dropdown, .dropdown-menu, .no-export")
    .forEach((el) => el.remove());

  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    if (typeof html2canvas === 'undefined') throw new Error("html2canvas no cargado");

    const canvas = await html2canvas(clone, {
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true,
      scale: 2
    });

    await guardarConTauri(canvas, format);

  } catch (error) {
    console.error("Error en exportación:", error);
    alert("Error: " + error.message);
  } finally {
    document.body.removeChild(container);
  }
}

async function guardarConTauri(canvas, formato) {
  try {
    const tauri = window.__TAURI__ || (window.internal && window.internal.__TAURI__);
    let dataUint8;
    let blobUrl;

    if (formato === "png") {
      const base64 = canvas.toDataURL("image/png").split(',')[1];
      const binaryString = atob(base64);
      dataUint8 = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        dataUint8[i] = binaryString.charCodeAt(i);
      }
      blobUrl = canvas.toDataURL("image/png");
    } else {
      const { jsPDF } = window.jspdf || {};
      if (!jsPDF) throw new Error("jsPDF no cargado");

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      
      // --- CÁLCULO PARA EVITAR DISTORSIÓN ---
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();   // 297mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 210mm
      
      // Calculamos el ancho y alto proporcional
      const ratio = canvas.width / canvas.height;
      let printWidth = pageWidth;
      let printHeight = pageWidth / ratio;

      // Si el alto calculado supera la página, ajustamos por el alto
      if (printHeight > pageHeight) {
        printHeight = pageHeight;
        printWidth = pageHeight * ratio;
      }

      // Centramos la imagen en la hoja
      const x = (pageWidth - printWidth) / 2;
      const y = (pageHeight - printHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, printWidth, printHeight);
      
      dataUint8 = new Uint8Array(pdf.output('arraybuffer'));
      blobUrl = URL.createObjectURL(pdf.output('blob'));
    }

    if (tauri && tauri.dialog && tauri.fs) {
      const filePath = await tauri.dialog.save({
        defaultPath: `sententia.${formato}`,
        filters: [{ name: formato.toUpperCase(), extensions: [formato] }]
      });

      if (filePath) {
        await tauri.fs.writeFile(filePath, dataUint8);
        return;
      }
    } 

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `sententia.${formato}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    console.error("Fallo al guardar:", err);
  }
}

window.imprimirCita = imprimirCita;