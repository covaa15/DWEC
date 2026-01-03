import { tareas as tareasBase } from '../../../Datos/tareas.js';

const tareas = tareasBase.map(t => ({ ...t }));

const descripcionesTareas = tareas.map(t => ({
    ...t,
    urgente: !t.completada
}));

console.table(descripcionesTareas);
