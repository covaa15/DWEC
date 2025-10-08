/*20.Localiza el segundo enlace del menú. Tu objetivo es, 
 partiendo de él, llegar hasta el título <h1> principal 
de la cabecera y cambiar su color a naranja.*/

document.querySelector('.navegacion').children[2].parentNode.parentElement.firstElementChild.classList.add('titulo-principal');
//document.querySelector('.navegacion').children[2].parentNode.parentElement.firstElementChild.style.color = 'orange';