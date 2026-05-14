import { Router } from "express";
import { MusicaController } from "../controller/musica-controller";

export const musicaRotas = (controller: MusicaController): Router => {
  const router = Router();

  router.post("/", controller.inserir);
  router.get("/", controller.listar);
  router.get("/:id", controller.buscarPorId);
  router.put("/:id", controller.atualizar);
  router.delete("/:id", controller.remover);

  return router;
};
