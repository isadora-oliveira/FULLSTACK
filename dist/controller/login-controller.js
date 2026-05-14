"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
class LoginController {
    constructor(service) {
        this.realizaLogin = async (req, res) => {
            const { email, senha } = req.body;
            try {
                const token = await this.service.realizarLogin(email, senha);
                res.status(200).json({ token });
            }
            catch (err) {
                res.status(err.id || 500).json({ error: err.msg || "Erro ao fazer login." });
            }
        };
        this.service = service;
    }
}
exports.LoginController = LoginController;
