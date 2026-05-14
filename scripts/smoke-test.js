const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function requestJson(path, options = {}) {
  const mergedHeaders = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: mergedHeaders,
  });

  let data = null;
  const raw = await response.text();

  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }
  }

  return { response, data };
}

async function main() {
  const now = Date.now();
  const email = `smoke_${now}@api.com`;
  const senha = "123456";

  console.log(`[smoke] BASE_URL=${BASE_URL}`);

  const hello = await requestJson("/hello", { method: "GET" });
  assert(hello.response.status === 200, "GET /hello deveria retornar 200");
  console.log("[smoke] GET /hello OK");

  const criarUsuario = await requestJson("/api/usuarios", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
  assert(criarUsuario.response.status === 201, "POST /api/usuarios deveria retornar 201");
  console.log("[smoke] POST /api/usuarios OK");

  const login = await requestJson("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
  assert(login.response.status === 200, "POST /api/login deveria retornar 200");
  assert(login.data && login.data.token, "POST /api/login deveria retornar token");
  const token = login.data.token;
  console.log("[smoke] POST /api/login OK");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const artista = await requestJson("/api/artistas", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ nome: `Artista ${now}`, genero: "Pop" }),
  });
  assert(artista.response.status === 201, "POST /api/artistas deveria retornar 201");
  assert(artista.data && artista.data.id, "Artista criado sem id");
  console.log("[smoke] POST /api/artistas OK");

  const album = await requestJson("/api/albuns", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      titulo: `Album ${now}`,
      anoLancamento: 2024,
      artistaId: artista.data.id,
    }),
  });
  assert(album.response.status === 201, "POST /api/albuns deveria retornar 201");
  assert(album.data && album.data.id, "Album criado sem id");
  console.log("[smoke] POST /api/albuns OK");

  const musica = await requestJson("/api/musicas", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      titulo: `Musica ${now}`,
      duracaoSegundos: 180,
      artistaId: artista.data.id,
      albumId: album.data.id,
    }),
  });
  assert(musica.response.status === 201, "POST /api/musicas deveria retornar 201");
  assert(musica.data && musica.data.id, "Musica criada sem id");
  console.log("[smoke] POST /api/musicas OK");

  const playlist = await requestJson("/api/playlists", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ nome: `Playlist ${now}` }),
  });
  assert(playlist.response.status === 201, "POST /api/playlists deveria retornar 201");
  assert(playlist.data && playlist.data.id, "Playlist criada sem id");
  console.log("[smoke] POST /api/playlists OK");

  const vinculo = await requestJson(`/api/playlists/${playlist.data.id}/musicas`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ musicaId: musica.data.id }),
  });
  assert(
    vinculo.response.status === 200,
    "POST /api/playlists/:playlistId/musicas deveria retornar 200",
  );
  console.log("[smoke] POST /api/playlists/:playlistId/musicas OK");

  const listarPlaylists = await requestJson("/api/playlists", {
    method: "GET",
    headers: authHeaders,
  });
  assert(listarPlaylists.response.status === 200, "GET /api/playlists deveria retornar 200");
  assert(Array.isArray(listarPlaylists.data), "GET /api/playlists deveria retornar array");
  console.log("[smoke] GET /api/playlists OK");

  console.log("\n[smoke] SUCESSO: fluxo principal validado.");
}

main().catch((err) => {
  console.error("\n[smoke] FALHA:", err.message);
  process.exit(1);
});
