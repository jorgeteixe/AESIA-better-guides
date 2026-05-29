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
