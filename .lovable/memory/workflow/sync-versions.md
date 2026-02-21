# Memory: workflow/sync-versions
Updated: now

## Sincronización automática de versiones

Todos los cambios realizados en la versión React/Lovable deben aplicarse automáticamente también en la versión Full Stack PHP. Esto incluye:

- Cambios de UI/diseño
- Animaciones y transiciones
- Funcionalidad JavaScript
- Estilos CSS
- Estructura de componentes

### Mapeo de archivos

| React/Lovable | Full Stack PHP |
|---------------|----------------|
| src/components/landing/*.tsx | index.php (HTML inline) |
| src/index.css | assets/css/style.css |
| src/hooks/useSmoothScroll.tsx | assets/js/script.js (Lenis init) |
| Animaciones Framer Motion | CSS animations + Vanilla JS |

### Notas
- La paridad visual debe ser 1:1
- Las animaciones de Framer Motion se traducen a CSS + Intersection Observer en PHP
