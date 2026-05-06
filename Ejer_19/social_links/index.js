import { Router } from 'express';
import { crearLink, borrarLink } from './controller.js';
import { soloAutenticados } from '../middlewares/auth.js';

const router = Router();

router.post('/link', soloAutenticados, crearLink);
router.get('/link/delete/:id', soloAutenticados, borrarLink);

export { router };