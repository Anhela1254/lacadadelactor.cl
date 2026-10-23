# LA CASA DEL ACTOR — MANUAL DE BLOG, SERVICIOS, PLANES, REGISTRO Y COMPROBANTES

## 1. Ejecutar el proyecto en Visual Studio Code

Instala **Node.js 20 o 22**. Abre la carpeta `la-casa-del-actor-react` y en Terminal ejecuta:

```bash
npm install
npm run dev
```

Se inician DOS procesos juntos:

- Página React + Vite: `http://localhost:5173`
- API privada para registro y solicitudes: `http://localhost:3002`

**No uses solo `npx vite`: el formulario de registro necesita el servidor API.**

Abre en el navegador:

- `http://localhost:5173/` — Inicio.
- `http://localhost:5173/castings` — Casting (versión anterior conservada).
- `http://localhost:5173/talentos` — Listado de talentos.
- `http://localhost:5173/talentos/valentina-rios` — Ejemplo de perfil.
- `http://localhost:5173/blog` — Blog con búsqueda, categorías, nivel y paginación.
- `http://localhost:5173/blog/preparar-tu-primer-casting` — Ejemplo de artículo completo.
- `http://localhost:5173/servicios` — Servicios y formulario.
- `http://localhost:5173/precios` — Tarjetas de planes.
- `http://localhost:5173/registro?role=actor&plan=activacion` — Registro desde un plan.
- `http://localhost:5173/ingresar` — Ingreso a la cuenta.

## 2. Cambiar o agregar artículos de BLOG

Abre `src/data/blogData.js`. Cada artículo está dentro del arreglo `blogData`. Para crear otro:

```javascript
{
  slug: 'mi-nuevo-articulo',
  titulo: 'Cómo empezar en teatro',
  categoria: 'Actuación', // Actuación, Casting, Industria, Técnica, Preparación
  nivel: 'Principiante',  // Principiante, Intermedio, Avanzado
  formato: 'Artículo',
  lectura: 5,             // Minutos
  imagen: '/images/mi-portada.jpg',
  fecha: '2026-11-15',
  resumen: 'Resumen breve de tu artículo.',
  contenido: [
    { subtitulo: 'Primer consejo', texto: 'Texto del primer apartado.' },
    { subtitulo: 'Segundo consejo', texto: 'Texto del segundo apartado.' }
  ]
},
```

Pon tu foto en `public/images/mi-portada.jpg`. El nuevo artículo aparecerá en el blog y tendrá una URL `/blog/mi-nuevo-articulo`. El inicio muestra automáticamente los tres primeros artículos del arreglo. Cambia el orden del arreglo para destacar otros.

Si creas una categoría o nivel nuevo, agrega su nombre a `BLOG_CATEGORIES` o `BLOG_LEVELS` en el MISMO archivo.

Para modificar el diseño de los bloques, botones, tamaños o colores: `src/pages/NuevasSecciones.css` (prefijo `.lc-`).

## 3. Agregar servicios

Abre `src/data/serviciosData.js`. Ahí se encuentran las tarjetas, descripciones, fotografías y beneficios. Cada servicio contiene:

```javascript
{
  id: 'fotografia',
  etiqueta: '04 / FOTOGRAFÍA',
  nombre: 'Sesión fotográfica',
  descripcion: 'Sesiones artísticas para tu perfil.',
  precio: 'Cotización personalizada',
  icono: 'camera',
  foto: '/images/sesion.jpg',
  beneficios: ['Retratos profesionales', 'Entrega digital']
}
```

**Importante:** Si agregas un servicio nuevo, también agrégalo a la lista permitida en `server/index.js`, dentro de la ruta POST `/api/servicios`:

```javascript
['reel', 'book', 'selftape', 'fotografia']
```

Luego reinicia el servidor. El formulario almacena las solicitudes en `~/.la-casa-del-actor-data/requests.json`. Este archivo **no se publica** ni se incluye en el ZIP.

Ver solicitudes recibidas:

```bash
npm run admin -- solicitudes
```

**El formulario no envía WhatsApp ni correos automáticamente.** Solo guarda solicitudes para que luego las atiendas. Puedes configurar un servicio de email o WhatsApp Business API posteriormente.

## 4. Cambiar planes, precios y beneficios

Abre `src/data/planesData.js`.

Cada plan tiene estos campos:

```javascript
{
  id: 'activacion',             // NO cambiar si ya tienes usuarios con ese plan
  nombre: 'Activación de perfil',
  etiqueta: 'PAGO ÚNICO',
  publico: 'Para artistas nuevos',
  monto: '$2.990',               // PRECIO DE EJEMPLO, CAMBIAR
  moneda: 'CLP',                 // Puedes cambiar a PEN
  periodo: 'pago único',
  destaque: false,
  rol: 'actor',                  // actor o productor
  beneficios: ['Un perfil profesional', 'Acceso a herramientas'],
  cta: 'Activar perfil'
}
```

Los botones de cada plan te llevan automáticamente a:

- Activación: `/registro?role=actor&plan=activacion`
- Actor destacado: `/registro?role=actor&plan=destacado`
- Productora: `/registro?role=productor&plan=productora`

El formulario recupera la selección del enlace y permite cambiar a otro plan del mismo rol.

**Importante:** Los precios del proyecto son referenciales, heredados de la estructura de comparación, y **NO** deben entenderse como precios de La Casa del Actor. Define tus propios planes, términos y precios reales antes de publicar; el programa no procesa cobros ni transacciones bancarias.

Si creas un plan con ID nuevo, debes añadirlo a la lista de planes autorizados del servidor: `const roles = {...}` en `server/index.js`.

## 5. Crear cuenta y subir captura de pago

Abre la página `/registro?role=actor` y completa:

1. Rol: actor/actriz o productor/convocante.
2. Plan elegido.
3. Nombre, correo, teléfono opcional.
4. Contraseña de mínimo 10 caracteres y confirmación.
5. **Captura opcional** JPG, PNG o WebP (hasta 5 MB) para la demostración.
6. Aceptar las condiciones y seleccionar `crear cuenta`.

El servidor guarda la cuenta y la contraseña con un hash `scrypt` (no en texto plano) en una carpeta `~/.la-casa-del-actor-data/`. La imagen del comprobante se guarda en `~/.la-casa-del-actor-data/comprobantes/` y NO se sirve en URLs públicas.

Los estados son:

- `pendiente_comprobante`: se creó la cuenta sin captura.
- `revision`: se creó la cuenta con captura; debe verificarla un administrador.
- `aprobado`: un administrador la revisó y la aprobó manualmente.

La captura **no prueba que el pago se haya realizado**. El administrador debe contrastar manualmente la operación con sus registros bancarios y las condiciones comerciales de La Casa del Actor.

### Iniciar sesión

Entra a `/ingresar`; escribe correo y contraseña. Se crea una cookie de sesión `HttpOnly` y `SameSite=Lax`. En `/mi-cuenta` podrás ver el estado de tu plan y tu número de folio. **Este prototipo no incluye edición de perfil, restablecimiento de contraseña o correo de verificación**.

### Revisar usuarios y comprobantes (solo administrador, en su computadora)

Listar cuentas:

```bash
npm run admin -- listar
```

En la terminal aparecerán los folios, correos, estados y las rutas privadas de los comprobantes. Abre la imagen desde el explorador de archivos o Visual Studio Code para revisarla. **No compartas ni publiques esos archivos.**

Después de verificar de forma independiente el pago, aprobar un ID:

```bash
npm run admin -- aprobar LCA-XXXXXXXXXXXX
```

No puedes aprobar una cuenta sin comprobante desde esta utilidad. El usuario podrá volver a entrar y ver el estado actualizado. Los nuevos registros **no se aprueban automáticamente**. En Windows, `~` representa tu carpeta de usuario (por ejemplo, `C:\Users\TU_USUARIO`). Puedes fijar otra ruta privada con `LCA_DATA_DIR`.

### ATENCIÓN antes de publicar

- **No aceptes pagos reales hasta configurar tu propio canal de cobro oficial y publicar términos, privacidad, política de reembolsos y responsable del tratamiento de datos.**
- Esta versión crea usuarios **solo en el servidor local**. Para usarla desde internet debes desplegar también el backend; un hosting estático o solo Vercel SPA no almacena cuentas ni comprobantes.
- No hay integración bancaria, pasarela de pago, antifraude, facturación, emails de confirmación, verificación de identidad o recuperación de contraseñas.
- Para un sitio comercial usa HTTPS, base de datos transaccional (ej. PostgreSQL), almacenamiento privado con controles de acceso, protección CSRF y políticas de privacidad y retención de datos.
- No publiques la carpeta `~/.la-casa-del-actor-data` ni el archivo `.env`.
- Realiza respaldo seguro de los datos y define un mecanismo real de eliminación de usuarios y recibos.

## 6. Instagram

El enlace configurado en el pie y menú es:

`https://www.instagram.com/lacasadelactor_/`

Para cambiarlo busca `lacasadelactor_` en `src/App.jsx`, `src/pages/RegistroPage.jsx` y `src/pages/ServiciosPage.jsx`.

## 7. Tipografía, colores e imágenes

`src/styles.css` mantiene la fuente del proyecto (`DM Sans` y `Space Grotesk`). Tus colores están en `:root`:

```css
--lime: #D9DF3B;
--emerald: #00A878;
--white: #FFFFFF;
--deep-teal: #008F70;
```

El diseño de las nuevas páginas está en `src/pages/NuevasSecciones.css`. Todas las nuevas reglas comienzan por `lc-`, para evitar modificar el diseño de los castings y talentos anteriores.

Carpeta de imágenes: `public/images/` (puedes sustituir los SVG de demostración por JPG/PNG/WebP propios manteniendo las rutas actualizadas).

## 8. Compilar para publicación

```bash
npm run build
npm run start
```

`npm run start` usa el servidor Express para servir **tanto el frontend compilado como la API** en el puerto 3002 cuando `NODE_ENV=production` está activo. Para uso real debes tener HTTPS a través de un proxy y **almacenamiento persistente** en producción; no uses el servidor de ejemplo como sustituto de una arquitectura comercial.

## 9. Estructura de archivos nuevos

```text
src/data/blogData.js
src/data/serviciosData.js
src/data/planesData.js
src/pages/BlogPage.jsx
src/pages/BlogArticlePage.jsx
src/pages/ServiciosPage.jsx
src/pages/PlanesPage.jsx
src/pages/RegistroPage.jsx
src/pages/CuentaPage.jsx
src/pages/NuevasSecciones.css
server/index.js
server/store.js
server/admin.js
GUIA_BLOG_SERVICIOS_PLANES_REGISTRO.md
```

El resto del sitio (`Castings`, `Talentos`, perfiles y la portada) continúa funcionando y está dentro del mismo proyecto.
