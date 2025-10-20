document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---

    const contenedorPadre = document.querySelector('#outer-box');

    contenedorPadre.addEventListener('click', function (event) {
        if (event.target !== contenedorPadre) {
            quitarColor();
            if (event.target) {
                //Cambio el color al div hijo clicado
                document.getElementById(event.target.id).classList.add('color');

                //Muestro las ID por consola
                console.log('ID Elemento pulsado:', event.target.id)
                console.log('ID Elemento Padre:', event.currentTarget.id)
            }

        }

    });

    //Funcion que quita el color al hacer click en otro hijo
    function quitarColor() {
        contenedorPadre.querySelectorAll('div').forEach((contenedor) => {
            contenedor.classList.remove('color');
        })
    }




  



    // --- Solución Ejercicio 2 ---


    // --- Solución Ejercicio 3 ---


    // --- Solución Ejercicio 5 ---

});
