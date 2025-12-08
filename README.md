# Sententia diei

![PHP](https://img.shields.io/badge/PHP-8.2-blue?logo=php)
![MariaDB](https://img.shields.io/badge/MariaDB-12.1-blue?logo=mariadb)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![License](https://img.shields.io/badge/License-CC--BY--SA_4.0-lightgrey)

**Sententia diei** es una aplicación web en PHP que muestra **citas históricas en latín** y su traducción, junto con información sobre autores, época, nación e idioma.

---

## 🌟 Capturas de pantalla

<!-- Sustituye con tus propias imágenes en assets/ -->
![Página principal](assets/home.png)
![phpMyAdmin](assets/php_admin.png)

---

## 📂 Estructura del proyecto


/
├─ Dockerfile
├─ docker-compose.yml
├─ index.php
├─ assets/
│ └─ style.css
├─ include/
│ ├─ db.php
│ └─ functions.php
├─ templates/
│ └─ citas.php
├─ db/
│ └─ esaldi.sql
└─ .env.example


- `Dockerfile`: PHP + Apache con soporte PDO para MariaDB.  
- `docker-compose.yml`: Contenedores PHP, MariaDB y phpMyAdmin.  
- `index.php`: Página principal que muestra la cita del día.  
- `assets/`: CSS y recursos estáticos.  
- `include/`: Conexión a base de datos y funciones auxiliares.  
- `templates/`: Plantillas HTML.  
- `db/esaldi.sql`: Dump de la base de datos con estructura y datos de ejemplo.  
- `.env.example`: Variables de entorno de configuración (NO subir `.env` real).

---

## ⚙️ Requisitos

- Docker o Podman  
- Docker Compose (o `podman-compose`)  
- PHP 8.2+ (contenedor ya preparado)  

---

## 🚀 Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/danloi2/sententia.git
cd sententia
```

2. Crea tu archivo .env basado en .env.example:

```env
MARIADB_ROOT_PASSWORD=tu_contraseña_segura
MARIADB_DATABASE=esaldi
MARIADB_USER=danloi
MARIADB_PASSWORD=tu_contraseña_segura
PMA_HOST=mariadb2
PMA_USER=danloi
PMA_PASSWORD=tu_contraseña_segura
```
3. Levanta los contenedores:

```bash
docker-compose up -d --build
# o con podman
podman-compose up -d --build
```

4. Accede desde el navegador:

- **Web:** [http://localhost:8000](http://localhost:8000)  
- **phpMyAdmin:** [http://localhost:8081](http://localhost:8081)  
  - **Usuario:** `danloi`  
  - **Contraseña:** la definida en `.env`

🗄 Base de datos

Se incluye un dump db/esaldi.sql con la estructura y datos de ejemplo.

Para restaurarlo:

```bash
docker exec -i mariadb2 mysql -u danloi -p esaldi < db/esaldi.sql
# o con podman
podman exec -i mariadb2 mysql -u danloi -p esaldi < db/esaldi.sql
```


### 📝 Uso

- La página principal muestra una cita aleatoria con su traducción, autor y detalles históricos.
- Funciones auxiliares para fechas, números romanos y biografías.
- Agrega nuevas citas directamente desde **phpMyAdmin** en la base de datos `esaldi`.

### 💻 Desarrollo

- Monta tu carpeta de desarrollo en `./web` dentro del contenedor.
- Se recomienda usar **VS Code + Dev Containers** para desarrollo dentro del contenedor.
- Nunca subas tu `.env` real; usa `.env.example` para compartir.

### 🌐 Despliegue

Se recomienda un host que soporte Docker Compose o contenedores PHP/MariaDB, como:

- [Railway](https://railway.app/)
- [Render](https://render.com/)

> ⚠️ GitHub Pages NO soporta PHP ni bases de datos, solo HTML estático.

### 📜 Licencia

Este proyecto está bajo **[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)**.

### 👤 Autor


[![GitHub](https://img.shields.io/badge/GitHub-Daniel_Losada-181717?logo=github&logoColor=white)](https://github.com/danloi2)  
[![Profesor Titular de Universidad](https://img.shields.io/badge/Investigador-EHU-blue?logo=researchgate)](https://ekoizpen-zientifikoa.ehu.eus/investigadores/130988/detalle)

