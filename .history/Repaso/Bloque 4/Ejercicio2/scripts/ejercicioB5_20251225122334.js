import { tareas } from '../../../Datos/tareas.js'

console.log('\n--Ejercicio B5--');


const descripcionesTareas = tareas.map((tarea) => {
    if (tarea.completada === false)
        tarea.urgente = true;
    return tarea;
}).filter((tarea) => {
    return tarea.completada === false;
}).map((tarea) => {
    return tarea.descripcion;
})

console.log(descripcionesTareas);