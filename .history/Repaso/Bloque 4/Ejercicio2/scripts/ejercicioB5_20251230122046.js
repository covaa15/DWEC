import { tareas } from '../../../Datos/tareas.js'

console.log('\n--Ejercicio B5--');


const descripcionesTareas = tareas.map((tarea) => {
    if (tarea.completada === false) {
        return {
            ...tarea,
            urgente: true
        }
    } else {
        return tarea
    }

})


console.log(descripcionesTareas);