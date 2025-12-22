import { libros } from '../../../Datos/libros.js'

console.log('--Ejercicio 1--')

let totalPaginas=0;
libros.map((libro)=>{
    totalPaginas = libro.paginas.reduce((acumulador, paginas) => acumulador + paginas, 0);
})

console.log("Número total de Páginas "+totalPaginas)