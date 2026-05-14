import { Router } from "express";
import { UsuarioController } from "../controller/usuario-controller";

export const usuarioRotas = (controller: UsuarioController): Router => {
  const router = Router();

  router.post("/", controller.inserir);

  return router;
};
