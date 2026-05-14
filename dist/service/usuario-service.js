"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuarioService {
    constructor(repository) {
        this.repository = repository;
    }
    async inserir(usuario) {
        if (!usuario || !usuario.email || !usuario.senha) {
            throw { id: 400, msg: "Email e senha sao obrigatorios." };
        }
        const usuarioExistente = await this.repository.findOne({
            where: { email: usuario.email },
        });
        if (usuarioExistente) {
            throw { id: 409, msg: "Ja existe usuario com esse email." };
        }
        // Hash simples da senha para nao salvar texto puro no banco.
        usuario.senha = await bcryptjs_1.default.hash(usuario.senha, 8);
        return await this.repository.save(usuario);
    }
    async listar() {
        return await this.repository.find({
            select: ["id", "email"],
        });
    }
}
exports.UsuarioService = UsuarioService;
