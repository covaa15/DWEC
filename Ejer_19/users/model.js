import { conexionBD } from '../db.js';
import crypto from 'crypto';

// FUncion para crear un usuario nuevo
export async function crearUsuario(username, password, email, photo) {

  // Encripto la contraseña
  const pass = crypto.createHash('md5').update(password).digest('hex');

  await conexionBD.query(
    'INSERT INTO users (username,password,email,photo) VALUES (?,?,?,?)',
    [username, pass, email, photo]
  );
}

// Funcion que obtiene un usuario por username
export async function obtenerUsuario(username) {
  const [rows] = await conexionBD.query(
    'SELECT * FROM users WHERE username=?',
    [username]
  );
  return rows[0];
}

// Funcion que actualiza el perfil 
export async function actualizarPerfil(id, bio, email, photo) {
  await conexionBD.query(
    'UPDATE users SET bio=?, email=?, photo=? WHERE id=?',
    [bio, email, photo, id]
  );
}