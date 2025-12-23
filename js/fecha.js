const Fecha = (() => {

  const dias = [
    'Feria Prima',
    'Feria Secunda',
    'Feria Tertia',
    'Feria Quarta',
    'Feria Quinta',
    'Feria Sexta',
    'Feria Septima'
  ];

  const meses = [
    'Ianuarii','Februarii','Martii','Aprilis','Maii','Iunii',
    'Iulii','Augusti','Septembris','Octobris','Novembris','Decembris'
  ];

  function fechaHoyLatina() {
    const f = new Date();
    const diaSemana = dias[f.getDay()];
    const dia = Utils.numeroRomano(f.getDate());
    const mes = meses[f.getMonth()];
    const anio = Utils.numeroRomano(f.getFullYear());

    return `${diaSemana}, die ${dia} mensis ${mes} ${anio}`;
  }

  return { fechaHoyLatina };
})();

document.getElementById('fecha').textContent = Fecha.fechaHoyLatina();
