import { getAll, remove, get, save } from './model.js';
import { render } from './view.js';
import { render as form } from './form.js';
import { getAll as getAlbumes } from '../album/model.js';

// Funcion que muestra la lista de artistas
export async function listaAction(request, response) {
  const artistas = await getAll();
  const body = render(artistas);
  response.send(body);
}

// Funcion que muestra el detalle de un artista con sus albumes
export async function detalleAction(request, response) {
  const id = parseInt(request.params.id, 10);
  const artista = await get(id);
  const albumes = await getAlbumes();
  const albumesArtista = albumes.filter((album) => album.artistaId === id);

  const body = `
  <html>
  <head>
  <link rel="stylesheet" href="/style.css">
  </head>
  <body>

  <nav class="menu">
    <a href="/">Inicio</a>
    <a href="/album">Álbumes</a>
    <a href="/artista">Artistas</a>
  </nav>

  <h1>${artista.nombre}</h1>

  <img src="${artista.foto || 'https://via.placeholder.com/150'}" width="150">

  <p>Pais: ${artista.pais}</p>
  <p>Genero: ${artista.genero}</p>
  <p>Año formación: ${artista.fecha_formacion}</p>

  <h2>Álbumes</h2>

  <ul>
    ${albumesArtista.map(album => `
      <li>
        <img src="${album.foto || 'https://via.placeholder.com/50'}" width="50">
        ${album.titulo} (${album.anio})
      </li>
    `).join("")}
  </ul>

  <a href="/artista">volver</a>

  </body>
  </html>
  `;

  response.send(body);
}

// Funcion para eliminar un artista
export async function eliminarAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id);
  response.redirect(request.baseUrl);
}

// Funcion que muestra el formulario
export async function formAction(request, response) {

  let artista = {
    id: '',
    nombre: '',
    pais: '',
    genero: '',
    fecha_formacion: '',
    foto: ''
  };

  // si hay id estamos editando
  if (request.params.id) {
    artista = await get(parseInt(request.params.id, 10));
  }

  const body = form(artista);
  response.send(body);
}

// Funcion que guarda un artista
export async function guardarAction(request, response) {

  const artista = {
    id: request.body.id,
    nombre: request.body.nombre,
    pais: request.body.pais,
    genero: request.body.genero,
    fecha_formacion: request.body.fecha_formacion,
    foto: request.body.foto
  };

  await save(artista);
  response.redirect(request.baseUrl);
}
