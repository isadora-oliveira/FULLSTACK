"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumRotas = void 0;
const express_1 = require("express");
const albumRotas = (controller) => {
    const router = (0, express_1.Router)();
    router.post("/", controller.inserir);
    router.get("/", controller.listar);
    router.get("/:id", controller.buscarPorId);
    router.put("/:id", controller.atualizar);
    router.delete("/:id", controller.remover);
    return router;
};
exports.albumRotas = albumRotas;
