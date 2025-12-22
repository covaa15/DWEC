import { libros } from '../../../Datos/libros.js'

console.log('--Ejercicio 1--')

let totalPaginas=0;
libros.map((libro)=>{
    totalPaginas = libro.reduce((acumulador, libroActual) => acumulador + libroActual.paginas, 0);
})

console.log("Número total de Páginas "+totalPaginas)