---
name: Piénus
description: Catalogue de vente par correspondance français, été 1978 — papier journal jauni, aplats mal repérés, pastilles de prix étoilées.
colors:
  papier: "#f2e7cf"
  papier-clair: "#f8f0dd"
  papier-fonce: "#e5d3ae"
  encre: "#221d17"
  encre-douce: "#554b3d"
  encre-pale: "#7d7161"
  sanguine: "#c1330e"
  sanguine-sombre: "#93250a"
  turquoise: "#00736f"
  turquoise-sombre: "#005955"
  moutarde: "#f0ab16"
  moutarde-sombre: "#b57c05"
  sable: "#dec89a"
  sable-clair: "#f2e2bd"
  sable-ombre: "#b4915b"
  sable-creux: "#8f6f42"
  sable-encre: "#684c25"
typography:
  marque:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.5rem, 1.15rem + 1.4vw, 2.1rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 118"
  display:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.6rem, 1.5rem + 5.4vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 108"
  headline:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.9rem, 1.2rem + 3.2vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 108"
  title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.3rem, 1.05rem + 1.2vw, 1.85rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 108"
  body:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.09rem)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    lineHeight: 1.35
    letterSpacing: "0.13em"
    fontVariation: "'wdth' 78"
  caption:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.42
    letterSpacing: "normal"
    fontVariation: "'wdth' 82"
  numeral:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "inherit"
    fontWeight: 700
    lineHeight: "inherit"
    letterSpacing: "normal"
    fontFeature: "tabular-nums lining-nums"
    fontVariation: "'wdth' 80"
rounded:
  droit: "0"
  focale: "1px"
  rond: "50%"
spacing:
  filet: "3px"
  gouttiere: "clamp(1.25rem, 3.2vw, 2.5rem)"
  marge: "clamp(1.1rem, 4.5vw, 4rem)"
  colonne: "min(100% - var(--marge) * 2, 78rem)"
  bande: "clamp(3.2rem, 8vw, 7rem)"
  planche: "clamp(1.6rem, 3.5vw, 2.8rem)"
components:
  bouton:
    backgroundColor: "{colors.sanguine}"
    textColor: "#fff8ea"
    typography: "{typography.label}"
    rounded: "{rounded.droit}"
    padding: "0.82rem 1.5rem"
  bouton-hover:
    backgroundColor: "{colors.sanguine}"
    textColor: "#fff8ea"
  bouton-creux:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.droit}"
    padding: "0.82rem 1.5rem"
  bouton-creux-hover:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.papier}"
  bouton-encre:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.papier}"
  bouton-moutarde:
    backgroundColor: "{colors.moutarde}"
    textColor: "{colors.encre}"
  bouton-turquoise:
    backgroundColor: "{colors.turquoise}"
    textColor: "#fff8ea"
  bouton-disabled:
    backgroundColor: "{colors.papier-fonce}"
    textColor: "{colors.encre-pale}"
  article:
    backgroundColor: "{colors.papier-clair}"
    textColor: "{colors.encre}"
    rounded: "{rounded.droit}"
    padding: "1.4rem 1.3rem 1.5rem"
  article-hover:
    backgroundColor: "{colors.papier}"
  pastille:
    backgroundColor: "{colors.moutarde}"
    textColor: "{colors.encre}"
    size: "5.6rem"
  pastille-grande:
    backgroundColor: "{colors.moutarde}"
    textColor: "{colors.encre}"
    size: "8.5rem"
  champ-saisie:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "{rounded.droit}"
    padding: "0.7rem 0.8rem"
  champ-saisie-erreur:
    backgroundColor: "#fdeee9"
    textColor: "{colors.encre}"
  jeton:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.droit}"
    padding: "0.2rem 0.55rem"
  jeton-faible:
    textColor: "{colors.encre-pale}"
  enseigne:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    padding: "0.7rem 0"
  enseigne-bon:
    backgroundColor: "{colors.moutarde}"
    textColor: "{colors.encre}"
    padding: "0.45rem 0.75rem"
  tiroir:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    width: "min(30rem, 100%)"
  bon:
    backgroundColor: "{colors.papier-clair}"
    textColor: "{colors.encre}"
    rounded: "{rounded.droit}"
    padding: "clamp(1.4rem, 3.5vw, 2.6rem)"
  accuse:
    backgroundColor: "#e4f0ee"
    textColor: "{colors.turquoise-sombre}"
    padding: "1rem 1.2rem"
  tableau-entete:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.papier}"
    typography: "{typography.label}"
    padding: "0.75rem 0.9rem"
---

# Design System: Piénus

## Overview

**Creative North Star : « Le catalogue de vente par correspondance, été 1978 »**

Ce n'est pas une boutique en ligne habillée de rétro. C'est un catalogue papier
transposé à l'écran : des planches numérotées, des références chiffrées, des
relevés techniques en tableau, des pastilles de prix tamponnées en marge, et un
bon de commande que l'on remplit à la fin. Le monde et sa raison d'être sont
inscrits dans un commentaire HTML livré au sommet de chaque page (le contrat de
direction, `src/lib/gabarit.js`) : la page peut être auditée contre la décision
qui l'a produite. Ce document décrit ce que le code fait réellement, pas ce qu'il
projetait de faire.

Le support est un papier journal jauni. Il n'est jamais blanc, jamais lisse : un
grain fractal de 180 px est peint dans le fond de chaque aplat et repris en
`multiply`, de sorte que la trame reste visible sous la sanguine comme sous
l'encre. Par-dessus, les sections signalées `.trame` reçoivent un tramage offset
— des points de demi-teinte de 4 px à 13 % d'opacité. Les couleurs ne sont pas
des accents : elles tiennent des sections entières, du filet supérieur au filet
inférieur. Une bande est sanguine, une autre turquoise, une autre encre ; on ne
mélange pas deux aplats dans un même bloc.

La géométrie est celle d'une presse : aucun angle arrondi, un filet de 3 px
partout où deux choses se séparent, et des textes serrés (`font-stretch` 78 %
à 118 % sur un même Archivo variable). La profondeur ne vient jamais de la
lumière : elle vient d'une seconde plaque d'encre décalée d'un demi-millimètre
et composée en `multiply`. Le site refuse explicitement le hero lifestyle, la
grille de quatre cartes identiques et le bouton arrondi du secteur.

**Key Characteristics :**

- Papier jauni tramé, jamais blanc ; le grain survit sous tous les aplats.
- Aplats pleine bande (sanguine, turquoise, moutarde, encre, sable) plutôt
  qu'accents ponctuels.
- Zéro rayon de courbure, filets de 3 px, bords francs.
- Grotesque unique (Archivo variable) exploitée sur ses deux axes, graisse et
  largeur.
- Repérage volontairement raté : seconde plaque décalée en `multiply`.
- Un seul moment de motion sur tout le site.

## Colors

Une palette d'imprimeur : un papier, une encre noire, trois encres d'accent
saturées et une famille de sables réservée aux illustrations d'empreintes.

### Primary

- **Sanguine** (`{colors.sanguine}`) : l'encre d'action. Elle porte le bouton
  principal, le soulignement de tous les liens du corps de texte, la barre de
  survol du menu, l'anneau de focus, le curseur de saisie, le `+` des questions
  fréquentes, la seconde plaque du repérage par défaut, et le poucier de la
  barre de défilement au survol. Elle tient aussi la bande complète du bon de
  commande.
- **Sanguine sombre** (`{colors.sanguine-sombre}`) : uniquement l'état d'erreur
  de formulaire — bordure du champ fautif et texte du message.

### Secondary

- **Turquoise** (`{colors.turquoise}`) : l'encre d'explication. Elle tient les
  bandes pédagogiques (le principe en trois temps, sur l'accueil et la notice),
  encadre l'accusé de réception et le bloc « Le conseil de la maison ».
- **Turquoise sombre** (`{colors.turquoise-sombre}`) : la variante lisible sur
  papier — mention de relief sur les articles, « Oui » du tableau comparatif,
  cotes des schémas en coupe, texte de l'accusé.

### Tertiary

- **Moutarde** (`{colors.moutarde}`) : l'encre de prix et de repère. Elle
  remplit toutes les pastilles de prix, le bouton compteur du bon dans
  l'enseigne, l'en-tête du tiroir, les titres de colonnes du pied, et sert de
  couleur de sélection de texte. Sur fond sombre, c'est elle qui prend le relais
  du survol des liens, la sanguine y tombant sous le seuil de contraste.
- **Moutarde sombre** (`{colors.moutarde-sombre}`) : déclarée, non employée à ce
  jour.

### Neutral

- **Papier** (`{colors.papier}`) : le fond général du document, le fond de
  l'enseigne, le fond des champs de saisie au repos, le texte sur fond encre.
- **Papier clair** (`{colors.papier-clair}`) : les surfaces posées sur le papier
  — cartes d'article, bon de commande, réglette, scènes des schémas, pied du
  tiroir, et le texte sur les aplats saturés.
- **Papier foncé** (`{colors.papier-fonce}`) : les filets internes de faible
  hiérarchie (lignes de tableau, séparateurs du bon, liseré intérieur du bon),
  le fond du bouton désactivé, la piste de la barre de défilement.
- **Encre** (`{colors.encre}`) : la couleur du texte, de tous les filets et de
  toutes les bordures. C'est aussi un aplat de bande à part entière.
- **Encre douce** (`{colors.encre-douce}`) : les textes secondaires — chapô,
  légendes, baselines d'article, intitulés de relevé.
- **Encre pâle** (`{colors.encre-pale}`) : les états faibles — texte
  d'invite de champ, bouton désactivé, jeton en pointillé, « Non » du tableau.

### Sables (illustration)

Famille réservée aux SVG d'empreintes et aux schémas en coupe ; elle ne sert
jamais d'habillage d'interface.

- **Sable** (`{colors.sable}`) : le fond du premier écran, des vignettes
  d'article et de la scène de fiche produit.
- **Sable clair** (`{colors.sable-clair}`) / **sable ombre**
  (`{colors.sable-ombre}`) / **sable creux** (`{colors.sable-creux}`) /
  **sable encre** (`{colors.sable-encre}`) : la lèvre éclairée du creux, le
  grain, le fond du creux, et le texte de mention posé sur du sable.

### Named Rules

**La règle de la bande entière.** Une encre saturée tient une section complète,
d'un filet à l'autre. Elle ne s'emploie pas comme fond d'un encadré isolé au
milieu d'une bande papier.

**La règle de la moutarde sur fond sombre.** Sur `bande--encre`, dans le pied et
dans l'en-tête du tiroir, le survol des liens passe en moutarde et non en
sanguine : la sanguine sur ces fonds ne franchit pas le seuil de contraste.

**La règle des sables.** Les tons de sable appartiennent aux illustrations. Un
bouton, une carte ou un champ n'est jamais peint en sable ; seuls les cadres qui
accueillent une empreinte le sont.

## Typography

**Fonte unique :** Archivo variable (auto-hébergée, OFL, axes de graisse
100–900 et de largeur 62–125 %), avec `'Helvetica Neue', Arial, sans-serif` en
repli et `font-synthesis: none`.

**Caractère :** une grotesque d'imprimeur de labeur. Les titres sont épais,
légèrement élargis (`wdth` 108) et très serrés (`-0.035em`, interligne 0.94) ;
les étiquettes sont au contraire condensées (`wdth` 76 à 84) et espacées
(`0.10em` à `0.16em`). Le contraste de largeur, et non un second caractère,
produit toute la hiérarchie du catalogue.

### Hierarchy

- **Marque** (900, `clamp(1.5rem, 1.15rem + 1.4vw, 2.1rem)`, `wdth` 118,
  `-0.045em`) : le mot « Piénus » dans l'enseigne, et lui seul. C'est la seule
  occurrence de la graisse 900 hors pastille de prix.
- **Display** (800, `clamp(2.6rem, 1.5rem + 5.4vw, 5.6rem)`, interligne 0.94) :
  le `h1` de chaque page, un seul par page. Sur l'accueil il est limité à 15
  caractères de large ; sur les fiches et les pages de texte, il est précédé
  d'un filet plein et jamais d'un numéro de planche.
- **Headline** (800, `clamp(1.9rem, 1.2rem + 3.2vw, 3.5rem)`) : le `h2` d'une
  section, toujours accompagné de son numéro de planche sur le même filet.
- **Title** (800, `clamp(1.3rem, 1.05rem + 1.2vw, 1.85rem)`, `-0.025em`) : les
  `h3` des temps du schéma et des blocs de prose.
- **Body** (400, `clamp(1rem, 0.96rem + 0.2vw, 1.09rem)`, interligne 1.62,
  mesure 68 caractères) : le corps de texte. La prose longue se limite à 66–68
  caractères.
- **Label** — classe `.mention` (650, 0.75rem, `wdth` 78, `0.13em`, capitales) :
  références, intitulés courts, numéros de planche, mesures de réglette. Deux ou
  trois mots au maximum.
- **Caption** — classe `.legende` (400, 0.82rem, `wdth` 82, encre douce, mesure
  34 caractères) : commentaires d'illustration et précisions sous un bloc.
- **Numeral** — classe `.chiffre` (700, `wdth` 80, `tabular-nums lining-nums`) :
  prix, références, cotes, quantités. Elle s'ajoute à une autre classe, elle ne
  la remplace pas.

### Named Rules

**La règle du plancher de 11 px.** Aucun texte fonctionnel ne descend sous
0.7 rem (11,2 px). C'est la valeur qu'atteignent la saison dans l'enseigne, le
bouton du menu compact, le compteur du bon et l'unité de la pastille ; rien
n'est plus petit.

**La règle des capitales courtes.** Les capitales sont réservées aux étiquettes
de deux ou trois mots : `.mention`, `.planche-titre__num`, libellés de bouton,
en-têtes de tableau, intitulés de relevé. Une phrase ne se met jamais en
capitales — c'est la raison d'être de `.tarifs-pied`, qui dit la même chose
qu'une mention mais en bas de casse parce qu'elle fait une phrase.

**La règle du numéro de planche.** Le numéro (`Planche II · Le catalogue`)
accompagne un `h2` de section : il informe que le catalogue est paginé. Il ne
coiffe jamais un `h1` ; un `h1` s'annonce par un filet plein.

## Layout

**Colonne.** Une seule mesure gouverne toute la largeur :
`--colonne: min(100% - var(--marge) * 2, 78rem)`, centrée. L'enseigne, le pied,
chaque bande et le premier écran s'y alignent tous — il n'existe pas de second
conteneur plus étroit.

**Bandes.** La page est une pile de sections `.bande`, chacune avec son aplat et
son rembourrage vertical `clamp(3.2rem, 8vw, 7rem)`. La transition d'une section
à l'autre se lit par le changement d'encre, pas par un espacement supplémentaire.

**Grilles.** Trois formations seulement :
- `.planche` — la planche du catalogue, une colonne sous 52 rem, trois colonnes
  au-delà ; l'article vedette occupe la largeur complète (`grid-column: 1 / -1`)
  et bascule alors en deux colonnes internes 1 / 1.25.
- `.duo` — deux colonnes égales à partir de 52 rem, ou 1.25 / 1 en variante
  `--penche`.
- `.coupe` — trois colonnes égales à partir de 52 rem pour les trois temps du
  schéma.

**Points de rupture observés :** 46 rem (le pied passe en trois colonnes),
52 rem (planche, duo, coupe), 56 rem en maximum (le menu bascule en menu
compact déroulant sous l'enseigne), 60 rem (la fiche produit passe en deux
colonnes et la mention de saison apparaît dans l'enseigne), 62 rem (le premier
écran passe en deux colonnes et prend une hauteur minimale de
`min(78vh, 42rem)`).

**Premier écran.** Champ de sable pleine largeur, deux colonnes quasi égales
(1.02 / 0.98). À gauche : titre, chapô, bouton sanguine et lien flèche, puis la
mention d'étape posée sur un filet de 3 px. À droite : une seule empreinte
relevée à l'échelle 1, sa réglette graduée et sa légende centrée. Rien d'autre.

**Adhérence.** L'enseigne est collante en haut (`z-index: 50`), le visuel de
fiche produit est collant à `6.5rem`, et les en-têtes du tableau comparatif
sont collants dans leur enveloppe défilante. La pile de plans est fixe :
enseigne 50, voile 65, tiroir 70, lien d'évitement 90.

**Impression.** Un vrai mode papier existe : enseigne, tiroir, voile, grille du
pied et boutons sont masqués, la trame offset est retirée, le fond passe en
blanc et le texte en noir, et le rembourrage des bandes tombe à 1.2 rem.

### Named Rules

**La règle du conteneur unique.** `overflow-x: hidden` est proscrit sur `html`
et `body`. Il fabrique un second conteneur de défilement, casse le positionnement
collant de l'enseigne et du visuel de fiche, et rend le défilement ancré
imprévisible. Un débordement horizontal se corrige à la source, ou se confine
dans une enveloppe locale — `.tableau-enveloppe` en est le seul exemple légitime.

**La règle du bord vif.** Une section peut couper à ras (`overflow: hidden` sur
`.ouverture`), mais seulement à l'échelle d'une bande, jamais à celle du
document.

## Elevation & Depth

Ce système n'a pas de lumière. Il a des plaques d'encre.

La profondeur se lit à trois choses : la superposition d'aplats, l'épaisseur des
filets, et le repérage volontairement raté. La classe `.repere` duplique un mot
via `attr(data-repere)` dans un pseudo-élément décalé de `-0.022em` en x et
`+0.018em` en y, peint en sanguine (ou turquoise, moutarde, papier foncé selon
la variante) et composé en `mix-blend-mode: multiply` sous le texte. C'est une
seconde passe d'impression mal calée, pas une ombre portée — la nuance est
structurante : le décalage ne suit pas une direction de lumière et la couleur
n'est pas un noir transparent.

Les ombres réelles se comptent sur les doigts d'une main et sont toutes
mécaniques :

### Shadow Vocabulary

- **Butée de bouton** (`box-shadow: 0 2px 0 0 var(--encre), 0 6px 14px -8px rgba(34,29,23,0.6)`) :
  l'état de repos du bouton. Le premier terme est un trait plein, pas un flou :
  c'est l'épaisseur de la matière.
- **Butée haute** (`0 4px 0 0 var(--encre), 0 12px 20px -10px rgba(34,29,23,0.55)`) :
  au survol, combinée à `translateY(-2px)`.
- **Butée écrasée** (`0 1px 0 0 var(--encre), 0 4px 8px -6px rgba(34,29,23,0.5)`) :
  à l'appui, combinée à `translateY(1px)`.
- **Tranche de tiroir** (`-18px 0 40px -24px rgba(34,29,23,0.7)`) : la seule
  ombre franchement diffuse du site, sur le bord gauche du tiroir du bon.
- **Voile** (`rgba(34,29,23,0.55)` + `backdrop-filter: blur(2px)`) : l'écran
  derrière le tiroir ouvert.

### Named Rules

**La règle du grain peint.** Le grain appartient au fond de chaque aplat
(`background-image: var(--grain)` + `background-blend-mode: multiply`), jamais à
un calque `position: fixed` en `mix-blend-mode` par-dessus la page. Un tel calque
force le navigateur à recomposer toute la surface à chaque image de défilement,
pour un résultat identique. Le tramage offset `.trame::after` est absolu et
confiné à sa section — il ne franchit pas cette limite.

**La règle de l'encre, pas de la lumière.** Un décalage de plaque se compose en
`multiply` avec une encre nommée. Une ombre portée noire semi-transparente pour
simuler un relief d'impression est un contresens dans ce monde.

## Shapes

**Rayon zéro.** Aucun angle arrondi nulle part : boutons, champs, cartes,
tiroir, jetons, tableaux. Les deux seules exceptions sont fonctionnelles —
`1px` sur l'anneau de focus, pour qu'il ne pique pas, et `50%` sur le compteur
de pastille du bon dans l'enseigne, qui est une gommette et non une surface.

**Trois épaisseurs de trait, et pas une de plus.**
- **3 px** (`--filet`) : la séparation structurante — bordure de carte, de
  bouton, de champ, de scène, de tiroir ; filet sous un `h2` de planche ; filet
  au-dessus d'un `h1` ; soulignement du rayon actif.
- **2 px** : la séparation secondaire — vignette d'article, jeton, pastille de
  coloris, bouton de retrait, réglette, bas d'en-tête d'article, soulignement du
  lien flèche.
- **1 px** : la séparation interne dans une même surface — lignes de tableau,
  lignes du bon, liseré intérieur du bon de commande, filet du bas de pied.

**Le pointillé.** Un seul emploi : la bordure du bon de commande
(`3px dashed`), qui cite le trait de découpe du coupon-réponse. Le jeton
`--faible` le reprend en 2 px pour signaler un sol déconseillé.

**La pastille étoilée.** Le prix vit dans une étoile à 14 branches découpée au
`clip-path` (28 sommets), en 5.6 rem ou 8.5 rem. Elle n'a pas de bordure : c'est
un tampon posé, pas un cadre.

**La réglette.** Une barre de 26 px de haut, bordée de 2 px, découpée en autant
de cases qu'il y a de centimètres, une case sur deux remplie d'encre. Elle
accompagne toute empreinte présentée à l'échelle 1.

**Les icônes.** Jeu maison de sept glyphes, tous dans une `viewBox 0 0 24 24`,
tracés à `stroke-width: 2.2`, `stroke-linecap: square`,
`stroke-linejoin: miter`, sans remplissage. Bouts francs, angles vifs : la même
grammaire que les filets.

## Components

### Boutons

Un bouton est une plaque de métal posée sur le papier : il a une épaisseur
visible et il s'enfonce quand on appuie dessus.

- **Forme :** rectangle strict (rayon 0), bordure de 3 px encre, rembourrage
  `0.82rem 1.5rem`.
- **Principal :** fond sanguine, texte `#fff8ea`, libellé en capitales
  condensées (750, 0.82 rem, `wdth` 84, `0.1em`), icône flèche à droite.
- **Survol / appui :** `translateY(-2px)` avec butée épaissie à 4 px ;
  `translateY(1px)` avec butée écrasée à 1 px. Transitions en 0.35 s
  `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Variantes :** `--turquoise`, `--encre`, `--moutarde` changent le fond via la
  variable locale `--fond`. `--creux` supprime le fond et la butée, prend la
  bordure en `currentColor`, et s'inverse en encre pleine au survol.
- **Désactivé :** fond papier foncé, texte et bordure en encre pâle, butée
  réduite à un trait, pas de déplacement.
- **Lien flèche** (`.lien-fleche`) : la variante sans plaque — capitales
  condensées soulignées d'un trait de 2 px ; la flèche seule se déplace de 4 px
  au survol.

### Cartes d'article

L'article de catalogue : une case de planche, pas une carte produit.

- **Forme :** rectangle bordé de 3 px encre, rembourrage `1.4rem 1.3rem 1.5rem`,
  fond papier clair.
- **Composition imposée :** vignette carrée (fond sable, bordure 2 px) puis
  en-tête référence / relief séparé par un filet de 2 px, nom, baseline en
  italique, et un pied qui pousse au bas de la carte le lien flèche et la
  pastille de prix.
- **Survol :** la carte monte de 4 px et son fond passe de papier clair à
  papier ; le nom passe en sanguine ; l'empreinte de la vignette grandit de
  5,5 % et pivote de −2° ; la pastille pivote de −7° et grandit de 5 %. Quatre
  mouvements simultanés, tous sur la même courbe de sortie.
- **Vedette :** la première référence occupe la largeur de la planche et bascule
  en deux colonnes internes ; son nom monte jusqu'à `3.1rem` et sa pastille
  passe en `--grande`.

### Champs de formulaire

- **Style :** bordure de 3 px encre, rayon 0, fond papier, texte encre,
  curseur de saisie sanguine, taille de police 1 rem (jamais moins — c'est aussi
  ce qui empêche le zoom automatique sur iOS).
- **Intitulé :** capitales condensées de 0.75 rem posées au-dessus, jamais à
  l'intérieur du champ.
- **Survol :** le fond passe en papier clair.
- **Erreur :** l'attribut `data-erreur="oui"` sur le conteneur `.champ` fait
  apparaître le message et bascule la bordure en sanguine sombre sur fond
  `#fdeee9`. Le message porte l'icône « attention » et une phrase qui dit quoi
  corriger.
- **Case à cocher :** 1.35 rem, `accent-color` sanguine, intitulé en 0.86 rem
  aligné en haut.

### Navigation

- **Enseigne :** barre collante, fond papier, bordure inférieure de 3 px encre.
  À gauche la marque (avec sa seconde plaque `.repere`) et la saison ; au centre
  rien ; à droite les rayons, puis le compteur du bon.
- **Rayons :** capitales condensées de 0.75 rem, soulignées d'un trait
  transparent de 3 px qui devient sanguine au survol et encre pour la page
  courante (`aria-current="page"`).
- **Sous 56 rem :** les rayons se replient en panneau vertical sous l'enseigne,
  ouvert par un bouton « Rayons » bordé de 3 px ; chaque entrée passe à 0.85 rem
  et se sépare d'un filet de 1 px.
- **Compteur du bon :** plaque moutarde bordée de 3 px, chiffre dans une
  gommette encre ronde ; passe en sanguine au survol. Sous 56 rem le libellé
  disparaît visuellement, le chiffre reste, et le nom accessible est réécrit par
  le script.

### Pastille de prix

La signature du catalogue. Étoile moutarde découpée au `clip-path`, montant en
900 condensé, unité en capitales de 0.7 rem sur la ligne suivante. Deux tailles
seulement : 5.6 rem sur une carte, 8.5 rem sur un article vedette ou une fiche
produit. Elle n'est jamais bordée, jamais rectangulaire, et ne sert qu'à un prix.

### Relevé technique et tableau comparatif

- **Relevé** (`.releve`) : table à deux colonnes sans bordure extérieure ;
  intitulés en capitales condensées d'encre douce sur 12 rem, valeurs alignées à
  gauche, filets de 1 px entre les lignes, aucun sur la dernière.
- **Tableau** (`.tableau`) : enveloppe bordée de 3 px avec défilement horizontal
  propre, largeur minimale de 40 rem, en-tête encre à texte papier collant en
  haut, lignes paires teintées de `rgba(229,211,174,0.32)`, « Oui » en turquoise
  sombre gras et « Non » en encre pâle.
- **Jeton** (`.jeton`) : petite étiquette bordée de 2 px en `currentColor`,
  capitales condensées, variante `--faible` en pointillé et encre pâle.

### Tiroir du bon de commande

Panneau fixe à droite, largeur `min(30rem, 100%)`, fond papier, bordure gauche
de 3 px encre. Il glisse de `translateX(101%)` à zéro en 0.42 s sur la courbe de
sortie, derrière un voile encre à 55 % flouté de 2 px. En-tête moutarde, corps
défilant, pied papier clair. Le bouton de fermeture est un carré de 2.5 rem
bordé de 3 px qui s'inverse en encre pleine au survol. L'état vide n'est pas une
absence : c'est un bloc `.vide` qui explique à quoi sert le bon et propose un
bouton creux vers le catalogue.

### Bon de commande

Bloc papier clair bordé de 3 px en pointillé, doublé d'un liseré intérieur de
1 px à 7 px du bord — le coupon-réponse détachable. Il contient l'accusé de
réception (encadré turquoise sur fond `#e4f0ee`, masqué tant que
`data-visible` n'est pas posé), le champ d'adresse, le choix de pointure, la
case d'accord et le bouton encre pleine largeur.

### Empreintes, semelles et pistes (composant signature)

Les quatre motifs sont dessinés à la main en SVG dans une `viewBox 0 0 120 120`
et se rendent de quatre façons, toutes issues du même tracé :

- **Empreinte** : le motif creusé. Une passe « lèvre » décalée de
  `(2.6, 2.8)` en sable clair, une passe « fond » en sable creux par-dessus, et
  une passe de grain filtrée par une turbulence fractale à 22 % d'opacité. La
  lumière tombe du haut-gauche, invariablement.
- **Relief** : le même tracé retourné en miroir, avec une passe d'ombre décalée
  de `(2.4, 2.6)` — le motif tel qu'il est moulé sous la semelle.
- **Semelle** : la tong vue de dessous dans une `viewBox 0 0 200 420`, gomme
  sombre, liseré de 3 px, motif en relief sur l'avant-pied, trois points
  d'ancrage de bride et six crampons en traits clairs.
- **Piste** : cinq à sept empreintes alternées qui rétrécissent, se rapprochent
  de l'axe et pivotent de moins en moins en s'éloignant vers le haut du cadre.

Chaque rendu porte un `role="img"` et un texte alternatif qui décrit le motif —
la blague doit passer sans voir l'image.

### Schéma en coupe

Trois cases de 4/3 bordées de 3 px, dans une `viewBox 0 0 200 150` avec la ligne
de sol à `y=100` : la gomme approche, la gomme s'enfonce en repoussant deux
bourrelets, la gomme repart et laisse quatre creux cotés. Les flèches sont
sanguine (moutarde sur bande turquoise), les cotes turquoise sombre, les grains
de sable des cercles semés à intervalle fixe.

### Named Rules

**La règle du contenu déjà là.** Aucun bloc n'est masqué en attendant une
animation. L'état visible est l'état CSS naturel ; une animation ne peut que le
retarder. Un site dont le script ne s'exécute pas reste entièrement lisible.

**La règle du seul mouvement.** Le site n'a qu'un moment de motion : la piste
d'empreintes qui s'imprime pas à pas (0.5 s par pas, 0.15 s d'écart, 0.3 s de
retard initial). Le script l'arme en posant `data-impression="en-cours"` à
l'entrée dans le cadre, puis la désarme systématiquement en
`data-impression="faite"` après la durée totale plus 400 ms — de sorte qu'un
compositeur mis en pause (onglet en arrière-plan, économie d'énergie) ne laisse
jamais un cadre vide. Toute nouvelle animation d'apparition doit reproduire ce
couple armement / désarmement, ou ne pas exister.

**La règle du désamorçage.** `prefers-reduced-motion: reduce` ramène toutes les
durées d'animation et de transition à 0.01 ms, désactive le défilement doux et
coupe l'animation de la piste. Aucune transition ne doit dépendre d'un
`transitionend` pour révéler du contenu.

## Do's and Don'ts

### Do:

- **Do** peindre le grain dans le fond de chaque nouvel aplat :
  `background: var(--couleur) var(--grain)` plus les trois propriétés de la
  règle groupée (`background-size: 180px 180px`, `repeat`, `blend-mode:
  multiply`). Un aplat sans grain se voit immédiatement.
- **Do** faire tenir une encre saturée sur une bande entière, d'un filet à
  l'autre.
- **Do** annoncer une section par `.planche-titre` : numéro de planche en
  capitales condensées, `h2`, le tout posé sur un filet de 3 px.
- **Do** annoncer un `h1` par un `<hr class="filet">` seul.
- **Do** rester dans les trois épaisseurs de trait (3 px / 2 px / 1 px) et dans
  les quatre variables d'espacement (`--filet`, `--gouttiere`, `--marge`,
  `--colonne`).
- **Do** accompagner toute empreinte présentée à l'échelle 1 de sa réglette
  graduée et de sa cote en centimètres.
- **Do** écrire un texte alternatif qui décrit le motif, pas sa référence.
- **Do** utiliser la moutarde pour le survol des liens sur `bande--encre`, dans
  le pied et dans l'en-tête du tiroir.
- **Do** vérifier que la page reste entière et lisible script désactivé avant de
  considérer un composant terminé.

### Don't:

- **Don't** poser `overflow-x: hidden` sur `html` ou `body`. Cela crée un second
  conteneur de défilement qui casse le positionnement collant de l'enseigne et
  du visuel de fiche.
- **Don't** empiler un calque de grain en `position: fixed` avec
  `mix-blend-mode` par-dessus la page : recomposition permanente pour un résultat
  identique au grain peint dans le fond.
- **Don't** simuler le repérage raté avec une ombre portée. C'est
  `mix-blend-mode: multiply` et une encre nommée, jamais un noir transparent, et
  le décalage ne suit aucune direction de lumière.
- **Don't** descendre un texte fonctionnel sous 0.7 rem (11,2 px), ni un champ
  de saisie sous 1 rem.
- **Don't** mettre en capitales une phrase de plus de trois mots. Les capitales
  sont pour les étiquettes.
- **Don't** coiffer un `h1` d'un numéro de planche.
- **Don't** arrondir un angle. Le rayon 1 px de l'anneau de focus et le 50 % du
  compteur du bon sont les deux exceptions du système ; il n'en faut pas de
  troisième.
- **Don't** masquer un bloc en attendant une animation, ni ajouter un second
  moment de motion sans le couple armement / désarmement de la piste.
- **Don't** peindre un élément d'interface en sable : cette famille appartient
  aux illustrations d'empreinte.
- **Don't** employer la pastille étoilée pour autre chose qu'un prix, ni la
  border.
- **Don't** ajouter un avis client, une note sur cinq, un compteur de ventes ou
  un compte à rebours : il n'existe aucune donnée réelle derrière, et le monde
  du catalogue n'en comporte pas.
