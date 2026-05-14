"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRotas = void 0;
const express_1 = require("express");
const usuarioRotas = (controller) => {
    const router = (0, express_1.Router)();
    router.post("/", controller.inserir);
    return router;
};
exports.usuarioRotas = usuarioRotas;
