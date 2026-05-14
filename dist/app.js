"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const usuario_1 = require("./entity/usuario");
const artista_1 = require("./entity/artista");
const album_1 = require("./entity/album");
const musica_1 = require("./entity/musica");
const playlist_1 = require("./entity/playlist");
const usuario_service_1 = require("./service/usuario-service");
const login_service_1 = require("./service/login-service");
const artista_service_1 = require("./service/artista-service");
const album_service_1 = require("./service/album-service");
const musica_service_1 = require("./service/musica-service");
const playlist_service_1 = require("./service/playlist-service");
const usuario_controller_1 = require("./controller/usuario-controller");
const login_controller_1 = require("./controller/login-controller");
const artista_controller_1 = require("./controller/artista-controller");
const album_controller_1 = require("./controller/album-controller");
const musica_controller_1 = require("./controller/musica-controller");
const playlist_controller_1 = require("./controller/playlist-controller");
const usuario_router_1 = require("./router/usuario-router");
const artista_router_1 = require("./router/artista-router");
const album_router_1 = require("./router/album-router");
const musica_router_1 = require("./router/musica-router");
const playlist_router_1 = require("./router/playlist-router");
const token_middleware_1 = require("./middleware/token-middleware");
const app = (0, express_1.default)();
const port = 3000;
// Habilita leitura de JSON no body das requisicoes.
app.use(express_1.default.json());
// Conecta no banco e so depois registra as rotas.
data_source_1.AppDataSource.initialize().then(async () => {
    app.get("/hello", (_req, res) => {
        res.json({ message: "API de musicas online!" });
    });
    // RECURSO: USUARIO
    const usuarioRepository = data_source_1.AppDataSource.getRepository(usuario_1.Usuario);
    const usuarioService = new usuario_service_1.UsuarioService(usuarioRepository);
    const usuarioController = new usuario_controller_1.UsuarioController(usuarioService);
    app.use("/api/usuarios", (0, usuario_router_1.usuarioRotas)(usuarioController));
    // RECURSO: LOGIN
    const loginService = new login_service_1.LoginService(usuarioRepository);
    const loginController = new login_controller_1.LoginController(loginService);
    app.post("/api/login", loginController.realizaLogin);
    // RECURSO: ARTISTA
    const artistaRepository = data_source_1.AppDataSource.getRepository(artista_1.Artista);
    const artistaService = new artista_service_1.ArtistaService(artistaRepository);
    const artistaController = new artista_controller_1.ArtistaController(artistaService);
    // RECURSO: ALBUM
    const albumRepository = data_source_1.AppDataSource.getRepository(album_1.Album);
    const albumService = new album_service_1.AlbumService(albumRepository, artistaRepository);
    const albumController = new album_controller_1.AlbumController(albumService);
    // RECURSO: MUSICA
    const musicaRepository = data_source_1.AppDataSource.getRepository(musica_1.Musica);
    const musicaService = new musica_service_1.MusicaService(musicaRepository, artistaRepository, albumRepository);
    const musicaController = new musica_controller_1.MusicaController(musicaService);
    // RECURSO: PLAYLIST
    const playlistRepository = data_source_1.AppDataSource.getRepository(playlist_1.Playlist);
    const playlistService = new playlist_service_1.PlaylistService(playlistRepository, musicaRepository);
    const playlistController = new playlist_controller_1.PlaylistController(playlistService);
    // Middleware JWT: daqui para frente toda rota precisa Authorization.
    const tokenMiddleware = new token_middleware_1.TokenMiddleware(loginService);
    app.use(tokenMiddleware.verificarAcesso);
    // Rotas protegidas (aplicando middleware para as rotas)
    app.use("/api/artistas", (0, artista_router_1.artistaRotas)(artistaController));
    app.use("/api/albuns", (0, album_router_1.albumRotas)(albumController));
    app.use("/api/musicas", (0, musica_router_1.musicaRotas)(musicaController));
    app.use("/api/playlists", (0, playlist_router_1.playlistRotas)(playlistController));
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
});
