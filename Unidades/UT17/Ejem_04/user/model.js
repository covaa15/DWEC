import mysql from 'mysql2/promise';
 
const connection = await mysql.createConnection({
  host: 'mysql01.cr30ufvbips8.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'alumno2026',
  database: 'movie-db',
});
 
// await connection.connect();
 
// Función asíncrona que obtiene usuarios de la BD
// Recibe un objeto 'query' con filtros (por defecto vacío)
export async function get(query = {}) {
  try {
    const queryElements = [];
    const values = [];

    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue;
      queryElements.push(`${key} = ?`);
      values.push(value);
    }
    const where =
      queryElements.length > 0
        ? `WHERE ${queryElements.join(' AND ')}`
        : '';
    const queryString = `SELECT * FROM Users ${where}`;
    const [results] = await connection.query(queryString, values);
    console.log('Results:', results);
    return results;
    } 
 catch (error) {
       throw error;
  }
}
