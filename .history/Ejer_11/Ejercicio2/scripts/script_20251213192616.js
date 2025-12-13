let data;
let cantidadMensajes = 1;

document.addEventListener('DOMContentLoaded', init);

function init() {
    getData();

    document.querySelector('#formulario-comentarios').addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validarForm()) {
            ocultarErrores();

            const autor = document.querySelector('#autor').value;
            const mensaje = document.querySelector('#mensaje').value;

            const comentario = newMensaje(autor, mensaje);
            const enviado = await mandarComentario(comentario);

            if (enviado) clearForm();
        } else {
            mostrarErrores();
        }
    });
}

function validarForm() {
    const autor = document.querySelector('#autor').value.trim();
    const mensaje = document.querySelector('#mensaje').value.trim();
    return autor !== '' && mensaje !== '';
}

function ocultarErrores() {
    document.querySelector('.error-autor').hidden = true;
    document.querySelector('.error-msj').hidden = true;
}

function mostrarErrores() {
    const autor = document.querySelector('#autor').value.trim();
    const mensaje = document.querySelector('#mensaje').value.trim();

    document.querySelector('.error-autor').hidden = autor !== '';
    document.querySelector('.error-msj').hidden = mensaje !== '';
}

function clearForm() {
    document.querySelector('#autor').value = '';
    document.querySelector('#mensaje').value = '';
}

function newMensaje(autor, contenido) {
    return {
        id: cantidadMensajes,
        publishedTime: new Date().toISOString(),
        content: {
            author: autor,
            message: contenido
        }
    };
}

async function mandarComentario(objeto) {
    document.querySelector(".error-conexion").hidden = true;

    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://webhook.site/aa26bb1a-1dbd-4541-87bf-4174556ad904', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objeto)
        });

        if (response.ok) {
            addMensaje(objeto.id, objeto.content.author, objeto.content.message);
            return true;
        } else {
            document.querySelector(".error-conexion").hidden = false;
            return false;
        }
    } catch (error) {
        document.querySelector(".error-conexion").hidden = false;
        console.error(error);
        return false;
    }
}

function getData() {
    fetch('./data/comments.json')
        .then(res => res.json())
        .then(json => {
            data = json;
            parseData();
        })
        .catch(err => console.error('Error al cargar datos:', err));
}

function parseData() {
    data.forEach(msj => addMensaje(msj.id, msj.content.author, msj.content.message));
}

function addMensaje(id, autor, msj) {
    const ul = document.querySelector('#lista-comentarios');
    ul.innerHTML += `
        <li data-id="${id}">
            <div><strong>${autor}</strong></div>
            <div>${msj}</div>
        </li>
    `;
    cantidadMensajes++;
}
