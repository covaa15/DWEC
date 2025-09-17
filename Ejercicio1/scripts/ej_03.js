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

//5.