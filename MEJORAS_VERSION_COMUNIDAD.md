# LA CASA DEL ACTOR — AMPLIACIÓN BASADA EN DOCUMENTO DE 28 PÁGINAS

Se conserva el proyecto original React/Vite/Express y sus imágenes, blog, castings, talentos, acceso, cuentas y paneles. Esta ampliación desarrolla la experiencia de comunidad/fundación propuesta en el documento "ESTRUCTURA WEB – LA CASA DEL ACTOR".

## Navegación nueva

| URL | Contenido |
|---|---|
| `/` | Inicio editorial con bloque de novedades administrables, presentación de la comunidad, foro, formación, eventos y donaciones. |
| `/nosotros` | Historia, propósito, misión, visión, 7 valores, actividades y desarrollo futuro. |
| `/comunidad` | Galería, agenda que administra el equipo, solicitud de inscripción para actores miembros y solicitud de salas. |
| `/proyectos` | Foro colaborativo, filtros, publicación moderada y solicitudes para sumarse. |
| `/academia` | Catálogo de líneas formativas con formularios de interés sin pagar. |
| `/fundacion` | Impacto de las donaciones y solicitud de medios oficiales de apoyo. |
| `/servicios` | Nueve categorías de servicios con solicitud de cotización. |
| `/base-de-datos` | Página informativa de roles, acceso a directorio y tarifas referenciales del documento. |
| `/administracion` | Nueva sección **Comunidad y fundación** para revisar proyectos, actividades y solicitudes. |
| `/panel-actor`, `/panel-productor` | Accesos al foro y resumen de sus solicitudes. |

## Instalación local, Windows

1. Abre VS Code en la carpeta `la-casa-del-actor-react`.
2. Ejecuta `npm install`.
3. Ejecuta `npm run dev`.
4. Accede a **http://localhost:5173**. La API queda en **http://127.0.0.1:3002**.
5. Las cuentas de demostración locales existentes están detalladas en `GUIA_CUENTAS_DEMO.md`.
6. Entra con el administrador local y abre **Comunidad y fundación** para crear actividades y aprobar propuestas.

## Acerca de Vercel y las cuentas demo

**IMPORTANTE:** desplegar el frontend estático en Vercel NO despliega automáticamente el servidor Express, porque `vercel.json` solo configura la navegación del frontend. Por lo tanto, en un Vercel solo estático verás las páginas y galerías, pero los inicios de sesión, la agenda dinámica, el foro y los formularios que escriben datos necesitan un **backend desplegado** y una persistencia real. Las claves demo `*@demo.local` están intencionalmente deshabilitadas en producción. No se debe activarlas públicamente. La API de desarrollo utiliza archivos JSON locales y una cola de escrituras en un único proceso; antes de operar en producción hay que instalar PostgreSQL/Supabase y almacenamiento permanente para datos sensibles y archivos.

## Advertencias de implementación

- Los valores de planes son demostrativos y no autorizan cobros automáticos.
- Los cursos no se compran desde esta versión; solo se envía una solicitud de información.
- Las donaciones no se procesan aquí; el formulario solicita medios oficiales para apoyar.
- Una solicitud de sala, inscripción o participación NO equivale a confirmación.
- Los proyectos enviados requieren **revisión manual** del administrador antes de aparecer públicamente.
- Las convocatorias iniciales del repositorio siguen siendo ejemplos: no confundirlas con oportunidades verificadas.
- Los mensajes de contactos y datos personales se almacenan solo en archivos privados de backend y se muestran a la cuenta administradora.
- Antes de hacer pública la web, confirmar el consentimiento para publicar fotografías, la exactitud de marcas y alianzas, los textos legales y política de privacidad, y los precios / medios oficiales de pago.
- No se agregaron nombres de colaboradores inventados ni eventos con fechas ficticias: la agenda empieza vacía y el administrador podrá llenarla.

## Validación

- Ejecuta `npm test` para correr las pruebas incluidas.
- Ejecuta `npm run build` para generar `dist/` cuando hayas instalado las dependencias en tu equipo.
- Antes de publicar, valida en móvil el menú desplegable y en escritorio todas las rutas.

## Estructura

Los nuevos archivos están en `src/pages/InstitucionalPages.jsx`, `src/pages/ProyectosPage.jsx`, `src/pages/AcademiaPage.jsx`, `src/pages/AdminComunidad.jsx`, `src/pages/Institucional.css`, `server/community.js` y `tests/community.test.js`. Las rutas, el backend, las secciones de inicio, el listado de servicios y los paneles existentes fueron extendidos sin borrar las secciones anteriores.
