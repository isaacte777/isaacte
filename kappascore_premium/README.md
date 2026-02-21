# KappaScore Premium Template

Este es el diseño "Premium" de KappaScore aplicado directamente a la estructura de archivos de tu repositorio de GitHub.

## Cómo aplicar los cambios:

1.  **Copia los archivos**: Reemplaza los archivos correspondientes en tu repositorio con el contenido de esta carpeta:
    *   `templates/common/base.html.twig`
    *   `templates/common/parts/header.html.twig`
    *   `templates/common/parts/footer.html.twig`
    *   `templates/common/pages/homepage.html.twig`

2.  **Tailwind CSS**: He incluido Tailwind CSS a través de un CDN en `base.html.twig` para que los estilos funcionen de inmediato sin necesidad de configurar un sistema de compilación. Si ya usas Tailwind en tu proyecto, puedes eliminar el script del CDN y usar tu configuración local.

3.  **Iconos**: He utilizado Font Awesome (que ya estaba en tu `base.html.twig`) para los iconos.

4.  **Lógica Twig**: He mantenido intacta toda la lógica de Twig (`{{ Translate(...) }}`, rutas, bucles de torneos y eventos) para que la página siga mostrando tus datos reales.

## Características incluidas:
*   **Hero Carousel**: Un carrusel automático en la página de inicio que muestra partidos destacados (puedes hacerlo dinámico fácilmente).
*   **Diseño Bento**: Una cuadrícula moderna para los eventos recomendados.
*   **Cabecera Centrada**: Navegación principal centrada y selector de idiomas con dropdown estilizado.
*   **Glassmorphism**: Efectos de desenfoque y transparencia para un aspecto elegante.
*   **Ambient Glows**: Luces de fondo animadas que dan profundidad a la página.

---
*Diseñado para campeones.*
