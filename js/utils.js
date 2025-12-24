const Utils = (() => {

  function numeroRomano(num) {
    if (num === null || num === undefined) return '';
    const negativo = num < 0;
    num = Math.abs(num);

    const mapa = [
      ["M",1000],["CM",900],["D",500],["CD",400],
      ["C",100],["XC",90],["L",50],["XL",40],
      ["X",10],["IX",9],["V",5],["IV",4],["I",1]
    ];

    let res = '';
    for (const [l,v] of mapa) {
      while (num >= v) {
        res += l;
        num -= v;
      }
    }
    return negativo ? `-${res}` : res;
  }

  function fechaHoyLatina() {
    const dias = [
      'Feria Prima','Feria Secunda','Feria Tertia',
      'Feria Quarta','Feria Quinta','Feria Sexta','Feria Septima'
    ];
    const meses = [
      'Ianuarii','Februarii','Martii','Aprilis','Maii','Iunii',
      'Iulii','Augusti','Septembris','Octobris','Novembris','Decembris'
    ];

    const f = new Date();
    return `${dias[f.getDay()]}, die ${numeroRomano(f.getDate())} mensis ${meses[f.getMonth()]} ${numeroRomano(f.getFullYear())}`;
  }

  return { numeroRomano, fechaHoyLatina };
})();
