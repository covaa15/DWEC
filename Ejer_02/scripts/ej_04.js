//1. Crea un objeto usuario con nombre y email.

let usuario = {
    nombre: "Martín",
    email: "martin123@gmail.com"
}
console.log("Usuario:")
console.log(usuario)

//2. Crea un objeto perfil con puesto y empresa.
let perfil = {
    puesto: "Programador",
    empresa: "EDP"
}
console.log("Perfil:")
console.log(perfil)

//3.Combina ambos objetos en un nuevo objeto empleado usando el “spread operator” (...).

let empleado = {
    ...usuario,
    ...perfil
}
console.log("Empleado:")
console.log(empleado)

/*4.Supongamos que el objeto empleado podría tener o no una propiedad anidada 
perfil.direccion.ciudad. Intenta acceder a empleado.perfil.direccion.ciudad 
usando “Optional Chaining” (?.) para evitar errores*/

console.log("Resultado Optional Chaining (?): ")
console.log(empleado.perfil?.direccion?.ciudad)

/*5.Usa el “Nullish Coalescing Operator” (??) para asignar un valor por defecto 
(“Ciudad no especificada”) si el resultado del paso anterior es null o undefined.*/

console.log("Resultado Nullish Coalescing Operator (??): ")
console.log(empleado.perfil?.direccion?.ciudad ?? "Ciudad no especificada")




