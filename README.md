# Sententia diei 🏛️

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![JSON](https://img.shields.io/badge/Data-JSON-lightgrey?logo=json)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-CC--BY--SA_4.0-lightgrey)

**Sententia diei** is a lightweight web application that displays **historical quotes in Latin** along with their translations. It now works entirely statically using **JavaScript** to read data from **JSON** files.

## 📂 New Project Structure

The architecture has been simplified by removing the server-side database engine. Now, all logic resides in the client (browser) to ensure maximum speed.

    📂 db/: Portable data repository.

        📄 esaldi.json: Central dictionary with quotes and metadata.

    📂 js/: Core logic in ES6 JavaScript.

        ⚙️ lecturajson.js: App initialization, data fetching, and statistics.

        🔍 buscar.js: Search engine with multilingual filtering.

        📋 copiar.js: Clipboard manager with Quotation formatting.

        🕒 fecha.js: Calendar and clock system with Roman hours.

    🌐 index.html: User interface built with Bootstrap 5.3.


## 🚀 How to Run Locally

As this is a JavaScript module-based application using `fetch()`, you need a simple local web server (due to browser security when reading local files):

1. **VS Code:** Install the **Live Server** extension and click "Go Live".
2. **Python:** Run `python -m http.server 8000` in the root folder.
3. **Node.js:** Run `npx serve`.

Access: `http://localhost:8000` (or the port specified).

## 🛠️ Technologies Used

- **Vanilla JavaScript:** Asynchronous data handling (Fetch API).
- **JSON:** Storage for quotes and metadata.
- **Bootstrap 5.3:** Responsive design and premium components.
- **Bootstrap Icons:** Dynamic iconography (sun/moon for Roman hours).

## 🌐 Deployment

Good news! Since it doesn’t use PHP or SQL, **GitHub Pages** is now fully compatible. You just need to upload your files to a repository and enable Pages in the settings.

## 📜 License

This project is licensed under **[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)**.

## 👤 Author

[![GitHub](https://img.shields.io/badge/GitHub-Daniel_Losada-181717?logo=github&logoColor=white)](https://github.com/danloi2)  
[![Full University Professor](https://img.shields.io/badge/Researcher-EHU-blue?logo=researchgate)](https://ekoizpen-zientifikoa.ehu.eus/investigadores/130988/detalle)

