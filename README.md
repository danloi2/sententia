# Sententia diei 🏛️

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![JSON](https://img.shields.io/badge/Data-JSON-lightgrey?logo=json)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-CC--BY--SA_4.0-lightgrey)

**Sententia diei** es una aplicación web ligera que muestra **citas históricas en latín** y su traducción. Ahora funciona de forma totalmente estática utilizando **JavaScript** para leer datos desde archivos **JSON**.

## 📂 Nueva Estructura del Proyecto

La arquitectura se ha simplificado eliminando el motor de base de datos del lado del servidor. Ahora, toda la lógica reside en el cliente (navegador) para garantizar la máxima velocidad.

    📂 db/: Repositorio de datos portátil.

        📄 esaldi.json: Diccionario central con citas y metadatos.

    📂 js/: Núcleo de lógica en JavaScript ES6.

        ⚙️ lecturajson.js: Inicialización de la App, fetch de datos y estadísticas.

        🔍 buscar.js: Motor de búsqueda con filtrado multilingüe.

        📋 copiar.js: Gestor de portapapeles con formato Quotation.

        🕒 fecha.js: Sistema de calendario y reloj con horas romanas.

    🌐 index.html: Interfaz de usuario construida con Bootstrap 5.3.


## 🚀 Cómo ejecutarlo localmente

Al ser una aplicación basada en módulos de JavaScript y peticiones `fetch()`, necesitas un servidor web local sencillo (por seguridad de los navegadores al leer archivos locales):

1. **VS Code:** Instala la extensión **Live Server** y pulsa "Go Live".
2. **Python:** Ejecuta `python -m http.server 8000` en la carpeta raíz.
3. **Node.js:** Ejecuta `npx serve`.

Accede a: `http://localhost:8000` (o el puerto indicado).

## 🛠️ Tecnologías utilizadas

- **Vanilla JavaScript:** Gestión de datos asíncrona (Fetch API).
- **JSON:** Almacenamiento de citas y metadatos.
- **Bootstrap 5.3:** Diseño responsivo y componentes premium.
- **Bootstrap Icons:** Iconografía dinámica (sol/luna para la hora romana).

## 🌐 Despliegue

¡Buenas noticias! Al no usar PHP ni SQL, ahora **GitHub Pages** es totalmente compatible. Solo necesitas subir tus archivos a un repositorio y activar Pages en la configuración.


## 📜 Licencia

Este proyecto está bajo **[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)**.

## 👤 Autor


[![GitHub](https://img.shields.io/badge/GitHub-Daniel_Losada-181717?logo=github&logoColor=white)](https://github.com/danloi2)  
[![Profesor Titular de Universidad](https://img.shields.io/badge/Investigador-EHU-blue?logo=researchgate)](https://ekoizpen-zientifikoa.ehu.eus/investigadores/130988/detalle)

