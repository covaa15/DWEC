import { Router } from 'express';
import * as controller from './controller.js';

const router = Router();

// Ruta que lleva a ver los libros
router.get('/', controller.mostrarSeries);
router.get('/importarComedia',controller.importarDatos);


export { router };
