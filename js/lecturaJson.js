fetch('./db/esaldi.json')
  .then(res => {
    if (!res.ok) {
      throw new Error('No se pudo cargar el JSON');
    }
    return res.json();
  })
  .then(data => {

    if (!data.citas || !Array.isArray(data.citas) || data.citas.length === 0) {
      document.getElementById('cita-container').innerHTML =
        '<p>No hay citas disponibles.</p>';
      return;
    }

    // Cita aleatoria
    const cita = data.citas[Math.floor(Math.random() * data.citas.length)];

    // Años en números romanos
    const nacimiento = Utils.numeroRomano(cita.nacimiento_ano);
    const fallecimiento = Utils.numeroRomano(cita.fallecimiento_ano);

    // Badge de idioma (shields.io)
    const idiomaBadge = cita.idioma
      ? `<img
          class="idioma-badge-img"
          src="https://img.shields.io/badge/${encodeURIComponent(cita.idioma)}-blue?style=for-the-badge&label=Idioma"
          alt="Idioma ${cita.idioma}"
        >`
      : '';

    const html = `
      <blockquote class="cita-block">

        ${
          cita.cita_traducida
            ? `<p class="cita-traducida">${cita.cita_traducida}</p>`
            : ''
        }

        <p class="cita-original">
          ${cita.cita_original}
        </p>

        ${idiomaBadge}

        ${
          cita.cita_la
            ? `<p class="cita-la">${cita.cita_la}</p>`
            : ''
        }

        <footer>
          ${
            cita.biografia_la
              ? `<div class="biografia">${cita.biografia_la}</div>`
              : ''
          }

          <strong>${cita.autor}</strong>
          ${
            nacimiento || fallecimiento
              ? ` (${nacimiento}${fallecimiento ? ' - ' + fallecimiento : ''})`
              : ''
          }
        </footer>

        <div class="info-boxes">
          ${cita.epoca ? `<div class="info-box">${cita.epoca}</div>` : ''}
          ${cita.nacion ? `<div class="info-box">${cita.nacion}</div>` : ''}
          ${cita.nacion_la ? `<div class="info-box la">${cita.nacion_la}</div>` : ''}
        </div>

      </blockquote>
    `;

    document.getElementById('cita-container').innerHTML = html;
  })
  .catch(err => {
    console.error('Error cargando citas:', err);
    document.getElementById('cita-container').innerHTML =
      '<p>Error cargando las citas.</p>';
  });
