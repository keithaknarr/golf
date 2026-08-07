import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import url, { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const port = Number(process.env.PORT) || 8000;
const baseUrl = `http://localhost:${port}`;
const stateFile = process.env.GOLF_STATE_FILE || path.join(rootDir, "data", "state.json");
const healthFile = process.env.GOLF_HEALTH_FILE || path.join(rootDir, "data", "health.json");
const STATE_VERSION = 2;

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
]);

function ensureStateFile() {
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  if (!fs.existsSync(stateFile)) {
    fs.writeFileSync(stateFile, JSON.stringify(null), "utf8");
  }
}

function loadStateFromDisk(filePath = stateFile) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.version !== STATE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistStateToDisk(state, filePath = stateFile) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(state), "utf8");
  } catch {}
}

function writeHealth() {
  try {
    fs.mkdirSync(path.dirname(healthFile), { recursive: true });
    fs.writeFileSync(healthFile, JSON.stringify({ ok: true, ts: Date.now(), port }), "utf8");
  } catch {}
}

// In-memory game state shared across all connected clients
let serverState = loadStateFromDisk();
const sseClients = new Set();

function broadcastState() {
  const payload = `data: ${JSON.stringify(serverState)}\n\n`;
  for (const res of sseClients) res.write(payload);
}

// Prevent proxy idle-timeout from killing SSE connections (Render times out at ~90s)
setInterval(() => {
  for (const res of sseClients) res.write(": keepalive\n\n");
}, 20_000);

const resolveFilePath = (requestPath) => {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const safePath = path.normalize(decodeURIComponent(normalizedPath)).replace(/^([/\\])+/, "");
  return path.join(rootDir, safePath);
};

const server = http.createServer((request, response) => {
  if (!request.url) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    return;
  }

  const requestUrl = new url.URL(request.url, baseUrl);
  const { pathname } = requestUrl;
  const isHead = request.method === "HEAD";
  const method = isHead ? "GET" : request.method;

  if (pathname === "/health" && method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    if (!isHead) response.end(JSON.stringify({ ok: true, stateFile, port }));
    else response.end();
    return;
  }

  // SSE — clients subscribe here for live score updates
  if (pathname === "/api/events" && method === "GET") {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });
    response.write("\n");
    sseClients.add(response);
    if (serverState) response.write(`data: ${JSON.stringify(serverState)}\n\n`);
    request.on("close", () => sseClients.delete(response));
    return;
  }

  // Allow clients to poll latest shared state as a fallback to SSE
  if (pathname === "/api/state" && method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    if (!isHead) response.end(JSON.stringify(serverState || {}));
    else response.end();
    return;
  }

  // Receive full state from a client and broadcast to everyone
  if (pathname === "/api/state" && request.method === "POST") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) { response.writeHead(413); response.end(); request.destroy(); }
    });
    request.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        if (parsed && typeof parsed === "object") {
          if (parsed.version !== STATE_VERSION) {
            response.writeHead(409, { "Content-Type": "application/json" });
            response.end('{"ok":false,"reason":"stale-client"}');
            return;
          }
          serverState = parsed;
          persistStateToDisk(serverState);
          broadcastState();
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end('{"ok":true}');
        } else {
          response.writeHead(400); response.end('{"ok":false}');
        }
      } catch { response.writeHead(400); response.end('{"ok":false}'); }
    });
    return;
  }

  // Static files
  const filePath = resolveFilePath(pathname);

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const fileExtension = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes.get(fileExtension) || "application/octet-stream";
    const noStore = fileExtension === ".html" || fileExtension === ".css" || fileExtension === ".js";
    const headers = {
      "Content-Type": contentType,
      "Cache-Control": noStore ? "no-store, no-cache, must-revalidate" : "public, max-age=300",
      "Pragma": noStore ? "no-cache" : "",
      "Expires": noStore ? "0" : "",
    };

    response.writeHead(200, headers);
    if (isHead) {
      response.end();
      return;
    }
    fs.createReadStream(filePath).pipe(response);
  });
});

function startServer() {
  ensureStateFile();
  writeHealth();

  // Bind explicitly to 0.0.0.0 so Codespaces port forwarding picks it up
  server.listen(port, "0.0.0.0", () => {
    console.log(`Golf app running at ${baseUrl}`);
    writeHealth();
  });

  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer();
}

export { loadStateFromDisk, persistStateToDisk, startServer };