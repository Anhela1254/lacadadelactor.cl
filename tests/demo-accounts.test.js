import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {checkPassword} from '../server/security.js';
import {demoAccounts,accountAllowedInEnvironment} from '../server/demo-accounts.js';

const projectRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function cli(root,env={}){
  return spawnSync(process.execPath,['server/seed-demo.js'],{cwd:projectRoot,env:{...process.env,LCA_DATA_DIR:root,...env},encoding:'utf8'});
}

test('se crean 3 perfiles con contraseñas cifradas, se reconocen los roles y no se duplican',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'lca-perfiles-demo-'));
  try {
    const r1=cli(root);assert.equal(r1.status,0,r1.stderr);
    const accounts=JSON.parse(fs.readFileSync(path.join(root,'accounts.json'),'utf8'));
    assert.equal(accounts.length,3);
    for(const sample of demoAccounts){
      const account=accounts.find(a=>a.correo===sample.correo);
      assert.ok(account,`Falta ${sample.rol}`);
      assert.equal(account.rol,sample.rol);
      assert.equal(account.demo,true);
      assert.equal(account.estado,'demo');
      assert.ok(checkPassword(sample.password,account.passwordHash));
      assert.ok(!JSON.stringify(account).includes(sample.password));
      assert.equal(accountAllowedInEnvironment(account,false),true);
      assert.equal(accountAllowedInEnvironment(account,true),false);
    }
    const r2=cli(root);assert.equal(r2.status,0,r2.stderr);
    assert.equal(JSON.parse(fs.readFileSync(path.join(root,'accounts.json'),'utf8')).length,3);
    const r3=cli(root,{NODE_ENV:'production'});assert.notEqual(r3.status,0);
    assert.equal(JSON.parse(fs.readFileSync(path.join(root,'accounts.json'),'utf8')).length,3);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});

test('no se sobrescriben cuentas existentes por el seed DEMO',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'lca-demo-original-'));
  try {
    fs.writeFileSync(path.join(root,'accounts.json'),JSON.stringify([{
      id:'CUENTA-REAL',correo:'actor@demo.local',usuario:'real_user',rol:'actor',nombre:'Cuenta original',passwordHash:'hash-existente',estado:'revision'
    }]));
    const result=cli(root);assert.equal(result.status,0,result.stderr);
    const accounts=JSON.parse(fs.readFileSync(path.join(root,'accounts.json'),'utf8'));
    assert.equal(accounts.length,3);
    const original=accounts.find(a=>a.id==='CUENTA-REAL');
    assert.ok(original);assert.equal(original.nombre,'Cuenta original');assert.equal(original.passwordHash,'hash-existente');assert.equal(original.demo,undefined);
  } finally {fs.rmSync(root,{recursive:true,force:true});}
});
