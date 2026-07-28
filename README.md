# AutoParts Manager

Sistema CRUD para administrar un inventario de repuestos automotrices.

## 🚀 Estado actual

**Rama:** `feature/project-setup`

Este commit contiene la estructura base del proyecto:

- Maquetación HTML completa (header, formulario, tabla, footer).
- Estilos CSS finales (diseño minimalista y responsive).
- Archivos JavaScript con la estructura modular definida pero sin lógica de negocio.
- Persistencia preparada (constante `STORAGE_KEY`) pero sin implementación.

**No se ha implementado ninguna funcionalidad CRUD** (crear, leer, actualizar, eliminar).

## 📦 Estructura

AutoParts-Manager/
├── index.html
├── css/
│ └── styles.css
├── js/
│ ├── app.js # Inicialización (solo console.log)
│ ├── storage.js # Constante STORAGE_KEY
│ └── parts.js # Vacío (comentado)
└── README.md

## 🛠️ Tecnologías

- HTML5
- CSS3 (sin frameworks)
- JavaScript ES6+ (sin librerías externas)
- LocalStorage (preparado para futuras features)

## 🔧 Uso

1. Clona el repositorio y cambia a la rama `feature/project-setup`.
2. Abre `index.html` con Live Server o en tu navegador.
3. Visualiza la interfaz estática.

## 📋 Próximos pasos

Las siguientes features se desarrollarán en ramas separadas:

- `feature/add-part`
- `feature/list-parts`
- `feature/edit-part`
- `feature/delete-part`

## 📝 Licencia

MIT