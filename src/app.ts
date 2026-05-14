import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Usuario } from "./entity/usuario";
import { Artista } from "./entity/artista";
import { Album } from "./entity/album";
import { Musica } from "./entity/musica";
import { Playlist } from "./entity/playlist";
import { UsuarioService } from "./service/usuario-service";
import { LoginService } from "./service/login-service";
import { ArtistaService } from "./service/artista-service";
import { AlbumService } from "./service/album-service";
import { MusicaService } from "./service/musica-service";
import { PlaylistService } from "./service/playlist-service";
import { UsuarioController } from "./controller/usuario-controller";
import { LoginController } from "./controller/login-controller";
import { ArtistaController } from "./controller/artista-controller";
import { AlbumController } from "./controller/album-controller";
import { MusicaController } from "./controller/musica-controller";
import { PlaylistController } from "./controller/playlist-controller";
import { usuarioRotas } from "./router/usuario-router";
import { artistaRotas } from "./router/artista-router";
import { albumRotas } from "./router/album-router";
import { musicaRotas } from "./router/musica-router";
import { playlistRotas } from "./router/playlist-router";
import { TokenMiddleware } from "./middleware/token-middleware";

const app = express();
const port = 3000;

// Habilita leitura de JSON no body das requisicoes.
app.use(express.json());

// Conecta no banco e so depois registra as rotas.
AppDataSource.initialize().then(async () => {
  app.get("/hello", (_req: Request, res: Response) => {
    res.json({ message: "API de musicas online!" });
  });

  // RECURSO: USUARIO
  const usuarioRepository = AppDataSource.getRepository(Usuario);
  const usuarioService = new UsuarioService(usuarioRepository);
  const usuarioController = new UsuarioController(usuarioService);
  app.use("/api/usuarios", usuarioRotas(usuarioController));

  // RECURSO: LOGIN
  const loginService = new LoginService(usuarioRepository);
  const loginController = new LoginController(loginService);
  app.post("/api/login", loginController.realizaLogin);

  // RECURSO: ARTISTA
  const artistaRepository = AppDataSource.getRepository(Artista);
  const artistaService = new ArtistaService(artistaRepository);
  const artistaController = new ArtistaController(artistaService);

  // RECURSO: ALBUM
  const albumRepository = AppDataSource.getRepository(Album);
  const albumService = new AlbumService(albumRepository, artistaRepository);
  const albumController = new AlbumController(albumService);

  // RECURSO: MUSICA
  const musicaRepository = AppDataSource.getRepository(Musica);
  const musicaService = new MusicaService(musicaRepository, artistaRepository, albumRepository);
  const musicaController = new MusicaController(musicaService);

  // RECURSO: PLAYLIST
  const playlistRepository = AppDataSource.getRepository(Playlist);
  const playlistService = new PlaylistService(playlistRepository, musicaRepository);
  const playlistController = new PlaylistController(playlistService);

  // Middleware JWT: daqui para frente toda rota precisa Authorization.
  const tokenMiddleware = new TokenMiddleware(loginService);
  app.use(tokenMiddleware.verificarAcesso);

  // Rotas protegidas (aplicando middleware para as rotas)
  app.use("/api/artistas", artistaRotas(artistaController));
  app.use("/api/albuns", albumRotas(albumController));
  app.use("/api/musicas", musicaRotas(musicaController));
  app.use("/api/playlists", playlistRotas(playlistController));

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
