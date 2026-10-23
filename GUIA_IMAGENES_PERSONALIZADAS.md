# LA CASA DEL ACTOR — IMÁGENES Y VIDEO

## Instalación en tu ruta de Windows

Descomprime el ZIP en `D:\la-casa-del-actor-react\` (tu ruta debe acabar como `D:\la-casa-del-actor-react\la-casa-del-actor-react\`).

1. Abre la carpeta interna `la-casa-del-actor-react` con Visual Studio Code.
2. Abre una terminal y ejecuta `npm install` y luego `npm run dev`.
3. Abre `http://localhost:5173/`.

## Archivos ya sustituidos

| Ubicación en web | Archivo |
|---|---|
| Logo del encabezado y pie | `/images/logo-la-casa-del-actor.jpg` (recorte del logo entregado) |
| Portada de Inicio | `/images/IMG_0306.JPG` |
| Inicio — bloque productoras | `/images/IMG_5569.JPG` |
| Inicio — tarjetas visuales | `/images/IMG_0419.JPG` y `/images/IMG_0312.JPG` |
| Galería de comunidad | `/images/IMG_0419.JPG`, `/images/IMG_5808.jpg`, `/images/IMG_5569.JPG`, `/images/IMG_0306.JPG` |
| Teaser | `/images/teaser-la-casa-del-actor.mp4` |
| Afiche blog: preparación de casting | `/images/Posteo para Facebook Búsqueda laboral Profesional Amarillo y blanco (2).png` |
| Artículo del blog: perfil artístico | `/images/IMG_5808.jpg` |
| Marcas y auspicios, solo como recursos de archivo | `/images/MARCAS Y-O AUSPICIOS/` |

Conservamos los SVG de castings y talentos porque las fotografías del RAR muestran actividades, **no fichas profesionales de las personas ficticias** del proyecto. No asociamos identidades no confirmadas con nombres inventados.

## Conversión HEIC

Las imágenes HEIC originales están en `public/images/originales-heic/`. Sus copias JPG compatibles con navegador están en `public/images/`, por ejemplo `IMG_0269.jpg`.

## Cómo cambiar cualquier imagen

1. Copia `foto-nueva.jpg` dentro de `public/images/`.
2. Abre `src/App.jsx`: cambia `PHOTO_HERO`, `PHOTO_STAGE`, `PHOTO_ACTOR` o `PHOTO_ACTRESS`.
3. Para fotos en la nueva sección Comunidad: modifica el array `fotos` en el componente `ComunidadGaleria()` del mismo archivo.
4. Para fotos de perfiles: `src/data/talentosData.js`, propiedades `foto` y `galeria`.
5. Para castings: `src/data/castingsData.js`, propiedad `imagen`.
6. Para el blog: `src/data/blogData.js`, propiedad `imagen`.
7. Para servicios: `src/data/serviciosData.js`, propiedad `foto`.

No introduzcas la ruta `D:\...` en `src` de una imagen: usa siempre `/images/nombre-del-archivo.jpg`, porque Vite sirve la carpeta `public` desde `/`.

## Avisos antes de publicar

Asegúrate de contar con permiso de publicación de fotografías de personas y material de marcas. Los logos se muestran como recursos del archivo, no como prueba de alianza actual. El video publicado es una versión MP4 reducida para facilitar la visualización; el MOV original continúa en tu RAR.

## Si ya tienes usuarios creados o publicaciones

**NO borres la carpeta de datos local del servidor** al reemplazar un proyecto existente. Haz primero una copia de seguridad de tu versión anterior. Puedes copiar solo `src/App.jsx`, `src/styles.css`, `src/data/blogData.js`, `public/images/` y esta guía al proyecto previo para conservar el resto de tu información. Si has personalizado esos tres archivos, compara los cambios antes de reemplazarlos.
