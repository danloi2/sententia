import fs from "fs";
import path from "path";
import sharp from "sharp";

// Carpetas
const __dirname = path.resolve(); // como estamos en ESM
const inputDir = path.join(__dirname, "../assets/autores");
const outputDir = path.join(inputDir, "transparente");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Color de fondo a eliminar (blanco)
const colorFondo = { r: 255, g: 255, b: 255 };
const tolerancia = 30; // cuánto se permite aproximarse al blanco

function colorCerca(r, g, b, target, tol) {
  return (
    Math.abs(r - target.r) <= tol &&
    Math.abs(g - target.g) <= tol &&
    Math.abs(b - target.b) <= tol
  );
}

// Procesar cada PNG
const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith(".png"));

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  try {
    const image = sharp(inputPath).ensureAlpha(); // aseguramos canal alpha
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    // Recorrer todos los píxeles
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (colorCerca(r, g, b, colorFondo, tolerancia)) {
        data[i + 3] = 0; // alfa = 0 → transparente
      }
    }

    // Guardar el PNG con transparencia
    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toFile(outputPath);

    console.log("Procesada:", file);
  } catch (err) {
    console.error("Error procesando", file, err);
  }
}

