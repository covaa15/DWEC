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

console.log('\nTarea B:')
let algunoEsCaro = libros.some((libro) => {
    if (libro.precio > 28.00)
        return true;
    else
        return false;
})

console.log('¿Hay algún libro con un precio superior a 28 euros?' + ((algunoEsCaro === true) ? 'Sí' : 'No'));
