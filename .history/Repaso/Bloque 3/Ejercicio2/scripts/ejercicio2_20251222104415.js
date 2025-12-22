import { libros } from '../../../Datos/libros.js'

console.log('--Ejercicio 2--')

console.log('\nTarea A:')
let todosSonLargos = libros.every((libro) => {
    if (libro.paginas > 200)
        return true;
    else
        return false;
})


console.log('¿Son todos largos? ' + ((todosSonLargos === true) ? 'Sí' : 'No'));