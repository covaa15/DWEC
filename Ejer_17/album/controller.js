//Ejemplo 11

import { getAll, remove, get, save } from './model.js';
import { getAll as getArtistas } from '../artista/model.js';
import { render } from './view.js';
import { render as form } from './form.js';

// muestra la lista de albumes
export async function listaAction(request, response) {

  const albumes = await getAll();
  const artistas = await getArtistas();

  // Obtenemos el artista de cada album
  const datos = albumes.map((album) => {

    const artista = artistas.find((artista) => artista.id === album.artistaId);

    return {
      ...album,
      artistaNombre: artista ? artista.nombre : 'desconocido',
    };

  });

  const body = render(datos);

  response.send(body);
}

// Funcion que elimiina un album
export async function eliminarAction(request, response) {

  const id = parseInt(request.params.id, 10);

  await remove(id);

  response.redirect(request.baseUrl);
}

// Funcion que muestra el formulario
export async function formAction(request, response) {

  const artistas = await getArtistas();

  let album = {
    id: '',
    titulo: '',
    anio: '',
    artistaId: '',
    foto: '',
  };

  if (request.params.id) {

    album = await get(parseInt(request.params.id, 10));

  }

  const body = form(album, artistas);

  response.send(body);
}

// Guardo los datos del formulario
export async function guardarAction(request, response) {

  const album = {
    id: request.body.id,
    titulo: request.body.titulo,
    anio: request.body.anio,
    artistaId: parseInt(request.body.artistaId),
    foto: request.body.foto,
  };

  await save(album);

  response.redirect(request.baseUrl);
}
