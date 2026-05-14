import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "./album";
import { Musica } from "./musica";

@Entity()
export class Artista {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @Column({ nullable: true })
  genero?: string;

  // Um artista pode ter varios albuns.
  @OneToMany(() => Album, (album) => album.artista)
  albuns?: Album[];

  // Um artista pode ter varias musicas.
  @OneToMany(() => Musica, (musica) => musica.artista)
  musicas?: Musica[];
}
