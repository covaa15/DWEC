//EJERCICIO 3.3

/*En biblioteca.js, vas a crear un módulo para gestionar 
una colección de libros. Este módulo debe tener:
1. Un arreglo de objetos llamado libros. Cada objeto 
representará un libro con id (número), titulo (string), 
autor (string) y paginas (número). Inicialízalo con 10 libros.*/

let libros = [
    {
        id: 1,
        titulo: "Nada",
        autor: "Carmen Laforet",
        paginas: 336
    },
    {
        id: 2,
        titulo: "El Quijote",
        autor: "Miguel de Cervantes",
        paginas: 1424
    },
    {
        id: 3,
        titulo: "A Christmas Carol",
        autor: "Charles Dickens",
        paginas: 160
    },
    {
        id: 4,
        titulo: "Mi nombre es Parvana",
        autor: "Deborah Ellis",
        paginas: 184
    },
    {
        id: 5,
        titulo: "After",
        autor: " Anna Todd",
        paginas: 592
    },
    {
        id: 6,
        titulo: "Harry Potter y la Piedra Filosofal",
        autor: "J. K. Rowling",
        paginas: 336
    },
    {
        id: 7,
        titulo: "Orgullo y prejuicio",
        autor: "Jane Austen",
        paginas: 424
    },
    {
        id: 8,
        titulo: "El Principito",
        autor: "Carmen Antoine de Saint-Exupéry",
        paginas: 96
    },
    {
        id: 9,
        titulo: "Harry Potter y el Prisionero de Azkaban",
        autor: "J. K Rowling",
        paginas: 352
    },
    {
        id: 10,
        titulo: "El viaje de Parvana",
        autor: "Deborah Ellis",
        paginas: 176
    },

]

//2. Una función agregarLibro(nuevoLibro) que añada un nuevo libro a la colección.

function agregarLibro(nuevoLibro) {
    libros.push(nuevoLibro)
}

//3. Una función obtenerLibros() que devuelva la colección completa.

function obtenerLibros() {
    return libros
}

//EJERCICIO 3.4 

//1. buscarLibro(id): Utiliza .find() para buscar un libro por su id y devolverlo.

function buscarLibro(id) {
    let libro = libros.find(libro => libro.id === id)
    return libro
}

//2. eliminarLibro(id): Utiliza .findIndex() para encontrar el índice del libro con´
//  ese id y luego .splice() para eliminarlo de la colección.


//Creo una función que vuelve a asignar las ID de los libros después de eliminar uno
function reorgaizarIDs(libros) {
    let cont = 0
    libros.forEach(function (libro) {
        cont++
        libro.id = cont
    })
}

function eliminarLibro(id) {

    let indiceLibro = libros.findIndex(libro => libro.id === id)
    libros.splice(indiceLibro, 1)
    reorgaizarIDs(libros)
}


//EJERCICIO 3.5

//calcularTotalPaginas(): Utiliza el método .reduce() para calcular la suma total de las 
// páginas de todos los libros de la biblioteca.
function calcularTotalPaginas() {

    const suma = libros.reduce((acum, libro) => acum + libro.paginas, 0);
    return suma
}


// EJERCICIO 3.6

//1. ordenarPorPaginas(): Utiliza el método .sort() para ordenar los libros 
// de la colección de menor a mayor número de páginas.
function ordenarPorPaginas() {
    libros.sort((libroAnterior, libroPosterior) => libroAnterior.paginas - libroPosterior.paginas)
}


//EJERCICIO 3.7

//1. hayLibrosLargos(limitePaginas): Utiliza .some() para comprobar si hay al menos un libro en 
// la colección que tenga más páginas que limitePaginas.

function hayLibrosLargos(limitePaginas) {
    return libros.some(libro => libro.paginas > limitePaginas)
}

//2. todosSonLibrosCortos(limitePaginas): Utiliza .every() para comprobar si todos los libros 
// de la colección tienen menos páginas que limitePaginas.

function todosSonLibrosCortos(limitePaginas) {
    return libros.every(libro => libro.paginas < limitePaginas)
}


//Exporta funciones.

export { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas, hayLibrosLargos, todosSonLibrosCortos }