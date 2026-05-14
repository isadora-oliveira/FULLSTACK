"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistaService = void 0;
class ArtistaService {
    constructor(repository) {
        this.repository = repository;
    }
    async inserir(artista) {
        if (!artista || !artista.nome) {
            throw { id: 400, msg: "Nome do artista e obrigatorio." };
        }
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
        const artista = await this.buscarPorId(id);
        artista.nome = dados.nome ?? artista.nome;
        artista.genero = dados.genero ?? artista.genero;
        return await this.repository.save(artista);
    }
    async remover(id) {
        const artista = await this.buscarPorId(id);
        await this.repository.remove(artista);
    }
}
exports.ArtistaService = ArtistaService;
