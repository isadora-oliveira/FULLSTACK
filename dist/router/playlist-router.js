"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRotas = void 0;
const express_1 = require("express");
const playlistRotas = (controller) => {
    const router = (0, express_1.Router)();
    router.post("/", controller.inserir);
    router.get("/", controller.listar);
    // Endpoint de funcionalidade many-to-many.
    router.post("/:playlistId/musicas", controller.adicionarMusica);
    return router;
};
exports.playlistRotas = playlistRotas;
