import * as modelo from './model.js';

// Esta funcion llama a la funcion de crear un link
export async function crearLink(req, res) {

  await modelo.crearLink(req.body, req.session.user.id);

  res.redirect('/dashboard');
}

// Esta funcion llama a la funcion de eliminar un link
export async function borrarLink(req, res) {

  await modelo.borrarLink(req.params.id, req.session.user.id);

  res.redirect('/dashboard');
}