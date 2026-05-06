import mysql from 'mysql2/promise';

// Conexión a la BD
const connection = await mysql.createConnection({
  host: 'mysql01.cr30ufvbips8.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'alumno2026',
  database: 'movie-db',
});

// Función para validar parámetros
function validateParam(param, name) {
  if (param === undefined || param === null) {
    throw new Error(`${name} no puede ser undefined o null`);
  }
}

export async function getAll(userId) {
  // Devuelve una Promesa para poder usar async/await
  const query = `
    SELECT 
      /* ===== DATOS DE LA PELÍCULA ===== */
      Movies.id,        -- ID de la película
      Movies.title,     -- Título
      Movies.year,      -- Año
      Movies.user,      -- Usuario creador
      Movies.public,    -- Si es pública o no
      /* ===== DATOS DE VALORACIONES ===== */
      COUNT(Ratings.rating) AS numOfRatings,
      -- Cuenta cuántas valoraciones tiene la película
      SUM(Ratings.rating) AS sumOfRatings,
      -- Suma todas las valoraciones
      MAX(r.rating) AS userRating
      -- Nota del usuario actual (si votó)
      -- MAX evita duplicados
    FROM Movies
    /* ===== TODAS LAS VALORACIONES ===== */
    LEFT JOIN Ratings 
      ON Movies.id = Ratings.movie
      -- Une cada película con TODAS sus valoraciones
    /* ===== VALORACIÓN DEL USUARIO ACTUAL ===== */
    LEFT JOIN Ratings AS r 
      ON Movies.id = r.movie 
      AND r.user = ?
      -- Une solo la valoración del usuario actual
    /* ===== FILTRO ===== */
    WHERE Movies.user = ? 
       OR Movies.public = 1
      -- Muestra:
      -- - Películas del usuario
      -- - O películas públicas
    /* ===== AGRUPACIÓN ===== */
    GROUP BY 
      Movies.id,
      Movies.title,
      Movies.year,
      Movies.user,
      Movies.public;
      -- Obligatorio en MySQL para usar SUM y COUNT

  `;
  try {
    const [results] = await connection.execute(query, [userId, userId]);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// Insertar una película
export async function insert(movie, userId) {
  validateParam(userId, 'userId');
  validateParam(movie.title, 'movie.title');
  validateParam(movie.year, 'movie.year');
  validateParam(movie.public, 'movie.public');

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

// Actualizar una película existente
export async function update(movie, userId) {
  validateParam(userId, 'userId');
  validateParam(movie.id, 'movie.id');
  validateParam(movie.title, 'movie.title');
  validateParam(movie.year, 'movie.year');
  validateParam(movie.public, 'movie.public');

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

// Obtener una película concreta
export async function get(id, userId) {
  validateParam(id, 'id');
  validateParam(userId, 'userId');

  const query =
    'SELECT * FROM Movies WHERE id = ? AND (user = ? OR public = 1)';
  const [results] = await connection.execute(query, [id, userId]);
  return results[0] || null; // devuelve null si no hay resultado
}

// Guardar (insertar o actualizar)
export async function save(movie, userId) {
  if (!movie.id) {
    return insert(movie, userId);
  } else {
    return update(movie, userId);
  }
}

// Eliminar una película
export async function remove(id, userId) {
  validateParam(id, 'id');
  validateParam(userId, 'userId');

  const query = 'DELETE FROM Movies WHERE id = ? AND (user = ? OR public = 1)';
  await connection.execute(query, [id, userId]);
  return { success: true };
}
export async function rate(rating) {
  // Primero eliminamos cualquier voto previo
  // del mismo usuario en la misma película
  const deleteQuery = `
    DELETE FROM Ratings
    WHERE movie = ? AND user = ?;
  `;
  // Ejecutamos el DELETE
  await connection.execute(deleteQuery, [
    rating.movie,
    rating.user
  ]);
  // Insertamos la nueva valoración
  const insertQuery = `
    INSERT INTO Ratings (movie, user, rating)
    VALUES (?, ?, ?);
  `;
  // Ejecutamos el INSERT
  return connection.execute(insertQuery, [
    rating.movie,
    rating.user,
    rating.rating
  ]);
}
