"use strict";
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const root = __dirname;
const store = path.join(root, "data", "checkins.json");
const planets = [
  "mercury",
  "venus",
  "moon",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];
fs.mkdirSync(path.dirname(store), { recursive: true });
let records = fs.existsSync(store)
  ? JSON.parse(fs.readFileSync(store, "utf8"))
  : [];
function save() {
  const temporary = store + ".tmp";
  fs.writeFileSync(temporary, JSON.stringify(records, null, 2));
  fs.renameSync(temporary, store);
}
function publicRecord(record) {
  const { clientId, ...rest } = record;
  return rest;
}
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};
const server = http.createServer(async (req, res) => {
  const json = (code, data) => {
    res.writeHead(code, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(JSON.stringify(data));
  };
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
  } catch {
    return json(400, { error: "Invalid path" });
  }
  if (pathname === "/api/state" && req.method === "GET")
    return json(200, {
      service: "space-line",
      records: records.map(publicRecord),
    });
  if (pathname.startsWith("/api/") && req.method === "POST") {
    // Originチェック。
    if (
      req.headers.origin &&
      new URL(req.headers.origin).host !== req.headers.host
    )
      return json(403, { error: "Origin mismatch" });
    let data;
    try {
      let body = "";
      for await (const chunk of req) {
        body += chunk;
        if (body.length > 8192) return json(413, { error: "Too large" });
      }
      data = JSON.parse(body);
    } catch {
      return json(400, { error: "Invalid JSON" });
    }
    if (
      typeof data.clientId !== "string" ||
      !/^[a-zA-Z0-9-]{20,80}$/.test(data.clientId)
    )
      return json(400, { error: "Invalid client" });
    if (pathname === "/api/checkin") {
      if (
        typeof data.username !== "string" ||
        !data.username.trim() ||
        [...data.username].length > 20 ||
        (!Number.isInteger(data.avatarId) || data.avatarId < 1 || data.avatarId > 21) ||
        !planets.includes(data.planetId) ||
        !Array.from(
          { length: 128 },
          (_, i) => `${data.planetId}-${String(i + 1).padStart(2, "0")}`,
        ).includes(data.slotId)
      )
        return json(400, { error: "入力内容を確認してください。" });
      const existing = records.find((r) => r.clientId === data.clientId);
      if (existing) return json(200, publicRecord(existing));
      // 地点の重複確認から保存までは同期処理。
      if (records.some((r) => r.slotId === data.slotId))
        return json(409, {
          error: "先に他の人が選びました。別の白い点を選んでください。",
        });
      const record = {
        id: crypto.randomUUID(),
        clientId: data.clientId,
        username: data.username.trim(),
        avatarId: data.avatarId,
        planetId: data.planetId,
        slotId: data.slotId,
        ticketId: "SL-" + String(records.length + 1).padStart(4, "0"),
        createdAt: new Date().toISOString(),
        message: "",
      };
      records.push(record);
      try {
        save();
      } catch {
        records.pop();
        return json(500, { error: "保存に失敗しました。" });
      }
      return json(201, publicRecord(record));
    }
    if (pathname === "/api/message") {
      const record = records.find(
        (r) => r.id === data.id && r.clientId === data.clientId,
      );
      if (!record) return json(403, { error: "Not your record" });
      if (typeof data.message !== "string" || [...data.message].length > 60)
        return json(400, { error: "60文字以内で入力してください。" });
      const previous = record.message;
      record.message = data.message;
      try {
        save();
      } catch {
        record.message = previous;
        return json(500, { error: "保存に失敗しました。" });
      }
      return json(200, publicRecord(record));
    }
    return json(404, { error: "Not found" });
  }
  if (req.method !== "GET" && req.method !== "HEAD")
    return json(405, { error: "Method not allowed" });
  const rel = pathname === "/" ? "index.html" : pathname.slice(1);
  // 配信するファイルを制限。
  if (
    !/^(index\.html|ticket\.html|checkins\.html|credits\.html|(?:assets|css|js|solar|textures|licenses)\/[a-zA-Z0-9_./-]+)$/.test(
      rel,
    ) ||
    rel.split("/").some((p) => p.startsWith("."))
  )
    return json(404, { error: "Not found" });
  fs.readFile(path.join(root, rel), (err, bytes) => {
    if (err) return json(404, { error: "Not found" });
    res.writeHead(200, {
      "Content-Type": types[path.extname(rel)] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : bytes);
  });
});
const port =
  Number(process.env.PORT) ||
  Number(process.argv[process.argv.indexOf("--port") + 1]) ||
  3000;
server.listen(port, "0.0.0.0", () =>
  console.log(
    "SPACE LINE http://localhost:" +
      port +
      " / 同じWi-FiのスマホではPCのIPアドレスを使用",
  ),
);
