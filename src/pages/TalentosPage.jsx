import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { Header, Footer } from '../App.jsx';
import { talentosData } from '../data/talentosData.js';
import {useCatalog} from '../hooksCatalog.js';
import './Talentos.css';

export function TalentImage({ src, alt, className = '' }) {
  const fallback = '/images/talento-01.svg';
  return (
    <img
      src={src || fallback}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(event) => {
        if (!event.currentTarget.src.endsWith(fallback)) event.currentTarget.src = fallback;
      }}
    />
  );
}

function TalentCard({ talento, index }) {
  return (
    <a className="tl-card" href={`/talentos/${talento.slug}`} aria-label={`Ver perfil de ${talento.nombre}`}>
      <div className="tl-photo">
        <TalentImage src={talento.foto} alt={`Imagen de perfil de ${talento.nombre}`} />
        <div className="tl-photo-overlay">
          <span>CONOCE SU PERFIL</span>
          <span className="tl-photo-arrow"><ArrowUpRight size={26} /></span>
        </div>
        <span className="tl-photo-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="tl-card-caption">
        <div><h3>{talento.nombre}</h3><span>{talento.especialidad} · {talento.ciudad}</span></div>
        <ArrowUpRight size={21} aria-hidden="true" />
      </div>
    </a>
  );
}

export default function TalentosPage() {
  const {items:talentos}=useCatalog('talentos',talentosData);
  const TALENT_CATEGORIES=['Todos',...new Set(talentos.map(x=>x.categoria))];
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('original');

  const filtrados = useMemo(() => {
    const palabra = busqueda.trim().toLocaleLowerCase('es');
    const items = talentos.filter((t) => {
      const coincideCategoria = categoria === 'Todos' || t.categoria === categoria;
      const texto = `${t.nombre} ${t.ciudad} ${t.pais} ${t.especialidad} ${t.disciplinas.join(' ')}`.toLocaleLowerCase('es');
      return coincideCategoria && texto.includes(palabra);
    });
    if (orden === 'az') items.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    if (orden === 'za') items.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'));
    return items;
  }, [categoria, busqueda, orden, talentos]);

  function clearFilters() { setCategoria('Todos'); setBusqueda(''); setOrden('original'); }

  return <><Header />
    <main className="tl-root" id="contenido-principal">
      <section className="tl-intro">
        <div className="container tl-intro-grid">
          <div>
            <p className="tl-eyebrow"><span className="tl-spark">✳</span> LA CASA DEL ACTOR / DIRECTORIO</p>
            <h1>rostros con<br /><em>historia.</em></h1>
            <p className="tl-intro-lead">Una vitrina para quienes crean, interpretan y transforman historias delante y detrás de cámara.</p>
            <a href="#explorar-talentos" className="tl-down">explora nuestros talentos <ArrowDownRight size={20} /></a>
          </div>
          <div className="tl-intro-art" aria-hidden="true">
            <div className="tl-orbit"></div>
            <span className="tl-intro-shape">✳</span>
            <div className="tl-art-pill">DIRECTORIO<br/>ARTÍSTICO <ArrowUpRight size={20}/></div>
            <span className="tl-art-index">TALENTOS / 001 — {String(talentos.length).padStart(3, '0')}</span>
          </div>
        </div>
      </section>

      <section className="tl-catalog container" id="explorar-talentos" aria-labelledby="talentos-title">
        <div className="tl-catalog-head">
          <div>
            <p className="tl-eyebrow">PERFILES / CINE / TEATRO / AUDIOVISUAL</p>
            <h2 id="talentos-title">conoce al <em>elenco.</em></h2>
          </div>
          <p className="tl-catalog-copy">Selecciona un rostro para abrir su ficha personal: galería fotográfica, presentación, trayectoria, material audiovisual y currículum.</p>
        </div>

        <div className="tl-filterbox">
          <div className="tl-categories" role="group" aria-label="Filtrar por profesión">
            {TALENT_CATEGORIES.map((cat) => <button key={cat} type="button" className={`tl-category ${categoria === cat ? 'is-selected' : ''}`} onClick={() => setCategoria(cat)} aria-pressed={categoria === cat}>{cat}</button>)}
          </div>
          <div className="tl-searchrow">
            <label className="tl-search"><Search size={20} aria-hidden="true" /><input value={busqueda} onChange={event => setBusqueda(event.target.value)} placeholder="Buscar por nombre, ciudad o especialidad..." aria-label="Buscar talentos" />{busqueda && <button onClick={() => setBusqueda('')} title="Limpiar búsqueda" aria-label="Limpiar búsqueda"><X size={17}/></button>}</label>
            <label className="tl-sort"><SlidersHorizontal size={18}/><span className="sr-only">Ordenar perfiles</span><select value={orden} onChange={event => setOrden(event.target.value)}><option value="original">Orden original</option><option value="az">Nombre A–Z</option><option value="za">Nombre Z–A</option></select></label>
          </div>
        </div>

        <div className="tl-results-count"><span>{filtrados.length} {filtrados.length === 1 ? 'talento' : 'talentos'}</span><span>PERFILES DEMOSTRATIVOS · FOTOS EDITABLES</span></div>
        {filtrados.length ? <div className="tl-grid">{filtrados.map((talento, index) => <TalentCard key={talento.slug} talento={talento} index={index}/>)}</div> : <div className="tl-no-results"><Search size={40}/><h3>No encontramos perfiles</h3><p>Intenta otro nombre, ciudad o categoría.</p><button type="button" className="tl-reset" onClick={clearFilters}>Limpiar filtros <ArrowRight size={18}/></button></div>}
        <p className="tl-note">* Los nombres, biografías y créditos incluidos son ejemplos ficticios. Reemplázalos por datos e imágenes autorizados antes de publicar tu plataforma.</p>
      </section>
      <section className="tl-cta"><div className="container tl-cta-inner"><span className="tl-eyebrow">ENCUENTRA TU SIGUIENTE HISTORIA</span><h2>el talento hace<br/><em>la diferencia.</em></h2><a href="/castings" className="tl-cta-button">ver oportunidades <ArrowUpRight size={20}/></a></div></section>
    </main><Footer/></>;
}
