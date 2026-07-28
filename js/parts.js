// ============================================================
//  parts.js - Responsabilidad: renderizado e interfaz de usuario
//  (Implementación: listar + editar + eliminar)
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
    <tr data-id="${part.id}">
      <td><strong>${escapeHtml(part.codigo)}</strong></td>
      <td>${escapeHtml(part.nombre)}</td>
      <td>${escapeHtml(part.marca)}</td>
      <td>${escapeHtml(part.categoria)}</td>
      <td>${Number(part.precio).toFixed(2)}</td>
      <td>${Number(part.cantidad)}</td>
      <td>
        <button class="btn success edit-btn" data-id="${part.id}">Editar</button>
        <button class="btn danger delete-btn" data-id="${part.id}">Eliminar</button>
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

/**
 * Llena el formulario con los datos de un repuesto para edición.
 * @param {Object} part - Repuesto a editar.
 */
function fillFormForEdit(part) {
  document.getElementById('codigo').value = part.codigo || '';
  document.getElementById('nombre').value = part.nombre || '';
  document.getElementById('marca').value = part.marca || '';
  document.getElementById('categoria').value = part.categoria || '';
  document.getElementById('precio').value = part.precio || '';
  document.getElementById('cantidad').value = part.cantidad || '';
  document.getElementById('form-title').textContent = 'Editar Repuesto';
  document.getElementById('submit-btn').textContent = 'Actualizar';
  document.getElementById('cancel-btn').style.display = 'inline-flex';
  // Guardar el id en el botón submit para saber que estamos editando
  document.getElementById('submit-btn').dataset.editId = part.id || '';
}

/**
 * Limpia el formulario y lo deja en modo creación.
 */
function clearForm() {
  document.getElementById('part-form').reset();
  document.getElementById('form-title').textContent = 'Nuevo Repuesto';
  document.getElementById('submit-btn').textContent = 'Guardar';
  document.getElementById('cancel-btn').style.display = 'none';
  document.getElementById('submit-btn').dataset.editId = '';
  hideFormError();
}

/**
 * Actualiza la interfaz después de una operación.
 * @param {Object} options - Opciones (por ejemplo, { editPart: null }).
 */
function updateUI(options = {}) {
  renderTable();
  if (options.editPart) {
    fillFormForEdit(options.editPart);
  } else {
    clearForm();
  }
}

/**
 * Muestra un mensaje de error en el formulario.
 * @param {string} message - Mensaje de error.
 */
function showFormError(message) {
  const errorEl = document.getElementById('form-error');
  errorEl.textContent = message;
  errorEl.classList.add('show');
}

/**
 * Oculta el mensaje de error del formulario.
 */
function hideFormError() {
  const errorEl = document.getElementById('form-error');
  errorEl.classList.remove('show');
  errorEl.textContent = '';
}