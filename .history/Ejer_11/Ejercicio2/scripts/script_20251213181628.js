const formularioComentarios = document.getElementById("formulario-comentarios");
const listaComentarios = document.getElementById("lista-comentarios");



// Archivo JSON con comentarios iniciales
const URL_COMENTARIOS_INICIALES = "comments_initial.json";

// URL de webhook.site para simular el POST
const URL_WEBHOOK = "https://cors-anywhere.herokuapp.com/https://webhook.site/";



function cargarComentariosIniciales() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", URL_COMENTARIOS_INICIALES, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const comentarios = JSON.parse(xhr.responseText);

            comentarios.forEach(comentario => {
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
    const elementoLista = document.createElement("li");

    elementoLista.innerHTML = `
        <strong>${comentario.author}</strong>: 
        ${comentario.commentText}
        <br>
        <small>${comentario.timestamp}</small>
    `;

    listaComentarios.appendChild(elementoLista);
}



formularioComentarios.addEventListener("submit", function (evento) {
    // Evitamos que el formulario recargue la página
    evento.preventDefault();

    // Obtener datos del formulario
    const autor = document.getElementById("autor").value;
    const textoComentario = document.getElementById("texto-comentario").value;

    // Crear el objeto comentario
    const nuevoComentario = {
        author: autor,
        commentText: textoComentario,
        timestamp: new Date().toISOString()
    };

    // Crear petición POST
    const xhr = new XMLHttpRequest();
    xhr.open("POST", URL_WEBHOOK, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Simular actualización en tiempo real
            agregarComentarioALista(nuevoComentario);

            // Limpiar formulario
            formularioComentarios.reset();
        } else {
            console.error("Error al enviar el comentario");
        }
    };

    xhr.onerror = function () {
        console.error("Error de red al enviar el comentario");
    };

    // Enviar comentario en formato JSON
    xhr.send(JSON.stringify(nuevoComentario));
});



// Cargar comentarios al iniciar la página
cargarComentariosIniciales();
