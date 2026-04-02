//Rutas
import { Router } from 'express';

import {
  listaAction,
  eliminarAction,
  formAction,
  guardarAction,
} from './controller.js';

const router = Router();

// Lista de los albunes
router.get('/', listaAction);

// Eliminar un albun
router.get('/delete/:id', eliminarAction);

// formulario sin id -> crear
router.get('/form', formAction);

// formulario con id -> editar
router.get('/form/:id', formAction);

// guardar datos
router.post('/save', guardarAction);

export { router };
