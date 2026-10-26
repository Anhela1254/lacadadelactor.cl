/** Validaciones del módulo Comunidad, sin depender de React. */
export const textField=(value,max=200)=>typeof value==='string'?value.trim().replace(/\s+/g,' ').slice(0,max):'';
export const emailValid=value=>typeof value==='string'&&value.length<=160&&/^\S+@\S+\.\S+$/.test(value);
export const categories=Object.freeze(['Cortometraje','Largometraje','Webserie','Teatro','Podcast','Contenido digital','Otro']);
export function projectInput(form={}){
 const titulo=textField(form.titulo,160),descripcion=textField(form.descripcion,2000),busca=textField(form.busca,900),ciudad=textField(form.ciudad,100);
 if(titulo.length<5||descripcion.length<30||busca.length<10||!categories.includes(form.categoria))throw Error('Completa el título, la descripción, los colaboradores y la categoría del proyecto.');
 return {titulo,descripcion,busca,ciudad:ciudad||'Chile',categoria:form.categoria};
}
export const activeMember=(account,production)=>!!account && account.rol==='actor' && (account.estado==='aprobado'||(!production&&account.demo===true));
export const activeCreator=(account,production)=>!!account && ['actor','productor'].includes(account.rol) && (account.estado==='aprobado'||(!production&&account.demo===true));
export function validateActivity(e={}){
 const titulo=textField(e.titulo,160),descripcion=textField(e.descripcion,1200),categoria=textField(e.categoria,70),lugar=textField(e.lugar,140);
 if(titulo.length<5||descripcion.length<12||!/^\d{4}-\d{2}-\d{2}$/.test(String(e.fecha||''))||Number.isNaN(Date.parse(`${e.fecha}T12:00:00`)))throw Error('Debes introducir nombre, descripción y fecha válida de la actividad.');
 const hora=textField(e.hora,20); if(hora&&!/^\d{2}:\d{2}$/.test(hora))throw Error('La hora no es válida.');
 return {titulo,descripcion,categoria:categoria||'Encuentro',lugar,hora,fecha:e.fecha};
}
export function validateRoom(e={}){
 const {fecha,inicio,fin}=e;const proposito=textField(e.proposito,600);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(String(fecha||''))||!/^\d{2}:\d{2}$/.test(String(inicio||''))||!/^\d{2}:\d{2}$/.test(String(fin||''))||inicio>=fin||proposito.length<8||!Number.isFinite(Date.parse(`${fecha}T12:00:00`))||fecha<new Date().toISOString().slice(0,10))throw Error('Comprueba la fecha futura, el horario y la finalidad de tu solicitud.');
 return {fecha,inicio,fin,proposito};
}
