# Sententia diei 🏛️

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![JSON](https://img.shields.io/badge/Data-JSON-lightgrey?logo=json)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap&logoColor=white)
![Version](https://img.shields.io/github/v/release/danloi2/sententia?label=version&style=flat-square)
![License](https://img.shields.io/badge/License-CC--BY--SA_4.0-lightgrey)

**Sententia diei** es una aplicación web ligera que muestra **citas históricas en latín** con sus traducciones, funcionando completamente de manera **estática** usando **JavaScript** para leer datos desde **JSON**.

Versión actual: **2.0.0**

---

## 📂 Estructura del Proyecto

La arquitectura ha sido simplificada: toda la lógica está en el navegador para máxima velocidad.

📂 db/ # Repositorio de datos portátil
📄 esaldi.json # Diccionario central de citas y metadatos

📂 js/ # Lógica principal en JavaScript ES6
⚙️ lecturajson.js # Inicialización, carga de datos y estadísticas
🔍 buscar.js # Motor de búsqueda con filtrado multilingüe
📋 copiar.js # Gestión de portapapeles y formato de citas
🕒 fecha.js # Sistema de fecha y hora romana

🌐 index.html # Interfaz de usuario construida con Bootstrap


---

## 🚀 Cómo Ejecutar Localmente

Al ser una aplicación **modular en JS** usando `fetch()`, necesitas un servidor web simple para evitar restricciones de seguridad al leer archivos locales:

1. **VS Code:** Instalar la extensión **Live Server** y hacer click en "Go Live".
2. **Python:** Ejecutar `python -m http.server 8000` en la carpeta raíz.
3. **Node.js:** Ejecutar `npx serve`.

Accede en: `http://localhost:8000` (o el puerto indicado).

---

## 🛠️ Tecnologías Usadas

- **Vanilla JavaScript:** Manejo de datos asíncrono (Fetch API)  
- **JSON:** Almacenamiento de citas y metadatos  
- **Bootstrap 5.3:** Diseño responsive y componentes estéticos  
- **Bootstrap Icons:** Iconografía dinámica (sol/luna para horas romanas)  

---

## 🌐 Despliegue

Como no utiliza PHP ni SQL, **GitHub Pages** funciona perfectamente. Solo sube los archivos a un repositorio y habilita Pages en la configuración.

---

## 📜 Licencia

Este proyecto está bajo **[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)**.

---

## 👤 Autor

[![GitHub](https://img.shields.io/badge/GitHub-Daniel_Losada-181717?logo=github&logoColor=white)](https://github.com/danloi2)  
[![Investigador EHU](https://img.shields.io/badge/Researcher-EHU-blue?logo=researchgate)](https://ekoizpen-zientifikoa.ehu.eus/investigadores/130988/detalle)

