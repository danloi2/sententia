/**
 * js/transparente.js
 *
 * Author Image Processing Script
 *
 * Generates:
 * 1. Alpha PNG (transparent) using Sharp
 * 2. Monochrome SVG (silhouette) using Potrace
 * 3. Color SVG (vectorized) using ImageTracerJS
 * 4. Color thumbnails using Sharp
 *
 * Node.js ESM compatible
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import sharp from "sharp";
import ImageTracer from "imagetracerjs";

const require = createRequire(import.meta.url);
const potrace = require("potrace");

// ------------------------------
// PATH CONFIGURATION
// ------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORIGINAL_DIR = path.join(__dirname, "../assets/autores/original");
const ALPHA_DIR = path.join(__dirname, "../assets/autores/alpha");
const PNG_DIR = path.join(ALPHA_DIR, "png");
const SVG_MONO_DIR = path.join(ALPHA_DIR, "svg_mono");
const SVG_COLOR_DIR = path.join(ALPHA_DIR, "svg_color");
const THUMB_DIR = path.join(ALPHA_DIR, "thumbnails"); // New folder for thumbnails

const TRANSPARENT_COLOR = { r: 255, g: 255, b: 255 };
const TOLERANCE = 30;
const THUMB_WIDTH = 150; // pixels

// Create output directories if missing
[ALPHA_DIR, PNG_DIR, SVG_MONO_DIR, SVG_COLOR_DIR, THUMB_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ------------------------------
// 1. GENERATE ALPHA PNG
// ------------------------------
async function generateAlphaPNG(inputPath, outputPath) {
  if (fs.existsSync(outputPath)) return;

  const image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    if (Math.abs(data[i] - TRANSPARENT_COLOR.r) <= TOLERANCE &&
        Math.abs(data[i+1] - TRANSPARENT_COLOR.g) <= TOLERANCE &&
        Math.abs(data[i+2] - TRANSPARENT_COLOR.b) <= TOLERANCE) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(outputPath);

  console.log("🖼 PNG Alpha OK:", path.basename(outputPath));
}

// ------------------------------
// 2. GENERATE MONOCHROME SVG
// ------------------------------
async function generatePotraceSVG(inputPath, outputPath) {
  if (fs.existsSync(outputPath)) return;

  try {
    const buffer = await sharp(inputPath)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .grayscale()
      .png()
      .toBuffer();

    return new Promise((resolve) => {
      potrace.trace(buffer, { color: "black", background: "transparent" }, (err, svg) => {
        if (!err) fs.writeFileSync(outputPath, svg);
        console.log("👤 SVG Mono OK:", path.basename(outputPath));
        resolve();
      });
    });
  } catch (e) {
    console.error("❌ Error generating Potrace SVG:", e.message);
  }
}

// ------------------------------
// 3. GENERATE COLOR SVG
// ------------------------------
async function generateColorSVG(inputPath, outputPath) {
  if (fs.existsSync(outputPath)) return;

  try {
    const { data, info } = await sharp(inputPath)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const svgString = ImageTracer.imagedataToSVG(
      { width: info.width, height: info.height, data },
      { numberofcolors: 16, ltres: 1, qtres: 1, viewbox: true }
    );

    fs.writeFileSync(outputPath, svgString);
    console.log("🎨 SVG Color OK:", path.basename(outputPath));
  } catch (e) {
    console.error("❌ Error generating Color SVG:", e.message);
  }
}

// ------------------------------
// 4. GENERATE COLOR THUMBNAIL
// ------------------------------
async function generateThumbnail(inputPath, outputPath) {
  if (fs.existsSync(outputPath)) return;

  try {
    await sharp(inputPath)
      .resize({ width: THUMB_WIDTH })
      .toFile(outputPath);

    console.log("🔹 Thumbnail OK:", path.basename(outputPath));
  } catch (e) {
    console.error("❌ Error generating thumbnail:", e.message);
  }
}

// ------------------------------
// MAIN PROCESS
// ------------------------------
async function main() {
  const files = fs.readdirSync(ORIGINAL_DIR).filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  console.log(`🚀 Processing ${files.length} images...`);

  for (const file of files) {
    const inputPath = path.join(ORIGINAL_DIR, file);
    const baseName = path.parse(file).name + "_alpha";

    await generateAlphaPNG(inputPath, path.join(PNG_DIR, baseName + ".png"));
    await generatePotraceSVG(inputPath, path.join(SVG_MONO_DIR, baseName + ".svg"));
    await generateColorSVG(inputPath, path.join(SVG_COLOR_DIR, baseName + ".svg"));
    await generateThumbnail(inputPath, path.join(THUMB_DIR, baseName + ".png"));
  }

  console.log("\n✅ All image processing complete.");
}

main();
