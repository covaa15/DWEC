//1.Declarar variable nombre
const NOMBRE="Covadonga"

//2.Declarar variable edad
let edad=21

//3.Declarar variable tieneMascota
const TIENEMASCOTA=true

//Muestro por consola el contenido de las variables
console.log("Nombre:", NOMBRE)
console.log("Edad:", edad)
console.log("Tiene mascota:", TIENEMASCOTA)

//4.Reasigno el valor de las variables edad y tieneMascota
edad=22
//tieneMascota=false --> No se puede reasignar el valor de una constante

//Muestro por consola el nuevo contenido de las variables
console.log("Nueva edad :", edad)
console.log("Tiene Mascota:", TIENEMASCOTA)

//5.Muestro por consola el tipo de dato de cada variable
console.log("Nombre: ",NOMBRE)
console.log("Tipo de la variable nombre: ",typeof NOMBRE)
console.log("Edad: ",edad)
console.log("Tipo de la Variable Edad: ",typeof edad)
console.log("¿Tengo mascota?: ",TIENEMASCOTA)
console.log("Tipo de la varible tieneMascota: ",typeof TIENEMASCOTA)

//6.Crear una frase usando Template Strings
console.log(`Hola, mi nombre es ${NOMBRE}, tengo ${edad} años y ${TIENEMASCOTA ? "tengo" : "no tengo"} mascota.`)