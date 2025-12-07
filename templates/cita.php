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
        <div class="fecha"><?php echo htmlspecialchars($fecha_hoy); ?></div>
        <div class="version">Versio 1.0 beta</div>

        <?php if ($cita): ?>
            <blockquote class="cita-block">
                <p class="cita-traducida"><?php echo htmlspecialchars($cita['cita_traducida']); ?></p>
                <p class="cita-original"><?php echo htmlspecialchars($cita['cita_original']); ?>
                    <span class="badge idioma"><?php echo htmlspecialchars($cita['idioma']); ?></span>
                    <span class="badge latin"><?php echo htmlspecialchars($cita['cita_la']); ?></span>
                </p>
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
                <div class="info-box"><?php echo $cita['epoca'] ?: 'Epoca ignota'; ?></div>
                <div class="info-box"><?php echo $cita['nacion'] ?: 'Natio ignota'; ?></div>
            </div>
        <?php else: ?>
            <p>No hay citas disponibles.</p>
        <?php endif; ?>
    </div>
</body>
</html>
