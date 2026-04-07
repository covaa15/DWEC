export function render(artistas) {

    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Lista de artistas</title>
    <link rel="stylesheet" href="/style.css">
    </head>
    
    <body>
        <nav class="menu">
      <a href="/">Inicio</a>
      <a href="/album">Álbumes</a>
      <a href="/artista">Artistas</a>
    </nav>
    <h1>Lista de Artistas</h1>
    
    <a href="/artista/form">nuevo artista</a>
    
    <table>
    
    <thead>
    <tr>
    <th>Foto</th>
    <th>Nombre</th>
    <th>Pais</th>
    <th></th>
    <th></th>
    </tr>
    </thead>
    
    <tbody>
    
    ${artistas.map(artista => `
    
    <tr>
    
    <td>
    <img src="${artista.foto}" width="60">
    </td>
    
    <td>
    <a href="/artista/detalle/${artista.id}">
    ${artista.nombre}
    </a>
    </td>
    
    <td>${artista.pais}</td>
    
    <td>
    <a href="/artista/delete/${artista.id}">eliminar</a>
    </td>
    
    <td>
    <a href="/artista/form/${artista.id}">editar</a>
    </td>
    
    </tr>
    
    `).join("")}
    
    </tbody>
    
    </table>
    
    </body>
    </html>
    `;
}
