//Rutas
import { Router } from 'express';
import { listaAction, eliminarAction, formAction, guardarAction, detalleAction } from './controller.js';

const router = Router();

// Ruta para mostrar la lista de artistas
router.get('/', listaAction);
 
// Ruta para mostrar el formulario para crear artista
router.get('/form', formAction);

// Ruta para editar un artista existente
router.get('/form/:id', formAction);

// Ruta para eliminar un artista
router.get('/delete/:id', eliminarAction);

//Ruta para ver el detalle de un artista
router.get('/detalle/:id', detalleAction);

// Ruta que recibe los datos del formulario y crea o actualiza el artista
router.post('/save', guardarAction);
export { router };
