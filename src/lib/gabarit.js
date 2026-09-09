import { icones } from './icones.js';
import { produits, tarifs } from '../data/produits.js';

// Tant que les mentions légales portent des champs vides, le site reste hors index.
export const INDEXABLE = process.env.PIENUS_INDEXABLE === 'oui';

export const SITE = {
  nom: 'Piénus',
  domaine: 'pienus.fr',
  accroche: 'Des tongs qui signent le sable.',
  saison: 'Catalogue général · Saison 1',
  courriel: 'bonjour@pienus.fr',
};

// Le contrat de direction. Il reste dans le HTML livré : la page peut être
// auditée contre la décision qui l'a produite.
const CONTRAT = `<!--
  PIÉNUS — contrat de direction (seed 190edcd5, forme 7 de la liste classée)
  THESIS: la trace est le produit. Le site est un catalogue de vente par
  correspondance, pas une boutique DTC ; il refuse le hero lifestyle, la grille
  de quatre cartes identiques et le bouton arrondi du secteur.
  OWN-WORLD: papier journal jauni à trame offset visible, aplats sanguine /
  turquoise / moutarde tenant des sections entières, grotesque Archivo serrée à
  large, filets de 3 px, secondes plaques décalées d'un demi-millimètre en
  multiply, pastilles de prix étoilées, réglettes graduées en centimètres.
  STORY: le visiteur comprend en un écran qu'une semelle imprime un motif,
  parcourt quatre références chiffrées, et laisse son adresse sur un bon de
  commande parce que les commandes n'ouvrent pas encore.
  FIRST VIEWPORT: champ de sable plein cadre, une seule empreinte relevée à
  l'échelle 1 avec sa réglette à droite ; à gauche le titre, la ligne
  d'explication, le bouton sanguine et la mention d'étape sur filet.
  FORM: catalogue VPC français, été 1978 — candidat 7 de la liste classée,
  assigné par le tirage ; relevé par la planche naturaliste (empreintes à
  l'échelle), le relevé de laboratoire (réglettes et cotes), le marquoir (le
  grain ne disparaît sous aucun aplat) et l'ikebana (premier écran presque vide).
  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, DESIGN.md, and every shipping raster carrying its
  provenance.
-->`;

const rayons = [
  { url: 'catalogue.html', nom: 'Le catalogue' },
  { url: 'notice.html', nom: 'La notice' },
  { url: 'maison.html', nom: 'La maison' },
  { url: 'questions.html', nom: 'Questions' },
  { url: 'contact.html', nom: 'Nous écrire' },
];

function enseigne(page) {
  const liens = rayons
    .map(
      (r) =>
        `<a href="${r.url}"${page === r.url ? ' aria-current="page"' : ''}>${r.nom}</a>`
    )
    .join('\n          ');
  return `<header class="enseigne">
      <div class="enseigne__barre">
        <a class="enseigne__marque" href="index.html">
          <span class="enseigne__mot repere" data-repere="Piénus">Piénus</span>
          <span class="enseigne__saison">${SITE.saison}</span>
        </a>
        <button class="enseigne__mobile" type="button" data-menu aria-expanded="false" aria-controls="rayons">
          ${icones.menu({ taille: 18 })}<span>Rayons</span>
        </button>
        <nav class="rayons" id="rayons" aria-label="Rayons du catalogue">
          ${liens}
        </nav>
        <button class="enseigne__bon" type="button" data-ouvrir-bon aria-controls="tiroir-bon" aria-expanded="false">
          ${icones.bon({ taille: 17 })}<span>Mon bon</span><span class="chiffre" data-compteur>0</span>
        </button>
      </div>
    </header>`;
}

function tiroir() {
  return `<div class="voile" data-voile hidden></div>
    <aside class="tiroir" id="tiroir-bon" data-tiroir role="dialog" aria-modal="true" aria-label="Bon de commande" hidden>
      <div class="tiroir__entete">
        <h2 style="font-size:1.05rem;letter-spacing:0.1em;text-transform:uppercase;font-stretch:80%">Bon de commande</h2>
        <button class="tiroir__fermer" type="button" data-fermer-bon aria-label="Fermer le bon de commande">
          ${icones.croix({ taille: 20 })}
        </button>
      </div>
      <div class="tiroir__corps" data-bon-corps></div>
      <p class="invisible" role="status" data-annonce></p>
      <div class="tiroir__pied">
        <p class="legende" style="margin-bottom:0.9rem">Les commandes ne sont pas encore ouvertes. Votre bon sert à vous prévenir en premier, et à nous dire quelles références mouler d'abord.</p>
        <a class="bouton" href="index.html#liste" data-aller-liste>Valider mon bon ${icones.fleche({ taille: 16 })}</a>
      </div>
    </aside>`;
}

function pied() {
  const modeles = produits
    .map((p) => `<li><a href="modele/${p.slug}.html">Réf. ${p.ref} · ${p.nom}</a></li>`)
    .join('\n            ');
  return `<footer class="pied">
      <div class="colonne">
        <div class="pied__grille">
          <div>
            <h2 class="pied__titre">La maison</h2>
            <p style="font-size:1.35rem;font-weight:800;font-stretch:110%;letter-spacing:-0.03em;line-height:1.3;max-width:22ch">Piénus dessine des motifs à mouler sous les semelles.</p>
            <p class="legende" style="margin-top:0.9rem">Les commandes ouvriront quand les moules seront prêts. D'ici là, le catalogue est consultable et le bon de commande vous garde une place.</p>
          </div>
          <div>
            <h2 class="pied__titre">Les références</h2>
            <ul>
            ${modeles}
              <li><a href="catalogue.html">Le catalogue complet</a></li>
            </ul>
          </div>
          <div>
            <h2 class="pied__titre">Le service</h2>
            <ul>
              <li><a href="notice.html">La notice d'emploi</a></li>
              <li><a href="questions.html">Questions fréquentes</a></li>
              <li><a href="contact.html">Nous écrire</a></li>
              <li><a href="mentions-legales.html">Mentions légales</a></li>
              <li><a href="confidentialite.html">Données personnelles</a></li>
            </ul>
          </div>
        </div>
        <div class="pied__bas">
          <span>© ${new Date().getFullYear()} Piénus. ${tarifs.note}</span>
          <span>Motifs et dessins originaux. Aucune marque tierce n'est reproduite.</span>
        </div>
      </div>
    </footer>`;
}

/**
 * Assemble une page complète.
 * `profondeur` vaut 1 pour les pages rangées dans un sous-dossier.
 */
export function page({ titre, description, corps, page: url = '', profondeur = 0, classeCorps = '' }) {
  const base = profondeur ? '../'.repeat(profondeur) : '';
  const remonte = (html) =>
    profondeur
      ? html
          .replace(/href="(?!https?:|#|mailto:|\.\.\/)/g, `href="${base}`)
          .replace(/src="(?!https?:|data:|\.\.\/)/g, `src="${base}`)
      : html;

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${titre} — ${SITE.nom}</title>
  <meta name="description" content="${description.replace(/"/g, '&quot;')}">
  <meta name="theme-color" content="#dec89a">
${INDEXABLE ? '' : '  <meta name="robots" content="noindex, nofollow">\n'}  <meta property="og:title" content="${titre} — ${SITE.nom}">
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_FR">
  <link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
  <link rel="preload" href="${base}assets/fonts/archivo-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${base}assets/styles.css">
</head>
<body class="${classeCorps}">
${CONTRAT}
  <a class="saut-lien" href="#contenu">Aller au contenu</a>
  ${remonte(enseigne(url))}
  <main id="contenu">
${remonte(corps)}
  </main>
  ${remonte(pied())}
  ${remonte(tiroir())}
  <script src="${base}assets/catalogue.js" defer></script>
  <script src="${base}assets/app.js" defer></script>
</body>
</html>
`;
}

export { icones, rayons };
