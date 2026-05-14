"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artista = void 0;
const typeorm_1 = require("typeorm");
const album_1 = require("./album");
const musica_1 = require("./musica");
let Artista = class Artista {
};
exports.Artista = Artista;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Artista.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Artista.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artista.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => album_1.Album, (album) => album.artista),
    __metadata("design:type", Array)
], Artista.prototype, "albuns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => musica_1.Musica, (musica) => musica.artista),
    __metadata("design:type", Array)
], Artista.prototype, "musicas", void 0);
exports.Artista = Artista = __decorate([
    (0, typeorm_1.Entity)()
], Artista);
