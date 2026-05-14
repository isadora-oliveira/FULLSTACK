"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumController = void 0;
class AlbumController {
    constructor(service) {
        this.inserir = async (req, res) => {
            const { titulo, anoLancamento, artistaId } = req.body;
            try {
                const album = await this.service.inserir(titulo, Number(anoLancamento), Number(artistaId));
                res.status(201).json(album);
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao cadastrar album." });
            }
        };
        this.listar = async (_req, res) => {
            const albuns = await this.service.listar();
            res.status(200).json(albuns);
        };
        this.buscarPorId = async (req, res) => {
            const id = Number(req.params.id);
            try {
                const album = await this.service.buscarPorId(id);
                res.status(200).json(album);
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao buscar album." });
            }
        };
        this.atualizar = async (req, res) => {
            const id = Number(req.params.id);
            const { titulo, anoLancamento } = req.body;
            try {
                const album = await this.service.atualizar(id, titulo, Number(anoLancamento));
                res.status(200).json(album);
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao atualizar album." });
            }
        };
        this.remover = async (req, res) => {
            const id = Number(req.params.id);
            try {
                await this.service.remover(id);
                res.status(204).send();
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao remover album." });
            }
        };
        this.service = service;
    }
}
exports.AlbumController = AlbumController;
