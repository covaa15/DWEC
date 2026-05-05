
import * as modelo from './model.js';
import * as modeloLibros from '../libros/model.js';

// Formulario para mostrar los prestamos
export async function mostrarFormularioPrestamo(req, res) {
  res.send(`
    <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>

    <nav class="menu">
      <a href="/libros">Inicio</a>
    </nav>

    <h1>Nuevo préstamo</h1>

    <form method="POST" action="/prestamos/nuevo">

      <input type="hidden" name="libro_id" value="${req.params.libro_id}">

      <label>Nombre</label>
      <input name="nombre" required>

      <label>Fecha devolución</label>
      <input type="date" name="fecha_devolucion" required>

      <button>Guardar</button>
    </form>

    </body>
    </html>
  `);
}

//Funcion para crear un presyamo
export async function crearPrestamo(req, res) {
  await modelo.crearPrestamo({
    libro_id: req.body.libro_id,
    nombre: req.body.nombre,
    fecha_prestamo: new Date(),
    fecha_devolucion: req.body.fecha_devolucion
  });

  await modeloLibros.actualizarEstadoLibro(req.body.libro_id, 'Prestado');

  res.redirect(`/libro/${req.body.libro_id}`);
}

// Funcion para registrar la devolucion del libro
export async function registrarDevolucion(req, res) {
  await modelo.registrarDevolucion(req.params.libro_id);

  await modeloLibros.actualizarEstadoLibro(req.params.libro_id, 'Disponible');

  res.redirect(`/libro/${req.params.libro_id}`);
}

// Funcion para mostrar los prestamos por usuario
export async function mostrarPrestamosUsuario(req, res) {
  const datos = await modelo.obtenerPrestamosPorUsuario(req.query.nombre);

  res.send(`
    <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>

    <nav class="menu">
      <a href="/libros">Inicio</a>
    </nav>

    <h1>Libros prestados a ${req.query.nombre}</h1>

    ${datos.map(libro => `
      <p>${libro.titulo} - ${new Date(libro.fecha_devolucion).toLocaleDateString()}</p>
    `).join('')}

    </body>
    </html>
  `);
}


