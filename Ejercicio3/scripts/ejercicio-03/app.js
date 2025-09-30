//importa las funciones del módulo biblioteca.js
import { agregarLibro,obtenerLibros,eliminarLibro,buscarLibro,calcularTotalPaginas,ordenarPorPaginas, hayLibrosLargos,todosSonLibrosCortos } from "./biblioteca.js"

//Usa obtenerLibros() para mostrar la colección inicial.
console.log("Colección de Libros Inicial")
console.table(obtenerLibros())


//Usa agregarLibro() para añadir un nuevo libro
let libro={
    id:obtenerLibros().length,
    titulo:"Código Lyoko:4: El Ejercito de la Nada",
    autor:"Jeremy Belpois",
    paginas:368
}
//Vuelve a mostrar la colección para verificar que se ha añadido.
console.log("Colección de Libros Después de añadirle otro libro")
console.table(obtenerLibros())

//Buscar Libro que no existe
console.log("Busco el libro con la ID 20:")
let libroBuscado=buscarLibro(20)

if(libroBuscado==null)
    console.log("El libro buscado no existe")
else
console.log(libroBuscado)

//Buscar un libro que existe
console.log("Busco el libro con la ID 8:")
libroBuscado=buscarLibro(8)

if(libroBuscado==null)
    console.log("El libro buscado no existe")
else
console.log(libroBuscado)

//Eliminar un Libro
console.table("Eliminamos el libro que esta en la posicion 3")
eliminarLibro(3)
console.table(obtenerLibros())

//Utiliza esta función para imprimir en la consola el número total de páginas que suman todos los libros.
console.log(`Número Total de Páginas que suman todos los libros: ${calcularTotalPaginas()}`)

//muestra la colección de libros
console.log("Collección de libros antes de organizar")
console.table(obtenerLibros())
ordenarPorPaginas()
console.log("Collección de libros después de organizar")
console.table(obtenerLibros())

//prueba ambas funciones con diferentes valores de limitePaginas y muestra los resultados (true o false).

//Hay Libros Largos
console.log("¿Hay libros Largos con mas de 10000?")
console.log(`${hayLibrosLargos(10000) ? 'Sí':'No'}`)

console.log("¿Hay libros Largos con mas de 500?")
console.log(`${hayLibrosLargos(500) ? 'Sí':'No'}`)

//Todos Son Libros Cortos
console.log("¿Todos son libros cortos con menos de 10000?")
console.log(`${todosSonLibrosCortos(10000) ? 'Sí':'No'}`)

console.log("¿Todos son libros cortos con menos de 100?")
console.log(`${todosSonLibrosCortos(100) ? 'Sí':'No'}`)
