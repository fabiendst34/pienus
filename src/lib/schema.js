// Le schéma en coupe du principe Piénus, en trois temps.
// Coupe verticale : la gomme au-dessus, le sable en dessous, la ligne de sol à y=100.

const GRAINS = Array.from({ length: 44 }, (_, i) => {
  const x = ((i * 37) % 190) + 6;
  const y = 106 + ((i * 53) % 40);
  const r = 0.8 + ((i * 7) % 3) * 0.35;
  return `<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}"/>`;
}).join('');

const cadre = (contenu) =>
  `<svg viewBox="0 0 200 150" role="img" aria-hidden="true" focusable="false">
  <rect class="sc-sable" x="0" y="100" width="200" height="50"/>
  <g class="sc-grain">${GRAINS}</g>
  ${contenu}
</svg>`;

/** Temps 1 — la semelle approche, motif en relief tourné vers le sol. */
export function coupeUn() {
  const plots = [52, 78, 104, 130]
    .map((x) => `<path class="sc-gomme" d="M ${x} 74 h 20 v 12 h -20 z"/>`)
    .join('');
  return cadre(`
  <path class="sc-gomme" d="M 42 46 h 118 a 8 8 0 0 1 8 8 v 14 a 8 8 0 0 1 -8 8 h -118 a 8 8 0 0 1 -8 -8 v -14 a 8 8 0 0 1 8 -8 z"/>
  ${plots}
  <g class="sc-fleche">
    <path d="M 100 96 v -3"/>
    <path d="M 176 60 v 28"/><path d="M 171 82 l 5 7 5 -7"/>
  </g>
  <path class="sc-sol" d="M 0 100 h 200"/>`);
}

/** Temps 2 — la charge : la gomme s'enfonce et repousse le sable de côté. */
export function coupeDeux() {
  const plots = [52, 78, 104, 130]
    .map((x) => `<path class="sc-gomme" d="M ${x} 86 h 20 v 20 h -20 z"/>`)
    .join('');
  return cadre(`
  <path class="sc-bourrelet" d="M 34 100 c 6 -9, 14 -8, 18 0 z"/>
  <path class="sc-bourrelet" d="M 148 100 c 6 -9, 14 -8, 18 0 z"/>
  <path class="sc-gomme" d="M 42 58 h 118 a 8 8 0 0 1 8 8 v 14 a 8 8 0 0 1 -8 8 h -118 a 8 8 0 0 1 -8 -8 v -14 a 8 8 0 0 1 8 -8 z"/>
  ${plots}
  <g class="sc-fleche">
    <path d="M 176 52 v 30"/><path d="M 171 76 l 5 7 5 -7"/>
    <path d="M 24 96 h 10"/><path d="M 166 96 h 10"/>
  </g>
  <path class="sc-sol" d="M 0 100 h 34 M 166 100 h 34"/>`);
}

/** Temps 3 — la gomme est repartie, la trace reste. */
export function coupeTrois() {
  const creux = [52, 78, 104, 130]
    .map((x) => `<path class="sc-creux" d="M ${x} 100 h 20 v 16 h -20 z"/>`)
    .join('');
  const levres = [52, 78, 104, 130]
    .map((x) => `<path class="sc-levre" d="M ${x + 20} 100 v 16 h 2 v -16 z"/>`)
    .join('');
  return cadre(`
  ${creux}
  ${levres}
  <path class="sc-bourrelet" d="M 34 100 c 6 -9, 14 -8, 18 0 z"/>
  <path class="sc-bourrelet" d="M 148 100 c 6 -9, 14 -8, 18 0 z"/>
  <g class="sc-cote">
    <path d="M 52 128 h 78"/>
    <path d="M 52 124 v 8"/><path d="M 130 124 v 8"/>
  </g>
  <path class="sc-sol" d="M 0 100 h 34 M 166 100 h 34"/>`);
}
