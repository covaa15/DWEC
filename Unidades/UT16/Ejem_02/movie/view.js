export function render(movies) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Movie list</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <table>
    <thead><tr><th>Id</th><th>Title</th><th>Year</th><th>Valoración</th><th></th><th></th></tr></thead>
    <tbody>
      ${movies
        .map(
          (movie) => `
        <tr>
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>${movie.year}</td>
          <td>
              <a href="/movie/rate/${movie.id}/1">⭐</a>
              <a href="/movie/rate/${movie.id}/2">⭐</a>
              <a href="/movie/rate/${movie.id}/3">⭐</a>
              <a href="/movie/rate/${movie.id}/4">⭐</a>
              <a href="/movie/rate/${movie.id}/5">⭐</a>
              <span>
                (${
                  isNaN(
                    Math.round((movie.sumOfRatings / movie.numOfRatings) * 10) / 10
                  )
                    ? 0
                    : Math.round((movie.sumOfRatings / movie.numOfRatings) * 10) / 10
                })
              </span>
          </td>
          <td><a href="/movie/delete/${movie.id}">delete</a></td>
          <td><a href="/movie/form/${movie.id}">edit</a></td> 
        </tr>`
        )
        .join('')}
    </tbody>
  </table>
  <a href="/movie/form">new</a>
  <br/>
  <a href="/logout">Cerrar sesión</a>
</body>
</html>
  `;
}
