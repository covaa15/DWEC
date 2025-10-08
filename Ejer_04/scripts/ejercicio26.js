/*
Es necesario añadir la duración a todos los cursos.
 Para cada tarjeta, debes crear dinámicamente un nuevo párrafo, 
 asignarle la clase ‘duracion’ y el texto ‘Duración: 20 horas’, 
 y añadirlo al final de la sección de información.
*/
document.querySelectorAll('.card').forEach((curso) => {

    let parrafoDuracion = document.createElement('p');
    parrafoDuracion.className = 'duracion';
    parrafoDuracion.textContent = 'Duración: 20 horas';
    curso.querySelector(".info").appendChild(parrafoDuracion);

})