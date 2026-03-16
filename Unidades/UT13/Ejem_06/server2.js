import { createServer } from 'http';

const PORT = 8080;

const server = createServer((req, res) => {
  // HOME
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Inicio</title>
      </head>
      <body>
        <h1>Inicio</h1>
        <p>Servidor HTTP con Node.js</p>
        <a href="/about">Ir a About</a>
      </body>
      </html>
    `);
    return;
  }

  // ABOUT
  if (req.url === '/about' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>About</title>
      </head>
      <body>
        <h1>About</h1>
        <p>Ejemplo simple con Node.js</p>
        <a href="/">Volver al inicio</a>
      </body>
      </html>
    `);
    return;
  }

  // 404
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  res.end(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>404</title>
    </head>
    <body>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <a href="/">Ir al inicio</a>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});