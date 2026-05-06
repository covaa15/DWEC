import * as modelo from './model.js';
import crypto from 'crypto';
import { formLogin, formRegister, formEditarPerfil } from './forms.js';
import { vistaPortfolio, vistaDashboard } from './view.js';
import { conexionBD } from '../db.js';

import { vistaProyectos } from '../projects/view.js';
import { formProyecto } from '../projects/forms.js';

import { vistaLinks } from '../social_links/view.js';
import { formLink } from '../social_links/forms.js';

// Funcion que muestra el formulario de login
export function mostrarLogin(req, res) {
  res.send(formLogin());
}

// Fucion que muestra el formulario de registro
export function mostrarRegister(req, res) {
  res.send(formRegister());
}

/// Funcion que muestra el Usuario Registrado
export async function registrarUsuario(req, res) {

  const { username, password, email, photo } = req.body;

  await modelo.crearUsuario(username, password, email, photo);

  res.redirect('/login');
}

// Funcion que muestra el Usuario Logueado
export async function loginUsuario(req, res) {

  const { username, password } = req.body;

  const user = await modelo.obtenerUsuario(username);

  const pass = crypto.createHash('md5').update(password).digest('hex');

  if (!user || user.password !== pass) {
    return res.send(formLogin('Error login'));
  }

  req.session.user = user;

  res.redirect('/dashboard');
}

//FUncion que muestra el Portfolio
export async function mostrarPortfolio(req, res) {

  const user = await modelo.obtenerUsuario(req.params.username);

  const [proyectos] = await conexionBD.query(
    'SELECT * FROM projects WHERE user_id=?',
    [user.id]
  );

  const [links] = await conexionBD.query(
    'SELECT * FROM social_links WHERE user_id=?',
    [user.id]
  );

  const esPropietario = req.session?.user?.id === user.id;

  res.send(vistaPortfolio(user, proyectos, links, esPropietario));
}

// FUncion que muestra el Dashborar
export async function mostrarDashboard(req, res) {

  const user = req.session.user;

  const [proyectos] = await conexionBD.query(
    'SELECT * FROM projects WHERE user_id=?',
    [user.id]
  );

  const [links] = await conexionBD.query(
    'SELECT * FROM social_links WHERE user_id=?',
    [user.id]
  );

  res.send(vistaDashboard(
    user,
    proyectos,
    links,
    formEditarPerfil(user),
    vistaProyectos(proyectos),
    formProyecto(),
    vistaLinks(links),
    formLink()
  ));
}

// Funcion que actualiza el perfil
export async function actualizarPerfil(req, res) {

  const { bio, email, photo } = req.body;

  await modelo.actualizarPerfil(req.session.user.id, bio, email, photo);

  req.session.user.bio = bio;
  req.session.user.email = email;
  req.session.user.photo = photo;

  res.redirect('/dashboard');
}