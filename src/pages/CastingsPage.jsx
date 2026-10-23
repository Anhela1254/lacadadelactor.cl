import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, CalendarDays,
  Check, ChevronDown, Clapperboard, Film, MapPin, Search,
  SlidersHorizontal, Sparkles, Wallet, X
} from 'lucide-react';
import { Header, Footer } from '../App.jsx';
import { castingsData } from '../data/castingsData.js';
import {useCatalog} from '../hooksCatalog.js';

const TODOS = 'Todos';



function IconTag({ children }) {
  return <span className="cd-tag">{children}</span>;
}

function CastingCard({ casting, index, onView, total }) {
  return (
    <article className="cd-card">
      <button
        className="cd-card-image"
        type="button"
        onClick={() => onView(casting)}
        aria-label={`Ver detalles de ${casting.titulo}`}
      >
        <img src={casting.imagen} alt={`Afiche ilustrativo de ${casting.titulo}`} loading="lazy" />
        {casting.demo && <span className="cd-demo-tag">EJEMPLO</span>}
        <span className="cd-card-num">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </button>
      <div className="cd-card-body">
        <div className="cd-card-topline">
          <IconTag>{casting.tipo}</IconTag>
          <span className="cd-payment"><span aria-hidden="true">●</span> {casting.remuneracion}</span>
        </div>
        <h3>{casting.titulo}</h3>
        <p className="cd-production">{casting.productora}</p>
        <p className="cd-excerpt">{casting.descripcion}</p>
        <div className="cd-card-meta">
          <span><MapPin size={15} /> {casting.region}</span>
          <span><CalendarDays size={15} /> Cierre: {casting.cierre}</span>
        </div>
        <button type="button" className="cd-details-button" onClick={() => onView(casting)}>
          ver detalles <ArrowUpRight size={20} />
        </button>
      </div>
    </article>
  );
}

function DetailsModal({ casting, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!casting) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const esc = event => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', esc);
    };
  }, [casting, onClose]);

  if (!casting) return null;
  return (
    <div className="cd-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="cd-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cd-dialog-heading"
        onMouseDown={event => event.stopPropagation()}
      >
        <button ref={closeRef} className="cd-dialog-close" type="button" aria-label="Cerrar detalles" onClick={onClose}>
          <X size={22} />
        </button>
        <div className="cd-dialog-media"><img src={casting.imagen} alt={`Afiche de ejemplo: ${casting.titulo}`} /></div>
        <div className="cd-dialog-body">
          <span className="cd-dialog-kicker">CONVOCATORIA · {casting.tipo.toUpperCase()}</span>
          <h2 id="cd-dialog-heading">{casting.titulo}</h2>
          <p className="cd-dialog-by">{casting.productora}</p>
          <div className="cd-dialog-info">
            <span><MapPin size={17} /> {casting.region}</span>
            <span><Wallet size={17} /> {casting.remuneracion}</span>
            <span><CalendarDays size={17} /> Rodaje: {casting.fechas}</span>
          </div>
          <h3>Sobre el proyecto</h3>
          <p>{casting.descripcion}</p>
          <h3>Perfil solicitado</h3>
          <ul>{casting.requisitos.map(r => <li key={r}><Check size={17} /> {r}</li>)}</ul>
          <div className="cd-dialog-alert">{casting.demo ? 'Este casting es un ejemplo y no representa una convocatoria vigente.' : 'Consulta las condiciones directamente con la productora antes de postular.'}</div>
          {casting.postulacionUrl ? (
            <a className="cd-apply" href={casting.postulacionUrl} target="_blank" rel="noreferrer noopener">
              ir a postulación <ArrowUpRight size={19} />
            </a>
          ) : (
            <button className="cd-apply" type="button" disabled title="Aún no hay postulaciones habilitadas">
              postulación no disponible <ArrowRight size={19} />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CastingsPage() {
  const {items:castings,loading}=useCatalog('castings',castingsData);
  const PAGOS=['Todos',...new Set(castings.map(c=>c.remuneracion))];
  const TYPES=['Todos',...new Set(castings.map(c=>c.tipo))];
  const REGIONS=['Todas las regiones',...new Set(castings.map(c=>c.region))];
  const [search, setSearch] = useState('');
  const [type, setType] = useState(TODOS);
  const [payment, setPayment] = useState(TODOS);
  const [region, setRegion] = useState('Todas las regiones');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = 'Castings disponibles | La Casa del Actor';
    window.scrollTo(0, 0);
    return () => { document.title = oldTitle; };
  }, []);

  const filtered = useMemo(() => {
    const needle = search.toLocaleLowerCase('es').trim();
    return castings.filter(c => (
      (type === TODOS || c.tipo === type) &&
      (payment === TODOS || c.remuneracion === payment) &&
      (region === 'Todas las regiones' || c.region === region) &&
      `${c.titulo} ${c.productora} ${c.descripcion} ${c.region} ${c.tipo}`
        .toLocaleLowerCase('es').includes(needle)
    ));
  }, [search, type, payment, region, castings]);

  const resetFilters = () => {
    setSearch(''); setType(TODOS); setPayment(TODOS); setRegion('Todas las regiones');
  };

  return (
    <>
      <Header />
      <main className="cd-page">
        <section className="cd-hero">
          <div className="container cd-hero-layout">
            <div>
              <div className="cd-breadcrumb"><a href="/">inicio</a><ArrowRight size={13}/><span>castings</span></div>
              <span className="cd-eyebrow"><span className="cd-little-asterisk">✳</span> ESPACIO DE OPORTUNIDADES / LA CASA DEL ACTOR</span>
              <h1>castings<br/><em>disponibles<span>.</span></em></h1>
              <p>Explora proyectos para cine, televisión, publicidad y teatro. Filtra por categoría, remuneración o región y descubre la convocatoria que buscas.</p>
              <a href="#listado" className="cd-hero-cta">explorar convocatorias <ArrowRight size={20} /></a>
            </div>
            <div className="cd-hero-graphic" aria-hidden="true">
              <div className="cd-graphic-disc"><Clapperboard size={100} strokeWidth={1.1}/></div>
              <span className="cd-graphic-star">✳</span>
              <span className="cd-graphic-strip">CASTING · TALENTO · ESCENA ·</span>
              <span className="cd-graphic-stamp">LA ESCENA<br/>TE ESPERA <ArrowUpRight size={26}/></span>
            </div>
          </div>
          <div className="container cd-hero-bottom"><span>PLATAFORMA CREATIVA PARA ARTISTAS</span><span>CONVOCATORIAS Y PROYECTOS — 2026</span></div>
        </section>

        <section className="cd-listing-section" id="listado">
          <div className="container">
            <div className="cd-list-heading">
              <div><span className="cd-small-eyebrow">/01 — TU PRÓXIMO PROYECTO</span><h2>encuentra tu <em>papel.</em></h2></div>
              <p>Una cartelera diseñada para encontrar oportunidades sin perder tiempo. Aquí encontrarás tanto ejemplos como convocatorias publicadas por nuestro equipo.</p>
            </div>

            <div className="cd-notice">
              <div className="cd-notice-icon"><Sparkles size={34}/></div>
              <div className="cd-notice-copy"><span>NUESTRA COMUNIDAD</span><strong>Las grandes historias comienzan con un encuentro.</strong><p>Un espacio para actores, actrices y equipos que necesitan conectar.</p></div>
              <a className="cd-notice-link" href="/#contacto">conocer más <ArrowUpRight size={20} /></a>
              <span className="cd-notice-decor" aria-hidden="true">✳</span>
            </div>

            <div className="cd-toolbar">
              <div className="cd-toolbar-top">
                <h3><SlidersHorizontal size={21}/> filtra tu búsqueda</h3>
                <span><strong>{filtered.length}</strong> {filtered.length === 1 ? 'casting' : 'castings'}</span>
              </div>
              <label className="cd-search">
                <Search size={22}/>
                <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar casting, título, descripción o productora..." aria-label="Buscar castings" />
                {search && <button type="button" onClick={() => setSearch('')} aria-label="Borrar búsqueda"><X size={18}/></button>}
              </label>
              <div className="cd-filter-blocks">
                <div className="cd-filter-group"><span className="cd-filter-name"><Film size={16}/> TIPO</span>
                  <div className="cd-filter-pills">{TYPES.map(t => <button key={t} type="button" className={type === t ? 'active' : ''} aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>)}</div>
                </div>
                <div className="cd-filter-group"><span className="cd-filter-name"><Wallet size={16}/> PAGO</span>
                  <div className="cd-filter-pills">{PAGOS.map(p => <button key={p} type="button" className={payment === p ? 'active' : ''} aria-pressed={payment === p} onClick={() => setPayment(p)}>{p}</button>)}</div>
                </div>
                <div className="cd-filter-group cd-region-group"><label className="cd-filter-name" htmlFor="cd-region"><MapPin size={16}/> REGIÓN</label>
                  <div className="cd-select"><select id="cd-region" value={region} onChange={e => setRegion(e.target.value)}>{REGIONS.map(r => <option key={r} value={r}>{r}</option>)}</select><ChevronDown size={17}/></div>
                </div>
              </div>
            </div>

            <div className="cd-results-head"><span>EXPLORAR CONVOCATORIAS</span><button type="button" onClick={resetFilters}>limpiar filtros <X size={15}/></button></div>
            {filtered.length ? (
              <div className="cd-grid">{filtered.map((casting, index) => <CastingCard key={casting.id} casting={casting} index={index} onView={setSelected} total={castings.length}/>)}</div>
            ) : (
              <div className="cd-empty"><Search size={45}/><h3>No encontramos castings</h3><p>Prueba otra búsqueda o restablece los filtros.</p><button type="button" onClick={resetFilters}>limpiar filtros <ArrowRight size={18}/></button></div>
            )}
            <p className="cd-disclaimer">Los avisos marcados «EJEMPLO» son demostraciones. Confirma siempre las condiciones de una convocatoria antes de participar.</p>
          </div>
        </section>

        <section className="cd-bottom-banner">
          <div className="container cd-bottom-layout"><div><span>¿ESTÁS PREPARANDO UNA PRODUCCIÓN?</span><h2>la próxima historia<br/>puede empezar <em>aquí.</em></h2></div><a href="/#contacto">conocer la plataforma <ArrowUpRight size={21}/></a></div>
        </section>
      </main>
      <Footer />
      <DetailsModal casting={selected} onClose={() => setSelected(null)} />
    </>
  );
}
