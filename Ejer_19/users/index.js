import { Router } from 'express';
import {mostrarLogin,mostrarRegister,registrarUsuario,loginUsuario,mostrarPortfolio,mostrarDashboard,actualizarPerfil} from './controller.js';

import { soloAutenticados } from '../middlewares/auth.js';

const router = Router();

// Rutas de la autehtificacion
router.get('/login', mostrarLogin);
router.get('/register', mostrarRegister);
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

// Rutas portfolio 
router.get('/portfolio/:username', mostrarPortfolio);

// Rutas dashboard
router.get('/dashboard', soloAutenticados, mostrarDashboard);
router.post('/users/update', soloAutenticados, actualizarPerfil);

export { router };