import { Router } from 'express';
import {
  listAction,
  removeAction,
  formAction,
  saveAction,
} from './controller.js';

const router = Router();

router.get('/', listAction);
router.get('/delete/:id', removeAction);
router.get('/form', formAction);      // sin id, nuevo
router.get('/form/:id', formAction);  // con id
router.post('/save', saveAction);

export { router };
