import { conexionBD } from '../db.js';

//Busco un usuario por email
export async function obtenerUsuarioEmail(email) {
    const [filas] = await conexionBD.query("Select * from users where email=?",
        [email]
    );
    return filas[0];
}

//Insertar usuario
export async function insertarUsuario(usuario) {
 
    await conexionBD.query(`
        INSERT INTO users
        ( username,email)
        VALUES ( ?, ?)
      `, [usuario.username,usuario.email]);
}
