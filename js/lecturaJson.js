document.addEventListener('DOMContentLoaded', () => {
  fetch('./db/esaldi.json')
    .then(res => res.json())
    .then(data => {
      const cont = document.getElementById('cita-container');
      if (!data.citas || data.citas.length === 0) {
        cont.innerHTML = '<p>No hay citas disponibles.</p>';
        return;
      }

      const cita = data.citas[Math.floor(Math.random() * data.citas.length)];

      const html = `
        <blockquote class="cita-block">
          ${cita.cita_traducida ? `<p class="cita-traducida">${cita.cita_traducida}</p>` : ''}
          <p class="cita-original">
            ${cita.cita_original}
            ${cita.idioma ? `<span class="badge idioma-badge">${cita.idioma}</span>` : ''}
            ${cita.cita_la ? `<span class="badge badge-la">${cita.cita_la}</span>` : ''}
          </p>
          <footer>
            ${cita.biografia_la ? cita.biografia_la + ' ' : ''}
            ${cita.autor} ${cita.nacimiento_ano || cita.fallecimiento_ano 
              ? `(${Utils.numeroRomano(cita.nacimiento_ano)}${cita.fallecimiento_ano ? ' - ' + Utils.numeroRomano(cita.fallecimiento_ano) : ''})` 
              : ''}
          </footer>
        </blockquote>
      `;
      cont.innerHTML = html;
    })
    .catch(err => {
      console.error('Error cargando JSON:', err);
      document.getElementById('cita-container').innerHTML = '<p>Error cargando las citas.</p>';
    });
});
