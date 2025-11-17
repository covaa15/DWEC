'use strict';

// Promesas reescritas con Promise.resolve() y Promise.reject()
const promise1 = Promise.resolve('1');
const promise2 = Promise.reject('2');
const promise3 = Promise.resolve('3');

// Primer bloque
Promise.any([promise1, promise2, promise3])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

// Output esperado: 1

// Segundo bloque
Promise.any([promise2])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

// Output esperado: "Error: AggregateError: All promises were rejected"
