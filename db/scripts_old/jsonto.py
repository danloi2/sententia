import sqlite3
import json
import os

# Crear carpeta data si no existe
os.makedirs("data", exist_ok=True)

# Cargar JSON
with open("data/esaldi.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Conectar SQLite
conn = sqlite3.connect("data/esaldi.db")
conn.execute("PRAGMA foreign_keys = ON")
cur = conn.cursor()

# -----------------------------
# CREAR TABLAS
# -----------------------------
cur.executescript("""
CREATE TABLE IF NOT EXISTS epocas_historicas (
    id INTEGER PRIMARY KEY,
    nombre TEXT,
    inicio_ano INTEGER,
    fin_ano INTEGER,
    nombre_la TEXT
);

CREATE TABLE IF NOT EXISTS nacion (
    id INTEGER PRIMARY KEY,
    nombre_nacion TEXT,
    nombre_nacion_la TEXT
);

CREATE TABLE IF NOT EXISTS idiomas (
    id INTEGER PRIMARY KEY,
    codigo TEXT,
    nombre TEXT
);

CREATE TABLE IF NOT EXISTS tipos_citas (
    id INTEGER PRIMARY KEY,
    nombre TEXT,
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY,
    nombre TEXT
);

CREATE TABLE IF NOT EXISTS autores (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    nacimiento_ano INTEGER,
    nacimiento_mes INTEGER,
    nacimiento_dia INTEGER,
    nacimiento_str TEXT,
    fallecimiento_ano INTEGER,
    fallecimiento_mes INTEGER,
    fallecimiento_dia INTEGER,
    fallecimiento_str TEXT,
    biografia TEXT,
    nombre_la TEXT,
    epoca_id INTEGER,
    nacion_id INTEGER,
    biografia_la TEXT,
    FOREIGN KEY (epoca_id) REFERENCES epocas_historicas(id),
    FOREIGN KEY (nacion_id) REFERENCES nacion(id)
);

CREATE TABLE IF NOT EXISTS citas (
    id INTEGER PRIMARY KEY,
    cita_original TEXT NOT NULL,
    cita_traducida TEXT,
    autor_id INTEGER,
    tipo_id INTEGER,
    idioma_id INTEGER,
    fuente TEXT,
    fecha_creacion TEXT,
    cita_la TEXT,
    FOREIGN KEY (autor_id) REFERENCES autores(id),
    FOREIGN KEY (tipo_id) REFERENCES tipos_citas(id),
    FOREIGN KEY (idioma_id) REFERENCES idiomas(id)
);

CREATE TABLE IF NOT EXISTS citas_categorias (
    cita_id INTEGER,
    categoria_id INTEGER,
    PRIMARY KEY (cita_id, categoria_id),
    FOREIGN KEY (cita_id) REFERENCES citas(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);
""")

# -----------------------------
# FUNCIONES AUXILIARES
# -----------------------------
def insert_table(table, rows, valid_ids=None):
    """
    Inserta filas en tabla. Si valid_ids se proporciona, verifica las claves foráneas.
    valid_ids = {"epoca_id": set(...), "nacion_id": set(...), "tipo_id": set(...), ...}
    """
    if not rows:
        return
    for r in rows:
        r_clean = r.copy()
        # Revisar claves foráneas y poner NULL si no existe
        if valid_ids:
            for fk in valid_ids:
                if fk in r_clean and r_clean[fk] not in valid_ids[fk]:
                    r_clean[fk] = None
        columns = ", ".join(r_clean.keys())
        placeholders = ", ".join(["?"] * len(r_clean))
        values = [r_clean[k] for k in r_clean]
        cur.execute(f"INSERT OR REPLACE INTO {table} ({columns}) VALUES ({placeholders})", values)

# -----------------------------
# INSERTAR DATOS EN ORDEN CORRECTO
# -----------------------------
# Tablas padre primero
insert_table("epocas_historicas", data.get("epocas_historicas"))
insert_table("nacion", data.get("nacion"))
insert_table("idiomas", data.get("idiomas"))
insert_table("tipos_citas", data.get("tipos_citas"))
insert_table("categorias", data.get("categorias"))

# Crear sets de IDs válidos
valid_ids = {
    "epoca_id": set(d["id"] for d in data.get("epocas_historicas", [])),
    "nacion_id": set(d["id"] for d in data.get("nacion", [])),
    "tipo_id": set(d["id"] for d in data.get("tipos_citas", [])),
    "idioma_id": set(d["id"] for d in data.get("idiomas", [])),
    "categoria_id": set(d["id"] for d in data.get("categorias", [])),
    "autor_id": set(d["id"] for d in data.get("autores", []))
}

# Ahora autores
insert_table("autores", data.get("autores"), valid_ids=valid_ids)

# Actualizar autor_id válido después de insertar autores
valid_ids["autor_id"] = set(d["id"] for d in data.get("autores", []))

# Citas y relaciones
insert_table("citas", data.get("citas"), valid_ids=valid_ids)
insert_table("citas_categorias", data.get("citas_categorias"), valid_ids=valid_ids)

# Guardar y cerrar
conn.commit()
conn.close()

print("✅ SQLite creado correctamente: data/esaldi.db")

