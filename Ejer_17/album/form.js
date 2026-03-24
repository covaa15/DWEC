export function render(album, artistas) {

  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="/style.css">
  </head>
  
  <body>
  
  <nav class="menu">
    <a href="/">Inicio</a>
    <a href="/album">Albumes</a>
    <a href="/artista">Artistas</a>
  </nav>
  
  <h1>Formulario Album</h1>
  
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
  ${artistas.map(a => `
  <option value="${a.id}" ${a.id == album.artistaId ? 'selected' : ''}>
  ${a.nombre}
  </option>
  `).join("")}
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
  