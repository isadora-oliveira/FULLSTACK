"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicaService = void 0;
class MusicaService {
    constructor(repository, artistaRepository, albumRepository) {
        this.repository = repository;
        this.artistaRepository = artistaRepository;
        this.albumRepository = albumRepository;
    }
    async inserir(titulo, duracaoSegundos, artistaId, albumId) {
        if (!titulo || !duracaoSegundos || !artistaId || !albumId) {
            throw {
                id: 400,
                msg: "titulo, duracaoSegundos, artistaId e albumId sao obrigatorios.",
            };
        }
        const artista = await this.artistaRepository.findOne({ where: { id: artistaId } });
        const album = await this.albumRepository.findOne({ where: { id: albumId } });
        if (!artista) {
            throw { id: 404, msg: "Artista nao encontrado." };
        }
        if (!album) {
            throw { id: 404, msg: "Album nao encontrado." };
        }
        const novaMusica = this.repository.create({
            titulo,
            duracaoSegundos,
            artista,
            album,
        });
        return await this.repository.save(novaMusica);
    }
    async listar() {
        return await this.repository.find();
    }
    async buscarPorId(id) {
        const musica = await this.repository.findOne({ where: { id } });
        if (!musica) {
            throw { id: 404, msg: "Musica nao encontrada." };
        }
        return musica;
    }
    async atualizar(id, titulo, duracaoSegundos) {
        const musica = await this.buscarPorId(id);
        musica.titulo = titulo ?? musica.titulo;
        musica.duracaoSegundos = duracaoSegundos ?? musica.duracaoSegundos;
        return await this.repository.save(musica);
    }
    async remover(id) {
        const musica = await this.buscarPorId(id);
        await this.repository.remove(musica);
    }
}
exports.MusicaService = MusicaService;
