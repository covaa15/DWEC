/*31. Hay una oferta especial para el curso de React. 
Localiza su tarjeta y, buscando solo dentro de ella, 
encuentra el párrafo oculto para añadirle el texto ’ 
(¡Oferta especial!)’ al final. */

const curso = document.querySelector('#lista-cursos').lastElementChild;
curso.querySelector('.oculto').textContent = "¡Oferta especial!";