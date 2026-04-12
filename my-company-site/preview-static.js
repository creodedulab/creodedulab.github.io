const http = require("http");
const fs = require("fs");
const path = require("path");

const outRoot = path.join(__dirname, "out");
const publicRoot = path.join(__dirname, "public");
const port = 4173;
const basePath = "/company-intro";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

function resolvePath(urlPath) {
  let cleanPath = decodeURIComponent(urlPath.split("?")[0]);

  if (cleanPath.startsWith(basePath)) {
    cleanPath = cleanPath.slice(basePath.length) || "/";
  }

  if (cleanPath === "/") {
    return path.join(outRoot, "index.html");
  }

  const candidateRoots = [outRoot, publicRoot];

  for (const root of candidateRoots) {
    const directPath = path.join(root, cleanPath);
    const indexPath = path.join(root, cleanPath, "index.html");

    if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
      return directPath;
    }

    if (fs.existsSync(indexPath)) {
      return indexPath;
    }

    if (!path.extname(cleanPath)) {
      const htmlPath = path.join(root, `${cleanPath}.html`);
      if (fs.existsSync(htmlPath)) {
        return htmlPath;
      }
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url || "/");

  if (
    !filePath ||
    (!filePath.startsWith(outRoot) && !filePath.startsWith(publicRoot))
  ) {
    send(res, 404, "Not found");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 500, "Server error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, mimeTypes[ext] || "application/octet-stream");
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static preview running at http://127.0.0.1:${port}${basePath}/`);
});
