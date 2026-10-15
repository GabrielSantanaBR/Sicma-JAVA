import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('./dist/', import.meta.url));
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.avif':'image/avif','.ttf':'font/ttf','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
export const security = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
  'X-Content-Type-Options':'nosniff', 'X-Frame-Options':'DENY',
  'Referrer-Policy':'strict-origin-when-cross-origin',
  'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy':'same-origin',
};
export async function app(req, res) {
  for (const [key,value] of Object.entries(security)) res.setHeader(key,value);
  if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405, {'Allow':'GET, HEAD'});return res.end('Método não permitido');}
  let pathname;
  try { pathname = decodeURIComponent((req.url || '/').split('?')[0]); }
  catch {res.writeHead(400);return res.end('Endereço inválido');}
  if (pathname === '/health') {res.writeHead(200, {'Content-Type':mime['.json'],'Cache-Control':'no-store'});return res.end(req.method === 'HEAD' ? undefined : JSON.stringify({status:'ok',service:'sicma-web',version:'2.0.0'}));}
  if (pathname.includes('\0') || pathname.includes('\\') || pathname.split('/').includes('..')) {res.writeHead(403);return res.end('Acesso negado');}
  const target = path.resolve(root, '.'+(pathname==='/'?'/index.html':pathname));
  if (!target.startsWith(root)) {res.writeHead(403);return res.end('Acesso negado');}
  try {
    const body = await readFile(target);
    res.writeHead(200, {'Content-Type':mime[path.extname(target)]||'application/octet-stream','Content-Length':body.length,'Cache-Control':path.extname(target)==='.html'?'no-cache':'public, max-age=3600'});
    res.end(req.method==='HEAD'?undefined:body);
  } catch (error) {res.writeHead(['ENOENT','EISDIR','ENOTDIR'].includes(error.code)?404:500, {'Content-Type':mime['.txt']});res.end(req.method==='HEAD'?undefined:'Página não encontrada');}
}
export function createServer() {return http.createServer((req,res)=>app(req,res).catch(()=>{if(!res.headersSent)res.writeHead(500);res.end('Erro interno');}));}
if (process.argv[1]===fileURLToPath(import.meta.url)) {
  const server=createServer();
  server.listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('SICMA listening on port '+(process.env.PORT||3000)));
  process.on('SIGTERM',()=>server.close(()=>process.exit(0)));
}
