import { NextFunction, Request, Response } from "express";
import { LoginService } from "../service/login-service";

export class TokenMiddleware {
  private service: LoginService;

  constructor(service: LoginService) {
    this.service = service;
  }

  verificarAcesso = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("Authorization");

    if (token) {
      try {
        await this.service.validarToken(token);
        next();
      } catch (err: any) {
        res.status(err.id || 401).json({ error: err.msg || "Token invalido." });
      }
    } else {
      res.status(401).json({ error: "Nenhum token informado." });
    }
  };
}
