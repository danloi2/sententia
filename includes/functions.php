<?php
// Función para formatear años negativos como a.C.
function formatoAno($ano) {
    if ($ano === null) return '';
    if ($ano < 0) return abs($ano) . ' a.C.';
    return $ano;
}

// Función para convertir números a romanos
function numeroRomano($num) {
    $map = [
        'M' => 1000, 'CM' => 900, 'D' => 500, 'CD' => 400,
        'C' => 100, 'XC' => 90, 'L' => 50, 'XL' => 40,
        'X' => 10, 'IX' => 9, 'V' => 5, 'IV' => 4, 'I' => 1
    ];
    $result = '';
    foreach ($map as $roman => $int) {
        while ($num >= $int) {
            $result .= $roman;
            $num -= $int;
        }
    }
    return $result;
}

// Genera la fecha en latín
function fechaHoyLatina() {
    $dias_semana_latinos = [
        0 => 'Feria Prima',
        1 => 'Feria Secunda',
        2 => 'Feria Tertia',
        3 => 'Feria Quarta',
        4 => 'Feria Quinta',
        5 => 'Feria Sexta',
        6 => 'Feria Septima'
    ];
    $meses_latinos = [
        1 => 'Ianuarii', 2 => 'Februarii', 3 => 'Martii', 4 => 'Aprilis',
        5 => 'Maii', 6 => 'Iunii', 7 => 'Iulii', 8 => 'Augusti',
        9 => 'Septembris', 10 => 'Octobris', 11 => 'Novembris', 12 => 'Decembris'
    ];

    $fecha = new DateTime('now');
    $dia_semana = (int)$fecha->format('w');
    $dia_mes = numeroRomano((int)$fecha->format('j'));
    $mes = $meses_latinos[(int)$fecha->format('n')];
    $anio = numeroRomano((int)$fecha->format('Y'));

    return $dias_semana_latinos[$dia_semana] . ", die $dia_mes mensis $mes $anio";
}
