import { Request, Response } from "express";
import { ArtistaService } from "../service/artista-service";

export class ArtistaController {
  private service: ArtistaService;

  constructor(service: ArtistaService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { nome, genero } = req.body;

    try {
      const artista = await this.service.inserir({ nome, genero });
      res.status(201).json(artista);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao cadastrar artista." });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const artistas = await this.service.listar();
    res.status(200).json(artistas);
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      const artista = await this.service.buscarPorId(id);
      res.status(200).json(artista);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao buscar artista." });
    }
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { nome, genero } = req.body;

    try {
      const artista = await this.service.atualizar(id, { nome, genero });
      res.status(200).json(artista);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao atualizar artista." });
    }
  };

  remover = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await this.service.remover(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao remover artista." });
    }
  };
}
