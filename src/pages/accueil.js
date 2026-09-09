import { produits, tarifs } from '../data/produits.js';
import { empreinte, piste } from '../lib/motifs.js';
import { coupeUn, coupeDeux, coupeTrois } from '../lib/schema.js';
import { icones } from '../lib/icones.js';
import { article, reglette, blocListe } from '../lib/blocs.js';

export const meta = {
  titre: 'Des tongs qui signent le sable',
  description:
    "Piénus moule des motifs sous la semelle : à chaque pas, l'empreinte s'imprime dans le sable. Quatre références au catalogue. Commandes bientôt ouvertes.",
  page: 'index.html',
};

export function corps() {
  const vedette = produits[0];
  const suite = produits.slice(1);

  return `
    <section class="ouverture trame">
      <div class="ouverture__grille">
        <div class="ouverture__titre">
          <h1>Des tongs qui <span class="repere" data-repere="signent">signent</span> le sable.</h1>
          <p class="ouverture__chapo">Sous chaque semelle, un motif moulé en relief. Vous marchez normalement&nbsp;; derrière vous, la plage se met à raconter quelque chose.</p>
        </div>

        <div class="ouverture__suite">
          <div class="ouverture__actions">
            <a class="bouton" href="catalogue.html">Voir les quatre modèles ${icones.fleche({ taille: 16 })}</a>
            <a class="lien-fleche" href="notice.html">Comment ça marche ${icones.fleche({ taille: 15 })}</a>
          </div>
          <p class="ouverture__etape">Les commandes ouvrent bientôt. <a href="#liste">Laissez-nous votre adresse</a> et vous serez prévenu le premier.</p>
        </div>

        <figure class="piece" style="margin:0">
          <div class="piece__cadre">
            ${empreinte(vedette.ref, { taille: 420, alt: vedette.alt })}
          </div>
          ${reglette(9.5)}
          <figcaption class="legende" style="text-align:center;max-width:30ch">
            Réf.&nbsp;${vedette.ref} · ${vedette.nom}. Empreinte relevée sur sable humide, reproduite à l'échelle&nbsp;1.
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="bande bande--turquoise trame">
      <div class="colonne">
        <div class="planche-titre">
          <span class="planche-titre__num">Planche I</span>
          <h2>Trois millimètres de gomme, et tout le monde comprend.</h2>
        </div>
        <div class="coupe">
          <div class="coupe__temps">
            <div class="coupe__scene">${coupeUn()}</div>
            <h3>1. On moule à l'envers</h3>
            <p class="legende">Le motif est gravé en relief sous la semelle, en miroir, exactement comme un tampon encreur. Trois à cinq millimètres selon les modèles.</p>
          </div>
          <div class="coupe__temps">
            <div class="coupe__scene">${coupeDeux()}</div>
            <h3>2. Vous marchez</h3>
            <p class="legende">Votre poids fait le reste. Sur un sol meuble, le relief chasse la matière sur les côtés et vient buter au fond.</p>
          </div>
          <div class="coupe__temps">
            <div class="coupe__scene">${coupeTrois()}</div>
            <h3>3. Ça reste derrière vous</h3>
            <p class="legende">La semelle repart, le motif reste — et cette fois à l'endroit. Vous êtes déjà à dix mètres quand quelqu'un le remarque.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bande bande--papier" id="catalogue">
      <div class="colonne">
        <div class="planche-titre">
          <span class="planche-titre__num">Planche II · Le catalogue</span>
          <h2>Quatre références pour l'été.</h2>
        </div>
        <div class="planche">
          ${article(vedette, { vedette: true })}
          ${suite.map((p) => article(p)).join('\n          ')}
        </div>
        <p class="tarifs-pied">
          ${tarifs.paire}&nbsp;${tarifs.devise} la paire · ${tarifs.duo}&nbsp;${tarifs.devise} les deux · ${tarifs.quatuor}&nbsp;${tarifs.devise} la collection complète.
          <span style="text-transform:none;letter-spacing:0.02em">tarifs indicatifs, non contractuels.</span>
        </p>
      </div>
    </section>

    <section class="bande bande--creme">
      <div class="colonne">
        <div class="duo duo--penche" style="align-items:center">
          <div class="pile pile--large">
            <div class="planche-titre" style="width:100%;margin-bottom:0">
              <span class="planche-titre__num">Planche III · La notice</span>
              <h2>Il faut un sol qui accepte de se souvenir.</h2>
            </div>
            <p>Une tong Piénus ne fait rien de spécial sur le béton du parking. Elle a besoin d'un sol qui garde la forme qu'on lui donne&nbsp;: du sable, de la terre fine, de la neige tassée, de la poussière de camping.</p>
            <p>C'est notre seule limite, et nous préférons l'écrire tout de suite plutôt que de vous laisser la découvrir sur le carrelage de la salle de bains.</p>
            <div style="display:flex;flex-wrap:wrap;gap:0.8rem 1.4rem;align-items:center">
              <a class="bouton bouton--creux" href="notice.html">Lire la notice complète</a>
              <span class="legende">Sols, entretien, saisonnalité.</span>
            </div>
          </div>
          <div>
            <div style="border:3px solid var(--encre);background:var(--sable);padding:1.2rem;position:relative">
              ${piste('311', {
                alt: "Une piste d'empreintes de soleil et de palmier s'éloignant dans le sable, chaque pas plus petit que le précédent.",
              })}
              <p class="mention" style="position:absolute;left:1.2rem;bottom:1.2rem;color:var(--sable-encre)">Réf. 311 · sable humide</p>
            </div>
            <p class="legende" style="margin-top:0.8rem">Une vingtaine de mètres suffit à planter une palmeraie complète entre la serviette et le bord de l'eau.</p>
          </div>
        </div>
      </div>
    </section>

    ${blocListe()}
  `;
}
