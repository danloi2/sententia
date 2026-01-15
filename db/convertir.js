/**
 * js/convertir.js
 *
 * Converts an Excel file (esaldi.xlsx) to CSV (esaldi.csv) and then to JSON (esaldi.json).
 * - Reads "frases" sheet from Excel.
 * - Handles BOM (Byte Order Mark) if present.
 * - Configured for semicolon-delimited CSV with headers.
 * - Outputs pretty-printed JSON for readability.
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync'; // Synchronous CSV parser for simplicity
import * as XLSX from 'xlsx/xlsx.mjs';
import { execSync } from 'child_process';
import * as fs_for_xlsx from 'fs'; // Renamed to avoid conflict with default 'fs' import
XLSX.set_fs(fs_for_xlsx);

// ------------------------------
// PATH CONFIGURATION
// ------------------------------

// In ES Modules, __dirname must be reconstructed
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Absolute paths to files
const xlsxPath = path.join(__dirname, '../db/esaldi.xlsx');
const csvPath = path.join(__dirname, '../db/esaldi.csv');
const jsonPath = path.join(__dirname, '../db/esaldi.json');

// ------------------------------
// 1. CONVERT EXCEL TO CSV
// ------------------------------

try {
  console.log(`📖 Reading Excel file: ${xlsxPath}`);
  const workbook = XLSX.readFile(xlsxPath);

  // Get the sheet named "frases"
  const sheetName = 'frases';
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" not found in ${xlsxPath}`);
  }

  // Convert sheet to CSV string with ";" delimiter
  const csvContent = XLSX.utils.sheet_to_csv(worksheet, { FS: ';' });

  // Save to CSV file
  fs.writeFileSync(csvPath, csvContent, 'utf8');
  console.log(`✅ Sheet "${sheetName}" saved to CSV: ${csvPath}`);
} catch (err) {
  console.error('❌ Error processing Excel:', err.message);
  process.exit(1);
}

// ------------------------------
// 2. READ CSV FILE (for JSON conversion)
// ------------------------------

// Read CSV synchronously with UTF-8 encoding
let csvData;
try {
  csvData = fs.readFileSync(csvPath, 'utf8');
} catch (err) {
  console.error('❌ Error reading CSV:', err);
  process.exit(1);
}

// ------------------------------
// 3. PARSE CSV TO JSON
// ------------------------------

// Clean BOM if present at the start of the file
csvData = csvData.replace(/^\uFEFF/, '');

let jsonOutput;
try {
  jsonOutput = parse(csvData, {
    columns: true, // Use first row as column headers → object keys
    skip_empty_lines: true, // Ignore empty rows
    delimiter: ';', // Semicolon-delimited CSV
  });
} catch (err) {
  console.error('❌ Error parsing CSV:', err);
  process.exit(1);
}

// ------------------------------
// 4. WRITE JSON TO DISK
// ------------------------------

try {
  fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2)); // Pretty-print JSON with 2 spaces
  console.log(`✅ CSV successfully converted to JSON: ${jsonPath}`);
} catch (err) {
  console.error('❌ Error writing JSON:', err);
  process.exit(1);
}

// ------------------------------
// 5. GIT PUSH (Automated)
// ------------------------------

try {
  console.log('🚀 Checking for changes to push to GitHub...');

  // Add specific files to stage
  const filesToStage = [xlsxPath, csvPath, jsonPath, path.join(__dirname, 'convertir.js')];
  filesToStage.forEach((file) => {
    execSync(`git add "${file}"`, { stdio: 'inherit' });
  });

  // Check if there are staged changes (exit code 1 means changes exist)
  try {
    execSync('git diff --cached --quiet');
    console.log('ℹ️ No changes detected. Nothing to push.');
  } catch (diffError) {
    // If exit code is not 0, it means there ARE changes to commit
    console.log('📝 Changes detected, committing...');

    // Commit with a clear message
    const timestamp = new Date().toISOString();
    execSync(`git commit -m "Auto-update DB files: ${timestamp}"`, { stdio: 'inherit' });

    // Push to main branch
    execSync('git push origin main', { stdio: 'inherit' });

    console.log('✅ Changes successfully pushed to GitHub!');
  }
} catch (err) {
  console.error('❌ Error in Git automation:', err.message);
}
