import { tareas } from '../../../Datos/tareas.js'

let tareasConNueva=[...tareas];
const nuevoLibro={
    id:5,
    descripcion:"Investigar nueva librería JS",
    completada:false
}
tareasConNueva.push(nuevoLibro);
