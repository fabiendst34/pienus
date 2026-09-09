# Piénus

Catalogue en ligne d'une maison qui moule des motifs sous les semelles de tongs :
on marche, et le motif s'imprime dans le sable.

Site statique, généré par un script Node **sans aucune dépendance**. Pas de
`node_modules`, pas de chaîne de build, pas de framework. `node build.mjs` lit
`src/` et écrit `dist/`.

## Commandes

```bash
node build.mjs
```

```bash
node serve.mjs
```

Le serveur de relecture écoute sur <http://localhost:4321> et sert `dist/`.
`npm run serve` enchaîne les deux.

## Structure

```
src/
  data/produits.js     Les 4 références : textes, cotes, sols, coloris, tarifs
  lib/motifs.js        Les 4 motifs dessinés en SVG + leurs rendus
                       (empreinte creusée, relief en miroir, semelle, piste)
  lib/schema.js        Le schéma en coupe du principe, en trois temps
  lib/blocs.js         Pastille de prix, réglette graduée, article, bon de commande
  lib/gabarit.js       Enseigne, pied, tiroir, squelette HTML
  lib/icones.js        Le jeu d'icônes maison
  pages/               Une page = un module qui exporte meta + corps()
  assets/              styles.css, app.js, fonts/
build.mjs              Le générateur
serve.mjs              Le serveur de relecture
dist/                  Sortie (non versionnée)
```

Ajouter une référence au catalogue : une entrée dans `src/data/produits.js`, une
fonction de glyphe dans `src/lib/motifs.js`, et son ajout à l'objet `glyphes`.
La fiche produit, la vignette, le tableau comparatif, le plan du site et le
tiroir se mettent à jour tout seuls.

## Les motifs

Les quatre motifs sont des **créations originales**. Ils évoquent un casque de
méchant galactique, un soleil avec un palmier, un graffiti de fond de cahier et
une bouteille d'apéritif anisé, mais ne reproduisent **aucune marque, aucun
logo, aucun personnage appartenant à un tiers**, et les noms de produits ne
citent aucune marque déposée. C'est une contrainte du projet, pas un accident :
ne la levez pas sans avis juridique, la contrefaçon commence à la première vente.

## À faire avant de lever le noindex

Le site est aujourd'hui une **vitrine avec liste d'attente**. Il ne vend rien et
ne prétend rien vendre. Le carnet d'inscription, lui, fonctionne (voir plus bas).
Restent quatre points, tous suspendus à des informations que le code ne peut pas
deviner :

1. **Mentions légales** — `src/pages/textes.js`, objet `mentions`. L'hébergeur est
   renseigné (Cloudflare). Restent entre crochets : raison sociale, forme
   juridique, adresse du siège, SIREN, TVA, directeur de publication. Ce sont des
   mentions opposables : elles ne s'inventent pas.
2. **Données personnelles** — même fichier, objet `confidentialite` : identité du
   responsable de traitement, et prestataire d'envoi de courriels une fois choisi.
   Le reste de la page décrit fidèlement ce qui est réellement stocké.
3. **Adresse électronique** — `src/lib/gabarit.js`, objet `SITE`. `bonjour@pienus.fr`
   **n'existe pas** : le domaine `pienus.fr` n'est pas déposé et le site vit sur
   `workers.dev`. Toute page qui affiche cette adresse promet une boîte qui ne
   relève pas. À trancher : déposer le domaine et poser les MX, ou pointer une
   adresse existante.
4. **Tarifs** — `src/data/produits.js`, objet `tarifs`. Les montants actuels
   (24,90 € / 44,90 € / 84,90 €) sont **indicatifs**, et le site le dit à chaque
   affichage. À confirmer, ou à retirer, avant l'ouverture des commandes.

Ce qui n'existe nulle part sur le site, et qu'il ne faut pas ajouter à la légère :
avis clients, témoignages, compteur de ventes, note sur cinq, compte à rebours,
délais de livraison. Rien de cela n'est vrai aujourd'hui, et la page « La maison »
le dit noir sur blanc.

## Déploiement

**En ligne : <https://pienus.fabien-73c.workers.dev>** — Cloudflare Workers, compte
personnel de Fabien (`73c47f960a8baffb72252952ab8f16f5`), **pas** celui de Kévin
qui porte les sites clients. L'`account_id` est figé dans `wrangler.jsonc`.

Le site est **volontairement non indexable** : chaque page porte
`<meta name="robots" content="noindex, nofollow">` et `robots.txt` renvoie
`Disallow: /`, tant que les mentions légales portent des champs vides.

Construire puis publier :

```bash
node build.mjs
```

```bash
npx wrangler deploy
```

Pour lever le noindex, une fois les mentions légales remplies, il faut
reconstruire **avec la variable** avant de déployer — sans elle, le build
repasse en noindex :

```powershell
$env:PIENUS_INDEXABLE = "oui"
```

```powershell
$env:PIENUS_URL = "https://pienus.fabien-73c.workers.dev"
```

```powershell
node build.mjs
```

`PIENUS_URL` alimente `sitemap.xml` et `robots.txt` ; sans elle, le build retombe
sur `https://pienus.fr`.

### Deux réglages à ne pas défaire

- `html_handling: "none"` dans `wrangler.jsonc` : tous les liens générés portent
  leur `.html`, et le réglage par défaut (`auto-trailing-slash`) infligeait une
  redirection 307 à chaque clic interne. En contrepartie la racine ne résout plus
  d'elle-même, d'où la réécriture `/  /index.html  200` dans `dist/_redirects`,
  produite par le build. Retirer l'un sans l'autre casse le site.
- Les règles de `dist/_headers` ne se chevauchent pas. Un motif `/assets/*`
  générique s'ajoutait à `/assets/fonts/*` et produisait un `Cache-Control`
  à deux `max-age`, ce qui annulait le cache long des polices.

## Choix techniques

- **Polices auto-hébergées.** Archivo (variable, licence OFL) est servie depuis
  `assets/fonts/`. Aucun appel à Google Fonts : le visiteur ne contacte aucun
  serveur tiers, ce qui évite le bandeau de consentement.
- **Aucun traceur.** Pas d'analytics, pas de pixel, pas de cookie. Le seul
  stockage est le `localStorage` du bon de commande, sous la clé `pienus.bon.v1`.
- **Le contenu ne dépend pas du script.** Toutes les pages sont lisibles sans
  JavaScript ; il n'ajoute que le bon de commande, le menu compact et les vues
  de fiche produit. Aucun bloc n'est masqué en attendant une animation, et sans
  script le bon affiche un `<noscript>` qui renvoie vers l'adresse de la maison
  plutôt que de laisser un formulaire inerte.
- **Un seul moment de motion** : la piste d'empreintes qui s'imprime pas à pas.
  Le script l'arme puis la désarme systématiquement, de sorte qu'un compositeur
  en pause ne laisse jamais un cadre vide.

## Dépôt

<https://github.com/fabiendst34/pienus> — branche `main`, dossier de travail
`D:\Git\pienus`. Le dépôt exige le gestionnaire d'identifiants Git pour pousser :

```bash
git config credential.helper manager
```

`dist/` et `.wrangler/` ne sont pas versionnés : le premier se régénère avec
`node build.mjs`, le second est le cache local de wrangler.

## Le carnet d'inscription

**Branché et fonctionnel.** Le formulaire poste sur `/api/liste`, servi par
`worker.js` et adossé à la base D1 `pienus-liste` (Europe de l'Ouest).

Deux routes, tout le reste retombant sur le site statique :

| Route | Méthode | Rôle |
| --- | --- | --- |
| `/api/liste` | POST | Inscrire ou mettre à jour une adresse |
| `/api/desinscription?jeton=…` | GET | Retirer une adresse en un clic |

Garde-fous en place : validation de l'adresse, huit envois par heure et par
empreinte d'adresse IP, refus des origines étrangères, corps limité à 4 Ko,
bon nettoyé et plafonné à vingt lignes. **L'adresse IP n'est jamais stockée** —
seule une empreinte tronquée l'est, dans une table séparée purgée au-delà de
24 h, sans lien avec l'inscription.

Une adresse ne figure qu'une fois : se réinscrire met à jour la ligne existante
et réactive une adresse précédemment désinscrite.

### Administrer la liste

Voir les inscrits :

```bash
npx wrangler d1 execute pienus-liste --remote --command "SELECT courriel, pointure, bon, cree_le FROM liste WHERE desinscrit_le IS NULL ORDER BY cree_le"
```

Compter les références demandées, pour décider quel moule lancer d'abord :

```bash
npx wrangler d1 execute pienus-liste --remote --command "SELECT json_extract(v.value,'$.ref') AS ref, sum(json_extract(v.value,'$.quantite')) AS paires FROM liste, json_each(liste.bon) v WHERE desinscrit_le IS NULL GROUP BY ref ORDER BY paires DESC"
```

Exporter en JSON :

```bash
npx wrangler d1 execute pienus-liste --remote --json --command "SELECT * FROM liste" > liste.json
```

Recréer le schéma sur une base neuve :

```bash
npx wrangler d1 execute pienus-liste --remote --file=schema.sql
```
