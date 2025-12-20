import { libros } from '../Datos/libros.js'

console.log("--EJERCICIO 2--")
let titulosYAutores = libros.map((libro) => {
    let libroTituloAutor = {
        titulo: libro.titulo,
        autor: libro.autor
    }
    return libroTituloAutor;
});

console.log(titulosYAutores);
