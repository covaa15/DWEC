const filtro = document.querySelector("input");

filtro.addEventListener("input", filtrarPaises);

function filtrarPaises(e) {

    document.querySelectorAll("li").forEach(pais => {

        if (!pais.textContent.toLowerCase().startsWith(e.target.value.toLowerCase()))
            pais.classList.add('oculto');
        else
            pais.classList.remove('oculto');

    });
}

//Vacia el input al cargar la ventana
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('input').value = "";
})
