/**
 * Intenta inferir el "basename" cuando la app se sirve dentro de una carpeta
 * (por ejemplo en XAMPP: http://localhost/mi-sitio/).
 *
 * - En root: pathname = "/" => "/"
 * - En subcarpeta: pathname = "/mi-sitio/" => "/mi-sitio"
 *
 * Nota: asume un nivel de subcarpeta (caso típico en htdocs).
 */
export function inferBasename(): string {
  if (typeof window === "undefined") return "/";

  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";

  // Si se accede como /index.html, no hay subcarpeta real.
  if (parts[0].includes(".")) return "/";

  return `/${parts[0]}`;
}
