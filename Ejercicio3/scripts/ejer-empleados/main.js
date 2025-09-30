import { agregarEmpleado, obtenerEmpleados, eliminarEmpleado, buscarPorDepartamento, calcularSalarioPromedio, obtenerEmpleadosOrdenadosPorSalario } from "./empleados.js";

console.log("Lista Empleados Original")
console.table(obtenerEmpleados())

//Agregar Empleado
let empleado = {
    id: obtenerEmpleados().length + 1,
    nombre: "Mario",
    departamento: "Ventas",
    salario: 1453
}
agregarEmpleado(empleado)

console.log("Lista Empleados Después de Agregar un nuevo Empleado: ")
console.table(obtenerEmpleados())

//Eliminar Empleado
eliminarEmpleado(6)
console.log("Eliminar el empleado cuya id es la 6")
console.table(obtenerEmpleados())

//Buscar por Departamento
console.log("Buscamos el departamento Informatica")
let empleadosInformatica = buscarPorDepartamento("Informatica")
console.table(empleadosInformatica)

//Calcular Salario 
let promedio = calcularSalarioPromedio()
console.log(`Salario Promedio de los Empleados: ${promedio.toFixed(2)}`)

//Obtener los empleados ordenados por Salario de Mayor a Menor
console.log("Arreglo Empleados antes de ordenarlo")
console.table(obtenerEmpleados())

let empleadosOrdenados = obtenerEmpleadosOrdenadosPorSalario()
console.log("Arreglo Empleados después de ordenarlo")
console.table(empleadosOrdenados)
