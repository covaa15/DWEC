import { conexionBD } from '../db.js';

//Obtengo todas las series
export async function obtenerTodasSeries() {
    const[filas]=await conexionBD.query('Select * from series');
    return filas 
}

// Obtengo las series de un usuario
export async function obtenerSeriesUsuario(id) {
  const [filas] = await conexionBD.query(`SELECT s.*, us.rating,u.*
    FROM series s
    INNER JOIN user_series us ON series.id = us.series_id 
    INNER JOIN users u  ON us.user.id = u.id
    WHERE s.id=?`,
    [id]
);
  return filas;
}

//Funcion que inserta las series
export async function crearSeries(datos) {

  await conexionBD.query(`
    INSERT INTO series
    ( tvmaze_id, title,release_year,platform,image_url,api_score)
    VALUES ( ?, ?,?, ?, ?, ?)
  `, [datos.tvmaze_id,datos.title,datos.release_year,datos.platform,datos.image_url,datos.api_score]);
}

//Obtener todas las id
export async function obtenerIDS() {

    const [filas] = await conexionBD.query('Select tvmaze_id from series');

    return filas.map(fila=>{
            fila.tvmaze_id;
    });

}