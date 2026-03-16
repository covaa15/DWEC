export function render(albumes) {

    return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Lista de álbumes</title>
  <link rel="stylesheet" href="/style.css">
  </head>
  
  <body>
  
  <h1>Lista de Álbumes</h1>
  
  <table>
  
  <thead>
  <tr>
  <th>Foto</th>
  <th>Título</th>
  <th>Artista</th>
  <th>Año</th>
  <th></th>
  <th></th>
  </tr>
  </thead>
  
  <tbody>
  
  ${albumes
    .map(
      (album) => `
  <tr>
  
  <td>
  <img src="${album.foto}" width="60">
  </td>
  
  <td>${album.titulo}</td>
  
  <td>${album.artistaNombre}</td>
  
  <td>${album.anio}</td>
  
  <td>
  <a href="/album/delete/${album.id}">eliminar</a>
  </td>
  
  <td>
  <a href="/album/form/${album.id}">editar</a>
  </td>
  
  </tr>
  `
    )
    .join('')}
  
  </tbody>
  
  </table>
  
  <a href="/album/form">nuevo álbum</a>
  
  </body>
  </html>
  `;
  }
  