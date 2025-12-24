fetch('./db/esaldi.json')
  .then(res => {
    if (!res.ok) {
      throw new Error('No se pudo cargar el JSON');
    }
    return res.json();
  })
  .then(data => {
    console.log('JSON cargado:', data); // 👈 DEBUG

    if (!data.citas || data.citas.length === 0) {
      document.getElementById('cita-container').innerHTML =
        '<p>No hay citas disponibles.</p>';
      return;
    }

    const cita = data.citas[Math.floor(Math.random() * data.citas.length)];

    const nacimiento = Utils.numeroRomano(cita.nacimiento_ano);
    const fallecimiento = Utils.numeroRomano(cita.fallecimiento_ano);

    const html = `
      <blockquote class="cita-block">

        ${cita.cita_traducida
          ? `<p class="cita-traducida">${cita.cita_traducida}</p>`
          : ''}

        <p class="cita-original">
          ${cita.cita_original}
        </p>

        ${cita.cita_la
          ? `<p class="cita-la">${cita.cita_la}</p>`
          : ''}

        <footer>
          ${cita.autor}
          ${(nacimiento || fallecimiento)
            ? ` (${nacimiento}${fallecimiento ? ' - ' + fallecimiento : ''})`
            : ''}
        </footer>

        ${cita.biografia_la
          ? `<div class="biografia">${cita.biografia_la}</div>`
          : ''}
      </blockquote>
    `;

    document.getElementById('cita-container').innerHTML = html;
  })
  .catch(err => {
    console.error('ERROR REAL:', err);
    document.getElementById('cita-container').innerHTML =
      '<p>Error cargando citas.</p>';
  });
