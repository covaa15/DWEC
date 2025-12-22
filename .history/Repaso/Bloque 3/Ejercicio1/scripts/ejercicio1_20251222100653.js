import { libros } from '../../../Datos/libros.js'

console.log('--Ejercicio 1--')
const totalPaginas=libros.paginas.reduce((acumulador,valorActual)=>acumulador+valorActual,0);
console.log("Número total de Páginas "+totalPaginas)