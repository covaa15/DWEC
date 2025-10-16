let lista = document.querySelector('ul');
actualizarBotones();
document.querySelectorAll('li button').forEach((boton) => {

    boton.addEventListener('click', function () {

        if (boton.classList.contains('subir')) {
            //Me situo en el li anterior
            let anteriorLi = boton.parentNode.previousElementSibling;
            //Me situo en le li actual
            let padreBoton = boton.parentNode;

            lista.insertBefore(padreBoton, anteriorLi);

        } else {

            //Me situo en el li posterior
            let siguienteLi = boton.parentNode.nextElementSibling;

            //Me situo en el li actual
            let padreBoton = boton.parentNode;

            lista.insertBefore(siguienteLi, padreBoton);
        }
        actualizarBotones();
    })
})

// Función para actualizar el estado de los botones 
function actualizarBotones() {
    let itemsLista = lista.querySelectorAll('li');
    itemsLista.forEach((li, posicion) => {
        let botonSubir = li.querySelector('.subir');
        let botonBajar = li.querySelector('.bajar');

        // Deshabilito el boton subir si es el primer elemento
        if (botonSubir) {
            botonSubir.disabled = (posicion === 0);
        }

        // Desgabilito el boton bajar si es el último elemento
        if (botonBajar) {
            botonBajar.disabled = (posicion === itemsLista.length - 1);
        }
    });
}
//.disabled = false;