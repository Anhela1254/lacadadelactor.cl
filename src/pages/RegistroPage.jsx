import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, FileImage, LockKeyhole, ShieldCheck, Trash2, UploadCloud, UserRound, Users } from 'lucide-react';
import { Header, Footer } from '../App.jsx';
import { planesData, planById } from '../data/planesData.js';
import './NuevasSecciones.css';

const params = new URLSearchParams(window.location.search);
const startingRole = params.get('role') === 'productor' ? 'productor' : 'actor';
const requestedPlan = planById(params.get('plan'));
const startingPlan = requestedPlan?.rol === startingRole ? requestedPlan.id : (startingRole === 'productor'?'productora':'activacion');

export default function RegistroPage(){
  const [role,setRole]=useState(startingRole);
  const [plan,setPlan]=useState(startingPlan);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [username,setUsername]=useState('');
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const [showPassword,setShowPassword]=useState(false);
  const [receipt,setReceipt]=useState(null);
  const [preview,setPreview]=useState('');
  const [accept,setAccept]=useState(false);
  const [sending,setSending]=useState(false);
  const [result,setResult]=useState(null);
  useEffect(()=>{document.title='Crear cuenta | La Casa del Actor';window.scrollTo(0,0);},[]);
  useEffect(()=>{
    if(!receipt){setPreview('');return;}
    const url=URL.createObjectURL(receipt);setPreview(url);
    return ()=>URL.revokeObjectURL(url);
  },[receipt]);
  function changeRole(value){setRole(value);setPlan(value==='actor'?'activacion':'productora');}
  function pickReceipt(file){
    setResult(null);
    if(!file){setReceipt(null);return;}
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)){setResult({ok:false,message:'Utiliza una imagen JPG, PNG o WebP.'});return;}
    if(file.size>5*1024*1024){setResult({ok:false,message:'La captura no puede superar 5 MB.'});return;}
    setReceipt(file);
  }
  async function submit(event){
    event.preventDefault();setResult(null);
    if(password!==confirm){setResult({ok:false,message:'Las contraseñas no coinciden.'});return;}
    if(password.length<10){setResult({ok:false,message:'La contraseña debe tener al menos 10 caracteres.'});return;}
    if(!accept){setResult({ok:false,message:'Debes aceptar las condiciones para continuar.'});return;}
    setSending(true);
    try{
      const body=new FormData();
      for(const [key,value] of Object.entries({nombre:name,correo:email,usuario:username,telefono:phone,contrasena:password,rol:role,plan,acepto:'true'})) body.append(key,value);
      if(receipt) body.append('comprobante',receipt);
      const response=await fetch('/api/registro',{method:'POST',body});
      const data=await response.json();
      if(!response.ok) throw new Error(data.error || 'No se pudo crear tu cuenta.');
      setResult({ok:true,message:data.message,folio:data.folio});
      setName('');setEmail('');setUsername('');setPhone('');setPassword('');setConfirm('');setReceipt(null);setAccept(false);
    }catch(err){setResult({ok:false,message:err.message || 'No hay conexión con el servidor de registro.'});}
    finally{setSending(false);}
  }
  const selected=planById(plan);
  return <><Header/><main className="lc-page lc-auth-page"><div className="container lc-auth-grid">
    <section className="lc-auth-side"><a href="/precios" className="lc-back"><ArrowLeft size={18}/> volver a los planes</a><p className="lc-overline">✳ UN LUGAR PARA TU TALENTO</p><h1>tu historia<br/><em>empieza aquí.</em></h1><p>Crea tu cuenta como artista o convocante y organiza tu recorrido profesional dentro de La Casa del Actor.</p>
      <div className="lc-auth-promises"><div><UserRound/><span>Tu perfil y experiencia artística</span></div><div><UploadCloud/><span>Espacio para adjuntar tu comprobante</span></div><div><ShieldCheck/><span>Revisión de activación por un administrador</span></div></div>
      <div className="lc-auth-disclaimer">Los valores del prototipo son de demostración. <strong>No realices transferencias</strong> hasta que la plataforma publique datos de pago oficiales y sus condiciones.</div>
      <a href="https://www.instagram.com/lacasadelactor_/" className="lc-social-link" target="_blank" rel="noopener noreferrer">Instagram oficial · @lacasadelactor_ ↗</a>
    </section>
    <section className="lc-auth-card"><div className="lc-auth-head"><span>REGISTRO DE USUARIOS</span><h2>crear mi cuenta<span>.</span></h2><p>El registro básico es gratuito. La activación del plan está sujeta a comprobación cuando corresponda.</p></div>
      <div className="lc-role-options" role="group" aria-label="Tipo de cuenta"><button type="button" aria-pressed={role==='actor'} className={role==='actor'?'selected':''} onClick={()=>changeRole('actor')}><UserRound size={23}/><strong>Actor / actriz</strong><small>Presenta tu talento</small></button><button type="button" aria-pressed={role==='productor'} className={role==='productor'?'selected':''} onClick={()=>changeRole('productor')}><Users size={23}/><strong>Productor/a</strong><small>Convoca artistas</small></button></div>
      <form className="lc-auth-form" onSubmit={submit}><label>Plan seleccionado<select value={plan} required onChange={e=>setPlan(e.target.value)}>{planesData.filter(p=>p.rol===role).map(p=><option key={p.id} value={p.id}>{p.nombre} ({p.monto} {p.moneda} · demostración)</option>)}</select></label>
        <div className="lc-selected-plan"><span>PLAN ELEGIDO</span><strong>{selected?.nombre}</strong><span>{selected?.monto} {selected?.moneda} · importe ilustrativo</span></div>
        <label>Nombre y apellidos *<input autoComplete="name" name="nombre" value={name} maxLength={100} onChange={e=>setName(e.target.value)} required placeholder="Tu nombre completo"/></label>
        <label>Correo electrónico *<input autoComplete="email" type="email" name="correo" value={email} maxLength={160} onChange={e=>setEmail(e.target.value)} required placeholder="tu@email.com"/></label>
        <label>Nombre de usuario (opcional, 3-25 caracteres)<input name="usuario" pattern="[a-zA-Z0-9_]{3,25}" value={username} maxLength={25} onChange={e=>setUsername(e.target.value)} placeholder="actor_lima"/></label><label>WhatsApp / teléfono (opcional)<input autoComplete="tel" type="tel" name="telefono" value={phone} maxLength={26} onChange={e=>setPhone(e.target.value)} placeholder="+51 999 999 999"/></label>
        <label>Contraseña *<span className="lc-password-field"><input type={showPassword?'text':'password'} autoComplete="new-password" value={password} minLength={10} maxLength={128} onChange={e=>setPassword(e.target.value)} required placeholder="Al menos 10 caracteres"/><button type="button" aria-label={showPassword?'Ocultar contraseña':'Mostrar contraseña'} onClick={()=>setShowPassword(v=>!v)}>{showPassword?<EyeOff/>:<Eye/>}</button></span></label>
        <label>Repite la contraseña *<input type={showPassword?'text':'password'} autoComplete="new-password" value={confirm} minLength={10} maxLength={128} onChange={e=>setConfirm(e.target.value)} required placeholder="Repite tu contraseña"/></label>
        <div className="lc-upload-group"><div className="lc-upload-heading"><FileImage size={24}/><div><strong>Captura del pago (opcional en esta demo)</strong><small>JPG, PNG o WebP · máximo 5 MB · solo el administrador puede verla</small></div></div>
          <label className="lc-upload-zone"><UploadCloud size={30}/><span>{receipt?receipt.name:'Haz clic para seleccionar tu comprobante'}</span><small>Si todavía no tienes un recibo, podrás crear tu cuenta pendiente de activación.</small><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>{pickReceipt(e.target.files?.[0]);e.target.value='';}}/></label>
          {preview && <div className="lc-receipt-preview"><img src={preview} alt="Vista previa de tu comprobante"/><button type="button" onClick={()=>setReceipt(null)}><Trash2 size={18}/> Quitar captura</button></div>}
        </div>
        <label className="lc-accept"><input type="checkbox" checked={accept} onChange={e=>setAccept(e.target.checked)} required/><span>Confirmo que mis datos son correctos y acepto las condiciones de uso y el tratamiento de mis datos para crear la cuenta. Debes publicar tu propia política de privacidad antes de lanzar la plataforma.</span></label>
        {result && <div className={`lc-form-alert ${result.ok?'success':'error'}`} role="status">{result.ok?<CheckCircle2 size={20}/>:<LockKeyhole size={20}/>}<div>{result.message}{result.folio && <p>Folio: <strong>{result.folio}</strong>. Guarda este número para el seguimiento.</p>}</div></div>}
        <button className="lc-btn lc-btn-green lc-auth-submit" type="submit" disabled={sending}>{sending?'creando cuenta...':'crear cuenta'} <ArrowRight size={20}/></button><p className="lc-auth-login">¿Ya tienes cuenta? <a href="/ingresar">Inicia sesión aquí →</a></p>
      </form></section>
  </div></main><Footer/></>;
}
