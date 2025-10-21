document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---


    //EJERCICIO 1

    const contenedorPadre = document.querySelector('#outer-box');
    const middleBox = document.querySelector('#middle-box');


    contenedorPadre.addEventListener('click', function (event) {
        if (event.target !== contenedorPadre) {
            quitarColor();
            if (event.target) {
                document.querySelector('#' + event.target.id).classList.add('color');

                console.log('ID Elemento pulsado:', event.target.id);
                console.log('ID Elemento Padre:', event.currentTarget.id);
            }
        }
    });


    // middleBox.addEventListener('click', function (event) {
    //     event.stopPropagation();
    //     quitarColor();
    //     middleBox.classList.add('color');
    // });

    // Función que quita el color al hacer click en otro hijo
    function quitarColor() {
        contenedorPadre.querySelectorAll('div').forEach((contenedor) => {
            contenedor.classList.remove('color');
        });
    }




    // --- Solución Ejercicio 2 ---

    document.querySelector("#test-link").addEventListener('click', function (event) {

        event.preventDefault();
        console.log("Navegación prevenida")
    })


    // --- Solución Ejercicio 3 ---

    const botonVolverArriba = document.querySelector('#back-to-top');

    //Cuando hago scroll obtengo la posY, si es mayor de 250 muestro boton sino lo oculto
    window.addEventListener('scroll', function (event) {
        let distanciaTop = this.scrollY;

        if (distanciaTop >= 250)
            botonVolverArriba.classList.remove('hidden')
        else
            botonVolverArriba.classList.add('hidden')
    })

    //Cuando pulso el boton vuelvo al principio de la hoja
    botonVolverArriba.addEventListener('click', function () { volverArriba() });

    //Funcion que me lleva arriba de manera suave
    function volverArriba() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }



    // --- Solución Ejercicio 5 ---

});
