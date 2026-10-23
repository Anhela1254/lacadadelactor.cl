import test from 'node:test';
import assert from 'node:assert/strict';
import {hashPassword,checkPassword} from '../server/security.js';
import {normalizeEntry,slugify} from '../server/catalog.js';

test('contraseñas: scrypt con salt único y comparación segura',()=>{
 const p='EJEMPLO-Contraseña-Fuerte-23423';const hash1=hashPassword(p);const hash2=hashPassword(p);
 assert.notEqual(hash1,hash2);assert.ok(checkPassword(p,hash1));assert.ok(!checkPassword('invalida',hash1));
});
test('identificadores seguros y campos validados',()=>{
 assert.equal(slugify('¡Noticia sobre Actuación!'),'noticia-sobre-actuacion');
 const entry=normalizeEntry('castings',{titulo:'Nueva Producción',requisitos:['Trabajo con cámara'],postulacionUrl:'javascript:alert(1)',imagen:'/images/mi-foto.png'});
 assert.equal(entry.id,'nueva-produccion');assert.equal(entry.postulacionUrl,'');assert.equal(entry.imagen,'/images/mi-foto.png');
 assert.throws(()=>normalizeEntry('blog',{titulo:'a'}));
});
test('nueva noticia y nuevo talento reciben estructura utilizable',()=>{
 const a=normalizeEntry('blog',{titulo:'Anuncio de nuevo casting',contenido:[{subtitulo:'Información',texto:'Una nueva convocatoria'}]});
 const t=normalizeEntry('talentos',{nombre:'Artista de Prueba',disciplinas:['Cine'],biografia:['Experiencia']});
 assert.equal(a.slug,'anuncio-de-nuevo-casting');assert.equal(t.slug,'artista-de-prueba');assert.ok(Array.isArray(t.galeria));assert.equal(a.contenido[0].subtitulo,'Información');
});
