
import { Router } from 'express';
import {mostrarLibros,mostrarLibrosPrestados,mostrarDetalleLibro,mostrarLibrosVencidos} from './controller.js';

const router = Router();

// Ruta que lleva a ver los libros
router.get('/libros', mostrarLibros);

// Ruta que lleva a ver los libros prestados
router.get('/prestados', mostrarLibrosPrestados);

// Ruta que lleva a ver los detalles del libro
router.get('/libro/:id', mostrarDetalleLibro);

//Ruta que lleva a ver los libros vencidos
router.get('/vencidos', mostrarLibrosVencidos);

export { router };
