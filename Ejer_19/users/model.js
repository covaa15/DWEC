import { conexionBD } from '../db.js';

// Crear usuario
export async function crearUsuario(datos) {

  await conexionBD.query(`
    INSERT INTO users (username, password, bio, email, photo) VALUES (?, MD5(?), ?, ?, ?)
  `, [datos.username,datos.password,datos.bio,datos.email,datos.photo]);
}

// Login
export async function login(username, password) {

  const [filas] = await conexionBD.query(`
    SELECT * FROM users WHERE username=? AND password=MD5(?)
  `, [username, password]);

  return filas[0];
}

// Obtener usuario por username
export async function obtenerUsuario(username) {

  const [filas] = await conexionBD.query(`
    SELECT * FROM users WHERE username=?
  `, [username]);

  return filas[0];
}

// Obtener usuario por id
export async function obtenerUsuarioPorId(id) {

  const [filas] = await conexionBD.query(`
    SELECT * FROM users WHERE id=?
  `, [id]);

  return filas[0];
}

// Actualizar perfil
export async function actualizarPerfil(id, bio, email) {

  await conexionBD.query(`
    UPDATE users SET bio=?, email=? WHERE id=? `, [bio, email, id]);
}

export async function obtenerTodosLosUsuarios() {
  const [filas] = await conexionBD.query('SELECT username FROM users');
  return filas;
}