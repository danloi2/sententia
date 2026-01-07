/**
 * js/fecha.js
 *
 * Display the current date and hour in "Latin style" using Bootstrap 5.3 classes.
 *
 * Features:
 *  - Shows day of the week, day of month, month, and year in Latin
 *  - Converts numbers to Roman numerals
 *  - Shows a Latin-style hour (vigilia / hora) with sun/moon icon
 *  - Fully styled with Bootstrap badges and icons
 *  - Self-contained module for easy maintenance
 */

const Utils = (() => {
  // ============================
  // Convert number to Roman numerals
  // ============================
  function numeroRomano(num) {
    if (!num || num === 0) return "";
    const map = [
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
    let result = "";
    let n = num;
    for (const [letter, value] of map) {
      while (n >= value) {
        result += letter;
        n -= value;
      }
    }
    return result;
  }

  // ============================
  // Get current Latin-style hour
  // ============================
  function obtenerHoraLatina() {
    const h = new Date().getHours();

    // Determine icon and color based on daytime or nighttime
    const isNight = h < 6 || h >= 19;
    const icon = isNight ? "bi-moon-stars-fill" : "bi-sun-fill";
    const iconColor = isNight ? "text-info" : "text-warning";

    // Map hours to Latin-style vigilia/hora names
    const horasRomanas = {
      0: "media nox",
      1: "prima vigilia",
      2: "secunda vigilia",
      3: "tertia vigilia",
      4: "quarta vigilia",
      5: "quinta vigilia",
      6: "hora prima",
      7: "hora secunda",
      8: "hora tertia",
      9: "hora quarta",
      10: "hora quinta",
      11: "hora sexta",
      12: "hora sexta",
      13: "hora septima",
      14: "hora octava",
      15: "hora nona",
      16: "hora decima",
      17: "hora undecima",
      18: "hora duodecima",
      19: "prima vigilia",
      20: "secunda vigilia",
      21: "tertia vigilia",
      22: "quarta vigilia",
      23: "quinta vigilia",
    };

    const hourText = horasRomanas[h];

    // Return a Bootstrap badge containing the hour with icon
    return `
      <div class="badge rounded-pill bg-primary-subtle text-primary fw-bold border border-primary-subtle px-3 py-2 mt-1 d-flex align-items-center" style="font-size:0.7rem; letter-spacing:0.5px;">
        <i class="bi ${icon} ${iconColor} me-1"></i> ${hourText.toUpperCase()}
      </div>`;
  }

  // ============================
  // Generate full Latin date string with Bootstrap styling
  // ============================
  function fechaHoyLatina() {
    const f = new Date();

    // Latin names for weekdays and months
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
      "Ianuarii", "Februarii", "Martii", "Aprilis", "Maii", "Iunii",
      "Iulii", "Augusti", "Septembris", "Octobris", "Novembris", "Decembris",
    ];

    const diaSemana = dias[f.getDay()];
    const diaMes = numeroRomano(f.getDate());
    const mesNombre = meses[f.getMonth()];
    const añoRomano = numeroRomano(f.getFullYear());

    // Compose the HTML for date and time
    const fechaParte = `<span class="text-secondary small fst-italic">
      ${diaSemana}, die ${diaMes} mensis ${mesNombre}<br>Anno Domini ${añoRomano}
    </span>`;
    const horaParte = obtenerHoraLatina();

    return `
      <div class="d-flex flex-column align-items-center gap-1">
        ${fechaParte}
        ${horaParte}
      </div>`;
  }

  // Expose public functions
  return { fechaHoyLatina };
})();

// ============================
// Render the Latin date on DOMContentLoaded
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const fechaEl = document.getElementById("fecha");
  if (fechaEl) {
    fechaEl.innerHTML = Utils.fechaHoyLatina();
  }
});

