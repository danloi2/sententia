// Convierte un número a romano
function numeroRomano(num) {
  if (num === null || num === undefined) return '';
  const valores = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const simbolos = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let romano = '';
  let n = Math.abs(num);
  for (let i = 0; i < valores.length; i++) {
    while (n >= valores[i]) {
      romano += simbolos[i];
      n -= valores[i];
    }
  }
  return num < 0 ? '-' + romano : romano;
}

// Devuelve la fecha actual en latín
function fechaHoyLatina() {
  const diasSemanaLatinos = ['Feria Septima','Feria Prima','Feria Secunda','Feria Tertia','Feria Quarta','Feria Quinta','Feria Sexta'];
  const mesesLatinos = [null,'Ianuarii','Februarii','Martii','Aprilis','Maii','Iunii','Iulii','Augusti','Septembris','Octobris','Novembris','Decembris'];

  const ahora = new Date();
  const diaSemana = ahora.getDay();
  const diaMes = ahora.getDate();
  const mes = ahora.getMonth() + 1;
  const anio = ahora.getFullYear();

  return `${diasSemanaLatinos[diaSemana]}, die ${numeroRomano(diaMes)} mensis ${mesesLatinos[mes]} ${numeroRomano(anio)}`;
}

// Convierte un año a romano si existe
function romanoSiExiste(anio) {
  return anio ? numeroRomano(anio) : '';
}

// Exportamos funciones globalmente para otros scripts
window.Utils = { numeroRomano, fechaHoyLatina, romanoSiExiste };
