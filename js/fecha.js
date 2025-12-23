// fecha.js

// Convierte un número a romano (función auxiliar)
function numeroRomano(num) {
    if (num <= 0) return '';
    const numeros = [
        ["M",1000],["CM",900],["D",500],["CD",400],
        ["C",100],["XC",90],["L",50],["XL",40],
        ["X",10],["IX",9],["V",5],["IV",4],["I",1]
    ];
    let resultado = '';
    for (const [romano, valor] of numeros) {
        while (num >= valor) {
            resultado += romano;
            num -= valor;
        }
    }
    return resultado;
}

// Genera la fecha en latín
function fechaHoyLatina() {
    const dias_semana_latinos = [
        'Feria Prima',
        'Feria Secunda',
        'Feria Tertia',
        'Feria Quarta',
        'Feria Quinta',
        'Feria Sexta',
        'Feria Septima'
    ];
    const meses_latinos = {
        1: 'Ianuarii', 2: 'Februarii', 3: 'Martii', 4: 'Aprilis',
        5: 'Maii', 6: 'Iunii', 7: 'Iulii', 8: 'Augusti',
        9: 'Septembris', 10: 'Octobris', 11: 'Novembris', 12: 'Decembris'
    };

    const fecha = new Date();
    const dia_semana = fecha.getDay(); // 0-6
    const dia_mes = numeroRomano(fecha.getDate());
    const mes = meses_latinos[fecha.getMonth() + 1];
    const anio = numeroRomano(fecha.getFullYear());

    return `${dias_semana_latinos[dia_semana]}, die ${dia_mes} mensis ${mes} ${anio}`;
}
