/**
 * worker.js
 * 
 * Este script se ejecuta en un hilo separado (un "worker").
 * No tiene acceso al DOM ni al objeto `window`.
 * Se comunica con el script principal (hilo principal) a través de mensajes.
 * El objeto global aquí es `self`.
 */

console.log('Worker: script cargado y listo para recibir mensajes.');

// Se añade un listener para el evento 'message', que se dispara cuando el hilo principal
// envía un mensaje al worker usando `worker.postMessage()`.
self.addEventListener('message', (evt) => {
    // `evt.data` contiene los datos enviados desde el hilo principal.
    const numero = evt.data;

    console.log(`Worker: Mensaje recibido del hilo principal. Iniciando cálculo hasta ${numero}.`);
    
    // --- TAREA COMPUTACIONALMENTE INTENSIVA ---
    // Esta función simula un trabajo pesado, como un cálculo complejo,
    // procesamiento de datos, etc. Si se ejecutara en el hilo principal,
    // congelaría la interfaz de usuario.
    const resultado = calcularSuma(numero);

    console.log(`Worker: Cálculo terminado. Enviando resultado de vuelta al hilo principal.`);

    // `self.postMessage(resultado)` envía el resultado de vuelta al hilo principal.
    // El hilo principal lo recibirá a través de su propio listener del evento 'message'.
    self.postMessage(resultado);
});

/**
 * Función que simula un cálculo pesado.
 * @param {number} n - El número hasta el que se sumará.
 * @returns {number} - La suma total.
 */
function calcularSuma(n) {
    let suma = 0;
    for (let i = 0; i <= n; i++) {
        suma += i;
    }
    return suma;
}

// También se puede gestionar un error de esta forma:
self.addEventListener('error', (evt) => {
    console.error('Worker: Ha ocurrido un error.', evt);
});
