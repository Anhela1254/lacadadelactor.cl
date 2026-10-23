# Manual: sección de Talentos — La Casa del Actor

El proyecto incorpora un **directorio de artistas** y una **ficha individual para cada talento**. Son ejemplos originales (no perfiles reales extraídos de La Luz Films & Talents). La identidad visual utiliza exclusivamente la paleta base del proyecto.

## 1. Abrir y ejecutar en Visual Studio Code

1. Descarga y descomprime el ZIP.
2. En VS Code, elige **Archivo > Abrir carpeta** y selecciona `la-casa-del-actor-react`.
3. Abre **Terminal > Nuevo terminal**.
4. Ejecuta:

```bash
npm install
npm run dev
```

5. Abre la URL indicada en la terminal, normalmente `http://localhost:5173/`.
6. En el menú pulsa **talentos** para abrir `http://localhost:5173/talentos`.
7. Haz clic en una ficha, por ejemplo **Valentina Ríos**, para abrir `http://localhost:5173/talentos/valentina-rios`.

## 2. ¿Qué archivo editar para cada cambio?

| Lo que quieres cambiar | Archivo |
| --- | --- |
| Nombres, perfiles, fotos, biografías, reels, CV | `src/data/talentosData.js` |
| Tarjetas, buscador, filtros, ordenación | `src/pages/TalentosPage.jsx` |
| Diseño del perfil, galería y botones | `src/pages/TalentoPerfilPage.jsx` |
| Colores, tamaño de tarjetas, tipografías, responsive | `src/pages/Talentos.css` y `src/styles.css` |
| Enlace “Talentos” del menú y el inicio | `src/App.jsx` |
| Rutas `/talentos` y `/talentos/:slug` | `src/main.jsx` |
| Fotografías | `public/images/` |
| Currículum en PDF | `public/cv/` |

**Normalmente solo tendrás que editar `src/data/talentosData.js` y copiar archivos a `public/images`.**

## 3. Cambiar la foto principal de un talento

1. Copia `maria-perez.jpg` a `public/images/`.
2. Abre `src/data/talentosData.js`.
3. Busca la persona correspondiente, por ejemplo `slug: 'valentina-rios'`.
4. Cambia estas propiedades:

```js
foto: '/images/maria-perez.jpg',
galeria: [
  '/images/maria-perez.jpg',
  '/images/maria-perez-2.jpg',
  '/images/maria-perez-3.jpg'
],
```

No necesitas importar las imágenes en React porque están en la carpeta `public` de Vite. **La ruta comienza con `/images/`, NO con `/public/images/`.** Usa fotos verticales (proporción recomendada **3:4**, mínimo 900 × 1200 píxeles). Para la galería también puedes usar fotografías horizontales, aunque el diseño las recorta con `object-fit: cover`.

## 4. Cambiar nombres, títulos y descripción

En el mismo objeto modifica:

```js
slug: 'maria-perez', // Debe ser único, minúsculas, sin espacios ni tildes
nombre: 'María Pérez',
especialidad: 'Actriz',
categoria: 'Actrices',
disciplinas: ['Cine', 'Teatro', 'Publicidad'],
ciudad: 'Lima',
pais: 'Perú',
frase: 'La actuación me permite descubrir nuevas historias.',
biografia: [
  'María es actriz ...',
  'Ha participado en ...',
  'Se formó en ...'
],
```

**Si cambias `slug`, cambia también el enlace permanente del perfil:**

`/talentos/maria-perez`

Los nombres y fichas incluidos originalmente son demostrativos. Antes de publicar, sustituye TODOS los datos ficticios por información real y autorizada. Si el texto no existe, puedes dejar el array vacío.

## 5. Agregar un nuevo talento (copia y pega)

En `src/data/talentosData.js` busca:

```js
export const talentosData = [
  // perfiles existentes
];
```

Justo ANTES de `];`, después del último objeto, agrega una coma y el siguiente objeto completo. **Asegúrate de que cada `id` y `slug` sea diferente**:

```js
{
  id: 9,
  slug: 'maria-perez',
  nombre: 'María Pérez',
  especialidad: 'Actriz',
  categoria: 'Actrices',
  disciplinas: ['Cine', 'Teatro'],
  ciudad: 'Lima',
  pais: 'Perú',
  foto: '/images/maria-perez.jpg',
  galeria: [
    '/images/maria-perez.jpg',
    '/images/maria-perez-2.jpg',
    '/images/maria-perez-3.jpg'
  ],
  frase: 'Una artista siempre tiene algo nuevo que contar.',
  biografia: [
    'Escribe aquí su experiencia en cine y teatro.',
    'Escribe aquí su formación y trabajos seleccionados.'
  ],
  ficha: {
    'Rango de edad': '25–35 años',
    'Estatura': '1,68 m',
    'Idiomas': 'Español e inglés',
    'Residencia': 'Lima, Perú'
  },
  experiencia: [
    { anio: '2026', proyecto: 'Mi producción', rol: 'Protagonista', formato: 'Cine' },
    { anio: '2025', proyecto: 'Mi obra teatral', rol: 'Elenco', formato: 'Teatro' }
  ],
  reel: '',
  presentacion: '',
  cv: '',
  instagram: '',
  contacto: ''
}
```

Al guardar el archivo, **la persona aparece automáticamente en el directorio y se genera su página en `/talentos/maria-perez`**. No tienes que crear un nuevo JSX por persona.

## 6. Mostrar o cambiar las categorías

El directorio usa la propiedad `categoria` de cada persona. Las categorías disponibles se configuran en el final de `src/data/talentosData.js`:

```js
export const TALENT_CATEGORIES = [
  'Todos', 'Actores', 'Actrices', 'Dirección', 'Guion'
];
```

Para agregar, por ejemplo, modelos y bailarines, cambia por:

```js
export const TALENT_CATEGORIES = [
  'Todos', 'Actores', 'Actrices', 'Dirección', 'Guion', 'Modelos', 'Bailarines'
];
```

En el nuevo perfil usa `categoria: 'Modelos'` o `categoria: 'Bailarines'`. Los nombres deben coincidir exactamente.

La búsqueda por nombre, ciudad y disciplinas funciona sin configurar nada más. El usuario puede ordenar por nombre o filtrar por categoría.

## 7. Activar el reel y el video de presentación

Los botones aparecen **desactivados** si las propiedades están vacías. Cuando cargues tu propio video a YouTube o Vimeo, pega la URL:

```js
reel: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
presentacion: 'https://vimeo.com/123456789',
```

En YouTube reemplaza `XXXXXXXXXXX` por el ID real del video (11 caracteres). Acepta URLs de `youtube.com/watch?v=...`, `youtu.be/...`, `youtube.com/embed/...` y `vimeo.com/...`. Cuando haya un video válido, el botón abre una ventana emergente y muestra el reproductor.

## 8. Activar el botón “Descargar CV”

1. Copia el currículum en PDF a `public/cv/`, por ejemplo `maria-perez.pdf`.
2. Modifica la propiedad:

```js
cv: '/cv/maria-perez.pdf',
```

Al seleccionar **Descargar CV** el archivo puede descargarse del mismo sitio. Si no se configuró un PDF, el botón permanece desactivado.

## 9. Agregar Instagram o correo

```js
instagram: 'https://www.instagram.com/usuario/',
contacto: 'representacion@tudominio.com',
```

Cuando agregues esos datos aparecerán los accesos correspondientes. El contacto usa el programa de correo que tenga configurado la persona visitante. Evita publicar correos personales sin permiso.

## 10. Modificar los datos técnicos o filmografía

La ficha técnica es un objeto flexible. Puedes agregar o quitar campos:

```js
ficha: {
  'Edad actoral': '25–35 años',
  'Estatura': '1,70 m',
  'Idiomas': 'Español e inglés',
  'Acentos': 'Peruano neutro',
  'Habilidades': 'Canto, danza',
  'Residencia': 'Lima, Perú'
},
```

Para agregar créditos a la filmografía:

```js
experiencia: [
  { anio: '2026', proyecto: 'Nombre de la película', rol: 'Protagonista', formato: 'Cine' },
  { anio: '2024', proyecto: 'Nombre de la serie', rol: 'Reparto', formato: 'TV' }
],
```

## 11. Cambiar colores y cuántos talentos se muestran por fila

Para colores, cambia las variables en `src/styles.css`:

```css
:root {
  --lime: #D9DF3B;
  --emerald: #00A878;
  --white: #FFFFFF;
  --deep-teal: #008F70;
}
```

Para cambiar cuántas tarjetas se muestran en computadoras, busca `.tl-grid` en `src/pages/Talentos.css`:

```css
.tl-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
```

- `repeat(4, ...)` → 4 talentos por fila (valor actual).
- `repeat(3, ...)` → 3 talentos por fila.
- `repeat(5, ...)` → 5 talentos por fila (necesita pantalla ancha).

Los puntos de ruptura de tablets y celulares se configuran en las reglas `@media` al final de `Talentos.css`.

## 12. ¿Cómo funciona la navegación?

El menú principal, en `src/App.jsx`, ya utiliza:

```jsx
{ title: 'talentos', href: '/talentos' }
```

En `src/main.jsx` se detecta:

```jsx
if (currentPath === '/talentos') return <TalentosPage />;
if (currentPath.startsWith('/talentos/')) {
  const slug = currentPath.slice('/talentos/'.length);
  return <TalentoPerfilPage slug={slug} />;
}
```

El directorio genera cada enlace a partir del `slug` configurado en el objeto de talento, por ejemplo:

```jsx
<a href={`/talentos/${talento.slug}`}>Ver perfil</a>
```

Por eso **no debes crear páginas manuales ni tocar la navegación para cada talento**.

## 13. Interacciones que ya funcionan

- Acceso desde Inicio, menú y pie de página.
- Filtro por categorías, búsqueda por nombre, ciudad y especialidades.
- Orden alfabético ascendente y descendente.
- Tarjetas que abren la URL individual de cada artista.
- Ficha con portada, biografía, especialidades, información física/profesional, créditos y fotos.
- Galería con ampliación al hacer clic, flechas, Escape y cierre.
- Botón para compartir o copiar enlace al portapapeles.
- Navegación al artista anterior/siguiente.
- Video modal para URLs de YouTube y Vimeo y enlaces CV/Instagram/contacto si se configuran.
- Diseño adaptable a computadoras, tablets y celulares.

## 14. Límites actuales

Es un **frontend React + Vite**; no incluye base de datos, acceso privado, subida desde un panel administrativo ni correos transaccionales. Los datos se guardan en el código fuente; cuando los actualices, debes volver a publicar el sitio. Los 8 perfiles son ficticios y las imágenes SVG son **marcadores de posición diseñados para sustituirse**. Ningún perfil representa a las personas que aparecen en la web de referencia.

## 15. Publicar el proyecto

```bash
npm run build
```

Se crea `dist/`. Los archivos `public/_redirects` y `vercel.json` ya contienen las redirecciones SPA para Netlify y Vercel. Si usas otro hosting, configura las rutas para que `/talentos` y `/talentos/slug` apunten a `index.html`.
