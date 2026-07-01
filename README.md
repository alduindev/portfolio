# Portfolio React App

Este repositorio contiene una aplicación web de portafolio personal construida con React, Vite y Tailwind CSS.

## Descripción del proyecto

- Proyecto React en el subdirectorio `a`.
- Usa Vite como bundler y servidor de desarrollo.
- Incluye Tailwind CSS para estilos responsivos y modernos.
- Emplea `oxlint` para linting de código.
- El componente principal `App.jsx` renderiza un portafolio a través de `src/components/Portfolio.jsx`.

## Estructura del proyecto

- `package.json` - configuración de scripts, dependencias y devDependencies.
- `vite.config.js` - configuración de Vite con plugins de React y Tailwind.
- `src/main.jsx` - punto de entrada principal, renderiza `App` dentro de `#root`.
- `src/App.jsx` - componente raíz que carga el portafolio.
- `src/index.css` - estilos globales del proyecto.
- `src/components/Portfolio.jsx` - componente principal con secciones de inicio, experiencia, stack, IA y proyectos.

## Dependencias principales

- `react` y `react-dom` 19.x
- `@vitejs/plugin-react` para soporte de React en Vite
- `tailwindcss` 4.x con plugin `@tailwindcss/vite`
- `oxlint` para linting
- `vite` para desarrollo y build

## Scripts disponibles

Desde la carpeta `a`, ejecuta:

- `npm install` - instala dependencias.
- `npm run dev` - inicia el servidor de desarrollo de Vite.
- `npm run build` - construye la aplicación para producción.
- `npm run preview` - previsualiza la compilación de producción.
- `npm run lint` - ejecuta Oxlint para revisar el código.

## Cómo ejecutar el proyecto

1. Abre una terminal en `c:\Users\alduindevouring\Desktop\NW\a`.
2. Ejecuta `npm install`.
3. Ejecuta `npm run dev`.
4. Abre el navegador en la URL que indique Vite (normalmente `http://localhost:5173`).

## Notas de desarrollo

- La aplicación se basa en componentes React funcionales.
- `Portfolio.jsx` maneja datos estáticos para secciones de experiencia, stack, IA y proyectos.
- El diseño está pensado para ser responsivo y fácilmente extendible.
- Para agregar nuevas secciones, modifica `Portfolio.jsx` y añade nuevos datos o componentes.

## Recomendaciones

- Usa `npm run lint` regularmente para mantener el código limpio.
- Si deseas agregar TypeScript, instala `typescript`, actualiza los archivos a `.tsx` y configura `tsconfig.json`.
- Mantén las dependencias actualizadas, sobre todo Vite, React y Tailwind.

## Recursos útiles

- Vite: https://vitejs.dev/
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- Oxlint: https://oxc.rs/
