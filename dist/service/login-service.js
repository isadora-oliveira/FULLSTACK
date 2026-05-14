"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const CHAVE_JWT = "chave-super-secreta-da-api-musicas";
class LoginService {
    constructor(repository) {
        this.repository = repository;
    }
    async realizarLogin(email, senha) {
        // Validacao minima para evitar consulta desnecessaria no banco.
        if (!email || !senha) {
            throw { id: 400, msg: "Email e senha sao obrigatorios." };
        }
        const usuario = await this.repository.findOne({ where: { email } });
        if (!usuario || !usuario.senha) {
            throw { id: 401, msg: "Credenciais invalidas." };
        }
        // Compara senha digitada com hash salvo no banco.
        const senhaOk = await bcryptjs_1.default.compare(senha, usuario.senha);
        if (!senhaOk) {
            throw { id: 401, msg: "Credenciais invalidas." };
        }
        // Gera token contendo dados basicos no payload.
        // subject recebe o id do usuario para identificar quem fez login.
        const token = jsonwebtoken_1.default.sign({
            email: usuario.email,
        }, CHAVE_JWT, {
            subject: String(usuario.id),
            expiresIn: "1d",
        });
        return token;
    }
    async validarToken(token) {
        let tokenLimpo = token;
        if (token.startsWith("Bearer ")) {
            tokenLimpo = token.replace("Bearer ", "");
        }
        try {
            // Se o token estiver invalido/expirado, jwt.verify ja lanca excecao.
            jsonwebtoken_1.default.verify(tokenLimpo, CHAVE_JWT);
        }
        catch {
            throw { id: 401, msg: "Token invalido ou expirado." };
        }
    }
}
exports.LoginService = LoginService;
