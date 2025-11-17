'use strict';
function init() {
  const request = new XMLHttpRequest();
  // salta este evento al acabar de cargar
  request.onload = () => {
    let result;
    // si la respuesta ya es json
    if (request.responseType === 'json') {
      result = request.response;
      // si no, hay que parsearlo
    } else {
      result = JSON.parse(request.responseText);
    }


    const table = initTable();
    const artists = result.artists;
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i];
      const albums = artist.albums;
      for (let j = 0; j < albums.length; j++) {
        const album = albums[j];
        const row = createRow(
          artist.name,
          album.title,
          album.year
        );
        table.tBodies[0].appendChild(row);
      }
    }
    document.getElementById('artists-container').appendChild(table);
  };
  // el true es que la petición sea asíncrona
  // no espera por la respuesta, sigue ejecutando el código
  request.open('GET', 'artists.json', true);
  request.responseType = 'json';
  request.send();
}

function initTable() {
  const table = document.createElement('table');
  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headerColumnArtistName = document.createElement('th');
  const headerColumnAlbumTitle = document.createElement('th');
  const headerColumnAlbumYear = document.createElement('th');
  const tableBody = document.createElement('tbody');
  headerColumnArtistName.appendChild(document.createTextNode('Nombre'));
  headerColumnAlbumTitle.appendChild(document.createTextNode('Título'));
  headerColumnAlbumYear.appendChild(document.createTextNode('Año'));
  headerRow.appendChild(headerColumnArtistName);
  headerRow.appendChild(headerColumnAlbumTitle);
  headerRow.appendChild(headerColumnAlbumYear);
  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  table.className = 'table table-striped';
  return table;
}

function createRow(artistName, albumTitle, albumYear) {
  const row = document.createElement('tr');
  const columnName = document.createElement('td');
  const columnTitle = document.createElement('td');
  const columnYear = document.createElement('td');
  columnName.appendChild(document.createTextNode(artistName));
  columnTitle.appendChild(document.createTextNode(albumTitle));
  columnYear.appendChild(document.createTextNode(albumYear));
  row.appendChild(columnName);
  row.appendChild(columnTitle);
  row.appendChild(columnYear);
  return row;
}
document.addEventListener('DOMContentLoaded', init);
