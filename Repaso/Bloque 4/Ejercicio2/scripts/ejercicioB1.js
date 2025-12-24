import { tareas } from '../../../Datos/tareas.js'

console.log('\n--Ejercicio B1--')
let tareasConNueva=[...tareas];
const nuevoLibro={
    id:5,
    descripcion:"Investigar nueva librería JS",
    completada:false
}
tareasConNueva.push(nuevoLibro);
console.log(tareasConNueva);