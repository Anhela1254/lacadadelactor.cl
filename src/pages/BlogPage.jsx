import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Clock3, Search, SlidersHorizontal, X } from 'lucide-react';
import { Header, Footer } from '../App.jsx';
import { blogData } from '../data/blogData.js';
import {useCatalog} from '../hooksCatalog.js';
import './NuevasSecciones.css';

const normalize = value => String(value).toLocaleLowerCase('es');
const PAGE_SIZE = 6;
function ArticleCard({ article, featured = false }) {
  return <a className={`lc-article ${featured ? 'lc-article-featured' : ''}`} href={`/blog/${article.slug}`}>
    <div className="lc-article-image"><img src={article.imagen} alt={`Portada: ${article.titulo}`} loading="lazy" />
      {featured && <span className="lc-image-label">✳ DESTACADO</span>}</div>
    <div className="lc-article-inner"><div className="lc-article-meta"><span>{article.categoria.toUpperCase()}</span><span>{article.nivel}</span><span><Clock3 size={14}/> {article.lectura} min</span></div>
      <h3>{article.titulo}</h3><p>{article.resumen}</p><span className="lc-inline-link">leer artículo <ArrowUpRight size={19}/></span></div>
  </a>;
}
export default function BlogPage() {
  const {items:articulos}=useCatalog('blog',blogData);
  const BLOG_CATEGORIES=['Todas',...new Set(articulos.map(a=>a.categoria))];
  const BLOG_LEVELS=['Todos',...new Set(articulos.map(a=>a.nivel))];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [level, setLevel] = useState('Todos');
  const [page, setPage] = useState(1);
  useEffect(() => { document.title = 'Blog y formación | La Casa del Actor'; window.scrollTo(0, 0); }, []);
  const filtered = useMemo(() => articulos.filter(article => {
    const term = normalize(`${article.titulo} ${article.resumen} ${article.categoria} ${article.formato}`);
    return (category === 'Todas' || article.categoria === category) && (level === 'Todos' || article.nivel === level) && term.includes(normalize(query.trim()));
  }), [query, category, level, articulos]);
  const updateQuery = value => { setQuery(value); setPage(1); };
  const updateCategory = value => { setCategory(value); setPage(1); };
  const updateLevel = value => { setLevel(value); setPage(1); };
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clear = () => { setQuery(''); setCategory('Todas'); setLevel('Todos'); setPage(1); };
  return <><Header/><main className="lc-page">
    <section className="lc-hero lc-blog-hero"><div className="container lc-hero-grid"><div>
      <p className="lc-overline">✳ LA CASA DEL ACTOR / FORMACIÓN Y CULTURA</p>
      <h1>ideas para<br/><em>salir a escena.</em></h1>
      <p className="lc-hero-description">Artículos, guías y herramientas para que sigas explorando tu oficio, dentro y fuera del escenario.</p>
      <a href="#articulos" className="lc-btn lc-btn-dark">descubre las lecturas <ArrowRight size={19}/></a>
    </div><div className="lc-hero-art lc-book-art" aria-hidden="true"><BookOpen strokeWidth={.95}/><span>ACTUAR<br/>ES SEGUIR<br/>APRENDIENDO.</span></div></div></section>
    <section id="articulos" className="container lc-section"><div className="lc-heading"><span className="lc-overline">01 / NUESTRO ARCHIVO</span><h2>explora el <em>blog.</em></h2><p>Noticias, artículos y guías publicados por nuestro equipo.</p></div>
      <div className="lc-filters"><label className="lc-search"><Search size={21}/><input type="search" placeholder="Buscar técnicas, casting, consejos..." value={query} onChange={e=>updateQuery(e.target.value)} aria-label="Buscar artículos" />{query && <button type="button" onClick={()=>updateQuery('')} aria-label="Limpiar búsqueda"><X size={18}/></button>}</label>
        <div className="lc-filter-title"><SlidersHorizontal size={18}/> CATEGORÍA</div><div className="lc-chips">{BLOG_CATEGORIES.map(v=><button type="button" aria-pressed={v===category} className={v===category?'selected':''} onClick={()=>updateCategory(v)} key={v}>{v}</button>)}</div>
        <div className="lc-filter-title">NIVEL</div><div className="lc-chips">{BLOG_LEVELS.map(v=><button type="button" aria-pressed={v===level} className={v===level?'selected':''} onClick={()=>updateLevel(v)} key={v}>{v}</button>)}</div>
      </div>
      <div className="lc-list-meta"><span>{filtered.length} {filtered.length===1?'publicación':'publicaciones'}</span><span>LECTURAS / LA CASA DEL ACTOR</span></div>
      {visible.length ? <div className="lc-article-grid">{visible.map((a,idx)=><ArticleCard key={a.slug} article={a} featured={page===1 && idx===0 && !query && category==='Todas' && level==='Todos'}/>)}</div>
      : <div className="lc-empty"><Search size={38}/><h3>No encontramos artículos</h3><p>Prueba otra búsqueda o limpia los filtros.</p><button className="lc-btn lc-btn-dark" type="button" onClick={clear}>limpiar filtros <X size={17}/></button></div>}
      {pages>1 && <nav className="lc-pagination" aria-label="Páginas de artículos"><button type="button" disabled={page===1} onClick={()=>{setPage(p=>Math.max(1,p-1)); document.getElementById('articulos')?.scrollIntoView();}}><ChevronLeft/> Anterior</button>{Array.from({length:pages},(_,i)=>i+1).map(i=><button key={i} type="button" className={i===page?'current':''} aria-current={i===page?'page':undefined} onClick={()=>{setPage(i);document.getElementById('articulos')?.scrollIntoView();}}>{i}</button>)}<button type="button" disabled={page===pages} onClick={()=>{setPage(p=>Math.min(pages,p+1));document.getElementById('articulos')?.scrollIntoView();}}>Siguiente <ChevronRight/></button></nav>}
    </section>
    <section className="lc-cta-band"><div className="container"><span>UN ESPACIO PARA COMPARTIR CONOCIMIENTO</span><h2>la práctica también<br/><em>se aprende.</em></h2><a href="/talentos" className="lc-btn lc-btn-white">explorar talentos <ArrowUpRight size={20}/></a></div></section>
  </main><Footer/></>;
}
