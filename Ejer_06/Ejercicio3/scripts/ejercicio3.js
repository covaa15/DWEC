const estado = document.getElementById('condiciones');
const boton = document.querySelector('#enviar');

estado.addEventListener('change', function () {
    cambiarEstado();
})

//Cambio el estado del boton
function cambiarEstado() {
    if (estado.checked)
        boton.disabled = false;
    else
        boton.disabled = true;
}

//Pone el checkBox a false cuando se recarga la pagina
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#condiciones').checked = false;
})