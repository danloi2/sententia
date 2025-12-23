import sqlite3
import json

# Cargar JSON
with open("data/esaldi.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Crear DB SQLite
conn = sqlite3.connect("esaldi.db")
cur = conn.cursor()

# Crear tabla ejemplo
cur.execute("""
CREATE TABLE IF NOT EXISTS citas (
    id INTEGER PRIMARY KEY,
    cita_original TEXT,
    cita_traducida TEXT,
    autor_id INTEGER,
    tipo_id INTEGER,
    idioma_id INTEGER,
    fuente TEXT,
    fecha_creacion TEXT,
    cita_la TEXT
)
""")

# Insertar datos
for c in data["citas"]:
    cur.execute("""
        INSERT INTO citas (id, cita_original, cita_traducida, autor_id, tipo_id, idioma_id, fuente, fecha_creacion, cita_la)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        c["id"], c["cita_original"], c.get("cita_traducida"), c.get("autor_id"),
        c.get("tipo_id"), c.get("idioma_id"), c.get("fuente"),
        c.get("fecha_creacion"), c.get("cita_la")
    ))

conn.commit()
conn.close()
