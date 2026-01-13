/**
 * js/buscar.js
 *
 * Quote search module using static JSON loaded into CITAS.
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('form[role="search"]');
  const searchInput = document.getElementById('inputBuscar');
  const container = document.getElementById('cita-container');
  let backupHTML = container.innerHTML; // Save original content

  // ============================
  // Handle search submission
  // ============================
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 2) return;

    if (!document.getElementById('lista-resultados')) {
      backupHTML = container.innerHTML;
    }

    const resultados = CITAS.filter((item) => {
      return Object.values(item).some((val) => val && val.toString().toLowerCase().includes(query));
    });

    if (resultados.length === 1) {
      if (typeof window.mostrarCita === 'function') {
        window.mostrarCita(resultados[0]);
        searchInput.value = '';
      }
    } else if (resultados.length > 1) {
      mostrarLista(resultados, query);
    } else {
      mostrarError(`No results found for: "${query}"`);
    }
  });

  // ============================
  // Display multiple search results in a list
  // ============================
  function mostrarLista(lista, query) {
    // Guardamos los resultados para acceder a ellos desde el evento de clic
    window.listaResultadosActuales = lista;

    container.innerHTML = `
      <div id="lista-resultados" class="w-full max-w-4xl mx-auto px-4 animate-fade-in">
        <div class="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div class="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
            <h5 class="text-primary-700 font-bold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
              <span>${lista.length} <span class="text-slate-400 font-medium">Result(s)</span></span>
            </h5>
            <button type="button" class="p-2 hover:bg-slate-200/50 rounded-full transition-colors flex items-center justify-center" id="btnCerrar" aria-label="Close results">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-slate-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
            </button>
          </div>
          <div class="p-2 max-h-[60vh] overflow-y-auto" id="contenedor-items-busqueda">
            ${lista
              .map(
                (item, index) => `
              <button type="button" 
                class="w-full text-left p-4 rounded-2xl hover:bg-primary-50 transition-all group flex flex-col gap-1 item-resultado border border-transparent hover:border-primary-100"
                data-index="${index}">
                <div class="flex justify-between items-start">
                  <span class="font-bold text-slate-900 group-hover:text-primary-700 transition-colors">${escaparHTML(
                    item.author_la || 'Anonymous'
                  )}</span>
                  <span class="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">${escaparHTML(
                    item.age_la || ''
                  )}</span>
                </div>
                <div class="text-sm text-slate-500 line-clamp-1 italic font-serif">${escaparHTML(
                  item.quote_la || item.quote_es || ''
                )}</div>
              </button>
            `
              )
              .join('')}
          </div>
        </div>
      </div>`;

    // Evento para cerrar y restaurar
    document.getElementById('btnCerrar')?.addEventListener('click', () => {
      container.innerHTML = backupHTML;
    });

    // Delegación de eventos para los items de la lista
    document.getElementById('contenedor-items-busqueda')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.item-resultado');
      if (btn && window.mostrarCita) {
        const index = btn.dataset.index;
        window.mostrarCita(window.listaResultadosActuales[index]);
      }
    });
  }

  // ============================
  // Display an error message
  // ============================
  function mostrarError(msg) {
    container.innerHTML = `
      <div class="w-full max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-xl border border-red-100 animate-fade-in flex flex-col items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-red-600">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
</svg>
        </div>
        <div class="text-center">
          <strong class="text-slate-900 block mb-1">Search Error</strong>
          <span class="text-slate-500 text-sm">${escaparHTML(msg)}</span>
        </div>
        <button class="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors" id="btnRetry">
          Retry Search
        </button>
      </div>`;

    document.getElementById('btnRetry')?.addEventListener('click', () => {
      location.reload();
    });
  }

  function escaparHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
