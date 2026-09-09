import { empreinte } from './motifs.js';
import { icones } from './icones.js';
import { tarifs, pointures } from '../data/produits.js';
import { SITE } from './gabarit.js';

/** La pastille étoilée du prix, telle qu'on la tamponnait en marge des articles. */
export function pastille(montant, { unite = 'la paire', grande = false } = {}) {
  return `<span class="pastille${grande ? ' pastille--grande' : ''}" role="text">
    <span>
      <span class="pastille__montant chiffre">${montant}&nbsp;${tarifs.devise}</span><br>
      <span class="pastille__unite">${unite}</span>
    </span>
  </span>`;
}

/** La réglette graduée en centimètres, posée sous chaque relevé d'empreinte. */
export function reglette(cm) {
  const entiers = Math.round(cm);
  const barres = Array.from({ length: entiers }, () => '<span class="reglette__cm"></span>').join('');
  return `<div style="display:grid;gap:0.35rem;width:min(100%,26rem)">
    <div class="reglette" role="img" aria-label="Réglette graduée : l'empreinte mesure ${String(cm).replace('.', ',')} centimètres.">${barres}</div>
    <div class="reglette__mesure mention" style="color:var(--sable-creux)"><span>0</span><span>${String(cm).replace('.', ',')} cm</span></div>
  </div>`;
}

/** Un article de la planche du catalogue. */
export function article(p, { vedette = false } = {}) {
  return `<a class="article${vedette ? ' article--vedette' : ''}" href="modele/${p.slug}.html">
        <span class="article__vignette">${empreinte(p.ref, { taille: 320, alt: p.alt })}</span>
        <span class="article__entete">
          <span class="mention article__ref chiffre">Réf. ${p.ref}</span>
          <span class="mention" style="color:var(--turquoise-sombre)">${p.relief} de relief</span>
        </span>
        <span>
          <span class="article__nom" style="display:block">${p.nom}</span>
        </span>
        <p class="article__baseline">${p.baseline}</p>
        <span class="article__pied">
          <span class="lien-fleche">La fiche ${icones.fleche({ taille: 15 })}</span>
          ${pastille(tarifs.paire, { grande: vedette })}
        </span>
      </a>`;
}

/**
 * Le bon de commande final : la seule action du site.
 * Tant qu'aucun carnet n'est relié (voir data-carnet), le formulaire le dit
 * franchement et propose l'inscription à la main plutôt qu'un faux accusé.
 */
export function blocListe() {
  const choix = pointures.map((p) => `<option value="${p}">${p}</option>`).join('');
  return `
    <section class="bande bande--sanguine trame" id="liste">
      <div class="colonne">
        <div class="duo duo--penche" style="align-items:start">
          <div class="pile pile--large">
            <div class="planche-titre" style="width:100%;margin-bottom:0">
              <span class="planche-titre__num">Planche IV · Le bon</span>
              <h2>On ne vend pas encore. On note.</h2>
            </div>
            <p>Les moules ne sont pas tous coulés et nous refusons d'encaisser quoi que ce soit avant d'avoir une paire à vous envoyer. En attendant, dites-nous quelles références vous voulez&nbsp;: c'est exactement ce qui décidera de l'ordre de fabrication.</p>
            <p class="legende" style="max-width:44ch">Pas de compte à créer, pas de carte bancaire, pas de compte à rebours inventé. Une adresse, et on vous écrit quand c'est prêt.</p>
          </div>

          <div class="bon">
            <div class="accuse" data-accuse>
              ${icones.coche({ taille: 22 })}
              <span><strong data-accuse-titre>C'est noté.</strong><span data-accuse-detail></span></span>
            </div>

            <noscript>
              <p style="border:3px solid var(--encre);padding:0.9rem 1.1rem;margin-bottom:1.2rem;font-size:0.94rem">
                Le bon de commande a besoin de JavaScript pour fonctionner.
                Écrivez-nous directement à <a href="mailto:${SITE.courriel}?subject=${encodeURIComponent('Inscription à la liste Piénus')}">${SITE.courriel}</a>
                en indiquant les références qui vous intéressent, et nous vous inscrivons à la main.
              </p>
            </noscript>
            <form data-liste method="post" action="#liste" novalidate data-carnet="/api/liste" data-courriel="${SITE.courriel}">
              <div class="champ">
                <label for="courriel">Votre adresse électronique</label>
                <input type="email" id="courriel" name="courriel" placeholder="vous@exemple.fr" autocomplete="email" required>
                <p class="champ__erreur">${icones.attention({ taille: 15 })} <span>Cette adresse ne semble pas valable. Vérifiez l'arobase et le point.</span></p>
              </div>

              <div class="champ">
                <label for="pointure">Votre pointure habituelle</label>
                <select id="pointure" name="pointure" data-pointure>
                  <option value="">Je ne sais pas encore</option>
                  ${choix}
                </select>
                <p class="champ__aide">Nos tongs taillent par paires de pointures. En cas d'hésitation, prenez la plus grande.</p>
              </div>

              <label class="case" style="margin-bottom:1.2rem">
                <input type="checkbox" name="prevenir" checked>
                <span>Prévenez-moi à l'ouverture des commandes. Une adresse, deux courriels par an au maximum, et un lien de désinscription dans chacun.</span>
              </label>

              <button class="bouton bouton--encre" type="submit" style="width:100%;justify-content:center">
                Déposer mon bon ${icones.fleche({ taille: 16 })}
              </button>
              <p class="champ__aide" style="margin-top:0.9rem;margin-bottom:0">Votre adresse ne sert qu'à ça. Voir <a href="confidentialite.html">le traitement de vos données</a>.</p>
            </form>
          </div>
        </div>
      </div>
    </section>`;
}
