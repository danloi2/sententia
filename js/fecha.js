document.addEventListener('DOMContentLoaded', () => {
  const fechaElem = document.getElementById('fecha');
  if (fechaElem) {
    fechaElem.textContent = Utils.fechaHoyLatina();
  }
});
