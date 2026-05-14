import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artista } from "./artista";
import { Album } from "./album";
import { Playlist } from "./playlist";

@Entity()
export class Musica {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  titulo?: string;

  @Column()
  duracaoSegundos?: number;

  // Many-to-One: muitas musicas para um artista.
  @ManyToOne(() => Artista, (artista) => artista.musicas, { eager: true })
  artista?: Artista;

  // Many-to-One: muitas musicas para um album.
  @ManyToOne(() => Album, (album) => album.musicas, { eager: true })
  album?: Album;

  // Many-to-Many: uma musica pode estar em varias playlists.
  @ManyToMany(() => Playlist, (playlist) => playlist.musicas)
  @JoinTable()
  playlists?: Playlist[];
}
