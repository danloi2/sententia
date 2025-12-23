fetch('./db/esaldi.json')
  .then(res => res.json())
  .then(data => {

    if (!data.citas || !data.citas.length) {
      document.getElementById('cita-container').innerHTML =
        '<p>No hay citas disponibles.</p>';
      return;
    }

    const cita = data.citas[Math.floor(Math.random() * data.citas.length)];

    const nacimiento = Utils.numeroRomano(cita.nacimiento_ano);
    const fallecimiento = Utils.numeroRomano(cita.fallecimiento_ano);

    const idiomaBadge = cita.idioma
      ? `<img class="idioma-badge-img"
          src="https://img.shields.io/badge/${encodeURIComponent(cita.idioma)}-blue?style=for-the-badge&label=Idioma"
          alt="Idioma">`
      : '';

    const html = `
      <blockquote class="cita-block">

        ${cita.cita_traducida
          ? `<p class="cita-traducida">${cita.cita_traducida}</p>`
          : ''}

        <p class="cita-original">
          ${cita.cita_original}
        </p>

        ${idiomaBadge}

        ${cita.cita_la
          ? `<p class="cita-la">${cita.cita_la}</p>`
          : ''}

        <footer>
          ${cita.biografia_la || ''}
          <br>
          <strong>${cita.autor}</strong>
          ${nacimiento || fallecimiento
            ? ` (${nacimiento}${fallecimiento ? ' - ' + fallecimiento : ''})`
            : ''}
        </footer>

      </blockquote>
    `;

    document.getElementById('cita-container').innerHTML = html;
  })
  .catch(err => {
    console.error(err);
    document.getElementById('cita-container').innerHTML =
      '<p>Error cargando citas.</p>';
  });
