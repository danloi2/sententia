// js/convertir.js
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync"; // versión síncrona para simplificar

// __dirname en ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Rutas absolutas al CSV y JSON
const csvPath = path.join(__dirname, "../db/esaldi.csv");
const jsonPath = path.join(__dirname, "../db/esaldi.json");

// Leer CSV de forma síncrona
let csvData;
try {
  csvData = fs.readFileSync(csvPath, "utf8");
} catch (err) {
  console.error("Error leyendo CSV:", err);
  process.exit(1);
}

// Parsear CSV a JSON
let jsonOutput;
try {
  csvData = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, ""); // <--- limpiar BOM aquí
  jsonOutput = parse(csvData, {
    columns: true, // encabezados → keys
    skip_empty_lines: true, // ignorar filas vacías
    delimiter: ";", // tu CSV usa punto y coma
  });
} catch (err) {
  console.error("Error parseando CSV:", err);
  process.exit(1);
}

// Guardar JSON en disco
try {
  fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2));
  console.log(`✅ CSV convertido a JSON correctamente en: ${jsonPath}`);
} catch (err) {
  console.error("Error escribiendo JSON:", err);
  process.exit(1);
}
