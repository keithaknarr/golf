import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const rootDir = process.cwd();
const port = Number(process.env.PORT) || 8000;
const baseUrl = `http://localhost:${port}`;

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

// In-memory game state shared across all connected clients
let serverState = null;
const sseClients = new Set();

function broadcastState() {
  const payload = `data: ${JSON.stringify(serverState)}\n\n`;
  for (const res of sseClients) res.write(payload);
}

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

  // SSE — clients subscribe here for live score updates
  if (pathname === "/api/events" && request.method === "GET") {
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
          serverState = parsed;
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

    response.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(response);
  });
});

// Bind explicitly to 0.0.0.0 so Codespaces port forwarding picks it up
server.listen(port, "0.0.0.0", () => {
  console.log(`Golf app running at ${baseUrl}`);
});