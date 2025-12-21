import { libros } from '../../../Datos/libros.js'

let librosDeFiccion = libros.filter((libro) => {

    if (libro.categoria === "Ficción")
        return libro;
})