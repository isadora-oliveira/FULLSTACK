"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistService = void 0;
class PlaylistService {
    constructor(repository, musicaRepository) {
        this.repository = repository;
        this.musicaRepository = musicaRepository;
    }
    async inserir(nome) {
        if (!nome || !nome.trim()) {
            throw { id: 400, msg: "Nome da playlist e obrigatorio." };
        }
        const nomeNormalizado = nome.trim();
        const playlistExistente = await this.repository.findOne({
            where: { nome: nomeNormalizado },
        });
        if (playlistExistente) {
            throw { id: 409, msg: "Ja existe playlist com esse nome." };
        }
        // Ja cria com lista vazia para deixar o JSON de resposta mais claro.
        const playlist = this.repository.create({ nome: nomeNormalizado, musicas: [] });
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
        if (!Number.isInteger(id) || id <= 0) {
            throw { id: 400, msg: "Id da playlist invalido." };
        }
        if (!nome || !nome.trim()) {
            throw { id: 400, msg: "Nome da playlist e obrigatorio." };
        }
        const playlist = await this.buscarPorId(id);
        const nomeNormalizado = nome.trim();
        const playlistExistente = await this.repository.findOne({
            where: { nome: nomeNormalizado },
        });
        if (playlistExistente && playlistExistente.id !== id) {
            throw { id: 409, msg: "Ja existe playlist com esse nome." };
        }
        playlist.nome = nomeNormalizado;
        return await this.repository.save(playlist);
    }
    async remover(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw { id: 400, msg: "Id da playlist invalido." };
        }
        const playlist = await this.buscarPorId(id);
        await this.repository.remove(playlist);
    }
    // Funcionalidade many-to-many
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
