import sqlite3
import json

# Conecta con la base de datos SQLite
conn = sqlite3.connect("esaldi.db")
conn.row_factory = sqlite3.Row  # Para acceder a columnas por nombre
cur = conn.cursor()

# Carga todos los datos relacionados
def fetch_table(table):
    cur.execute(f"SELECT * FROM {table}")
    return {row['id']: dict(row) for row in cur.fetchall()}

autores = fetch_table("autores")
epocas = fetch_table("epocas_historicas")
naciones = fetch_table("nacion")
idiomas = fetch_table("idiomas")
tipos = fetch_table("tipos_citas")
categorias = fetch_table("categorias")

# Citas y sus categorías
cur.execute("SELECT * FROM citas")
citas = [dict(row) for row in cur.fetchall()]

cur.execute("SELECT * FROM citas_categorias")
citas_categorias = {}
for row in cur.fetchall():
    citas_categorias.setdefault(row['cita_id'], []).append(categorias[row['categoria_id']]['nombre'])

# Denormaliza citas
citas_denormalizadas = []
for c in citas:
    autor = autores.get(c.get('autor_id')) or {}
    epoca = epocas.get(autor.get('epoca_id')) if autor else None
    nacion = naciones.get(autor.get('nacion_id')) if autor else None
    idioma = idiomas.get(c.get('idioma_id')) or {}
    tipo = tipos.get(c.get('tipo_id')) or {}
    cats = citas_categorias.get(c['id'], [])

    citas_denormalizadas.append({
        "id": c['id'],
        "cita_original": c.get('cita_original'),
        "cita_traducida": c.get('cita_traducida'),
        "cita_la": c.get('cita_la'),
        "autor": autor.get('nombre'),
        "autor_nombre_la": autor.get('nombre_la'),
        "nacimiento_ano": autor.get('nacimiento_ano'),
        "fallecimiento_ano": autor.get('fallecimiento_ano'),
        "biografia_la": autor.get('biografia_la'),
        "epoca": epoca.get('nombre') if epoca else None,
        "nacion": nacion.get('nombre_nacion') if nacion else None,
        "idioma": idioma.get('nombre'),
        "tipo_cita": tipo.get('nombre'),
        "categorias": cats,
        "fuente": c.get('fuente')
    })

# Guarda JSON final
with open("esaldi.json", "w", encoding="utf-8") as f:
    json.dump({"citas": citas_denormalizadas}, f, ensure_ascii=False, indent=2)

print("✅ JSON creado esaldi.json")
