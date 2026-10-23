import {randomBytes,scryptSync,timingSafeEqual} from 'node:crypto';
export function hashPassword(password){const salt=randomBytes(18).toString('hex');const hash=scryptSync(password,salt,64).toString('hex');return `${salt}:${hash}`;}
export function checkPassword(password,record){try{const [salt,hex]=record.split(':');const expected=Buffer.from(hex,'hex');const input=scryptSync(password,salt,expected.length);return expected.length===input.length && timingSafeEqual(expected,input);}catch{return false;}}
