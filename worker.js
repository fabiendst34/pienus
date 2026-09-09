/* Piénus — le carnet d'inscription.
 *
 * Ce Worker ne sert pas les pages : les fichiers de `dist/` sont servis par la
 * couche d'assets de Cloudflare, et lui ne voit que ce qu'elle n'a pas trouvé.
 * Il n'expose donc que deux routes :
 *
 *   POST /api/liste            inscrire une adresse
 *   GET  /api/desinscription   retirer une adresse, depuis le lien d'un courriel
 *
 * Tout le reste retombe sur la page 404 du site.
 */

const MAX_PAR_HEURE = 8;
const TAILLE_MAX = 4096;

const json = (donnees, statut = 200) =>
  new Response(JSON.stringify(donnees), {
    status: statut,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

/** Validation volontairement stricte, mais sans prétendre remplacer un envoi réel. */
const adresseValable = (valeur) =>
  typeof valeur === 'string' &&
  valeur.length >= 6 &&
  valeur.length <= 254 &&
  /^[^\s@,;<>"]+@[^\s@,;<>".]+\.[a-z]{2,24}$/i.test(valeur);

/** L'adresse IP n'est jamais stockée en clair : seule une empreinte tronquée l'est. */
async function empreinteIP(requete) {
  const ip = requete.headers.get('cf-connecting-ip') || '0.0.0.0';
  const octets = new TextEncoder().encode(`pienus:${ip}`);
  const condense = await crypto.subtle.digest('SHA-256', octets);
  return [...new Uint8Array(condense)]
    .slice(0, 8)
    .map((o) => o.toString(16).padStart(2, '0'))
    .join('');
}

/** Freine les envois en rafale sans rien empêcher d'un usage normal. */
async function cadenceDepassee(env, empreinte) {
  const tranche = new Date().toISOString().slice(0, 13); // à l'heure près

  // Purge des tranches de plus de 24 h. Faite ici plutôt que par une tâche
  // planifiée : la table ne vit que le temps de compter, et une promesse de
  // purge écrite dans le schéma sans code pour l'exécuter n'est pas une purge.
  const veille = new Date(Date.now() - 24 * 3600 * 1000).toISOString().slice(0, 13);
  await env.pienus_liste.prepare('DELETE FROM cadence WHERE tranche < ?').bind(veille).run();

  await env.pienus_liste
    .prepare(
      `INSERT INTO cadence (empreinte, tranche, appels) VALUES (?, ?, 1)
       ON CONFLICT (empreinte, tranche) DO UPDATE SET appels = appels + 1`
    )
    .bind(empreinte, tranche)
    .run();

  const ligne = await env.pienus_liste
    .prepare('SELECT appels FROM cadence WHERE empreinte = ? AND tranche = ?')
    .bind(empreinte, tranche)
    .first();

  return (ligne?.appels ?? 0) > MAX_PAR_HEURE;
}

/** Ne garde du bon que ce dont la fabrication a besoin. */
function bonPropre(brut) {
  if (!Array.isArray(brut)) return [];
  return brut
    .filter((l) => l && typeof l.ref === 'string' && /^[0-9]{3}$/.test(l.ref))
    .slice(0, 20)
    .map((l) => ({
      ref: l.ref,
      pointure: typeof l.pointure === 'string' ? l.pointure.slice(0, 10) : '',
      quantite: Math.min(9, Math.max(1, Number(l.quantite) || 1)),
    }));
}

async function inscrire(requete, env) {
  const empreinte = await empreinteIP(requete);
  if (await cadenceDepassee(env, empreinte)) {
    return json({ erreur: 'Trop de tentatives. Réessayez dans une heure.' }, 429);
  }

  const brut = await requete.text();
  if (brut.length > TAILLE_MAX) return json({ erreur: 'Envoi trop volumineux.' }, 413);

  let corps;
  try {
    corps = JSON.parse(brut);
  } catch {
    return json({ erreur: 'Envoi illisible.' }, 400);
  }

  const courriel = String(corps.courriel ?? '').trim().toLowerCase();
  if (!adresseValable(courriel)) {
    return json({ erreur: "Cette adresse ne semble pas valable." }, 400);
  }

  const pointure = String(corps.pointure ?? '').slice(0, 10);
  const bon = JSON.stringify(bonPropre(corps.bon));
  const prevenir = corps.prevenir === false ? 0 : 1;
  const jeton = crypto.randomUUID();
  const maintenant = new Date().toISOString();

  // Une seconde inscription met à jour la première : le bon le plus récent
  // l'emporte, et une adresse désinscrite qui revient est réactivée.
  await env.pienus_liste
    .prepare(
      `INSERT INTO liste (courriel, pointure, bon, prevenir, jeton, cree_le)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)
       ON CONFLICT (courriel) DO UPDATE SET
         pointure = ?2, bon = ?3, prevenir = ?4, desinscrit_le = NULL`
    )
    .bind(courriel, pointure, bon, prevenir, jeton, maintenant)
    .run();

  return json({ ok: true });
}

async function desinscrire(url, env) {
  const jeton = url.searchParams.get('jeton') ?? '';
  if (!/^[0-9a-f-]{36}$/i.test(jeton)) {
    return new Response('Lien de désinscription invalide.', {
      status: 400,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  const resultat = await env.pienus_liste
    .prepare(
      `UPDATE liste SET prevenir = 0, desinscrit_le = ?1
       WHERE jeton = ?2 AND desinscrit_le IS NULL`
    )
    .bind(new Date().toISOString(), jeton)
    .run();

  const retire = (resultat.meta?.changes ?? 0) > 0;
  return new Response(
    retire
      ? "C'est fait : vous ne recevrez plus rien de notre part. Aucune rancune."
      : 'Cette adresse était déjà retirée de la liste.',
    { status: 200, headers: { 'content-type': 'text/plain; charset=utf-8' } }
  );
}

export default {
  async fetch(requete, env) {
    const url = new URL(requete.url);

    if (url.pathname === '/api/liste') {
      if (requete.method !== 'POST') {
        return json({ erreur: 'Méthode non permise.' }, 405);
      }
      // Le formulaire est servi depuis ce même domaine : rien d'autre n'a de
      // raison de poster ici.
      const origine = requete.headers.get('origin');
      if (origine && new URL(origine).host !== url.host) {
        return json({ erreur: 'Origine non autorisée.' }, 403);
      }
      try {
        return await inscrire(requete, env);
      } catch (e) {
        console.error('inscription', e);
        return json({ erreur: "L'inscription n'a pas abouti." }, 500);
      }
    }

    if (url.pathname === '/api/desinscription') {
      try {
        return await desinscrire(url, env);
      } catch (e) {
        console.error('désinscription', e);
        return new Response('La désinscription n’a pas abouti.', { status: 500 });
      }
    }

    // Tout le reste appartient au site statique ; s'il n'a rien trouvé, c'est un 404.
    return env.ASSETS.fetch(requete);
  },
};
