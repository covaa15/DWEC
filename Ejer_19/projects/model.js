import { conexionBD } from '../db.js';

// Funcion que obtiene todos los proyectos del usuario
export async function obtenerProyectos(user_id) {
  const [rows] = await conexionBD.query(
    'SELECT * FROM projects WHERE user_id=?',
    [user_id]
  );
  return rows;
}

// Funcion que crea un proyecto
export async function crearProyecto(data, user_id) {
  await conexionBD.query(
    'INSERT INTO projects (title,description,repo_url,live_url,user_id) VALUES (?,?,?,?,?)',
    [data.title, data.description, data.repo_url, data.live_url, user_id]
  );
}

// Funcion que elimina un proyecto de un usuario
export async function borrarProyecto(id, user_id) {
  await conexionBD.query(
    'DELETE FROM projects WHERE id=? AND user_id=?',
    [id, user_id]
  );
}