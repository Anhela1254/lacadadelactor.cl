import {useEffect,useState} from 'react';
import {ArrowRight,LockKeyhole,UserRound} from 'lucide-react';
import {Header,Footer} from '../App.jsx';
import {apiJson} from '../hooksCatalog.js';
import './NuevasSecciones.css';
const routeForRole={administrador:'/administracion',productor:'/panel-productor',actor:'/panel-actor'};
// Esta ayuda se elimina automáticamente de la compilación de producción (Vite).
const demoAccess=import.meta.env.DEV ? [
 {role:'Actor / Actriz',correo:'actor@demo.local',usuario:'actor_demo',contrasena:'ActorDemo2026!',destino:'/panel-actor'},
 {role:'Productor/a',correo:'productor@demo.local',usuario:'productor_demo',contrasena:'ProductorDemo2026!',destino:'/panel-productor'},
 {role:'Administrador',correo:'admin@demo.local',usuario:'admin_demo',contrasena:'AdminDemo2026!',destino:'/administracion'}
] : [];
export default function CuentaPage(){
 const [identity,setIdentity]=useState('');const [password,setPassword]=useState('');const [user,setUser]=useState(undefined);const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);
 useEffect(()=>{document.title='Ingresar | La Casa del Actor';apiJson('/api/me').then(d=>setUser(d.user||null)).catch(()=>setUser(null));},[]);
 async function login(e){e.preventDefault();setBusy(true);setMessage('');try{
  const data=await apiJson('/api/login',{method:'POST',body:JSON.stringify({correo:identity,contrasena:password})});
  setPassword('');window.location.assign(routeForRole[data.user?.rol]||'/mi-cuenta');
 }catch(e){setMessage(e.message);}finally{setBusy(false);}}
 return <><Header/><main className="lc-page lc-auth-page"><div className="container lc-auth-grid">
 <aside className="lc-auth-side"><span className="lc-overline">LA CASA DEL ACTOR · ACCESO PRIVADO</span><h1>bienvenido<br/><em>de vuelta.</em></h1><p>Un solo ingreso para artistas, productoras y administradores. El servidor identifica tu rol y abre el espacio correspondiente.</p><div className="lc-auth-promises"><div><UserRound/> Panel de actor o actriz</div><div><UserRound/> Panel de productora</div><div><LockKeyhole/> Administración protegida</div></div></aside>
 <div className="lc-auth-card"><div className="lc-auth-head"><span>INGRESA A TU CUENTA</span><h2>tu espacio<span>.</span></h2><p>Utiliza el correo o nombre de usuario que registraste.</p></div>
 {user===undefined?<p>Comprobando sesión...</p>:user?<div><p>Ya tienes una sesión activa como <strong>{user.rol}</strong>.</p><a className="lc-btn lc-btn-green" href={routeForRole[user.rol]||'/mi-cuenta'}>Ir a mi panel <ArrowRight size={19}/></a></div>:<form className="lc-auth-form" onSubmit={login}><label>Correo electrónico o usuario<input autoComplete="username" required value={identity} maxLength={160} onChange={e=>setIdentity(e.target.value)} placeholder="correo@ejemplo.com o @usuario"/></label><label>Contraseña<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label>{message&&<p className="lc-form-alert error" role="alert">{message}</p>}<button disabled={busy} className="lc-btn lc-btn-green" type="submit">{busy?'Verificando...':'Ingresar'} <ArrowRight size={19}/></button><p>¿Todavía no tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
 {demoAccess.length>0 && <section className="lc-demo-access" aria-label="Cuentas de demostración locales">
  <strong>Accesos de prueba — solo en tu computadora</strong>
  <p>Selecciona un perfil y pulsa «Ingresar». Estas cuentas no funcionan en producción.</p>
  <div className="lc-demo-grid">{demoAccess.map(d=><button key={d.usuario} type="button" onClick={()=>{setIdentity(d.correo);setPassword(d.contrasena);setMessage('')}}><span>{d.role}</span><small>@{d.usuario}</small></button>)}</div>
 </section>}</form>}
 </div></div></main><Footer/></>;
}
