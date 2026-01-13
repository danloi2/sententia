/**
 * js/lecturajson.js
 * * Main logic for loading and displaying static JSON quotes.
 */

// ============================
// Global variables
// ============================
let CITAS = [];

// ============================
// Initialization: Load quotes on DOM ready
// ============================
document.addEventListener('DOMContentLoaded', () => {
  fetch('db/esaldi.json')
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (!data || data.length === 0) throw new Error('Database is empty.');
      CITAS = data;

      renderStats(data);

      const randomQuote = data[Math.floor(Math.random() * data.length)];
      mostrarCita(randomQuote);
    })
    .catch((err) => {
      console.error(err);
      mostrarError('Error loading quotes.');
    });
});

// ============================
// Render statistics
// ============================
function renderStats(data) {
  const statsContainer = document.getElementById('stats-container');
  if (!statsContainer) return;

  const totalQuotes = data.length;
  const uniqueAuthors = [...new Set(data.map((item) => item.author_la))].length;

  statsContainer.innerHTML = `
    <div class="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in">
      <div class="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm text-sm font-medium text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-primary-600">
          <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clip-rule="evenodd" />
        </svg>
        <span class="text-slate-900">${totalQuotes}</span>
        <span class="text-slate-400 font-normal">Sententiae</span>
      </div>
      <div class="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm text-sm font-medium text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-primary-600">
          <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122Z" />
        </svg>
        <span class="text-slate-900">${uniqueAuthors}</span>
        <span class="text-slate-400 font-normal">Auctores</span>
      </div>
    </div>`;
}

// ============================
// Display a single quote in the UI
// ============================
function mostrarCita(quote) {
  const container = document.getElementById('cita-container');

  const metadataArray = [quote.age_la, quote.language_la, quote.nation_la].filter(Boolean);
  const formattedContext = metadataArray.join(' • ');
  const formattedReference =
    quote.reference && quote.reference.trim() !== '' ? quote.reference.trim() : null;
  const finalImage = quote.image && quote.image !== '0' ? quote.image : './assets/empty.png';
  const imageText =
    quote.image_atr && quote.image_atr !== '0' ? quote.image_atr : quote.author_la || '';

  const copyData = {
    la: quote.quote_la || '',
    orig: quote.quote_original || '',
    es: quote.quote_es || '',
    autor: quote.author_la || 'Anonymous',
    contexto: formattedContext,
    referencia: formattedReference || '',
  };

  container.innerHTML = `
    <div class="w-full max-w-5xl mx-auto animate-fade-in px-4">
      <figure id="cita-print" class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row items-stretch min-h-[400px]" role="region" aria-label="Sententia">
        
        <div class="md:w-1/3 lg:w-1/4 relative group h-64 md:h-auto overflow-hidden bg-white flex items-center justify-center p-6 lg:p-8">
          <div class="relative w-full aspect-square md:aspect-auto md:h-full max-h-[300px] overflow-hidden rounded-2xl shadow-xl shadow-primary-900/10 ring-1 ring-primary-300/40">
            <img src="${escaparHTML(
              finalImage
            )}" alt="Image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style="cursor: pointer;" data-modal-trigger="true" data-atribucion="${escaparHTML(
    imageText
  )}"/>
            <div class="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-900/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="text-white text-xs italic font-serif leading-tight block">${escaparHTML(
                imageText
              )}</span>
            </div>
          </div>
        </div>

        <div class="hidden md:flex flex-col items-center justify-center px-4">
          <div class="w-[2px] h-16 bg-linear-to-b from-transparent via-primary-200 to-primary-400 rounded-full"></div>
          <div class="w-2 h-2 rounded-full bg-primary-400 my-2 shadow-sm"></div>
          <div class="w-[2px] flex-1 bg-linear-to-b from-primary-400 via-primary-200 to-transparent rounded-full"></div>
        </div>

        <div class="flex-1 p-8 md:p-12 lg:p-14 flex flex-col justify-between bg-white">
          <div class="flex flex-col">
            <blockquote class="relative">
              <div style="width:80px; height:80px; position:absolute; top:-40px; left:-32px; z-index:0; opacity:0.1; color: #475569;">
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style="width:100%; height:100%;">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H21.017C22.1216 3 23.017 3.89543 23.017 5V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.89543 1.91243 3 3.017 3H8.017C9.12157 3 10.017 3.89543 10.017 5V15C10.017 18.3137 7.33072 21 4.017 21H1.017Z"/>
  </svg>
</div>
              ${
                quote.quote_la
                  ? `<p class="relative z-10 text-2xl md:text-3xl lg:text-4xl font-serif font-extrabold text-primary-700 leading-tight mb-6">${escaparHTML(
                      quote.quote_la
                    )}</p>`
                  : ''
              }
              ${
                quote.quote_original && quote.quote_original !== quote.quote_la
                  ? `<p class="text-slate-500 italic mb-8 border-l-2 border-slate-200 pl-4 text-sm md:text-base">${escaparHTML(
                      quote.quote_original
                    )}</p>`
                  : ''
              }
              ${
                quote.quote_es &&
                (quote.quote_es !== quote.quote_original || quote.quote_original === quote.quote_la)
                  ? `<div class="pt-8 border-t border-slate-100"><p class="text-lg md:text-xl text-slate-700 font-medium leading-relaxed">${escaparHTML(
                      quote.quote_es
                    )}</p></div>`
                  : ''
              }
            </blockquote>
          </div>

          <div class="mt-12">
            <figcaption class="flex flex-col items-end text-end">
              <span class="text-xl font-bold text-slate-900 mb-1">${escaparHTML(
                copyData.autor
              )}</span>
              ${
                copyData.referencia
                  ? `<span class="inline-flex items-start gap-1.5 px-3 py-1 rounded-xl bg-primary-50 text-primary-700 text-xs font-semibold mb-2"><span style="width:14px; height:14px; flex-shrink:0; margin-top:2px; background-color:currentColor; -webkit-mask:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22currentColor%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25%22/></svg>') no-repeat center; mask:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22currentColor%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25%22/></svg>') no-repeat center;"></span><span>${escaparHTML(
                      copyData.referencia
                    )}</span></span>`
                  : ''
              }
              <span class="text-sm text-slate-400 font-medium">${escaparHTML(
                formattedContext
              )}</span>
            </figcaption>

            <div class="cita-acciones flex flex-wrap justify-end gap-3 mt-10 pt-8 border-t border-slate-50">
              
              <button id="btn-copiar" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary-200 bg-white text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-all shadow-sm">
                <div class="w-5 h-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" preserveAspectRatio="none" class="w-full h-full">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m.75 2.25H6.75A2.25 2.25 0 0 1 4.5 18V6.25A2.25 2.25 0 0 1 6.75 4h.75m.903 0h.183c.365-.507.964-.84 1.636-.84h1.75c.672 0 1.27.333 1.636.84h.183m.903 0h.75a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25h-1.636" />
                  </svg>
                </div>
                <span>Copiare</span>
              </button>

              <button id="btn-nueva" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 text-white font-semibold text-sm hover:bg-primary-800 transition-all shadow-md shadow-primary-700/20">
                <div class="w-5 h-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" preserveAspectRatio="none" class="w-full h-full">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <span>Sententia Nova</span>
              </button>

              <div class="relative group" id="export-dropdown">
                <button class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm" type="button" id="dropdownBtn">
                  <div style="width: 20px; height: 20px; flex-shrink: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 100%; height: 100%;">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </div>
                  <span>Exportare</span>
                  <div style="width: 12px; height: 12px; margin-left: 4px; flex-shrink: 0; display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" style="width: 12px; height: 12px; display: block; color: #94a3b8;">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>
                <div class="absolute right-0 bottom-full mb-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-2 hidden group-hover:block z-20">
                  <button class="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 btn-exportar" data-format="pdf">PDF</button>
                  <button class="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 btn-exportar" data-format="png">PNG</button>
                </div>
              </div>

            </div> 
      </figure>
    div>`;

  // Attach Event Listeners
  document.getElementById('btn-copiar').addEventListener('click', function () {
    if (typeof window.prepararCopia === 'function') {
      window.prepararCopia(this, copyData);
    }
  });

  document.getElementById('btn-nueva').addEventListener('click', () => {
    location.reload();
  });

  document.querySelectorAll('.btn-exportar').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const format = el.getAttribute('data-format');
      if (window.imprimirCita) {
        window.imprimirCita(format);
      }
    });
  });
}

// ============================
// Display error message
// ============================
function mostrarError(msg) {
  document.getElementById('cita-container').innerHTML = `
    <div class="w-full max-w-lg mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col items-center gap-4 animate-fade-in shadow-xl">
      <div class="bg-red-100 rounded-full p-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-red-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <div class="text-center text-red-900">
        <h3 class="font-bold text-lg">Error occurred</h3>
        <p class="text-sm opacity-80 mt-1">${escaparHTML(msg)}</p>
      </div>
      <button onclick="location.reload()" class="bg-white border border-red-200 text-red-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors">
        Try Again
      </button>
    </div>`;
}

// ============================
// Utility: Escape HTML
// ============================
function escaparHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================
// Image modal logic
// ============================
document.addEventListener('click', (e) => {
  const img = e.target.closest("[data-modal-trigger='true']");
  if (!img) return;

  const modalImg = document.getElementById('modalImagen');
  const modalAtr = document.getElementById('modalAtribucion');

  if (modalImg) {
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  }
  if (modalAtr) {
    modalAtr.textContent = img.dataset.atribucion || '';
  }
});
