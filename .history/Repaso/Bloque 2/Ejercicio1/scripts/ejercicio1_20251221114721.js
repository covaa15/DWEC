import { libros } from '../../../Datos/libros.js'

console.log("\n--Ejercicio 2.1--")
let librosDeFiccion = libros.filter((libro) => {

    if (libro.categoria === "Ficción")
        return libro;
})
console.log(librosDeFiccion);

