// A los atributos de una etiqueta podemos acceder mediante 
// el método getAttribute

function init() {
  const element = document.getElementById('home');
  //modificamos los atributos iniciales del enlace
  // ver el html original
  element.setAttribute('class', 'link active');
  element.setAttribute('href', 'newlink.html');
  element.setAttribute('target', '_blank');
  console.log(element.getAttribute('class'));   // link active
  console.log(element.getAttribute('href'));    // newlink.html
  console.log(element.getAttribute('target'));  // _blank

  element.className = 'link active highlighted';
  element.href = 'anotherLink.html';
  element.target = '_self';
  console.log(element.getAttribute('class'));   // link active highlighted
  console.log(element.getAttribute('href'));    // anotherLink.html
  console.log(element.getAttribute('target'));  // _self
}

document.addEventListener('DOMContentLoaded', init);
