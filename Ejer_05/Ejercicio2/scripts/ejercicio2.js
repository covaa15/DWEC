document.querySelectorAll('h2').forEach((pregunta) => {
    pregunta.addEventListener('click', function () { revelarRespuesta(pregunta) })
});

/* 1. Escribe una función revelarRespuesta que reciba 
como parámetro un elemento <h2> (la pregunta).
   2. Dentro de la función, debes navegar desde ese 
   <h2> hasta su elemento hermano siguiente (el <p>)
    y quitarle la clase oculto.*/

function revelarRespuesta(pregunta) {
    const respuesta = pregunta.nextElementSibling;

    if (!respuesta.classList.contains('oculto')) {
        respuesta.classList.add('oculto');
    }
    else {
        ocultarTodasLasRespuestas();
        respuesta.classList.remove('oculto');
    }
}

/* 3. Escribe una segunda función ocultarTodasLasRespuestas. 
Esta función debe seleccionar todos los párrafos de respuesta y
 asegurarse de que todos tengan la clase oculto. Llama a esta función 
 dentro de revelarRespuesta antes de mostrar la nueva respuesta, para 
 asegurar que solo una esté visible a la vez.*/
function ocultarTodasLasRespuestas() {
    document.querySelectorAll('p').forEach((respuesta) => {
        respuesta.classList.add('oculto');
    })
}