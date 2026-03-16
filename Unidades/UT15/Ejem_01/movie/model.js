import mysql from 'mysql2/promise';
 
const connection = await mysql.createConnection({
  host: 'mysql01.cr30ufvbips8.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'alumno2026',
  database: 'movie-db',
});
 
await connection.connect();
 
export async function getAll() {
  const query = 'SELECT * FROM Movies';
const [data] = await connection.query(query);
return data;
}



export async function get(id) {
const query = 'SELECT * from Movies WHERE id = ?';
const [data] = await connection.query(query, [id]);
return data.pop();
}

export async function remove(id) {
const query = 'DELETE FROM Movies WHERE id = ?';
await connection.query(query, [id]);
return;
}


async function insert(movie) {
const query = 'INSERT INTO Movies (title, year) VALUES (?, ?)';
const [result] = await connection.query(query, [movie.title, movie.year]);
return { ...movie, id: result.insertId };
}

async function update(movie) {
const query = 'UPDATE Movies SET title = ?, year = ? WHERE id = ?';
await connection.query(query, [movie.title, movie.year, movie.id]);
return movie;
}

export function save(movie) {
    if (!movie.id) {
        return insert(movie);
    } else {
  return update(movie);
}
}

