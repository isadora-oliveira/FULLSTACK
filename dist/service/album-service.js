"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumService = void 0;
class AlbumService {
    constructor(repository, artistaRepository) {
        this.repository = repository;
        this.artistaRepository = artistaRepository;
    }
    async inserir(titulo, anoLancamento, artistaId) {
        if (!titulo || !anoLancamento || !artistaId) {
            throw { id: 400, msg: "Titulo, anoLancamento e artistaId sao obrigatorios." };
        }
        const artista = await this.artistaRepository.findOne({ where: { id: artistaId } });
        if (!artista) {
            throw { id: 404, msg: "Artista nao encontrado para vincular no album." };
        }
        const novoAlbum = this.repository.create({
            titulo,
            anoLancamento,
            artista,
        });
        return await this.repository.save(novoAlbum);
    }
    async listar() {
        return await this.repository.find();
    }
    async buscarPorId(id) {
        const album = await this.repository.findOne({ where: { id } });
        if (!album) {
            throw { id: 404, msg: "Album nao encontrado." };
        }
        return album;
    }
    async atualizar(id, titulo, anoLancamento) {
        const album = await this.buscarPorId(id);
        album.titulo = titulo ?? album.titulo;
        album.anoLancamento = anoLancamento ?? album.anoLancamento;
        return await this.repository.save(album);
    }
    async remover(id) {
        const album = await this.buscarPorId(id);
        await this.repository.remove(album);
    }
}
exports.AlbumService = AlbumService;
