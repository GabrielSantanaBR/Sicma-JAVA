import {test, before, after} from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {createServer} from '../server.mjs';
import {readFile} from 'node:fs/promises';
import {media} from '../src/data/media.mjs';
let server, base;
before(async()=>{server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;});
after(()=>new Promise(resolve=>server.close(resolve)));
test('home, assets and 28 prepared media slots load without external resources',async()=>{
 const response=await fetch(base);assert.equal(response.status,200);const html=await response.text();
 assert.match(html,/Matemática<br>que/);assert.equal((html.match(/role="tab"/g)||[]).length,7);
 assert.equal((html.match(/class="student student-/g)||[]).length,6);
 assert.equal((html.match(/class="timeline-year"/g)||[]).length,7);
 assert.equal(Object.keys(media).length,28);
 assert.ok(!html.includes('href="#"'));assert.ok(!html.includes('Editar site'));
 for(const path of new Set([...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(m=>m[1]))){const r=await fetch(base+path);assert.equal(r.status,200,path);assert.ok(Number(r.headers.get('content-length'))>0,path);}
 for(const match of html.matchAll(/href="#([^" ]+)"/g))assert.ok(html.includes(`id="${match[1]}"`),match[1]);
});
test('health, HEAD, unsupported methods, missing pages and malformed paths',async()=>{
 assert.equal((await(await fetch(base+'/health')).json()).service,'sicma-web');
 const head=await fetch(base,{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
 assert.equal((await fetch(base,{method:'POST'})).status,405);
 assert.equal((await fetch(base+'/missing-page')).status,404);
 assert.equal((await fetch(base+'/images/does-not-exist.webp')).status,404);
 assert.equal((await fetch(base+'/%ZZ')).status,400);
 const forbidden=await new Promise(resolve=>{http.get(base+'/%2e%2e%2fpackage.json',r=>{r.resume();resolve(r.statusCode);});});assert.equal(forbidden,403);
});
test('restrictive CSP, correct asset MIME and no remote runtime dependencies',async()=>{
 const r=await fetch(base);assert.match(r.headers.get('content-security-policy'),/frame-ancestors 'none'/);assert.equal(r.headers.get('x-content-type-options'),'nosniff');
 assert.match((await fetch(base+'/styles.css')).headers.get('content-type'),/text\/css/);
 assert.match((await fetch(base+'/app.js')).headers.get('content-type'),/javascript/);
 const css=await readFile(new URL('../dist/styles.css',import.meta.url),'utf8');
 for(const match of css.matchAll(/url\('(.*?)'\)/g))assert.equal((await fetch(base+match[1])).status,200,match[1]);
});
