/*Recorre las listas y agrega las opciones con una clave para identidicar 
la id de la categoria o de la marca*/
function recorrerListas(lista, seccion) {
    lista.forEach((valor, key) => {
        const opcion = document.createElement('option');
        opcion.value = key;
        opcion.textContent = valor;
        seccion.appendChild(opcion);
    });
}

//Carga los datos de los JSON
export function cargarDatos(ruta, lista, seccion) {
    fetch(ruta)
        .then(resultados => resultados.json())
        .then(objetoJSON => {

            for (const dato of objetoJSON) {
                lista.set(dato.id, dato.nombre);
            }

            recorrerListas(lista, seccion);

        })
        .catch(error => {
            console.log("Error al cargar datos:", error);
        });
}
