/*
25. Para mejorar la legibilidad, se ha decidido agrupar visualmente
 los cursos por temática. Tu objetivo es encontrar todas las tarjetas 
 de cursos que pertenezcan a la categoría ‘Desarrollo Web’. 
 Una vez identificadas, debes aplicarles un ligero fondo de color (#f0f0f0) 
 para que se distingan del resto.
*/

document.querySelectorAll('.card .categoria').forEach((curso)=>{
  
    if(curso.textContent==="Desarrollo Web")
        curso.parentNode.parentElement.classList.add('categoriasWeb');
})
//.desarrolloWeb

//document.querySelector('#footer-principal').previousElementSibling.className='contenedorPrincipal';

