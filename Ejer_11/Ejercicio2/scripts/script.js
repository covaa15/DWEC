let comentarios = [];
let contadorMensajes = 1;

document.addEventListener('DOMContentLoaded', () => {
    cargarComentarios();

    const botonEnviar = document.querySelector('#publicar');
    botonEnviar.addEventListener('click', (event) => {
        event.preventDefault();
        manejarEnvio();
    });
});

// Función que maneja el envío del formulario
function manejarEnvio() {
    const nombre = document.querySelector('#autor').value.trim();
    const texto = document.querySelector('#mensaje').value.trim();

    ocultarErrores();

    if (nombre && texto) {
        const comentario = crearComentario(nombre, texto);
        enviarAlServidor(comentario);
    } else {
        mostrarErrores(nombre, texto);
    }
}

// Crea un objeto comentario
function crearComentario(nombre, texto) {
    return {
        id: contadorMensajes,
        fecha: new Date().toISOString(),
        contenido: {
            autor: nombre,
            mensaje: texto
        }
    };
}

// Limpia los campos del formulario
function limpiarFormulario() {
    document.querySelector('#autor').value = '';
    document.querySelector('#mensaje').value = '';
}

// Oculta los mensajes de error
function ocultarErrores() {
    document.querySelector('.error-autor').hidden = true;
    document.querySelector('.error-msj').hidden = true;
    document.querySelector('.error-conexion').hidden = true;
}

// Muestra errores según el campo vacío
function mostrarErrores(nombre, texto) {
    if (!nombre) document.querySelector('.error-autor').hidden = false;
    if (!texto) document.querySelector('.error-msj').hidden = false;
}

// Envía un comentario al servidor (simulado)
function enviarAlServidor(comentario) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cors-anywhere.herokuapp.com/https://webhook.site/aa26bb1a-1dbd-4541-87bf-4174556ad904');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(comentario));

    xhr.onload = () => {
        if (xhr.status === 200) {
            agregarComentario(comentario);
            limpiarFormulario();
        } else {
            document.querySelector('.error-conexion').hidden = false;
        }
    };
}

// Agrega un comentario al DOM
function agregarComentario(comentario) {
    const lista = document.querySelector('#lista-comentarios');
    const item = document.createElement('li');
    item.dataset.id = comentario.id;

    item.innerHTML = `
        <div><strong>${comentario.contenido.autor}</strong></div>
        <div>${comentario.contenido.mensaje}</div>
    `;

    lista.appendChild(item);
    contadorMensajes++;
}

// Carga comentarios desde un archivo JSON y los envía al servidor
function cargarComentarios() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './data/comments.json');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => {
        if (xhr.status === 200 && Array.isArray(xhr.response)) {
            comentarios = xhr.response;
            comentarios.forEach(c => enviarAlServidor(c));
        }
    };

    xhr.send();
}
