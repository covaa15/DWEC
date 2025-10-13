// 1. Crea un array de objetos.
const usuarios = [
    { nombre: 'Ana', edad: 25 },
    { nombre: 'Luis', edad: 30 },
    { nombre: 'Antonio', edad: 23 },
    { nombre: 'Alex', edad: 22 },
    { nombre: 'Eneas', edad: 18 }
];

// 2. Crea una función que reciba este array.
function crearTabla(usuarios) {

    // Creo la tabla y eñ fragmento
    const tabla = document.createElement('table');

    const fragment = document.createDocumentFragment();

    // Creo la tabla
    crearEncabezado(tabla, usuarios);
    crearFilas(tabla, usuarios);

    // Añado la tabla al fragmento y luego al div
    fragment.appendChild(tabla);
    document.getElementById('contenedor-tabla').appendChild(fragment);
}

//Creo los encabezados de la tabla
function crearEncabezado(tabla, usuarios) {
    const filaEncabezado = document.createElement('tr');
    const claves = Object.keys(usuarios[0]);

    claves.forEach(clave => {
        const celda = document.createElement('td');
        celda.className = 'encabezado';
        celda.textContent = clave.toUpperCase();
        filaEncabezado.appendChild(celda);
    });

    tabla.appendChild(filaEncabezado);
}
//Creo las filas de la tabla
function crearFilas(tabla, usuarios) {
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');

        Object.values(usuario).forEach(usuario => {
            const celda = document.createElement('td');
            celda.textContent = usuario;
            fila.appendChild(celda);
        });

        tabla.appendChild(fila);
    });
}

//Lamo a la función
crearTabla(usuarios);
