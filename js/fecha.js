/**
 * js/fecha.js
 * Gestión de la fecha actual en Latín siguiendo el estilo oficial (Curia Romana).
 * * Este script realiza tres tareas:
 * 1. Proporciona un conversor de números arábigos a romanos.
 * 2. Formatea la fecha del sistema al latín eclesiástico/clásico.
 * 3. Inyecta el resultado en el encabezado de la página al cargar.
 */

// Listener que se activa cuando el DOM está listo para ser manipulado
document.addEventListener('DOMContentLoaded', () => {
  const fechaEl = document.getElementById('fecha');
  if (fechaEl) {
    // Asigna el texto generado por nuestro módulo de utilidades
    fechaEl.textContent = Utils.fechaHoyLatina();
  }
});

/**
 * Utils: Patrón de módulo para encapsular las herramientas de fecha y conversión.
 */
const Utils = (() => {

  /**
   * Convierte números arábigos (1, 2, 3...) a números Romanos (I, II, III...).
   * Utiliza el algoritmo de resta sustractiva estándar.
   * @param {number} num - El número a convertir.
   * @returns {string} - El equivalente en numeración romana capital.
   */
  function numeroRomano(num) {
    // Caso base: si no hay número o es cero (los romanos no tenían el cero)
    if (num === null || num === undefined || num === 0) return '';
    
    const mapa = [
      ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
      ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
      ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
    ];
    
    let res = '';
    for (const [letra, valor] of mapa) {
      // Mientras el número sea mayor o igual al valor romano, lo concatenamos
      while (num >= valor) {
        res += letra;
        num -= valor;
      }
    }
    return res;
  }

  /**
   * Genera la fecha actual formateada en Latín.
   * Estructura: [Día de la semana], die [día del mes] mensis [mes] anno Domini [año]
   * @returns {string} - Cadena completa (ej: "Die Lunae, die XXIV mensis Decembris...")
   */
  function fechaHoyLatina() {
    const f = new Date();
    
    // 🗓️ DÍAS DE LA SEMANA (Orden litúrgico y clásico: el Domingo es el primer día - índice 0)
    const dias = [
      'Die Dominica', // Domingo
      'Die Lunae',    // Lunes
      'Die Martis',   // Martes
      'Die Mercurii', // Miércoles
      'Die Iovis',    // Jueves
      'Die Veneris',  // Viernes
      'Die Saturni'   // Sábado
    ];

    // 📆 MESES EN GENITIVO (Requerido por la gramática al usar "mensis" [mes de...])
    const meses = [
      'Ianuarii',   // de Enero
      'Februarii',  // de Febrero
      'Martii',     // de Marzo
      'Aprilis',    // de Abril
      'Maii',       // de Mayo
      'Iunii',      // de Junio
      'Iulii',      // de Julio
      'Augusti',    // de Agosto
      'Septembris', // de Septiembre
      'Octobris',   // de Octubre
      'Novembris',  // de Noviembre
      'Decembris'   // de Diciembre
    ];

    // Obtención de datos del objeto Date
    const diaSemana = dias[f.getDay()];
    const diaMes = numeroRomano(f.getDate());
    const mesNombre = meses[f.getMonth()];
    const añoRomano = numeroRomano(f.getFullYear());

    /**
     * Retorno de la cadena final:
     * - "die" + número romano actúa como ablativo de tiempo.
     * - "anno Domini" (en el año del Señor) es la fórmula tradicional para la era cristiana.
     */
    return `${diaSemana}, die ${diaMes} mensis ${mesNombre} anno Domini ${añoRomano}`;
  }

  // Exportación pública de las funciones del módulo
  return { numeroRomano, fechaHoyLatina };
})();