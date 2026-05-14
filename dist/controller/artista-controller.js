"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistaController = void 0;
class ArtistaController {
    constructor(service) {
        this.inserir = async (req, res) => {
            const { nome, genero } = req.body;
            try {
                const artista = await this.service.inserir({ nome, genero });
                res.status(201).json(artista);
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao cadastrar artista." });
            }
        };
        this.listar = async (_req, res) => {
            const artistas = await this.service.listar();
            res.status(200).json(artistas);
        };
        this.buscarPorId = async (req, res) => {
            const id = Number(req.params.id);
            try {
                const artista = await this.service.buscarPorId(id);
                res.status(200).json(artista);
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao buscar artista." });
            }
        };
        this.atualizar = async (req, res) => {
            const id = Number(req.params.id);
            const { nome, genero } = req.body;
            try {
                const artista = await this.service.atualizar(id, { nome, genero });
                res.status(200).json(artista);
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao atualizar artista." });
            }
        };
        this.remover = async (req, res) => {
            const id = Number(req.params.id);
            try {
                await this.service.remover(id);
                res.status(204).send();
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao remover artista." });
            }
        };
        this.service = service;
    }
}
exports.ArtistaController = ArtistaController;
