import { tareas } from '../../../Datos/tareas.js'

console.log('\n--Ejercicio B2--')
const pendientes = tareas.filter((tarea) => {

    if (tarea.completada === false)
        return tarea;
});
console.log("Tareas Pendientes:")
console.log(pendientes);

const tareaEspecifica = tareas.find((tarea) => {
    return tarea.id === 3;
});

console.log("Tarea Específica:");
console.log(tareaEspecifica);