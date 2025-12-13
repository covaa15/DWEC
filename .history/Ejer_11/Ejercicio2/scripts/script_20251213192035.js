let comentarios; 



function init() {
    cargarComentariosIniciales();
}


function cargarComentariosIniciales() {
    const request = new XMLHttpRequest();
    request.open('GET', './comments_initial.json', true);
    request.responseType = 'json';
    request.setRequestHeader('Accept', 'application/json');

    request.onload = () => {
        if (request.status === 200) {
            comentarios = request.response;
            renderizarComentarios();
        } else {
            console.error("Error al cargar los comentarios iniciales");
        }
    };

    request.onerror = () => {
        console.error("Error de red al cargar los comentarios");
    };

    request.send();
}

function renderizarComentarios() {
    const lista = document.getElementById('lista-comentarios');
    lista.innerHTML = ""; // Limpiar lista
    comentarios.forEach((comentario, index) => {
        const li = document.createElement('li');
        li.id = `comentario-${index}`;
        li.innerHTML = `
            <span class="autor">${comentario.author}</span>: 
            <span class="texto">${comentario.commentText}</span>
            <br><small>${comentario.timestamp}</small>
        `;
        lista.appendChild(li);

        // Hacer clic en spans para editar
        li.querySelectorAll('span').forEach(span => {
            span.addEventListener('click', () => {
                cambiarAInput(span, index);
            });
        });
    });
}


function cambiarAInput(span, index) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    span.replaceWith(input);
    input.focus();

    input.addEventListener('blur', () => {
        cambiarASpan(input, index, span.className);
    });
}


function cambiarASpan(input, index, clase) {
    const span = document.createElement('span');
    span.textContent = input.value;
    span.className = clase;
    input.replaceWith(span);

    // Guardar cambios en el objeto global
    if (clase === 'autor') comentarios[index].author = input.value;
    if (clase === 'texto') comentarios[index].commentText = input.value;

    span.addEventListener('click', () => {
        cambiarAInput(span, index);
    });
}


function mandarDatos() {
    document.querySelector('button').disabled = true;

    const request = new XMLHttpRequest();
    const URL_WEBHOOK = "https://cors-anywhere.herokuapp.com/https://webhook.site/TU_UNIQUE_URL";
    request.open('POST', URL_WEBHOOK, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(comentarios));

    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
            console.log("Comentarios enviados correctamente al webhook");
            document.querySelector('button').disabled = false;
            document.querySelector('#msj-confirmar')?.hidden = false;
            document.querySelector('#msj-error')?.hidden = true;
        } else {
            console.error("Error al enviar los comentarios");
            document.querySelector('button').disabled = false;
            document.querySelector('#msj-confirmar')?.hidden = true;
            document.querySelector('#msj-error')?.hidden = false;
        }
    };

    request.onerror = () => {
        console.error("Error de red al enviar los comentarios");
        document.querySelector('button').disabled = false;
        document.querySelector('#msj-confirmar')?.hidden = true;
        document.querySelector('#msj-error')?.hidden = false;
    };
}


document.addEventListener('DOMContentLoaded', () => {
    init();

    document.querySelector('button').addEventListener('click', mandarDatos);
});
