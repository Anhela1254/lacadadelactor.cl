import {useEffect,useState} from 'react';
export function useCatalog(type,fallback=[]){
  const [items,setItems]=useState(fallback);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const controller=new AbortController();
    fetch(`/api/contenido/${type}`,{signal:controller.signal,cache:'no-store'})
      .then(r=>{if(!r.ok)throw Error('API no disponible');return r.json();})
      .then(data=>setItems(Array.isArray(data.items)?data.items:fallback))
      .catch(()=>{})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[type]);
  return {items,loading};
}
export async function apiJson(url,options={}){
 const response=await fetch(url,{credentials:'same-origin',...options,headers:{'Content-Type':'application/json',...(options.headers||{})}});
 let data={};try{data=await response.json();}catch{}
 if(!response.ok)throw new Error(data.error||'Ocurrió un error al comunicar con el servidor.');return data;
}
