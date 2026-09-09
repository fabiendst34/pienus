import { produits, tarifs } from '../data/produits.js';
import { article, blocListe } from '../lib/blocs.js';
import { icones } from '../lib/icones.js';

export const meta = {
  titre: 'Le catalogue',
  description:
    'Les quatre motifs Piénus de la saison 1 : Le Seigneur Noir, Plein Soleil, Le Petit Indiscret et L’Anisé du Sud. Relief, empreinte et sols conseillés pour chacun.',
  page: 'catalogue.html',
};

export function corps() {
  const lignes = produits
    .map(
      (p) => `<tr>
            <th scope="row"><a href="modele/${p.slug}.html">Réf.&nbsp;${p.ref} · ${p.nom}</a></th>
            <td class="chiffre">${p.relief}</td>
            <td class="chiffre">${p.empreinte}</td>
            <td>${p.sols.includes('Sable sec') ? '<span class="oui">Oui</span>' : '<span class="non">Médiocre</span>'}</td>
            <td>${p.sols.includes('Sable humide') ? '<span class="oui">Oui</span>' : '<span class="non">Non</span>'}</td>
            <td>${p.sols.includes('Neige tassée') ? '<span class="oui">Oui</span>' : '<span class="non">Non</span>'}</td>
            <td>${p.couleursDispo.length} coloris</td>
          </tr>`
    )
    .join('\n          ');

  return `
    <section class="bande bande--papier" style="padding-block:clamp(2.4rem,5vw,4rem) clamp(2.4rem,5vw,3.5rem)">
      <div class="colonne">
        <hr class="filet" style="margin-bottom:0.7rem">
        <h1 style="font-size:clamp(2.3rem,1.5rem+3.8vw,4.4rem);margin-bottom:1.4rem">Le catalogue.</h1>
        <p style="font-size:clamp(1.05rem,0.98rem+0.45vw,1.3rem);max-width:52ch;margin-bottom:2.4rem">Quatre motifs, moulés dans la même gomme, coulés dans les mêmes moules d'aluminium. Ce qui change d'une référence à l'autre, c'est ce que les gens trouvent derrière vous.</p>
        <div class="planche">
          ${produits.map((p, i) => article(p, { vedette: i === 0 })).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="bande bande--creme">
      <div class="colonne">
        <div class="planche-titre">
          <span class="planche-titre__num">Tableau comparatif</span>
          <h2>Ce que chaque semelle sait faire.</h2>
        </div>
        <div class="tableau-enveloppe">
          <table class="tableau">
            <caption class="invisible">Comparatif des quatre références : relief, taille d'empreinte, sols et coloris.</caption>
            <thead>
              <tr>
                <th scope="col">Référence</th>
                <th scope="col">Relief</th>
                <th scope="col">Empreinte</th>
                <th scope="col">Sable sec</th>
                <th scope="col">Sable humide</th>
                <th scope="col">Neige tassée</th>
                <th scope="col">Coloris</th>
              </tr>
            </thead>
            <tbody>
          ${lignes}
            </tbody>
          </table>
        </div>
        <p class="legende" style="margin-top:1rem;max-width:56ch">Le sable humide donne toujours le meilleur résultat : il tient les détails fins, ce que le sable sec du haut de plage ne fait pas. La <a href="notice.html">notice</a> détaille chaque cas.</p>

        <div style="display:flex;flex-wrap:wrap;gap:1rem 1.6rem;align-items:center;margin-top:2.2rem;border-top:3px solid var(--encre);padding-top:1.4rem">
          <span class="mention">Tarifs indicatifs</span>
          <span class="chiffre">${tarifs.paire}&nbsp;${tarifs.devise} la paire</span>
          <span class="chiffre">${tarifs.duo}&nbsp;${tarifs.devise} les deux paires</span>
          <span class="chiffre">${tarifs.quatuor}&nbsp;${tarifs.devise} les quatre</span>
          <a class="lien-fleche" href="#liste" style="margin-left:auto">Déposer mon bon ${icones.fleche({ taille: 15 })}</a>
        </div>
      </div>
    </section>

    ${blocListe()}
  `;
}
