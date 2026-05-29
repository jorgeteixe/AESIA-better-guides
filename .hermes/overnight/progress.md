# Progreso del bucle nocturno AESIA

Este archivo sirve para continuidad entre iteraciones autónomas de Claude.
Cada pasada debe leerlo antes de trabajar y añadir una entrada nueva al final.

## Estado inicial
- Rama de trabajo: `claude/overnight-opus-4-8-aesia-poc`
- Objetivo: convertir la web en una demo claramente más útil, accionable y bien estructurada que una web administrativa típica.
- Regla: cada iteración debe dejar el repo en estado construible.

## 2026-05-29 · Pasada 1 — Integrar el "Punto de partida" en la arquitectura de información

**Hallazgo.** La página `content/docs/start.mdx` ("Punto de partida") existía sin seguimiento en git y **huérfana**: no aparecía en `content/docs/meta.json` (por tanto, ausente de la barra lateral) y no estaba enlazada desde la home, la bienvenida, la introducción ni el resumen. Es la mejor pieza de *decision support* del sitio —un triaje de 4 pasos (ámbito → práctica prohibida → alto riesgo → transparencia → rol) con calendario de aplicación y rutas de lectura por caso— pero solo era accesible escribiendo la URL a mano.

**Cambio (tema único: hacerla descubrible como entrada principal).**
- `content/docs/meta.json`: añadido `start` a `pages`, justo tras `index`, para que encabece la navegación.
- `app/(home)/page.tsx`: el CTA primario del hero pasa a "¿Te aplica el Reglamento? Empieza aquí" → `/docs/start` (antes apuntaba a `/docs`); "Abrir documentación" queda como secundario. El panel "Por dónde empezar" ahora lidera con el Punto de partida (4 pasos renumerados).
- `content/docs/index.mdx`: nueva sección "Empieza por aquí" con tarjeta destacada al triaje y nuevo primer paso en "Cómo leer este portal".
- `content/docs/introduction.mdx`: nuevo primer punto en "Cómo recorrerlo" enlazando el triaje.
- `content/docs/summary.mdx`: enlace breve al triaje en el callout de cabecera para quien aterriza directo en el resumen.

**Evidencia / verificación.**
- Confirmado que los componentes MDX que usa la página (`Accordions/Accordion`, `Steps/Step`, `Callout`, `Cards/Card`) están registrados en `components/mdx.tsx`.
- Verificadas las anclas internas de `start.mdx`: `#tu-ruta-según-el-resultado` (existe) y `01-...#34-fechas-de-activación-de-las-obligaciones` (la guía 01 tiene `### 3.4 Fechas de activación de las obligaciones`).
- `npm run build` correcto: compila, pasa TypeScript y genera 71 páginas estáticas. `out/docs/start/` se exporta y los enlaces a `/docs/start/` aparecen en home, barra lateral y bienvenida.
- Todos los enlaces nuevos usan el mismo esquema raíz-relativo `/docs/...` que el resto del sitio (sin regresión de rutas).

**Siguiente mejora prometedora.** El triaje termina con tarjetas "Tu ruta según el resultado", pero las rutas por caso (p. ej. "alto riesgo · proveedor": 03 → 04 → 05 → 15) viven dispersas entre el resumen y el start. Próxima pasada: crear rutas de lectura reutilizables —una página/sección "Itinerarios" o componentes de ruta por perfil (proveedor de alto riesgo, desplegador, solo transparencia, sector público con FRIA)— enlazadas de forma cruzada y consistente, para convertir el diagnóstico en un plan de trabajo secuenciado por guías.

## 2026-05-29 · Pasada 2 — Itinerarios por perfil: del diagnóstico al plan de trabajo

**Hallazgo.** Recogí la mejora que dejó apuntada la Pasada 1. El `start` (Punto de partida) clasifica al usuario (rol + nivel de riesgo), pero la "ruta según el resultado" eran tarjetas que llevaban a una sola guía o al resumen genérico. No existía ninguna página que tradujera ese diagnóstico en una **secuencia de guías ordenada por perfil**: el orden de lectura del resumen es único (sirve sobre todo al proveedor de alto riesgo) y las pistas por rol estaban dispersas. Faltaba el puente "qué eres → qué hago ahora, guía a guía".

**Cambio (tema único: convertir el diagnóstico en itinerarios accionables).**
- **Nueva página `content/docs/itinerarios.mdx`** ("Itinerarios por perfil"). Cinco itinerarios secuenciados con `<Steps>` por fases; cada paso enlaza la guía y nombra la obligación/artículo y el plazo aplicable:
  - **Proveedor de alto riesgo** (Fase 0 clasificación → 1 diagnóstico → 2 vía de conformidad → 3 arquitectura SGC/riesgos/Anexo IV → 4 controles técnicos → 5 pre-lanzamiento → 6 operación continua).
  - **Responsable del despliegue de alto riesgo** (Art. 26: instrucciones de uso, supervisión humana, datos de entrada, vigilancia en producción), con el aviso de "puedes convertirte en proveedor".
  - **Administración y sector público** (itinerario de desplegador + **EIDF/FRIA, Art. 27**, antes de desplegar; insumos de las guías 05 y 07).
  - **Solo obligaciones de transparencia** (Art. 50).
  - **Riesgo mínimo** (Art. 4) + nota sobre GPAI.
- `content/docs/meta.json`: añadido `itinerarios` justo tras `start` (segundo en la barra lateral).
- `content/docs/start.mdx`: las tarjetas "Tu ruta según el resultado" ahora apuntan a las anclas de cada itinerario (antes: guía suelta / resumen). Añadida tarjeta nueva "administración pública" y frase de entrada al nuevo hub.
- `content/docs/index.mdx`: la sección genérica "Recorridos recomendados" pasa a "Recorridos por perfil", con tarjetas a los itinerarios.
- `content/docs/introduction.mdx`: nuevo punto 2 en "Cómo recorrerlo" enlazando los itinerarios.
- `content/docs/summary.mdx`: el "Orden de lectura recomendado" aclara que describe al proveedor de alto riesgo y remite a los itinerarios para otros perfiles.

**Evidencia / verificación.**
- **Sourcing regulatorio** (WebSearch, EUR-Lex / artificialintelligenceact.eu): confirmado **Art. 26** (obligaciones del responsable del despliegue) y **Art. 27** (EIDF/FRIA para sector público, entidades privadas que prestan servicios públicos y desplegadores del Anexo III 5.b/c, antes de poner en servicio). El resto de afirmaciones se apoya en el contenido ya verificado de `summary.mdx` y `start.mdx`.
- **Patrón UX** (GOV.UK Design System · *step-by-step navigation*): presentar tareas complejas como una secuencia ordenada —"la información correcta, en el momento correcto, en el orden correcto"— mejora de forma medible la finalización de tareas y la confianza del usuario. Es exactamente lo que aportan los itinerarios por perfil frente a un índice plano.
- **Build**: `npm run build` correcto; TypeScript pasa; 74 páginas estáticas (incluye `/docs/itinerarios`, su `llms.mdx` y su OG image).
- **Anclas**: verificado en el HTML generado que los 5 `id` de `<h2>` coinciden exactamente con los anchors usados en los enlaces cruzados, incluidos los acentuados (`administración-y-sector-público`, `riesgo-mínimo`).
- **Enlaces**: los 22 enlaces internos `/docs/...` que emite la página resuelven a HTML generado (0 rotos); el único externo (EUR-Lex) reutiliza la URL ya validada en `official-sources.mdx`.

**Siguiente mejora prometedora.** Los itinerarios viven solo en MDX. El siguiente salto sería **persistir el resultado del triaje del `start` y resaltar el itinerario correspondiente** (p. ej. enlazar cada resultado del Paso 5 a su ancla, ya hecho a nivel de tarjetas, pero pendiente como recorrido continuo) y, sobre todo, **añadir a cada guía una cabecera estandarizada "De un vistazo"** (artículo, rol responsable, fase del itinerario, dependencias y cuándo usarla), reutilizando los datos del resumen. Eso cerraría el círculo: desde el itinerario entras a una guía que, en su cabecera, te recuerda dónde encaja y a qué guías saltar después. Alternativa de alto valor: habilitar la **búsqueda estática** de Fumadocs (Orama) para que el corpus de ~2 MB sea consultable por palabra clave.

## 2026-05-29 · Pasada 3 — Cabecera "De un vistazo" en las 16 guías

**Hallazgo.** Recogí la mejora primaria que dejó apuntada la Pasada 2. Al aterrizar en una guía técnica desde un itinerario (o desde el buscador), el usuario chocaba directamente con el texto transcrito de AESIA ("1. Preámbulo / 1.1 Objetivo del documento…") **sin ninguna orientación de cabecera**: ni qué artículo del Reglamento desarrolla, ni qué operador responde de él, ni en qué momento del proyecto se usa, ni a qué guías saltar después. El diagnóstico (`start`) y la secuenciación (`itinerarios`) ya existían, pero el círculo no se cerraba: la guía no "te devolvía" a tu plan. La búsqueda estática (Orama + `static.json` + `components/search-dialog.tsx`) ya estaba implementada de una pasada anterior, así que descarté esa alternativa y fui a por la cabecera.

**Cambio (tema único: orientación estandarizada y reutilizable en cada guía).**
- **Nuevo componente `components/guia-resumen.tsx`** (`<GuiaResumen>`), *server component* sin estado, registrado en `components/mdx.tsx`. Renderiza un recuadro "De un vistazo" con tokens nativos de Fumadocs (`fd-card`, `fd-border`, `fd-primary`, `fd-muted-foreground`) y semántica accesible (`<aside aria-label>` + `<dl>/<dt>/<dd>`, sin encabezados para no contaminar la TOC). Campos: **artículo del Reglamento**, etiqueta de **capa** (Conocer / Implementar / Autodiagnosticar), **quién responde** (rol/operador), **cuándo usarla**, **guías relacionadas** (chips enlazados) y un enlace fijo "**Sitúala en tu itinerario por perfil →**" a `/docs/itinerarios`. Todos los enlaces usan `next/link`, que prefija el `basePath` de GitHub Pages automáticamente (mismo patrón ya probado en la home).
- **Las 16 guías** (`content/docs/guides/01…16`): insertado un bloque `<GuiaResumen .../>` al inicio del cuerpo, justo antes del *callout* de "Material de apoyo del piloto", con los datos propios de cada guía.

**Evidencia / verificación.**
- **Sourcing de los mapeos artículo↔guía.** Para no introducir datos falsos, cada artículo se cotejó con dos fuentes ya presentes en el repo: el `summary.mdx` (que la Pasada 2 verificó contra EUR-Lex/artificialintelligenceact.eu) y el **texto transcrito de la propia guía**. Confirmado por `grep` en los ficheros: 03→Art. 43, 04→Art. 17, 05→Art. 9, 06→Art. 14, 07→Art. 10, 08→Art. 13, 09/10/11→Art. 15, 12→Art. 12, 13→Art. 72, 14→Art. 73, 15→Art. 11 y Anexo IV. Las guías 01/02/16 no desarrollan un artículo único, así que su campo describe su función (marco general, definiciones Art. 3, manual de checklists). Los textos de "cuándo usarla" y rol responsable se tomaron de la sección "Cuándo usarla" del resumen.
- **Build:** `npm run build` correcto; TypeScript pasa (no hay `ignoreBuildErrors`); 75 páginas estáticas.
- **Render del HTML exportado:** verificado en `out/docs/guides/…/index.html` que el `<aside>` se emite con su estructura `dl/dt/dd`, la etiqueta de capa, el separador `·` del rol y los enlaces. Las **16** guías emiten el enlace al itinerario.
- **Enlaces:** las rutas de "guías relacionadas" y del itinerario resuelven a HTML generado (con `trailingSlash`, p. ej. `/docs/guides/12-guia-de-registros/`, `/docs/itinerarios/`); 0 enlaces rotos.

**Siguiente mejora prometedora.** Ahora los metadatos de cada guía (artículo, rol, capa, cuándo, relacionadas) viven como props inline en cada MDX. El siguiente salto natural es **centralizar esos metadatos en una única fuente tipada** (frontmatter de cada guía o un módulo `lib/guides-meta.ts`) y, con ellos, **construir una página índice `/docs/guides`** que presente las 16 guías como una **matriz escaneable y comparable** (nº, título, artículo, capa, rol, cuándo) en lugar de solo la lista lineal de la barra lateral; de paso, mostrar el nº de artículo como *badge* junto a cada guía en la navegación. Eso elimina la duplicación introducida en esta pasada y da una vista de conjunto "elige tu guía" que hoy no existe.

## 2026-05-29 · Pasada 4 (sin registrar en su momento) — Índice de guías y metadatos centralizados

**Nota de continuidad.** El commit `7e8fed3` ("Add guides index…") implementó la mejora primaria que dejó apuntada la Pasada 3, pero **no se registró aquí**. Lo anoto para que el log sea coherente. Lo hecho: creado `lib/guides-meta.ts` como **fuente tipada única** de las 16 guías (n, slug, título, artículo largo/corto, capa, rol, cuándo, relacionadas) + `content/docs/guides/index.mdx` con el componente `components/guias-indice.tsx` (`<GuiasIndice>`), que renderiza la **matriz comparable agrupada por capa**. Añadido `guides` a `meta.json`.

**Deuda pendiente detectada.** La centralización quedó **a medias**: `GuiasIndice` sí lee de `lib/guides-meta.ts`, pero `GuiaResumen` sigue recibiendo *props inline* y las 16 guías MDX **siguen duplicando** artículo/capa/rol/cuándo/relacionadas. La "fuente única" todavía no es única. (Sigue como mejora futura más abajo.)

## 2026-05-29 · Pasada 5 — Asistente de clasificación interactivo en el "Punto de partida"

**Hallazgo.** El `start.mdx` es un triaje excelente pero **estático**: el usuario tiene que leerse los 5 pasos y autoclasificarse a mano. La pieza que más distingue un producto real de una web administrativa (decisión guiada, "siguiente acción obvia") faltaba: un asistente que **haga las preguntas y devuelva el resultado personalizado** (nivel de riesgo + rol + itinerario + fecha aplicable). Toda la lógica y todos los desenlaces ya existían en `start.mdx` e `itinerarios.mdx`, así que se podía hacer interactivo **sin introducir ninguna afirmación nueva**.

**Cambio (tema único: convertir el triaje estático en un asistente interactivo).**
- **Nuevo componente `components/clasificador.tsx`** (`<Clasificador />`, *client component* con `useState`), registrado en `components/mdx.tsx`. Máquina de estados que reproduce **exactamente** el árbol de decisión de `start.mdx`: P1 ámbito (Art. 2) → P2 práctica prohibida (Art. 5) → P3 alto riesgo (Art. 6, Vía A Anexo I / Vía B Anexo III) → P4 transparencia (Art. 50) → P5 rol (Art. 3). Nueve desenlaces (fuera de ámbito, GPAI, prohibido, transparencia, mínimo, y alto riesgo × proveedor / sector público / desplegador privado / intermediario), cada uno con resumen, **fecha de aplicación** derivada de la vía elegida, notas (p. ej. "un desplegador puede convertirse en proveedor", "EIDF/FRIA Art. 27") y botones de acción al itinerario y a la guía clave. Navegación "← Atrás" / "Empezar de nuevo".
- **Accesibilidad:** `<section aria-label>`, `role="group"` + `aria-labelledby` en cada pregunta, `role="status"`+`aria-live="polite"` en el resultado, foco visible (`focus-visible:ring`) y todo operable por teclado (botones nativos). Estilado con tokens nativos de Fumadocs (`fd-card`, `fd-border`, `fd-primary`) + acentos de tono (emerald/amber/red) y `not-prose`.
- `content/docs/start.mdx`: insertado `<Clasificador />` bajo un nuevo encabezado "**Clasifícate en menos de un minuto**", justo tras el callout de uso; el triaje estático se mantiene **íntegro** debajo como "**El recorrido en detalle**" (referencia autoritativa y *fallback* sin JS). Renombrado el `## Recorrido en cuatro pasos` → `## El recorrido en detalle` (verificado: ningún enlace interno/externo apuntaba a esa ancla; el ancla `#tu-ruta-según-el-resultado` sigue intacta).

**Evidencia / verificación.**
- **Fidelidad sin datos nuevos.** Cada pregunta, opción, desenlace y fecha (prohibiciones 2 feb 2025; GPAI 2 ago 2025 / 2027; Anexo III 2 ago 2026; Anexo I 2 ago 2027; Art. 50 2 ago 2026; alfabetización Art. 4) se tomó literalmente del contenido ya verificado de `start.mdx` (Pasadas 1–2, cotejado contra EUR-Lex/artificialintelligenceact.eu). No se añade ninguna afirmación regulatoria nueva.
- **Patrón UX.** Es la versión interactiva del *step-by-step* de GOV.UK que ya inspiró los itinerarios (Pasada 2): "la información correcta, en el momento correcto", ahora resolviendo el caso del usuario en lugar de pedirle que se autoclasifique.
- **Build:** `npm run build` correcto; TypeScript pasa (sin `ignoreBuildErrors`); 78 páginas estáticas.
- **Render exportado:** verificado en `out/docs/start/index.html` que el estado inicial del asistente (encabezado, P1 y sus opciones) se renderiza en el HTML estático (server-render del *client component*); el resto del flujo se resuelve en cliente.
- **Enlaces:** los 5 anclajes de itinerario a los que enlazan los resultados existen en `out/docs/itinerarios/index.html` (`proveedor-de-alto-riesgo`, `responsable-del-despliegue-de-alto-riesgo`, `administración-y-sector-público`, `solo-obligaciones-de-transparencia`, `riesgo-mínimo`) y las 6 páginas destino (guías 01/03/06/08, `official-sources`, `itinerarios`) se exportan. 0 enlaces rotos.

**Siguiente mejora prometedora.** Dos candidatos de alto valor: (1) **Cerrar la deuda de la Pasada 4**: refactorizar `GuiaResumen` para que reciba solo `n="05"` y lea de `lib/guides-meta.ts` vía `guiasPorNumero`, eliminando la duplicación inline de las 16 guías (la "fuente única" pasaría a serlo de verdad; bajo riesgo). (2) **Persistir/enlazar el resultado del asistente**: permitir copiar/compartir el desenlace como URL con estado (p. ej. `?perfil=prov-alto`) o un *deep-link* desde la home directamente al asistente, para que el diagnóstico sea referenciable. La opción (1) es la más segura y deja por fin coherente el modelo de datos de las guías.

## 2026-05-29 · Pasada 6 — Índice de guías filtrable por rol (navegación orientada a tareas)

**Hallazgo.** Audité el estado: el diagnóstico (`start` + `Clasificador`), la secuenciación (`itinerarios`) y la orientación de cabecera (`GuiaResumen`) ya están maduros. El punto más débil del recorrido era el **índice de guías** (`/docs/guides`): una matriz estática de 16 tarjetas agrupadas por capa, sin forma de **acotar a "lo que me toca"**. Un responsable del despliegue tenía que distinguir a ojo, entre las 16, cuáles le aplican y cuáles son solo del proveedor. Frente a las dos mejoras que dejó apuntada la Pasada 5 —la (1) refactor de `GuiaResumen` (cleanup interno, invisible) y la (2) deep-link del asistente (visible pero de nicho)—, prioricé un tercer eje **más visible y de mayor alcance** que encaja directamente en "navegación orientada a tareas" y "recorridos de usuario más claros": convertir el índice en una herramienta filtrable por rol. El campo `rol` ya existía como texto verificado en cada guía, así que estructurarlo **no introduce ninguna afirmación nueva**.

**Cambio (tema único: hacer el índice de guías filtrable por rol de operador).**
- `lib/guides-meta.ts`: nuevo tipo `RolGuia` (`todos` | `proveedor` | `desplegador`) y campo `roles: RolGuia[]` en las 16 guías, **derivado fielmente del campo `rol` (texto)** de cada una: 01/02/16 → `todos` (marco/diagnóstico, siempre visibles); 03/04/05/09/10/15 → `proveedor`; 06/07/08/11/12/13/14 → `proveedor` + `desplegador` (las que su prosa ya atribuye también al responsable del despliegue). Añadidos `FiltroRol`, la lista `filtrosRol` (con nota contextual por filtro) y el helper puro `guiaCoincideRol(g, rol)`.
- `components/guias-indice.tsx`: pasa a *client component* (`'use client'` + `useState`). Fila de tres botones de filtro (`role="group"` + `aria-pressed`, foco visible por teclado) sobre la matriz; contador "Mostrando X de 16 guías" con `aria-live="polite"` y la nota del filtro activo; las capas sin resultados no se renderizan. El marcado de las tarjetas se conserva intacto. Sigue leyendo de la fuente única `lib/guides-meta`.
- `content/docs/guides/index.mdx`: la entradilla anuncia el filtro ("**Filtra por tu rol** —proveedor o responsable del despliegue—").

**Evidencia / verificación.**
- **Sin datos nuevos.** Los `roles` se mapean uno a uno desde la prosa `rol` ya presente y verificada en pasadas anteriores (p. ej. 07 "…responsable del despliegue (si controla los datos de entrada)" → incluye `desplegador`; 03 "Proveedor" → solo `proveedor`). Las notas de cada filtro se apoyan en `start.mdx`/`itinerarios.mdx` (Art. 26: instrucciones de uso, supervisión humana, datos de entrada, vigilancia).
- **Lógica del filtro.** `desplegador` muestra 10 guías (01/02 + 06/07/08/11/12/13/14 + 16), ocultando las 6 exclusivas del proveedor (03/04/05/09/10/15); `proveedor` muestra las 16 (asume la mayoría de obligaciones); `todos` muestra las 16. Diferencia visible y correcta.
- **Patrón UX.** *Faceted filtering* / vista por tarea (GOV.UK, "the right information at the right time"): permitir que cada perfil acote el corpus a sus guías reduce carga cognitiva frente a una lista plana de 16.
- **Build:** `npm run build` correcto; TypeScript pasa (sin `ignoreBuildErrors`); 78 páginas estáticas (sin cambio de rutas: se mejora el índice existente).
- **Render exportado** (`out/docs/guides/index.html`): el estado inicial (`rol='todos'`) emite los 3 botones (`aria-pressed`: 1 `true` + 2 `false`), el grupo accesible `aria-label="Filtrar guías por rol de operador"`, el contador "Mostrando …" con su nota y las **16** tarjetas. El filtrado por cliente es lógica pura (`guiaCoincideRol`) ya type-checked.

**Siguiente mejora prometedora.** Dos pasos que se apoyan en lo de esta pasada: (1) **Cerrar por fin la deuda de la Pasada 4/5**: ahora que `lib/guides-meta.ts` es una fuente única más rica (incluye `roles`), refactorizar `GuiaResumen` para que reciba solo `n="05"` y derive todo —incluidos los chips de relacionadas vía `relacionadas` + `tituloCorto` + `hrefGuia`— eliminando la duplicación inline en las 16 guías MDX (bajo riesgo, deja el modelo de datos honesto). (2) **Hacer el filtro direccionable por URL** (p. ej. `/docs/guides#rol=desplegador`) para poder **deep-linkar desde el resultado del `Clasificador` y desde los `itinerarios`** directamente al índice ya prefiltrado por el rol del usuario, cerrando el bucle diagnóstico → navegación.
