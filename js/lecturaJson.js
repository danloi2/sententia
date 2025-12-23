// js/lecturaJson.js

function numeroRomano(num) {
    if (num === null || num === undefined) return '';
    const valores = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const romanos = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    let resultado = '';
    let n = Math.abs(num);
    for (let i = 0; i < valores.length; i++) {
        while (n >= valores[i]) {
            resultado += romanos[i];
            n -= valores[i];
        }
    }
    return num < 0 ? '-' + resultado : resultado;
}

function formatoAno(año) {
    return año ? numeroRomano(año) : '';
}

// Carga el JSON con las citas
fetch('./db/esaldi.json')
.then(res => res.json())
.then(data => {
    const contenedor = document.getElementById('cita-container');
    if (!data.citas || data.citas.length === 0) {
        contenedor.innerHTML = '<p>No hay citas disponibles.</p>';
        return;
    }

    const cita = data.citas[Math.floor(Math.random() * data.citas.length)];

    // Fecha actual
    document.getElementById('fecha').textContent = new Date().toLocaleDateString('la-LA', {
        year:'numeric', month:'long', day:'numeric'
    });

    // Badge idioma
    const idiomaBadge = cita.idioma ? 
        `<img src="https://img.shields.io/badge/${encodeURIComponent(cita.idioma)}-blue?style=flat" alt="${cita.idioma}">` 
        : '';

    // Categorías
    const categorias = cita.categorias && cita.categorias.length > 0 ? 
        `<p>Categorias: ${cita.categorias.join(', ')}</p>` : '';

    // Autor con años
    const anos = (cita.nacimiento_ano || cita.fallecimiento_ano) ? 
        `(${formatoAno(cita.nacimiento_ano)}${cita.fallecimiento_ano ? ' - ' + formatoAno(cita.fallecimiento_ano) : ''})` 
        : '';

    const html = `
        <blockquote class="cita-block">
            ${cita.cita_traducida ? `<p class="cita-traducida">${cita.cita_traducida}</p>` : ''}
            <p class="cita-original">
                ${cita.cita_original}
                ${idiomaBadge}
            </p>
            <p class="cita-la">${cita.cita_la || ''}</p>
            
                ${cita.biografia_la ? `<div class="biografia">${cita.biografia_la}</div>` : ''}
                ${cita.autor} ${anos}
            
        </blockquote>
        ${categorias}
    `;

    contenedor.innerHTML = html;

})
.catch(err => {
    console.error('Error cargando JSON:', err);
    document.getElementById('cita-container').innerHTML = '<p>Error cargando las citas.</p>';
});
