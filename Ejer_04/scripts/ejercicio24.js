/*
24.Para estandarizar los títulos de los cursos, recorre todos los h2 
que están dentro de las tarjetas y añade el prefijo “[CURSO]” al principio de su texto.
*/

document.querySelectorAll('.card h2').forEach((curso) => {
    curso.textContent = `[CURSO] ${curso.textContent}`;
})
