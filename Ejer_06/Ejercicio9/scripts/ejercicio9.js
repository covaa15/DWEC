// Variable para saber cuando se dibuja o no
let estaDibujando = false;

const contenedorCuadricula = document.getElementById('cuadricula');

// Función que crea la cuadrícula
function crearCuadricula() {
    for (let i = 0; i < 40 * 40; i++) {
        const celda = document.createElement('div');
        celda.classList.add('celda');

        // Cuando esta clicado y se arrastra el raton se pinta de negro
        celda.addEventListener('mouseover', () => {
            if (estaDibujando) {
                celda.style.backgroundColor = 'black';
            }
        });

        // Cuando se hace clic en una celda solo esta se pinta de negro
        celda.addEventListener('mousedown', () => {
            celda.style.backgroundColor = 'black';
        });

        contenedorCuadricula.appendChild(celda);
    }
}

// Cuando se hace clic se empieza a dibujar
document.body.addEventListener('mousedown', () => {
    estaDibujando = true;
});

// Cuando se deja de hacer clic se deja de dibujar
document.body.addEventListener('mouseup', () => {
    estaDibujando = false;
});

crearCuadricula();