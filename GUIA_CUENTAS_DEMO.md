# LA CASA DEL ACTOR · ACCESOS YA CREADOS PARA PROBAR

## Paso 1: abre VS Code y ejecuta

```powershell
npm install
npm run dev
```

La terminal debe indicar que las cuentas demo locales están disponibles. Solo en **modo desarrollo**, el proyecto crea automáticamente una cuenta de ejemplo por rol (sin modificar registros anteriores).

## Paso 2: abre el inicio de sesión

Entra en **http://localhost:5173/ingresar**. Debajo del formulario aparecen tres botones: **Actor / Actriz**, **Productor/a**, **Administrador**. Pulsa uno y luego **Ingresar**. También puedes escribir los datos directamente:

| Rol | Correo o usuario | Contraseña de PRUEBA | Panel |
|---|---|---|---|
| Actor / Actriz | actor@demo.local / actor_demo | `ActorDemo2026!` | http://localhost:5173/panel-actor |
| Productor/a | productor@demo.local / productor_demo | `ProductorDemo2026!` | http://localhost:5173/panel-productor |
| Administrador | admin@demo.local / admin_demo | `AdminDemo2026!` | http://localhost:5173/administracion |

Usa **Cerrar sesión** antes de cambiar de perfil, o abre navegadores distintos (Chrome e incógnito). El servidor te redirige según el rol real guardado, NO según la opción elegida en el navegador.

## ¿Qué se puede hacer con cada uno?

- **Actor**: entrar a su panel, consultar su nombre, plan ficticio y oportunidades de castings.
- **Productor**: entrar a su panel, enviar propuestas de casting y seguir su estado. Solo se publican tras autorización del administrador.
- **Administrador**: crear, modificar o eliminar castings, talentos y noticias; aprobar propuestas; revisar solicitudes y comprobantes.

## ¿Y si no aparecen las cuentas?

Detén el servidor con `Ctrl+C` y, dentro de la carpeta del proyecto, ejecuta:

```powershell
npm run demo:crear
npm run dev
```

El comando es **idempotente**: agrega únicamente las cuentas de prueba que aún no existen; no cambia las contraseñas o datos de usuarios previos. Los archivos privados quedan fuera del directorio web en `~/.la-casa-del-actor-data` (en Windows, dentro de tu carpeta de usuario).

## Seguridad indispensable

1. Cuentas de ejemplo y claves públicas se usan **exclusivamente para pruebas locales**: `npm run dev` escucha solo en `127.0.0.1`. No expongas ese entorno en Internet.
2. En `NODE_ENV=production` no se generan cuentas demo y el backend rechaza sus inicios de sesión (también sus cookies de sesión). Para uso real crea un administrador propio con `npm run admin -- crear-admin` y una contraseña exclusiva.
3. Las cuentas demo están marcadas con `demo:true` y estado `demo`; **no representan pagos aprobados**.
4. Si ya habías creado cuentas reales, el sembrado de demostración **no las elimina ni reemplaza**.
5. Las contraseñas se almacenan con hash scrypt y salt; las claves públicas aquí son intencionalmente conocidas y nunca deben reutilizarse en cuentas reales.

## Logo y paleta

Conservamos `#D9DF3B`, `#00A878`, `#FFFFFF`, `#008F70` y la identidad de **La Casa del Actor** en los tres paneles.
