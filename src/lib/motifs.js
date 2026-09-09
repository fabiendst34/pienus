// Les quatre motifs Piénus, dessinés à la main en SVG.
// Chaque glyphe vit dans une viewBox 0 0 120 120 et se rend de deux façons :
//   empreinte() — le motif creusé dans le sable, éclairé du haut-gauche ;
//   relief()    — le motif tel qu'il est moulé sous la tong, donc en miroir.
// Toutes les créations sont originales : aucun logo ni aucune marque reproduite.

const rad = (deg) => (deg * Math.PI) / 180;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/* ---------- 204 · Le Seigneur Noir ---------------------------------- */

function casque() {
  const coque = [
    'M 60 10',
    'C 83 10, 99 29, 100 54',
    'L 102 73',
    'C 102 91, 88 106, 60 110',
    'C 32 106, 18 91, 18 73',
    'L 20 54',
    'C 21 29, 37 10, 60 10',
    'Z',
  ].join(' ');
  // Découpes : le regard, l'arête du nez, la grille de ventilation.
  const oeilD = 'M 65 46 L 93 40 L 95 55 L 67 60 Z';
  const oeilG = 'M 55 46 L 27 40 L 25 55 L 53 60 Z';
  const nez = 'M 60 58 L 70 82 L 50 82 Z';
  const grille = [0, 1, 2].map((i) => `M 43 ${87 + i * 6} h 34 v 3.4 h -34 Z`).join(' ');
  return `<path d="${coque} ${oeilD} ${oeilG} ${nez} ${grille}" fill-rule="evenodd"/>`;
}

/* ---------- 311 · Plein Soleil -------------------------------------- */

function soleilPalmier() {
  const cx = 36;
  const cy = 42;
  const p = (r, ang) => `${(cx + r * Math.cos(ang)).toFixed(2)} ${(cy + r * Math.sin(ang)).toFixed(2)}`;
  const rayons = [];
  for (let i = 0; i < 9; i += 1) {
    const a = rad((360 / 9) * i - 90);
    const da = rad(360 / 9 / 2.9);
    rayons.push(`M ${p(19, a - da)} L ${p(31, a)} L ${p(19, a + da)} Z`);
  }
  const disque = 'M 36 26 a 16 16 0 1 0 0.1 0 Z';

  // Le palmier : tronc courbé, cinq palmes retombantes, trois noix de coco.
  const tronc = 'M 84 112 C 82 92, 84 74, 92 58 L 99 61 C 92 76, 89 93, 91 112 Z';
  const palme = (deg, len, courbe) => {
    const a = rad(deg);
    const bx = 95;
    const by = 56;
    const ex = bx + len * Math.cos(a);
    const ey = by + len * Math.sin(a);
    const mx = bx + len * 0.55 * Math.cos(a) - courbe * Math.sin(a);
    const my = by + len * 0.55 * Math.sin(a) + courbe * Math.cos(a);
    const mx2 = bx + len * 0.5 * Math.cos(a) - (courbe + 8) * Math.sin(a);
    const my2 = by + len * 0.5 * Math.sin(a) + (courbe + 8) * Math.cos(a);
    return `M ${bx} ${by} Q ${mx.toFixed(2)} ${my.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)} Q ${mx2.toFixed(2)} ${my2.toFixed(2)} ${bx} ${by} Z`;
  };
  const palmes = [palme(196, 31, 9), palme(230, 28, 8), palme(288, 26, 6), palme(330, 28, -8), palme(6, 31, -9)].join(' ');
  const coco = 'M 93 61 a 3.4 3.4 0 1 0 0.1 0 Z M 101 63 a 3.2 3.2 0 1 0 0.1 0 Z M 97 69 a 3 3 0 1 0 0.1 0 Z';
  return `<path d="${disque} ${rayons.join(' ')} ${tronc} ${palmes} ${coco}"/>`;
}

/* ---------- 512 · Le Petit Indiscret -------------------------------- */

function indiscret() {
  // Le graffiti de fond de cahier, ramené à sa stricte géométrie.
  const tige =
    'M 60 14 C 71 14, 79 22, 79 33 L 79 84 C 79 95, 71 102, 60 102 C 49 102, 41 95, 41 84 L 41 33 C 41 22, 49 14, 60 14 Z';
  const bourseG = 'M 34 78 a 17 17 0 1 0 0.1 0 Z';
  const bourseD = 'M 86 78 a 17 17 0 1 0 0.1 0 Z';
  return `<path d="${bourseG} ${bourseD} ${tige}"/>`;
}

/* ---------- 750 · L'Anisé du Sud ------------------------------------ */

function bouteille() {
  const corps = [
    'M 51 8 h 18 v 13',
    'c 0 9, 13 15, 13 28',
    'v 51',
    'a 8 8 0 0 1 -8 8',
    'h -28',
    'a 8 8 0 0 1 -8 -8',
    'v -51',
    'c 0 -13, 13 -19, 13 -28',
    'z',
  ].join(' ');
  const etiquette = 'M 60 55 L 78 76 L 60 97 L 42 76 Z';
  // Dans le losange évidé, un petit soleil : un trou dans le trou redevient plein.
  const p = (r, ang) => `${(60 + r * Math.cos(ang)).toFixed(2)} ${(76 + r * Math.sin(ang)).toFixed(2)}`;
  const rayons = [];
  for (let i = 0; i < 8; i += 1) {
    const a = rad(45 * i - 90);
    const da = rad(15);
    rayons.push(`M ${p(4.6, a - da)} L ${p(11, a)} L ${p(4.6, a + da)} Z`);
  }
  const astre = 'M 60 71 a 5 5 0 1 0 0.1 0 Z';
  return `<path d="${corps} ${etiquette} ${astre} ${rayons.join(' ')}" fill-rule="evenodd"/>`;
}

export const glyphes = { 204: casque, 311: soleilPalmier, 512: indiscret, 750: bouteille };

/* ---------- Rendus --------------------------------------------------- */

/**
 * L'empreinte creusée : la lumière tombe du haut-gauche, la lèvre bas-droite
 * du creux s'éclaire, le fond reste dans l'ombre.
 */
export function empreinte(ref, { taille = 220, classe = '', alt = '', grain = true } = {}) {
  const g = glyphes[ref]();
  compteur += 1;
  const id = `emp-${ref}-${compteur}`;
  return `<svg class="empreinte ${classe}" viewBox="0 0 120 120" width="${taille}" height="${taille}" role="img" aria-label="${esc(alt)}">
${grain ? `  <defs><filter id="${id}" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="${ref}" result="b"/>
    <feColorMatrix in="b" type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.22"/></feComponentTransfer>
    <feComposite operator="in" in2="SourceGraphic"/>
  </filter></defs>` : ''}
  <g class="empreinte__leve" transform="translate(2.6 2.8)">${g}</g>
  <g class="empreinte__fond">${g}</g>
${grain ? `  <g class="empreinte__grain" filter="url(#${id})">${g}</g>` : ''}
</svg>`;
}

/** Le motif tel qu'il est moulé sous la semelle : en relief, et donc en miroir. */
export function relief(ref, { taille = 220, classe = '', alt = '' } = {}) {
  const g = glyphes[ref]();
  return `<svg class="relief ${classe}" viewBox="0 0 120 120" width="${taille}" height="${taille}" role="img" aria-label="${esc(alt)}">
  <g transform="translate(120 0) scale(-1 1)">
    <g class="relief__ombre" transform="translate(2.4 2.6)">${g}</g>
    <g class="relief__gomme">${g}</g>
  </g>
</svg>`;
}

/* ---------- La tong, vue de dessous ---------------------------------- */

const SEMELLE_PATH = [
  'M 100 14',
  'C 130 14, 152 36, 154 68',
  'C 156 102, 148 132, 144 162',
  'C 140 202, 138 242, 142 290',
  'C 146 332, 138 374, 116 398',
  'C 108 408, 92 408, 84 398',
  'C 62 374, 54 332, 58 290',
  'C 62 242, 60 202, 56 162',
  'C 52 132, 44 102, 46 68',
  'C 48 36, 70 14, 100 14',
  'Z',
].join(' ');

/**
 * La semelle vue de dessous, motif moulé sur l'avant-pied.
 * `pied` vaut 'gauche' ou 'droit' ; la gauche est le miroir de la droite.
 */
export function semelle(ref, { pied = 'droit', taille = 300, classe = '', alt = '' } = {}) {
  const g = glyphes[ref]();
  const miroir = pied === 'gauche' ? ' transform="translate(200 0) scale(-1 1)"' : '';
  const h = Math.round(taille * (420 / 200));
  const crampons = Array.from({ length: 6 }, (_, i) => `<path d="M ${64 + (i % 2) * 4} ${306 + i * 14} h ${72 - (i % 2) * 8}"/>`).join('');
  return `<svg class="semelle semelle--${pied} ${classe}" viewBox="0 0 200 420" width="${taille}" height="${h}" role="img" aria-label="${esc(alt)}">
  <g${miroir}>
    <path class="semelle__gomme" d="${SEMELLE_PATH}"/>
    <path class="semelle__liseret" d="${SEMELLE_PATH}"/>
    <g class="semelle__motif" transform="translate(40 112)">
      <g transform="translate(120 0) scale(-1 1)">
        <g class="relief__ombre" transform="translate(2.2 2.4)">${g}</g>
        <g class="relief__gomme">${g}</g>
      </g>
    </g>
    <circle class="semelle__ancrage" cx="100" cy="56" r="6.5"/>
    <circle class="semelle__ancrage" cx="52" cy="250" r="6.5"/>
    <circle class="semelle__ancrage" cx="148" cy="250" r="6.5"/>
    <g class="semelle__crampons">${crampons}</g>
  </g>
</svg>`;
}

/**
 * Une piste : des empreintes alternées qui s'éloignent vers le haut du cadre.
 * Le premier pas est au premier plan et occupe un bon tiers de la largeur ;
 * chacun rétrécit, se rapproche de l'axe et pivote un peu moins que le précédent.
 */
export function piste(ref, { pas = 5, alt = '' } = {}) {
  const g = glyphes[ref];
  const empreintes = Array.from({ length: pas }, (_, i) => {
    const t = i / (pas - 1);
    const cote = i % 2 === 0 ? -1 : 1;
    const x = 50 + cote * (13 - t * 6);
    const y = 84 - t * 66;
    const ech = 0.34 - t * 0.17;
    const rot = cote * (9 - t * 4);
    return `    <g class="piste__pas" style="--i:${i}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${ech.toFixed(4)}) translate(-60 -60)">
      <g class="empreinte__leve" transform="translate(2.6 2.8)">${g()}</g>
      <g class="empreinte__fond">${g()}</g>
    </g>`;
  }).join('\n');
  return `<svg class="piste" viewBox="0 0 100 100" role="img" aria-label="${esc(alt)}" preserveAspectRatio="xMidYMid meet">
${empreintes}
</svg>`;
}

let compteur = 0;
