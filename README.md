# Sententia diei 🏛️

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=black)
![JSON](https://img.shields.io/badge/Data-JSON-lightgrey?logo=json&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?logo=node.js&logoColor=white)
![Sharp](https://img.shields.io/badge/Image_Processing-Sharp-00A67E?logo=sharp&logoColor=white)
![Version](https://img.shields.io/github/v/release/danloi2/sententia?style=flat-square)
![License](https://img.shields.io/badge/License-CC--BY--SA_4.0-lightgrey)

**Sententia diei** is a lightweight web application that displays **historical Latin quotes** with their translations. It operates as a fully **static** site, using **JavaScript (ES6 Modules)** to fetch and process data from **JSON** files.

---

## 📑 Table of Contents

* [Project Structure](https://www.google.com/search?q=%23project-structure)
* [Local Development](https://www.google.com/search?q=%23local-development)
* [Updating Data](https://www.google.com/search?q=%23updating-data)
* [Image Generation](https://www.google.com/search?q=%23image-generation)
* [Visual Style](https://www.google.com/search?q=%23visual-style)
* [Prompts](https://www.google.com/search?q=%23prompts)


* [Tech Stack](https://www.google.com/search?q=%23tech-stack)
* [Deployment](https://www.google.com/search?q=%23deployment)
* [License](https://www.google.com/search?q=%23license)
* [Author](https://www.google.com/search?q=%23author)

---

## Project Structure

```
📂 db/                     Portable data repository
  📄 esaldi.xlsx           Source spreadsheet for quotes
  📄 esaldi.csv            Exported from Excel/LibreOffice in UTF-8
  📄 esaldi.json           Auto-generated using convertir.js
  ℹ️ convertir.js          Script to convert CSV to JSON

📂 js/                     Core logic in JavaScript ES6
  ⚙️ lecturajson.js        Initialization, data loading, and statistics
  🔍 buscar.js             Search engine with filtering capabilities
  📋 copiar.js             Clipboard copy functionality with formatting
  🕒 fecha.js              "Latin-style" date and time with Tailwind-styled icons
  ⚡ transparente.js        Converts white-background PNGs to transparent using Sharp

📂 assets/                 Application resources
  📄 favicon.ico           Site icon
  📂 autores/transparente  Processed PNGs with transparent backgrounds

🌐 index.html             UI built with Tailwind CSS 4.1

```

---

## Local Development

The project is fully integrated with **Node.js**. You do not need external servers like Python.

### 1. Install dependencies

```bash
npm install

```

### 2. Launch the local server

This starts `live-server` and opens the project in your browser:

```bash
npm start

```

### 3. CSS Workflow (Tailwind 4)

To manage your styles with the Tailwind CSS CLI:

```bash
# Build the production CSS
npm run build:css

# Watch for changes during development
npm run watch:css

```

---

## Updating Data

To refresh the database from your source Excel file:

1. Export `esaldi.xlsx` to `esaldi.csv` in UTF-8 format.
2. Run the conversion script (uses `xlsx` and `csv-parse`):

```bash
node db/convertir.js

```

---

## Image Generation

Images for authors and flags are generated using **Google Gemini (Nano Banana)** to maintain a uniform historical aesthetic.

### 🎨 Visual Style

* Traditional colored pencil and graphite drawing.
* Fine cross-hatching and academic shading.
* High resolution (8k) on a pure white background.

### Prompts

**Historical Figures:**

> A historically accurate colored portrait of '[AUTHOR NAME]' isolated on a pure white background. Traditional colored pencil and graphite style, fine cross-hatching, and delicate academic shading. Natural skin tones and soft colors. Crisp outlines, high contrast edges, and refined classical drawing aesthetic. High resolution, 8k.

After generation, the `js/transparente.js` script uses **Sharp** to remove the white background and create clean PNGs.

---

## Tech Stack

* **Frontend**: Vanilla JavaScript (ES6+), Tailwind CSS 4.1.
* **Data**: JSON (converted from XLSX/CSV).
* **Backend/Tooling**:
* **Node.js**: Runtime environment.
* **Sharp**: Image processing for transparency.
* **Live-server**: Development server with auto-reload.
* **XLSX & CSV-Parse**: Automation for data ingestion.



---

## Deployment

Since the app is purely static, it is optimized for **GitHub Pages**. Just push your changes to the main branch and ensure Pages is pointed to your root directory.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 👥 Author

**Developed by Daniel Losada**

[![GitHub](https://img.shields.io/badge/GitHub-danloi2-181717?style=for-the-badge&logo=github)](https://github.com/danloi2)
[![Researcher EHU](https://img.shields.io/badge/Researcher-EHU-blue?style=for-the-badge&logo=researchgate)](https://github.com/danloi2)

---

_Developed with ❤️ for the educational community._

---
