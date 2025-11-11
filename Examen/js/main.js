function init() {
    cargarAlumnos();
    cargarCalificaciones();

    document.querySelector('#ordenar-por').addEventListener('change', ordenarLista);
    document.querySelector('#filtro-nombre').addEventListener('input', filtrarLista);
    document.querySelector('#btn-guardar').addEventListener('click', event => {

        event.preventDefault();
        validarFormulario();
    });
}

document.addEventListener('DOMContentLoaded', init);

let listaAlumnos = [];
let listaCalificaciones = [];
let listaAMostrar = [];

const cuerpoTabla = document.querySelector('#tabla-alumnos tbody');
const detalles = document.querySelector('#detalles-content');

// Cargo los alumnos
function cargarAlumnos() {
    const requestAlumnos = crearPeticion("./data/alumnos.xml");

    requestAlumnos.onload = () => {
        if (requestAlumnos.status === 200) {
            const respuesta = requestAlumnos.response;
            const alumnos = respuesta.querySelectorAll('alumno');

            alumnos.forEach(alumno => {
                const objetoAlumno = {
                    id: alumno.getAttribute('id'),
                    nombre: alumno.querySelector('nombre').textContent,
                    apellidos: alumno.querySelector('apellidos').textContent,
                    email: alumno.querySelector('email').textContent,
                    edad: alumno.querySelector('edad').textContent,
                    direccion: alumno.querySelector('direccion').textContent,
                    localidad: alumno.querySelector('localidad').textContent,
                    calificaciones: []
                };
                listaAlumnos.push(objetoAlumno);
            });

            unirCalificaciones();
        } else {
            alert("Error al cargar el archivo alumnos.xml");
        }
    };
}

// Cargo las calificaciones
function cargarCalificaciones() {
    const requestCalificaciones = crearPeticion("./data/calificaciones.xml");

    requestCalificaciones.onload = () => {
        if (requestCalificaciones.status === 200) {
            const respuesta = requestCalificaciones.response;
            const calificaciones = respuesta.querySelectorAll('calificacion');

            calificaciones.forEach(calificacion => {
                const objetoCalificacion = {
                    id: calificacion.getAttribute('alumno_id'),
                    asignatura: calificacion.querySelector('asignatura').textContent,
                    nota: parseFloat(calificacion.querySelector('nota').textContent)
                };
                listaCalificaciones.push(objetoCalificacion);
            });

            unirCalificaciones();
        } else {
            alert("Error al cargar el archivo calificaciones.xml");
        }
    };
}

// Crea la peticion
function crearPeticion(ruta) {
    const request = new XMLHttpRequest();
    request.open('GET', ruta);
    request.responseType = 'document';
    request.setRequestHeader('Accept', 'text/html');
    request.send();
    return request;
}

//Uno las calificaciones con los  alumnos
function unirCalificaciones() {
    if (listaAlumnos.length > 0 || listaCalificaciones.length > 0) {

        listaCalificaciones.forEach(calificacion => {
            const alumno = listaAlumnos.find(a => a.id === calificacion.id);
            if (alumno) {
                alumno.calificaciones.push({
                    asignatura: calificacion.asignatura,
                    nota: calificacion.nota
                });
            }

        });

        listaAlumnos.forEach(alumno => {
            if (alumno.calificaciones.length > 0) {
                const suma = alumno.calificaciones.reduce((acc, c) => acc + c.nota, 0);
                alumno.notaMedia = parseFloat((suma / alumno.calificaciones.length).toFixed(2));
            } else {
                alumno.notaMedia = null;
            }
        });

        listaAMostrar = [...listaAlumnos];
        actualizarTabla();
    }
}

//Funcion para actualizar la tabla
function actualizarTabla() {
    cuerpoTabla.innerHTML = '';

    listaAMostrar.forEach(alumno => {
        const fila = document.createElement('tr');
        fila.dataset.id = alumno.id;

        crearCeldas(alumno.nombre, fila);
        crearCeldas(alumno.apellidos, fila);
        crearCeldas(alumno.email, fila);


        const celdaBotones = document.createElement('td');
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        celdaBotones.appendChild(btnEditar);
        celdaBotones.appendChild(btnEliminar);
        fila.appendChild(celdaBotones);


        fila.addEventListener('click', () => mostrarDetalles(alumno));

        btnEliminar.addEventListener('click', event => {
            event.stopPropagation();
            eliminarAlumno(alumno.id);
        });

        cuerpoTabla.appendChild(fila);
    });
}

//Funcion para mostrarlos detalles alumno
function mostrarDetalles(alumno) {
    detalles.innerHTML = '';

    const campos = [
        `Nombre: ${alumno.nombre}`,
        `Apellidos: ${alumno.apellidos}`,
        `Email: ${alumno.email}`,
        `Edad: ${alumno.edad}`,
        `Dirección: ${alumno.direccion}`,
        `Localidad: ${alumno.localidad}`,
        `Nota media: ${alumno.notaMedia ?? 'Sin calificaciones'}`
    ];

    campos.forEach(texto => {
        const p = document.createElement('p');
        p.textContent = texto;
        detalles.appendChild(p);
    });

    if (alumno.calificaciones.length > 0) {
        alumno.calificaciones.forEach(c => {
            const p = document.createElement('p');
            p.textContent = `${c.asignatura}: ${c.nota}`;
            detalles.appendChild(p);
        });
    }
}

// Funcion para crear las celdas
function crearCeldas(dato, fila) {
    const celda = document.createElement('td');
    celda.textContent = dato;
    fila.appendChild(celda);
}

// Funcion para odrdenar la lista
function ordenarLista() {
    const valor = document.querySelector('#ordenar-por').value;

    switch (valor) {
        case 'nombre-asc':
            listaAMostrar.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombre-desc':
            listaAMostrar.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case 'apellidos-asc':
            listaAMostrar.sort((a, b) => a.apellidos.localeCompare(b.apellidos));
            break;
        case 'apellidos-desc':
            listaAMostrar.sort((a, b) => b.apellidos.localeCompare(a.apellidos));
            break;
    }

    actualizarTabla();
}

//Funcion para Filtrar la lista
function filtrarLista() {
    const texto = document.querySelector('#filtro-nombre').value.toLowerCase().trim();

    listaAMostrar = listaAlumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(texto) ||
        alumno.apellidos.toLowerCase().includes(texto)
    );

    ordenarLista();
}


//Funcion para eliminar un alumno
function eliminarAlumno(idAlumno) {

    listaAlumnos = listaAlumnos.filter(a => a.id !== idAlumno);
    listaAMostrar = listaAMostrar.filter(a => a.id !== idAlumno);

    actualizarTabla();
}

//Validar Formulario
function validarFormulario() {

    const inputsFormulario = document.querySelectorAll('#form-gestion-alumno input');
    const listaErrores = [];

    inputsFormulario.forEach((input) => {

        if (input.value == "" && input.getAttribute('name') != 'id') {
            listaErrores.push(input.getAttribute('name'));
        }
    });

    let textoError = "Es obligatorio añadir tambien:";
    listaErrores.map((error) => {

        textoError = textoError + "\n" + error;

    });

    if (listaErrores.length > 1)
        window.alert(textoError);
    else {

        let objetoAlumno;
        inputsFormulario.forEach((input) => {

            objetoAlumno = {
                id: listaAMostrar.length + 1,
                nombre: input.value,
                apellidos: input.value,
                email: input.value,
                edad: input.value,
                direccion: input.value,
                localidad: input.value
            };

        });
        listaAMostrar.push(objetoAlumno);
        actualizarTabla();
        limpiarInputs();

    }

}

function limpiarInputs() {
    inputsFormulario.forEach((input) => {
        input.textContent = "";
    });
}