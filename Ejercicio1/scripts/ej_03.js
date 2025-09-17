//1. Crear el Objeto Producto
let producto = {
    nombre:"Estuche",
    precio:20
}
console.table(producto)

//2.Crear el Objeto Cliente
let cliente={
    nombreCliente:"Alex",
    esPremium:false
}
console.table(cliente)

//3.Combinar ambos objetos usando Spread Operator
let pedido={
    ...producto,
    ...cliente
}
//4.Mostrar el objeto Pedido
console.table(pedido)

//5.Crear un nuevo objeto con la propiedad nombre y combinarlo con cliente y ver que sucede

let producto2 = {
    nombre:"Reloj"
}
let cliente2={
    nombre:"Eneas",
    esPremium:false
}
let combinarlo ={
    ...cliente2,
    ...producto2
}

console.table(combinarlo)

/* Al combinar dos objetos que tienen una propiedad con el mismo nombre,
 * la propiedad del primer objeto se sobrescribe con la del segundo.
 * En este caso, como primero se pasa cliente2 y después producto2 y ambos
 * contienen la propiedad nombre.
 * La propiedad "nombre" de cliente2 es machacada por la de producto2 y
 * finalmente, se mostraría por pantalla: el nombre del producto,
 * y si el cliente es premium o no
 */
