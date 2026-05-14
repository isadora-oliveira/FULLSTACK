"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
class UsuarioController {
    constructor(service) {
        this.inserir = async (req, res) => {
            const { email, senha } = req.body;
            try {
                const novoUsuario = await this.service.inserir({ email, senha });
                res.status(201).json({ id: novoUsuario.id, email: novoUsuario.email });
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao cadastrar usuario." });
            }
        };
        this.listar = async (_req, res) => {
            const usuarios = await this.service.listar();
            res.json(usuarios);
        };
        this.service = service;
    }
}
exports.UsuarioController = UsuarioController;
