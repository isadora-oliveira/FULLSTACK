import { Repository } from "typeorm";
import { Artista } from "../entity/artista";

export class ArtistaService {
  private repository: Repository<Artista>;

  constructor(repository: Repository<Artista>) {
    this.repository = repository;
  }

  async inserir(artista: Artista): Promise<Artista> {
    if (!artista || !artista.nome) {
      throw { id: 400, msg: "Nome do artista e obrigatorio." };
    }

    return await this.repository.save(artista);
  }

  async listar(): Promise<Artista[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Artista> {
    const artista = await this.repository.findOne({ where: { id } });

    if (!artista) {
      throw { id: 404, msg: "Artista nao encontrado." };
    }

    return artista;
  }

  async atualizar(id: number, dados: Artista): Promise<Artista> {
    if (!Number.isInteger(id) || id <= 0) {
      throw { id: 400, msg: "Id do artista invalido." };
    }

    if (!dados || !dados.nome || !dados.nome.trim()) {
      throw { id: 400, msg: "Nome do artista e obrigatorio." };
    }

    const artista = await this.buscarPorId(id);

    artista.nome = dados.nome;
    artista.genero = dados.genero ?? artista.genero;

    return await this.repository.save(artista);
  }

  async remover(id: number): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw { id: 400, msg: "Id do artista invalido." };
    }

    const artista = await this.buscarPorId(id);
    await this.repository.remove(artista);
  }
}
