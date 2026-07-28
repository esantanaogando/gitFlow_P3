// ============================================================
//  storage.js - Responsabilidad: persistencia en LocalStorage
//  (Implementación: agregar + editar + eliminar)
// ============================================================

const STORAGE_KEY = 'autoparts_inventory';

/**
 * Obtiene todos los repuestos desde LocalStorage.
 * @returns {Array} Array de objetos repuesto.
 */
function getParts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Guarda el array completo de repuestos en LocalStorage.
 * @param {Array} parts - Array de objetos repuesto.
 */
function saveParts(parts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parts));
}

/**
 * Añade un nuevo repuesto.
 * @param {Object} part - Objeto repuesto (sin id).
 * @returns {Object} El repuesto con id asignado.
 */
function addPart(part) {
  const parts = getParts();
  const newPart = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    ...part,
  };
  parts.push(newPart);
  saveParts(parts);
  return newPart;
}

/**
 * Obtiene un repuesto por su id.
 * @param {string} id - ID del repuesto.
 * @returns {Object|null} El repuesto o null si no existe.
 */
function getPartById(id) {
  const parts = getParts();
  return parts.find((p) => p.id === id) || null;
}

/**
 * Actualiza un repuesto existente por su id.
 * @param {string} id - ID del repuesto a actualizar.
 * @param {Object} updatedData - Datos actualizados.
 * @returns {Object|null} El repuesto actualizado o null si no se encontró.
 */
function updatePart(id, updatedData) {
  const parts = getParts();
  const index = parts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updatedPart = { ...parts[index], ...updatedData };
  parts[index] = updatedPart;
  saveParts(parts);
  return updatedPart;
}

/**
 * Elimina un repuesto por su id.
 * @param {string} id - ID del repuesto a eliminar.
 * @returns {boolean} true si se eliminó, false si no existía.
 */
function deletePart(id) {
  let parts = getParts();
  const initialLength = parts.length;
  parts = parts.filter((p) => p.id !== id);
  if (parts.length === initialLength) return false;
  saveParts(parts);
  return true;
}

/**
 * Verifica si un código ya existe, excluyendo un id opcional (para edición).
 * @param {string} codigo - Código a verificar.
 * @param {string|null} excludeId - ID a excluir de la búsqueda.
 * @returns {boolean} true si el código ya existe.
 */
function isCodigoDuplicado(codigo, excludeId = null) {
  const parts = getParts();
  return parts.some((p) => p.codigo === codigo && p.id !== excludeId);
}