import { conexionBD } from '../db.js';

// Obtengo todos los libros
export async function obtenerTodosLosLibros() {
  const [filas] = await conexionBD.query('SELECT * FROM libros');
  return filas;
}

// Obtengo el libro por id
export async function obtenerLibroPorId(id) {
  const [filas] = await conexionBD.query(
    'SELECT * FROM libros WHERE id=?',
    [id]
  );
  return filas[0];
}

// Actualizo estado del libro
export async function actualizarEstadoLibro(id, estado) {
  await conexionBD.query(
    'UPDATE libros SET estado=? WHERE id=?',
    [estado, id]
  );
}

// Obtengo los libros prestados
export async function obtenerLibrosPrestados() {
  const [filas] = await conexionBD.query(`
    SELECT l.*, p.nombre_prestatario, p.fecha_devolucion
    FROM libros l
    INNER JOIN prestamos p ON l.id = p.libro_id
    WHERE l.estado='Prestado' AND p.fecha_entrega IS NULL
  `);

  return filas;
}
//Obtengo los libros vencidos
export async function obtenerLibrosVencidos() {
  const [rows] = await conexionBD.query(`
    SELECT l.*, p.fecha_devolucion
    FROM libros l
    JOIN prestamos p ON l.id = p.libro_id
    WHERE p.fecha_devolucion < CURDATE()
      AND p.fecha_entrega IS NULL
  `);

  return rows;
}
