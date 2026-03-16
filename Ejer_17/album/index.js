//Rutas
import { Router } from 'express';

import {listaAction,eliminarAction,formAction,guardarAction,} from './controller.js';

const router = Router();

// Ruta para mostar la lista de todos los albumes
router.get('/', listaAction);

// Ruta para eliminar un album a partir de su id
router.get('/delete/:id', eliminarAction);

// Ruta que muestra el formulario para crear un nuevo album
router.get('/form', formAction);

// Ruta que muestra el formulario para editar un album
router.get('/form/:id', formAction);

// Ruta que recibe los datos del formulario y crea o actualiza el album
router.post('/save', guardarAction);

export { router };
