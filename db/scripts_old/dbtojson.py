import sqlite3
import json

conn = sqlite3.connect("esaldi.db")
cur = conn.cursor()

# Consulta completa con joins
cur.execute("""
SELECT 
    c.id AS cita_id,
    c.cita_original,
    c.cita_traducida,
    c.cita_la,
    a.nombre AS autor,
    a.nombre_la AS autor_la,
    a.nacimiento_ano,
    a.fallecimiento_ano,
    e.nombre AS epoca,
    n.nombre_nacion AS nacion,
    i.codigo AS idioma
FROM citas c
LEFT JOIN autores a ON c.autor_id = a.id
LEFT JOIN epocas_historicas e ON a.epoca_id = e.id
LEFT JOIN nacion n ON a.nacion_id = n.id
LEFT JOIN idiomas i ON c.idioma_id = i.id
""")

rows = cur.fetchall()
cols = [desc[0] for desc in cur.description]
data = [dict(zip(cols, row)) for row in rows]

# Guardar JSON
with open("esaldi.json", "w", encoding="utf-8") as f:
    json.dump({"citas": data}, f, ensure_ascii=False, indent=2)

conn.close()
print("✅ JSON generado")
