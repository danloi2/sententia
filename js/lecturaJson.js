document.addEventListener('DOMContentLoaded', () => {
  // Mostrar fecha
  document.getElementById('fecha').textContent = fechaHoyLatina();

  // Cargar JSON y mostrar cita aleatoria
  fetch('db/esaldi.json')
    .then(res => res.json())
    .then(data => {
      if (!data || !data.citas || data.citas.length === 0) {
        document.getElementById('cita-container').innerHTML = '<p>No hay citas disponibles.</p>';
        return;
      }

      const cita = data.citas[Math.floor(Math.random() * data.citas.length)];

      const html = `
        <blockquote class="cita-block">
          ${cita.cita_traducida ? `<p class="cita-traducida">${cita.cita_traducida}</p>` : ''}
          <p class="cita-original">${cita.cita_original}</p>
          ${cita.cita_la ? `<p class="cita-latina">${cita.cita_la}</p>` : ''}
          <footer>
            ${cita.autor || ''}
            ${cita.nacimiento_ano || cita.fallecimiento_ano
              ? ` (${cita.nacimiento_ano || ''}${cita.fallecimiento_ano ? ' - ' + cita.fallecimiento_ano : ''})`
              : ''}
          </footer>
          ${cita.biografia_la ? `<div class="biografia">${cita.biografia_la}</div>` : ''}
          ${cita.categorias ? `<div class="categorias">Categorias: ${cita.categorias.join(', ')}</div>` : ''}
          ${cita.fuente ? `<div class="fuente">Fuente: ${cita.fuente}</div>` : ''}
        </blockquote>
      `;

      document.getElementById('cita-container').innerHTML = html;
    })
    .catch(err => {
      console.error('Error cargando JSON:', err);
      document.getElementById('cita-container').innerHTML = '<p>Error cargando las citas.</p>';
    });
});
