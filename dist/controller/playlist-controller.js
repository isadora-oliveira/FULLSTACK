"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistController = void 0;
class PlaylistController {
    constructor(service) {
        this.inserir = async (req, res) => {
            const { nome } = req.body;
            try {
                const playlist = await this.service.inserir(nome);
                res.status(201).json(playlist);
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao cadastrar playlist." });
            }
        };
        this.listar = async (_req, res) => {
            const playlists = await this.service.listar();
            res.status(200).json(playlists);
        };
        this.buscarPorId = async (req, res) => {
            const id = Number(req.params.id);
            try {
                const playlist = await this.service.buscarPorId(id);
                res.status(200).json(playlist);
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao buscar playlist." });
            }
        };
        this.atualizar = async (req, res) => {
            const id = Number(req.params.id);
            const { nome } = req.body;
            try {
                const playlist = await this.service.atualizar(id, nome);
                res.status(200).json(playlist);
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao atualizar playlist." });
            }
        };
        this.remover = async (req, res) => {
            const id = Number(req.params.id);
            try {
                await this.service.remover(id);
                res.status(204).send();
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao remover playlist." });
            }
        };
        this.adicionarMusica = async (req, res) => {
            const playlistId = Number(req.params.playlistId);
            const { musicaId } = req.body;
            try {
                const playlistAtualizada = await this.service.adicionarMusicaNaPlaylist(playlistId, Number(musicaId));
                res.status(200).json(playlistAtualizada);
            }
            catch (err) {
                res
                    .status(err.id || 500)
                    .json({ error: err.msg || "Erro ao adicionar musica na playlist." });
            }
        };
        this.service = service;
    }
}
exports.PlaylistController = PlaylistController;
