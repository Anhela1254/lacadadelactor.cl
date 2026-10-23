import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock3, Copy, Check, Share2 } from 'lucide-react';
import { Header, Footer } from '../App.jsx';
import { blogData } from '../data/blogData.js';
import {useCatalog} from '../hooksCatalog.js';
import './NuevasSecciones.css';

export default function BlogArticlePage({slug}) {
  const {items:articulos,loading}=useCatalog('blog',blogData);
  const article = articulos.find(a=>a.slug === slug);
  const [copied,setCopied] = useState(false);
  useEffect(()=>{document.title = `${article?.titulo || 'Artículo no encontrado'} | La Casa del Actor`;window.scrollTo(0,0);},[article]);
  async function share(){try{await navigator.clipboard.writeText(window.location.href);setCopied(true);}catch{setCopied(false);}}
  if (!article && loading) return <><Header/><main className="lc-page lc-notfound container">Cargando noticia...</main><Footer/></>;
  if (!article) return <><Header/><main className="lc-page lc-notfound container"><h1>Artículo no encontrado.</h1><a className="lc-btn lc-btn-dark" href="/blog"><ArrowLeft/> Volver al blog</a></main><Footer/></>;
  const more = articulos.filter(a=>a.slug!==slug).slice(0,3);
  return <><Header/><main className="lc-page"><article className="lc-post"><div className="container lc-post-head">
    <a href="/blog" className="lc-back"><ArrowLeft size={19}/> Volver al blog</a>
    <div className="lc-post-labels"><span>{article.categoria}</span><span>{article.nivel}</span><span><Clock3 size={15}/> {article.lectura} min de lectura</span></div>
    <h1>{article.titulo}<span>.</span></h1><p>{article.resumen}</p>
    <div className="lc-post-actions"><time dateTime={article.fecha}>Publicado: {article.fecha}</time><button type="button" onClick={share}>{copied?<Check size={17}/>:<Copy size={17}/>} {copied?'Enlace copiado':'Copiar enlace'}</button></div>
  </div><div className="container lc-post-image"><img src={article.imagen} alt={`Imagen de ${article.titulo}`}/></div>
  <div className="container lc-post-body"><p className="lc-post-intro">En La Casa del Actor compartimos experiencias y recursos para acompañar tu desarrollo artístico. Aquí tienes algunas ideas para poner en práctica.</p>{article.contenido.map((block,i)=><section key={i}><h2>{String(i+1).padStart(2,'0')} / {block.subtitulo}</h2><p>{block.texto}</p></section>)}<div className="lc-post-final"><Share2 size={22}/><span>¿Te resultó útil? Comparte este artículo con tu comunidad.</span><button type="button" onClick={share}>{copied?'Copiado':'Compartir enlace'}</button></div></div></article>
    <section className="container lc-section"><div className="lc-heading"><span className="lc-overline">SIGUE EXPLORANDO</span><h2>más <em>lecturas.</em></h2></div><div className="lc-article-grid">{more.map(a=><a href={`/blog/${a.slug}`} className="lc-article" key={a.slug}><div className="lc-article-image"><img src={a.imagen} alt={a.titulo} loading="lazy"/></div><div className="lc-article-inner"><span className="lc-overline">{a.categoria} · {a.lectura} MIN</span><h3>{a.titulo}</h3><span className="lc-inline-link">leer artículo <ArrowRight size={17}/></span></div></a>)}</div></section>
  </main><Footer/></>;
}
