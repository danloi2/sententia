import sqlite3
import json

# Nombre del JSON y de la base de datos
json_file = 'esaldi.json'
db_file = 'esaldi.db'

# Abrir o crear la base de datos
conn = sqlite3.connect(db_file)
cur = conn.cursor()

# Crear tabla citas si no existe
cur.execute('''
CREATE TABLE IF NOT EXISTS citas (
    id_cita INTEGER PRIMARY KEY,
    cita_original TEXT,
    cita_es TEXT,
    id_autor INTEGER,
    id_idioma INTEGER,
    cita_la TEXT
)
''')

# Leer el JSON
with open(json_file, 'r', encoding='utf-8') as f:
    citas = json.load(f)

# Insertar los datos
for cita in citas:
    cur.execute('''
        INSERT OR REPLACE INTO citas (id_cita, cita_original, cita_es, id_autor, id_idioma, cita_la)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        cita.get('id_cita'),
        cita.get('cita_original'),
        cita.get('cita_es'),
        cita.get('id_autor'),
        cita.get('id_idioma'),
        cita.get('cita_la')
    ))

# Guardar cambios y cerrar
conn.commit()
conn.close()

print(f"Importadas {len(citas)} citas en {db_file}")
