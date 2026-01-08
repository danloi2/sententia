/**
 * js/imprimir.js - Versión Proporciones Corregidas
 */

async function abrirEnNavegador(event, url) {
  if (event) event.preventDefault();

  // 1. Intentamos detectar si estamos en la App de escritorio
  const tauri = window.__TAURI__ || window.__TAURI_API__;

  if (tauri && tauri.opener) {
    // ESTO SOLO PASA EN LA APP: Abre el navegador del sistema
    try {
      await tauri.opener.open(url);
      return; 
    } catch (e) {
      console.error("Error con el plugin opener:", e);
    }
  }

  // 2. ESTO PASA EN LA WEB (o si falla lo anterior): Abre pestaña nueva
  window.open(url, '_blank', 'noopener,noreferrer');
}

async function imprimirCita(format = "png") {
  const element = document.getElementById("cita-print");
  if (!element) return;

  const clone = element.cloneNode(true);
  clone.style.boxShadow = "none";
  clone.style.background = "white";
  clone.style.width = "800px"; 
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
    // Detección de API según versión de Tauri v2
    const tauri = window.__TAURI__ || window.__TAURI_API__;
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
      const imgData = canvas.toDataURL("image/png");
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const ratio = canvas.width / canvas.height;
      let printWidth = pageWidth - 20; // Margen de 10mm
      let printHeight = printWidth / ratio;

      if (printHeight > (pageHeight - 20)) {
        printHeight = pageHeight - 20;
        printWidth = printHeight * ratio;
      }

      const x = (pageWidth - printWidth) / 2;
      const y = (pageHeight - printHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, printWidth, printHeight);
      dataUint8 = new Uint8Array(pdf.output('arraybuffer'));
      blobUrl = URL.createObjectURL(pdf.output('blob'));
    }

    // Si los plugins están disponibles (App instalada)
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

    // Fallback: Descarga de navegador (Modo desarrollo/web)
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