const listaComentarios = document.getElementById("lista-comentarios");
const formulario = document.getElementById("formulario-comentarios");
const inputAutor = document.getElementById("autor");
const inputTextoComentario = document.getElementById("texto-comentario");

/* ==========================
   CARGAR COMENTARIOS INICIALES (GET)
========================== */
window.addEventListener("load", function () {
  const solicitud = new XMLHttpRequest();
  solicitud.open("GET", "comments_initial.json", true);

  solicitud.onload = function () {
    if (solicitud.status === 200) {
      const comentarios = JSON.parse(solicitud.responseText);
      comentarios.forEach(mostrarComentario);
    } else {
      console.error("Error al cargar los comentarios iniciales");
    }
  };

  solicitud.onerror = function () {
    console.error("Error de red al obtener los comentarios");
  };

  solicitud.send();
});

/* ==========================
   ENVIAR COMENTARIO (POST)
========================== */
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nuevoComentario = {
    autor: inputAutor.value,
    texto: inputTextoComentario.value,
    fecha: new Date().toISOString()
  };

  const solicitud = new XMLHttpRequest();
  const urlWebhook =
    "https://cors-anywhere.herokuapp.com/https://webhook.site/TU_ID_AQUI";

  solicitud.open("POST", urlWebhook, true);
  solicitud.setRequestHeader("Content-Type", "application/json");

  solicitud.onload = function () {
    if (solicitud.status >= 200 && solicitud.status < 300) {
      // Simulación de actualización en tiempo real
      mostrarComentario(nuevoComentario);
      formulario.reset();
    } else {
      alert("Error al enviar el comentario");
    }
  };

  solicitud.onerror = function () {
    alert("Error de red al enviar el comentario");
  };

  solicitud.send(JSON.stringify(nuevoComentario));
});

/* ==========================
   MOSTRAR COMENTARIO EN EL DOM
========================== */
function mostrarComentario(comentario) {
  const elementoLista = document.createElement("li");

  elementoLista.innerHTML = `
    <strong>${comentario.autor}</strong><br>
    <span>${comentario.texto}</span><br>
    <small>${new Date(comentario.fecha).toLocaleString()}</small>
  `;

  listaComentarios.appendChild(elementoLista);
}
