import { libros } from '../../../Datos/libros.js'

console.log('--Ejercicio 1--')

let totalPaginas=0;
libros.map((libro)=>{
    totalPaginas = libro.reduce((acum, lib) => acum + lib.paginas, 0);

   // let suma = curso.estudiantes.reduce((acum, estudiante) => acum + estudiante.calificacion, 0);
})

console.log("Número total de Páginas "+totalPaginas)