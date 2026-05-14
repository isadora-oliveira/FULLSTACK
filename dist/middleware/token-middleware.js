"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMiddleware = void 0;
class TokenMiddleware {
    constructor(service) {
        this.verificarAcesso = async (req, res, next) => {
            const token = req.get("Authorization");
            if (token) {
                try {
                    await this.service.validarToken(token);
                    next();
                }
                catch (err) {
                    res.status(err.id || 401).json({ error: err.msg || "Token invalido." });
                }
            }
            else {
                res.status(401).json({ error: "Nenhum token informado." });
            }
        };
        this.service = service;
    }
}
exports.TokenMiddleware = TokenMiddleware;
