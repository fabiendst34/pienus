import { SITE } from '../lib/gabarit.js';
import { blocListe } from '../lib/blocs.js';
import { icones } from '../lib/icones.js';
import { piste } from '../lib/motifs.js';
import { tarifs } from '../data/produits.js';

const enTete = (num, titre, chapo) => `
    <section class="bande bande--papier" style="padding-block:clamp(2.4rem,5vw,4rem) clamp(1.8rem,4vw,3rem)">
      <div class="colonne">
        <hr class="filet" style="margin-bottom:0.7rem">
        <h1 style="font-size:clamp(2.3rem,1.5rem+3.8vw,4.4rem)">${titre}</h1>
        ${chapo ? `<p style="font-size:clamp(1.05rem,0.98rem+0.45vw,1.32rem);max-width:54ch">${chapo}</p>` : ''}
      </div>
    </section>`;

/* ---------- La maison ------------------------------------------------- */

export const maison = {
  meta: {
    titre: 'La maison',
    description:
      "Piénus est une jeune maison qui moule des motifs sous les semelles de tongs. Voici honnêtement ce qui existe aujourd'hui, et ce qui n'existe pas encore.",
    page: 'maison.html',
  },
  corps: () => `
    ${enTete(
      'La maison',
      'Nous moulons des blagues sous des semelles.',
      "C'est une activité plus sérieuse qu'elle n'en a l'air, et une entreprise plus jeune qu'elle ne voudrait le laisser croire."
    )}

    <section class="bande bande--creme" style="padding-block:clamp(2.4rem,5vw,4rem)">
      <div class="colonne">
        <div class="duo duo--penche">
          <div class="prose">
            <h2>D'où vient l'idée</h2>
            <p>D'un constat sans grandeur : sur une plage, tout le monde regarde par terre. On suit les traces des autres sans y penser, on enjambe les châteaux, on lit les prénoms écrits au bâton. Le sol d'une plage est le seul support publicitaire que personne n'a jamais loué.</p>
            <p>Nous avons simplement pris la seule chaussure que l'on porte encore dans ce décor, et nous avons gravé quelque chose dessous.</p>

            <h2>Ce que nous savons faire</h2>
            <p>Dessiner un motif qui reste lisible une fois creusé dans du sable, ce qui est un exercice plus contraignant qu'un logo : pas de couleur, pas de trait fin, pas de dégradé. Une silhouette, des angles francs, et des vides assez larges pour que le grain ne les rebouche pas.</p>
            <p>Les quatre motifs de la saison 1 sont des dessins originaux, faits pour ça. Nous ne reproduisons aucune marque, aucun logo, aucun personnage appartenant à quelqu'un d'autre : d'abord parce que ce serait illégal, ensuite parce que ce serait moins drôle.</p>
          </div>

          <div>
            <div style="border:3px solid var(--encre);background:var(--sable);padding:1rem">
              ${piste('750', { alt: "Une piste d'empreintes de bouteille s'éloignant dans le sable." })}
            </div>
            <p class="legende" style="margin-top:0.8rem">Réf. 750, L'Anisé du Sud, relevé sur sable damé.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bande bande--encre">
      <div class="colonne">
        <div class="planche-titre">
          <span class="planche-titre__num">État des lieux</span>
          <h2>Où nous en sommes vraiment.</h2>
        </div>
        <div class="duo">
          <div class="prose">
            <h3 style="color:var(--moutarde)">Ce qui existe aujourd'hui</h3>
            <ul>
              <li>Quatre motifs dessinés et arrêtés.</li>
              <li>Ce catalogue, que vous êtes en train de lire.</li>
              <li>Une liste d'attente, qui décidera de l'ordre de fabrication.</li>
            </ul>
          </div>
          <div class="prose">
            <h3 style="color:var(--moutarde)">Ce qui n'existe pas encore</h3>
            <ul>
              <li>Les moules définitifs, et donc les premières paires.</li>
              <li>Le fournisseur retenu, et donc les délais de livraison réels.</li>
              <li>Le tarif définitif : ${tarifs.paire}&nbsp;${tarifs.devise} est une intention, pas un prix.</li>
              <li>Le moindre client, la moindre vente et le moindre avis. Vous n'en trouverez donc aucun sur ce site.</li>
            </ul>
          </div>
        </div>
        <p style="margin-top:2.2rem;max-width:60ch">Nous aurions pu remplir cette page de témoignages inventés et d'un compteur de ventes. Nous avons préféré vous dire où nous en sommes : c'est moins vendeur, mais vous saurez exactement ce que vous réservez.</p>
        <p style="margin-top:1.4rem"><a class="lien-fleche" href="#liste">Déposer mon bon ${icones.fleche({ taille: 15 })}</a></p>
      </div>
    </section>

    ${blocListe()}
  `,
};

/* ---------- Questions ------------------------------------------------- */

const QUESTIONS = [
  [
    "L'empreinte marche-t-elle vraiment ?",
    "<p>Sur un sol meuble, oui : c'est une simple affaire de relief et d'appui, le même principe qu'un tampon ou qu'une semelle crantée qui laisse ses rainures. Sur sol dur, non, et aucune tong ne le fera jamais. La <a href=\"notice.html\">notice</a> détaille sol par sol ce que vous obtiendrez.</p>",
  ],
  [
    'Est-ce que ça abîme le pied ?',
    "<p>Non. Le relief est à l'extérieur, sous la semelle. À l'intérieur, c'est une tong ordinaire, plate et lisse. Vous ne sentez rien de particulier en marchant, sinon un très léger appui du motif sur sol dur.</p>",
  ],
  [
    'Le motif s’use-t-il ?',
    "<p>Comme toute semelle, oui, et d'autant plus vite si vous marchez sur du bitume. Le sable, lui, use très peu. En usage de plage, le relief tient largement la saison ; sur un trajet quotidien en ville, il s'arrondira plus vite.</p>",
  ],
  [
    'Pourquoi vos modèles ne portent-ils pas le nom des vraies marques ?',
    "<p>Parce que ces noms et ces images appartiennent à d'autres, et que les reproduire sur un produit vendu s'appelle de la contrefaçon. Nos quatre motifs sont des dessins originaux, faits pour être lisibles dans du sable. Ils évoquent ce qu'ils évoquent, et c'est tout l'intérêt.</p>",
  ],
  [
    'La référence 512, franchement ?',
    "<p>Franchement, oui. Le dessin est schématique, il tient en trois formes géométriques, et il fait rire depuis quatre générations au dos des cahiers. Nous l'avons simplement déplacé de dix centimètres plus bas. À vous de juger de l'endroit et du moment.</p>",
  ],
  [
    'Quand puis-je commander ?',
    "<p>Dès que les moules seront prêts et qu'un fournisseur sera retenu. Nous n'annonçons pas de date tant que nous n'en tenons pas une : mieux vaut un site franc qu'un compte à rebours inventé. Laissez votre adresse sur le bon, vous serez prévenu le premier.</p>",
  ],
  [
    'Mon bon de commande m’engage-t-il ?',
    "<p>À rien du tout. Aucun paiement, aucune carte, aucun compte à créer. Le bon reste dans votre navigateur et nous sert à savoir quelles références mouler en premier. Vous pouvez le vider à tout moment.</p>",
  ],
  [
    'Quelles pointures, quels coloris ?',
    "<p>Du 36/37 au 46/47, par paires de pointures. Les coloris annoncés figurent sur chaque fiche produit ; ils seront confirmés en même temps que la première série, car ils dépendent du fournisseur retenu.</p>",
  ],
  [
    'Livrez-vous à l’étranger ?',
    "<p>La question se posera à l'ouverture des commandes. Aujourd'hui nous ne connaissons ni notre transporteur, ni nos frais de port, et nous préférons ne rien vous promettre là-dessus.</p>",
  ],
];

export const questions = {
  meta: {
    titre: 'Questions fréquentes',
    description:
      "Ce que les gens nous demandent avant de commander des tongs à empreintes : rendu réel, usure, pointures, ouverture des commandes.",
    page: 'questions.html',
  },
  corps: () => `
    ${enTete('Le service', 'Questions fréquentes.', 'Neuf questions, neuf réponses sans détour. Si la vôtre manque, <a href="contact.html">écrivez-nous</a>.')}

    <section class="bande bande--creme" style="padding-block:clamp(2rem,4vw,3.2rem) clamp(3rem,7vw,6rem)">
      <div class="colonne" style="max-width:min(100% - var(--marge)*2, 56rem)">
        ${QUESTIONS.map(
          ([q, r]) => `<details class="question">
          <summary>${q}${icones.plus({ taille: 20, classe: 'question__croix' })}</summary>
          <div class="question__corps">${r}</div>
        </details>`
        ).join('\n        ')}
      </div>
    </section>

    ${blocListe()}
  `,
};

/* ---------- Contact --------------------------------------------------- */

export const contact = {
  meta: {
    titre: 'Nous écrire',
    description: `Écrire à la maison Piénus : ${SITE.courriel}. Questions sur les modèles, la liste d'attente ou la revente.`,
    page: 'contact.html',
  },
  corps: () => `
    ${enTete('Le service', 'Nous écrire.', "Une vraie adresse, relevée par de vraies personnes. Nous sommes deux, alors la réponse met le temps qu'elle met — davantage en août.")}

    <section class="bande bande--creme" style="padding-block:clamp(2rem,4vw,3rem) clamp(3rem,7vw,6rem)">
      <div class="colonne">
        <div class="duo">
          <div class="bon">
            <p class="mention" style="margin-bottom:0.8rem">Par courrier électronique</p>
            <p style="font-size:clamp(1.2rem,1rem+1.2vw,1.9rem);font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin-bottom:1.2rem">
              <a href="mailto:${SITE.courriel}">${SITE.courriel}</a>
            </p>
            <p class="legende" style="max-width:42ch">Dites-nous de quelle référence vous parlez : nous les connaissons par leur numéro avant de les connaître par leur nom.</p>
            <p style="margin-top:1.4rem">
              <a class="bouton" href="mailto:${SITE.courriel}?subject=${encodeURIComponent('Question sur le catalogue Piénus')}">Ouvrir mon courrielleur ${icones.fleche({ taille: 16 })}</a>
            </p>
          </div>

          <div class="prose">
            <h2>Ce que nous savons déjà vous répondre</h2>
            <ul>
              <li><strong>« C'est pour quand ? »</strong> — Nous ne savons pas encore, et nous ne le devinerons pas mieux par courriel. Le <a href="#liste">bon</a> est le moyen le plus sûr d'être prévenu.</li>
              <li><strong>« Faites-vous du sur-mesure ? »</strong> — Pas pour l'instant. Un motif demande un moule, et un moule ne se fait pas à l'unité.</li>
              <li><strong>« Je tiens une boutique de plage »</strong> — Écrivez-nous, c'est exactement le genre de message qui nous intéresse à ce stade.</li>
              <li><strong>« Vous avez oublié un motif évident »</strong> — Dites lequel. Les propositions de la liste d'attente pèsent dans la saison 2.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    ${blocListe()}
  `,
};

/* ---------- Mentions légales ------------------------------------------ */

export const mentions = {
  meta: {
    titre: 'Mentions légales',
    description: 'Éditeur, hébergeur et propriété intellectuelle du site Piénus.',
    page: 'mentions-legales.html',
  },
  corps: () => `
    ${enTete('Le service', 'Mentions légales.', '')}

    <section class="bande bande--creme" style="padding-block:clamp(2rem,4vw,3rem) clamp(3rem,7vw,6rem)">
      <div class="colonne">
        <div class="prose">
          <div style="border:3px solid var(--sanguine);padding:1rem 1.2rem;margin-bottom:2rem;display:flex;gap:0.8rem;align-items:start">
            <span style="color:var(--sanguine-sombre);flex:0 0 auto;margin-top:0.2rem">${icones.attention({ taille: 20 })}</span>
            <p style="margin:0;font-size:0.94rem"><strong>À compléter avant mise en ligne.</strong> Les champs entre crochets doivent être renseignés par l'éditeur du site : raison sociale, adresse, immatriculation, directeur de publication et hébergeur retenu.</p>
          </div>

          <h2>Éditeur du site</h2>
          <p>
            [Raison sociale]<br>
            [Forme juridique] au capital de [montant]&nbsp;€<br>
            Siège social : [adresse complète]<br>
            SIREN : [numéro] — RCS de [ville]<br>
            N° de TVA intracommunautaire : [numéro]<br>
            Courriel : ${SITE.courriel}
          </p>

          <h2>Directeur de la publication</h2>
          <p>[Prénom Nom], en qualité de [fonction].</p>

          <h2>Hébergement</h2>
          <p>[Nom de l'hébergeur]<br>[Adresse de l'hébergeur]<br>[Téléphone ou site de l'hébergeur]</p>

          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble des dessins, motifs, textes et éléments graphiques présents sur ce site sont des créations originales de la maison Piénus. Les quatre motifs de semelle de la saison 1 sont des dessins originaux&nbsp;: ils ne reproduisent, n'imitent et n'incorporent aucune marque, aucun logo, aucun personnage ni aucune œuvre appartenant à un tiers.</p>
          <p>Toute reproduction, représentation ou adaptation, totale ou partielle, de ces éléments est interdite sans autorisation écrite préalable.</p>

          <h2>Nom de domaine</h2>
          <p>Le site est publié à l'adresse ${SITE.domaine}.</p>

          <h2>État du service</h2>
          <p>Ce site est un catalogue de présentation. Aucune vente n'y est conclue, aucun paiement n'y est collecté, aucune commande n'y est enregistrée. Les tarifs affichés sont indicatifs et non contractuels. Des conditions générales de vente seront publiées avant toute ouverture des commandes.</p>

          <h2>Signalement</h2>
          <p>Pour toute demande relative au contenu de ce site, écrivez à <a href="mailto:${SITE.courriel}">${SITE.courriel}</a>.</p>
        </div>
      </div>
    </section>
  `,
};

/* ---------- Confidentialité -------------------------------------------- */

export const confidentialite = {
  meta: {
    titre: 'Données personnelles',
    description:
      "Ce que Piénus collecte, pourquoi, combien de temps et comment exercer vos droits. Pas de traceur publicitaire, pas de revente d'adresses.",
    page: 'confidentialite.html',
  },
  corps: () => `
    ${enTete('Le service', 'Vos données personnelles.', "Le site ne dépose aucun traceur publicitaire et ne mesure pas votre audience. Voici la totalité de ce qui circule.")}

    <section class="bande bande--creme" style="padding-block:clamp(2rem,4vw,3rem) clamp(3rem,7vw,6rem)">
      <div class="colonne">
        <div class="prose">
          <div style="border:3px solid var(--sanguine);padding:1rem 1.2rem;margin-bottom:2rem;display:flex;gap:0.8rem;align-items:start">
            <span style="color:var(--sanguine-sombre);flex:0 0 auto;margin-top:0.2rem">${icones.attention({ taille: 20 })}</span>
            <p style="margin:0;font-size:0.94rem"><strong>À compléter avant mise en ligne.</strong> Renseignez l'identité du responsable de traitement et, le cas échéant, le prestataire d'envoi de courriels retenu.</p>
          </div>

          <h2>Responsable du traitement</h2>
          <p>[Raison sociale], [adresse]. Contact : <a href="mailto:${SITE.courriel}">${SITE.courriel}</a>.</p>

          <h2>Le bon de commande</h2>
          <p>Les références que vous ajoutez à votre bon sont conservées <strong>dans votre navigateur uniquement</strong>, au moyen du stockage local, sous la clé <code>pienus.bon.v1</code>. Elles ne sont transmises nulle part tant que vous ne validez pas le formulaire. Vider les données de site dans votre navigateur les efface définitivement.</p>

          <h2>La liste d'attente</h2>
          <p>Si vous déposez votre bon, nous recevons&nbsp;: votre adresse électronique, la pointure que vous avez éventuellement indiquée, et les références de votre bon.</p>
          <ul>
            <li><strong>Finalité</strong> : vous prévenir de l'ouverture des commandes, et arbitrer l'ordre de fabrication.</li>
            <li><strong>Base légale</strong> : votre consentement, donné par l'envoi du formulaire.</li>
            <li><strong>Durée de conservation</strong> : jusqu'à votre désinscription, et au plus tard vingt-quatre mois après votre inscription si les commandes n'ont pas ouvert.</li>
            <li><strong>Destinataires</strong> : la maison Piénus, et le cas échéant [prestataire d'envoi de courriels], à l'exclusion de tout autre. Vos données ne sont ni vendues, ni louées, ni transmises à des fins publicitaires.</li>
          </ul>

          <h2>Traceurs</h2>
          <p>Aucun cookie n'est déposé. Aucun outil de mesure d'audience, aucun pixel publicitaire, aucun réseau social embarqué. Les polices de caractères sont hébergées sur le site lui-même&nbsp;: votre navigateur n'appelle aucun serveur tiers en consultant ces pages. C'est aussi pourquoi vous ne verrez jamais de bandeau de consentement ici.</p>

          <h2>Vos droits</h2>
          <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur vos données. Pour l'exercer, écrivez à <a href="mailto:${SITE.courriel}">${SITE.courriel}</a>&nbsp;; nous répondons sous un mois. Chaque courriel que nous envoyons comporte un lien de désinscription immédiat.</p>
          <p>Si notre réponse ne vous satisfait pas, vous pouvez saisir la Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, 75007 Paris — <a href="https://www.cnil.fr" rel="noopener">cnil.fr</a>.</p>
        </div>
      </div>
    </section>
  `,
};
