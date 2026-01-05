/**
 * js/fecha.js - Diseño estético usando solo clases nativas de Bootstrap 5.3
 * Muestra fecha y hora “a la latina” con iconos y badges Bootstrap.
 */

const Utils = (() => {
  // Convierte número a romano
  function numeroRomano(num) {
    if (!num || num === 0) return "";
    const mapa = [
      ["M", 1000],
      ["CM", 900],
      ["D", 500],
      ["CD", 400],
      ["C", 100],
      ["XC", 90],
      ["L", 50],
      ["XL", 40],
      ["X", 10],
      ["IX", 9],
      ["V", 5],
      ["IV", 4],
      ["I", 1],
    ];
    let res = "";
    let n = num;
    for (const [l, v] of mapa) {
      while (n >= v) {
        res += l;
        n -= v;
      }
    }
    return res;
  }

  // Obtiene la hora y la representa como texto latino con icono
  function obtenerHoraLatina() {
    const h = new Date().getHours();

    // Icono según día/nocturna
    const esNocturna = h < 6 || h >= 19;
    const icono = esNocturna ? "bi-moon-stars-fill" : "bi-sun-fill";
    const colorIcono = esNocturna ? "text-info" : "text-warning";

    // Horas latinas
    const horasRomanas = {
      0: "media nox", // medianoche
      1: "prima vigilia",
      2: "secunda vigilia",
      3: "tertia vigilia",
      4: "quarta vigilia",
      5: "quinta vigilia", // o "diluculum" (amanecer)
      6: "hora prima",
      7: "hora secunda",
      8: "hora tertia",
      9: "hora quarta",
      10: "hora quinta",
      11: "hora sexta",
      12: "hora sexta", // mediodía (meridies)
      13: "hora septima",
      14: "hora octava",
      15: "hora nona",
      16: "hora decima",
      17: "hora undecima",
      18: "hora duodecima", // o "crepusculum" (anochecer)
      19: "prima vigilia",
      20: "secunda vigilia",
      21: "tertia vigilia",
      22: "quarta vigilia",
      23: "quinta vigilia", // o "concubium" (hora de acostarse)
    };

    const textoHora = horasRomanas[h];

    // Badge Bootstrap
    return `
      <div class="badge rounded-pill bg-primary-subtle text-primary fw-bold border border-primary-subtle px-3 py-2 mt-1 d-flex align-items-center" style="font-size:0.7rem; letter-spacing:0.5px;">
        <i class="bi ${icono} ${colorIcono} me-1"></i> ${textoHora.toUpperCase()}
      </div>`;
  }

  // Genera fecha completa en latín con Bootstrap
  function fechaHoyLatina() {
    const f = new Date();
    const dias = [
      "Die Dominica",
      "Die Lunae",
      "Die Martis",
      "Die Mercurii",
      "Die Iovis",
      "Die Veneris",
      "Die Saturni",
    ];
    const meses = [
      "Ianuarii",
      "Februarii",
      "Martii",
      "Aprilis",
      "Maii",
      "Iunii",
      "Iulii",
      "Augusti",
      "Septembris",
      "Octobris",
      "Novembris",
      "Decembris",
    ];

    const diaSemana = dias[f.getDay()];
    const diaMes = numeroRomano(f.getDate());
    const mesNombre = meses[f.getMonth()];
    const añoRomano = numeroRomano(f.getFullYear());

    const fechaParte = `<span class="text-secondary small fst-iiannotaliciannotalicannotalic">${diaSemana}, die ${diaMes} mensis ${mesNombre}<br>Anno Domini ${añoRomano}</span>`;
    const horaParte = obtenerHoraLatina();

    return `
      <div class="d-flex flex-column align-items-center gap-1">
        ${fechaParte}
        ${horaParte}
      </div>`;
  }

  return { fechaHoyLatina };
})();

// Renderizar al cargar DOM
document.addEventListener("DOMContentLoaded", () => {
  const fechaEl = document.getElementById("fecha");
  if (fechaEl) {
    fechaEl.innerHTML = Utils.fechaHoyLatina();
  }
});
