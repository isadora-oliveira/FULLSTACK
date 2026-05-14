import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entity/usuario";
import { Artista } from "./entity/artista";
import { Album } from "./entity/album";
import { Musica } from "./entity/musica";
import { Playlist } from "./entity/playlist";


// Aqui fica a conexao principal com o PostgreSQL.
// Se estiver usando Docker Compose, os valores vem das variaveis de ambiente.
// Se estiver rodando localmente, os fallbacks abaixo continuam funcionando.
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "123456",
  database: "api_musicas",
  entities: [Usuario, Artista, Album, Musica, Playlist],
  synchronize: true,
  logging: false,
});
