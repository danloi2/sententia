# Sententia diei

![PHP](https://img.shields.io/badge/PHP-8.2-blue?logo=php)
![MariaDB](https://img.shields.io/badge/MariaDB-12.1-blue?logo=mariadb)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![License](https://img.shields.io/badge/License-CC--BY--SA_4.0-lightgrey)

**Sententia diei** es una aplicación web en PHP que muestra **citas históricas en latín** y su traducción, junto con información sobre autores, época, nación e idioma.  

---

## 🌟 Capturas de pantalla

<!-- Sustituye con tus propias imágenes -->
![Página principal](assets/screenshot-home.png)
![phpMyAdmin](assets/screenshot-phpmyadmin.png)

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
└─ .env.example


- `Dockerfile`: PHP + Apache con soporte PDO para MariaDB.  
- `docker-compose.yml`: Contenedores PHP, MariaDB y phpMyAdmin.  
- `index.php`: Página principal que muestra la cita del día.  
- `assets/`: CSS y recursos estáticos.  
- `include/`: Conexión a base de datos y funciones auxiliares.  
- `templates/`: Plantillas HTML.  
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

Crea tu archivo .env basado en .env.example:

MARIADB_ROOT_PASSWORD=tu_contraseña_segura
MARIADB_DATABASE=esaldi
MARIADB_USER=danloi
MARIADB_PASSWORD=tu_contraseña_segura
PMA_HOST=mariadb2
PMA_USER=danloi
PMA_PASSWORD=tu_contraseña_segura


Levanta los contenedores:

docker-compose up -d --build
# o con podman
podman-compose up -d --build


Accede desde el navegador:

Web: http://localhost:8000

phpMyAdmin: http://localhost:8081

Usuario: danloi

Contraseña: la definida en .env

📝 Uso

Página principal muestra una cita aleatoria con su traducción, autor y detalles históricos.

Funciones auxiliares para fechas, números romanos y biografías.

Agrega nuevas citas directamente desde phpMyAdmin en la base de datos esaldi.

💻 Desarrollo

Monta tu carpeta de desarrollo en ./web dentro del contenedor.

Recomiendo usar VS Code + Dev Containers para desarrollo dentro del contenedor.

Nunca subas tu .env real; usa .env.example para compartir.

🌐 Despliegue

Se recomienda un host que soporte Docker Compose o contenedores PHP/MariaDB, como:

Railway

Render

GitHub Pages NO soporta PHP ni bases de datos, solo HTML estático.

📜 Licencia

Este proyecto está bajo Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
Más info

👤 Autor

Daniel Losada – GitHub
 – Investigador
