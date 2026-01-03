import { tareas } from '../../../Datos/tareas.js'

console.log('\n--Ejercicio B5--');


const descripcionesTareas = tareas.map((tarea) => {
    if (tarea.completada === false)
        tarea.urgente = true;
    return tarea;
}).filter((tarea) => {
    if (tarea.completada === false)
        return tarea;
})


console.log(descripcionesTareas);