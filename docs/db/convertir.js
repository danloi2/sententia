/**
 * js/convertir.js
 *
 * Converts a CSV file (esaldi.csv) to JSON (esaldi.json).
 * - Uses synchronous methods for simplicity.
 * - Handles BOM (Byte Order Mark) if present.
 * - Configured for semicolon-delimited CSV with headers.
 * - Outputs pretty-printed JSON for readability.
 */

import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync"; // Synchronous CSV parser for simplicity

// ------------------------------
// PATH CONFIGURATION
// ------------------------------

// In ES Modules, __dirname must be reconstructed
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Absolute paths to source CSV and destination JSON
const csvPath = path.join(__dirname, "../db/esaldi.csv");
const jsonPath = path.join(__dirname, "../db/esaldi.json");

// ------------------------------
// READ CSV FILE
// ------------------------------

// Read CSV synchronously with UTF-8 encoding
let csvData;
try {
  csvData = fs.readFileSync(csvPath, "utf8");
} catch (err) {
  console.error("❌ Error reading CSV:", err);
  process.exit(1); // Stop execution if CSV cannot be read
}

// ------------------------------
// PARSE CSV TO JSON
// ------------------------------

// Clean BOM if present at the start of the file
csvData = csvData.replace(/^\uFEFF/, "");

let jsonOutput;
try {
  jsonOutput = parse(csvData, {
    columns: true, // Use first row as column headers → object keys
    skip_empty_lines: true, // Ignore empty rows
    delimiter: ";", // Semicolon-delimited CSV
  });
} catch (err) {
  console.error("❌ Error parsing CSV:", err);
  process.exit(1); // Stop execution on parse error
}

// ------------------------------
// WRITE JSON TO DISK
// ------------------------------

try {
  fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2)); // Pretty-print JSON with 2 spaces
  console.log(`✅ CSV successfully converted to JSON: ${jsonPath}`);
} catch (err) {
  console.error("❌ Error writing JSON:", err);
  process.exit(1); // Stop execution if write fails
}

