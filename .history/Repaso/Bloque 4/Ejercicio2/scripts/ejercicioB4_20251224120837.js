import { tareas } from '../../../Datos/tareas.js'

console.log('\n--Ejercicio B4--');

const tareasRestantes = tareas.filter((tarea) => {
    if (tarea.id !== 2)
        return tarea;
});
console.log("Tareas Restantes:");
console.log(tareasRestantes);
