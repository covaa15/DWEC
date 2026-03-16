import { createServer } from 'http';
const PORT = 8080;
const HOST = '127.0.0.1';

function handleHome(req, res) {
  const mensaje = 'Hola desde HOME';   // 👈 breakpoint aquí
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<h1>${mensaje}</h1>`);
}

function handleAbout(req, res) {
  const info = 'Página About';         // 👈 breakpoint aquí
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<h1>${info}</h1>`);
}

const server = createServer((req, res) => {
  console.log('URL:', req.url);         // 👈 breakpoint aquí

  if (req.url === '/') {
    handleHome(req, res);               // 👈 prueba Step Into / Step Over
    return;
  }

  if (req.url === '/about') {
    handleAbout(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>404</h1>');
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor en http://${HOST}:${PORT}`);
});
