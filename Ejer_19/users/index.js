import { Router } from 'express';

import {formularioRegister,crearUsuario,formularioLogin,login,
  logout,portfolio,listarUsuarios} from './controller.js';

const router = Router();

router.get('/all', listarUsuarios); 
router.get('/register', formularioRegister);

router.post('/register', crearUsuario);

router.get('/login', formularioLogin);

router.post('/login', login);

router.get('/logout', logout);

router.get('/portfolio/:username', portfolio);

export { router };