import { libros } from '../../../Datos/libros.js'

console.log("\n--Ejercicio 1--")
let librosDeFiccion = libros.filter((libro) => {

    if (libro.categoria === "Ficción")
        return libro;
})
console.log(librosDeFiccion);

