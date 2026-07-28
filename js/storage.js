// ============================================================
//  storage.js - Responsabilidad: persistencia en LocalStorage
//  (Implementación parcial: solo agregar)
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