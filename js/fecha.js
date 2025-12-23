// Convierte un número a romano (soporta hasta 3999)
function numeroRomano(num) {
  if (num === 0) return 'N'; // cero en romano
  const valores = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const simbolos = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let resultado = '';
  num = Math.abs(num); // para años negativos
  for (let i = 0; i < valores.length; i++) {
    while (num >= valores[i]) {
      resultado += simbolos[i];
      num -= valores[i];
    }
  }
  return resultado;
}

// Genera la fecha en latín
function fechaHoyLatina() {
  const dias_semana_latinos = [
    'Feria Prima', 'Feria Secunda', 'Feria Tertia',
    'Feria Quarta', 'Feria Quinta', 'Feria Sexta', 'Feria Septima'
  ];

  const meses_latinos = [
    '', 'Ianuarii', 'Februarii', 'Martii', 'Aprilis',
    'Maii', 'Iunii', 'Iulii', 'Augusti',
    'Septembris', 'Octobris', 'Novembris', 'Decembris'
  ];

  const fecha = new Date();
  const diaSemana = fecha.getDay();
  const diaMes = numeroRomano(fecha.getDate());
  const mes = meses_latinos[fecha.getMonth() + 1]; // getMonth() 0-11
  const anio = numeroRomano(fecha.getFullYear());

  return `${dias_semana_latinos[diaSemana]}, die ${diaMes} mensis ${mes} ${anio}`;
}
