// js/lecturaJson.js

fetch("./db/esaldi.json")
  .then(res => res.json())
  .then(data => {
    if (!data.citas || data.citas.length === 0) {
      document.getElementById("cita-container").innerHTML = "<p>No hay citas disponibles.</p>";
      return;
    }

    const cita = data.citas[Math.floor(Math.random() * data.citas.length)];

    // Mostrar fecha actual en latín
    document.getElementById("fecha").textContent = fechaHoyLatina();

    // Construir HTML de la cita
    const html = `
      <blockquote class="cita-block">
        ${cita.cita_traducida ? `<p class="cita-traducida">${cita.cita_traducida}</p>` : ''}
        <p class="cita-original">
          ${cita.cita_original}
          ${cita.idioma ? `<span class="badge idioma">${cita.idioma}</span>` : ''}
          ${cita.cita_la ? `<span class="badge latin">${cita.cita_la}</span>` : ''}
        </p>
        <footer>
          ${cita.biografia_la ? cita.biografia_la + ' ' : ''}
          ${cita.autor} 
          ${cita.nacimiento_ano || cita.fallecimiento_ano 
            ? `(${numeroRomano(cita.nacimiento_ano)}${cita.fallecimiento_ano ? ' - ' + numeroRomano(cita.fallecimiento_ano) : ''})`
            : ''}
        </footer>
      </blockquote>
      <div class="info-boxes">
        <div class="info-box">${cita.epoca || "Epoca ignota"}</div>
        <div class="info-box">${cita.nacion || "Natio ignota"}</div>
      </div>
      ${cita.categorias && cita.categorias.length 
        ? `<p>Categorias: ${cita.categorias.join(', ')}</p>` : ''}
    `;

    document.getElementById("cita-container").innerHTML = html;
  })
  .catch(err => {
    console.error("Error cargando JSON:", err);
    document.getElementById("cita-container").innerHTML = "<p>Error cargando las citas.</p>";
  });
