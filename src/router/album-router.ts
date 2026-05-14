import { Router } from "express";
import { AlbumController } from "../controller/album-controller";

export const albumRotas = (controller: AlbumController): Router => {
  const router = Router();

  router.post("/", controller.inserir);
  router.get("/", controller.listar);
  router.get("/:id", controller.buscarPorId);
  router.put("/:id", controller.atualizar);
  router.delete("/:id", controller.remover);

  return router;
};
