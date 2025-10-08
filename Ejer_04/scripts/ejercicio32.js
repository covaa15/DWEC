/*32. Se necesita una clase específica para las imágenes
de los cursos. Recorre todas las tarjetas y, para cada una, 
encuentra su imagen y aplícale la clase ‘imagen-curso’. */

document.querySelectorAll('.card img').forEach((imagen) => {
    imagen.classList.add('imagen-curso');
})