import { produits } from '../data/produits.js';
import { relief } from '../lib/motifs.js';
import { coupeUn, coupeDeux, coupeTrois } from '../lib/schema.js';
import { blocListe } from '../lib/blocs.js';
import { icones } from '../lib/icones.js';

export const meta = {
  titre: "La notice d'emploi",
  description:
    "Sur quels sols une tong Piénus imprime, comment marcher pour obtenir une empreinte nette, et comment entretenir les reliefs de la semelle.",
  page: 'notice.html',
};

const SOLS = [
  ['Sable humide, en bas de plage', 'excellent', 'Le sol idéal. Il tient les détails fins : les rayons du soleil, la grille du casque, l’étiquette de la bouteille.'],
  ['Sable damé, chemin de dune', 'excellent', 'Presque aussi bon, et l’empreinte y tient plus longtemps parce que le vent la creuse moins vite.'],
  ['Terre fine, poussière de camping', 'bon', 'Rend très bien, avec un contraste plus sourd qu’au bord de l’eau.'],
  ['Neige tassée', 'bon', 'Fonctionne parfaitement, à condition d’accepter de porter des tongs dans la neige.'],
  ['Sable sec, haut de plage', 'variable', 'Les motifs à gros aplats passent, les motifs fins s’effondrent. Le grain sec ne tient pas les angles.'],
  ['Boue liquide, vase', 'inopérant', 'La matière se referme derrière la semelle. Il ne reste rien.'],
  ['Béton, carrelage, parquet', 'inopérant', 'Aucun sol dur ne garde quoi que ce soit. C’est la limite du produit, et elle est définitive.'],
];

export function corps() {
  const rangs = SOLS.map(
    ([sol, note, detail]) => `<tr>
            <th scope="row">${sol}</th>
            <td><span class="jeton${note === 'inopérant' || note === 'variable' ? ' jeton--faible' : ''}" style="${note === 'excellent' ? 'color:var(--turquoise-sombre)' : ''}">${note}</span></td>
            <td style="max-width:42ch">${detail}</td>
          </tr>`
  ).join('\n          ');

  const reliefs = produits
    .map(
      (p) => `<figure style="margin:0;display:grid;gap:0.6rem;justify-items:center">
          <span style="background:var(--encre);border:3px solid var(--encre);padding:0.7rem;display:grid;place-items:center;width:100%;aspect-ratio:1">
            ${relief(p.ref, { taille: 200, alt: `Le motif « ${p.nom} » tel qu'il est moulé sous la semelle : en relief et en miroir.`, classe: 'relief--clair' })}
          </span>
          <figcaption class="mention chiffre" style="text-align:center">Réf. ${p.ref}</figcaption>
        </figure>`
    )
    .join('\n        ');

  return `
    <section class="bande bande--papier" style="padding-block:clamp(2.4rem,5vw,4rem) clamp(2rem,4vw,3rem)">
      <div class="colonne">
        <hr class="filet" style="margin-bottom:0.7rem">
        <h1 style="font-size:clamp(2.4rem,1.5rem+4vw,4.6rem)">La notice d'emploi.</h1>
        <p style="font-size:clamp(1.05rem,0.98rem+0.45vw,1.32rem);max-width:54ch">Une tong Piénus se porte comme une tong. Tout ce qui suit ne sert qu'à obtenir la plus belle trace possible, et à savoir d'avance où elle ne donnera rien.</p>
      </div>
    </section>

    <section class="bande bande--turquoise trame" style="padding-block:clamp(2.6rem,6vw,5rem)">
      <div class="colonne">
        <div class="planche-titre">
          <span class="planche-titre__num">Le principe</span>
          <h2>Un tampon encreur, sans encre.</h2>
        </div>
        <div class="coupe">
          <div class="coupe__temps">
            <div class="coupe__scene">${coupeUn()}</div>
            <h3>1. Le relief</h3>
            <p class="legende">Gravé en miroir sous la semelle, de trois à cinq millimètres selon la référence. Le reste de la semelle est plat, pour que le motif soit seul à marquer.</p>
          </div>
          <div class="coupe__temps">
            <div class="coupe__scene">${coupeDeux()}</div>
            <h3>2. L'appui</h3>
            <p class="legende">Le poids du corps enfonce le relief et chasse la matière sur les côtés. C'est ce petit bourrelet, de part et d'autre, qui donne à l'empreinte son ombre nette.</p>
          </div>
          <div class="coupe__temps">
            <div class="coupe__scene">${coupeTrois()}</div>
            <h3>3. La trace</h3>
            <p class="legende">Le motif reste creusé, puis remis à l'endroit par le passage du miroir. Il tient jusqu'à la prochaine vague, ou jusqu'au prochain coup de vent.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bande bande--papier">
      <div class="colonne">
        <div class="planche-titre">
          <span class="planche-titre__num">Le geste</span>
          <h2>Marchez plus lentement que d'habitude.</h2>
        </div>
        <div class="duo">
          <div class="prose">
            <h3>Posez le talon, déroulez</h3>
            <p>Une tong claque : le pied se décolle avant d'avoir fini d'appuyer, et l'empreinte sort tronquée par le haut. Déroulez le pied du talon vers les orteils, comme en marchant pieds nus, et le motif sortira entier.</p>
            <h3>Un pas franc vaut mieux qu'un pas appuyé</h3>
            <p>Inutile de forcer. C'est la surface du relief qui fait le dessin, pas la force que vous y mettez. Écraser ne creuse pas plus profond, cela élargit seulement les bords et brouille les détails.</p>
            <h3>Cherchez la bande mouillée</h3>
            <p>Sur une plage, la meilleure trace se trouve toujours sur les deux mètres que la mer vient de quitter. Le sable y est dense, il tient les angles, et le contraste entre le creux sombre et la surface claire est à son maximum.</p>
          </div>
          <div class="prose">
            <h3>Entretien</h3>
            <p>Rincez à l'eau claire et laissez sécher à plat, motif vers le haut. Du sable resté au fond d'un relief finit par l'arrondir, et un relief arrondi ne dessine plus rien de net.</p>
            <p>Une vieille brosse à dents suffit à déloger ce qui s'accroche dans les creux fins — les rayons du soleil, la grille du casque, l'étiquette en losange.</p>
            <h3>Ce que la maison ne promet pas</h3>
            <ul>
              <li>Une empreinte durable : la première vague l'efface, et c'est très bien ainsi.</li>
              <li>Un résultat sur sol dur : aucune tong ne marque le béton.</li>
              <li>Une tenue de randonnée : ce sont des tongs. Elles vont de la serviette à la buvette.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="bande bande--creme">
      <div class="colonne">
        <div class="planche-titre">
          <span class="planche-titre__num">Les sols</span>
          <h2>Où ça marche, où ça ne marche pas.</h2>
        </div>
        <div class="tableau-enveloppe">
          <table class="tableau">
            <caption class="invisible">Rendu de l'empreinte selon la nature du sol</caption>
            <thead>
              <tr><th scope="col">Nature du sol</th><th scope="col">Rendu</th><th scope="col">Ce qu'il faut savoir</th></tr>
            </thead>
            <tbody>
          ${rangs}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="bande bande--encre">
      <div class="colonne">
        <div class="planche-titre">
          <span class="planche-titre__num">Les moules</span>
          <h2>Les quatre reliefs, vus de dessous.</h2>
        </div>
        <p class="legende" style="max-width:52ch;margin-bottom:2rem">Sous la semelle, chaque motif est gravé à l'envers. C'est en marchant que vous le remettez à l'endroit, exactement comme un tampon.</p>
        <div style="display:grid;gap:clamp(1rem,3vw,2rem);grid-template-columns:repeat(auto-fit,minmax(9rem,1fr))">
        ${reliefs}
        </div>
        <p style="margin-top:2rem"><a class="lien-fleche" href="catalogue.html">Voir le catalogue ${icones.fleche({ taille: 15 })}</a></p>
      </div>
    </section>

    ${blocListe()}
  `;
}
