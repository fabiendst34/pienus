/* Piénus — comportements du catalogue.
   Aucune dépendance. Le site reste entièrement lisible sans ce fichier :
   il n'ajoute que le bon de commande, le menu compact et les vues de fiche. */

(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const CLE = 'pienus.bon.v1';
  const $ = (sel, racine = document) => racine.querySelector(sel);
  const $$ = (sel, racine = document) => Array.from(racine.querySelectorAll(sel));

  /* ---------- Le bon de commande, gardé dans le navigateur ------------- */

  const lire = () => {
    try {
      const brut = localStorage.getItem(CLE);
      const val = brut ? JSON.parse(brut) : [];
      return Array.isArray(val) ? val.filter((l) => l && l.ref) : [];
    } catch {
      return [];
    }
  };

  const ecrire = (lignes) => {
    try {
      localStorage.setItem(CLE, JSON.stringify(lignes));
    } catch {
      /* navigation privée, quota plein : le bon vit alors le temps de la visite */
    }
    etat = lignes;
    peindre();
  };

  let etat = lire();

  const catalogue = window.PIENUS_CATALOGUE || {};

  const ajouter = (ref, pointure) => {
    const lignes = etat.slice();
    const existante = lignes.find((l) => l.ref === ref && l.pointure === pointure);
    if (existante) existante.quantite = Math.min(9, (existante.quantite || 1) + 1);
    else lignes.push({ ref, pointure, quantite: 1 });
    ecrire(lignes);
  };

  const retirer = (index) => {
    const lignes = etat.slice();
    lignes.splice(index, 1);
    ecrire(lignes);
  };

  const total = () => etat.reduce((n, l) => n + (l.quantite || 1), 0);

  function peindre() {
    $$('[data-compteur]').forEach((el) => {
      el.textContent = String(total());
      el.closest('.enseigne__bon')?.setAttribute(
        'aria-label',
        total() === 0 ? 'Bon de commande, vide' : `Bon de commande, ${total()} article${total() > 1 ? 's' : ''}`
      );
    });

    const corps = $('[data-bon-corps]');
    if (!corps) return;

    if (etat.length === 0) {
      corps.innerHTML = `<div class="vide">
        <p style="font-weight:700;font-size:1.05rem">Votre bon est vide.</p>
        <p class="legende">Ajoutez-y les références qui vous intéressent : c'est ce qui nous dira quels moules lancer en premier.</p>
        <a class="bouton bouton--creux" href="catalogue.html">Voir les quatre modèles</a>
      </div>`;
      return;
    }

    const lignes = etat
      .map((l, i) => {
        const p = catalogue[l.ref] || { nom: `Réf. ${l.ref}`, vignette: '' };
        return `<li class="ligne">
          <span class="ligne__vignette">${p.vignette || ''}</span>
          <span>
            <span class="ligne__nom">${p.nom}</span><br>
            <span class="ligne__detail chiffre">Réf. ${l.ref}${l.pointure ? ` · pointure ${l.pointure}` : ''}</span>
          </span>
          <span class="chiffre" aria-label="Quantité">×${l.quantite || 1}</span>
          <button class="ligne__retirer" type="button" data-retirer="${i}" aria-label="Retirer ${p.nom} du bon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>
          </button>
        </li>`;
      })
      .join('');

    corps.innerHTML = `<ul class="lignes">${lignes}</ul>
      <p class="legende">Total : ${total()} paire${total() > 1 ? 's' : ''} réservée${total() > 1 ? 's' : ''}. Aucun paiement, aucun engagement.</p>`;
  }

  document.addEventListener('click', (e) => {
    const ajout = e.target.closest('[data-ajouter]');
    if (ajout) {
      e.preventDefault();
      const ref = ajout.dataset.ajouter;
      const select = ajout.form ? $('[data-pointure]', ajout.form) : $(`[data-pointure="${ref}"]`);
      ajouter(ref, select ? select.value : '');
      const avant = ajout.dataset.libelleOrigine || ajout.innerHTML;
      ajout.dataset.libelleOrigine = avant;
      ajout.innerHTML = 'Ajouté au bon';
      const annonce = $('[data-annonce]');
      if (annonce) annonce.textContent = `${catalogue[ref]?.nom ?? 'Référence ' + ref} ajouté à votre bon. ${total()} paire${total() > 1 ? 's' : ''} au total.`;
      ajout.classList.add('bouton--turquoise');
      clearTimeout(ajout._minuteur);
      ajout._minuteur = setTimeout(() => {
        ajout.innerHTML = avant;
        ajout.classList.remove('bouton--turquoise');
      }, 1900);
      return;
    }

    const enlever = e.target.closest('[data-retirer]');
    if (enlever) {
      retirer(Number(enlever.dataset.retirer));
      return;
    }
  });

  /* ---------- Le tiroir ------------------------------------------------ */

  const tiroir = $('[data-tiroir]');
  const voile = $('[data-voile]');
  let dernierFocus = null;

  /* Le reste de la page est mis hors d'atteinte pendant l'ouverture : sans cela,
     la tabulation quitte le tiroir et parcourt une page verrouillée en défilement. */
  const horsTiroir = () => $$('body > *').filter((el) => el !== tiroir && !el.hasAttribute('data-voile'));
  const inerte = (actif) => {
    horsTiroir().forEach((el) => {
      if (actif) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  };

  const basculerTiroir = (ouvrir) => {
    if (!tiroir || !voile) return;
    if (ouvrir) {
      dernierFocus = document.activeElement;
      tiroir.hidden = false;
      voile.hidden = false;
      requestAnimationFrame(() => {
        tiroir.dataset.ouvert = 'oui';
        voile.dataset.ouvert = 'oui';
      });
      $('[data-fermer-bon]', tiroir)?.focus();
      inerte(true);
    } else {
      delete tiroir.dataset.ouvert;
      delete voile.dataset.ouvert;
      setTimeout(() => {
        tiroir.hidden = true;
        voile.hidden = true;
      }, 420);
      inerte(false);
      dernierFocus?.focus();
    }
    $$('[data-ouvrir-bon]').forEach((b) => b.setAttribute('aria-expanded', ouvrir ? 'true' : 'false'));
    document.body.style.overflow = ouvrir ? 'hidden' : '';
  };

  $$('[data-ouvrir-bon]').forEach((b) => b.addEventListener('click', () => basculerTiroir(true)));
  $$('[data-fermer-bon]').forEach((b) => b.addEventListener('click', () => basculerTiroir(false)));
  voile?.addEventListener('click', () => basculerTiroir(false));
  $('[data-aller-liste]')?.addEventListener('click', () => basculerTiroir(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tiroir?.dataset.ouvert === 'oui') basculerTiroir(false);
  });

  /* ---------- Le menu compact ------------------------------------------ */

  const menu = $('[data-menu]');
  const rayons = $('#rayons');
  menu?.addEventListener('click', () => {
    const ouvert = rayons.dataset.ouvert === 'oui';
    if (ouvert) delete rayons.dataset.ouvert;
    else rayons.dataset.ouvert = 'oui';
    menu.setAttribute('aria-expanded', ouvert ? 'false' : 'true');
  });

  /* ---------- Les vues d'une fiche ------------------------------------- */

  $$('[data-vues]').forEach((groupe) => {
    const scene = $('[data-scene]', groupe.closest('.fiche__visuel') || document);
    const boutons = $$('[data-vue]', groupe);
    boutons.forEach((b) => {
      b.addEventListener('click', () => {
        boutons.forEach((autre) => autre.setAttribute('aria-pressed', String(autre === b)));
        if (!scene) return;
        scene.innerHTML = b.dataset.contenu ? decodeURIComponent(b.dataset.contenu) : '';
        scene.dataset.vueActive = b.dataset.vue;
        const piste = scene.querySelector('.piste');
        if (piste) imprimerPiste(piste);
      });
    });
  });

  /* ---------- La piste qui s'imprime ----------------------------------- */

  /* Le seul moment de motion du site. Le script arme l'animation, puis la
     désarme quoi qu'il arrive : si le compositeur du navigateur est en pause
     (onglet en arrière-plan, économie d'énergie), la piste reste visible. */
  const imprimerPiste = (piste) => {
    if (!piste || piste.dataset.impression) return;
    const pas = piste.querySelectorAll('.piste__pas').length;
    if (!pas) return;
    piste.dataset.impression = 'en-cours';
    const duree = 300 + pas * 150 + 500;
    setTimeout(() => {
      piste.dataset.impression = 'faite';
    }, duree + 400);
  };

  const pistes = $$('.piste');
  if (pistes.length) {
    if ('IntersectionObserver' in window) {
      const guetteur = new IntersectionObserver(
        (entrees) => {
          entrees.forEach((e) => {
            if (!e.isIntersecting) return;
            imprimerPiste(e.target);
            guetteur.unobserve(e.target);
          });
        },
        { threshold: 0.25 }
      );
      pistes.forEach((p) => guetteur.observe(p));
    } else {
      pistes.forEach(imprimerPiste);
    }
  }

  /* ---------- La liste d'attente --------------------------------------- */

  const formulaire = $('[data-liste]');

  const resumeBon = () =>
    etat.length === 0
      ? 'aucune référence'
      : etat.map((l) => `${l.ref}${l.pointure ? ` (${l.pointure})` : ''} ×${l.quantite || 1}`).join(', ');

  formulaire?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const champ = $('.champ', formulaire);
    const email = $('input[type="email"]', formulaire);
    const pointure = $('[data-pointure]', formulaire);
    const valeur = email.value.trim();
    const valide = valeur !== '' && email.checkValidity();
    champ.dataset.erreur = valide ? 'non' : 'oui';
    if (!valide) {
      email.focus();
      return;
    }

    const accuse = $('[data-accuse]', formulaire.parentElement);
    const detail = accuse ? $('[data-accuse-detail]', accuse) : null;
    const titre = accuse ? $('[data-accuse-titre]', accuse) : null;
    const carnet = formulaire.dataset.carnet;
    const courrielMaison = formulaire.dataset.courriel || '';

    // Sans carnet relié, on ne prétend pas avoir enregistré : on propose
    // l'inscription à la main, ce qui reste vrai et reste dans le ton.
    if (!carnet) {
      if (detail) {
        // Rien n'a été enregistré : le titre ne doit pas dire le contraire.
        if (titre) titre.textContent = 'Encore un geste.';
        const sujet = encodeURIComponent('Inscription à la liste Piénus');
        const corps = encodeURIComponent(
          `Bonjour,\n\nJe souhaite être prévenu(e) de l'ouverture des commandes.\n\nAdresse : ${valeur}\nPointure : ${pointure && pointure.value ? pointure.value : 'non précisée'}\nRéférences souhaitées : ${resumeBon()}\n\nMerci !`
        );
        detail.innerHTML = ` Notre carnet d'inscription n'est pas encore relié au site — nous inscrivons donc à la main. <a href="mailto:${courrielMaison}?subject=${sujet}&body=${corps}">Envoyez-nous ce bon en un clic</a> et nous vous inscrivons à la main.`;
        accuse.dataset.visible = 'oui';
        accuse.setAttribute('tabindex', '-1');
        accuse.focus();
      }
      return;
    }

    const bouton = $('button[type="submit"]', formulaire);
    const libelle = bouton.innerHTML;
    bouton.disabled = true;
    bouton.innerHTML = 'Envoi…';

    try {
      const reponse = await fetch(carnet, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          courriel: valeur,
          pointure: pointure ? pointure.value : '',
          bon: etat,
          prevenir: $('input[name="prevenir"]', formulaire)?.checked ?? true,
        }),
      });
      if (!reponse.ok) throw new Error(String(reponse.status));
      if (detail) {
        if (titre) titre.textContent = "C'est noté.";
        const n = total();
        detail.textContent =
          n > 0
            ? ` Votre bon (${n} paire${n > 1 ? 's' : ''}) est joint à votre inscription. Nous vous écrirons à ${valeur} dès l'ouverture des commandes.`
            : ` Nous vous écrirons à ${valeur} dès l'ouverture des commandes.`;
        accuse.dataset.visible = 'oui';
        accuse.setAttribute('tabindex', '-1');
        accuse.focus();
      }
      formulaire.hidden = true;
    } catch {
      bouton.disabled = false;
      bouton.innerHTML = libelle;
      champ.dataset.erreur = 'oui';
      $('.champ__erreur span', formulaire).textContent =
        "L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous directement.";
      champ.querySelector('.champ__erreur')?.scrollIntoView({ block: 'nearest' });
    }
  });

  peindre();
})();
