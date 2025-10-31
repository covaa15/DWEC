const barraProgreso = document.getElementById("barraProgreso");
const boton = document.getElementById("botonArriba");

//Añade un EventListener para el evento scroll en window
window.addEventListener('scroll', actualizarDesplazamiento);


function actualizarDesplazamiento() {

    /*Calcula la altura total del documento que se puede desplazar: 
    document.documentElement.scrollHeight - document.documentElement.clientHeight.*/
    const alturaTotalDocumento = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    //Obtén la posición actual del scroll: window.scrollY.
    const posicionActualScroll = window.scrollY;

    //Calcula el porcentaje de scroll y actualiza el valor de la barra (o div) de progreso.
    const porcentajeDesplazamiento = (posicionActualScroll / alturaTotalDocumento) * 100;
    barraProgreso.value = porcentajeDesplazamiento;

    /*Dentro del mismo manejador, comprueba si window.scrollY es mayor que, 
    por ejemplo, la altura de la ventana (window.innerHeight). 
    Si lo es, muestra el botón; si no, ocúltalo.*/
    if (posicionActualScroll > window.innerHeight) {
        boton.classList.add("visible"); 
    } else {
        boton.classList.remove("visible"); 
    }

}


/*Añade un EventListener de click al botón. Cuando se pulse, 
 utiliza window.scrollTo() para volver al inicio de la página.*/

boton.addEventListener("click", function () {

    /*El desplazamiento debe ser suave. Para ello, en lugar de 
    scrollTo(0, 0), usa window.scrollTo({ top: 0, behavior: 'smooth' })*/
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});