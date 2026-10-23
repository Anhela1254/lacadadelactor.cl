# LA CASA DEL ACTOR — React + Vite + Node / Express

Plataforma de castings, talentos, blog, servicios y planes que incorpora registro e ingreso por **actor / productor / administrador** y un panel administrativo con operaciones completas de creación, edición, borrado y publicación.

## Inicio rápido

```bash
npm install
npm run dev
```

Web: http://localhost:5173 · API: http://localhost:3002/api/health

**Las 3 cuentas de prueba (actor, productor y administrador) se crean automáticamente al ejecutar `npm run dev` y funcionan únicamente en desarrollo local.** Consulta `GUIA_CUENTAS_DEMO.md`. Para crear un administrador real: abre [GUIA_ADMINISTRACION.md](GUIA_ADMINISTRACION.md), sección 2.

### Secciones

- `/ingresar` — entrada por correo o usuario y contraseña; dirección automática según rol.
- `/registro` — registro actor o productor, foto de comprobante opcional.
- `/administracion` — editar castings, talentos y blog, moderar propuestas y revisar comprobantes.
- `/panel-actor`, `/panel-productor` — áreas separadas por rol.
- `/castings`, `/talentos`, `/blog` — contenido dinámico obtenido del servidor.
- `/precios`, `/servicios` — secciones informativas existentes.

### Seguridad y límites

- Hay 3 cuentas ficticias, incluidas una administradora de demostración, solamente en `npm run dev` y vinculadas a localhost. En producción no se crean y se bloquea cualquier inicio de sesión de cuentas marcadas `demo`. Los administradores reales se crean por CLI.
- La autorización de administración, carga de fotos y aprobación de pagos se verifica en el backend.
- Las cuentas y comprobantes no quedan dentro del código público. La carga de imágenes controla formato y tamaño.
- Los primeros castings y talentos son **ficticios**. Las tarifas siguen siendo ilustrativas y no hay pago automático ni recuperación de contraseña en esta versión.
- Este servidor guarda datos JSON en un solo proceso. Para uso comercial serio y alto tráfico, migrar a PostgreSQL, storage dedicado, HTTPS, backups y políticas de privacidad.

Lee **GUIA_ADMINISTRACION.md** para instrucciones detalladas de VS Code, creación del administrador, publicación de castings, talento, noticias, gestión de pagos, imágenes, rutas y backups.
