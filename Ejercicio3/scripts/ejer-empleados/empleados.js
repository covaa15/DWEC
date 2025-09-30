//En empleados.js, crea un módulo para gestionar una lista de empleados. El arreglo de objetos 
// de empleados debe tener: id, nombre, departamento y salario.
let empleados = [
    {
        id: 1,
        nombre: "Alex",
        departamento: "Informatica",
        salario: 1200
    },
    {
        id: 2,
        nombre: "Antonio",
        departamento: "Direccion",
        salario: 1403.40
    },
    {
        id: 3,
        nombre: "Martin",
        departamento: "RRHH",
        salario: 1090
    },
    {
        id: 4,
        nombre: "Eneas",
        departamento: "Informatica",
        salario: 1258.78
    },
    {
        id: 5,
        nombre: "Laura",
        departamento: "Marketing",
        salario: 1320.50
    },
    {
        id: 6,
        nombre: "Sofía",
        departamento: "Contabilidad",
        salario: 1150
    },
    {
        id: 7,
        nombre: "Carlos",
        departamento: "Logistica",
        salario: 980.75
    },
    {
        id: 8,
        nombre: "Marta",
        departamento: "Ventas",
        salario: 1430
    },
    {
        id: 9,
        nombre: "Javier",
        departamento: "Marketing",
        salario: 1500
    },
    {
        id: 10,
        nombre: "Elena",
        departamento: "Contabilidad",
        salario: 1050.20
    }
];

//* agregarEmpleado(empleado)
function agregarEmpleado(empleado) {

    empleados.push(empleado)
}

//Creo una funcio para obtener los empleados para mostrarlos 
function obtenerEmpleados() {
    return empleados
}

//Creo una función que vuelve a asignar las ID a los empleados después de eliminar uno
function reorganizarIDsEmpleados(empleados) {
    let cont = 0
    empleados.forEach(function (empleado) {
        cont++
        empleado.id = cont
    })
}

//* eliminarEmpleado(id)

function eliminarEmpleado(id) {
    let indiceEmpleado = empleados.findIndex(empleado => empleado.id === id)
    empleados.splice(indiceEmpleado, 1)
    reorganizarIDsEmpleados(empleados)
}

//* buscarPorDepartamento(departamento): Debe devolver un arreglo con los empleados de ese departamento (.filter()).
function buscarPorDepartamento(departamento) {
    let empleadosDepartamento = empleados.filter((empleado) => {
        if (empleado.departamento === departamento)
            return empleado
    })
    return empleadosDepartamento
}

//* calcularSalarioPromedio(): Debe devolver el salario promedio de todos los empleados (.reduce()).

function calcularSalarioPromedio() {
    const suma = empleados.reduce((acum, empleado) => acum + empleado.salario, 0);
    return suma / empleados.length
}

//* obtenerEmpleadosOrdenadosPorSalario(): Debe devolver un nuevo arreglo con los empleados ordenados de mayor a menor salario (.sort()).
function obtenerEmpleadosOrdenadosPorSalario() {
    let empleadosOrdenados = empleados.sort((empleadoAnterior, empleadoPosterior) => empleadoPosterior.salario - empleadoAnterior.salario)
    return empleadosOrdenados
}

export { agregarEmpleado, eliminarEmpleado, buscarPorDepartamento, calcularSalarioPromedio, obtenerEmpleadosOrdenadosPorSalario, obtenerEmpleados }

