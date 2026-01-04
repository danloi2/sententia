# Sententia diei 🏛️

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![JSON](https://img.shields.io/badge/Data-JSON-lightgrey?logo=json)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap&logoColor=white)
![Version](https://img.shields.io/github/v/release/danloi2/sententia?style=flat-square)
![License](https://img.shields.io/badge/License-CC--BY--SA_4.0-lightgrey)

**Sententia diei** es una aplicación web ligera que muestra **citas históricas en latín** con sus traducciones. Funciona completamente de forma **estática**, usando **JavaScript** para leer datos desde **JSON**.

![Sententia diei](assets/sententiadiei.png)

---
## 📑 Índice

- [Estructura del Proyecto](#Estructura-del-Proyecto)  
- [Cómo se generan las imágenes](#-cómo-se-generan-las-imágenes)  
  - [Personajes](#personajes)  
  - [Banderas para refranes y proverbios](#banderas-para-refranes-y-proverbios)  
- [Cómo actualizar los datos](#-cómo-actualizar-los-datos)  
- [Cómo ejecutar localmente](#-cómo-ejecutar-localmente)  
- [Tecnologías Usadas](#-tecnologías-usadas)  
- [Despliegue](#-despliegue)  
- [Licencia](#-licencia)  
- [Autor](#-autor)


## Estructura del Proyecto
```
📂 db/                      Repositorio de datos portátil
  📄 esaldi.xlsx           Archivo de origen de citas
  📄 esaldi.csv            Exportado desde Excel/LibreOffice en UTF-8
  📄 esaldi.json           Generado automáticamente usando convertir.js
  ℹ️ convertir.js          Script que convierte CSV a JSON

📂 js/                      Lógica central en JavaScript ES6
  ⚙️ lecturajson.js        Inicialización, carga de datos y estadísticas
  🔍 buscar.js             Motor de búsqueda con filtrado
  📋 copiar.js             Copiado al portapapeles con formato
  🕒 fecha.js              Fecha y hora "a la latina" con iconos y badges Bootstrap
  ⚡ transparente.js       Convierte imágenes PNG con fondo blanco a transparente usando Sharp

📂 assets/                  Recursos de la aplicación
  📄 favicon.ico           Icono de la página
  📂 autores/transparente  PNGs procesados con fondo transparente

🌐 index.html              Interfaz de usuario construida con Bootstrap 5.3
```

---

## Cómo se generan las imágenes

Las imágenes de **personajes** y **banderas** se crean con **Google Gemini / Nano Banana**, usando los siguientes prompts:

### PERSONAJES
```
A historically accurate colored portrait of '[NOMBRE DEL AUTOR]' isolated on a pure white background.
Traditional colored pencil and graphite style, fine cross-hatching, and delicate academic shading.
Natural skin tones and soft colors. Crisp outlines, high contrast edges, and refined classical drawing aesthetic.
Focus on facial features and authentic historical iconography. High resolution, 8k.
```

### BANDERAS PARA REFRANES Y PROVERBIOS
```
A historically accurate illustration of the '[NOMBRE DE LA BANDERA O PAÍS]' flag, isolated on a pure white background.
Traditional colored pencil and graphite style, fine cross-hatching, and delicate academic shading on the fabric folds.
Soft, aged colors and natural pigment tones. Crisp outlines, high contrast edges, and refined classical vexillology aesthetic.
Focus on textile texture, authentic historical embroidery, and heraldic details. High resolution, 8k.
```

Después, mediante el script `js/transparente.js`, se eliminan los fondos blancos para generar PNGs con transparencia.

---

## Cómo actualizar los datos

Para refrescar la base de datos:

1. Exporta `esaldi.xlsx` a `esaldi.csv` en UTF-8.
2. Ejecuta el script de conversión dentro de la carpeta `db`:
```bash
node convertir.js
```

Esto generará automáticamente `esaldi.json` listo para la aplicación.

---

## Cómo ejecutar localmente

Al ser una aplicación basada en módulos JS y usando `fetch()`, necesitas un servidor local:

- **VS Code**: Instalar la extensión **Live Server** y pulsar "Go Live".
- **Python**: Ejecutar:
```bash
python -m http.server 8000
```

- **Node.js**:
```bash
npx serve
```

Accede en: `http://localhost:8000` (o el puerto indicado).

---

## Tecnologías Usadas

- **Vanilla JavaScript**: Manejo de datos asíncrono (Fetch API)
- **JSON**: Almacenamiento de citas y metadatos
- **Bootstrap 5.3**: Diseño responsive y componentes estéticos
- **Bootstrap Icons**: Iconografía dinámica (sol/luna para horas romanas)

---

## Despliegue

Como no utiliza PHP ni SQL, **GitHub Pages** funciona perfectamente. Solo sube los archivos a un repositorio y habilita Pages en la configuración.

---

## Licencia

Este proyecto está bajo **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.

---

## Autor

[![GitHub](https://img.shields.io/badge/GitHub-Daniel_Losada-181717?logo=github&logoColor=white)](https://github.com/danloi2)  
[![Investigador EHU](https://img.shields.io/badge/Researcher-EHU-blue?logo=researchgate)](https://ekoizpen-zientifikoa.ehu.eus/investigadores/130988/detalle)
