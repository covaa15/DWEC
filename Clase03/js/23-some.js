//El método some() verifica si al menos un elemento de un array cumple con una condición.
const numeros = [1, 2, 3, 4, 5];

// Comprobar si hay al menos un número par
const tieneNumeroPar = numeros.some(numero => numero % 2 === 0);

console.log(tieneNumeroPar); // true (porque hay números pares: 2, 4)
