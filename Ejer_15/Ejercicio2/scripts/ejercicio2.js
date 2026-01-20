const tarjetas = document.querySelectorAll('.tarjeta');
const columnas = document.querySelectorAll('.columna');

let tarjetaArrastrando = null;
let lineaInsercion = null;

tarjetas.forEach(tarjeta => {

    //Cuando empiezo a arrastrar la tarjeta
    tarjeta.addEventListener('dragstart', (event) => {

        //Guardo la tarjeta que se esta arrastrando
        tarjetaArrastrando = tarjeta;
        tarjeta.classList.add('arrastrando');

        //Guardo la info de la tarjeta como JSON
        event.dataTransfer.setData('application/json', JSON.stringify({
            id: tarjeta.dataset.id,
            status: tarjeta.parentElement.dataset.status
        }));

        event.dataTransfer.effectAllowed = "move";
    });

    //Cuando termino de arrastrar, reseteo la variable, quito la linea de inseccion y el estilo
    tarjeta.addEventListener('dragend', () => {
        tarjeta.classList.remove('arrastrando');
        tarjetaArrastrando = null;
        removerLineaInsercion();
    });
});

columnas.forEach(columna => {

    //Cuando paso la tarjeta sobre la columna
    columna.addEventListener('dragover', (event) => {
        event.preventDefault();
        //Resalto la columna como destino válido               
        columna.classList.add('resaltada');

        const target = event.target;

        //Si paso sobre otra tarjeta
        if (target.classList.contains('tarjeta') && target !== tarjetaArrastrando) {
            const rect = target.getBoundingClientRect();
            const mitad = rect.top + rect.height / 2;

            //Si no hay linea de insercion la creo
            if (!lineaInsercion) {
                lineaInsercion = document.createElement('div');
                lineaInsercion.classList.add('linea-insercion');
            }

            if (event.clientY < mitad) {
                target.parentElement.insertBefore(lineaInsercion, target);
            } else {
                target.parentElement.insertBefore(lineaInsercion, target.nextSibling);
            }

            //Si paso sobre columna vacia
        } else if (target.classList.contains('columna')) {
            if (!lineaInsercion) {
                lineaInsercion = document.createElement('div');
                lineaInsercion.classList.add('linea-insercion');
            }
            target.appendChild(lineaInsercion);
        }
    });

    //Cuando dejo de pasar la tarjeta por la columna
    columna.addEventListener('dragleave', () => {
        columna.classList.remove('resaltada');
        removerLineaInsercion();
    });

    //Cuando suelto la tarjeta en la columna
    columna.addEventListener('drop', (event) => {
        event.preventDefault();
        columna.classList.remove('resaltada');

        const data = JSON.parse(event.dataTransfer.getData('application/json'));
        const id = data.id;

        //Si hay línea de inserción
        if (lineaInsercion) {
            //Inserto tarjeta antes de linea
            columna.insertBefore(tarjetaArrastrando, lineaInsercion);
        } else {
            columna.appendChild(tarjetaArrastrando);
        }

        tarjetaArrastrando.dataset.status = columna.dataset.status;
        removerLineaInsercion();
    });
});

//Funcion para quitar la linea de insercion
function removerLineaInsercion() {
    if (lineaInsercion && lineaInsercion.parentElement) {
        lineaInsercion.parentElement.removeChild(lineaInsercion);
    }
    lineaInsercion = null;
}
