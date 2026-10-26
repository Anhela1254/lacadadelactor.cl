import { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check, Diamond, ShieldCheck, Sparkles } from 'lucide-react';
import { Header, Footer } from '../App.jsx';
import { planesData } from '../data/planesData.js';
import './NuevasSecciones.css';

export default function PlanesPage(){
  useEffect(()=>{document.title='Planes y activación | La Casa del Actor';window.scrollTo(0,0);},[]);
  return <><Header/><main className="lc-page">
    <section className="lc-hero lc-plan-hero"><div className="container lc-hero-grid"><div><p className="lc-overline">✳ ACCESO / COMUNIDAD PROFESIONAL</p><h1>elige cómo<br/><em>brillar en escena.</em></h1><p className="lc-hero-description">Planes pensados para artistas y equipos creativos. Encuentra la opción que acompañe el siguiente paso de tu proyecto.</p><a href="#planes-lista" className="lc-btn lc-btn-dark">explorar planes <ArrowRight size={19}/></a></div><div className="lc-hero-art lc-plan-art" aria-hidden="true"><Diamond strokeWidth={.9}/><span>CRECER<br/>ES CREAR<br/>POSIBILIDADES</span></div></div></section>
    <section id="planes-lista" className="container lc-section"><div className="lc-heading"><span className="lc-overline">01 / PLANES Y SUSCRIPCIONES</span><h2>una opción para <em>cada historia.</em></h2><p>Las tarifas actorales están pendientes de definición. El modelo del documento contempla $100.000 CLP por publicar un casting y $150.000 CLP al año por acceso profesional, ambos sujetos a confirmación. No se realizan cobros aquí.</p></div>
      <div className="lc-pricing-grid">{planesData.map(plan=><article className={`lc-price-card ${plan.destaque?'featured':''}`} key={plan.id}>
        {plan.destaque && <div className="lc-price-ribbon"><Sparkles size={16}/> MÁS VISIBILIDAD</div>}
        <div className="lc-price-top"><span>{plan.etiqueta}</span><Diamond size={25}/></div>
        <h3>{plan.nombre}</h3><p className="lc-price-audience">{plan.publico}</p>
        <div className="lc-price-sum"><strong>{plan.monto}</strong><span>{plan.moneda}</span></div><p className="lc-price-period">{plan.periodo}</p>
        <div className="lc-price-divider"/><ul>{plan.beneficios.map(benefit=><li key={benefit}><Check size={19}/><span>{benefit}</span></li>)}</ul>
        <a className={`lc-btn ${plan.destaque?'lc-btn-green':'lc-btn-dark'}`} href={`/registro?role=${encodeURIComponent(plan.rol)}&plan=${encodeURIComponent(plan.id)}`}>{plan.cta} <ArrowUpRight size={20}/></a>
      </article>)}</div>
      <div className="lc-price-disclosure"><ShieldCheck size={28}/><div><strong>Información sobre registro y comprobantes</strong><p>Podrás crear una cuenta y adjuntar una captura de pago. El archivo se guarda de forma privada en el servidor local; ninguna suscripción se activa sin verificación manual. Esta plantilla no cobra dinero ni valida pagos bancarios.</p></div></div>
    </section><section className="lc-cta-band"><div className="container"><span>¿LISTO PARA ENTRAR EN ESCENA?</span><h2>cada camino empieza<br/><em>con un primer paso.</em></h2><a href="/registro?role=actor" className="lc-btn lc-btn-white">crear una cuenta <ArrowRight/></a></div></section>
  </main><Footer/></>;
}
