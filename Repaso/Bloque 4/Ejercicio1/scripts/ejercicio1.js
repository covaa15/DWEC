import { libros } from '../../../Datos/libros.js'

console.log('--Ejercicio 1--')

const librosConMas400Paginas = libros.filter((libro) => {

    if (libro.paginas > 400)
        return libro;
});

console.log("Los libros con más de 400 páginas son:");
console.log(librosConMas400Paginas);
const titulosLibros = librosConMas400Paginas.map((libro) => {
    return libro.titulo;
});
console.log("Los titulos de esos libros son:");
console.log(titulosLibros);

const cadenaTitulos = titulosLibros.join('|');

console.log("Cadena con los titulos:")
console.log(cadenaTitulos);
console.log("Tipo de la variable cadenaTitulos: "+typeof(cadenaTitulos));
