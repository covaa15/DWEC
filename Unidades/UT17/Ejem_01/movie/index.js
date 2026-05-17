import { Router } from 'express';
import {
  listAction,
  removeAction,
  formAction,
  saveAction,
  rateAction
} from './controller.js';

const router = Router();

router.get('/', listAction);
router.get('/delete/:id', removeAction);
router.get('/form', formAction);      // sin id, nuevo
router.get('/form/:id', formAction);  // con id editamos existente
router.post('/save', saveAction);
router.get('/rate/:movie/:rating', rateAction);

export { router };
