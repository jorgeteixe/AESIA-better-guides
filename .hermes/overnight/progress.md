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
