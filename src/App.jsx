import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Film, MapPin, Menu, Play, Search, Sparkles, Instagram,
  Star, Theater, Users, Video, X
} from 'lucide-react';
import { castingsData } from './data/castingsData.js';
import { blogData } from './data/blogData.js';
import { planesData } from './data/planesData.js';
import {useCatalog} from './hooksCatalog.js';

// 1. NAVEGACIÓN INTERNA DE LA CASA DEL ACTOR.
// Sustituye las anclas por tus rutas definitivas cuando crees el backend.
const LINKS = {
  home: '/#inicio',
  castings: '/castings',
  talentos: '/talentos',
  blog: '/blog',
  servicios: '/servicios',
  planes: '/precios',
  registro: '/registro?role=actor',
  ayuda: '#preguntas'
};

// 2. CONTENIDO DE MUESTRA. No es un listado en vivo.
// Para un sitio productivo, reemplaza este array por datos de un API o base de datos.
// Ambas vistas (Inicio y /castings) toman sus convocatorias del MISMO archivo:
// src/data/castingsData.js. Edita únicamente ese archivo para crear o modificar castings.
const CARD_TONES = ['mint', 'lime', 'light', 'emerald'];
const CASTINGS = castingsData.map((casting, index) => ({
  id: casting.id,
  title: casting.titulo,
  type: casting.tipo,
  location: casting.region,
  producer: casting.productora,
  paid: casting.remuneracion,
  copy: casting.descripcion,
  number: String(index + 1).padStart(2, '0'),
  tone: CARD_TONES[index % CARD_TONES.length],
  detail: casting.descripcion
}));

const ARTICLES = blogData.slice(0, 3).map((articulo, index) => ({
  category: articulo.categoria.toUpperCase(), number: String(index + 1).padStart(2, '0'),
  title: articulo.titulo, text: articulo.resumen, icon: [Video, Sparkles, Users][index], slug: articulo.slug
}));


const FAQS = [
  { question:'¿Puedo crear una cuenta?',answer:'Sí. En esta versión puedes registrarte e iniciar sesión en el servidor local. El alta de cuenta no equivale a la activación de un plan.' },
  { question:'¿Los castings publicados están vigentes?',answer:'No. Las convocatorias iniciales son ejemplos editables y no representan vacantes verificadas.' },
  { question:'¿Cómo se verifica un pago?',answer:'La cuenta admite una captura, pero la aprobación requiere revisión manual de un administrador. El sistema no confirma transferencias ni realiza cobros.' },
  { question:'¿Los precios del sitio son definitivos?',answer:'No. Son importes de demostración inspirados en la estructura de referencia. Modifícalos en src/data/planesData.js antes de publicar.' }
];


const PHOTO_HERO = '/images/IMG_0306.JPG';
const PHOTO_STAGE = '/images/IMG_5569.JPG';
const PHOTO_ACTOR = '/images/IMG_0312.JPG';
const PHOTO_ACTRESS = '/images/IMG_0419.JPG';
const PHOTO_PORTRAIT = '/images/IMG_5808.jpg';

function OutLink({ href, children, className = '', ...props }) {
  const isExternal = /^(https?:\/\/|mailto:|tel:)/i.test(href || '');
  return <a href={href} className={className} {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})} {...props}>{children}</a>;
}

function Brand({ inverted = false }) {
  return (
    <a className={`brand ${inverted ? 'brand-inverted' : ''}`} href="/" aria-label="La Casa del Actor, volver al inicio">
      <img className="brand-image" src="/images/logo-la-casa-del-actor.jpg" alt="Logo LCDA" />
      <span className="brand-words"><strong>la casa del actor<span className="brand-dot">.</span></strong><small>casting · artistas · escena</small></span>
    </a>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(true);
  useEffect(() => {
    function onEscape(event) { if (event.key === 'Escape') setMenuOpen(false); }
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, []);
  const nav = [
    { title: 'inicio', href: '/' }, { title: 'castings', href: '/castings' },
    { title: 'talentos', href: '/talentos' }, { title: 'blog', href: '/blog' },
    { title: 'servicios', href: '/servicios' }, { title: 'planes', href: '/precios' }
  ];
  return (
    <>
      {noticeOpen && <div className="announcement">
        <div className="container announcement-inner">
          <span><span className="announcement-ping" /> LA CASA DEL ACTOR · un espacio para crear, actuar y conectar</span>
          <div className="announcement-actions">
            <a href="/castings">explorar proyectos <ArrowUpRight size={15} /></a>
            <button aria-label="Cerrar aviso" onClick={() => setNoticeOpen(false)}><X size={16} /></button>
          </div>
        </div>
      </div>}
      <header className="site-header">
        <div className="container nav-shell">
          <Brand />
          <nav aria-label="Navegación principal" className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
            {nav.map(({ title, href }, index) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{title}{index !== nav.length - 1 && <span aria-hidden="true" className="nav-separator">|</span>}</a>)}
            <a className="nav-mobile-register" href="/registro?role=actor">crear cuenta <ArrowUpRight size={16}/></a>
            <a className="nav-mobile-register" href="/ingresar">ingresar <ArrowUpRight size={16}/></a>
            <a className="nav-mobile-register" href="https://www.instagram.com/lacasadelactor_/" target="_blank" rel="noopener noreferrer">Instagram <Instagram size={17}/></a>
          </nav>
          <div className="nav-actions">
            <a href="https://www.instagram.com/lacasadelactor_/" className="nav-instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram de La Casa del Actor"><Instagram size={19}/></a>
            <a href="/ingresar" className="nav-login">ingresar</a>
            <OutLink href={LINKS.registro} className="nav-register">registrarse <ArrowUpRight size={17} /></OutLink>
            <button type="button" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
              {menuOpen ? <X size={27} /> : <Menu size={27} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function AccentHeading({ overline, title, accent, body }) {
  return <div className="section-heading">
    <span className="overline"><span className="mini-star">✳</span> {overline}</span>
    <h2>{title} <em>{accent}</em></h2>
    {body && <p>{body}</p>}
  </div>;
}

function Hero() {
  return <section id="inicio" className="hero">
    <div className="container hero-grid">
      <div className="hero-copy">
        <div className="intro-label"><span className="status-dot" /> bienvenidos a la casa del actor</div>
        <h1>tu próximo <span className="hero-emphasis">papel</span><br /> te <span className="underline-word">espera.</span></h1>
        <p>El punto de encuentro entre quienes cuentan historias y quienes nacieron para interpretarlas. Castings, artistas y posibilidades reales.</p>
        <div className="hero-buttons">
          <a href="/castings" className="button button-primary">explorar castings <ArrowUpRight size={20} /></a>
          <OutLink href={LINKS.registro} className="button button-outline">conocer el proyecto <ArrowRight size={19} /></OutLink>
        </div>
        <div className="hero-footnote"><span className="round-asterisk">✳</span><span>cine / teatro / publicidad / televisión<br />conectando talento en todo chile</span></div>
      </div>
      <div className="hero-art" aria-label="Composición editorial de una artista">
        <div className="hero-photo-frame"><img src={PHOTO_HERO} alt="Actividad de La Casa del Actor: presentación ante el público" /></div>
        <div className="hero-star hero-star-one">✳</div>
        <div className="hero-orbit-text">LA ESCENA ES TUYA <span>↗</span></div>
        <div className="hero-sticker">nuevas<br />historias<br /><span>↗</span></div>
        <div className="hero-side-number">001 / 2026</div>
      </div>
    </div>
    <div className="hero-bottom"><span>plataforma de castings</span><span>creada para una comunidad artística</span><a href="#universo" aria-label="Bajar a explorar">desliza para descubrir <ArrowDownRight size={19} /></a></div>
  </section>;
}

function Marquee() {
  return <div className="marquee" aria-hidden="true"><div className="marquee-track">
    {Array.from({ length: 4 }).map((_, i) => <span key={i}>CASTINGS <span>✳</span> TALENTO <span>✳</span> CREATIVIDAD <span>✳</span> ACCIÓN <span>✳</span> </span>)}
  </div></div>;
}

function Universe() {
  const links = [
    { count: '01', title: 'encuentra tu casting', text: 'Las oportunidades empiezan con un primer paso.', href: '/castings', icon: Film, featured: true },
    { count: '02', title: 'descubre talentos', text: 'Perfiles que merecen el centro de la escena.', href: '/talentos', icon: Star },
    { count: '03', title: 'crea en conjunto', text: 'Una producción se construye con su equipo.', href: '#productoras', icon: Theater },
    { count: '04', title: 'sigue aprendiendo', text: 'Recursos para desarrollar tu oficio.', href: '/blog', icon: Play }
  ];
  return <section id="universo" className="universe section-pad"><div className="container">
    <div className="universe-head"><AccentHeading overline="BIENVENIDXS A LA ESCENA" title="un universo de" accent="posibilidades" body="Actuar, crear, producir y crecer. Elige desde dónde quieres comenzar." /><div className="big-asterisk" aria-hidden="true">✳</div></div>
    <div className="universe-grid">{links.map(({ count, title, text, href, icon: Icon, featured }) => <a href={href} key={count} className={`universe-item ${featured ? 'featured' : ''}`}><span className="universe-count">/{count}</span><Icon size={37} strokeWidth={1.4} /><div><h3>{title}</h3><p>{text}</p></div><span className="circle-arrow"><ArrowUpRight size={23} /></span></a>)}</div>
  </div></section>;
}

function CastingModal({ casting, onClose }) {
  useEffect(() => {
    if (!casting) return undefined;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [casting, onClose]);
  if (!casting) return null;
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="casting-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={event => event.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Cerrar detalles"><X size={22} /></button>
      <span className="pill-label">CASTING / {casting.type.toUpperCase()}</span>
      <h3 id="modal-title">{casting.title}</h3>
      <p className="modal-producer">{casting.producer} · {casting.location}</p>
      <p>{casting.detail}</p>
      <div className="modal-disclaimer">{casting.demo ? 'Casting de ejemplo. No es posible postular.' : 'Consulta la convocatoria completa en la sección Castings.'}</div>
      <OutLink href={LINKS.castings} className="button button-primary">ver catálogo de castings <ArrowUpRight size={19} /></OutLink>
    </div>
  </div>;
}

function Castings() {
  const {items:itemsCastings}=useCatalog('castings',castingsData);
  const actualCastings=itemsCastings.map((casting,index)=>({id:casting.id,title:casting.titulo,type:casting.tipo,location:casting.region,producer:casting.productora,paid:casting.remuneracion,copy:casting.descripcion,number:String(index+1).padStart(2,'0'),tone:CARD_TONES[index%CARD_TONES.length],detail:casting.descripcion,demo:casting.demo})).slice(0,6);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [region, setRegion] = useState('Todas las regiones');
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => actualCastings.filter(c =>
    (filter === 'Todos' || c.type === filter) &&
    (region === 'Todas las regiones' || c.location === region) &&
    `${c.title} ${c.producer} ${c.copy} ${c.location}`.toLowerCase().includes(query.toLowerCase())
  ), [query, filter, region, actualCastings]);
  return <section id="castings" className="castings section-pad"><div className="container">
    <div className="castings-header"><AccentHeading overline="OPORTUNIDADES / CASTINGS" title="haz que" accent="suceda." body="Revisa nuevas convocatorias, selecciona tu oportunidad y participa en la escena." />
      <OutLink href={LINKS.castings} className="text-link">ver todos los castings <ArrowUpRight size={21} /></OutLink></div>
    <div className="filters">
      <label className="search-field"><Search size={20} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por nombre, proyecto o región" aria-label="Buscar castings" /></label>
      <div className="select-wrap"><select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filtrar por tipo"><option>Todos</option>{[...new Set(actualCastings.map(c => c.type))].map(t => <option key={t}>{t}</option>)}</select><ChevronDown size={17} /></div>
      <div className="select-wrap"><select value={region} onChange={e => setRegion(e.target.value)} aria-label="Filtrar por región"><option>Todas las regiones</option>{[...new Set(actualCastings.map(c => c.location))].map(r => <option key={r}>{r}</option>)}</select><ChevronDown size={17} /></div>
    </div>
    <div className="castings-small-meta"><span>{filtered.length} proyectos de ejemplo</span><span>vista previa · visita el catálogo completo</span></div>
    <div className="castings-grid">
      {filtered.length > 0 ? filtered.map(c => <article key={c.id} className={`casting-card card-${c.tone}`}>
        <div className="casting-card-top"><span>{c.type} / {c.number}</span><ArrowUpRight size={23} /></div>
        <div className="casting-card-symbol" aria-hidden="true">✳</div>
        <div className="casting-card-main"><div className="casting-label">{c.paid} <span>·</span> {c.location}</div><h3>{c.title}</h3><p>{c.copy}</p></div>
        <div className="casting-card-foot"><span><MapPin size={15} /> {c.producer}</span><button onClick={() => setSelected(c)}>ver ficha <ArrowUpRight size={18} /></button></div>
      </article>) : <div className="no-results"><Search size={32} /><h3>Sin resultados</h3><p>Prueba otra palabra o elimina los filtros.</p><button className="button button-outline" onClick={() => { setQuery(''); setFilter('Todos'); setRegion('Todas las regiones'); }}>limpiar filtros <ArrowLeft size={16} /></button></div>}
    </div>
    <p className="castings-disclaimer">Todos los proyectos, productoras y condiciones de esta sección son datos ficticios. No hay castings reales ni recepción de postulaciones.</p>
    <CastingModal casting={selected} onClose={() => setSelected(null)} />
  </div></section>;
}

function Talents() {
  return <section id="talentos" className="talents section-pad"><div className="container">
    <div className="talents-top"><AccentHeading overline="ARTISTAS / DIRECTORIO" title="talento que" accent="se mueve." body="Conoce momentos de actividades y descubre nuestro espacio para talentos. Las fotografías muestran eventos y no identifican a perfiles inscritos." /><OutLink href={LINKS.talentos} className="text-link">ver talentos <ArrowUpRight size={21} /></OutLink></div>
    <div className="talent-layout">
      <a href="/talentos" className="talent-portrait portrait-1" aria-label="Ver el catálogo de talentos"><img src={PHOTO_ACTRESS} loading="lazy" alt="Participante durante actividad cultural fotografiada" /><span className="photo-sticker">momentos<br />de escena ✳</span><div className="portrait-caption"><span>01 / EXPRESIÓN</span><strong>comunidad artística</strong></div></a>
      <div className="talent-center"><div className="talent-circle"><Star size={65} strokeWidth={1.25}/><span>creatividad<br />en movimiento</span></div><p>cada historia<br />necesita una voz.<br /><em>¿y si es la tuya?</em></p><OutLink href={LINKS.talentos} className="button button-white">ver perfiles <ArrowUpRight size={20} /></OutLink></div>
      <a href="/talentos" className="talent-portrait portrait-2" aria-label="Explorar perfiles de artistas"><img src={PHOTO_ACTOR} loading="lazy" alt="Expositora en evento cultural fotografiado" /><div className="portrait-caption"><span>02 / CREACIÓN</span><strong>formación &amp; cultura</strong></div></a>
    </div>
    <p className="image-caption">Imágenes aportadas de actividades; las personas fotografiadas no se presentan como perfiles inscritos ni se identifican por nombre.</p>
  </div></section>;
}

function Producers() {
  return <section id="productoras" className="producers section-pad"><div className="container producers-grid">
    <div className="producers-image"><img src={PHOTO_STAGE} loading="lazy" alt="Fotografía de taller colectivo y encuentro artístico"/><span className="producer-image-text">acción! <span>↗</span></span></div>
    <div className="producers-copy"><span className="overline"><span className="mini-star">✳</span> PARA PRODUCTORAS</span><h2>las grandes ideas necesitan <em>grandes elencos.</em></h2><p>Convoca artistas, encuentra perfiles y organiza tu próxima producción desde un mismo lugar. Tu historia comienza con el equipo correcto.</p>
      <div className="producer-features"><span><Check size={18}/> prepara tus convocatorias</span><span><Check size={18}/> descubre perfiles artísticos</span><span><Check size={18}/> imagina la gestión de postulantes</span></div>
      <OutLink href={LINKS.servicios} className="button button-primary">conoce las herramientas <ArrowUpRight size={20}/></OutLink>
    </div>
  </div></section>;
}

function Blog() {
  const {items:articles}=useCatalog('blog',blogData);
  const currentArticles=articles.slice(0,3).map((a,index)=>({title:a.titulo,text:a.resumen,category:a.categoria,number:String(index+1).padStart(2,'0'),slug:a.slug,imagen:a.imagen,icon:[Video,Sparkles,Users][index]}));
  return <section id="blog" className="blog section-pad"><div className="container"><div className="blog-header"><AccentHeading overline="CONTENIDO / FORMACIÓN" title="ideas para" accent="salir a escena." body="Aprender también es parte del proceso. Lecturas y herramientas para tu camino artístico." /><OutLink href={LINKS.blog} className="text-link">ver artículos <ArrowUpRight size={21}/></OutLink></div>
    <div className="articles">{currentArticles.map(({ title, text, category, number, slug, imagen, icon: Icon }) => <OutLink href={`/blog/${slug}`} key={number} className="article-card"><div className="article-visual">{imagen?<img src={imagen} alt="" loading="lazy" />:<Icon size={64} strokeWidth={1.25}/>}<span>{number}</span></div><div className="article-copy"><span>{category}</span><h3>{title}</h3><p>{text}</p><span className="article-read">leer artículos <ArrowUpRight size={17}/></span></div></OutLink>)}</div>
  </div></section>;
}

function Plans() {
  return <section id="planes" className="plans section-pad"><div className="container">
    <div className="plans-header"><AccentHeading overline="ACCESO / PLANES" title="más escena." accent="menos límites." body="Explora las opciones de participación. Importes de ejemplo: confirma tus condiciones antes de publicar." /></div>
    <div className="plans-grid">{planesData.map(plan=><div className={`plan-card ${plan.destaque ? 'plan-featured' : ''}`} key={plan.id}>
      <div className="plan-top"><span>{plan.etiqueta}</span><Star size={22}/></div><h3>{plan.nombre}</h3><div className="plan-price">{plan.monto}<span>{plan.moneda} · demostración</span></div>
      <ul>{plan.beneficios.map(feature=><li key={feature}><Check size={17}/>{feature}</li>)}</ul>
      <a href={`/registro?role=${plan.rol}&plan=${plan.id}`} className={`button ${plan.destaque ? 'button-primary' : 'button-outline'}`}>{plan.cta} <ArrowUpRight size={18}/></a>
    </div>)}</div>
    <p className="price-note">Precios ilustrativos, no constituyen una oferta vigente. El comprobante debe validarse manualmente. <a href="/precios">Ver planes completos →</a></p>
  </div></section>;
}


function ComunidadGaleria() {
  const fotos = [
    {src:'/images/IMG_0419.JPG', titulo:'Encuentros en comunidad', etiqueta:'EXPERIENCIAS'},
    {src:'/images/IMG_5808.jpg', titulo:'Actividades al aire libre', etiqueta:'COMUNIDAD'},
    {src:'/images/IMG_5569.JPG', titulo:'Prácticas y talleres', etiqueta:'FORMACIÓN'},
    {src:'/images/IMG_0306.JPG', titulo:'Voces en escena', etiqueta:'PRESENTACIONES'}
  ];
  return <section className="lc-community-gallery section-pad" id="comunidad">
    <div className="container">
      <div className="lc-community-head"><AccentHeading overline="MOMENTOS / LA CASA DEL ACTOR" title="nuestra" accent="comunidad." body="Una selección de imágenes de las actividades compartidas en nuestro archivo." /><a className="text-link" href="https://www.instagram.com/lacasadelactor_/" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={19}/></a></div>
      <div className="lc-community-grid">{fotos.map((f,i)=><figure className="lc-community-card" key={f.src}><img src={f.src} loading="lazy" alt={f.titulo}/><figcaption><span>{String(i+1).padStart(2,'0')} / {f.etiqueta}</span><strong>{f.titulo}</strong></figcaption></figure>)}</div>
      <p className="lc-gallery-note">Material fotográfico incorporado desde el archivo proporcionado. Comprueba las autorizaciones de uso de imagen antes de publicar.</p>
      <div className="lc-community-feature"><div><span className="overline">✳ CONTENIDO AUDIOVISUAL</span><h3>historias que<br/><em>nos mueven.</em></h3><p>Conoce nuestro material audiovisual. Puedes reemplazarlo por otro video dentro de public/images.</p></div><div className="lc-community-video"><video controls preload="metadata" playsInline poster="/images/Miniatura de Youtube sobre fundación infantil geométrico morado y amarillo.png"><source src="/images/teaser-la-casa-del-actor.mp4" type="video/mp4"/>Tu navegador no admite video HTML5.</video></div></div>
      <div className="lc-community-brands"><div><span className="overline">MATERIAL GRÁFICO / MARCAS</span><p>Archivos de marcas que incluiste en la carpeta «MARCAS Y-O AUSPICIOS».</p></div><div className="lc-community-brand-logos"><img src="/images/MARCAS Y-O AUSPICIOS/Comunidad Escénica.jpg" alt="Comunidad Escénica" loading="lazy"/><img src="/images/MARCAS Y-O AUSPICIOS/fabula.jpg" alt="Fábula" loading="lazy"/><img src="/images/MARCAS Y-O AUSPICIOS/Sudamerican Voice.png" alt="Sudamerican Voice" loading="lazy"/></div></div>
      <p className="lc-gallery-note">Estos logos se muestran porque estaban en el RAR; verifica qué alianzas o patrocinios pueden comunicarse públicamente.</p>
    </div>
  </section>;
}

function Faq() {
  const [active, setActive] = useState(0);
  return <section id="preguntas" className="faq section-pad"><div className="container faq-layout"><div className="faq-intro"><span className="overline"><span className="mini-star">✳</span> PREGUNTAS FRECUENTES</span><h2>¿alguna<br/><em>duda?</em></h2><p>Lo esencial para comenzar en la plataforma.</p><OutLink href={LINKS.ayuda} className="text-link">preguntas frecuentes <ArrowUpRight size={20}/></OutLink></div>
    <div className="faq-list">{FAQS.map((faq, i) => <div className={`faq-item ${i === active ? 'expanded' : ''}`} key={faq.question}><button aria-expanded={i === active} onClick={() => setActive(i === active ? -1 : i)}><span>{String(i + 1).padStart(2,'0')}.</span><strong>{faq.question}</strong><span className="faq-toggle">{i === active ? '−' : '+'}</span></button>{i === active && <p>{faq.answer}</p>}</div>)}</div>
  </div></section>;
}

function CTA() {
  return <section id="contacto" className="bottom-cta"><div className="container bottom-cta-inner"><div className="cta-stamp">✳<span>LA CASA DEL ACTOR<br/>CREAMOS ESCENA</span></div><span className="overline">EL SIGUIENTE CAPÍTULO EMPIEZA AQUÍ</span><h2>el escenario<br/>te <em>espera.</em></h2><p>Crea tu cuenta, prepara tu perfil y forma parte de una comunidad que vive la escena. La activación de planes requiere verificación manual.</p><a href="/registro?role=actor" className="button button-white">crear cuenta <ArrowUpRight size={21}/></a></div></section>;
}

export function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-intro"><Brand inverted/><p>La Casa del Actor: una nueva identidad para conectar talento, proyectos y comunidad artística.</p></div><div className="footer-col"><h3>explora</h3><a href="/castings">castings</a><a href="/talentos">talentos</a><a href="/servicios">servicios</a><a href="/blog">blog</a></div><div className="footer-col"><h3>la plataforma</h3><a href="/">inicio</a><a href="/precios">planes</a><a href="/#preguntas">preguntas frecuentes</a><a href="/registro?role=actor">crear cuenta</a></div><div className="footer-col"><h3>comunidad</h3><a href="/#comunidad">nuestras actividades <ArrowUpRight size={14}/></a><a href="/castings">oportunidades <ArrowUpRight size={14}/></a><a href="/talentos">artistas <ArrowUpRight size={14}/></a><a href="https://www.instagram.com/lacasadelactor_/" target="_blank" rel="noopener noreferrer">Instagram @lacasadelactor_ <ArrowUpRight size={14}/></a><a href="/ingresar">ingresar <ArrowUpRight size={14}/></a><a href="/servicios">servicios <ArrowUpRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} · LA CASA DEL ACTOR</span><p>Prototipo: registro local con contraseña protegida y comprobantes privados pendientes de revisión. No verifica ni procesa pagos bancarios; castings y tarifas son ejemplos.</p><a href="/">volver arriba ↑</a></div></div></footer>;
}

export default function App() {
  return <><Header/><main><Hero/><Marquee/><Universe/><Castings/><Talents/><Producers/><ComunidadGaleria/><Blog/><Plans/><Faq/><CTA/></main><Footer/></>;
}
