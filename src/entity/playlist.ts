import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Musica } from "./musica";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @ManyToMany(() => Musica, (musica) => musica.playlists, { eager: true })
  musicas?: Musica[];
}
