import { tareas } from '../../../Datos/tareas.js'

console.log('\n--Ejercicio B5--');


const descripcionesTareas = tareas.map((tarea) => {
    if (tarea.completada === false) {
        tarea.urgente = true;
        console.log(tarea);
    }
    return tarea;
})


console.log(descripcionesTareas);