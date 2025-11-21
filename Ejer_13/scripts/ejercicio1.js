import { usuarios } from '../datos/Usuarios.js';
import { uploadingInitialUsers, crearTabla, crearCeldas, crearFila, crearBotones, crearImagen, crearParrafos } from '../Funciones/funciones.js';
//const BotonSubirDatos = document.querySelector('#botonSubir');
const BotonUsuariosIniciales = document.querySelector('#botonCargar');
const BotonGuardarUsuario = document.querySelector('#botonGuardar');
const divUsuarios = document.querySelector('#usuarios');
const InputNombre = document.querySelector('#nombre');
const InputApellido = document.querySelector('#apellido');
const InputEmail = document.querySelector('#email');
const InputImagen = document.querySelector('#imagen');
const divMensajes = document.querySelector('#mensajes');
let tabla;

//URL
const url = "https://crudcrud.com/api/6728ad1bcde44a4d9f51d2c6044e479b/usuarios";
//Compruebo si hay datos cargados
comprobarSiHayDatos();

//Cargo los datos a Crud 
BotonUsuariosIniciales.addEventListener('click', function () {
    uploadingInitialUsers(usuarios, url, displayUsers);

});

//Metodo que comprueba si ya hay datos cargados en crud y en el caso afirmativo los carga
function comprobarSiHayDatos() {

    fetch(url)
        .then(resultados => {
            return resultados.json();
        })
        .then(objetoJSON => {
            if (objetoJSON.length > 0) {
                displayUsers();

            }

        });
}
//Metodo para obtener los datos de crud
function displayUsers() {

    //Si en crud ya hay datos, desactivo el boton para que no me deje cargar mas
    BotonUsuariosIniciales.disabled = true;
    fetch(url)
        .then(resultados => {
            return resultados.json();
        })
        .then(objetoJSON => {
            //Elimino el contenido del div
            divUsuarios.innerHTML = "";
            //Creo la tabla en la cual voy a cargar los datos
            tabla = crearTabla();
            //Añado la tabla al div
            divUsuarios.appendChild(tabla);
            for (const usuario of objetoJSON) {
                //Creo la fila para cada usuario
                let fila = crearFila(tabla);

                //Creo las celdas para las imagenes
                let celda = crearCeldas();
                crearImagen(usuario.picture, celda, fila);

                //Creo las celdas para el nombre, apellidos y email del usuario
                celda = crearCeldas();
                crearParrafos(usuario.firstName + " " + usuario.lastName, fila, celda, "nombre");
                crearParrafos(usuario.email, fila, celda, "email");

                //Creo las celdas para los botones
                celda = crearCeldas();
                crearBotones(usuario._id, "Editar", fila, celda);
                crearBotones(usuario._id, "Eliminar", fila, celda);
            }
        });
}



BotonGuardarUsuario.addEventListener('click', event => {
    event.preventDefault();
    const esValido = validarFormulario();
    const Parrafo = document.createElement('p');
    if (esValido != true) {
        divMensajes.innerHTML = "";
        Parrafo.textContent = "Algunos de los campos no son validos";
        Parrafo.classList.add('mensajeError');

    } else {
        divMensajes.innerHTML = "";
        const nuevoUsuario = [
            {
                "firstName": InputNombre.value,
                "lastName": InputApellido.value,
                "email": InputEmail.value,
                "picture": InputImagen.value
            }
        ]
        uploadingInitialUsers(nuevoUsuario, url, displayUsers);
        Parrafo.textContent = "Usuario Añadido";
        Parrafo.classList.add('mensajeBien');
        limpiarInputs();
    }

    divMensajes.appendChild(Parrafo);

    //Creo un array con el usuario y lo paso a la funcion de actualizar


});

function validarFormulario() {

    let esValido = true;
    const expresion = '[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}';
    const expresionValidarEmail = new RegExp(expresion);

    //Compuebo el nombre
    if (InputNombre.value === null || InputNombre.value === "") {
        InputNombre.classList.remove('bien');
        InputNombre.classList.add('mal');
        esValido = false;
    } else {
        InputNombre.classList.remove('mal');
        InputNombre.classList.add('bien');
    }

    //Compuebo los apellidos
    if (InputApellido.value === null || InputApellido.value === "") {
        InputApellido.classList.remove('bien');
        InputApellido.classList.add('mal');
        esValido = false;
    } else {
        InputApellido.classList.remove('mal');
        InputApellido.classList.add('bien');
    }

    //Compuebo el email
    if (expresionValidarEmail.test(InputEmail.value) != true) {
        InputEmail.classList.remove('bien');
        InputEmail.classList.add('mal');
        esValido = false;
    } else {
        InputEmail.classList.remove('mal');
        InputEmail.classList.add('bien');
    }

    //Compuebo la URL
    if (URL.canParse(InputImagen.value) != true) {
        InputImagen.classList.remove('bien');
        InputImagen.classList.add('mal');
        esValido = false;
    } else {
        InputImagen.classList.remove('mal');
        InputImagen.classList.add('bien');

    }

    return esValido;
}


//Compuebo si el valor del input cambia
InputNombre.addEventListener('input', validarFormulario);
InputApellido.addEventListener('input', validarFormulario);
InputEmail.addEventListener('input', validarFormulario);
InputImagen.addEventListener('input', validarFormulario);

//Vacio los inputs al recargar la pagina
document.addEventListener('DOMContentLoaded', limpiarInputs);

function limpiarInputs() {
    InputNombre.value = "";
    InputNombre.classList.remove('bien');
    InputEmail.value = "";
    InputEmail.classList.remove('bien');
    InputApellido.value = "";
    InputApellido.classList.remove('bien');
    InputImagen.value = "";
    InputImagen.classList.remove('bien');
}