import { tareas } from '../../../Datos/tareas.js'

console.log('\n--Ejercicio B5--');


const descripcionesTareas = tareas.map((tarea) => {
    if (tarea.completada === false)
        tarea.urgente = true;
}).filter((tarea) => {
    if (tarea.completada !== true)
        return tarea;
}).map((tarea) => {
    return tarea.descripcion;
})

console.log(descripcionesTareas);