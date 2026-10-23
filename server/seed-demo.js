/** Comando manual opcional: npm run demo:crear. */
import { seedDemoAccounts, demoAccounts } from './demo-accounts.js';
try {
  const roles=await seedDemoAccounts();
  console.log(roles.length ? `Cuentas DEMO creadas: ${roles.join(', ')}` : 'Las cuentas demo ya existen. No se modificaron.');
  console.log('Cuentas disponibles SOLO para pruebas locales:');
  for (const account of demoAccounts) console.log(`- ${account.rol}: ${account.correo} / ${account.password}`);
  console.log('En producción las cuentas DEMO no pueden iniciar sesión.');
} catch (error) {
  console.error(error.message); process.exitCode=1;
}
