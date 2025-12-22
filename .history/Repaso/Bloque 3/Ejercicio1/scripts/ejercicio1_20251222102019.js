import { libros } from '../../../Datos/libros.js'

console.log('--Ejercicio 1--')

let totalPaginas = libros.reduce((acumulador, libro) => {
    return acumulador + libro.paginas;
}, 0);

console.log("Número total de Páginas " + totalPaginas)