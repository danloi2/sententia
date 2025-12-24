/**
 * Utils: Módulo de utilidades para la fecha en Latín (Estilo Vaticano Oficial)
 */
const Utils = (() => {

  /**
   * Convierte números arábigos a Romanos
   */
  function numeroRomano(num) {
    if (num === null || num === undefined || num === 0) return '';
    const mapa = [
      ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
      ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
      ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
    ];
    let res = '';
    for (const [l, v] of mapa) {
      while (num >= v) {
        res += l;
        num -= v;
      }
    }
    return res;
  }

  /**
   * Estructura: Die [día], die [num] mensis [mes] anno Domini [año]
   */
  function fechaHoyLatina() {
    const f = new Date();
    
    // 🗓️ DÍAS DE LA SEMANA (Orden Correcto: Domingo es 0)
    const dias = [
      'Die Dominica', 
      'Die Lunae',    
      'Die Martis',   
      'Die Mercurii', 
      'Die Iovis',    
      'Die Veneris',  
      'Die Saturni'   
    ];

    // 📆 MESES (Genitivo oficial corregido)
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
      'Decembris'
    ];

    const diaSemana = dias[f.getDay()];
    const diaMes = numeroRomano(f.getDate());
    const mesNombre = meses[f.getMonth()];
    const añoRomano = numeroRomano(f.getFullYear());

    // Devuelve la cadena con el formato exacto solicitado
    return `${diaSemana}, die ${diaMes} mensis ${mesNombre} anno Domini ${añoRomano}`;
  }

  return { numeroRomano, fechaHoyLatina };
})();