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

## À faire avant la mise en ligne

Le site est aujourd'hui une **vitrine avec liste d'attente**. Il ne vend rien et
ne prétend rien vendre. Cinq points sont à traiter avant de publier :

1. **Mentions légales** — `src/pages/textes.js`, objet `mentions`. Tous les
   champs entre crochets sont à renseigner : raison sociale, adresse, SIREN,
   directeur de publication, hébergeur.
2. **Données personnelles** — même fichier, objet `confidentialite` : identité
   du responsable de traitement et prestataire d'envoi de courriels.
3. **Tarifs** — `src/data/produits.js`, objet `tarifs`. Les montants actuels
   (24,90 € / 44,90 € / 84,90 €) sont **indicatifs** et le site le dit à chaque
   affichage. À confirmer, ou à retirer, avant l'ouverture des commandes.
4. **Adresse électronique** — `src/lib/gabarit.js`, objet `SITE` : remplacez
   `bonjour@pienus.fr` par une adresse réellement relevée, et posez les
   enregistrements MX du domaine.
5. **Le carnet d'inscription** — voir ci-dessous. Tant qu'il n'est pas branché,
   le formulaire ne prétend pas enregistrer : il propose au visiteur d'envoyer
   son bon par courriel, et vous l'inscrivez à la main.

Ce qui n'existe nulle part sur le site, et qu'il ne faut pas ajouter à la
légère : avis clients, témoignages, compteur de ventes, note sur cinq, compte à
rebours, délais de livraison. Rien de tout cela n'est vrai aujourd'hui, et la
page « La maison » le dit noir sur blanc.

## Brancher le carnet d'inscription

Le formulaire lit l'attribut `data-carnet` (`src/lib/blocs.js`). Vide, il bascule
en inscription manuelle. Renseigné avec l'URL d'un point d'entrée HTTP, il y
envoie un POST JSON :

```json
{ "courriel": "…", "pointure": "42/43", "bon": [{ "ref": "204", "pointure": "42/43", "quantite": 1 }], "prevenir": true }
```

Un Worker Cloudflare avec une base D1 suffit :

```js
export default {
  async fetch(requete, env) {
    if (requete.method !== 'POST') return new Response('Méthode non permise', { status: 405 });
    const { courriel, pointure, bon, prevenir } = await requete.json();
    if (!courriel || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(courriel)) {
      return Response.json({ erreur: 'Adresse invalide' }, { status: 400 });
    }
    await env.DB.prepare(
      'INSERT INTO liste (courriel, pointure, bon, prevenir, cree_le) VALUES (?, ?, ?, ?, datetime("now"))'
    ).bind(courriel, pointure ?? '', JSON.stringify(bon ?? []), prevenir ? 1 : 0).run();
    return Response.json({ ok: true });
  },
};
```

Pensez au CORS si le Worker n'est pas servi depuis le même domaine, et à une
limitation de débit : le point d'entrée est public.

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
  de fiche produit. Aucun bloc n'est masqué en attendant une animation.
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
