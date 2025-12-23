import pymysql
import json

# Conexión a MariaDB
conn = pymysql.connect(
    host="127.0.0.1",       # localhost
    port=3307,              # puerto mapeado del contenedor
    user="danloi",
    password="44194419", # la contraseña de tu usuario
    database="esaldi",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)

cur = conn.cursor()

# Función para exportar toda una tabla
def export(table):
    cur.execute(f"SELECT * FROM {table}")
    return cur.fetchall()

# Exportar todas las tablas que necesites
data = {
    "citas": export("citas"),
    "autores": export("autores"),
    "categorias": export("categorias"),
    "citas_categorias": export("citas_categorias"),
    "epocas": export("epocas_historicas"),
    "idiomas": export("idiomas"),
    "naciones": export("nacion"),
    "tipos": export("tipos_citas")
}

# Guardar en JSON
with open("data/esaldi.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2, default=str)


conn.close()

print("JSON generado en data/esaldi.json")
