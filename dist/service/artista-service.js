"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistaService = void 0;
class ArtistaService {
    constructor(repository) {
        this.repository = repository;
    }
    async inserir(artista) {
        if (!artista || !artista.nome || !artista.nome.trim()) {
            throw { id: 400, msg: "Nome do artista e obrigatorio." };
        }
        const nomeNormalizado = artista.nome.trim();
        const artistaExistente = await this.repository.findOne({
            where: { nome: nomeNormalizado },
        });
        if (artistaExistente) {
            throw { id: 409, msg: "Ja existe artista com esse nome." };
        }
        artista.nome = nomeNormalizado;
        return await this.repository.save(artista);
    }
    async listar() {
        return await this.repository.find();
    }
    async buscarPorId(id) {
        const artista = await this.repository.findOne({ where: { id } });
        if (!artista) {
            throw { id: 404, msg: "Artista nao encontrado." };
        }
        return artista;
    }
    async atualizar(id, dados) {
        if (!Number.isInteger(id) || id <= 0) {
            throw { id: 400, msg: "Id do artista invalido." };
        }
        if (!dados || !dados.nome || !dados.nome.trim()) {
            throw { id: 400, msg: "Nome do artista e obrigatorio." };
        }
        const artista = await this.buscarPorId(id);
        const nomeNormalizado = dados.nome.trim();
        const artistaExistente = await this.repository.findOne({
            where: { nome: nomeNormalizado },
        });
        if (artistaExistente && artistaExistente.id !== id) {
            throw { id: 409, msg: "Ja existe artista com esse nome." };
        }
        artista.nome = nomeNormalizado;
        artista.genero = dados.genero ?? artista.genero;
        return await this.repository.save(artista);
    }
    async remover(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw { id: 400, msg: "Id do artista invalido." };
        }
        const artista = await this.buscarPorId(id);
        await this.repository.remove(artista);
    }
}
exports.ArtistaService = ArtistaService;
