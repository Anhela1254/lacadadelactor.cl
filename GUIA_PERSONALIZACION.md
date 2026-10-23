# MANUAL COMPLETO DE PERSONALIZACIÓN — LA CASA DEL ACTOR

Guía para principiantes. Esta versión del proyecto ya comparte los datos de casting entre la portada y `/castings`. Todas las convocatorias son ficticias hasta que las reemplaces por información comprobada.

## 0. Abre y ejecuta el proyecto

1. Descarga y descomprime el ZIP.
2. Instala **Node.js** (incluye npm) si no lo tienes.
3. En **Visual Studio Code** entra a **Archivo > Abrir carpeta** y selecciona `la-casa-del-actor-react`.
4. Abre **Terminal > Nuevo terminal** y escribe, un comando por línea:
   ```bash
   npm install
   npm run dev
   ```
5. Copia la dirección que indique Vite, normalmente `http://localhost:5173/`.
6. Abre `http://localhost:5173/castings` para comprobar la cartelera.
7. Al modificar un archivo pulsa **Ctrl+S**: normalmente Vite actualiza la página automáticamente.
8. Para detener el servidor usa **Ctrl+C** en la terminal.

Atajos: **Ctrl+P** busca archivos por nombre; **Ctrl+F** busca texto en un archivo; **Ctrl+Shift+F** busca una frase en todos los archivos; **Ctrl+S** guarda.

## 1. ¿Qué archivo modifica qué parte?

| Qué deseas cambiar | Archivo exacto | Dónde buscar |
| --- | --- | --- |
| Lista de castings, fotos, productoras, requisitos, fechas, URL de postulación | `src/data/castingsData.js` | `export const castingsData` |
| Encabezado, subtítulo, filtros, tarjetas, ventana emergente y botones de `/castings` | `src/pages/CastingsPage.jsx` | `function CastingsPage`, `CastingCard`, `DetailsModal` |
| Diseño de `/castings`: tamaños, cuadrícula, espaciados y fotos | `src/pages/CastingsPage.css` | `.cd-hero`, `.cd-grid`, `.cd-card-image`, `.cd-dialog` |
| Menú, logo, textos del inicio, artistas, productoras, artículos, planes, preguntas y pie | `src/App.jsx` | `Brand`, `Header`, `Hero`, `Talents`, `Producers`, `Blog`, `Plans`, `FAQS`, `Footer` |
| Colores, fuente y diseño de Inicio | `src/styles.css` | `:root`, `.hero`, `.site-header`, `.button` |
| Título que aparece en la pestaña y descripción de la web | `index.html` | `<title>`, `name="description"` |
| Qué componente se abre en cada dirección | `src/main.jsx` | `currentPath` |
| Imágenes propias | `public/images/` | Agrega los archivos aquí |
| Dependencias y comandos npm | `package.json` | `scripts`, `dependencies` |

**Importante:** En esta versión, **NO** tienes que agregar el mismo casting dos veces. Tanto Inicio como `/castings` leen `src/data/castingsData.js`.

## 2. Cambiar una foto de casting (paso a paso)

1. Guarda tu foto en `public/images/` (por ejemplo `casting-pelicula.jpg`).
2. Abre `src/data/castingsData.js`.
3. Busca el casting al que le quieras cambiar la imagen.
4. Reemplaza su propiedad `imagen`:
   ```js
   imagen: '/images/casting-pelicula.jpg',
   ```
5. Guarda y abre `/castings` en el navegador.

La dirección empieza con `/images/` porque todo lo que guardas dentro de `public/` se sirve desde la raíz de la web. No escribas `/public/images/`. Usa nombres de archivo sin espacios ni tildes, respetando mayúsculas/minúsculas. Recomendación: fotos horizontales JPG, PNG o WebP de 1200×800 píxeles, optimizadas para web.

Si la foto queda demasiado recortada, abre `src/pages/CastingsPage.css` y modifica:
```css
.cd-card-image { height: 217px; }
.cd-card-image img { width: 100%; height: 100%; object-fit: cover; }
```
Para mostrar toda la foto sin recorte puedes usar `object-fit: contain;` (aparecerán bordes vacíos si la proporción no coincide). **Ojo:** al final del CSS existen reglas móviles que también ajustan `.cd-card-image`.

## 3. Cambiar título, productora, descripción, pago y región

Abre `src/data/castingsData.js`. Dentro de cada objeto encontrarás:

```js
{
  id: 'ultima-funcion',                       // ID único, sin espacios
  titulo: 'La última función',                // Título visible en la tarjeta
  productora: 'Mi productora',                // Productora o responsable
  tipo: 'Cortometraje',                       // Crea opciones en el filtro TIPO
  remuneracion: 'Remunerado',                 // Debe coincidir con el filtro PAGO
  region: 'Metropolitana',                    // Crea opciones en REGIÓN
  imagen: '/images/casting-01.svg',           // Ruta de imagen
  descripcion: 'Descripción de mi casting.', // Resumen y detalle
  requisitos: [                               // Lista que sale al abrir detalles
    'Actores de 18 a 30 años',
    'Disponibilidad para ensayos',
    'Presentar videobook'
  ],
  fechas: 'Noviembre 2026',                    // Aparece como fecha de rodaje
  cierre: '15/11/2026',                       // Aparece como fecha de cierre
  postulacionUrl: ''                          // URL externa, si existe
}
```

No repitas un `id`. Las palabras en `tipo` o `region` pueden ser nuevas: se agregarán automáticamente a los filtros. En cambio, **PAGO** usa opciones fijas: ver sección 6.

## 4. Agregar un casting nuevo, sin borrar los existentes

1. Abre `src/data/castingsData.js`.
2. Localiza el último objeto dentro de `export const castingsData = [ ... ];`.
3. Agrega una **coma** después del `}` del último objeto si aún no tiene una.
4. Antes del `];` final, pega este objeto:

```js
{
  id: 'pelicula-la-casa',
  titulo: 'Película La Casa',
  productora: 'La Casa del Actor',
  tipo: 'Película',
  remuneracion: 'Remunerado',
  region: 'Lima',
  imagen: '/images/pelicula-la-casa.jpg',
  descripcion: 'Se buscan actores y actrices para una producción audiovisual.',
  requisitos: [
    'Actores y actrices mayores de 18 años',
    'Disponibilidad para grabaciones',
    'Enviar fotos actuales y videobook'
  ],
  fechas: 'Diciembre 2026',
  cierre: '30/11/2026',
  postulacionUrl: ''
}
```

5. Asegúrate de que `public/images/pelicula-la-casa.jpg` exista realmente.
6. Guarda (`Ctrl+S`) y abre tanto Inicio como `/castings`.

**Resultado:** el nuevo casting aparece en las dos vistas. Las etiquetas `Película` y `Lima` se suman automáticamente a los filtros correspondientes. Puedes agregar 5, 10 o 100 objetos siguiendo el mismo patrón; actualmente es un listado local, no conectado a un panel administrativo.

## 5. Eliminar o reordenar un casting

En `src/data/castingsData.js`, elimina el objeto completo desde su `{` hasta el `}` y quita la coma sobrante si la hubiera. Para cambiar el orden, mueve su objeto completo más arriba o más abajo en el array. La numeración de las tarjetas se ajusta automáticamente.

## 6. Agregar una nueva forma de pago al filtro

Abre `src/pages/CastingsPage.jsx`, busca:

```js
const PAGOS = ['Todos', 'Remunerado', 'Por definir'];
```

Y puedes reemplazarla por:

```js
const PAGOS = ['Todos', 'Remunerado', 'No remunerado', 'Intercambio', 'Por definir'];
```

En `castingsData.js` escribe **exactamente igual** la categoría elegida, por ejemplo `remuneracion: 'No remunerado'`. El filtro funciona comparando textos exactos (acentos y espacios incluidos).

En la página principal, los filtros de tipo y región ya son automáticos en esta versión. El filtro de pago solo está en la página `/castings`.

## 7. Poner un enlace de postulación

Edita la propiedad:

```js
postulacionUrl: 'https://forms.gle/URL_REAL_DE_TU_FORMULARIO'
```

Si la dejas vacía (`''`), el botón de postulación permanece deshabilitado. Puedes usar una URL real de un formulario, una página de registro o un enlace de WhatsApp del proyecto, verificando la dirección y los datos que solicitas. **Agregar la URL no crea un formulario de registro interno ni almacena postulaciones en una base de datos.**

Mientras el sitio usa castings ficticios, verás etiquetas como «EJEMPLO», «CONVOCATORIA DE MUESTRA» y advertencias. Antes de pasar a información real, comprueba que las convocatorias existan y entonces cambia, en `CastingsPage.jsx`, las etiquetas de muestra: busca `cd-demo-tag`, `cd-dialog-kicker`, `cd-dialog-alert`, `cd-disclaimer`, `casting de ejemplo` y `castings de ejemplo`. También ajusta las advertencias de muestra de `App.jsx` y `FAQS`. No elimines advertencias mientras el contenido continúe siendo ficticio.

## 8. Cambiar el logo / identidad de La Casa del Actor

1. Copia `logo-casa-actor.png` dentro de `public/images/`.
2. Abre `src/App.jsx` y busca `function Brand({ inverted = false })`.
3. Dentro del `<a className={...}>` reemplaza el contenido formado por `brand-symbol` y `brand-words` por:

```jsx
<img
  src={inverted ? '/images/logo-casa-actor-blanco.png' : '/images/logo-casa-actor.png'}
  alt="La Casa del Actor"
  className="brand-logo"
/>
```

4. Incluye también un archivo `logo-casa-actor-blanco.png` para el pie, que tiene un fondo distinto.
5. Añade a `src/styles.css`:

```css
.brand-logo {
  display: block;
  width: 200px;
  max-height: 75px;
  object-fit: contain;
}
```

**Consejo:** el logo se usa tanto arriba como en el pie, porque `Brand` es un componente compartido. Si quieres mantener el nombre escrito junto al logo, no borres `brand-words`, sustituye solo el contenido de `brand-symbol`.

## 9. Cambiar colores, letra y ancho general

Abre `src/styles.css`, arriba del todo:

```css
:root {
  --lime: #D9DF3B;
  --emerald: #00A878;
  --white: #FFFFFF;
  --deep-teal: #008F70;
  --ink: #14221c;
  --off-white: #f8f8f0;
  --font-display: 'Space Grotesk', 'Arial Black', sans-serif;
}
```

Puedes cambiar un HEX por otro. Como la vista `/castings` también utiliza estas variables, los cambios de paleta se reflejarán en ambas páginas.

- Encabezado: `.site-header` y `.nav-shell`.
- Alto del menú: `.nav-shell { height: 108px; }`.
- Ancho máximo del contenido: `.container { width: min(100% - 84px, 1380px); }`.
- Alto y fondo de la portada Inicio: `.hero` y `.hero-grid`.
- Tamaño del titular principal: `.hero h1`.
- Fondo de la portada Castings: `.cd-hero` en `src/pages/CastingsPage.css`.
- Tamaño del titular Castings: `.cd-hero h1`.
- Número de columnas del catálogo: `.cd-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }`.

**Responsive:** los tamaños para móviles aparecen en los bloques `@media` cerca del final de los CSS. Si cambias una medida de escritorio, revisa también su versión móvil.

## 10. Cambiar fotos de la portada, talentos y productoras

Abre `src/App.jsx` y localiza las constantes:

```js
const PHOTO_HERO = '/images/portada-actor.jpg';
const PHOTO_STAGE = '/images/productoras.jpg';
const PHOTO_ACTOR = '/images/actor.jpg';
const PHOTO_ACTRESS = '/images/actriz.jpg';
const PHOTO_PORTRAIT = '/images/retrato.jpg';
```

**Este bloque es un EJEMPLO de reemplazo**, no necesitas conservar las URL de banco fotográfico. Agrega cada archivo en `public/images/`. `PHOTO_HERO` es la imagen grande del Inicio, `PHOTO_STAGE` es Productoras y `PHOTO_ACTOR`/`PHOTO_ACTRESS` son las fotos de Talentos. `PHOTO_PORTRAIT` está definido, pero no se usa en los componentes actuales: modificarlo por sí solo no cambia nada visible.

## 11. Cambiar textos de Inicio y Castings

En `src/App.jsx`:
- `function Hero()` → frase principal, bienvenida, descripción y botones de portada.
- `function Universe()` → cuatro grandes accesos de la página principal.
- `function Talents()` → textos, imágenes y botón de Talentos.
- `function Producers()` → textos y beneficios para productoras.
- `function CTA()` → anuncio final de contacto.
- `function Footer()` → el pie, créditos y enlaces.

En `src/pages/CastingsPage.jsx`:
- `function CastingsPage()` → busca `castings disponibles`, `Explora proyectos...`, `encuentra tu`, `NUESTRA COMUNIDAD` y `¿ESTÁS PREPARANDO UNA PRODUCCIÓN?` para cambiar cada mensaje.
- `function CastingCard()` → cambia la estructura de una tarjeta y el botón «ver detalles».
- `function DetailsModal()` → cambia la ventana que se abre al pulsar el botón.

**No borres etiquetas JSX** como `<h1>`, `<p>`, `<section>` o `</section>` cuando solo quieras editar textos.

## 12. Editar, agregar o eliminar elementos del menú

En `src/App.jsx`, busca `export function Header()` y dentro `const nav = [`:

```js
const nav = [
  { title: 'inicio', href: '/' },
  { title: 'castings', href: '/castings' },
  { title: 'talentos', href: '/talentos' },
  { title: 'productoras', href: '/#productoras' },
  { title: 'blog', href: '/#blog' },
  { title: 'planes', href: '/#planes' },
];
```

Para agregar un enlace externo puedes insertar:

```js
{ title: 'Instagram', href: 'https://www.instagram.com/TU_USUARIO/' },
```

Para quitar uno, borra toda esa línea. `href="/talentos"` abre el directorio de talentos; `href="/castings"` abre la cartelera. Un enlace nuevo no crea automáticamente la nueva página; consulta el punto 17.

Los botones `participa` usan `LINKS.registro` en la parte superior de `App.jsx`. Hoy apuntan a `/#contacto` (no hay formulario). Cámbialos a una URL real solo cuando tengas un destino operativo.

## 13. Agregar un artículo del blog

En `src/App.jsx` busca `const ARTICLES = [`. Cada objeto tiene `category`, `number`, `title`, `text`, `icon`. Para agregar uno copia el esquema antes del `];`:

```js
{ 
  category: 'TEATRO / ENTRENAMIENTO',
  number: '04',
  title: 'Cómo preparar un monólogo',
  text: 'Ejercicios para tu próxima audición.',
  icon: Theater
},
```

El icono `Theater` ya está importado desde `lucide-react` en `App.jsx`. Para otros iconos deberás añadirlos al `import` superior. **Los artículos son tarjetas de presentación**: el proyecto no incluye páginas con contenido completo; los enlaces actuales conducen a la propia sección Blog. Para artículos completos tendrás que crear nuevas páginas o conectar un gestor de contenidos.

## 14. Agregar o cambiar planes y beneficios

Busca en `src/App.jsx` la función `function Plans()` y después `const plans = [`:

```js
{
  tag: 'PARA ESCUELAS',
  name: 'escuela de actuación',
  price: 'Por definir',
  unit: 'plan de muestra',
  featured: false,
  features: [
    'Página de escuela',
    'Difusión de talleres',
    'Conexión con alumnos'
  ]
}
```

Inserta ese objeto dentro del array, con la coma correcta. `featured: true` resalta el plan. Si modificas los precios visuales, eso **no crea** un sistema de pagos ni una compra real. Para cuatro columnas modifica `.plans-grid` en `src/styles.css` y revisa también los bloques `@media`.

## 15. Agregar una pregunta frecuente

Busca `const FAQS = [` en `src/App.jsx` y agrega un objeto:

```js
{
  question: '¿Cómo participo en un casting?',
  answer: 'Abre la ficha y utiliza el enlace de postulación cuando esté habilitado.'
},
```

La lista se renderiza sola; no tienes que editar `function Faq()` para sumar preguntas.

## 16. Personalizar pie de página y datos de contacto

Busca `export function Footer()` en `src/App.jsx`. Cambia allí la descripción de la plataforma, columnas de enlaces y frase de derechos de autor. El año utiliza `new Date().getFullYear()` y cambia automáticamente.

Para agregar un correo que abre la aplicación de email:

```jsx
<a href="mailto:contacto@tudominio.com">contacto@tudominio.com</a>
```

Para poner teléfono:

```jsx
<a href="tel:+51999999999">Llámanos</a>
```

Sustituye ambos ejemplos por tus datos verdaderos; no se ha configurado ningún buzón de correo en la plataforma.

## 17. Crear una página NUEVA, por ejemplo `/academia`

1. Crea `src/pages/AcademiaPage.jsx`:

```jsx
import { Header, Footer } from '../App.jsx';
export default function AcademiaPage() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '80px 0' }}>
        <h1>Academia de actuación</h1>
        <p>Próximos talleres y cursos.</p>
      </main>
      <Footer />
    </>
  );
}
```

2. En `src/main.jsx`, agrega `import AcademiaPage from './pages/AcademiaPage.jsx';`.
3. Modifica la parte que decide la página a:

```jsx
// Conserva el componente Routes() que ya tienes en main.jsx.
// Agrega este caso dentro de Routes() ANTES del return <App />:
if (currentPath === '/academia') return <AcademiaPage />;
```

4. En `src/App.jsx` agrega al array `nav` el enlace `{ title: 'academia', href: '/academia' }`.
5. Visita `http://localhost:5173/academia`.

Para muchas páginas conviene pasar a **React Router**; el enrutamiento actual es deliberadamente sencillo y ya incluye fichas dinámicas para cada talento en `/talentos/:slug`, pero no incluye páginas independientes para cada artículo del blog.

## 18. Cambiar título de la pestaña y configuración básica

Abre `index.html` y modifica:

```html
<title>La Casa del Actor | Castings y artistas</title>
<meta name="description" content="Conoce castings, artistas y oportunidades en La Casa del Actor." />
```

La página `/castings` cambia el título automáticamente desde `CastingsPage.jsx` en su `useEffect`. Busca:

```js
document.title = 'Castings disponibles | La Casa del Actor';
```

## 19. Generar archivos finales y publicarlos

```bash
npm run build
```

Se genera `dist/` con la versión optimizada. Para previsualizarla ejecuta `npm run preview` y abre la URL mostrada. El proyecto trae reglas para Vercel (`vercel.json`) y Netlify (`public/_redirects`) que permiten recargar la ruta `/castings`. Otros servidores deben redirigir las rutas de la aplicación al `index.html`.

## 20. Errores frecuentes y soluciones

| Problema | Qué revisar |
| --- | --- |
| `npm` no se reconoce | Instala Node.js y abre de nuevo VS Code |
| La foto no carga | Nombre exacto, ruta `/images/foto.jpg`, archivo dentro de `public/images/` |
| Se queda la pantalla en blanco | Revisa terminal y consola (F12). A menudo hay comas, llaves o etiquetas mal cerradas |
| Un casting no aparece al buscar | Revisa palabras en filtros activos; pulsa «limpiar filtros» |
| Nueva forma de pago no figura en el filtro | Añádela en `const PAGOS` de `CastingsPage.jsx` |
| El cambio no se ve | Pulsa Ctrl+S, recarga el navegador, revisa que editaste el proyecto abierto |
| El logo se ve mal en el pie | Usa el archivo alternativo blanco con el parámetro `inverted` |
| En celular los tamaños se ven distintos | Revisa bloques `@media` al final de los CSS |
| El formulario no recibe datos | Todavía no existe backend; `postulacionUrl` solo abre un enlace externo |
| El enlace `/academia` muestra Inicio | Asegúrate de registrar la ruta en `src/main.jsx` |

## 21. Resumen de la forma más sencilla de trabajar

1. Cambia **imágenes de Inicio** y **textos** desde `App.jsx`.
2. Cambia **logo y menú** desde `App.jsx`.
3. Cambia **todos los castings** desde `src/data/castingsData.js` (aparecen en Inicio y en `/castings`).
4. Cambia **filtros y ventana de detalles** desde `CastingsPage.jsx`.
5. Cambia **colores y tamaños** desde `styles.css` y `CastingsPage.css`.
6. Edita **todos los talentos** desde `src/data/talentosData.js` siguiendo `GUIA_TALENTOS.md`.
7. Guarda con **Ctrl+S**, revisa en el navegador y finalmente ejecuta `npm run build`.

---

**Nota:** es una maqueta React editable. No tiene autenticación, panel de administración, base de datos, subida dinámica de imágenes ni recepción interna de postulaciones. Para cambiar contenido sin abrir VS Code en el futuro necesitarás incorporar un panel administrativo y una base de datos.
