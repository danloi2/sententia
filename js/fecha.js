/**
 * js/fecha.js
 *
 * Display the current date and hour in "Latin style" using Tailwind CSS classes.
 *
 * Features:
 *  - Shows day of the week, day of month, month, and year in Latin
 *  - Converts numbers to Roman numerals
 *  - Shows a Latin-style hour (vigilia / hora) with sun/moon icon
 *  - Fully styled with Tailwind CSS and Bootstrap Icons
 *  - Self-contained module for easy maintenance
 */

const Utils = (() => {
  // ============================
  // Convert number to Roman numerals
  // ============================
  function numeroRomano(num) {
    if (!num || num === 0) return '';
    const map = [
      ['M', 1000],
      ['CM', 900],
      ['D', 500],
      ['CD', 400],
      ['C', 100],
      ['XC', 90],
      ['L', 50],
      ['XL', 40],
      ['X', 10],
      ['IX', 9],
      ['V', 5],
      ['IV', 4],
      ['I', 1],
    ];
    let result = '';
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

    // Determinar si es de noche (antes de las 6am o después de las 7pm)
    const isNight = h < 6 || h >= 19;

    // Definimos los SVGs de Heroicons
    const sunIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-amber-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M3 12h2.25m.386-6.364 1.591-1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>`;

    const moonIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-blue-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>`;

    const selectedIcon = isNight ? moonIcon : sunIcon;

    // Mapeo de horas a nombres en latín (se mantiene igual)
    const horasRomanas = {
      0: 'media nox',
      1: 'prima vigilia',
      2: 'secunda vigilia',
      3: 'tertia vigilia',
      4: 'quarta vigilia',
      5: 'quinta vigilia',
      6: 'hora prima',
      7: 'hora secunda',
      8: 'hora tertia',
      9: 'hora quarta',
      10: 'hora quinta',
      11: 'hora sexta',
      12: 'hora sexta',
      13: 'hora septima',
      14: 'hora octava',
      15: 'hora nona',
      16: 'hora decima',
      17: 'hora undecima',
      18: 'hora duodecima',
      19: 'prima vigilia',
      20: 'secunda vigilia',
      21: 'tertia vigilia',
      22: 'quarta vigilia',
      23: 'quinta vigilia',
    };

    const hourText = horasRomanas[h];

    // Retornamos el HTML usando el SVG seleccionado
    return `
      <div class="inline-flex items-center gap-1.5 rounded-full bg-primary-50 text-primary-700 font-bold border border-primary-100 px-3 py-1.5 mt-1 text-xs tracking-wide">
        ${selectedIcon}
        <span>${hourText.toUpperCase()}</span>
      </div>`;
  }

  // ============================
  // Generate full Latin date string with Tailwind styling
  // ============================
  function fechaHoyLatina() {
    const f = new Date();

    // Latin names for weekdays and months
    const dias = ['Dominica', 'Lunae', 'Martis', 'Mercurii', 'Iovis', 'Veneris', 'Saturni'];
    const meses = [
      'Ianuarii',
      'Februarii',
      'Martii',
      'Aprilis',
      'Maii',
      'Iunii',
      'Iulii',
      'Augusti',
      'Septembris',
      'Octobris',
      'Novembris',
      'Decembris',
    ];

    const diaSemana = dias[f.getDay()];
    const diaMes = numeroRomano(f.getDate());
    const mesNombre = meses[f.getMonth()];
    const añoRomano = numeroRomano(f.getFullYear());

    // Compose the HTML for date with blue highlights
    const fechaParte = `
      <span class="text-slate-500 text-sm italic">
        Die <span class="text-primary-600 font-semibold">${diaSemana}</span>, die <span class="text-primary-600 font-semibold">${diaMes}</span> mensis <span class="text-primary-600 font-semibold">${mesNombre}</span><br>
        Anno Domini <span class="text-primary-600 font-semibold">${añoRomano}</span>
      </span>`;
    const horaParte = obtenerHoraLatina();

    return `
      <div class="flex flex-col items-center gap-1">
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
document.addEventListener('DOMContentLoaded', () => {
  const fechaEl = document.getElementById('fecha');
  if (fechaEl) {
    fechaEl.innerHTML = Utils.fechaHoyLatina();
  }
});
