import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Camera, Film, Mail, MessageCircle, Video, X } from 'lucide-react';
import { Header, Footer } from '../App.jsx';
import { serviciosData } from '../data/serviciosData.js';
import './NuevasSecciones.css';
const icons = {film:Film,camera:Camera,video:Video};
const initial = {nombre:'',email:'',whatsapp:'',drive:'',mensaje:''};
export default function ServiciosPage() {
  const [selected,setSelected]=useState('reel');
  const [form,setForm]=useState(initial);
  const [sending,setSending]=useState(false);
  const [result,setResult]=useState(null);
  useEffect(()=>{document.title='Servicios profesionales | La Casa del Actor';window.scrollTo(0,0);},[]);
  function choose(id){setSelected(id);setResult(null);document.getElementById('solicitar-servicio')?.scrollIntoView({behavior:'smooth'});}
  function update(event){setForm(f=>({...f,[event.target.name]:event.target.value}));}
  async function submit(event){
    event.preventDefault();setResult(null);setSending(true);
    try {
      const response=await fetch('/api/servicios',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,servicio:selected})});
      const data=await response.json();
      if(!response.ok) throw new Error(data.error || 'No se pudo guardar la solicitud.');
      setResult({ok:true,message:`Solicitud ${data.folio} registrada. Conserva tu folio para seguimiento.`});setForm(initial);
    }catch(err){setResult({ok:false,message:err.message || 'No se pudo conectar con el servidor. Ejecuta npm run dev.'});}
    finally{setSending(false);}
  }
  return <><Header/><main className="lc-page">
    <section className="lc-hero lc-service-hero"><div className="container lc-hero-grid"><div><p className="lc-overline">✳ MATERIAL PROFESIONAL / ELENCO EN MOVIMIENTO</p><h1>tu trabajo,<br/><em>en primer plano.</em></h1><p className="lc-hero-description">Acompañamos la presentación de tu trayectoria con servicios creativos de imagen, edición y preparación audiovisual.</p><a className="lc-btn lc-btn-dark" href="#catalogo-servicios">ver servicios <ArrowRight size={19}/></a></div><div className="lc-hero-art lc-film-art" aria-hidden="true"><Film strokeWidth={1}/><span>IDEAS QUE<br/>TOMAN<br/>FORMA ✳</span></div></div></section>
    <section id="catalogo-servicios" className="container lc-section"><div className="lc-heading"><span className="lc-overline">01 / LO QUE HACEMOS</span><h2>servicios <em>creativos.</em></h2><p>Selecciona el servicio que necesitas; podrás enviarnos una solicitud desde el formulario de esta página.</p></div>
      <div className="lc-service-grid">{serviciosData.map(s=>{const Icon=icons[s.icono]||Film;return <article className="lc-service-card" key={s.id}><div className="lc-service-image"><img src={s.foto} alt={`Ilustración de ${s.nombre}`} loading="lazy"/><span>{s.etiqueta}</span></div><div className="lc-service-inner"><div className="lc-service-icon"><Icon size={24}/></div><h3>{s.nombre}</h3><p>{s.descripcion}</p><ul>{s.beneficios.map(b=><li key={b}><Check size={17}/>{b}</li>)}</ul><p className="lc-service-price">{s.precio}</p><button type="button" className="lc-btn lc-btn-dark" onClick={()=>choose(s.id)}>solicitar servicio <ArrowUpRight size={19}/></button></div></article>;})}</div>
    </section>
    <section id="solicitar-servicio" className="lc-form-section"><div className="container lc-form-grid"><div className="lc-form-intro"><span className="lc-overline">02 / TU PROYECTO</span><h2>hablemos<br/><em>de tu idea.</em></h2><p>Completa tus datos y describe el material que necesitas preparar. Guardaremos tu solicitud para que el equipo pueda revisarla.</p><div className="lc-form-note"><MessageCircle/><span>La solicitud se guarda en el servidor local. No envía mensajes automáticos ni procesa pagos.</span></div><a className="lc-social-link" href="https://www.instagram.com/lacasadelactor_/" target="_blank" rel="noopener noreferrer">conócenos en Instagram <ArrowUpRight size={19}/></a></div>
      <form className="lc-form-panel" onSubmit={submit}><h3>Solicitar servicio <span>✳</span></h3><label>¿Qué servicio necesitas? *<select required value={selected} onChange={e=>setSelected(e.target.value)}>{serviciosData.map(s=><option key={s.id} value={s.id}>{s.nombre}</option>)}</select></label>
      <div className="lc-form-two"><label>Nombre y apellido *<input required name="nombre" maxLength={100} value={form.nombre} onChange={update} placeholder="Tu nombre"/></label><label>Correo electrónico *<input required name="email" type="email" maxLength={160} value={form.email} onChange={update} placeholder="tu@email.com"/></label></div>
      <label>WhatsApp *<input name="whatsapp" required maxLength={24} value={form.whatsapp} onChange={update} placeholder="+51 999 999 999 o +56 9..."/></label><label>Enlace a carpeta de material (Google Drive, opcional)<input name="drive" type="url" maxLength={1000} value={form.drive} onChange={update} placeholder="https://drive.google.com/..."/></label>
      <label>Cuéntanos sobre tu proyecto<textarea name="mensaje" maxLength={1500} rows={4} value={form.mensaje} onChange={update} placeholder="Qué necesitas, tiempos y referencias..."/></label>
      {result && <p className={`lc-form-alert ${result.ok?'success':'error'}`} role="status">{result.message}</p>}
      <button type="submit" className="lc-btn lc-btn-green" disabled={sending}>{sending?'Guardando...':'enviar solicitud'} <ArrowRight size={19}/></button><small>Al enviar aceptas que usemos tus datos únicamente para responder tu consulta. Configura tu política de privacidad antes de publicar.</small></form>
    </div></section>
    <section className="lc-cta-band"><div className="container"><span>¿QUIERES VER A LOS ARTISTAS?</span><h2>talento que inspira<br/><em>nuevas historias.</em></h2><a className="lc-btn lc-btn-white" href="/talentos">explorar talentos <ArrowUpRight/></a></div></section>
  </main><Footer/></>;
}
