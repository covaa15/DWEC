// Referencia al formulario
var formularioComentarios = document.getElementById("comment-form");

// Referencia a la lista de comentarios
var listaComentarios = document.getElementById("comments-list");

// URL del archivo JSON con comentarios iniciales
var urlComentariosIniciales = "comments_initial.json";

// URL de webhook.site (simulación de POST)
var urlWebhook = "https://cors-anywhere.herokuapp.com/https://webhook.site/";



function cargarComentariosIniciales() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", urlComentariosIniciales, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Convertimos la respuesta a objeto JavaScript
            var comentarios = JSON.parse(xhr.responseText);

            // Renderizamos los comentarios
            comentarios.forEach(function (comentario) {
                agregarComentarioALista(comentario);
            });
        } else {
            console.error("Error al cargar los comentarios iniciales");
        }
    };

    xhr.onerror = function () {
        console.error("Error de red al cargar los comentarios");
    };

    xhr.send();
}

function agregarComentarioALista(comentario) {
    var itemLista = document.createElement("li");

    itemLista.innerHTML = 
        "<strong>" + comentario.author + "</strong>: " +
        comentario.commentText +
        "<br><small>" + comentario.timestamp + "</small>";

    listaComentarios.appendChild(itemLista);
}



formularioComentarios.addEventListener("submit", function (evento) {
    // Prevenimos el comportamiento por defecto del formulario
    evento.preventDefault();

    // Obtenemos los valores del formulario
    var autor = document.getElementById("author").value;
    var textoComentario = document.getElementById("commentText").value;

    // Creamos el objeto comentario
    var nuevoComentario = {
        author: autor,
        commentText: textoComentario,
        timestamp: new Date().toISOString()
    };

    // Creamos la petición XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open("POST", urlWebhook, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Simulamos actualización en tiempo real
            agregarComentarioALista(nuevoComentario);

            // Limpiamos el formulario
            formularioComentarios.reset();
        } else {
            console.error("Error al enviar el comentario");
        }
    };

    xhr.onerror = function () {
        console.error("Error de red al enviar el comentario");
    };

    // Enviamos el comentario como JSON
    xhr.send(JSON.stringify(nuevoComentario));
});


// Cargamos los comentarios al iniciar la página
cargarComentariosIniciales();
