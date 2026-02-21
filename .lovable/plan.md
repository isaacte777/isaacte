

## Cambiar el logo de UnionePartners por imagen

Se reemplazara el logo actual (icono "U" + texto "Unione Partners") por la imagen que subiste, en ambas versiones: React/Lovable y Full Stack PHP.

### Cambios a realizar

**1. React/Lovable - Navbar (`src/components/landing/Navbar.tsx`)**
- Reemplazar el bloque del logo (icono circular "U" + textos "Unione", "Partners", "Affiliate Gateway") por un tag `<img>` con la imagen subida
- Mantener el `onClick={handleLogoClick}` y la animacion `whileHover`
- Ajustar el tamano de la imagen para que se adapte a la barra de navegacion (~32-36px de alto)

**2. React/Lovable - Footer (`src/components/landing/Footer.tsx`)**
- Reemplazar el icono "U" + texto "UnionePartners" del footer por la misma imagen
- Ajustar tamano para el contexto del footer (~32-40px de alto)

**3. PHP - Header (`template/cabecera.php`)**
- Reemplazar `<div class="logo-icon">U</div>` y `<div class="logo-text">...` por un `<img>` apuntando a `assets/images/logo.png`
- Mantener el enlace `<a>` y la clase `logo`

**4. PHP - Footer (`template/pie.php`)**
- Reemplazar el logo del footer igualmente con `<img>`

**5. Archivo de imagen**
- Copiar la imagen subida a `public/logo.png` (para React) y a `assets/images/logo.png` (para PHP)

### Detalles tecnicos

- La imagen se usara con `height` fijo y `width: auto` para mantener la proporcion
- En React: `<img src="/logo.png" alt="Unione Partners" className="h-8 sm:h-9" />`
- En PHP: `<img src="<?php echo $base_path; ?>assets/images/logo.png" alt="Unione Partners" class="logo-img" />`
- Se agregara una clase CSS `.logo-img` en `navigation.css` para controlar dimensiones
