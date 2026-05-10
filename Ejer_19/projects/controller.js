import * as modelo from './model.js';
import {vistaFormularioProyecto} from './view.js';

// Muestra el formulario para crear un nuevo Proyecto
export function formularioNuevoProyecto(
  req,
  res
) {

  res.send(
    vistaFormularioProyecto()
  );
}

// Muestra el formulario para  editar proyecto
export async function formularioEditarProyecto(req,res) {

  const proyecto =
    await modelo.obtenerProyectoPorId(
      req.params.id
    );

  if (
    proyecto.user_id !== req.session.user.id
  ) {
    return res.send('Acceso denegado');
  }

  res.send(
    vistaFormularioProyecto(
      proyecto
    )
  );
}

//Funcion para guardar los datos de un proyecto
export async function guardarProyecto(req,res) {

  // Edito un Proyecto
  if (req.body.id) {

    const proyecto =
      await modelo.obtenerProyectoPorId(req.body.id);

    if (
      proyecto.user_id !== req.session.user.id
    ) {
      return res.send('Acceso denegado');
    }

    await modelo.actualizarProyecto({
      ...req.body,
      user_id: req.session.user.id
    });

  } else {

    // Creo un proyecto
    await modelo.crearProyecto({
      ...req.body,
      user_id: req.session.user.id
    });
  }

  res.redirect('/dashboard');
}

// Funcion para borrar un proyecto
export async function borrarProyecto(req,res) {

  await modelo.eliminarProyecto(
    req.params.id,
    req.session.user.id
  );

  res.redirect('/dashboard');
}