import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import {formularioNuevoLink,formularioEditarLink,guardarLink,borrarLink} from './controller.js';

const router = Router();

router.get('/new',auth,formularioNuevoLink);
router.get('/edit/:id',auth,formularioEditarLink);
router.post('/save',auth,guardarLink);
router.get('/delete/:id',auth,borrarLink);

export { router };