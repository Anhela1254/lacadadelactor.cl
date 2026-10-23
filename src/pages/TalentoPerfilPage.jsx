import { useEffect, useState } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Camera, ChevronLeft,
  ChevronRight, Clipboard, Download, ExternalLink, Film, Instagram,
  Mail, PlayCircle, Share2, Video, X
} from 'lucide-react';
import { Header, Footer } from '../App.jsx';
import { talentosData } from '../data/talentosData.js';
import {useCatalog} from '../hooksCatalog.js';
import { TalentImage } from './TalentosPage.jsx';
import './Talentos.css';

function videoEmbedUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = u.pathname.startsWith('/embed/') ? u.pathname.split('/')[2] : u.searchParams.get('v');
      return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : '';
    }
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1);
      return /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : '';
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean).pop();
      return /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : '';
    }
  } catch { /* URL no válida: no embeber */ }
  return '';
}

function MediaModal({ reel, title, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = prev; };
  }, [onClose]);
  const embed = videoEmbedUrl(reel);
  return <div className="tl-modal-overlay" onMouseDown={onClose} role="presentation"><div className="tl-media-dialog" role="dialog" aria-modal="true" aria-label={title} onMouseDown={e => e.stopPropagation()}><div className="tl-dialog-bar"><strong>{title}</strong><button type="button" onClick={onClose} aria-label="Cerrar video"><X size={22}/></button></div>{embed ? <div className="tl-video-embed"><iframe title={title} src={embed} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div> : <div className="tl-media-notice"><Video size={38}/><p>El enlace no es un video compatible. Usa una URL pública de YouTube o Vimeo en talentosData.js.</p></div>}</div></div>;
}

function Gallery({ photos, nombre }) {
  const [activePhoto, setActivePhoto] = useState(-1);
  useEffect(() => {
    if (activePhoto === -1) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(event) {
      if (event.key === 'Escape') setActivePhoto(-1);
      if (event.key === 'ArrowRight') setActivePhoto(n => (n + 1) % photos.length);
      if (event.key === 'ArrowLeft') setActivePhoto(n => (n - 1 + photos.length) % photos.length);
    }
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [activePhoto, photos.length]);
  if (!photos?.length) return null;
  return <section className="tl-gallery-section" id="galeria" aria-labelledby="gallery-title"><div className="container"><div className="tl-subhead"><div><p className="tl-eyebrow">FOTOGRAFÍA / BOOK</p><h2 id="gallery-title">otras <em>miradas.</em></h2></div><span>{String(photos.length).padStart(2, '0')} IMÁGENES</span></div><div className="tl-gallery-grid">{photos.map((foto, i) => <button key={`${foto}-${i}`} className="tl-gallery-photo" type="button" onClick={() => setActivePhoto(i)} aria-label={`Ampliar fotografía ${i + 1} de ${nombre}`}><TalentImage src={foto} alt={`Fotografía ${i + 1} de ${nombre}`} /><span><Camera size={18}/> VER FOTO {String(i + 1).padStart(2,'0')}</span></button>)}</div></div>
  {activePhoto !== -1 && <div className="tl-modal-overlay tl-lightbox" role="dialog" aria-modal="true" aria-label={`Galería de ${nombre}`} onMouseDown={() => setActivePhoto(-1)}><div className="tl-lightbox-content" onMouseDown={e => e.stopPropagation()}><div className="tl-lightbox-header"><span>{nombre} · {activePhoto + 1} / {photos.length}</span><button type="button" autoFocus onClick={() => setActivePhoto(-1)} aria-label="Cerrar galería"><X size={24}/></button></div><TalentImage src={photos[activePhoto]} alt={`Fotografía ampliada ${activePhoto + 1} de ${nombre}`}/><div className="tl-lightbox-controls"><button onClick={() => setActivePhoto(n => (n - 1 + photos.length) % photos.length)} aria-label="Foto anterior"><ChevronLeft/> Anterior</button><button onClick={() => setActivePhoto(n => (n + 1) % photos.length)} aria-label="Foto siguiente">Siguiente <ChevronRight/></button></div></div></div>}
  </section>;
}

function MediaButton({ url, icon: Icon, text, onClick, download = false }) {
  const enabled = !!url;
  if (onClick) return <button className="tl-tool-button" type="button" onClick={onClick} disabled={!enabled} title={!enabled ? `Agrega el enlace de ${text.toLowerCase()} en talentosData.js` : undefined}><Icon size={20}/><span>{text}</span><ArrowUpRight size={16}/></button>;
  return enabled ? <a className="tl-tool-button" href={url} target="_blank" rel="noreferrer noopener" {...(download && url.startsWith('/') ? { download: true } : {})}><Icon size={20}/><span>{text}</span><ArrowUpRight size={16}/></a> : <button className="tl-tool-button" type="button" disabled title={`Agrega el enlace de ${text.toLowerCase()} en talentosData.js`}><Icon size={20}/><span>{text}</span><ArrowUpRight size={16}/></button>;
}

export default function TalentoPerfilPage({ slug }) {
  const {items:talentos,loading}=useCatalog('talentos',talentosData);
  const talento = talentos.find(t=>t.slug===slug);
  const [activeVideo, setActiveVideo] = useState(null);
  const [shareMessage, setShareMessage] = useState('');

  if (!talento && loading) return <><Header/><main className="ad-loading">Cargando perfil...</main><Footer/></>;
  if (!talento) return <><Header/><main className="tl-notfound"><div className="container"><p className="tl-eyebrow">404 / PERFIL NO ENCONTRADO</p><h1>este talento<br/><em>no está aquí.</em></h1><p>Verifica el enlace o visita el directorio.</p><a href="/talentos" className="tl-link-return"><ArrowLeft size={20}/> regresar a talentos</a></div></main><Footer/></>;

  const idx = talentos.findIndex(t => t.slug === slug);
  const next = talentos[(idx + 1) % talentos.length];
  const prev = talentos[(idx - 1 + talentos.length) % talentos.length];
  const pictures = talento.galeria?.length ? talento.galeria : [talento.foto];

  async function shareProfile() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: talento.nombre, url });
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); setShareMessage('Enlace copiado'); }
      else { setShareMessage('Copia la URL del navegador'); }
    } catch (err) { if (err?.name !== 'AbortError') setShareMessage('Copia la URL del navegador'); }
  }

  return <><Header/><main className="tl-root tl-profile-main">
    <div className="container tl-breadcrumb"><a href="/">Inicio</a><span>/</span><a href="/talentos">Talentos</a><span>/</span><span>{talento.nombre}</span></div>
    <section className="tl-profile-hero"><div className="container tl-profile-grid">
      <div className="tl-profile-image-wrap"><div className="tl-profile-photo"><TalentImage src={talento.foto} alt={`Retrato principal de ${talento.nombre}`}/><span className="tl-photo-demo">{talento.demo ? 'PERFIL DE EJEMPLO · FOTO EDITABLE' : 'LA CASA DEL ACTOR · PERFIL ARTÍSTICO'}</span></div><span className="tl-image-sign">LA CASA DEL ACTOR <span>✳</span> TALENTOS</span></div>
      <div className="tl-profile-headline"><p className="tl-eyebrow"><span className="tl-spark">✳</span> PERFIL ARTÍSTICO / {talento.categoria.toUpperCase()}</p><h1>{talento.nombre}</h1><div className="tl-role-row"><strong>{talento.especialidad}</strong><span>{talento.ciudad}, {talento.pais}</span></div><p className="tl-quote">“{talento.frase}”</p><div className="tl-discipline-row">{talento.disciplinas.map(d => <span key={d}>{d}</span>)}</div><div className="tl-head-actions"><a className="tl-main-button" href="#biografia">conocer su trayectoria <ArrowRight size={20}/></a><button type="button" className="tl-share-button" onClick={shareProfile} aria-label={`Compartir perfil de ${talento.nombre}`}><Share2 size={20}/> compartir</button></div>{shareMessage && <span className="tl-share-status" role="status">{shareMessage}</span>}</div>
    </div></section>

    <section className="tl-bio-section" id="biografia"><div className="container tl-bio-grid"><div className="tl-bio-title"><p className="tl-eyebrow">01 / PRESENTACIÓN</p><h2>su<br/><em>historia.</em></h2><span className="tl-bio-decor" aria-hidden="true">✳</span></div><div className="tl-bio-content"><div className="tl-role-banner">{talento.especialidad} — {talento.disciplinas.join(' · ')}</div>{talento.biografia.map((parrafo, i) => <p key={i}>{parrafo}</p>)}<div className="tl-facts"><h3>Ficha artística</h3><dl>{Object.entries(talento.ficha || {}).map(([nombre, dato]) => <div key={nombre}><dt>{nombre}</dt><dd>{dato}</dd></div>)}</dl></div></div></div></section>

    <section className="tl-tools-section" aria-labelledby="tools-title"><div className="container tl-tools-grid"><div><p className="tl-eyebrow">02 / MATERIAL PROFESIONAL</p><h2 id="tools-title">en <em>acción.</em></h2><p>Accede al reel, video de presentación y currículum artístico cuando se hayan cargado.</p></div><div className="tl-tools-list"><MediaButton url={talento.reel} icon={PlayCircle} text="Ver reel" onClick={() => setActiveVideo({ url: talento.reel, title: `Reel de ${talento.nombre}` })}/><MediaButton url={talento.presentacion} icon={Video} text="Video de presentación" onClick={() => setActiveVideo({ url: talento.presentacion, title: `Presentación de ${talento.nombre}` })}/><MediaButton url={talento.cv} icon={Download} text="Descargar CV" download={true}/>{talento.instagram && <MediaButton url={talento.instagram} icon={Instagram} text="Instagram"/>}{talento.contacto && <MediaButton url={`mailto:${talento.contacto}`} icon={Mail} text="Contacto"/>}<p className="tl-tools-help">Los botones de material sin enlace se muestran desactivados. Edita <code>src/data/talentosData.js</code> para habilitarlos.</p></div></div></section>

    {talento.experiencia?.length > 0 && <section className="tl-credits-section"><div className="container"><div className="tl-subhead"><div><p className="tl-eyebrow">03 / TRAYECTORIA</p><h2>trabajos <em>seleccionados.</em></h2></div><span>CRÉDITOS DE EJEMPLO</span></div><div className="tl-credits-table">{talento.experiencia.map((item, i) => <div className="tl-credit-row" key={i}><span>{item.anio}</span><strong>{item.proyecto}</strong><span>{item.rol}</span><span>{item.formato}</span></div>)}</div></div></section>}

    <Gallery photos={pictures} nombre={talento.nombre}/>

    <nav className="tl-profile-navigate container" aria-label="Más talentos"><a href={`/talentos/${prev.slug}`}><ArrowLeft size={22}/><span><small>ANTERIOR TALENTO</small><strong>{prev.nombre}</strong></span></a><a href="/talentos" className="tl-all-profiles">ver todos los talentos <ArrowUpRight size={19}/></a><a href={`/talentos/${next.slug}`}><span><small>SIGUIENTE TALENTO</small><strong>{next.nombre}</strong></span><ArrowRight size={22}/></a></nav>
    <p className="container tl-profile-disclaimer">{talento.demo ? 'Perfil ficticio de ejemplo, reemplázalo por material autorizado.' : 'Ficha artística publicada por La Casa del Actor.'}</p>
  </main><Footer/>{activeVideo && <MediaModal reel={activeVideo.url} title={activeVideo.title} onClose={() => setActiveVideo(null)} />}</>;
}
