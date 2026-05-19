import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargo las variables del .env
dotenv.config();

// Creo el pool de conexiones a AWS RDS
export const conexionBD = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});






// export const conexionBD = mysql.createPool({
//   host: 'dbejerciciosia.cnc6ds24hpyr.us-east-1.rds.amazonaws.com',
//   user: 'ejerciciosIA',
//   password: '12345678',
//   database: 'portfolio'
// });