// ============================================================
//  app.js - Responsabilidad: eventos, validaciones y orquestación
//  (Implementación: agregar + listar + editar + eliminar)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('part-form');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const partsBody = document.getElementById('parts-body');

  renderTable();

  // Evento submit del formulario (crear o actualizar)
  form.addEventListener('submit', handleSubmit);

  // Evento cancelar edición
  cancelBtn.addEventListener('click', () => {
    clearForm();
    hideFormError();
  });

  // Delegación de eventos para botones de editar y eliminar
  partsBody.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const id = target.dataset.id;
    if (!id) return;

    if (target.classList.contains('edit-btn')) {
      handleEdit(id);
    } else if (target.classList.contains('delete-btn')) {
      handleDelete(id);
    }
  });

  /**
   * Obtiene los datos del formulario como objeto.
   * @returns {Object} Datos del formulario.
   */
  function getFormData() {
    return {
      codigo: document.getElementById('codigo').value.trim(),
      nombre: document.getElementById('nombre').value.trim(),
      marca: document.getElementById('marca').value.trim(),
      categoria: document.getElementById('categoria').value.trim(),
      precio: parseFloat(document.getElementById('precio').value),
      cantidad: parseInt(document.getElementById('cantidad').value, 10),
    };
  }

  /**
   * Valida los datos del formulario.
   * @param {Object} data - Datos a validar.
   * @param {string|null} excludeId - ID a excluir en la verificación de código único.
   * @returns {Array} Array de mensajes de error (vacío si es válido).
   */
  function validateForm(data, excludeId = null) {
    const errors = [];

    if (!data.codigo) errors.push('El código es obligatorio.');
    if (!data.nombre) errors.push('El nombre es obligatorio.');
    if (!data.marca) errors.push('La marca es obligatoria.');
    if (!data.categoria) errors.push('La categoría es obligatoria.');
    if (isNaN(data.precio) || data.precio <= 0) {
      errors.push('El precio debe ser mayor que 0.');
    }
    if (isNaN(data.cantidad) || data.cantidad < 0) {
      errors.push('La cantidad no puede ser negativa.');
    }

    // Validación de código único (excluyendo el id actual en edición)
    if (isCodigoDuplicado(data.codigo, excludeId)) {
      errors.push('El código ya existe. Por favor, use uno diferente.');
    }

    return errors;
  }

  /**
   * Manejador del evento submit del formulario.
   * @param {Event} e - Evento submit.
   */
  function handleSubmit(e) {
    e.preventDefault();
    hideFormError();

    const data = getFormData();
    const editId = submitBtn.dataset.editId || null;

    const errors = validateForm(data, editId);
    if (errors.length > 0) {
      showFormError(errors.join(' '));
      return;
    }

    if (editId) {
      // Modo edición
      const updated = updatePart(editId, data);
      if (updated) {
        console.log('Repuesto actualizado:', updated);
        updateUI({ editPart: null });
        hideFormError();
      } else {
        showFormError('No se pudo actualizar el repuesto.');
      }
    } else {
      // Modo creación
      const newPart = addPart(data);
      console.log('Repuesto agregado:', newPart);
      clearForm();
      hideFormError();
      renderTable(); // Actualizar tabla
    }
  }

  /**
   * Maneja la edición de un repuesto.
   * @param {string} id - ID del repuesto a editar.
   */
  function handleEdit(id) {
    const part = getPartById(id);
    if (!part) {
      showFormError('Repuesto no encontrado.');
      return;
    }
    hideFormError();
    fillFormForEdit(part);
    // Scroll al formulario
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Maneja la eliminación de un repuesto.
   * @param {string} id - ID del repuesto a eliminar.
   */
  function handleDelete(id) {
    const part = getPartById(id);
    if (!part) {
      showFormError('Repuesto no encontrado.');
      return;
    }

    if (!confirm(`¿Está seguro de eliminar el repuesto "${part.codigo} - ${part.nombre}"?`)) {
      return;
    }

    const deleted = deletePart(id);
    if (deleted) {
      // Si estábamos editando ese repuesto, cancelar edición y limpiar formulario
      if (submitBtn.dataset.editId === id) {
        clearForm();
        hideFormError();
      }
      renderTable();
      console.log('Repuesto eliminado:', part);
    } else {
      showFormError('No se pudo eliminar el repuesto.');
    }
  }
});