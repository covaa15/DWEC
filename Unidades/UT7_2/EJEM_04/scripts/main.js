'use strict';
// se puede enviar directamtne un formulario con el objeto FormData
function init() {
  // crear el objeto FormData y añadirle datos
  const formData = new FormData();
  formData.append('username', 'john.doe');
  formData.append('email', 'john.doe@javascripthandbuch.de');
  formData.append('url', 'javascripthandbuch.de');
  formData.append('age', 44);

  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
  if (request.readyState === 4) { // 4 = DONE
    console.log('✅ Código de estado:', request.status);
    console.log('📩 Respuesta del servidor:', request.responseText);
  }
};
  request.open('POST', 'https://cors-anywhere.herokuapp.com/https://webhook.site/54dcb485-c13e-4453-ba60-fe43e54d7a8e', true);
  request.send(formData);
}
document.addEventListener('DOMContentLoaded', init);
