import { produits, tarifs, pointures } from '../data/produits.js';
import { empreinte, relief, semelle, piste } from '../lib/motifs.js';
import { pastille, reglette, blocListe } from '../lib/blocs.js';
import { icones } from '../lib/icones.js';

/** Les trois vues d'une fiche : l'empreinte, la semelle, la piste. */
function vues(p) {
  const cm = parseFloat(String(p.empreinte).split('×')[0].replace(',', '.'));
  const scenes = {
    empreinte: `${empreinte(p.ref, { taille: 420, alt: p.alt })}${reglette(cm)}`,
    semelle: semelle(p.ref, {
      taille: 260,
      alt: `La semelle de la tong vue de dessous : le motif « ${p.nom} » y est moulé en relief et en miroir, entouré des trois points d'ancrage de la bride.`,
    }),
    piste: piste(p.ref, {
      alt: `Une piste de pas s'éloignant dans le sable, chaque empreinte portant le motif « ${p.nom} ».`,
    }),
  };
  const libelles = {
    empreinte: ['La trace', "Ce qui reste dans le sable"],
    semelle: ['La semelle', 'Le motif moulé, en miroir'],
    piste: ['La piste', 'Ce que voient les autres'],
  };
  const boutons = Object.keys(scenes)
    .map(
      (cle, i) => `<button class="fiche__vue" type="button" data-vue="${cle}"
          aria-pressed="${i === 0}" data-contenu="${encodeURIComponent(scenes[cle])}">
          <span class="mention">${libelles[cle][0]}</span>
          <span class="legende" style="font-size:0.72rem;text-align:center;max-width:16ch">${libelles[cle][1]}</span>
        </button>`
    )
    .join('\n        ');

  return { scenes, boutons };
}

export function fiche(p) {
  const { scenes, boutons } = vues(p);
  const autres = produits.filter((a) => a.ref !== p.ref);
  const choix = pointures.map((t) => `<option value="${t}">${t}</option>`).join('');

  const corps = `
    <section class="bande bande--papier" style="padding-block:clamp(1.6rem,4vw,2.8rem) clamp(2.4rem,6vw,4.5rem)">
      <div class="colonne">
        <p class="mention" style="margin-bottom:1.4rem;color:var(--encre-douce)">
          <a href="catalogue.html" style="text-decoration:none">Le catalogue</a> &nbsp;/&nbsp; Réf. ${p.ref}
        </p>

        <div class="fiche">
          <div class="fiche__visuel">
            <div class="fiche__scene" data-scene data-vue-active="empreinte" style="display:grid;gap:1rem;align-content:center;justify-items:center">${scenes.empreinte}</div>
            <div class="fiche__vues" data-vues>
        ${boutons}
            </div>
            <p class="legende" style="margin-top:0.8rem">Illustrations dessinées d'après les moules. Les photographies du produit fini arriveront avec les premières séries.</p>
          </div>

          <div class="pile pile--large">
            <div style="width:100%">
              <hr class="filet" style="margin-bottom:0.7rem">
              <h1 style="font-size:clamp(2.2rem,1.4rem+3.4vw,4rem)">${p.nom}</h1>
              <p style="font-style:italic;font-size:clamp(1.1rem,1rem+0.5vw,1.4rem);line-height:1.35;color:var(--encre-douce);max-width:30ch;margin-top:1rem">${p.baseline}</p>
            </div>

            ${p.description.map((t) => `<p>${t}</p>`).join('\n            ')}

            <div style="display:flex;align-items:center;gap:1.4rem;flex-wrap:wrap;border-block:3px solid var(--encre);padding-block:1.2rem;width:100%">
              ${pastille(tarifs.paire, { grande: true })}
              <div>
                <p class="mention" style="margin-bottom:0.35rem">${tarifs.duo}&nbsp;${tarifs.devise} les deux paires</p>
                <p class="legende" style="margin:0">${tarifs.note}</p>
              </div>
            </div>

            <form style="width:100%;display:grid;gap:1rem" onsubmit="return false">
              <div class="champ" style="margin-bottom:0">
                <label for="pointure-${p.ref}">Pointure</label>
                <select id="pointure-${p.ref}" data-pointure="${p.ref}">
                  <option value="">À préciser plus tard</option>
                  ${choix}
                </select>
              </div>
              <button class="bouton" type="button" data-ajouter="${p.ref}" style="justify-content:center">
                Ajouter à mon bon ${icones.fleche({ taille: 16 })}
              </button>
              <p class="champ__aide" style="margin:0">Rien n'est débité&nbsp;: le bon sert à réserver votre place et à nous dire quels moules lancer en premier.</p>
            </form>

            <table class="releve" style="width:100%">
              <caption class="invisible">Relevé technique de la référence ${p.ref}</caption>
              <tbody>
                <tr><th scope="row">Empreinte</th><td class="chiffre">${p.empreinte}</td></tr>
                <tr><th scope="row">Profondeur du relief</th><td class="chiffre">${p.relief}</td></tr>
                <tr>
                  <th scope="row">Sols conseillés</th>
                  <td>${p.sols.map((s) => `<span class="jeton">${s}</span>`).join('')}</td>
                </tr>
                <tr>
                  <th scope="row">Sols déconseillés</th>
                  <td>${p.solsFaibles.map((s) => `<span class="jeton jeton--faible">${s}</span>`).join('')}</td>
                </tr>
                <tr>
                  <th scope="row">Coloris annoncés</th>
                  <td>
                    <ul class="coloris">
                      ${p.couleursDispo.map((c) => `<li><i style="background:${c.hex}"></i>${c.nom}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
                <tr><th scope="row">Pointures</th><td class="chiffre">${pointures[0]} au ${pointures[pointures.length - 1]}</td></tr>
              </tbody>
            </table>

            <div style="border:3px solid var(--turquoise);padding:1.1rem 1.2rem;width:100%;display:flex;gap:0.9rem;align-items:start">
              <span style="color:var(--turquoise-sombre);flex:0 0 auto;margin-top:0.15rem">${icones.pas({ taille: 22 })}</span>
              <p style="margin:0;font-size:0.94rem;line-height:1.5"><strong>Le conseil de la maison.</strong> ${p.conseil}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bande bande--creme" style="padding-block:clamp(2.6rem,6vw,4.5rem)">
      <div class="colonne">
        <div class="planche-titre">
          <span class="planche-titre__num">Au même rayon</span>
          <h2>Les trois autres.</h2>
        </div>
        <div class="planche">
          ${autres
            .map(
              (a) => `<a class="article" href="modele/${a.slug}.html">
            <span class="article__vignette">${empreinte(a.ref, { taille: 300, alt: a.alt })}</span>
            <span class="article__entete">
              <span class="mention article__ref chiffre">Réf. ${a.ref}</span>
              <span class="mention" style="color:var(--turquoise-sombre)">${a.relief}</span>
            </span>
            <span><span class="article__nom" style="display:block">${a.nom}</span></span>
            <p class="article__baseline">${a.baseline}</p>
            <span class="article__pied">
              <span class="lien-fleche">La fiche ${icones.fleche({ taille: 15 })}</span>
              ${pastille(tarifs.paire)}
            </span>
          </a>`
            )
            .join('\n          ')}
        </div>
      </div>
    </section>

    ${blocListe()}
  `;

  return {
    meta: {
      titre: `Réf. ${p.ref} — ${p.nom}`,
      description: `${p.baseline} ${p.argument} Empreinte ${p.empreinte}, relief ${p.relief}. Motif original moulé sous la semelle.`,
      page: `modele/${p.slug}.html`,
      profondeur: 1,
      chemin: `modele/${p.slug}.html`,
    },
    corps,
  };
}

export function fiches() {
  return produits.map(fiche);
}

/** Le relief seul, utilisé par la notice. */
export const apercuRelief = relief;
