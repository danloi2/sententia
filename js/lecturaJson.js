document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fecha').textContent = Utils.fechaHoyLatina();

  fetch('./db/esaldi.json')
    .then(r => {
      if (!r.ok) throw new Error('No se pudo cargar el JSON');
      return r.json();
    })
    .then(data => {
      if (!data.citas || !data.citas.length) {
        document.getElementById('cita-container').innerHTML =
          '<p>No hay citas disponibles.</p>';
        return;
      }

      const cita = data.citas[Math.floor(Math.random() * data.citas.length)];

      const nac = Utils.numeroRomano(cita.nacimiento_ano);
      const mue = Utils.numeroRomano(cita.fallecimiento_ano);

      document.getElementById('cita-container').innerHTML = `
        <blockquote>
          ${cita.cita_traducida ? `<p class="cita-traducida">${cita.cita_traducida}</p>` : ''}

          <p class="cita-original">
            ${cita.cita_original}<br>
            ${cita.cita_la ? `<span class="badge-la">${cita.cita_la}</span>` : ''}
          </p>

          <footer>
            ${cita.autor}
            ${nac || mue ? `(${nac}${mue ? ' - ' + mue : ''})` : ''}
          </footer>

          ${cita.biografia_la ? `<div class="biografia">${cita.biografia_la}</div>` : ''}
        </blockquote>
      `;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('cita-container').innerHTML =
        '<p>Error cargando citas.</p>';
    });
});
