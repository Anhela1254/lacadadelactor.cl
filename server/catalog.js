import { castingsData } from '../src/data/castingsData.js';
import { talentosData } from '../src/data/talentosData.js';
import { blogData } from '../src/data/blogData.js';
import { root, readData, updateData } from './store.js';
import fs from 'node:fs/promises';
import path from 'node:path';
export const COLLECTIONS = {castings:'castings.json', talentos:'talentos.json', blog:'blog.json'};
const samples={castings:castingsData,talentos:talentosData,blog:blogData};
export async function seedCatalog(){
  for(const type of Object.keys(COLLECTIONS)){
    try{await fs.access(path.join(root,COLLECTIONS[type]));}
    catch(e){if(e.code!=='ENOENT')throw e;await updateData(COLLECTIONS[type],async rows=>({next:rows.length?rows:samples[type].map(item=>({...item,demo:true,publicado:true})),result:true}));}
  }
}
export async function getCatalog(type){ if(!COLLECTIONS[type])throw new Error('Catálogo no válido'); return await readData(COLLECTIONS[type]); }
export function slugify(v){return String(v||'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);}
const str=(v,max=300)=>typeof v==='string'?v.trim().slice(0,max):'';
const list=(v,max=20)=>Array.isArray(v)?v.map(i=>str(i,500)).filter(Boolean).slice(0,max):[];
const asset=(v)=>{const s=str(v,600);return (/^\/(images|uploads|cv)\/[a-z\d_./-]+$/i.test(s) && !s.includes('..')) || /^https:\/\//.test(s) ? s : '';};
const remote=(v)=>{const s=str(v,600);return !s||(/^https:\/\//.test(s) && !s.includes('\\'))?s:'';};
export function normalizeEntry(type,input,existing){
  const e=input||{};
  const base={...(existing||{}),publicado:e.publicado!==false,demo:false};
  if(type==='castings'){
    const titulo=str(e.titulo,160), id=existing?.id||slugify(e.id||titulo);
    if(titulo.length<3 || !id)throw Error('Escribe el nombre del casting (3 caracteres mínimo).');
    return {...base,id,titulo,productora:str(e.productora,120),tipo:str(e.tipo,70)||'Otro',remuneracion:str(e.remuneracion,60)||'Por definir',region:str(e.region,100)||'Por definir',imagen:asset(e.imagen)||'/images/casting-01.svg',descripcion:str(e.descripcion,2500),requisitos:list(e.requisitos),fechas:str(e.fechas,120),cierre:str(e.cierre,50)||'Por definir',postulacionUrl:remote(e.postulacionUrl)};
  }
  if(type==='talentos'){
    const nombre=str(e.nombre,130), slug=existing?.slug||slugify(e.slug||nombre);
    if(nombre.length<3||!slug)throw Error('Escribe el nombre del talento.');
    return {...base,id:existing?.id||slug,slug,nombre,especialidad:str(e.especialidad,100)||'Artista',categoria:str(e.categoria,100)||'Actores',tipoPerfil:['socio','externo','sin_asignar'].includes(e.tipoPerfil)?e.tipoPerfil:(existing?.tipoPerfil||'sin_asignar'),disciplinas:list(e.disciplinas,12),ciudad:str(e.ciudad,100),pais:str(e.pais,80),foto:asset(e.foto)||'/images/talento-01.svg',galeria:(Array.isArray(e.galeria)?e.galeria:[]).map(asset).filter(Boolean).slice(0,15),frase:str(e.frase,280),biografia:list(e.biografia,12),ficha:Object.fromEntries(Object.entries(e.ficha&&typeof e.ficha==='object'&&!Array.isArray(e.ficha)?e.ficha:{}).slice(0,18).map(([k,v])=>[str(k,70),str(v,200)]).filter(([k])=>k)),experiencia:Array.isArray(e.experiencia)?e.experiencia.slice(0,30).map(x=>({anio:str(x.anio,20),proyecto:str(x.proyecto,150),rol:str(x.rol,100),formato:str(x.formato,80)})):[],reel:remote(e.reel),presentacion:remote(e.presentacion),cv:asset(e.cv),instagram:remote(e.instagram),contacto:str(e.contacto,160)};
  }
  if(type==='blog'){
    const titulo=str(e.titulo,180),slug=existing?.slug||slugify(e.slug||titulo);
    if(titulo.length<3||!slug)throw Error('Escribe un título para la noticia.');
    return {...base,slug,titulo,categoria:str(e.categoria,90)||'Noticias',nivel:str(e.nivel,80)||'General',formato:str(e.formato,60)||'Artículo',lectura:Math.max(1,Math.min(60,Number(e.lectura)||5)),imagen:asset(e.imagen)||'/images/blog-casting.svg',destacado:e.destacado===true,fecha:/^\d{4}-\d\d-\d\d$/.test(e.fecha)?e.fecha:new Date().toISOString().slice(0,10),resumen:str(e.resumen,700),contenido:Array.isArray(e.contenido)?e.contenido.slice(0,30).map(b=>({subtitulo:str(b.subtitulo,180),texto:str(b.texto,7000)})):[]};
  }
  throw Error('Tipo desconocido');
}
export function entryId(type,item){return type==='castings'?String(item.id):item.slug;}
