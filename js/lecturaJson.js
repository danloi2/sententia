document.addEventListener('DOMContentLoaded', () => {
  // Mostrar fecha en latín con números romanos
  document.getElementById('fecha').textContent = fechaHoyLatina();

  // Cargar citas desde JSON
  fetch('db/esaldi.json')
    .then(res => res.json())
    .then(data => {
      if (!data || !data.citas || data.citas.length === 0) {
        document.getElementById('cita-container').innerHTML = '<p>No hay citas disponibles.</p>';
        return;
      }

      const cita = data.citas[Math.floor(Math.random() * data.citas.length)];

      const idiomaBadge = cita.idioma 
        ? `<img src="https://img.shields.io/badge/Idioma-${encodeURIComponent(cita.idioma)}-blue" alt="Idioma: ${cita.idioma}" style="margin-left:0.5em;">`
        : '';

      const html = `
  <blockquote class="cita-block">
    ${cita.cita_traducida ? `<p class="cita-traducida">${cita.cita_traducida}</p>` : ''}
    ${cita.cita_original ? `<p class="cita-original">${cita.cita_original}</p>` : ''}
    ${cita.cita_la ? `<p class="cita-latina">${cita.cita_la}</p>` : ''}
    ${cita.biografia_la || cita.autor ? `<footer>${cita.biografia_la || ''} ${cita.autor ? `${cita.autor} (${numeroRomano(cita.nacimiento_ano || 0)}${cita.fallecimiento_ano ? ' - ' + numeroRomano(cita.fallecimiento_ano) : ''})` : ''}</footer>` : ''}
    ${cita.categorias ? `<div class="categorias">Categorias: ${cita.categorias.join(', ')}</div>` : ''}
  </blockquote>
`;

      `;

      document.getElementById('cita-container').innerHTML = html;
    })
    .catch(err => {
      console.error('Error cargando JSON:', err);
      document.getElementById('cita-container').innerHTML = '<p>Error cargando las citas.</p>';
    });
});

// Función de números romanos también disponible aquí
function numeroRomano(num) {
  if (num === 0) return 'N';
  const valores = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const simbolos = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let resultado = '';
  const negativo = num < 0;
  num = Math.abs(num);
  for (let i=0; i<valores.length; i++) {
    while (num >= valores[i]) {
      resultado += simbolos[i];
      num -= valores[i];
    }
  }
  return negativo ? '-' + resultado : resultado;
}

