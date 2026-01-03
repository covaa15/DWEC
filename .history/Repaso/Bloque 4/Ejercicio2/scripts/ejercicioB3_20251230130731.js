import { tareas } from '../../../Datos/tareas.js'

console.log('\n--Ejercicio B3--');

const tareasActualizadas = tareas.map(tarea => {
    if (tarea.id === 4) {
        return {
            ...tarea,
            completada: true
        };
    }
    return tarea;
});

console.log("Tareas Actualizadas:");
console.table(tareasActualizadas);