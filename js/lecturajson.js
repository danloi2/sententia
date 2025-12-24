document.addEventListener('DOMContentLoaded', () => {
  // Mostrar fecha actual en latín
  const fechaElement = document.getElementById('fecha');
  if (fechaElement) {
    fechaElement.textContent = Utils.fechaCompletaLatina();
  }

  // Cargar y mostrar una cita aleatoria
  fetch('./db/esaldi.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Verificar que el JSON contiene datos
      if (!Array.isArray(data) || data.length === 0) {
        mostrarError('No hay citas disponibles en la base de datos.');
        return;
      }

      // Seleccionar una cita aleatoria
      const citaAleatoria = data[Math.floor(Math.random() * data.length)];
      mostrarCita(citaAleatoria);
    })
    .catch(error => {
      console.error('Error al cargar las citas:', error);
      mostrarError('Error al cargar las citas. Por favor, recarga la página.');
    });
});

/**
 * Muestra una cita en el contenedor con la estructura CSS definida
 * @param {Object} cita - Objeto con los datos de la cita
 */
function mostrarCita(cita) {
  const container = document.getElementById('cita-container');
  
  // Construir el HTML usando las clases CSS definidas
  let html = '<blockquote class="cita-block">';
  
  // Traducción al español
  if (cita.cita_es) {
    html += `<p class="cita-traducida">${escaparHTML(cita.cita_es)}</p>`;
  }
  
  // Cita original
  if (cita.cita_original) {
    html += `<p class="cita-original">${escaparHTML(cita.cita_original)}</p>`;
  }
  
  // Cita en latín
  if (cita.cita_la) {
    html += `<p class="cita-la">${escaparHTML(cita.cita_la)}</p>`;
  }
  
  // Información adicional en cajas
  html += '<div class="info-boxes">';
  
  // Autor
  if (cita.autor_la || cita.autor_es) {
    html += '<div class="info-box">';
    html += '<strong>Autor:</strong><br>';
    if (cita.autor_la) {
      html += escaparHTML(cita.autor_la);
    }
    if (cita.autor_es && cita.autor_es !== cita.autor_la) {
      html += `<br><small>(${escaparHTML(cita.autor_es)})</small>`;
    }
    html += '</div>';
  }
  
  // Idioma
  if (cita.idioma_la || cita.idioma_es) {
    html += '<div class="info-box">';
    html += '<strong>Idioma:</strong><br>';
    html += cita.idioma_la ? escaparHTML(cita.idioma_la) : escaparHTML(cita.idioma_es);
    if (cita.codigo) {
      html += ` <span class="idioma-badge">${escaparHTML(cita.codigo).toUpperCase()}</span>`;
    }
    html += '</div>';
  }
  
  // Nación
  if (cita.nacion_la || cita.nacion_es) {
    html += '<div class="info-box">';
    html += '<strong>Nación:</strong><br>';
    html += cita.nacion_la ? escaparHTML(cita.nacion_la) : escaparHTML(cita.nacion_es);
    html += '</div>';
  }
  
  html += '</div>'; // Cierre info-boxes
  
  // Biografía (si existiera en el futuro)
  if (cita.biografia_la || cita.biografia_es) {
    html += '<div class="biografia">';
    html += '<strong>Biografía:</strong><br>';
    html += escaparHTML(cita.biografia_la || cita.biografia_es);
    html += '</div>';
  }
  
  html += '</blockquote>';
  
  container.innerHTML = html;
}

/**
 * Muestra un mensaje de error
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarError(mensaje) {
  const container = document.getElementById('cita-container');
  container.innerHTML = `
    <div style="text-align: center; padding: 20px; color: #d9534f;">
      <p style="font-size: 1.2em; font-weight: bold;">⚠️ Error</p>
      <p>${escaparHTML(mensaje)}</p>
    </div>
  `;
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} texto - Texto a escapar
 * @returns {string} Texto escapado
 */
function escaparHTML(texto) {
  if (!texto) return '';
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}