// Jeu d'icônes maison : un seul tracé de 2 px, bouts francs, angles vifs.
// Rien d'emprunté à une bibliothèque, rien d'emoji.

const svg = (contenu, { taille = 20, classe = '' } = {}) =>
  `<svg class="${classe}" width="${taille}" height="${taille}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true" focusable="false">${contenu}</svg>`;

export const icones = {
  fleche: (o) => svg('<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>', o),
  croix: (o) => svg('<path d="M6 6l12 12"/><path d="M18 6L6 18"/>', o),
  coche: (o) => svg('<path d="M4 12.5l5.5 5.5L20 6"/>', o),
  menu: (o) => svg('<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>', o),
  bon: (o) =>
    svg('<path d="M5 3h14v18l-2.3-1.6L14.4 21l-2.4-1.6L9.6 21l-2.3-1.6L5 21z"/><path d="M9 8h6"/><path d="M9 12h6"/>', o),
  attention: (o) => svg('<path d="M12 4l9 16H3z"/><path d="M12 10v4"/><path d="M12 17.2v.2"/>', o),
  plus: (o) => svg('<path d="M12 5v14"/><path d="M5 12h14"/>', o),
  pas: (o) =>
    svg('<path d="M9 3c2.2 0 3.4 2 3.2 4.6-.2 2.4-1.2 3.9-1 5.6.2 1.7-.7 2.8-2.4 2.8s-2.6-1.2-2.4-2.9c.2-1.8-.6-3-.6-5.3C5.8 5.1 6.9 3 9 3z"/><path d="M16.5 12.5c1.7 0 2.6 1.5 2.4 3.4-.2 1.8-.9 2.9-.8 4.1.1 1.3-.5 2-1.8 2s-1.9-.9-1.8-2.2c.1-1.3-.4-2.2-.4-3.9 0-2 .8-3.4 2.4-3.4z"/>', o),
};
