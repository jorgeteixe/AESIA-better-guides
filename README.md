# Guías AESIA

**Guías AESIA** es un portal documental en español que reorganiza el corpus público de guías de la Agencia Española de Supervisión de la Inteligencia Artificial (AESIA) sobre el Reglamento Europeo de IA para hacerlo más legible, navegable y utilizable en trabajo real.

El proyecto está construido con [Next.js](https://nextjs.org) y [Fumadocs](https://fumadocs.dev), se publica como sitio estático en GitHub Pages y añade una capa editorial sobre el material fuente: estructura, navegación, páginas de contexto, resumen transversal y acceso directo a recursos prácticos.

## Qué aporta este repositorio

- Una **portada editorial** para entrar al corpus sin empezar desde PDFs sueltos.
- Una **introducción** que explica alcance, límites y forma de uso del portal.
- Un **resumen profundo** que conecta las 16 guías y sugiere recorridos de lectura.
- Una **transcripción navegable por guía** dentro de una sola experiencia documental.
- Una sección de **recursos prácticos** con listas de control y ejemplos publicados por AESIA.
- Una página de **fuentes oficiales** con enlaces verificables a AESIA y EUR-Lex.

## Estructura del portal

El contenido se organiza alrededor de cuatro puntos de entrada principales:

1. **Introducción**: contexto, alcance y forma de uso.
2. **Resumen profundo**: síntesis transversal del conjunto.
3. **Guías**: una página por cada documento principal del corpus.
4. **Recursos**: material práctico para autodiagnóstico, evidencias y trabajo operativo.

Además, el portal mantiene una página de **fuentes oficiales** para que la referencia canónica esté siempre a un clic.

## Stack técnico

- **Framework**: Next.js
- **UI documental**: Fumadocs
- **Lenguaje**: TypeScript
- **Publicación**: GitHub Pages
- **Despliegue**: GitHub Actions

## Desarrollo local

```bash
npm install
npm run dev
```

Después, abre `http://localhost:3000`.

## Build estático

```bash
npm run build
```

La build genera la exportación estática del sitio y deja el resultado listo para publicación en GitHub Pages.

## Despliegue

El repositorio incluye un workflow de GitHub Actions para desplegar GitHub Pages desde la rama `main`.

En condiciones normales, basta con hacer push a `main` para disparar el build y el deploy automáticamente.

## Fuentes oficiales

Este repositorio **no sustituye** a la documentación oficial.

Las fuentes canónicas siguen siendo:

- El portal de guías publicado por **AESIA**.
- El texto legal del Reglamento de IA disponible en **EUR-Lex**.

Para interpretación jurídica, validación formal o consulta normativa, debe acudirse siempre a esas fuentes oficiales.

## Licencia

El archivo [`LICENSE`](./LICENSE) incluye la licencia **Apache License 2.0** para este repositorio.

### Alcance de esa licencia

La licencia Apache-2.0 aplica a:

- el **código fuente** del repositorio;
- la **estructura del portal**;
- el **trabajo editorial original** añadido en este proyecto (por ejemplo: organización, navegación, copy propio, resúmenes y demás aportaciones originales del autor del repositorio).

La licencia Apache-2.0 **no se aplica automáticamente** a:

- los **textos oficiales originales de AESIA**;
- documentos regulatorios;
- PDFs, anexos, checklists, ejemplos u otros materiales de terceros reproducidos, enlazados o transcritos;
- cualquier otro contenido cuyo régimen jurídico siga siendo el de su fuente original.

En otras palabras: este repositorio licencia bajo Apache-2.0 lo que es **propio y original del repositorio**, pero **no pretende relicenciar** materiales oficiales o de terceros que no pertenecen a su autor.

Consulta también [`NOTICE`](./NOTICE) para una aclaración breve de alcance.
