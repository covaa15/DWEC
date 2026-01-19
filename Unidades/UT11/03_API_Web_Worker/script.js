// Espera a que el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', () => {

    // --- OBTENER REFERENCIAS A ELEMENTOS DEL DOM ---
    const botonIniciar = document.getElementById('iniciar-worker');
    const botonUI = document.getElementById('boton-ui');
    const resultadoWorker = document.getElementById('resultado-worker');
    const contadorClics = document.getElementById('contador-clics');

    let clics = 0;
    let worker; // Variable para mantener la referencia al worker.

    // --- EVENT LISTENERS ---

    // 1. Listener para el botón que inicia el worker.
    botonIniciar.addEventListener('click', () => {
        // Deshabilita el botón para evitar iniciar múltiples workers.
        botonIniciar.disabled = true;
        resultadoWorker.textContent = 'Calculando...';

        // --- CREACIÓN Y COMUNICACIÓN CON EL WORKER ---

        // 1. Crea una nueva instancia de Worker.
        // El constructor recibe la ruta al script que se ejecutará en segundo plano.
        // El navegador se encarga de descargarlo y ejecutarlo en un nuevo hilo.
        worker = new Worker('worker.js');
        console.log('Hilo Principal: Worker creado.');

        // 2. Añade un listener para el evento 'message' del worker.
        // Se dispara cuando el worker envía un mensaje de vuelta usando `self.postMessage()`.
        worker.addEventListener('message', (evt) => {
            // `evt.data` contiene los datos enviados desde el worker.
            const resultado = evt.data;
            console.log(`Hilo Principal: Mensaje recibido del worker con el resultado: ${resultado}`);

            // Actualiza la UI con el resultado.
            resultadoWorker.textContent = resultado.toLocaleString(); // Formatea el número.

            // Habilita el botón de nuevo.
            botonIniciar.disabled = false;

            // 3. Termina el worker.
            // Es una buena práctica terminar los workers cuando ya no se necesitan
            // para liberar recursos.
            worker.terminate();
            console.log('Hilo Principal: Worker terminado.');
            worker = undefined;
        });

        // 4. Añade un listener para manejar posibles errores en el worker.
        worker.addEventListener('error', (evt) => {
            console.error('Hilo Principal: Ha ocurrido un error en el worker.', evt);
            resultadoWorker.textContent = 'Error en el cálculo.';
            botonIniciar.disabled = false;
            worker.terminate();
            worker = undefined;
        });

        // 5. Envía un mensaje al worker para que inicie su tarea.
        // Se usa `worker.postMessage()` para pasarle datos.
        // El worker lo recibirá en su listener del evento 'message'.
        const numeroGigante = 10_000_000_000; // Un número grande para que el cálculo tarde un poco.
        console.log(`Hilo Principal: Enviando mensaje al worker para que calcule hasta ${numeroGigante}.`);
        worker.postMessage(numeroGigante);
    });

    // 2. Listener para el botón de prueba de la UI.
    // Este botón permite demostrar que la interfaz sigue respondiendo
    // mientras el worker está ocupado.
    botonUI.addEventListener('click', () => {
        clics++;
        contadorClics.textContent = clics;
    });
});
