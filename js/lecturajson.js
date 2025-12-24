document.addEventListener('DOMContentLoaded', () => {
  // Mostrar fecha actual
  document.getElementById('fecha').textContent = Utils.fechaHoyLatina();

  // Cargar citas desde el JSON
  fetch('./db/esaldi.json')
    .then(r => {
      if (!r.ok) throw new Error('No se pudo cargar el JSON');
      return r.json();
    })
    .then(data => {
      // El JSON es directamente un array de citas
      if (!Array.isArray(data) || data.length === 0) {
        document.getElementById('cita-container').innerHTML =
          '<p>No hay citas disponibles.</p>';
        return;
      }

      // Seleccionar una cita aleatoria
      const cita = data[Math.floor(Math.random() * data.length)];

      // Construir el HTML con los datos disponibles
      document.getElementById('cita-container').innerHTML = `
        <blockquote>
          ${cita.cita_es ? `<p class="cita-traducida">${cita.cita_es}</p>` : ''}
          <p class="cita-original">
            ${cita.cita_original}<br>
            ${cita.cita_la ? `<span class="badge-la">${cita.cita_la}</span>` : ''}
          </p>
          <footer>
            <strong>${cita.autor_la}</strong> (${cita.autor_es})
            ${cita.nacion_la ? `<br><em>${cita.nacion_la}</em>` : ''}
          </footer>
        </blockquote>
      `;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('cita-container').innerHTML =
        '<p>Error cargando citas.</p>';
    });
});