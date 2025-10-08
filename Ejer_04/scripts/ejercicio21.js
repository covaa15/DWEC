/*El botón de la tarjeta premium debe tener una funcionalidad. 
Haz que, al pulsarlo, se dispare una alerta del navegador con 
el mensaje: ‘Accediendo a información exclusiva para miembros premium’. */

document.querySelector('#btn-info-premium').addEventListener('click', function () { mostrarMensaje() })

function mostrarMensaje() {
    alert('Accediendo a información exclusiva para miembros premium')
}