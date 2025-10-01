let nombres = 'Bilbo, Gandalf, Nazgul';

let arr = nombres.split(', ');

for (let name of arr) {
  alert( `Un mensaje para ${name}.` ); // Un mensaje para Bilbo  (y los otros nombres)
}

//solo los dos primeros
let arr2 = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf

//separar letras
let str = "test";

alert( str.split('') ); // t,e,s,t