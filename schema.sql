-- Piénus — carnet d'inscription à la liste d'attente.
-- Une ligne par adresse. Aucune donnée d'identité au-delà de l'adresse et de
-- la pointure : voir confidentialite.html pour les finalités et les durées.

CREATE TABLE IF NOT EXISTS liste (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  courriel      TEXT    NOT NULL,
  pointure      TEXT    NOT NULL DEFAULT '',
  -- Le bon tel qu'il était au moment de l'inscription, en JSON : c'est lui qui
  -- décidera de l'ordre de fabrication des moules.
  bon           TEXT    NOT NULL DEFAULT '[]',
  prevenir      INTEGER NOT NULL DEFAULT 1,
  -- Jeton de désinscription, tiré au hasard : il part dans chaque courriel.
  jeton         TEXT    NOT NULL,
  cree_le       TEXT    NOT NULL,
  desinscrit_le TEXT
);

-- Une adresse ne s'inscrit qu'une fois ; une seconde inscription met à jour la
-- précédente plutôt que de créer un doublon.
CREATE UNIQUE INDEX IF NOT EXISTS liste_courriel ON liste (courriel);
CREATE UNIQUE INDEX IF NOT EXISTS liste_jeton ON liste (jeton);

-- Compteur d'appels par tranche horaire et par empreinte d'adresse IP.
-- Sert uniquement à freiner les envois en rafale ; purgé au-delà de 24 h.
CREATE TABLE IF NOT EXISTS cadence (
  empreinte TEXT NOT NULL,
  tranche   TEXT NOT NULL,
  appels    INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (empreinte, tranche)
);
