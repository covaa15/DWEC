//El método every() verifica si todos los elementos del array cumplen con una condición.
const numeros = [2, 4, 6, 8, 10];

// Comprobar si todos los números son pares
const todosSonPares = numeros.every(numero => numero % 2 === 0);

console.log(todosSonPares); // true (todos los números son pares)
