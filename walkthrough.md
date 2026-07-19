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

## Nuevos Cambios: Desactivación Independiente y por Tiers en Droidex

He implementado la posibilidad de desactivar (marcar como pendientes) los droides y sus niveles (tiers) directamente desde la sección Droidex de forma independiente al Rebirth tracker y sin cascada entre tiers.

1. **Independencia de Estados (Tracker vs. Droidex):**
   * El **Droidex** ahora funciona de manera totalmente independiente del Rebirth tracker. La lista de droids fabricados en Droidex se mantiene persistente en el dispositivo incluso tras reiniciar la progresión (`Reiniciar` o `Super Rebirth`).
   * No se sincroniza el estado entre ambos componentes, evitando que un reset del ciclo borre tus droides de la enciclopedia.

2. **Independencia de Tiers (Sin efectos en cascada):**
   * Cada tier de un droide en Droidex se marca o desmarca de manera individual y 100% independiente. Por ejemplo, es posible marcar los tiers *Base* y *Diamante* de un droide como "Fabricados" sin que se marque automáticamente el tier *Oro*.
   * La acción de desmarcar ("Marcar Pendiente") solo afectará al tier seleccionado, sin alterar los demás estados del droide.

3. **Efecto Visual de Hover e Interacción:**
   * Cuando un droide está marcado como "Fabricado", al pasar el cursor (hover) por encima del botón verde, el botón cambia de color a rojo (`hover:bg-red-600`) y su texto se actualiza de manera dinámica a **"Marcar Pendiente"** (o *"Mark Pending"* en inglés).
   * Esto proporciona un feedback visual instantáneo e intuitivo para corregir cualquier activación accidental.

---

## Verificación

1.  **Compilación y Construcción:** Exitosa y limpia.
2.  **Validación de Datos:** Los droids y niveles corresponden exactamente a las filas de la hoja de cálculo de Google Sheets aportada por el usuario.
3. **Independencia de Estado:** Probada y validada; los droids y tiers en Droidex se guardan y desactivan independientemente, sin sincronización en cascada ni afectación por resets del tracker.

---

## Nuevos Cambios: Orden de Droides por Urgencia en el Rebirth Tracker

He implementado una lógica de ordenamiento por urgencia para los droides del "Rebirth Tracker" para que los requeridos aparezcan al inicio de la lista, facilitando enormemente la jugabilidad.

1. **Orden de Prioridad por Estado:**
   * **Inmediatos Primero (`immediate`):** Los droides que se requieren para tu siguiente nivel de Rebirth inmediato (R-$N+1$) y que aún no alcanzan el nivel objetivo aparecen arriba de todo con prioridad absoluta.
   * **Necesarios a Futuro (`needed`):** Los droides que son requeridos para niveles más adelante en la progresión.
   * **Completados (`completed`):** Los droides que ya han alcanzado el nivel máximo requerido por la guía.
   * **No Requeridos (`discarded`):** Quedan relegados a la sección inferior de "No requeridos".

2. **Criterio Secundario (Alfabético):**
   * Dentro de cada uno de los grupos anteriores, los droides se siguen ordenando de manera alfabética (`A-Z`) para mantener la coherencia y facilitar la búsqueda manual rápida.

3. **Textos Informativos:**
   * Se actualizaron las traducciones del footer (`droidsOrderFooter`) en español, inglés y portugués para reflejar con precisión este nuevo comportamiento de ordenamiento por urgencia.

---

## Nuevos Cambios: Integración de la Nueva Rareza/Tier "Galáctico" (GAL)

He añadido soporte completo para el nuevo nivel de mejora de droides: **Galáctico** (abreviatura: **GAL**), el cual se posiciona justo después del tier *Beskar* (nivel 6).

1. **Configuración y Traducción del Tier:**
   * Se agregó `"tierShort_6": "GAL"` y `"tierName_6": "Galáctico"` / `"Galactic"` en [translations.json](file:///c:/laragon/www/droidex/src/translations.json) en español, inglés y portugués.
   * Se registró el nivel 6 en la constante global de configuración `tiersConfig` y la versión localizada `localizedTiersConfig`.
   * Se implementó el color del badge en `getTierColor` usando un color índigo/azul espacial (`text-indigo-400 border-indigo-500/40 bg-indigo-950/20`).

2. **Soporte en Rebirth Tracker:**
   * El selector rápido de niveles en las tarjetas de droides en el tracker ahora despliega **6 niveles**, con el sexto botón (`GAL`) estilizado con un degradado índigo-azul oscuro (`bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 border-t-indigo-400 text-indigo-100`).

3. **Ampliación en Droidex:**
   * El límite de droids de Droidex fue incrementado a 6 tiers para droides no icónicos.
   * El total de fabricados posibles pasó de `317` a `379` (`62 droids * 6 tiers + 7 droids icónicos`).
   * Se ajustó el loop de estadísticas, el listado general filtrado y los hitos del multiplicador de créditos para soportar la meta de `379`.

