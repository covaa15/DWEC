export function vistaListado(libros) {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>

  <h1>Catálogo de libros</h1>

  <a href="/prestados">Libros prestados</a>
  <a href="/vencidos">Libros vencidos</a>

  <table>
    <tr>
      <th>Título</th>
      <th>Autor</th>
      <th>Estado</th>
    </tr>

    ${libros.map(libro => `
      <tr>
        <td>
          <a href="/libro/${libro.id}">
            ${libro.titulo}
          </a>
        </td>
        <td>${libro.autor}</td>
        <td>${libro.estado}</td>
      </tr>
    `).join('')}
  </table>

  </body>
  </html>
  `;
}

// Vista libros prestados
export function vistaPrestados(libros) {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>

  <nav class="menu">
    <a href="/libros">Inicio</a>
    <a href="/prestados">Prestados</a>
    <a href="/vencidos">Vencidos</a>
  </nav>

  <h1>Libros prestados</h1>

  <table>
    <thead>
      <tr>
        <th>Título</th>
        <th>Autor</th>
        <th>Usuario</th>
        <th>Fecha devolución</th>
      </tr>
    </thead>

    <tbody>
      ${libros.map(libro => `
        <tr>
          <td>${libro.titulo}</td>
          <td>${libro.autor}</td>
          <td>
            <a href="/prestamo/usuario?nombre=${libro.nombre_prestario}">
              ${libro.nombre_prestario}
            </a>
          </td>
          <td>${new Date(libro.fecha_devolucion).toLocaleDateString()}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  </body>
  </html>
  `;
}


// Vista detalle libro
export function vistaDetalle(libro, historial) {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>

  <nav class="menu">
    <a href="/libros">Inicio</a>
    <a href="/prestados">Prestados</a>
    <a href="/vencidos">Vencidos</a>
  </nav>

  <h1>${libro.titulo}</h1>

  <p>Autor: ${libro.autor}</p>
  <p>ISBN: ${libro.isbn}</p>

  ${
    libro.estado === 'Disponible'
      ? `<a href="/prestamo/formulario/${libro.id}">Prestar libro</a>`
      : `<a href="/prestamo/devolver/${libro.id}">Registrar devolución</a>`
  }

  <h2>Historial de préstamos</h2>

  <ul>
    ${historial.map(p => `
      <li>
        ${p.nombre_prestario} -
        ${new Date(p.fecha_prestamo).toLocaleDateString()} →
        ${new Date(p.fecha_devolucion).toLocaleDateString()}
      </li>
    `).join('')}
  </ul>

  </body>
  </html>
  `;
}

