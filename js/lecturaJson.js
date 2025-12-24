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

    // Badge de idioma usando idioma_la
    const idiomaBadge = cita.idioma_la
      ? `<img
          class="idioma-badge-img"
          src="https://img.shields.io/badge/${encodeURIComponent(cita.idioma_la)}-blue?style=for-the-badge&label=Lingua"
          alt="Idioma: ${cita.idioma_la}"
        >`
      : '';

    const html = `
      <blockquote class="cita-block">
        ${cita.cita_traducida ? `<p class="cita-traducida">${cita.cita_traducida}</p>` : ''}

        <p class="cita-original">
          ${cita.cita_original}
          <br>
          ${idiomaBadge}
        </p>

        ${cita.cita_la ? `<p class="cita-la">${cita.cita_la}</p>` : ''}

        <footer>
          ${cita.autor}
          ${nacimiento || fallecimiento
            ? `(${nacimiento}${fallecimiento ? ' - ' + fallecimiento : ''})`
            : ''}
        </footer>

        ${cita.biografia_la ? `<div class="biografia">${cita.biografia_la}</div>` : ''}
      </blockquote>
    `;

    document.getElementById('cita-container').innerHTML = html;
  })
  .catch(err => {
    console.error(err);
    document.getElementById('cita-container').innerHTML =
      '<p>Error cargando citas.</p>';
  });
