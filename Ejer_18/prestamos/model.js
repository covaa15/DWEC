import { conexionBD } from '../db.js';


// Funcion que crea un prestamo
export async function crearPrestamo(datos) {
  await conexionBD.query(`
    INSERT INTO prestamos 
    (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion)
    VALUES (?, ?, ?, ?)
  `, [
    datos.libro_id,
    datos.nombre,
    datos.fecha_prestamo,
    datos.fecha_devolucion
  ]);
}

// Funcion que actualiza la bd para actualizar la devolucion de un libro
export async function registrarDevolucion(libro_id) {
  await conexionBD.query(`
    UPDATE prestamos
    SET fecha_entrega = CURDATE()
    WHERE libro_id=? AND fecha_entrega IS NULL
  `, [libro_id]);
}

//Funcion que obtine los prestamos de un usuario
export async function obtenerPrestamosPorUsuario(nombre) {
  const [filas] = await conexionBD.query(`
    SELECT l.*, p.fecha_devolucion
    FROM prestamos p
    INNER JOIN libros l ON l.id = p.libro_id
    WHERE p.nombre_prestatario=? AND p.fecha_entrega IS NULL
  `, [nombre]);

  return filas;
}


