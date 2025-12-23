// Convierte un número a romano
function numeroRomano(num) {
    if (num === null || num === undefined) return '';
    const valores = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const romanos = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    let resultado = '';
    let n = Math.abs(num);
    for (let i = 0; i < valores.length; i++) {
        while (n >= valores[i]) {
            resultado += romanos[i];
            n -= valores[i];
        }
    }
    return num < 0 ? '-' + resultado : resultado;
}

// Fecha actual en latín
function fechaHoyLatina() {
    const dias = ["Feria Prima","Feria Secunda","Feria Tertia","Feria Quarta","Feria Quinta","Feria Sexta","Feria Septima"];
    const meses = [null,"Ianuarii","Februarii","Martii","Aprilis","Maii","Iunii","Iulii","Augusti","Septembris","Octobris","Novembris","Decembris"];
    
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const diaMes = numeroRomano(hoy.getDate());
    const mes = meses[hoy.getMonth()+1];
    const anio = numeroRomano(hoy.getFullYear());
    
    return `${dias[diaSemana]}, die ${diaMes} mensis ${mes} ${anio}`;
}
