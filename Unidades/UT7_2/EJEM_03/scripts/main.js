'use strict';
function init() {
  const newArtist = {
    "name": "Deltron 3030",
    "albums": [
      {
        "title": "Deltron 3030",
        "year": 2000
      },
      {
        "title": "Event 2",
        "year": 2013
      }
    ]
  }
  const request = new XMLHttpRequest();
  request.onload = () => {
    if(request.status === 200) {
      console.log('Data successfully sent.');      
      console.log('📩 Respuesta del servidor:', request.responseText);
    }
  };
  // el método POST se usa para enviar datos al servidor
  // request.open('POST', 'artists/create');

  // para probar coger URL en https://webhook.site/
  // CORS Anywhere es un proxy que añade los encabezados CORS necesarios
    request.open('POST', 'https://webhook.site/54dcb485-c13e-4453-ba60-fe43e54d7a8e');
  // solicitalo en https://cors-anywhere.herokuapp.com/
  // de esta forma evitamos el error CORS
  //y añadimos el prefijo al URL original como abajo
  // request.open('POST', 'https://cors-anywhere.herokuapp.com/https://webhook.site/54dcb485-c13e-4453-ba60-fe43e54d7a8e');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(newArtist));
}
document.addEventListener('DOMContentLoaded', init);
