import { Request, Response } from "express";
import { UsuarioService } from "../service/usuario-service";

export class UsuarioController {
  private service: UsuarioService;

  constructor(service: UsuarioService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;

    try {
      const novoUsuario = await this.service.inserir({ email, senha });
      res.status(201).json({ id: novoUsuario.id, email: novoUsuario.email });
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao cadastrar usuario." });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const usuarios = await this.service.listar();
    res.json(usuarios);
  };
}
