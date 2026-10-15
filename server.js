"use strict";
const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.join(__dirname, "public");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};
const security = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"
};
const app = async (req, res) => {
  for (const [name, value] of Object.entries(security)) res.setHeader(name, value);
  if (req.url === "/health" || req.url === "/health/") {
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8", "Cache-Control":"no-store"});
    return res.end(req.method === "HEAD" ? undefined : JSON.stringify({status:"ok",service:"sicma-mathema"}));
  }
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, {"Allow":"GET, HEAD", "Content-Type":"text/plain; charset=utf-8"});
    return res.end("Metodo nao permitido");
  }
  let pathname;
  try {
    pathname = new URL(req.url || "/", "http://localhost").pathname;
    pathname = decodeURIComponent(pathname);
  } catch {
    res.writeHead(400); return res.end("Endereco invalido");
  }
  if (pathname.includes("\0") || pathname.split("/").includes("..")) {
    res.writeHead(403); return res.end("Acesso negado");
  }
  const file = path.resolve(root, "." + (pathname === "/" ? "/index.html" : pathname));
  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403); return res.end("Acesso negado");
  }
  let body;
  try {
    body = await fs.readFile(file);
  } catch (err) {
    res.writeHead(err.code === "ENOENT" || err.code === "EISDIR" ? 404 : 500, {"Content-Type":"text/plain; charset=utf-8"});
    return res.end("Pagina nao encontrada");
  }
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, {
    "Content-Type": types[ext] || "application/octet-stream",
    "Content-Length": String(body.length),
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
  });
  res.end(req.method === "HEAD" ? undefined : body);
};
if (require.main === module) {
  const server = http.createServer((req, res) => {
    app(req, res).catch(() => {
      if (!res.headersSent) res.writeHead(500);
      res.end("Erro interno");
    });
  });
  server.listen(port, "0.0.0.0", () => console.log("SICMA MATHEMA ouvindo na porta " + port));
}
module.exports = {app};
