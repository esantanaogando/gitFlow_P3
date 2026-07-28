// ============================================================
//  app.js - Responsabilidad: eventos, validaciones y orquestación
//  (Implementación parcial: solo agregar + renderizado inicial)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('part-form');
  const errorEl = document.getElementById('form-error');

  // Renderizar el inventario al cargar la página
  renderTable();

  form.addEventListener('submit', handleSubmit);

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
   * @returns {Array} Array de mensajes de error (vacío si es válido).
   */
  function validateForm(data) {
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

    // Validación de código único
    const parts = getParts();
    if (parts.some((p) => p.codigo === data.codigo)) {
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
    errorEl.classList.remove('show');
    errorEl.textContent = '';

    const data = getFormData();
    const errors = validateForm(data);

    if (errors.length > 0) {
      errorEl.textContent = errors.join(' ');
      errorEl.classList.add('show');
      return;
    }

    // Guardar el repuesto
    const newPart = addPart(data);
    console.log('Repuesto agregado:', newPart);


    // Limpiar formulario
    form.reset();
    errorEl.classList.remove('show');
    errorEl.textContent = '';

    // Actualizar la tabla con el nuevo repuesto
    renderTable();
  }
});