import { conexionBD } from '../db.js';

// FUncion que obtien los links de un usuario
export async function obtenerLinks(user_id) {
  const [rows] = await conexionBD.query(
    'SELECT * FROM social_links WHERE user_id=?',
    [user_id]
  );
  return rows;
}

// Funcion que crea un link a un usuario
export async function crearLink(data, user_id) {
  await conexionBD.query(
    'INSERT INTO social_links (platform,url,user_id) VALUES (?,?,?)',
    [data.platform, data.url, user_id]
  );
}

// Funcion que borra un link de un usuario 
export async function borrarLink(id, user_id) {
  await conexionBD.query(
    'DELETE FROM social_links WHERE id=? AND user_id=?',
    [id, user_id]
  );
}