import { Request, Response } from "express";
import { MusicaService } from "../service/musica-service";

export class MusicaController {
  private service: MusicaService;

  constructor(service: MusicaService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { titulo, duracaoSegundos, artistaId, albumId } = req.body;

    try {
      const musica = await this.service.inserir(
        titulo,
        Number(duracaoSegundos),
        Number(artistaId),
        Number(albumId),
      );

      res.status(201).json(musica);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao cadastrar musica." });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const musicas = await this.service.listar();
    res.status(200).json(musicas);
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      const musica = await this.service.buscarPorId(id);
      res.status(200).json(musica);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao buscar musica." });
    }
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { titulo, duracaoSegundos } = req.body;

    try {
      const musica = await this.service.atualizar(id, titulo, Number(duracaoSegundos));
      res.status(200).json(musica);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao atualizar musica." });
    }
  };

  remover = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await this.service.remover(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao remover musica." });
    }
  };
}
