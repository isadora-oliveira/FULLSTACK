/*
	Script completo para apresentacao/teste da API de musicas.

	COMO USAR NO PGADMIN:
	1) Conecte em qualquer banco (ex: postgres) e rode apenas o bloco "A".
	2) Abra uma query nova conectada no banco api_musicas.
	3) Rode o bloco "B" para criar schema completo + dados iniciais.

	Observacao importante:
	- Se for usar este script como fonte principal do schema,
		deixe synchronize: false em src/data-source.ts.
*/

/* =========================
	 BLOCO A - CRIAR DATABASE
	 ========================= */

CREATE DATABASE api_musicas;

/* =============================================
	 BLOCO B - EXECUTAR JA CONECTADO EM api_musicas
	 ============================================= */

-- Limpeza (para facilitar repetir testes durante desenvolvimento)
DROP TABLE IF EXISTS "musica_playlists_playlist";
DROP TABLE IF EXISTS "musica";
DROP TABLE IF EXISTS "playlist";
DROP TABLE IF EXISTS "album";
DROP TABLE IF EXISTS "artista";
DROP TABLE IF EXISTS "usuario";

-- Tabela de usuarios (auth)
CREATE TABLE "usuario" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(255) UNIQUE NOT NULL,
	"senha" VARCHAR(255) NOT NULL
);

-- Tabela de artistas
CREATE TABLE "artista" (
	"id" SERIAL PRIMARY KEY,
	"nome" VARCHAR(255) NOT NULL,
	"genero" VARCHAR(120)
);

-- Tabela de albuns
CREATE TABLE "album" (
	"id" SERIAL PRIMARY KEY,
	"titulo" VARCHAR(255) NOT NULL,
	"anoLancamento" INTEGER NOT NULL,
	"artistaId" INTEGER NOT NULL,
	CONSTRAINT "fk_album_artista"
		FOREIGN KEY ("artistaId") REFERENCES "artista"("id")
		ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabela de musicas
CREATE TABLE "musica" (
	"id" SERIAL PRIMARY KEY,
	"titulo" VARCHAR(255) NOT NULL,
	"duracaoSegundos" INTEGER NOT NULL CHECK ("duracaoSegundos" > 0),
	"artistaId" INTEGER NOT NULL,
	"albumId" INTEGER NOT NULL,
	CONSTRAINT "fk_musica_artista"
		FOREIGN KEY ("artistaId") REFERENCES "artista"("id")
		ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT "fk_musica_album"
		FOREIGN KEY ("albumId") REFERENCES "album"("id")
		ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabela de playlists
CREATE TABLE "playlist" (
	"id" SERIAL PRIMARY KEY,
	"nome" VARCHAR(255) NOT NULL
);

-- Tabela de relacao many-to-many (musica x playlist)
CREATE TABLE "musica_playlists_playlist" (
	"musicaId" INTEGER NOT NULL,
	"playlistId" INTEGER NOT NULL,
	PRIMARY KEY ("musicaId", "playlistId"),
	CONSTRAINT "fk_rel_musica"
		FOREIGN KEY ("musicaId") REFERENCES "musica"("id")
		ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "fk_rel_playlist"
		FOREIGN KEY ("playlistId") REFERENCES "playlist"("id")
		ON DELETE CASCADE ON UPDATE CASCADE
);

-- Dados iniciais para testes rapidos no Insomnia
INSERT INTO "usuario" ("email", "senha") VALUES
('admin@api.com', '$2b$08$A5z0rZc9J4m5PqU8e4wzyu1xrlYh25fNWh9nC5Iasxrx59PF17nFC');
-- senha em texto puro do hash acima: 123456

INSERT INTO "artista" ("nome", "genero") VALUES
('The Weeknd', 'Pop'),
('Daft Punk', 'Eletronica');

INSERT INTO "album" ("titulo", "anoLancamento", "artistaId") VALUES
('After Hours', 2020, 1),
('Random Access Memories', 2013, 2);

INSERT INTO "musica" ("titulo", "duracaoSegundos", "artistaId", "albumId") VALUES
('Blinding Lights', 200, 1, 1),
('Save Your Tears', 215, 1, 1),
('Get Lucky', 248, 2, 2);

INSERT INTO "playlist" ("nome") VALUES
('Playlist de Estudo'),
('Playlist Treino');

INSERT INTO "musica_playlists_playlist" ("musicaId", "playlistId") VALUES
(1, 1),
(3, 1),
(2, 2);
