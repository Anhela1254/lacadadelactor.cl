import test from 'node:test';
import assert from 'node:assert/strict';
import {projectInput,activeMember,activeCreator,validateActivity,validateRoom,emailValid} from '../server/community.js';
test('El proyecto requiere una categoría y contenido suficiente',()=>{
 assert.throws(()=>projectInput({titulo:'hola',categoria:'Teatro',descripcion:'Corto',busca:'Actores'}));
 assert.equal(projectInput({titulo:'Nuevo cortometraje',categoria:'Cortometraje',descripcion:'Una historia de familias y encuentros en la ciudad.',busca:'Actores con experiencia teatral',ciudad:'Santiago'}).categoria,'Cortometraje');
});
test('Solo miembros activos acceden a recursos internos',()=>{
 assert.equal(activeMember({rol:'actor',estado:'aprobado'},true),true);
 assert.equal(activeMember({rol:'actor',estado:'revision'},true),false);
 assert.equal(activeMember({rol:'actor',estado:'demo',demo:true},true),false);
 assert.equal(activeMember({rol:'actor',estado:'demo',demo:true},false),true);
 assert.equal(activeCreator({rol:'productor',estado:'aprobado'},true),true);
});
test('Horario de sala debe tener comienzo previo al final',()=>{
 assert.throws(()=>validateRoom({fecha:'2099-11-01',inicio:'18:00',fin:'12:00',proposito:'Lectura para obra'}));
 assert.equal(validateRoom({fecha:'2099-11-01',inicio:'15:00',fin:'16:00',proposito:'Ensayo de teatro'}).inicio,'15:00');
});
test('Actividades requieren fechas válidas y email se comprueba',()=>{
 assert.throws(()=>validateActivity({titulo:'Curso de teatro',fecha:'ayer',descripcion:'Curso de introducción'}));
 assert.equal(validateActivity({titulo:'Curso de teatro',fecha:'2099-11-01',descripcion:'Curso de introducción'}).publicado,undefined);
 assert.equal(emailValid('ejemplo@correo.cl'),true);
 assert.equal(emailValid('esto no es correo'),false);
});
