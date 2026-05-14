import { Request, Response } from "express";
import { AlbumService } from "../service/album-service";

export class AlbumController {
  private service: AlbumService;

  constructor(service: AlbumService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { titulo, anoLancamento, artistaId } = req.body;

    try {
      const album = await this.service.inserir(titulo, Number(anoLancamento), Number(artistaId));
      res.status(201).json(album);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao cadastrar album." });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const albuns = await this.service.listar();
    res.status(200).json(albuns);
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      const album = await this.service.buscarPorId(id);
      res.status(200).json(album);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao buscar album." });
    }
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { titulo, anoLancamento } = req.body;

    try {
      const album = await this.service.atualizar(id, titulo, Number(anoLancamento));
      res.status(200).json(album);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao atualizar album." });
    }
  };

  remover = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await this.service.remover(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao remover album." });
    }
  };
}
