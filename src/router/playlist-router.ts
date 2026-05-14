import { Router } from "express";
import { PlaylistController } from "../controller/playlist-controller";

export const playlistRotas = (controller: PlaylistController): Router => {
  const router = Router();

  router.post("/", controller.inserir);
  router.get("/", controller.listar);

  // Endpoint de funcionalidade many-to-many.
  router.post("/:playlistId/musicas", controller.adicionarMusica);

  return router;
};
