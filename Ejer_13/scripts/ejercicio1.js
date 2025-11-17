import { usuarios } from '../datos/Usuarios.js';
const BotonSubirDatos = document.querySelector('#botonSubir');
const BotonCargarDatos = document.querySelector('#botonCargar');
const BotonGuardarUsuario = document.querySelector('#botonGuardar');
const divUsuarios = document.querySelector('#usuarios');
const InputNombre=document.querySelector('#nombre');
const InputApellido=document.querySelector('#apellido');
const InputEmail=document.querySelector('email');
const InputImagen=document.querySelector('#imagen');
let tabla;
//URL
const URL = "https://crudcrud.com/api/d3f3d9136dcc4a3180217b598b1b84e3/usuarios";
let datosSubidos = false;

//Cargo los datos a Crud 
BotonSubirDatos.addEventListener('click', function () {
    uploadingInitialUsers(usuarios);
});


//Metodo para hacer el post de los usuarios,es decir, subo los datos a crud
function uploadingInitialUsers(usuarios) {
    //Creo las opciones
    usuarios.forEach(usuario => {

        const opciones = {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "Content-type": "application/json"
            }
        }

        //Realizo el fecth con las opciones que configure arriba
        fetch(URL, opciones)

            //Respuesta que me devuelve el Servidor si todo fue bien
            .then(resultados => {
                //Lo decodificamos con json
                return resultados.json();
            })
            .then(objetoJSON => {

                datosSubidos = true;

                //LLamar a la funcion que dibuja porque cargo todo bien y añadir mensaje de exito
                // displayUsers();
                //Me va a devolverel objeto json mas la id que le asigno crud
                // console.log(objetoJSON);
                // arrayObjetoJSON.push(objetoJSON);

            })
            .catch(error => {
                console.log("Error en la solicitud");
            });

    });

}
//Cargo los elementos en la tabla
BotonCargarDatos.addEventListener('click', function () {
    divUsuarios.innerHTML = "";
    if (datosSubidos = true) {
        tabla = crearTabla();
        divUsuarios.appendChild(tabla);
        displayUsers();
    }

    else {

        const parrafo = document.createElement('p');
        parrafo.textContent = "Los datos todavia no estan subidos";
        divUsuarios.appendChild(parrafo);
    }

});


//Metodo para obtener los datos de crud
function displayUsers() {

    fetch(URL)
        .then(resultados => {
            return resultados.json();
        })
        .then(objetoJSON => {
            console.log(objetoJSON.length);
            for (const usuario of objetoJSON) {
                let fila = crearFila(tabla);
                // console.log(usuario.firstName);

                let celda = crearCeldas();
                crearImagen(usuario.picture, celda, fila);

                celda = crearCeldas();
                crearParrafos(usuario.firstName + " " + usuario.lastName, fila, celda, "nombre");
                crearParrafos(usuario.email, fila, celda, "email");

                //console.log(usuario._id);
                celda = crearCeldas();
                crearBotones(usuario._id, "Editar", fila, celda);
                crearBotones(usuario._id, "Eliminar", fila, celda);

                //function crearBotones(identificador, claseBoton, fila, celda)

                console.log(objetoJSON);
            }
        });
}


//Metodo para crear la tabla
function crearTabla() {
    const tabla = document.createElement('table');
    return tabla;
}

//Metodo para crear las filas
function crearFila(tabla) {
    const fila = document.createElement('tr');
    tabla.appendChild(fila);
    return fila;

}

//Metodo para crear las celdas
function crearCeldas() {
    const celda = document.createElement('td');
    return celda;
}

//Metodo para crear los botones
function crearBotones(identificador, claseBoton, fila, celda) {
    const Boton = document.createElement('button');
    console.log(identificador);
    Boton.setAttribute('id', identificador);
    Boton.setAttribute('class', claseBoton);
    Boton.textContent = claseBoton;
    celda.appendChild(Boton);
    fila.appendChild(celda);
}

//Metodo para crear los parrafos
function crearParrafos(texto, fila, celda, nombreClase) {
    const Parrafo = document.createElement('p');
    Parrafo.textContent = texto;
    Parrafo.setAttribute('class', nombreClase)
    celda.appendChild(Parrafo);
    fila.appendChild(celda);
}

//Metodos para crear la imagen
function crearImagen(enlace, celda, fila) {
    const Imagen = document.createElement('img');
    Imagen.src = enlace;
    Imagen.width = 50;
    celda.appendChild(Imagen);
    fila.appendChild(celda);
}

BotonGuardarUsuario.addEventListener('click',function(){

    
    
        



        



    // const opciones = {
    //     method: "POST",
    //     body: JSON.stringify(usuario),
    //     headers: {
    //         "Content-type": "application/json"
    //     }
})