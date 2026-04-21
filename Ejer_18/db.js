// Configuro la conexión a MySQL 
import mysql from 'mysql2/promise';

//Creo el pool de conexiones para la BD
export const conexionBD = mysql.createPool({
  host: 'dbdwec.cmh938mbbyin.us-east-1.rds.amazonaws.com',
  user: 'dwec',
  password: 'rex-pirata2',
  database: 'dwec'
});
