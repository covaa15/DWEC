//1. Crear Objeto coche
let coche={
    marca:"Toyota",
    modelo:"Corolla",
    anio:2020,
    estaDisponible:false
}

//2.Mostrar por pantalla usando console table
console.table(coche)

//3.Destructuring para estraer marca y modelo y mostrarlas por consola
const {marca:marcaCoche,modelo:modeloCoche}=coche
console.log("Marca del Coche: ",marcaCoche)
console.log("Modelo del Coche: ",modeloCoche)

//4. Cambiar el valor de la variable estadisponible a true
coche.estaDisponible=true
console.log("Valor Nuevo de la variable estaDisponible:",coche.estaDisponible)

//5. Agregar la propiedad color al Objeto
coche=Object.assign({color:"Azul"},coche)
console.table(coche)

//6.Eliminar año
delete coche['anio']

//7.Mostrar la tabla por pantalla
console.table(coche)