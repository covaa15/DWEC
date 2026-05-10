import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import {formularioNuevoProyecto,formularioEditarProyecto,guardarProyecto,borrarProyecto} from './controller.js';

const router = Router();

router.get('/new',auth,formularioNuevoProyecto);
router.get('/edit/:id',auth,formularioEditarProyecto);
router.post('/save',auth,guardarProyecto);
router.get('/delete/:id',auth,borrarProyecto);

export { router };