//Define y exporta una función crearProducto que acepte nombre,categoria, precio 
// y stock, y devuelva un objeto producto.
export function crearProducto(nombre,categoria,precio,stock){

    return{
        nombre,
        categoria,
        precio,
        stock
    }
}

//Define y exporta una función filtrarPorCategoria que reciba el array de inventario 
// y una categoria, y devuelva un nuevo array con los productos que pertenecen a esa categoría.
export function filtrarPorCategoria(inventario, categoria){
    let productosCategoria=inventario.filter((producto)=>{
        if(producto.categoria===categoria)
            return producto
    })
    return productosCategoria
}

//Define y exporta una función listarProductosAgotados que reciba el inventario y devuelva un 
// array con los productos cuyo stock es 0.
export function listarProductosAgotados(inventario){

    let productosSinStock=inventario.filter((producto)=>{
        if(producto.stock===0)
            return producto
    })
    return productosSinStock
}

//Define y exporta una función calcularValorTotalInventario que reciba el inventario y devuelva 
// el valor total (sumando el precio * stock de cada producto).

export function calcularValorTotalInventario(inventario){

    let valorTotalInventario=0
    inventario.map((producto)=>{
        let totalProducto= producto.precio * producto.stock
        valorTotalInventario=valorTotalInventario+totalProducto
    })
    return valorTotalInventario
}

/*Como exportación por defecto (export default), crea una función resumenInventario que reciba 
 el inventario y muestre en consola un resumen: número total de productos, número de categorías 
 distintas y valor total.*/

 export default function resumenInventario(inventario){
    const totalProducto = inventario.length
    const categoria = new Set(inventario.map(producto => producto.categoria))

    console.log("Resumen del Inventario:")
    console.log("Número Total de Productos:",totalProducto)
    console.log("Número de Categorias:",categoria.size)
    console.log("Valor total del Inventario:",calcularValorTotalInventario(inventario))
 }