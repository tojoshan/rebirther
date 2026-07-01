# Walkthrough - Tracker de Super Rebirth (Ciclo 3) - Función de Super Rebirth y Cristales Nova

He implementado el botón y sistema de confirmación de **Super Rebirth (SRB)** en color violeta, calculando dinámicamente cuántos **Cristales Nova** otorga el juego según el nivel de Rebirth en el que decidas reiniciar.

## Nueva Función: Super Rebirth (violeta)

1.  **Lógica de Recompensa de Cristales Nova:**
    *   Para calcular con exactitud la recompensa, implementé una secuencia matemática cuadrática deducida de los reportes de la comunidad en Reddit y YouTube:
        *   **R-12:** 11 cristales
        *   **R-13:** 16 cristales
        *   **R-14:** 22 cristales
        *   **R-15:** 29 cristales
        *   **R-16:** 37 cristales
        *   **R-17:** 46 cristales
        *   **R-18:** 56 cristales
        *   **R-19:** 67 cristales
        *   **R-20:** 79 cristales
        *   **R-21:** 92 cristales
        *   **R-22:** 106 cristales
        *   **R-23:** 121 cristales
    *   La app calcula esta recompensa mediante un bucle incremental en tiempo real en base a tu nivel de Rebirth actual.

2.  **Botón de Acción en la Cabecera:**
    *   **Menor a R-12:** El botón se muestra deshabilitado con un icono de candado (`🔒 Super Rebirth (R-12)`) ya que el juego requiere nivel 12 mínimo para desbloquear esta mecánica.
    *   **Nivel 12 o superior:** El botón se activa en color violeta brillante, mostrando dinámicamente la ganancia estimada: `✨ Super Rebirth (+22)` (si estás en R-14, por ejemplo).

3.  **Modal de Confirmación Violeta:**
    *   Al hacer clic, se abre una ventana modal temática en color violeta que indica tu nivel actual y muestra de forma destacada los **Cristales Nova** que vas a recibir.
    *   Advierte que se limpiarán tus droides y tu Rebirth volverá a 0.

4.  **Marcador Acumulativo de Cristales:**
    *   Implementamos persistencia local (`localStorage`) para tus cristales acumulados.
    *   Si realizas un Super Rebirth, los cristales ganados se sumarán a tu total histórico y se mostrará un badge permanente con un diamante `💎 [Cantidad] Nova` en la cabecera del tracker. ¡Ideal para llevar un registro de tu progreso multisesión!

---

## Verificación

1.  **Compilación y Construcción:** exitosa y limpia (`862ms`).
2.  **Persistencia y Publicación:** Todo actualizado y subido a GitHub en la rama `main`.
