# Guías AESIA

Portal documental en español que reorganiza las **16 guías de supervisión de la AESIA** sobre el Reglamento Europeo de Inteligencia Artificial como un sitio único, navegable y curado.

Está construido con [Next.js](https://nextjs.org) + [Fumadocs](https://fumadocs.dev), se publica como sitio estático en GitHub Pages y mantiene trazabilidad explícita hacia las fuentes oficiales.

## Qué incluye

- Página de bienvenida y mapa del corpus.
- Introducción editorial sobre el alcance del portal.
- Resumen profundo y transversal de las 16 guías.
- Una página por cada guía oficial transcrita.
- Recursos prácticos (listas de control y ejemplos publicados por AESIA).
- Página de fuentes oficiales y descargas verificables.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Build estático

```bash
npm run build
```

El sitio se exporta a `out/` listo para servirse en GitHub Pages.

## Fuente del material

Este proyecto se apoya en transcripciones del material oficial publicado por la **Agencia Española de Supervisión de Inteligencia Artificial**. Para interpretación jurídica o validación formal, la referencia canónica sigue siendo la documentación publicada por AESIA y el texto legal disponible en [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/spa).
