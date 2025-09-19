/*1. Crea un array de objetos llamado ‘estudiantes’. Cada objeto debe representar
 a un estudiante y tener las propiedades ‘nombre’ (string), ‘apellidos’ (string),
 ‘calificacion’ (number) y ‘aprobado’ (boolean). Añade al menos 3 estudiantes.*/

let estudiantes = [{
    nombre: "Antonio",
    apellidos: "Álvarez Menéndez",
    calificacion: 9.5,
    aprobado: true
},
{
    nombre: "María",
    apellidos: "Martínez Fernández",
    calificacion: 2.5,
    aprobado: false

},
{
    nombre: "Andrea",
    apellidos: "Martínez Rodriguez",
    calificacion: 5,
    aprobado: true
},
{
    nombre: "Martín",
    apellidos: "Barredo López",
    calificacion: 4,
    aprobado: false
},
{
    nombre: "Luna",
    apellidos: "Pérez Fenández",
    calificacion: 8.6,
    aprobado: false
},
{
    nombre: "Pedro",
    apellidos: "López Denis",
    calificacion: 1.9,
    aprobado: true
}
]
console.log("Array 'estudiantes:'")
console.log(estudiantes)

//2. Utiliza el método .map() para crear un nuevo array donde a cada estudiante 
// se le añade una propiedad ‘id’ única (puede ser 1, 2, 3…).
let estudiantesConID = estudiantes.map(function (tech, index) {
    return {
        id: index + 1,
        ...tech
    }
})
console.log("Array 'estudiantesConID:'")
console.log(estudiantesConID)

//3. Utiliza el método .filter() para obtener un array que contenga únicamente a 
// los estudiantes que tienen una calificación mayor o igual a 5.

let estudiantesFiltrado = estudiantesConID.filter(function (tech) {

    if (tech.calificacion >= 5)
        return tech
})
console.log("Array 'estudiantesFiltrados:'")
console.log(estudiantesFiltrado)

//4. Para cada estudiante en el array filtrado (los aprobados), imprime un mensaje 
// en consola usando Template Strings que diga: “¡Felicidades [nombre], has aprobado con [calificacion]!”.

console.log("Mensajes Ejercicio 4:")
for (let i = 0; i < estudiantesFiltrado.length; i++) {

    console.log(`¡Felicidades ${estudiantesFiltrado[i].nombre}, has aprobado con ${estudiantesFiltrado[i].calificacion}`)

}

/*5. Recorre el array original y verifica si el valor de la propiedad aprobado es coherente con la 
calificacion (es decir, si calificacion >= 5 entonces aprobado debe ser true, y si es menor, debe ser false).
Si hay incoherencias, imprime un mensaje como:
“⚠️ Incoherencia en el registro de [nombre]: calificación = [calificacion], aprobado = [aprobado]”*/
console.log("Mostramos las incoherencias:")
for (let i = 0; i < estudiantes.length; i++) {
    if ((estudiantes[i].calificacion >= 5 && estudiantes[i].aprobado == false) ||
        (estudiantes[i].calificacion < 5 && estudiantes[i].aprobado == true)) {
        console.log(`⚠️ Incoherencia en el registro de: ${estudiantes[i].nombre}, calificación = ${estudiantes[i].calificacion}, aprobado = ${estudiantes[i].aprobado ? "Sí" : "No"}`)

    }

}
