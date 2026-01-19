// Este script es intencionadamente simple.
// Su único propósito es registrar algunos 'event listeners'
// para que podamos inspeccionarlos desde la consola.

document.addEventListener('DOMContentLoaded', () => {
    
    const miBoton = document.getElementById('mi-boton');

    if (miBoton) {
        // Añadimos un listener para el evento 'click'
        miBoton.addEventListener('click', () => {
            console.log('Botón "' + miBoton.id + '" ha sido pulsado.');
        });

        // Añadimos un listener para el evento 'mouseover'
        miBoton.addEventListener('mouseover', () => {
            // No hacemos nada visible, pero el listener existe.
        });
    }

    // Definimos una función simple en el ámbito global (window)
    // para poder usar `debug()` y `monitor()` con ella desde la consola.
    window.saludar = function(nombre) {
        const saludo = `¡Hola, ${nombre}! Bienvenido a la consola.`;
        console.log(saludo);
        return saludo;
    }

});
