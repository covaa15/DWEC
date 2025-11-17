'use strict';
function init() {
  // convirtiendo el formulario en un objeto FormData
  const form = document.getElementById('register');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const request = new XMLHttpRequest();
    request.open('POST', 'https://cors-anywhere.herokuapp.com/https://webhook.site/54dcb485-c13e-4453-ba60-fe43e54d7a8e', true);
    request.send(formData);
  });
}
document.addEventListener('DOMContentLoaded', init);
