import { Repository } from "typeorm";
import { Album } from "../entity/album";
import { Artista } from "../entity/artista";

export class AlbumService {
  private repository: Repository<Album>;
  private artistaRepository: Repository<Artista>;

  constructor(repository: Repository<Album>, artistaRepository: Repository<Artista>) {
    this.repository = repository;
    this.artistaRepository = artistaRepository;
  }

  async inserir(titulo: string, anoLancamento: number, artistaId: number): Promise<Album> {
    if (!titulo || !titulo.trim() || !anoLancamento || !artistaId) {
      throw { id: 400, msg: "Titulo, anoLancamento e artistaId sao obrigatorios." };
    }

    const tituloNormalizado = titulo.trim();

    const artista = await this.artistaRepository.findOne({ where: { id: artistaId } });

    if (!artista) {
      throw { id: 404, msg: "Artista nao encontrado para vincular no album." };
    }

    const albumExistente = await this.repository.findOne({
      where: {
        titulo: tituloNormalizado,
        artista: { id: artistaId },
      },
    });

    if (albumExistente) {
      throw { id: 409, msg: "Ja existe album com esse titulo para esse artista." };
    }

    const novoAlbum = this.repository.create({
      titulo: tituloNormalizado,
      anoLancamento,
      artista,
    });

    return await this.repository.save(novoAlbum);
  }

  async listar(): Promise<Album[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Album> {
    const album = await this.repository.findOne({ where: { id } });

    if (!album) {
      throw { id: 404, msg: "Album nao encontrado." };
    }

    return album;
  }

  async atualizar(id: number, titulo: string, anoLancamento: number): Promise<Album> {
    if (!Number.isInteger(id) || id <= 0) {
      throw { id: 400, msg: "Id do album invalido." };
    }

    if (!titulo || !titulo.trim() || !anoLancamento) {
      throw { id: 400, msg: "Titulo e anoLancamento sao obrigatorios." };
    }

    const album = await this.buscarPorId(id);
    const tituloNormalizado = titulo.trim();
    const albumExistente = await this.repository.findOne({
      where: {
        titulo: tituloNormalizado,
        artista: { id: album.artista?.id },
      },
    });

    if (albumExistente && albumExistente.id !== id) {
      throw { id: 409, msg: "Ja existe album com esse titulo para esse artista." };
    }

    album.titulo = tituloNormalizado;
    album.anoLancamento = anoLancamento;

    return await this.repository.save(album);
  }

  async remover(id: number): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw { id: 400, msg: "Id do album invalido." };
    }

    const album = await this.buscarPorId(id);
    await this.repository.remove(album);
  }
}
