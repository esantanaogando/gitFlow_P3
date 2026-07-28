// ============================================================
//  parts.js - Responsabilidad: renderizado e interfaz de usuario
//  (Implementación parcial: solo listar)
// ============================================================

/**
 * Renderiza la tabla con todos los repuestos almacenados.
 */
function renderTable() {
  const parts = getParts();
  const tbody = document.getElementById('parts-body');
  const emptyMsg = document.getElementById('empty-message');

  if (parts.length === 0) {
    tbody.innerHTML = '';
    emptyMsg.style.display = 'block';
    return;
  }
  emptyMsg.style.display = 'none';

  let html = '';
  parts.forEach((part) => {
    html += renderRow(part);
  });
  tbody.innerHTML = html;
}

/**
 * Genera el HTML de una fila para un repuesto.
 * @param {Object} part - Repuesto.
 * @returns {string} HTML de la fila.
 */
function renderRow(part) {
  return `
    <tr>
      <td><strong>${escapeHtml(part.codigo)}</strong></td>
      <td>${escapeHtml(part.nombre)}</td>
      <td>${escapeHtml(part.marca)}</td>
      <td>${escapeHtml(part.categoria)}</td>
      <td>${Number(part.precio).toFixed(2)}</td>
      <td>${Number(part.cantidad)}</td>
      <td>
        <button class="btn success" disabled>Editar</button>
        <button class="btn danger" disabled>Eliminar</button>
      </td>
    </tr>
  `;
}

/**
 * Escapa caracteres HTML para evitar XSS.
 * @param {string} str - Texto a escapar.
 * @returns {string} Texto escapado.
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}