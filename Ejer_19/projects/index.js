import { Router } from 'express';
import { crearProyecto, borrarProyecto } from './controller.js';
import { soloAutenticados } from '../middlewares/auth.js';

const router = Router();

router.post('/project', soloAutenticados, crearProyecto);
router.get('/project/delete/:id', soloAutenticados, borrarProyecto);

export { router };