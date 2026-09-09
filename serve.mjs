/* Serveur de relecture locale. Sert dist/ sur http://localhost:4321. */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const PORT = Number(process.env.PORT || 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

http
  .createServer(async (req, res) => {
    let rel = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (rel.endsWith('/')) rel += 'index.html';
    const cible = path.join(DIST, rel);
    if (!cible.startsWith(DIST)) {
      res.writeHead(403).end('Interdit');
      return;
    }
    try {
      const corps = await fs.readFile(cible);
      res.writeHead(200, { 'content-type': TYPES[path.extname(cible)] || 'application/octet-stream' });
      res.end(corps);
    } catch {
      try {
        const p404 = await fs.readFile(path.join(DIST, '404.html'));
        res.writeHead(404, { 'content-type': TYPES['.html'] }).end(p404);
      } catch {
        res.writeHead(404).end('Introuvable');
      }
    }
  })
  .listen(PORT, () => console.log(`Piénus servi sur http://localhost:${PORT}`));
