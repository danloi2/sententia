const Utils = {
  numeroRomano(num) {
    if (!num) return '';
    const romanos = [
      ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
      ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
      ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
    ];

    let resultado = '';
    let n = Math.abs(num);

    for (const [letra, valor] of romanos) {
      while (n >= valor) {
        resultado += letra;
        n -= valor;
      }
    }

    return num < 0 ? `-${resultado}` : resultado;
  },

  fechaHoyLatina() {
    const dias = [
      'Feria Prima', 'Feria Secunda', 'Feria Tertia',
      'Feria Quarta', 'Feria Quinta', 'Feria Sexta',
      'Feria Septima'
    ];

    const meses = [
      'Ianuarii', 'Februarii', 'Martii', 'Aprilis',
      'Maii', 'Iunii', 'Iulii', 'Augusti',
      'Septembris', 'Octobris', 'Novembris', 'Decembris'
    ];

    const hoy = new Date();
    const diaSemana = dias[hoy.getDay()];
    const dia = Utils.numeroRomano(hoy.getDate());
    const mes = meses[hoy.getMonth()];
    const anio = Utils.numeroRomano(hoy.getFullYear());

    return `${diaSemana}, die ${dia} mensis ${mes} ${anio}`;
  }
};
