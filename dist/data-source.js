"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const usuario_1 = require("./entity/usuario");
const artista_1 = require("./entity/artista");
const album_1 = require("./entity/album");
const musica_1 = require("./entity/musica");
const playlist_1 = require("./entity/playlist");
// Aqui fica a conexao principal com o PostgreSQL.
// Se estiver usando Docker Compose, os valores vem das variaveis de ambiente.
// Se estiver rodando localmente, os fallbacks abaixo continuam funcionando.
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "123456",
    database: "api_musicas",
    entities: [usuario_1.Usuario, artista_1.Artista, album_1.Album, musica_1.Musica, playlist_1.Playlist],
    synchronize: true,
    logging: false,
});
