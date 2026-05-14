import { Repository } from "typeorm";
import { Musica } from "../entity/musica";
import { Artista } from "../entity/artista";
import { Album } from "../entity/album";

export class MusicaService {
  private repository: Repository<Musica>;
  private artistaRepository: Repository<Artista>;
  private albumRepository: Repository<Album>;

  constructor(
    repository: Repository<Musica>,
    artistaRepository: Repository<Artista>,
    albumRepository: Repository<Album>,
  ) {
    this.repository = repository;
    this.artistaRepository = artistaRepository;
    this.albumRepository = albumRepository;
  }

  async inserir(
    titulo: string,
    duracaoSegundos: number,
    artistaId: number,
    albumId: number,
  ): Promise<Musica> {
    if (!titulo || !titulo.trim() || !duracaoSegundos || !artistaId || !albumId) {
      throw {
        id: 400,
        msg: "titulo, duracaoSegundos, artistaId e albumId sao obrigatorios.",
      };
    }

    const tituloNormalizado = titulo.trim();

    const artista = await this.artistaRepository.findOne({ where: { id: artistaId } });
    const album = await this.albumRepository.findOne({ where: { id: albumId } });

    if (!artista) {
      throw { id: 404, msg: "Artista nao encontrado." };
    }

    if (!album) {
      throw { id: 404, msg: "Album nao encontrado." };
    }

    const albumDoArtista = await this.albumRepository.findOne({
      where: {
        id: albumId,
        artista: { id: artistaId },
      },
    });

    if (!albumDoArtista) {
      throw { id: 400, msg: "O album nao pertence ao artista informado." };
    }

    const musicaExistente = await this.repository.findOne({
      where: {
        titulo: tituloNormalizado,
        artista: { id: artistaId },
        album: { id: albumId },
      },
    });

    if (musicaExistente) {
      throw { id: 409, msg: "Ja existe musica com esse titulo nesse album para esse artista." };
    }

    const novaMusica = this.repository.create({
      titulo: tituloNormalizado,
      duracaoSegundos,
      artista,
      album: albumDoArtista,
    });

    return await this.repository.save(novaMusica);
  }

  async listar(): Promise<Musica[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Musica> {
    const musica = await this.repository.findOne({ where: { id } });

    if (!musica) {
      throw { id: 404, msg: "Musica nao encontrada." };
    }

    return musica;
  }

  async atualizar(id: number, titulo: string, duracaoSegundos: number): Promise<Musica> {
    if (!Number.isInteger(id) || id <= 0) {
      throw { id: 400, msg: "Id da musica invalido." };
    }

    if (!titulo || !titulo.trim() || !duracaoSegundos) {
      throw { id: 400, msg: "titulo e duracaoSegundos sao obrigatorios." };
    }

    const musica = await this.buscarPorId(id);
    const tituloNormalizado = titulo.trim();
    const musicaExistente = await this.repository.findOne({
      where: {
        titulo: tituloNormalizado,
        artista: { id: musica.artista?.id },
        album: { id: musica.album?.id },
      },
    });

    if (musicaExistente && musicaExistente.id !== id) {
      throw { id: 409, msg: "Ja existe musica com esse titulo nesse album para esse artista." };
    }

    musica.titulo = tituloNormalizado;
    musica.duracaoSegundos = duracaoSegundos;

    return await this.repository.save(musica);
  }

  async remover(id: number): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw { id: 400, msg: "Id da musica invalido." };
    }

    const musica = await this.buscarPorId(id);
    await this.repository.remove(musica);
  }
}
