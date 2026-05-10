import * as modelo from './model.js';
import {vistaFormularioSocial} from './view.js';

// Muestro el formulario para hacer un neuvo socialLink
export function formularioNuevoLink(req,res) {

  res.send(
    vistaFormularioSocial()
  );
}

// Muestro el formulario para editar un nuevo socialLink
export async function formularioEditarLink(req,res) {

  const link =
    await modelo.obtenerLinkPorId(
      req.params.id
    );

  if (
    link.user_id !== req.session.user.id
  ) {
    return res.send('Acceso denegado');
  }

  res.send(
    vistaFormularioSocial(link)
  );
}

// Funcion que guarda un social Link
export async function guardarLink(req, res) {

  // Edito un social Link
  if (req.body.id) {

    const link =
      await modelo.obtenerLinkPorId(
        req.body.id
      );

    if (
      link.user_id !== req.session.user.id
    ) {
      return res.send('Acceso denegado');
    }

    await modelo.actualizarLink({
      ...req.body,
      user_id: req.session.user.id
    });

  } else {

    // Creo un nuevo socialLink
    await modelo.crearLink({
      ...req.body,
      user_id: req.session.user.id
    });
  }

  res.redirect('/dashboard');
}

// Funcion que elimina un socialLink
export async function borrarLink(req,res) {

  await modelo.eliminarLink(
    req.params.id,
    req.session.user.id
  );

  res.redirect('/dashboard');
}