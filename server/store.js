import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { randomBytes } from 'node:crypto';

// Fuera de la carpeta del frontend: Vite NO debe poder servir cuentas ni recibos.
export const root = path.resolve(process.env.LCA_DATA_DIR || path.join(os.homedir(), '.la-casa-del-actor-data')); 
const safeFiles = new Set(['accounts.json','requests.json','castings.json','talentos.json','blog.json','propuestas.json']);
let queue = Promise.resolve();
export async function initialize(){ await fs.mkdir(path.join(root,'comprobantes'),{recursive:true,mode:0o700}); }
export async function readData(name){
  if(!safeFiles.has(name))throw new Error('Invalid storage file');
  await initialize();
  try { return JSON.parse(await fs.readFile(path.join(root,name),'utf8')); }
  catch(error){if(error.code==='ENOENT') return []; throw error;}
}
export async function updateData(name, updater){
  // Cola de escrituras dentro de UN proceso; para despliegues con múltiples procesos usa PostgreSQL.
  const job=queue.catch(()=>{}).then(async()=>{
    const current=await readData(name);
    const {next,result}=await updater(current);
    if(!Array.isArray(next))throw new Error('Storage result must be an array');
    const target=path.join(root,name);
    const temp=target+'.'+randomBytes(9).toString('hex')+'.tmp';
    await fs.writeFile(temp,JSON.stringify(next,null,2),{mode:0o600});
    await fs.rename(temp,target);
    return result;
  });
  queue=job.catch(()=>{});
  return job;
}
