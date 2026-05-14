import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artista } from "./artista";
import { Musica } from "./musica";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  titulo?: string;

  @Column()
  anoLancamento?: number;

  // Many-to-One: muitos albuns podem pertencer a um artista.
  @ManyToOne(() => Artista, (artista) => artista.albuns, { eager: true })
  artista?: Artista;

  @OneToMany(() => Musica, (musica) => musica.album)
  musicas?: Musica[];
}
