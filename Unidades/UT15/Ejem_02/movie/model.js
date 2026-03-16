import { Sequelize } from 'sequelize';
 
const sequelize = new Sequelize(
 'movie-db',
 'admin',
 'alumno2026',
  //  process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASS,
  {
    host: 'mysql01.cr30ufvbips8.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    logging: false, // Disable SQL logging
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// max	límite de conexiones
// min	conexiones siempre vivas
// acquire	timeout para obtener conexión
// idle	cierre por inactividad

// comprobando la conexion
sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

const Movies = sequelize.define(
  'Movies',
  {
    title: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamps: false },
);
 
export function getAll() {
return Movies.findAll();
}
export function get(id) {
return Movies.findByPk(id);
}
export function remove(id) {
return Movies.destroy({ where: { id } });
}
export function save(movie) {
return Movies.upsert(movie);
} 