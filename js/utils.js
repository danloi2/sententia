const Utils = {
  numeroRomano(num) {
    if (!num) return '';
    const romans = [
      ['M',1000],['CM',900],['D',500],['CD',400],
      ['C',100],['XC',90],['L',50],['XL',40],
      ['X',10],['IX',9],['V',5],['IV',4],['I',1]
    ];
    let res = '';
    let n = Math.abs(num);
    for (const [r,v] of romans) {
      while (n >= v) {
        res += r;
        n -= v;
      }
    }
    return num < 0 ? `-${res}` : res;
  }
};
