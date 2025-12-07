<?php
require 'includes/functions.php';

// Conexión PDO
$host = getenv('DB_HOST') ?: 'mariadb2';
$db   = getenv('DB_NAME') ?: 'esaldi';
$user = getenv('DB_USER') ?: 'danloi';
$pass = getenv('DB_PASS') ?: '';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

$fecha_hoy = fechaHoyLatina();

// Consulta para obtener una cita aleatoria
$sql = "SELECT 
            c.cita_original, 
            c.cita_traducida, 
            c.cita_la,
            a.nombre_la AS autor,
            a.nacimiento_ano AS nacimiento,
            a.fallecimiento_ano AS muerte,
            a.biografia_la,
            e.nombre_la AS epoca,
            n.nombre_nacion_la AS nacion,
            i.codigo AS idioma
        FROM citas c
        LEFT JOIN autores a ON c.autor_id = a.id
        LEFT JOIN epocas_historicas e ON a.epoca_id = e.id
        LEFT JOIN nacion n ON a.nacion_id = n.id
        LEFT JOIN idiomas i ON c.idioma_id = i.id
        ORDER BY RAND() LIMIT 1";

$cita = $pdo->query($sql)->fetch();
?>
<!DOCTYPE html>
<html lang="la">
<head>
    <meta charset="UTF-8">
    <title>Sententia diei</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="container">
    <h1>Sententia diei</h1>
    <div class="fecha"><?php echo $fecha_hoy; ?></div>
    <div class="version">Versio 1.0 beta</div>

    <?php if ($cita): ?>
        <blockquote>
            <?php if ($cita['cita_traducida']): ?>
                <div class="cita-traducida"><?php echo htmlspecialchars($cita['cita_traducida']); ?></div>
            <?php endif; ?>

            <div class="cita-original">
                <?php echo htmlspecialchars($cita['cita_original']); ?>
                <?php if ($cita['idioma']): ?>
                    <span class="idioma-badge"><?php echo htmlspecialchars($cita['idioma']); ?></span>
                <?php endif; ?>
            </div>

            <?php if ($cita['cita_la']): ?>
                <div class="cita-la">
                    <?php echo htmlspecialchars($cita['cita_la']); ?>
                    <span class="badge-la">la</span>
                </div>
            <?php endif; ?>

            <footer>
                <?php 
                    $nac = formatoAno($cita['nacimiento']);
                    $mue = formatoAno($cita['muerte']);
                    echo htmlspecialchars($cita['autor']);
                    if ($nac || $mue) {
                        echo " ($nac";
                        if ($mue) echo " - $mue";
                        echo ")";
                    }
                ?>
            </footer>

            <?php if ($cita['biografia_la']): ?>
                <div class="biografia"><?php echo htmlspecialchars($cita['biografia_la']); ?></div>
            <?php endif; ?>
        </blockquote>

        <div class="info-boxes">
            <div class="info-box"><?php echo $cita['epoca'] ?: 'Aetas ignota'; ?></div>
            <div class="info-box"><?php echo $cita['nacion'] ?: 'Natio ignota'; ?></div>
        </div>

    <?php else: ?>
        <p>No hay citas disponibles.</p>
    <?php endif; ?>
</div>
</body>
</html>
