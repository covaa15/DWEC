import mysql from 'mysql2/promise';

// ============================
// CONEXIÓN A LA BD
// ============================

const connection = await mysql.createConnection({
  host: 'mysql01.cr30ufvbips8.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'alumno2026',
  database: 'movie-db',
});


// ============================
// VALIDACIÓN SIMPLE
// ============================

function validateParams(params) {
  for (const [name, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      throw new Error(`${name} no puede ser undefined o null`);
    }
  }
}


// ============================
// OBTENER TODAS LAS PELÍCULAS
// ============================

export async function getAll(options) {
let query = `
  SELECT * FROM Movies WHERE user = ? OR public = 1
`;
if (options.sort &&
      ['asc', 'desc'].includes(options.sort.toLowerCase())) {
      query += ' ORDER BY title ' + options.sort;
}
  try {
    const [results] = await connection.execute(query, [options.userId]);
    // console.log('Results:', results);
    return results;

  } catch (error) {
    console.log(error);
    throw error;
  }
}


// ============================
// INSERTAR PELÍCULA
// ============================

export async function insert(movie, userId) {

  validateParams({
    userId,
    'movie.title': movie.title,
    'movie.year': movie.year,
    'movie.public': movie.public,
  });

  const query =
    'INSERT INTO Movies (title, year, public, user) VALUES (?, ?, ?, ?)';

  const [result] = await connection.execute(query, [
    movie.title,
    movie.year,
    movie.public,
    userId,
  ]);

  return { ...movie, id: result.insertId };
}


// ============================
// ACTUALIZAR PELÍCULA
// ============================

export async function update(movie, userId) {

  validateParams({
    userId,
    'movie.id': movie.id,
    'movie.title': movie.title,
    'movie.year': movie.year,
    'movie.public': movie.public,
  });

  const query =
    'UPDATE Movies SET title = ?, year = ?, public = ?, user = ? WHERE id = ?';

  await connection.execute(query, [
    movie.title,
    movie.year,
    movie.public,
    userId,
    movie.id,
  ]);

  return movie;
}


// ============================
// OBTENER UNA PELÍCULA
// ============================

export async function get(id, userId) {
  console.log('get called with id:', id, 'userId:', userId);
  validateParams({ id, userId });

  const query =
    'SELECT * FROM Movies WHERE id = ? AND (user = ? OR public = 1)';

  const [results] = await connection.execute(query, [id, userId]);

  return results[0] || null;
}


// ============================
// GUARDAR (INSERT / UPDATE)
// ============================

export async function save(movie, userId) {

  if (!movie.id) {
    return insert(movie, userId);
  }

  return update(movie, userId);
}


// ============================
// ELIMINAR PELÍCULA
// ============================

export async function remove(id, userId) {

  validateParams({
    id,
    userId,
  });

  const query =
    'DELETE FROM Movies WHERE id = ? AND (user = ? OR public = 1)';

  await connection.execute(query, [id, userId]);

  return { success: true };
}


// ============================
// VALORAR PELÍCULA
// ============================

export async function rate(rating) {

  validateParams({
    'rating.movie': rating.movie,
    'rating.user': rating.user,
    'rating.rating': rating.rating,
  });


  // Borrar voto anterior
  const deleteQuery = `
    DELETE FROM Ratings
    WHERE movie = ? AND user = ?;
  `;

  await connection.execute(deleteQuery, [
    rating.movie,
    rating.user,
  ]);


  // Insertar nuevo voto
  const insertQuery = `
    INSERT INTO Ratings (movie, user, rating)
    VALUES (?, ?, ?);
  `;

  return connection.execute(insertQuery, [
    rating.movie,
    rating.user,
    rating.rating,
  ]);
}
