"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistService = void 0;
class PlaylistService {
    constructor(repository, musicaRepository) {
        this.repository = repository;
        this.musicaRepository = musicaRepository;
    }
    async inserir(nome) {
        if (!nome) {
            throw { id: 400, msg: "Nome da playlist e obrigatorio." };
        }
        // Ja cria com lista vazia para deixar o JSON de resposta mais claro.
        const playlist = this.repository.create({ nome, musicas: [] });
        return await this.repository.save(playlist);
    }
    async listar() {
        return await this.repository.find();
    }
    async buscarPorId(id) {
        const playlist = await this.repository.findOne({ where: { id } });
        if (!playlist) {
            throw { id: 404, msg: "Playlist nao encontrada." };
        }
        return playlist;
    }
    async atualizar(id, nome) {
        const playlist = await this.buscarPorId(id);
        playlist.nome = nome ?? playlist.nome;
        return await this.repository.save(playlist);
    }
    async remover(id) {
        const playlist = await this.buscarPorId(id);
        await this.repository.remove(playlist);
    }
    // Funcionalidade many-to-many exigida no conceito B.
    async adicionarMusicaNaPlaylist(playlistId, musicaId) {
        // 1) Busca playlist.
        const playlist = await this.buscarPorId(playlistId);
        // 2) Busca musica que vai entrar na playlist.
        const musica = await this.musicaRepository.findOne({ where: { id: musicaId } });
        if (!musica) {
            throw { id: 404, msg: "Musica nao encontrada para adicionar na playlist." };
        }
        if (!playlist.musicas) {
            playlist.musicas = [];
        }
        // 3) Evita duplicar a mesma musica na mesma playlist.
        const jaExiste = playlist.musicas.some((m) => m.id === musica.id);
        if (jaExiste) {
            throw { id: 409, msg: "Essa musica ja esta na playlist." };
        }
        // 4) Adiciona e salva. O TypeORM atualiza a tabela de relacao automaticamente.
        playlist.musicas.push(musica);
        return await this.repository.save(playlist);
    }
}
exports.PlaylistService = PlaylistService;
