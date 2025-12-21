import { libros } from '../../../Datos/libros.js'

console.log("--Ejercicio 1--")
let librosDeFiccion = libros.filter((libro) => {

    if (libro.categoria === "Ficción")
        return libro;
})
console.log(librosDeFiccion);

