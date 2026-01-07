const temperaturas = [12, 5, 32, 100, 28, 0, -5];

console.log('\n--Ejercicio C1--');

const temperaturas1 = temperaturas.sort();
console.log("Sort sin parámetros");
console.log(temperaturas1);

console.log("Sort con parámetros");
const temperaturas2 = temperaturas.sort((a, b) => a - b);
console.log(temperaturas2);