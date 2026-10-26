/** Backend local de demostración: cuentas, recibos privados, login y solicitudes.
 * Ejecuta con npm run dev (Vite usa el proxy /api) o npm run start después de build.
 * No es un procesador de pagos ni una verificación bancaria. Usa TLS, DB y storage externo en producción.
 */
import express from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { root, initialize, readData, updateData } from './store.js';
import { hashPassword, checkPassword } from './security.js';
import { seedDemoAccounts, accountAllowedInEnvironment } from './demo-accounts.js';
import { COLLECTIONS, seedCatalog, getCatalog, normalizeEntry, entryId } from './catalog.js';
import {textField,emailValid,projectInput,activeMember,activeCreator,validateActivity,validateRoom} from './community.js';
import { serviciosData } from '../src/data/serviciosData.js';

const PORT=Number(process.env.API_PORT || 3002);
const PROD=process.env.NODE_ENV==='production';
const app=express();
app.disable('x-powered-by');
app.set('trust proxy','loopback');
app.use(express.json({limit:'512kb'}));
app.use((req,res,next)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options','DENY');
  if(['POST','PUT','PATCH','DELETE'].includes(req.method) && req.headers.origin){
    try{
      const u=new URL(req.headers.origin);
      const host=(req.headers.host||'').split(':')[0];
      if(!(u.hostname===host || (['localhost','127.0.0.1'].includes(u.hostname)&&['localhost','127.0.0.1'].includes(host)))) return res.status(403).json({error:'Origen no autorizado.'});
    }catch{return res.status(403).json({error:'Origen inválido.'});}
  }
  next();
});
const limiter=rateLimit({windowMs:15*60*1000,limit:15,standardHeaders:'draft-7',legacyHeaders:false,message:{error:'Demasiados intentos. Vuelve a probar más tarde.'}});
const registerLimiter=rateLimit({windowMs:60*60*1000,limit:8,standardHeaders:'draft-7',legacyHeaders:false,message:{error:'Límite de registros temporal. Intenta más tarde.'}});
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:5*1024*1024,files:1,fields:9,parts:10},fileFilter:(req,file,cb)=>{
  if(!['image/png','image/jpeg','image/webp'].includes(file.mimetype))return cb(new Error('FORMATO_NO_PERMITIDO'));
  cb(null,true);
}});
let serverSecret;
async function getSecret(){
  if(serverSecret)return serverSecret;
  if(process.env.SESSION_SECRET && process.env.SESSION_SECRET.length>=32){serverSecret=process.env.SESSION_SECRET;return serverSecret;}
  await initialize();
  const file=path.join(root,'session-secret');
  try{serverSecret=(await fs.readFile(file,'utf8')).trim();}catch(err){if(err.code!=='ENOENT')throw err;serverSecret=randomBytes(32).toString('hex');await fs.writeFile(file,serverSecret,{mode:0o600,flag:'wx'});}
  return serverSecret;
}
function signToken(userId){const payload=Buffer.from(JSON.stringify({id:userId,exp:Date.now()+7*24*3600*1000})).toString('base64url');const signature=createHmac('sha256',serverSecret).update(payload).digest('base64url');return `${payload}.${signature}`;}
function verifyToken(value){
  try{if(!value)return null;const [encoded,sign,extra]=value.split('.');if(extra!==undefined)return null;const expected=createHmac('sha256',serverSecret).update(encoded).digest('base64url');if(expected.length!==sign.length||!timingSafeEqual(Buffer.from(sign),Buffer.from(expected)))return null;const item=JSON.parse(Buffer.from(encoded,'base64url').toString('utf8'));return item.exp>Date.now()?item.id:null;}catch{return null;}
}
function tokenCookie(req){const matches=(req.headers.cookie||'').match(/(?:^|;\s*)lca_session=([^;]*)/);return matches?decodeURIComponent(matches[1]):null;}
function safeAccount(account){return {id:account.id,nombre:account.nombre,correo:account.correo,usuario:account.usuario||'',rol:account.rol,plan:account.plan,estado:account.estado,creado:account.creado,demo:account.demo===true};}
function detectImage(buffer){
  if(buffer.length>8 && buffer.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')))return '.png';
  if(buffer.length>4 && buffer.subarray(0,3).equals(Buffer.from('ffd8ff','hex')))return '.jpg';
  if(buffer.length>12 && buffer.subarray(0,4).toString()==='RIFF'&&buffer.subarray(8,12).toString()==='WEBP')return '.webp';
  return null;
}
const roles={actor:['activacion','destacado'],productor:['productora']};
app.get('/api/health',(req,res)=>res.json({ok:true,service:'La Casa del Actor API'}));
app.post('/api/registro',registerLimiter,(req,res,next)=>upload.single('comprobante')(req,res,err=>{if(err)return next(err);next();}),async(req,res,next)=>{
  try{
    const nombre=String(req.body.nombre||'').trim().replace(/\s+/g,' ');
    const correo=String(req.body.correo||'').trim().toLowerCase();
    const usuario=String(req.body.usuario||'').trim().toLowerCase();
    const telefono=String(req.body.telefono||'').trim();
    const contrasena=String(req.body.contrasena||'');
    const rol=String(req.body.rol||'');const plan=String(req.body.plan||'');
    if(nombre.length<3||nombre.length>100||!/^\S+@\S+\.\S+$/.test(correo)||correo.length>160||contrasena.length<10||contrasena.length>128||telefono.length>26||(usuario && !/^[a-z0-9_]{3,25}$/.test(usuario))||!roles[rol]?.includes(plan)||req.body.acepto!=='true')return res.status(400).json({error:'Revisa nombre, email, rol, plan, contraseña y aceptación de condiciones.'});
    let extension=null;
    if(req.file){extension=detectImage(req.file.buffer);if(!extension)return res.status(400).json({error:'El comprobante debe ser una imagen JPG, PNG o WebP válida.'});}
    const id=`LCA-${randomBytes(6).toString('hex').toUpperCase()}`;
    const receiptName=extension?`${id}-${randomBytes(8).toString('hex')}${extension}`:null;
    // No se almacena el nombre original del archivo ni se expone el comprobante por HTTP.
    const account={id,nombre,correo,usuario,telefono,rol,plan,estado:receiptName?'revision':'pendiente_comprobante',passwordHash:hashPassword(contrasena),recibo:receiptName,creado:new Date().toISOString()};
    const saved=await updateData('accounts.json',async items=>{
      if(items.some(u=>u.correo===correo||(usuario&&u.usuario===usuario)))return {next:items,result:false};
      if(receiptName)await fs.writeFile(path.join(root,'comprobantes',receiptName),req.file.buffer,{mode:0o600,flag:'wx'});
      return {next:[...items,account],result:true};
    });
    if(!saved)return res.status(409).json({error:'Ya existe una cuenta con este correo. Inicia sesión.'});
    res.status(201).json({ok:true,folio:id,message:receiptName?'Cuenta creada. Comprobante recibido; el plan queda pendiente de revisión manual.':'Cuenta creada. Puedes iniciar sesión; el plan queda pendiente de comprobante.'});
  }catch(err){next(err);}
});
app.post('/api/login',limiter,async(req,res,next)=>{
  try{const email=String(req.body.correo||'').trim().toLowerCase(),password=String(req.body.contrasena||'');const users=await readData('accounts.json');const account=users.find(u=>u.correo===email||(u.usuario&&u.usuario===email.replace(/^@/,''))); 
    if(!accountAllowedInEnvironment(account,PROD)||!checkPassword(password,account.passwordHash))return res.status(401).json({error:'Correo o contraseña incorrectos.'});
    res.cookie('lca_session',signToken(account.id),{httpOnly:true,sameSite:'lax',secure:PROD,maxAge:7*24*3600*1000,path:'/'});
    res.json({ok:true,user:safeAccount(account)});
  }catch(err){next(err);}
});
app.get('/api/me',async(req,res,next)=>{try{const id=verifyToken(tokenCookie(req));if(!id)return res.json({user:null});const users=await readData('accounts.json');const account=users.find(u=>u.id===id);res.json({user:accountAllowedInEnvironment(account,PROD)?safeAccount(account):null});}catch(err){next(err);}});
app.post('/api/logout',(req,res)=>{res.clearCookie('lca_session',{httpOnly:true,sameSite:'lax',secure:PROD,path:'/'});res.json({ok:true});});
app.post('/api/servicios',limiter,async(req,res,next)=>{
  try{const {servicio,nombre,email,whatsapp,drive,mensaje}=req.body||{};
    if(!serviciosData.some(s=>s.id===servicio)||typeof nombre!=='string'||nombre.trim().length<3||nombre.length>100||typeof email!=='string'||!/^\S+@\S+\.\S+$/.test(email)||email.length>160||typeof whatsapp!=='string'||whatsapp.trim().length<7||whatsapp.length>24||typeof mensaje!=='string'||mensaje.length>1500||typeof drive!=='string'||drive.length>1000||Boolean(drive)&&!/^https:\/\//i.test(drive))return res.status(400).json({error:'Revisa los datos de la solicitud.'});
    const id=`SRV-${randomBytes(5).toString('hex').toUpperCase()}`;
    await updateData('requests.json',async data=>({next:[...data,{id,servicio,nombre:nombre.trim(),email:email.trim(),whatsapp:whatsapp.trim(),drive:drive.trim(),mensaje:mensaje.trim(),creado:new Date().toISOString()}],result:true}));
    res.status(201).json({ok:true,folio:id});
  }catch(err){next(err);}
});

// Los datos públicos proceden de los mismos archivos que modifica el administrador.
app.get('/api/contenido/:tipo',async(req,res,next)=>{
  try{const type=req.params.tipo;if(!COLLECTIONS[type])return res.status(404).json({error:'Sección no encontrada'});
    res.setHeader('Cache-Control','no-store');res.json({items:(await getCatalog(type)).filter(x=>x.publicado!==false)});
  }catch(e){next(e);}
});
// Comprobar la sesión y el rol siempre en el servidor (no confiar en React).
async function sessionUser(req){const id=verifyToken(tokenCookie(req));if(!id)return null;const account=(await readData('accounts.json')).find(u=>u.id===id)||null;return accountAllowedInEnvironment(account,PROD)?account:null;}
async function requireRole(role,req,res,next){try{const user=await sessionUser(req);if(!user)return res.status(401).json({error:'Inicia sesión para continuar.'});if(user.rol!==role)return res.status(403).json({error:'Tu cuenta no tiene permiso para esta operación.'});req.account=user;next();}catch(e){next(e);}}
const onlyAdmin=(req,res,next)=>requireRole('administrador',req,res,next);
const onlyProducer=(req,res,next)=>requireRole('productor',req,res,next);
const routeLimiter=rateLimit({windowMs:15*60*1000,limit:110,standardHeaders:'draft-7',legacyHeaders:false});

// Fotos públicas de castings, portadas y talentos. Los comprobantes nunca se sirven aquí.
app.get('/uploads/:nombre',async(req,res,next)=>{try{
 const name=req.params.nombre;
 if(!/^[a-f0-9]{32}\.(png|jpg|webp)$/.test(name))return res.status(404).end();
 const buffer=await fs.readFile(path.join(root,'uploads',name));
 const ext=detectImage(buffer);if(!ext)return res.status(415).end();
 res.type(ext==='.jpg'?'jpeg':ext.slice(1));res.setHeader('Cache-Control','public, max-age=604800');res.send(buffer);
}catch(e){if(e.code==='ENOENT')return res.status(404).end();next(e);}});
app.post('/api/admin/subir-imagen',onlyAdmin,routeLimiter,(req,res,next)=>upload.single('imagen')(req,res,err=>err?next(err):next()),async(req,res,next)=>{try{
 if(!req.file)return res.status(400).json({error:'Selecciona una imagen.'});const ext=detectImage(req.file.buffer);
 if(!ext)return res.status(400).json({error:'Imagen inválida. Usa JPG, PNG o WebP.'});
 await fs.mkdir(path.join(root,'uploads'),{recursive:true,mode:0o700});
 const filename=randomBytes(16).toString('hex')+ext;await fs.writeFile(path.join(root,'uploads',filename),req.file.buffer,{flag:'wx',mode:0o600});
 res.status(201).json({ok:true,url:'/uploads/'+filename});
}catch(e){next(e);}});

app.get('/api/admin/usuarios',onlyAdmin,async(req,res,next)=>{try{const items=await readData('accounts.json');res.json({items:items.map(x=>({...safeAccount(x),recibo:!!x.recibo}))});}catch(e){next(e);}});
app.get('/api/admin/comprobante/:id',onlyAdmin,async(req,res,next)=>{try{
  const u=(await readData('accounts.json')).find(x=>x.id===req.params.id);
  if(!u?.recibo)return res.status(404).json({error:'No hay comprobante.'});
  const file=path.join(root,'comprobantes',u.recibo);const buf=await fs.readFile(file);const extension=detectImage(buf);
  if(!extension)return res.status(415).json({error:'Archivo incorrecto'});
  res.setHeader('Content-Type',extension==='.png'?'image/png':extension==='.webp'?'image/webp':'image/jpeg');res.setHeader('Cache-Control','no-store');res.setHeader('Content-Disposition','inline; filename="comprobante'+extension+'"');res.send(buf);
  }catch(e){next(e);}
});
app.patch('/api/admin/usuarios/:id/estado',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
  const estado=req.body?.estado;
  if(!['aprobado','rechazado','revision','pendiente_comprobante'].includes(estado))return res.status(400).json({error:'Estado no válido.'});
  const result=await updateData('accounts.json',async items=>{
    const u=items.find(x=>x.id===req.params.id);
    if(!u)return {next:items,result:'NO_EXISTE'};
    if(u.rol==='administrador')return {next:items,result:'ADMIN'};
    if(estado==='aprobado'&&!u.recibo)return {next:items,result:'SIN_COMPROBANTE'};
    return {next:items.map(x=>x.id===u.id?{...x,estado,revisionFecha:new Date().toISOString()}:x),result:'OK'};
  });
  if(result!=='OK')return res.status(400).json({error:result==='SIN_COMPROBANTE'?'No se puede aprobar sin comprobante.':'No se pudo actualizar la cuenta.'});
  res.json({ok:true});
}catch(e){next(e);}});
app.get('/api/admin/:tipo',onlyAdmin,async(req,res,next)=>{try{if(!COLLECTIONS[req.params.tipo])return res.status(404).json({error:'Sección no encontrada'});res.json({items:await getCatalog(req.params.tipo)});}catch(e){next(e);}});
app.post('/api/admin/:tipo',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
  const type=req.params.tipo;if(!COLLECTIONS[type])return res.status(404).json({error:'Sección no encontrada'});
  const entry=normalizeEntry(type,req.body);const result=await updateData(COLLECTIONS[type],async rows=>{
    if(rows.some(x=>entryId(type,x)===entryId(type,entry)))return {next:rows,result:'EXISTE'};
    return {next:[entry,...rows],result:'OK'};
  });
  if(result!=='OK')return res.status(409).json({error:'Ya existe un elemento con ese identificador. Cambia el nombre o slug.'});
  res.status(201).json({ok:true,entry});
}catch(e){if(e.message.startsWith('Escribe'))return res.status(400).json({error:e.message});next(e);}});
app.put('/api/admin/:tipo/:id',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
  const type=req.params.tipo;if(!COLLECTIONS[type])return res.status(404).json({error:'Sección no encontrada'});
  const result=await updateData(COLLECTIONS[type],async rows=>{
    const old=rows.find(x=>entryId(type,x)===req.params.id);
    if(!old)return {next:rows,result:null};
    const updated=normalizeEntry(type,req.body,old);
    return {next:rows.map(x=>entryId(type,x)===req.params.id?updated:x),result:updated};
  });
  if(!result)return res.status(404).json({error:'Registro no encontrado.'});res.json({ok:true,entry:result});
}catch(e){if(e.message.startsWith('Escribe'))return res.status(400).json({error:e.message});next(e);}});
app.delete('/api/admin/:tipo/:id',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
  const type=req.params.tipo;if(!COLLECTIONS[type])return res.status(404).json({error:'Sección no encontrada'});
  const result=await updateData(COLLECTIONS[type],async rows=>({next:rows.filter(x=>entryId(type,x)!==req.params.id),result:rows.some(x=>entryId(type,x)===req.params.id)}));
  if(!result)return res.status(404).json({error:'Registro inexistente.'});res.json({ok:true});
}catch(e){next(e);}});
// Productores proponen convocatorias. No se hacen públicas hasta que las apruebe un administrador.
app.get('/api/productor/propuestas',onlyProducer,async(req,res,next)=>{try{res.json({items:(await readData('propuestas.json')).filter(x=>x.autorId===req.account.id)});}catch(e){next(e);}});
app.post('/api/productor/propuestas',onlyProducer,routeLimiter,async(req,res,next)=>{try{
 const entry=normalizeEntry('castings',req.body);const proposal={...entry,id:'propuesta-'+randomBytes(8).toString('hex'),publicado:false,autorId:req.account.id,estado:'pendiente',fecha:new Date().toISOString()};
 await updateData('propuestas.json',async rows=>({next:[proposal,...rows],result:true}));res.status(201).json({ok:true});
}catch(e){if(e.message.startsWith('Escribe'))return res.status(400).json({error:e.message});next(e);}});
app.get('/api/admin-propuestas',onlyAdmin,async(req,res,next)=>{try{res.json({items:await readData('propuestas.json')});}catch(e){next(e);}});
app.post('/api/admin-propuestas/:id/aprobar',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
 const item=(await readData('propuestas.json')).find(x=>x.id===req.params.id && x.estado==='pendiente');if(!item)return res.status(404).json({error:'Propuesta no disponible'});
 const entry={...item,id:'publicado-'+randomBytes(7).toString('hex'),publicado:true,demo:false};delete entry.autorId;delete entry.estado;
 await updateData(COLLECTIONS.castings,async rows=>({next:[entry,...rows],result:true}));
 await updateData('propuestas.json',async rows=>({next:rows.map(x=>x.id===item.id?{...x,estado:'aprobado'}:x),result:true}));
 res.json({ok:true});
}catch(e){next(e);}});
app.post('/api/admin-propuestas/:id/rechazar',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
 await updateData('propuestas.json',async rows=>({next:rows.map(x=>x.id===req.params.id?{...x,estado:'rechazado'}:x),result:true}));res.json({ok:true});
}catch(e){next(e);}});


// ---- COMUNIDAD / PROYECTOS / ACADEMIA. Persistencia local de desarrollo. ----
// Ninguna solicitud es un cobro, una reserva o una inscripción confirmada.
const fresh=(req,res,next)=>{res.setHeader('Cache-Control','no-store');next();};
const publicError=(e,res,next)=>e.message?.startsWith('Completa')||e.message?.startsWith('Debes')||e.message?.startsWith('La hora')||e.message?.startsWith('Comprueba')?res.status(400).json({error:e.message}):next(e);
const allowCreator=async(req,res,next)=>{try{const account=await sessionUser(req);if(!account)return res.status(401).json({error:'Debes iniciar sesión para continuar.'});if(!activeCreator(account,PROD))return res.status(403).json({error:'Tu membresía o cuenta debe estar activa para colaborar. Puedes consultar tu estado en Mi cuenta.'});req.account=account;next();}catch(e){next(e);}};
const allowMember=async(req,res,next)=>{try{const account=await sessionUser(req);if(!account)return res.status(401).json({error:'Debes iniciar sesión para continuar.'});if(!activeMember(account,PROD))return res.status(403).json({error:'Las actividades y salas están reservadas para actores miembros activos.'});req.account=account;next();}catch(e){next(e);}};
app.get('/api/proyectos',fresh,async(req,res,next)=>{try{
 const items=(await readData('proyectos-comunidad.json')).filter(p=>p.estado==='aprobado').map(({autorId,...publicInfo})=>publicInfo);
 res.json({items});
}catch(e){next(e);}});
app.post('/api/proyectos',allowCreator,routeLimiter,async(req,res,next)=>{try{
 const clean=projectInput(req.body),id='PRJ-'+randomBytes(8).toString('hex');
 await updateData('proyectos-comunidad.json',async rows=>({next:[{...clean,id,autorId:req.account.id,estado:'pendiente',fecha:new Date().toISOString()},...rows],result:true}));
 res.status(201).json({ok:true,message:'Proyecto enviado. Se publicará únicamente después de la revisión del equipo.',id});
}catch(e){publicError(e,res,next);}});
app.get('/api/mi-comunidad',allowCreator,fresh,async(req,res,next)=>{try{
 const id=req.account.id;
 const [proyectos,participaciones,inscripciones,salas]=await Promise.all(['proyectos-comunidad.json','participaciones.json','inscripciones.json','salas.json'].map(readData));
 res.json({proyectos:proyectos.filter(x=>x.autorId===id),participaciones:participaciones.filter(x=>x.usuarioId===id),inscripciones:inscripciones.filter(x=>x.usuarioId===id),salas:salas.filter(x=>x.usuarioId===id)});
}catch(e){next(e);}});
app.get('/api/proyectos/mis-propuestas',allowCreator,fresh,async(req,res,next)=>{try{
 res.json({items:(await readData('proyectos-comunidad.json')).filter(p=>p.autorId===req.account.id)});
}catch(e){next(e);}});
app.post('/api/proyectos/:id/participar',allowCreator,routeLimiter,async(req,res,next)=>{try{
 const item=(await readData('proyectos-comunidad.json')).find(p=>p.id===req.params.id&&p.estado==='aprobado');
 if(!item)return res.status(404).json({error:'Proyecto no disponible.'});
 if(item.autorId===req.account.id)return res.status(400).json({error:'Ya eres autor de este proyecto.'});
 const result=await updateData('participaciones.json',async rows=>{
  if(rows.some(r=>r.proyectoId===item.id&&r.usuarioId===req.account.id))return {next:rows,result:false};
  return {next:[{id:'COL-'+randomBytes(8).toString('hex'),proyectoId:item.id,usuarioId:req.account.id,autorId:item.autorId,estado:'pendiente',fecha:new Date().toISOString()},...rows],result:true};
 });
 res.status(result?201:409).json(result?{ok:true,message:'Tu interés quedó registrado. El equipo podrá gestionar la solicitud.'}:{error:'Ya enviaste una solicitud para este proyecto.'});
}catch(e){next(e);}});
app.get('/api/actividades',fresh,async(req,res,next)=>{try{
 res.json({items:(await readData('actividades.json')).filter(x=>x.publicado===true).sort((a,b)=>a.fecha.localeCompare(b.fecha))});
}catch(e){next(e);}});
app.post('/api/actividades/:id/inscribir',allowMember,routeLimiter,async(req,res,next)=>{try{
 const activity=(await readData('actividades.json')).find(x=>x.id===req.params.id&&x.publicado===true);
 if(!activity)return res.status(404).json({error:'Actividad no disponible.'});
 const result=await updateData('inscripciones.json',async rows=>{
  if(rows.some(x=>x.actividadId===activity.id&&x.usuarioId===req.account.id))return {next:rows,result:false};
  return {next:[{id:'INS-'+randomBytes(7).toString('hex'),actividadId:activity.id,usuarioId:req.account.id,estado:'solicitado',fecha:new Date().toISOString()},...rows],result:true};
 });
 res.status(result?201:409).json(result?{ok:true,message:'Solicitud de inscripción recibida. Pendiente de confirmación del equipo.'}:{error:'Ya solicitaste tu inscripción a esta actividad.'});
}catch(e){next(e);}});
app.post('/api/solicitudes-salas',allowMember,routeLimiter,async(req,res,next)=>{try{
 const clean=validateRoom(req.body);
 const id='SALA-'+randomBytes(7).toString('hex');
 await updateData('salas.json',async rows=>({next:[{...clean,id,usuarioId:req.account.id,estado:'solicitado',creado:new Date().toISOString()},...rows],result:true}));
 res.status(201).json({ok:true,id,message:'Solicitud recibida. Una persona del equipo debe confirmar la disponibilidad de la sala.'});
}catch(e){publicError(e,res,next);}});
app.post('/api/formacion/interes',registerLimiter,async(req,res,next)=>{try{
 const {nombre,correo,curso,mensaje}=req.body||{};
 const courseList=['autogestion','selftape','preparacion','book','industria','networking'];
 if(textField(nombre,100).length<3||!emailValid(correo)||!courseList.includes(curso)||String(mensaje||'').length>700)return res.status(400).json({error:'Revisa nombre, correo y curso.'});
 const id='ACA-'+randomBytes(7).toString('hex');
 await updateData('formacion.json',async rows=>({next:[{id,nombre:textField(nombre,100),correo:correo.trim().toLowerCase(),curso,mensaje:textField(mensaje,700),fecha:new Date().toISOString(),estado:'pendiente'},...rows],result:true}));
 res.status(201).json({ok:true,message:'Tu interés quedó registrado. No se ha realizado ninguna compra ni pago.'});
}catch(e){next(e);}});
app.post('/api/contacto',registerLimiter,async(req,res,next)=>{try{
 const {nombre,correo,motivo,mensaje}=req.body||{};
 if(textField(nombre,100).length<3||!emailValid(correo)||motivo!=='apoyo_fundacion'||String(mensaje||'').length>1500)return res.status(400).json({error:'Revisa nombre, correo y mensaje.'});
 const id='CONT-'+randomBytes(7).toString('hex');
 await updateData('contactos.json',async rows=>({next:[{id,nombre:textField(nombre,100),correo:correo.trim().toLowerCase(),motivo,mensaje:textField(mensaje,1500),estado:'pendiente',fecha:new Date().toISOString()},...rows],result:true}));
 res.status(201).json({ok:true,message:'Mensaje registrado. El equipo podrá revisarlo desde administración; no se ha hecho ningún pago.'});
}catch(e){next(e);}});
// Operaciones de revisión exclusivas del administrador. Ningún contacto personal es público.
app.get('/api/admin-comunidad/resumen',onlyAdmin,fresh,async(req,res,next)=>{try{
 const files=['proyectos-comunidad.json','participaciones.json','actividades.json','inscripciones.json','salas.json','formacion.json','contactos.json','requests.json'];
 const [proyectos,participaciones,actividades,inscripciones,salas,formacion,contactos,servicios]=await Promise.all(files.map(readData));
 res.json({proyectos,participaciones,actividades,inscripciones,salas,formacion,contactos,servicios});
}catch(e){next(e);}});
app.post('/api/admin-comunidad/proyectos/:id/estado',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
 const estado=req.body?.estado;if(!['aprobado','rechazado'].includes(estado))return res.status(400).json({error:'Estado inválido.'});
 const exists=await updateData('proyectos-comunidad.json',async rows=>({next:rows.map(x=>x.id===req.params.id?{...x,estado}:x),result:rows.some(x=>x.id===req.params.id)}));
 if(!exists)return res.status(404).json({error:'Proyecto inexistente.'});res.json({ok:true});
}catch(e){next(e);}});
app.post('/api/admin-comunidad/actividades',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
 const clean=validateActivity(req.body),id='ACT-'+randomBytes(7).toString('hex');
 await updateData('actividades.json',async rows=>({next:[{...clean,id,publicado:req.body.publicado===true},...rows],result:true}));
 res.status(201).json({ok:true});
}catch(e){publicError(e,res,next);}});
app.delete('/api/admin-comunidad/actividades/:id',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
 await updateData('actividades.json',async rows=>({next:rows.filter(x=>x.id!==req.params.id),result:true}));res.json({ok:true});
}catch(e){next(e);}});
app.post('/api/admin-comunidad/solicitudes/:tipo/:id/estado',onlyAdmin,routeLimiter,async(req,res,next)=>{try{
 const names={participaciones:'participaciones.json',inscripciones:'inscripciones.json',salas:'salas.json',formacion:'formacion.json',contactos:'contactos.json'};
 const file=names[req.params.tipo],estado=req.body?.estado;
 if(!file||!['pendiente','contactado','confirmado','rechazado'].includes(estado))return res.status(400).json({error:'Tipo o estado inválido.'});
 const exists=await updateData(file,async rows=>({next:rows.map(x=>x.id===req.params.id?{...x,estado}:x),result:rows.some(x=>x.id===req.params.id)}));
 if(!exists)return res.status(404).json({error:'Solicitud inexistente.'});res.json({ok:true});
}catch(e){next(e);}});
app.use('/api',(req,res)=>res.status(404).json({error:'Ruta de API no disponible.'}));
if(PROD){const dist=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');app.use(express.static(dist));app.get('*',(req,res)=>res.sendFile(path.join(dist,'index.html')));}
app.use((err,req,res,next)=>{console.error('API error:',err.message);if(err.message==='FORMATO_NO_PERMITIDO')return res.status(400).json({error:'Solo se aceptan capturas JPG, PNG o WebP.'});if(err instanceof multer.MulterError)return res.status(400).json({error:err.code==='LIMIT_FILE_SIZE'?'La imagen supera los 5 MB.':'Error al procesar el archivo.'});res.status(500).json({error:'No fue posible completar la operación. Intenta nuevamente.'});});
await initialize();await getSecret();await seedCatalog();
if (!PROD && process.env.LCA_DEMO_ACCOUNTS==='1') {
  const created = await seedDemoAccounts();
  console.log(created.length ? `Cuentas de PRUEBA locales creadas: ${created.join(', ')}` : 'Cuentas de prueba locales disponibles (sin sobrescribir datos).');
  console.log('⚠️ Desarrollo únicamente. No utilizar estas credenciales en un sitio publicado.');
}
const listenHost = PROD ? (process.env.API_HOST || '0.0.0.0') : '127.0.0.1';
app.listen(PORT,listenHost,()=>console.log(`API de La Casa del Actor: http://${listenHost}:${PORT}`));
