document.addEventListener('DOMContentLoaded', () => {
  const fechaEl = document.getElementById('fecha');
  if (fechaEl) {
    fechaEl.textContent = Utils.fechaHoyLatina();
  }
});
