document.querySelector('button').addEventListener('click', function () {

    //Quito el oculto al encabezado de la tabla al añadir una persona
    document.querySelector('thead').classList.remove('oculto');
    anadirPersona();

})

//Metodo para añadir una persona a la tabla
function anadirPersona() {

    //Creo la fila 
    const tbody = document.querySelector('tbody');
    const fila = document.createElement('tr');

    //Creo las celdas de la fila
    let celda = document.createElement('td');
    celda.textContent = document.querySelector('#nombre').value;

    let celda1 = document.createElement('td');
    celda1.textContent = document.querySelector('#apellidos').value;

    //Añado las celdas a la fila
    fila.appendChild(celda);
    fila.appendChild(celda1);

    //Añado la fila al cuerpo de la tabla
    tbody.appendChild(fila);
}

//Vacia los inputs cuando recarfo  la pagina
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#nombre').value = '';
    document.querySelector('#apellidos').value = '';
})




