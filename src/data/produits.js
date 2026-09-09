// Catalogue Piénus — saison 1. Quatre références.
// Les prix sont des TARIFS INDICATIFS non contractuels : la boutique n'encaisse pas encore.
// Voir README.md § « À remplacer avant ouverture des commandes ».

export const produits = [
  {
    ref: '204',
    slug: 'le-seigneur-noir',
    nom: 'Le Seigneur Noir',
    baseline: 'Le casque qui marque les esprits. Et le sable.',
    couleur: 'encre',
    accent: 'sanguine',
    argument: 'Pour celui qui arrive toujours en dernier et repart en premier.',
    description: [
      "Un pas, et l'ombre d'un casque apparaît derrière vous. Les enfants s'arrêtent net. Les adultes font semblant de regarder ailleurs. Vous, vous continuez vers la buvette sans vous retourner une seule fois.",
      "C'est notre modèle le plus profond : le relief atteint 5 millimètres, de sorte que le casque tient encore debout dans le sable sec, celui du haut de plage, là où les autres motifs s'effondrent.",
    ],
    empreinte: '9,5 × 7 cm',
    relief: '5 mm',
    sols: ['Sable sec', 'Sable humide', 'Terre battue', 'Neige tassée'],
    solsFaibles: ['Boue liquide'],
    conseil: "Marchez lentement et appuyez le talon. Le casque a besoin de son menton.",
    couleursDispo: [
      { nom: 'Noir mat', hex: '#1c1a17' },
      { nom: 'Gris ardoise', hex: '#4a4a48' },
    ],
    alt: "Empreinte laissée dans le sable par la semelle : un casque intégral menaçant, avec deux fentes en amande à la place des yeux, un nez triangulaire et une grille rectangulaire à la place de la bouche.",
  },
  {
    ref: '311',
    slug: 'plein-soleil',
    nom: 'Plein Soleil',
    baseline: 'Un palmier tous les soixante-dix centimètres.',
    couleur: 'moutarde',
    accent: 'turquoise',
    argument: "Le modèle de la famille. Celui qu'on commande par trois paires.",
    description: [
      "Le soleil se lève à chaque foulée et le palmier pousse dans son dos. Vingt mètres de plage, et vous avez planté une palmeraie complète entre la serviette et le bord de l'eau.",
      "Le motif le plus fin du catalogue : neuf rayons et cinq palmes, chacune détachée de l'autre. Il demande un sable un peu humide pour donner le meilleur de lui-même — celui de la bande que la marée vient de quitter.",
    ],
    empreinte: '10 × 8 cm',
    relief: '4 mm',
    sols: ['Sable humide', 'Sable damé', 'Terre fine'],
    solsFaibles: ['Sable sec très fin', 'Gravier'],
    conseil: "À réserver au sable mouillé. Le palmier perd ses palmes dans le sable sec.",
    couleursDispo: [
      { nom: 'Jaune tournesol', hex: '#f0b323' },
      { nom: 'Turquoise piscine', hex: '#00857e' },
      { nom: 'Blanc cassé', hex: '#efe3c8' },
    ],
    alt: "Empreinte dans le sable : un soleil rond entouré de neuf rayons pointus, et à sa droite un palmier au tronc courbé portant cinq palmes retombantes.",
  },
  {
    ref: '512',
    slug: 'le-petit-indiscret',
    nom: 'Le Petit Indiscret',
    baseline: "L'article qu'on n'offre qu'aux gens qu'on aime bien.",
    couleur: 'sanguine',
    accent: 'encre',
    argument: "Celui que nos vendeurs déconseillent, et celui qu'ils prendront quand même.",
    description: [
      "Nous avons longuement hésité à l'inscrire au catalogue. Notre directeur commercial a tranché en une phrase : « c'est celui que tout le monde prendra ». Nous verrons bien s'il a raison ; il n'avait pas l'air content de le penser.",
      "Le dessin est volontairement schématique, tel qu'on le trace au dos des cahiers depuis quatre générations. Nous n'avons rien inventé. Nous l'avons simplement mis sous une semelle.",
    ],
    empreinte: '8 × 6,5 cm',
    relief: '4,5 mm',
    sols: ['Sable sec', 'Sable humide', 'Terre battue'],
    solsFaibles: ['Sable très sec', 'Cour de récréation'],
    conseil: "Se porte de préférence à bonne distance des écoles maternelles.",
    couleursDispo: [
      { nom: 'Rouge apéritif', hex: '#e2431f' },
      { nom: 'Rose sable', hex: '#e8a08c' },
    ],
    alt: "Empreinte dans le sable : un dessin schématique et enfantin de sexe masculin, tel qu'on en griffonne au dos des cahiers d'école.",
  },
  {
    ref: '750',
    slug: 'l-anise-du-sud',
    nom: "L'Anisé du Sud",
    baseline: 'La bouteille qui vous précède.',
    couleur: 'turquoise',
    accent: 'moutarde',
    argument: "Le modèle qui donne l'heure sans montre.",
    description: [
      "Il est dix-huit heures trente, vous partez chercher les glaçons, et derrière vous s'aligne une rangée de bouteilles bien droites dans le sable. Plus personne autour de la serviette n'a besoin de demander l'heure.",
      "L'étiquette en losange est moulée à part, avec son petit soleil au centre. C'est le seul motif du catalogue qui comporte un détail à l'intérieur d'un détail, et c'est aussi celui qui nous a coûté le plus de moules ratés.",
    ],
    empreinte: '11 × 5 cm',
    relief: '4 mm',
    sols: ['Sable humide', 'Sable damé', 'Terre battue', 'Neige tassée'],
    solsFaibles: ['Sable sec'],
    conseil: "L'étiquette n'apparaît que sur sable mouillé. Ailleurs, vous n'aurez que la bouteille.",
    couleursDispo: [
      { nom: 'Jaune anis', hex: '#f0b323' },
      { nom: 'Vert bouteille', hex: '#2d5f3f' },
      { nom: 'Bleu Sud', hex: '#00857e' },
    ],
    alt: "Empreinte dans le sable : une bouteille d'apéritif au goulot étroit, portant une étiquette en losange ornée d'un petit soleil.",
  },
];

export const parRef = Object.fromEntries(produits.map((p) => [p.ref, p]));

// Tarifs indicatifs de lancement — NON CONTRACTUELS, à confirmer avant ouverture des commandes.
export const tarifs = {
  paire: '24,90',
  duo: '44,90',
  quatuor: '84,90',
  devise: '€',
  note: "Tarifs indicatifs de lancement, non contractuels. Ils seront confirmés à l'ouverture des commandes.",
};

export const pointures = ['36/37', '38/39', '40/41', '42/43', '44/45', '46/47'];
