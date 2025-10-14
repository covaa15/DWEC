//Mostrar Div
document.querySelectorAll('#modal').forEach(boton => {
    boton.addEventListener('click', function (event) {
        boton.nextElementSibling.classList.remove('oculto');
        boton.nextElementSibling.classList.add('bloque');
    })
})

//Ocultar Div
document.querySelectorAll('#cerrar').forEach(boton => {
    boton.addEventListener('click', function (event) {
        boton.parentElement.classList.remove('bloque');
        boton.parentElement.classList.add('oculto');
    })
})


