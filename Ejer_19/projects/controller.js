import * as modelo from './model.js';

// Funcion que crea un proyecto
export async function crearProyecto(req, res) {
  await modelo.crearProyecto(req.body, req.session.user.id);

  res.redirect('/dashboard');
}

// Funcion que  borra el proyecto
export async function borrarProyecto(req, res) {

  await modelo.borrarProyecto(req.params.id, req.session.user.id);

  res.redirect('/dashboard');
}