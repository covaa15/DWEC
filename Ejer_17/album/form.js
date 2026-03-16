export function render(album, artistas) {

    return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Formulario álbum</title>
  <link rel="stylesheet" href="/style.css">
  </head>
  
  <body>
  
  <h1>Formulario Álbum</h1>
  
  <form action="/album/save" method="post">
  
  <input type="hidden" name="id" value="${album.id}">
  
  <div>
  <label>Título:</label>
  <input type="text" name="titulo" value="${album.titulo}">
  </div>
  
  <div>
  <label>Año:</label>
  <input type="text" name="anio" value="${album.anio}">
  </div>
  
  <div>
  <label>Artista:</label>
  
  <select name="artistaId">
  
  ${artistas
    .map(
      (artista) => `
  <option value="${artista.id}" ${
        artista.id === album.artistaId ? 'selected' : ''
      }>
  ${artista.nombre}
  </option>
  `
    )
    .join('')}
  
  </select>
  
  </div>
  
  <div>
  <label>URL Foto:</label>
  <input type="text" name="foto" value="${album.foto}">
  </div>
  
  <button type="submit">guardar</button>
  
  </form>
  
  </body>
  </html>
  `;
  }
  