import {libros} from './Repaso\Bloque 1\Datos\libros.js'

console.log("--EJERCICIO 1--")
libros.forEach(libro => {
    console.log(`El libro ${libro.titulo} tiene ${libro.paginas} páginas. `)
});