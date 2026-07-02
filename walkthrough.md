# Walkthrough - Tracker de Super Rebirth - Seccionamiento de Droides & Progresión Completa

He implementado una separación formal por secciones de la lista de droides en la pantalla principal para lograr una organización visual impecable, aplicando el estilo rojo y la interacción de limpieza rápida para los droides no requeridos.

## Cambios Realizados

1.  **División en Dos Secciones Principales:**
    *   **Requisitos de Rebirth:** Agrupa todos los droides requeridos en la meta actual o en metas futuras, conservando sus selectores de nivel e indicaciones de recomendación.
    *   **No requeridos:** Nueva sección al final de la pantalla que agrupa todos los droides que no son necesarios para alcanzar el nivel 23 en tu ciclo activo.
2.  **Rediseño de Droides No Requeridos:**
    *   Eliminamos por completo las etiquetas y botones de "Vender/Vendido" para evitar sobrecarga.
    *   Si el droide **no tiene progreso**, se muestra su nombre **tachado en color rojo tenue** (`text-red-500/35 line-through`).
    *   Si el droide **tiene progreso** (por ejemplo, tienes un *2BB* guardado), su nombre se muestra en **rojo brillante** (`text-red-400`) y con una etiqueta del tier (como `BAS`, `ORO`, `ARC`).
    *   **Limpieza interactiva sin botones:** Para restablecer un droide a `Ninguno` cuando lo vendes en el juego, simplemente haz clic o toca la tarjeta de ese droide en la sección de "No requeridos". Su progreso se limpiará de inmediato sin necesidad de botones adicionales.

## Corrección de Requisitos del Ciclo 1 (Niveles 13 a 23)

Se corrigieron los requisitos del **Ciclo 1** para los niveles del 13 al 23 en [src/App.tsx](file:///c:/laragon/www/droidex/src/App.tsx). Anteriormente, estos niveles tenían datos duplicados/incorrectos copiados del Ciclo 3 (por ejemplo, el nivel 14 solicitaba `B2 Heavy`, `B2-RP` y `R7`).

Ahora coinciden de forma exacta con la planilla oficial de referencia (`A43, A44 y A45` correspondientes al nivel 14, que en el juego se pide al estar en R-13):
*   **Nivel 13:** B2-RP (Base/Default), Cyclo-Grav (Base/Default), R7 (Base/Default) — 3.4B Créditos.
*   **Nivel 14 (Subir a 14 desde R-13):** Mecha-Droid (Oro), MONO-WLKR (Oro), Opti-STRK (Base/Default) — 8.45B Créditos.
*   **Nivel 15:** B2-RP (Oro), BB9 (Oro), R7 (Oro) — 21B Créditos.
*   **Nivel 16:** MONO-WLKR (Diamante), Opti-STRK (Oro), Proto-Roller (Diamante) — 52B Créditos.
*   **Nivel 17:** B2-RP (Diamante), Cyclo-Grav (Diamante), Mecha-Droid (Diamante) — 130B Créditos.
*   **Nivel 18:** BB9 (Diamante), MONO-WLKR (Arcoíris), R7 (Diamante) — 325B Créditos.
*   **Nivel 19:** B2-RP (Arcoíris), Cyclo-Grav (Arcoíris), Proto-Roller (Arcoíris) — 810B Créditos.
*   **Nivel 20:** Mecha-Droid (Arcoíris), Opti-STRK (Arcoíris), R7 (Arcoíris) — 2T Créditos.
*   **Nivel 21:** BB (Beskar), Groundmech (Beskar), Orb-Walker (Beskar) — 3T Créditos.
*   **Nivel 22:** AMP Walker (Beskar), B1 Heavy (Beskar), Proto-Roller (Beskar) — 4.5T Créditos.
*   **Nivel 23:** MONO-WLKR (Beskar), Opti-STRK (Beskar), R7 (Beskar) — 6T Créditos.

---

## Verificación

1.  **Compilación y Construcción:** Exitosa y limpia (`npm run build` completado en 939ms).
2.  **Validación de Datos:** Los droids y niveles corresponden exactamente a las filas de la hoja de cálculo de Google Sheets aportada por el usuario.
3.  **Publicación:** Compilado exitosamente para la producción.
