import { Router } from 'express';

import {
  mostrarFormularioPrestamo,crearPrestamo,registrarDevolucion,mostrarPrestamosUsuario,mostrarLibrosVencidos} from './controller.js';

const router = Router();

// Voy a la ventana donde puedo ver los prestamos
router.get('/formulario/:libro_id', mostrarFormularioPrestamo);

// Voy a la ventana donde creo el prestamo
router.post('/nuevo', crearPrestamo);

// Voy a la ventana de devolucion de un libro
router.get('/devolver/:libro_id', registrarDevolucion);

// Voy a la ventana donde puedo ver los libros que tiene prestados cada usuario
router.get('/usuario', mostrarPrestamosUsuario);

// Voy a la ventana donde puedo ver todos los libros vencidos
router.get('/vencidos', mostrarLibrosVencidos);

export { router };
