fetch('./db/esaldi.json')
  .then(res => res.json())
  .then(data => {
    if (!data.citas || !data.citas.length) {
      document.getElementById('cita-container').innerHTML = '<p>No hay citas disponibles.</p>';
      return;
    }

    const cita = data.citas[Math.floor(Math.random() * data.citas.length)];
    const nacimiento = Utils.numeroRomano(cita.nacimiento_ano);
    const fallecimiento = Utils.numeroRomano(cita.fallecimiento_ano);

    const idiomaBadge = cita.idioma
      ? `<img src="https://img.shields.io/badge/Idioma-${encodeURIComponent(cita.idioma)}-blue?style=flat&logo=appveyor" alt="${cita.idioma}" style="margin-left: 5px;">`
      : '';

    const html = `
      <blockquote class="cita-block">
        ${cita.cita_traducida ? `<p class="cita-traducida">${cita.cita_traducida}</p>` : ''}
        <p class="cita-original">
          ${cita.cita_original} ${idiomaBadge} <br>
          ${cita.cita_la ? `<span class="badge-la">${cita.cita_la}</span>` : ''}
        </p>
        <footer>
          ${cita.autor} ${nacimiento || fallecimiento ? `(${nacimiento}${fallecimiento ? ' - '+fallecimiento : ''})` : ''}
        </footer>
        ${cita.biografia_la ? `<div class="biografia">${cita.biografia_la}</div>` : ''}
        <div class="info-boxes">
          ${cita.epoca ? `<div class="info-box">${cita.epoca}</div>` : ''}
          ${cita.nacion ? `<div class="info-box">${cita.nacion}</div>` : ''}
        </div>
      </blockquote>
    `;

    document.getElementById('cita-container').innerHTML = html;
  })
  .catch(err => {
    console.error(err);
    document.getElementById('cita-container').innerHTML = '<p>Error cargando citas.</p>';
  });
