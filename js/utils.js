const Utils = {
  numeroRomano: function(num) {
    if (!num) return '';
    const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '';
    for (let i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  },

  fechaHoyLatina: function() {
    const dias = ['Feria Prima','Feria Secunda','Feria Tertia','Feria Quarta','Feria Quinta','Feria Sexta','Feria Septima'];
    const meses = [null,'Ianuarii','Februarii','Martii','Aprilis','Maii','Iunii','Iulii','Augusti','Septembris','Octobris','Novembris','Decembris'];
    const hoy = new Date();
    const diaSemana = dias[hoy.getDay()];
    const diaMes = this.numeroRomano(hoy.getDate());
    const mes = meses[hoy.getMonth()+1];
    const anio = this.numeroRomano(hoy.getFullYear());
    return `${diaSemana}, die ${diaMes} mensis ${mes} ${anio}`;
  }
};
