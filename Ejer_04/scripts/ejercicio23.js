/*23. Hay información oculta en la tarjeta del curso de React. 
Implementa una funcionalidad para que, al hacer clic en el 
título de ESE curso, el párrafo oculto se vuelva visible.*/

const tarjeta = document.querySelector('#lista-cursos').lastElementChild;
const estado = document.querySelector('.oculto');

tarjeta.querySelector('.info h2').addEventListener('click', function () {

    estado.classList.toggle("oculto")

})