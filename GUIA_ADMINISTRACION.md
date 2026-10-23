# LA CASA DEL ACTOR · GUÍA PARA INGRESAR, REGISTRAR Y ADMINISTRAR

## 1. Instalar y arrancar en Visual Studio Code (Windows)

1. Instala **Node.js LTS** desde https://nodejs.org si no lo tienes. En VS Code abre `Archivo > Abrir carpeta` y selecciona `la-casa-del-actor-react`.
2. Abre `Terminal > Nuevo terminal` y ejecuta:

   ```powershell
   npm install
   npm run dev
   ```

3. Abre la dirección mostrada, normalmente `http://localhost:5173`.
4. Deben abrir estas rutas: `/`, `/castings`, `/talentos`, `/blog`, `/servicios`, `/precios`, `/registro`, `/ingresar`, `/administracion`, `/panel-actor`, `/panel-productor`.

**Importante:** `npm run dev` inicia DOS servicios: React/Vite (puerto 5173) y Node/Express (puerto 3002). Si cierras la terminal, el servidor local se detiene. Necesitas tener ambos funcionando para crear usuarios y administrar contenido.

## 2. Crear tu administrador real (además de la cuenta de PRUEBA)

Abre UNA NUEVA terminal PowerShell en la carpeta del proyecto y ejecuta estos comandos, reemplazando correo y contraseña por los tuyos:

```powershell
$env:LCA_ADMIN_EMAIL="admin@tudominio.com"
$env:LCA_ADMIN_PASSWORD="UnaClaveLargaUnicaDeMasDe12Caracteres!"
$env:LCA_ADMIN_NOMBRE="Administrador Principal"
npm run admin -- crear-admin
```

La cuenta `admin@demo.local` solo sirve como ejemplo en desarrollo y no debe usarse con clientes reales. Si el comando muestra "Administrador creado", entra a `http://localhost:5173/ingresar`, escribe el correo y la contraseña elegidos y pulsa **Ingresar**. La aplicación te dirigirá automáticamente a `http://localhost:5173/administracion`.

Después de crear el administrador, puedes limpiar las variables de esta sesión PowerShell:

```powershell
Remove-Item Env:LCA_ADMIN_EMAIL
Remove-Item Env:LCA_ADMIN_PASSWORD
Remove-Item Env:LCA_ADMIN_NOMBRE
```

**No pegues contraseñas reales en videos, capturas, repositorios Git, chats ni tutoriales compartidos.** Los permisos de administrador se conceden solo con este comando en la máquina del servidor. El registro público NO permite elegir el rol administrador.

## 3. Botones superiores y roles

- `Ingresar` → `/ingresar`: correo o nombre de usuario + contraseña. Se reconoce el rol en el servidor.
- `Registrarse` → `/registro`: crea un usuario como actor o productor. También es posible adjuntar un comprobante de pago; se revisa manualmente.
- Actor registrado → `/panel-actor`: ve sus datos, estado y enlaces a castings, talentos y blog.
- Productor registrado → `/panel-productor`: ve sus datos y envía propuestas de casting pendientes de moderación.
- Administrador (solo por terminal) → `/administracion`: CRUD de castings, artistas y noticias, revisión de comprobantes y propuestas.

## 4. Publicar un casting desde el administrador

1. Ingresa con tu correo de administrador.
2. Ve a **Castings → Agregar casting**.
3. Llena **Título, Productora, Tipo, Remuneración, Región, Descripción, Requisitos, Fechas, Cierre** y enlace externo de postulación (si existe).
4. Selecciona una imagen JPG, PNG o WebP (máximo 5 MB); también puedes escribir una ruta como `/images/mi-afiche.jpg`.
5. Deja marcada **Publicar ahora** para que se vea en la portada y `/castings`; desmárcala para guardar un borrador.
6. Presiona **Guardar cambios**.
7. Para cambiarlo, pulsa **Editar**. Para quitarlo, **Eliminar**. La eliminación es irreversible.

### Productor

Un productor puede ingresar a su panel y mandar un casting como **propuesta**. El aviso **no** se hace público inmediatamente. En el administrador abre **Propuestas**, revisa la información y pulsa **Aprobar y publicar** o **Rechazar**.

## 5. Agregar un talento

1. Ve a **Talentos → Agregar talento**.
2. Escribe el nombre, especialidad, categoría, ciudad, país y biografía.
3. Sube la foto de portada, añade galería colocando **una URL o ruta por línea**.
4. Agrega disciplinas, ficha artística (`Estatura: 1,72 m`) y trayectoria (`2026 | Película | Actor principal | Cine`).
5. Opcionalmente: links de reel y presentación (YouTube o Vimeo), CV y redes.
6. Guarda. Aparecerá automáticamente en `/talentos` y tendrá su perfil en `/talentos/nombre-apellido`.

## 6. Agregar una noticia al Blog

1. Ve a **Noticias del blog → Agregar noticia**.
2. Escribe título, resumen, categoría, nivel, fecha y minutos de lectura.
3. Sube la foto de portada.
4. En Contenido escribe **una sección por línea** utilizando el formato `Subtítulo | Texto del párrafo`.
5. Marca **Destacar noticia** si deseas destacarla y **Publicar ahora** para hacerla pública.
6. Guarda. Aparecerá en `/blog` y en `/blog/titulo-de-la-noticia`.

## 7. Usuarios y pagos

En **Usuarios y pagos** se muestran nombre, rol, plan, estado y comprobante (si existe). El enlace **Ver captura** requiere sesión de administrador. Verifica fuera del sistema que el pago llegó correctamente a tu cuenta antes de pulsar **Aprobar**. Puedes **Rechazar** una solicitud. La captura por sí misma **NO valida una transferencia**.

Para listar usuarios desde la terminal:

```powershell
npm run admin -- listar
```

## 8. Dónde cambiar fotografías, colores y contenidos

- Imágenes originales: `public/images/` (puedes reemplazarlas).
- Imágenes subidas desde el panel: carpeta privada de datos `~/.la-casa-del-actor-data/uploads/`, servidas en `/uploads/...`.
- Plantilla original de convocatorias: `src/data/castingsData.js`.
- Plantilla original de artistas: `src/data/talentosData.js`.
- Plantilla original del blog: `src/data/blogData.js`.
- **Una vez inicializado el servidor, los datos vigentes están en los JSON persistentes del servidor**, NO en estas plantillas. Modifica los publicados desde el panel administrador.
- Precios demostrativos: `src/data/planesData.js`.
- Diseño principal: `src/styles.css`; panel administrador: `src/pages/AdminPage.css`.
- Encabezado y enlaces: `src/App.jsx`, función `Header()`.

Paleta: amarillo `#D9DF3B`, verde esmeralda `#00A878`, blanco `#FFFFFF`, verde azulado oscuro `#008F70`.

## 9. Dónde se guardan los datos y cómo respaldarlos

Por defecto, el servidor guarda cuentas, contenido, propuestas y comprobantes **fuera de la carpeta pública**, en una carpeta dentro del directorio personal del usuario del sistema: `~/.la-casa-del-actor-data/`.

En Windows suele encontrarse en `C:\Users\TU_USUARIO\.la-casa-del-actor-data`. Puedes cambiar la ubicación mediante la variable `LCA_DATA_DIR`, **antes de arrancar el servidor**.

**Haz copias de seguridad periódicas de esa carpeta completa**, no solo del proyecto ZIP. Incluye `accounts.json`, `castings.json`, `talentos.json`, `blog.json`, `propuestas.json`, comprobantes, imágenes y el secreto de sesión.

No subas esta carpeta privada a GitHub ni a sitios públicos.

## 10. Ejecutar compilación para publicación

```powershell
npm run build
npm start
```

`npm run build` genera `dist/`; `npm start` arranca Express en `http://localhost:3002` y sirve la web compilada. Usa una solución de hosting con **servidor Node persistente**, disco persistente y **HTTPS**. NO basta con subir únicamente `dist/` a un hosting de páginas estáticas: las funciones de registro y administración no funcionarían.

### Consideraciones para producción

Esta versión está pensada para pruebas y un despliegue sencillo de **un solo proceso**. Antes de vender planes y recibir datos reales, necesitas un dominio con HTTPS, política de privacidad y condiciones publicadas, copias de seguridad, un sistema de restablecimiento de contraseñas y preferentemente PostgreSQL/Supabase + almacenamiento dedicado para trabajar a escala. Aquí no se implementa confirmación bancaria automática, correo de verificación ni pasarela de pago. Las contraseñas se almacenan con scrypt y se limita la tasa de intentos de login. El rol y autorización se comprueban en el servidor; nunca se confían a un campo editable desde el navegador.

## 11. Instagram

https://www.instagram.com/lacasadelactor_/
