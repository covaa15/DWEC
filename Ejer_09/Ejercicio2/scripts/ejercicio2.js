const todosSpan = document.querySelectorAll('li span');

/*Crea una función que lea todas estas propiedades y 
actualice el contenido de los <span> correspondientes.*/
function actualizarSpans() {

    todosSpan.forEach((etiquetaSpan) => {

        switch (etiquetaSpan.classList.toString()) {
            case 'tamanoVentana':
                etiquetaSpan.textContent = `${window.innerWidth} x ${window.innerHeight}`;
                break;
            case 'tamanoTotalVentana':
                etiquetaSpan.textContent = `${window.outerWidth} x ${window.outerHeight}`;
                break;
            case 'posicionVentana':
                etiquetaSpan.textContent = `PosX:${window.screenX} , PosY:${window.screenY}`;
                break;
            case 'resolucionPantalla':
                etiquetaSpan.textContent = `${screen.width} x ${screen.height}`;
                break;
            case 'espacioDisponiblePantalla':
                etiquetaSpan.textContent = `${screen.availWidth} x ${screen.availHeight}`;
                break;
            case 'estadoConexion':

                //etiquetaSpan.textContent = `${navigator.onLine}`;
                if (navigator.onLine) {
                    etiquetaSpan.setAttribute('id', 'conRed');
                    //classList.add("conRed");
                } else {
                    etiquetaSpan.setAttribute('id', 'sinRed');
                }
                break;

            default:
                break;
        }
    });
}
//Llama a esa función una vez al cargar la página para mostrar los valores iniciales.
actualizarSpans();

/*Añade un EventListener para el evento resize en window que llame a la función 
de actualización cada vez que el usuario cambie el tamaño de la ventana */
window.addEventListener('resize', actualizarSpans);

/*Añade EventListeners para los eventos online y offline para actualizar 
el estado de la conexión inmediatamente cuando cambie.*/
window.addEventListener('online', actualizarSpans);
window.addEventListener('offline', actualizarSpans);

/*La posición de la ventana (screenX, screenY) no tiene un evento move. 
Usa setInterval() para comprobar la posición cada 250ms y actualizarla 
solo si ha cambiado con respecto a la última comprobación.*/

let ultimaPosX = window.screenX;
let ultimaPosY = window.screenY;
let intervalo;

intervalo = setInterval(() => {
    if (window.screenX != ultimaPosX || window.screenY != ultimaPosY) {
        ultimaPosX = window.screenX;
        ultimaPosY = window.screenY;
        actualizarSpans();
    }
}, 250);