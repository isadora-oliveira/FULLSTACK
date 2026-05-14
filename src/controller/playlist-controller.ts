import { Request, Response } from "express";
import { PlaylistService } from "../service/playlist-service";

export class PlaylistController {
  private service: PlaylistService;

  constructor(service: PlaylistService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { nome } = req.body;

    try {
      const playlist = await this.service.inserir(nome);
      res.status(201).json(playlist);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao cadastrar playlist." });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const playlists = await this.service.listar();
    res.status(200).json(playlists);
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      const playlist = await this.service.buscarPorId(id);
      res.status(200).json(playlist);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao buscar playlist." });
    }
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { nome } = req.body;

    try {
      const playlist = await this.service.atualizar(id, nome);
      res.status(200).json(playlist);
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao atualizar playlist." });
    }
  };

  remover = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await this.service.remover(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(err.id || 500).json({ error: err.msg || "Erro ao remover playlist." });
    }
  };

  adicionarMusica = async (req: Request, res: Response): Promise<void> => {
    const playlistId = Number(req.params.playlistId);
    const { musicaId } = req.body;

    try {
      const playlistAtualizada = await this.service.adicionarMusicaNaPlaylist(
        playlistId,
        Number(musicaId),
      );

      res.status(200).json(playlistAtualizada);
    } catch (err: any) {
      res
        .status(err.id || 500)
        .json({ error: err.msg || "Erro ao adicionar musica na playlist." });
    }
  };
}
