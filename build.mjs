/* Générateur du catalogue Piénus.
   Aucune dépendance : Node lit src/, écrit dist/, et s'arrête là.
   Usage : node build.mjs  */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { page, SITE, INDEXABLE } from './src/lib/gabarit.js';
import { produits } from './src/data/produits.js';
import { empreinte, glyphes } from './src/lib/motifs.js';
import * as accueil from './src/pages/accueil.js';
import * as catalogue from './src/pages/catalogue.js';
import * as notice from './src/pages/notice.js';
import { fiches } from './src/pages/modele.js';
import { maison, questions, contact, mentions, confidentialite } from './src/pages/textes.js';

const racine = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(racine, 'src');
const DIST = path.join(racine, 'dist');

const BASE_URL = process.env.PIENUS_URL || `https://${SITE.domaine}`;

async function ecrire(relatif, contenu) {
  const cible = path.join(DIST, relatif);
  await fs.mkdir(path.dirname(cible), { recursive: true });
  await fs.writeFile(cible, contenu, 'utf8');
  return relatif;
}

async function copier(depuis, vers) {
  await fs.mkdir(path.dirname(path.join(DIST, vers)), { recursive: true });
  await fs.cp(path.join(SRC, depuis), path.join(DIST, vers), { recursive: true });
}

/* La marque, dessinée : une empreinte de pas dont la voûte porte le motif. */
function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#dec89a"/>
  <g fill="#8f6f42">
    <path d="M32 8c7 0 11 6.4 10.4 14.8-.6 7.7-3.9 12.5-3.2 18 .6 5.4-2.3 9-7.7 9s-8.4-3.8-7.7-9.3c.6-5.8-2-9.6-2-17C21.8 14.6 25 8 32 8z"/>
  </g>
  <g fill="#f2e2bd">
    <path d="M33.6 9.6c7 0 11 6.4 10.4 14.8-.6 7.7-3.9 12.5-3.2 18 .6 5.4-2.3 9-7.7 9s-8.4-3.8-7.7-9.3c.6-5.8-2-9.6-2-17C23.4 16.2 26.6 9.6 33.6 9.6z" opacity="0.55"/>
  </g>
</svg>`;
}

/** Le catalogue minimal dont le tiroir a besoin pour dessiner ses lignes. */
function catalogueClient() {
  const entrees = produits
    .map((p) => {
      const vignette = empreinte(p.ref, { taille: 40, alt: p.nom, grain: false })
        .replace(/\s+/g, ' ')
        .trim();
      return `  '${p.ref}': { nom: ${JSON.stringify(p.nom)}, slug: ${JSON.stringify(p.slug)}, vignette: ${JSON.stringify(vignette)} }`;
    })
    .join(',\n');
  return `/* Généré par build.mjs — ne pas modifier à la main. */\nwindow.PIENUS_CATALOGUE = {\n${entrees}\n};\n`;
}

function pageIntrouvable() {
  return page({
    titre: 'Page introuvable',
    description: 'Cette page du catalogue n’existe pas.',
    corps: `
    <section class="bande bande--sable" style="min-height:60vh;display:grid;align-items:center">
      <div class="colonne" style="text-align:center;display:grid;gap:1.6rem;justify-items:center">
        <div style="width:min(100%,14rem)">${empreinte('512', { taille: 220, alt: '' })}</div>
        <h1 style="max-width:16ch">Il n'y a rien à cette adresse.</h1>
        <p style="max-width:44ch;margin-inline:auto">Quelqu'un est passé par là, mais la page n'y est plus. Le catalogue, lui, n'a pas bougé.</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center">
          <a class="bouton" href="catalogue.html">Voir le catalogue</a>
          <a class="bouton bouton--creux" href="index.html">Revenir à l'accueil</a>
        </div>
      </div>
    </section>`,
  });
}

function planDuSite(urls) {
  const jour = new Date().toISOString().slice(0, 10);
  const entrees = urls
    .map(
      (u) =>
        `  <url><loc>${BASE_URL}/${u === 'index.html' ? '' : u}</loc><lastmod>${jour}</lastmod><changefreq>monthly</changefreq><priority>${u === 'index.html' ? '1.0' : '0.7'}</priority></url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entrees}\n</urlset>\n`;
}

async function construire() {
  const depart = Date.now();
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });

  const ecrites = [];

  const statiques = [accueil, catalogue, notice, maison, questions, contact, mentions, confidentialite];
  for (const module of statiques) {
    const meta = module.meta;
    ecrites.push(
      await ecrire(meta.page, page({ ...meta, corps: module.corps() }))
    );
  }

  for (const f of fiches()) {
    ecrites.push(await ecrire(f.meta.chemin, page({ ...f.meta, corps: f.corps })));
  }

  await ecrire('404.html', pageIntrouvable());
  await ecrire('favicon.svg', favicon());
  await ecrire('assets/catalogue.js', catalogueClient());
  await ecrire('sitemap.xml', planDuSite(ecrites));
  await ecrire(
    'robots.txt',
    INDEXABLE
      ? `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`
      : `# Catalogue en préparation : mentions légales incomplètes, rien à indexer pour l'instant.\nUser-agent: *\nDisallow: /\n`
  );
  // Avec html_handling "none", la racine ne résout plus d'elle-même vers
  // index.html. Une réécriture (code 200) la sert sans redirection visible,
  // ce qui garde une seule URL canonique pour la page d'accueil.
  await ecrire('_redirects', '/  /index.html  200\n');

  // Les règles ne doivent pas se chevaucher : deux motifs qui touchent le même
  // fichier concatènent leurs en-têtes, et un Cache-Control à deux max-age ne
  // veut plus rien dire. Les polices sont donc ciblées seules.
  await ecrire(
    '_headers',
    [
      '/assets/fonts/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '/assets/styles.css',
      '  Cache-Control: public, max-age=3600',
      '/assets/app.js',
      '  Cache-Control: public, max-age=3600',
      '/assets/catalogue.js',
      '  Cache-Control: public, max-age=3600',
      '/*',
      '  X-Content-Type-Options: nosniff',
      '  Referrer-Policy: strict-origin-when-cross-origin',
      '  X-Frame-Options: DENY',
      '',
    ].join('\n')
  );

  await copier('assets/styles.css', 'assets/styles.css');
  await copier('assets/app.js', 'assets/app.js');
  await copier('assets/fonts', 'assets/fonts');

  const total = ecrites.length + 1;
  console.log(
    `Piénus — ${total} pages, ${Object.keys(glyphes).length} motifs, ${Date.now() - depart} ms` +
      (INDEXABLE ? ', indexable.' : ', NON indexable (noindex + robots Disallow).')
  );
  ecrites.forEach((f) => console.log(`  · dist/${f}`));
}

construire().catch((e) => {
  console.error('Échec du build :', e);
  process.exit(1);
});
