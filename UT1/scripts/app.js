let a = 6;
let b = 7;
window.alert(a * b);//Muestra una alerta en el navegador
console.log(a * b);//Muestra el resultado en la consola 
console.log(typeof a);//Muestra el tipo de dato de la variable, es decir, en este caso es int


//let: se utiliza para declarar variables en JavaScript y es no tipado 
//     por lo que puedo meter cualquier cosa luego.

//const: se utiliza para declarar constantes en JavaScript, es decir,
//       una vez asignado un valor no se puede cambiar. Se definen en Mayusculas

//var: es una forma antigua de definir variables en JavaScript. (No usar)

//camelCase: es cuando la primera palabra va en minuscula y las siguiente en mayuscula a la hora
//  de definir variables o funciones. Ejemplo: let precioUnidadTienda = 5;


//Objetos

const producto = {
    nombre: "Tablet",
    precio: 300,
    disponibilidad: true
}

console.log(producto)//Muestra el objeto en la consola
console.table(producto)//Muestra el objeto en forma de tabla
console.log(producto.nombre)//Muestra el nombre del producto


//Centrar el codigo: Shift + Alt + F