# Sententia diei 🏛️

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![JSON](https://img.shields.io/badge/Data-JSON-lightgrey?logo=json)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap&logoColor=white)
![Version](https://img.shields.io/github/v/release/danloi2/sententia?style=flat-square)
![License](https://img.shields.io/badge/License-CC--BY--SA_4.0-lightgrey)

**Sententia diei** es una aplicación web ligera que muestra **citas históricas en latín** con sus traducciones. Funciona completamente de forma **estática**, usando **JavaScript** para leer datos desde **JSON**.

![Sententia diei](assets/sententiadiei.png)



## 📂 Estructura del Proyecto

    📂 db/: Repositorio de datos portátil
        📄 esaldi.xlsx    : Archivo de origen de citas
        📄 esaldi.csv     : Exportado desde Excel/LibreOffice en UTF-8
        📄 esaldi.json    : Generado automáticamente usando `convertir.js`
        ℹ️ convertir.js   : Script que convierte CSV a JSON

    📂 js/: Lógica central en JavaScript ES6
        ⚙️ lecturajson.js : Inicialización, carga de datos y estadísticas
        🔍 buscar.js      : Motor de búsqueda con filtrado
        📋 copiar.js      : Copiado al portapapeles con formato
        🕒 fecha.js       : Fecha y hora “a la latina” con iconos y badges Bootstrap

    📂 assets/: Recursos de la aplicación
        📄 favicon.ico    : Icono de la página

    🌐 index.html       : Interfaz de usuario construida con Bootstrap 5.3

## ℹ️ Cómo actualizar los datos

Para refrescar la base de datos:

1. Exporta `esaldi.xlsx` a `esaldi.csv` en **UTF-8**.  
2. Ejecuta el script de conversión dentro de la carpeta `db`:

```bash
node convertir.js
```

Esto generará automáticamente `esaldi.json` listo para la aplicación

## 🚀 Cómo ejecutar localmente

Al ser una aplicación basada en módulos JS y usando `fetch()`, necesitas un **servidor local** para evitar problemas de seguridad del navegador:

1. **VS Code:** Instalar la extensión **Live Server** y pulsar "Go Live".  
2. **Python:** Ejecutar:
   ```bash
   python -m http.server 8000
   ```
   
3. **Node.js:**
  ```bash
  Ejecutar `npx serve`.
  ```

Accede en: 

```bash
`http://localhost:8000` (o el puerto indicado).
```

## 🛠️ Tecnologías Usadas

- **Vanilla JavaScript:** Manejo de datos asíncrono (Fetch API)  
- **JSON:** Almacenamiento de citas y metadatos  
- **Bootstrap 5.3:** Diseño responsive y componentes estéticos  
- **Bootstrap Icons:** Iconografía dinámica (sol/luna para horas romanas)  

## 🌐 Despliegue

Como no utiliza PHP ni SQL, **GitHub Pages** funciona perfectamente. Solo sube los archivos a un repositorio y habilita Pages en la configuración.

## 📜 Licencia

Este proyecto está bajo **[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)**.

## 👤 Autor

[![GitHub](https://img.shields.io/badge/GitHub-Daniel_Losada-181717?logo=github&logoColor=white)](https://github.com/danloi2)  
[![Investigador EHU](https://img.shields.io/badge/Researcher-EHU-blue?logo=researchgate)](https://ekoizpen-zientifikoa.ehu.eus/investigadores/130988/detalle)

