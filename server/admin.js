// Herramienta local: crea administradores de forma segura SIN exponer una ruta pública.
// PowerShell: $env:LCA_ADMIN_EMAIL='admin@dominio.com'; $env:LCA_ADMIN_PASSWORD='clave muy segura de 12+ caracteres'; npm run admin -- crear-admin
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { root, readData, updateData } from './store.js';
import { hashPassword } from './security.js';
const [, , command, id] = process.argv;
if(command==='crear-admin'){
 const correo=String(process.env.LCA_ADMIN_EMAIL||'').trim().toLowerCase();
 const contrasena=process.env.LCA_ADMIN_PASSWORD||'';
 const nombre=(process.env.LCA_ADMIN_NOMBRE||'Administrador La Casa del Actor').trim();
 if(!/^\S+@\S+\.\S+$/.test(correo)||contrasena.length<12||contrasena.length>128){
   console.error('Define LCA_ADMIN_EMAIL (correo válido) y LCA_ADMIN_PASSWORD (mínimo 12 caracteres) como variables de entorno.');process.exitCode=1;
 } else {
   const result=await updateData('accounts.json',async users=>{
     if(users.some(u=>u.correo===correo))return {next:users,result:'Ya existe una cuenta con ese correo. Usa otro correo o migra la cuenta de forma segura.'};
     const account={id:`LCA-ADMIN-${randomBytes(6).toString('hex').toUpperCase()}`,nombre,correo,usuario:'',rol:'administrador',plan:'administracion',estado:'aprobado',passwordHash:hashPassword(contrasena),recibo:null,creado:new Date().toISOString()};
     return {next:[...users,account],result:'Administrador creado. Ya puedes ingresar con ese correo.'};
   });console.log(result);
 }
}else if(command==='listar'){
 const users=await readData('accounts.json');if(!users.length)console.log('Sin cuentas.');for(const u of users)console.log(`${u.id} | ${u.correo} | ${u.nombre} | ${u.rol} | ${u.estado} | recibo: ${u.recibo?path.join(root,'comprobantes',u.recibo):'No'}`);
}else if(command==='aprobar'){
 if(!id){console.error('Indica el folio: npm run admin -- aprobar LCA-ID');process.exitCode=1;}
 else{const result=await updateData('accounts.json',async users=>{const u=users.find(x=>x.id===id);if(!u)return {next:users,result:'No existe'};if(!u.recibo)return {next:users,result:'No tiene comprobante'};return {next:users.map(x=>x.id===id?{...x,estado:'aprobado'}:x),result:'Aprobado'};});console.log(result);}
}else if(command==='solicitudes'){
 const rows=await readData('requests.json');for(const r of rows)console.log(`${r.id} | ${r.servicio} | ${r.nombre} | ${r.email} | ${r.mensaje}`);
}else console.log('Comandos: crear-admin | listar | aprobar FOLIO | solicitudes');
