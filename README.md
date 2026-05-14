# API Musicas

Projeto de faculdade em TypeScript com Express + TypeORM, separado em camadas:

- controller
- service
- router
- entity
- middleware

Objetivo do projeto: backend REST com autenticacao, CRUD e persistencia em PostgreSQL.

## Como esta rodando hoje

- API: local (`npm run dev`)
- Banco: Docker (PostgreSQL)
- pgAdmin: Docker

## Funcionalidades implementadas

- autenticacao com JWT
- CRUD de artistas
- CRUD de albuns
- CRUD de musicas
- CRUD de playlists
- cadastro de usuario
- funcionalidade Many-to-Many: adicionar musica em playlist

## Subir banco e pgAdmin (Docker)

```bash
docker compose up -d
```

Servicos:

- PostgreSQL: `localhost:5433`
- pgAdmin: `http://localhost:8081`

Credenciais PostgreSQL:

- usuario: `postgres`
- senha: `123456`
- banco: `api_musicas`

Credenciais pgAdmin:

- email: `user@localhost.com`
- senha: `password`

## Subir API local

```bash
npm install
npm run dev
```

API em: `http://localhost:3000`

## Testes no Insomnia

Colecao pronta para import:

- `insomnia/api-musicas-insomnia-completa.json`

Fluxo recomendado de teste manual:

1. `GET /hello`
2. `POST /api/usuarios`
3. `POST /api/login`
4. Copiar token retornado
5. Colar token no header `Authorization` das rotas privadas
6. Testar CRUD de artistas
7. Testar CRUD de albuns
8. Testar CRUD de musicas
9. Testar CRUD de playlists
10. Testar `POST /api/playlists/:playlistId/musicas`

Rotas publicas:

- `GET /hello`
- `POST /api/usuarios`
- `POST /api/login`

Rotas privadas:

- `/api/artistas`
- `/api/albuns`
- `/api/musicas`
- `/api/playlists`

## Teste automatizado (smoke)

Script de verificacao rapida:

```bash
npm run test:smoke
```

Esse teste valida:

1. healthcheck
2. cadastro de usuario
3. login
4. criacao de artista/album/musica/playlist
5. vinculo musica-playlist (many-to-many)

## Estrutura das camadas

1. `src/data-source.ts` - conexao com banco
2. `src/entity/` - modelagem das entidades
3. `src/service/` - regras de negocio e validacoes
4. `src/controller/` - camada HTTP
5. `src/router/` - endpoints
6. `src/middleware/` - autenticacao/token

## Relacionamentos do banco

- Artista -> Album: One-to-Many
- Artista -> Musica: One-to-Many
- Musica -> Album: Many-to-One
- Playlist <-> Musica: Many-to-Many

## Observacao

`synchronize: true` esta ativo para facilitar o desenvolvimento da disciplina.
