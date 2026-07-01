# Walkthrough - Tracker de Super Rebirth - Tarjetas de Droides Simplificadas & Progresión Completa

He implementado un diseño de tarjetas sumamente minimalista y claro para los droides marcados para vender (obsoletos), además de incorporar la lista completa de droides del juego que nunca son requeridos para la progresión de Rebirth.

## Cambios Realizados

1.  **Diseño Ultra Minimalista para Droides Vendibles (No Requeridos):**
    *   Cuando un droide no es requerido para ningún Rebirth futuro en el ciclo actual, ocultamos todos sus datos (niveles, botones, detalles y etiquetas).
    *   La tarjeta ahora solo muestra el **nombre tachado** con un tono de contraste bajo y un botón de acción rápida **"Vender (Nivel)"** si el usuario tiene progreso registrado en su fábrica.
    *   Al hacer clic en el botón de vender, el progreso de ese droide se limpia instantáneamente a `Ninguno` para mantener la base de datos limpia de forma rápida.
2.  **Integración de Droides Icónicos / Míticos:**
    *   Añadimos a la base de datos todos los droides icónicos y míticos del juego (como *BB-8*, *Mister Bones*, *IG-11*, *CB-23*, *Chopper*, *K-2SO*, *LEP Droid*).
    *   Como nunca son requeridos para avanzar de nivel (son decorativos o de utilidad de la tienda Nova), aparecerán automáticamente tachados en la categoría de "Vender", confirmándole al usuario que los puede ignorar o vender sin temor a arruinar su progreso.

---

## Verificación

1.  **Compilación y Construcción:** exitosa y limpia (`931ms`).
2.  **Publicación:** Subido a la rama `main` del repositorio `rebirther`.
