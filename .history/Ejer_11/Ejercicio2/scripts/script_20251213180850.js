const listaComentarios = document.getElementById("comments-list");
const formulario = document.getElementById("formulario-comentarios");
const inputAutor = document.getElementById("autor");
const inputTexto = document.getElementById("texto-comentario");

/* ==========================
   OBTENER COMENTARIOS (GET)
========================== */
window.addEventListener("load", function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./data/comments_initial.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const comentarios = JSON.parse(xhr.responseText);
      comentarios.forEach(mostrarComentario);
    } else {
      console.error("Error al cargar los comentarios");
    }
  };

  xhr.onerror = function () {
    console.error("Error de red al obtener los comentarios");
  };

  xhr.send();
});

/* ==========================
   ENVIAR COMENTARIO (POST)
========================== */
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nuevoComentario = {
    author: inputAutor.value,
    commentText: inputTexto.value,
    timestamp: new Date().toISOString()
  };

  const xhr = new XMLHttpRequest();
  const url =
    "https://cors-anywhere.herokuapp.com/https://webhook.site/TU_ID_AQUI";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Simulación de actualización en tiempo real
      mostrarComentario(nuevoComentario);
      formulario.reset();
    } else {
      alert("Error al enviar el comentario");
    }
  };

  xhr.onerror = function () {
    alert("Error de red al enviar el comentario");
  };

  xhr.send(JSON.stringify(nuevoComentario));
});

/* ==========================
   MOSTRAR COMENTARIO
========================== */
function mostrarComentario(comentario) {
  const li = document.createElement("li");

  li.innerHTML = `
    <strong>${comentario.author}</strong><br>
    <span>${comentario.commentText}</span><br>
    <small>${new Date(comentario.timestamp).toLocaleString()}</small>
  `;

  listaComentarios.appendChild(li);
}
