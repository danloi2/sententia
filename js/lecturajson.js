document.addEventListener('DOMContentLoaded', () => {

  fetch('/db/esaldi.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        mostrarError('No hay citas disponibles.');
        return;
      }

      const cita = data[Math.floor(Math.random() * data.length)];
      mostrarCita(cita);
    })
    .catch(err => {
      console.error(err);
      mostrarError('Error al cargar las citas.');
    });
});

function mostrarCita(cita) {
  const container = document.getElementById('cita-container');

  let html = '<blockquote class="cita-block">';

  if (cita.cita_es) {
    html += `<p class="cita-traducida">${escaparHTML(cita.cita_es)}</p>`;
  }
  if (cita.cita_original) {
    html += `<p class="cita-original">${escaparHTML(cita.cita_original)}</p>`;
  }
  if (cita.cita_la) {
    html += `<p class="cita-la">${escaparHTML(cita.cita_la)}</p>`;
  }

  html += '<div class="info-boxes">';

  if (cita.autor_la || cita.autor_es) {
    html += `<div class="info-box"><strong>Autor:</strong><br>
      ${escaparHTML(cita.autor_la || cita.autor_es)}</div>`;
  }

  if (cita.idioma_la || cita.idioma_es) {
    html += `<div class="info-box"><strong>Idioma:</strong><br>
      ${escaparHTML(cita.idioma_la || cita.idioma_es)}</div>`;
  }

  if (cita.nacion_la || cita.nacion_es) {
    html += `<div class="info-box"><strong>Nación:</strong><br>
      ${escaparHTML(cita.nacion_la || cita.nacion_es)}</div>`;
  }

  html += '</div></blockquote>';
  container.innerHTML = html;
}

function mostrarError(msg) {
  document.getElementById('cita-container').innerHTML =
    `<p style="color:red;text-align:center;">${escaparHTML(msg)}</p>`;
}

function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto || '';
  return div.innerHTML;
}
