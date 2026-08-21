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

He implementado una lógica de ordenamiento para los droides del "Rebirth Tracker" para que los 3 requeridos para el nivel de Rebirth actual aparezcan al inicio del listado y el resto mantenga su orden alfabético original.

1. **Orden de Prioridad por Estado:**
   * **Nivel Actual Primero:** Los 3 droides necesarios para alcanzar tu siguiente nivel de Rebirth inmediato ($currentRebirth + 1$) aparecen siempre arriba de todo, sin importar si ya están completados o pendientes.
   * **Resto Alfabético:** Todos los demás droides requeridos se muestran a continuación ordenados alfabéticamente (independientemente de si son de niveles futuros o ya están completados).
   * **No Requeridos:** Los droides no necesarios en absoluto se muestran en la sección inferior, ordenados alfabéticamente por nombre.

2. **Textos Informativos:**
   * Se actualizaron las traducciones del footer (`droidsOrderFooter`) en español, inglés y portugués para reflejar con precisión este comportamiento ("Los droides del nivel actual aparecen primero, el resto se ordena alfabéticamente.").

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

---

## Nuevos Cambios: Cálculo y Visualización de Chips Necesarios para la Siguiente Meta

He implementado el cálculo dinámico y la visualización de los chips de mejora necesarios para alcanzar los requisitos de la siguiente meta de Rebirth:

1. **Desglose de Chips en el Panel de la Meta:**
   * Directamente debajo de la lista de droides requeridos en la cabecera ("Requisitos para Rebirth {X}"), aparece una fila dedicada con los chips necesarios para cada droide que requiera subir de nivel.
   * Muestra la progresión exacta desde el nivel actual que posees hasta el tier objetivo (por ejemplo: `Mecha-Droid: 180 chips (Oro → Diamante)` o `300 chips (Base → Diamante)`).
   * Si más de un droide requiere chips, se calcula y muestra automáticamente el `Total: X chips`.

2. **Chips en las Tarjetas de Droides:**
   * En las etiquetas de recomendación de cada tarjeta de droide (`⚡ META {level}: {tier}` y `🔒 {level} OK (Futuro {futureLevel}: {tier})`), se incluye el sufijo con los chips necesarios (por ejemplo: `• 180 Chips`).

3. **Soporte Multilenguaje Completo:**
   * Se añadieron las traducciones en Español, Inglés y Portugués en [translations.json](file:///c:/laragon/www/droidex/src/translations.json).

---

## Nuevos Cambios: Timers Sandcrawler Sticky Globales con Barras de Progreso

He transformado la barra de contadores de Blueprints de Sandcrawler en un componente global persistente con estilo de barra de progreso:

1. **Visibilidad en Todas las Pantallas (`Rebirth Tracker`, `Droidex` y `Tienda Nova`):**
   * El banner de timers y la navegación ahora forman parte del header principal que permanece disponible en las 3 secciones.

2. **Posición Sticky Siempre Visible:**
   * El contenedor superior (`sticky top-0 z-30`) cuenta con un fondo translúcido con efecto de desenfoque (`bg-[#050810]/95 backdrop-blur-md`), asegurando que al desplazarse por listas extensas nunca se pierda de vista la cuenta regresiva de los blueprints.

3. **Diseño con Barras de Progreso:**
   * Cada tarjeta de blueprint (*Estelar*, *Mítico* y *Galáctico*) incluye una barra de progreso fluida con gradientes temáticos (`amber`, `rose`, `purple`) que se va llenando gradualmente hasta alcanzar el 100% en el momento del spawn.
   * Cuenta con efectos de pulso, resplandor y avisos visuales automáticos para los estados `¡Prepárate!` (últimos 30s) y `¡Ahora!` (spawn activo).

---

## Corrección: Avance de Nivel al Presionar "¡Rebirth Listo!"

Se corrigió el error por el cual al hacer clic en el botón de **"¡Rebirth Listo!"** se saltaban 2 niveles de Rebirth en lugar de avanzar al siguiente nivel inmediato:

* **Causa del problema:** El botón ejecutaba `saveRebirth(targetLevel + 1)`. Dado que `targetLevel` ya corresponde al siguiente nivel a alcanzar (`currentRebirth + 1`), sumarle `+ 1` provocaba que el estado pasara a `currentRebirth + 2`.
* **Solución aplicada:** Se ajustó la llamada en [src/App.tsx](file:///c:/laragon/www/droidex/src/App.tsx) a `saveRebirth(Math.min(35, targetLevel))`, avanzando correctamente de a 1 nivel a la vez.




