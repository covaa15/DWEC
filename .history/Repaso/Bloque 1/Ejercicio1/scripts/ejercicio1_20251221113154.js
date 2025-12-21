import {libros} from 'Datos/libros.js'

console.log("--EJERCICIO 1--")
libros.forEach(libro => {
    console.log(`El libro ${libro.titulo} tiene ${libro.paginas} páginas. `)
});