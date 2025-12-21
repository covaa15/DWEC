import { libros } from '../../../Datos/libros.js'

console.log("\n--Ejercicio 2--")
let libroBarato = libros.find((libro) => {

    if (libro.precio <= 15.00)
        return libro;
})
console.log(libroBarato);