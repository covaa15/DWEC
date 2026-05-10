import { Router } from 'express';

import { auth } from '../middleware/auth.js';

import {
  dashboard,
  actualizarPerfil
} from './controller.js';

const router = Router();

router.get(
  '/',
  auth,
  dashboard
);

router.post(
  '/profile',
  auth,
  actualizarPerfil
);

export { router };