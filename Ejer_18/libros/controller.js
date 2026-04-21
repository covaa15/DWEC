import * as modelo from './model.js';
import { vistaListado, vistaDetalle, vistaPrestados } from './view.js';
import { conexionBD } from '../db.js';

// Otengo tos los libros y los muestro en la vista
export async function mostrarLibros(req, res) {
  const libros = await modelo.obtenerTodosLosLibros();
  res.send(vistaListado(libros));
}

// Obtengo los libtos perestados y lo muesto en la vista
export async function mostrarLibrosPrestados(req, res) {
  const libros = await modelo.obtenerLibrosPrestados();
  res.send(vistaPrestados(libros));
}

// Obtengo los detalles de un libro y los muestro
export async function mostrarDetalleLibro(req, res) {
  const libro = await modelo.obtenerLibroPorId(req.params.id);
  const [historial] = await conexionBD.query(
    'SELECT * FROM prestamos WHERE libro_id=?',
    [req.params.id]
  );

  res.send(vistaDetalle(libro, historial));
}

// Obtengo los libros vencidos y los muestro
export async function mostrarLibrosVencidos(req, res) {
  const libros = await modelo.obtenerLibrosVencidos();

  res.send(`
    <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>

    <nav class="menu">
      <a href="/libros">Inicio</a>
      <a href="/prestados">Prestados</a>
      <a href="/vencidos">Vencidos</a>
    </nav>

    <h1>Libros vencidos</h1>

    <table>
      <tr>
        <th>Título</th>
        <th>Autor</th>
        <th>Fecha devolución</th>
      </tr>

      ${libros.map(libro => `
        <tr>
          <td>${libro.titulo}</td>
          <td>${libro.autor}</td>
          <td>${new Date(libro.fecha_devolucion).toLocaleDateString()}</td>
        </tr>
      `).join('')}

    </table>

    </body>
    </html>
  `);
}


