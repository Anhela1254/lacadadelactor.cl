/** Cuentas de prueba SOLO para desarrollo local. NUNCA se usan en producción. */
import { readData, updateData } from './store.js';
import { hashPassword } from './security.js';

export const demoAccounts = Object.freeze([
  { id:'LCA-DEMO-ACTOR', nombre:'Alex Artista Demo', correo:'actor@demo.local', usuario:'actor_demo', rol:'actor', plan:'activacion', password:'ActorDemo2026!' },
  { id:'LCA-DEMO-PRODUCTOR', nombre:'Patricia Productora Demo', correo:'productor@demo.local', usuario:'productor_demo', rol:'productor', plan:'productora', password:'ProductorDemo2026!' },
  { id:'LCA-DEMO-ADMIN', nombre:'Administrador Demo', correo:'admin@demo.local', usuario:'admin_demo', rol:'administrador', plan:'administracion', password:'AdminDemo2026!' }
]);

export function accountAllowedInEnvironment(account, production = process.env.NODE_ENV === 'production') {
  return Boolean(account) && (!production || account.demo !== true);
}

export async function seedDemoAccounts() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Las cuentas de prueba están deshabilitadas en producción.');
  }
  const result = await updateData('accounts.json', async accounts => {
    const existingEmails = new Set(accounts.map(a => a.correo));
    const existingUsers = new Set(accounts.map(a => a.usuario).filter(Boolean));
    const created=[];
    const next=[...accounts];
    for (const demo of demoAccounts) {
      // Nunca sobrescribir cuentas, contraseñas ni datos que ya existan.
      if (existingEmails.has(demo.correo) || existingUsers.has(demo.usuario) || next.some(a => a.id===demo.id)) continue;
      const {password, ...fields}=demo;
      next.push({...fields, demo:true, estado:'demo', passwordHash:hashPassword(password), recibo:null, creado:new Date().toISOString()});
      created.push(demo.rol);
    }
    return { next, result:created };
  });
  return result;
}
