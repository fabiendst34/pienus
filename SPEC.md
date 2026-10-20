# Spécification — Piénus

Catalogue en ligne d'une marque fictive de **tongs à semelles moulées** : chaque pas imprime un motif dans le sable, la terre ou la neige. « Le produit ne se juge pas au pied, il se juge à la trace. »

- **En ligne** : https://pienus.fabien-73c.workers.dev, **volontairement non indexable** (`noindex, nofollow` + `robots.txt`).
- **Hébergement** : Worker `pienus` sur le compte perso de Fabien (pas celui de Kévin).
- **Dépôt** : `fabiendst34/pienus`.
- Voir `PRODUCT.md` (cadrage, principes) et `DESIGN.md` (direction « catalogue VPC, été 1978 »).

## Étape actuelle : vitrine et liste d'attente

Le site **ne vend rien et ne prétend rien vendre**. Navigation, fiches produits et panier consultable fonctionnent ; l'action finale capture un e-mail « Préviens-moi au lancement ».

## Publics

- Particuliers de 20 à 45 ans préparant des vacances (plage, camping, festival), sur mobile, souvent depuis les réseaux sociaux.
- Acheteurs de cadeau drôle à moins de 30 €.

## Catalogue

Quatre références (`src/data/produits.js`), chacune avec textes, cotes, sols conseillés, coloris et tarifs indicatifs (24,90 / 44,90 / 84,90 €, signalés comme tels à chaque affichage). Les motifs sont **dessinés en SVG** dans `src/lib/motifs.js`, avec quatre rendus : empreinte creusée, relief en miroir, semelle, piste de pas.

**Contrainte juridique** : les motifs et les noms sont des **créations originales parodiques**. Aucune marque, logo ou personnage d'un tiers n'est reproduit ni cité. Ne pas lever cette contrainte sans avis juridique.

## Pages

| Module | Contenu |
|---|---|
| `pages/accueil.js` | Promesse, schéma en coupe du principe en trois temps, aperçu du catalogue |
| `pages/catalogue.js` | Les quatre références et le tableau comparatif |
| `pages/modele.js` | Fiche produit : motif, rendus, réglette graduée, pastille de prix, bon de commande |
| `pages/notice.js` | Mode d'emploi (sols meubles, entretien) |
| `pages/textes.js` | La maison, mentions légales, données personnelles |

## Carnet d'inscription

- Le bon de commande final envoie l'adresse e-mail au Worker (`worker.js`), qui l'enregistre dans la base **D1 `pienus-liste`** (schéma `schema.sql`).
- Aucune autre donnée n'est stockée ; la page de confidentialité décrit fidèlement ce qui l'est.

## Architecture technique

- Générateur Node **sans aucune dépendance** : `node build.mjs` lit `src/` et écrit `dist/` (non versionné).
- `src/lib/` : gabarit, blocs, icônes maison, motifs, schéma.
- Worker Cloudflare : sert `dist/` (`html_handling: none`, les liens portent leur `.html`) et l'API du carnet.
- `serve.mjs` : relecture locale sur `http://localhost:4321`.

Ajouter une référence : une entrée dans `produits.js`, un glyphe dans `motifs.js` ajouté à `glyphes` ; fiche, vignette, comparatif, plan du site et tiroir suivent.

## Commandes

```bash
node build.mjs
npm run serve       # build + relecture locale
npx wrangler deploy
```

## À trancher avant de lever le noindex

1. Mentions légales (raison sociale, siège, SIREN, TVA, directeur de publication).
2. Responsable de traitement et prestataire d'envoi d'e-mails.
3. Adresse de contact : `bonjour@pienus.fr` n'existe pas (domaine non déposé).
4. Tarifs à confirmer ou retirer.

## Interdits

Avis clients, témoignages, compteur de ventes, note sur cinq, compte à rebours, délais de livraison : rien de cela n'est vrai aujourd'hui.

## Hors périmètre

Paiement, Stripe, CGV définitives, fournisseur et logistique (dropshipping envisagé, non décidé).
